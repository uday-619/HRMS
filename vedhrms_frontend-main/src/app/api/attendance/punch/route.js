import { NextResponse } from 'next/server';
import { readDB, writeDB, logAction } from '@/utils/db';

// Helper to calculate distance in meters using Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
}

// Helper to query location name from OpenStreetMap Nominatim
async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'HRMS-Geofencing-App/1.0 (contact: admin@example.com)'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.display_name) {
        // Return a cleaner description (first 3 parts of address e.g. "Dharavi, Mumbai, Maharashtra")
        const parts = data.display_name.split(',');
        return parts.slice(0, 3).map(p => p.trim()).join(', ');
      }
    }
  } catch (err) {
    console.error("Reverse geocoding error:", err);
  }
  return `Coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');
    const db = readDB();

    let logs = db.attendance || [];
    if (employeeId) {
      logs = logs.filter(log => log.employeeId === employeeId);
    }
    return NextResponse.json(logs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { employeeId, employeeName, type, coords } = await request.json();
    const db = readDB();
    const settings = db.settings || { latitude: 19.0760, longitude: 72.8777, radius: 150 };

    // 1. Geofence checks for punch-in / punch-out
    if (type === 'in' || type === 'out') {
      if (!coords || typeof coords.latitude !== 'number' || typeof coords.longitude !== 'number') {
        return NextResponse.json({ error: 'Coordinates are required to check in.' }, { status: 400 });
      }

      const distance = haversineDistance(
        coords.latitude,
        coords.longitude,
        settings.latitude,
        settings.longitude
      );

      // Enforce geofencing strictly for check-in
      if (type === 'in' && distance > settings.radius) {
        logAction(
          employeeId,
          employeeName,
          "Punch In Rejected",
          `Attempted punch in from outside office boundary. Distance: ${Math.round(distance)}m (Allowed: ${settings.radius}m)`
        );
        return NextResponse.json({
          error: `Punch In Denied: You are outside office boundaries. Distance: ${Math.round(distance)}m (Allowed: ${settings.radius}m)`
        }, { status: 403 });
      }

      // Resolve location address description
      const locationName = await reverseGeocode(coords.latitude, coords.longitude);
      const dateStr = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toTimeString().split(' ')[0];

      // Update db record
      if (type === 'in') {
        const newPunch = {
          id: `PCH${String(db.attendance.length + 1).padStart(3, '0')}`,
          employeeId,
          date: dateStr,
          punchIn: `${timeStr} (${locationName})`,
          punchOut: null,
          totalHours: "In Progress",
          status: "Present",
          locationIn: locationName,
          coordsIn: coords,
          isPremisesIn: true
        };
        db.attendance.unshift(newPunch);
        writeDB(db);
        logAction(employeeId, employeeName, "Punch In Success", `Punched in from: ${locationName}`);
        return NextResponse.json({ success: true, record: newPunch });
      } else {
        // Punch Out
        const latest = db.attendance.find(log => log.employeeId === employeeId && !log.punchOut);
        if (latest) {
          latest.punchOut = `${timeStr} (${locationName})`;
          latest.locationOut = locationName;
          latest.coordsOut = coords;
          latest.isPremisesOut = distance <= settings.radius;
          
          // Calculate worked duration (ignoring break details for simplicity here)
          latest.totalHours = "8h 0m"; // placeholder
          writeDB(db);
          logAction(employeeId, employeeName, "Punch Out Success", `Punched out from: ${locationName}`);
          return NextResponse.json({ success: true, record: latest });
        } else {
          return NextResponse.json({ error: 'No active punch-in found.' }, { status: 400 });
        }
      }
    }

    // 2. Break Logging
    if (type === 'break' || type === 'resume') {
      logAction(
        employeeId,
        employeeName,
        type === 'break' ? "Break Started" : "Break Ended",
        type === 'break' ? "Employee took a break" : "Employee returned from break"
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid punch type.' }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
