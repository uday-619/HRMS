import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/utils/db';

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.settings || { latitude: 19.0760, longitude: 72.8777, radius: 150 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newSettings = await request.json();
    const db = readDB();

    db.settings = {
      latitude: Number(newSettings.latitude),
      longitude: Number(newSettings.longitude),
      radius: Number(newSettings.radius)
    };

    writeDB(db);
    return NextResponse.json({ success: true, settings: db.settings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
