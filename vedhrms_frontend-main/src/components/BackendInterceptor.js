"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BackendInterceptor() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__interceptorInitialized) return;
    window.__interceptorInitialized = true;

    // --- 1. Background Preloader ---
    const syncCollections = async () => {
      try {
        // Sync employees
        const empRes = await fetch("/api/employees");
        if (empRes.ok) {
          const emps = await empRes.json();
          localStorage.setItem("hrms_employees", JSON.stringify(emps));
        }

        // Sync settings
        const offRes = await fetch("/api/office-settings");
        let office = { latitude: 19.0760, longitude: 72.8777, radius: 150 };
        if (offRes.ok) {
          office = await offRes.json();
          localStorage.setItem("office_settings", JSON.stringify(office));
        }

        // Sync punch logs
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        if (currentUser.employeeId) {
          const pchRes = await fetch(`/api/attendance/punch?employeeId=${currentUser.employeeId}`);
          if (pchRes.ok) {
            const pchs = await pchRes.json();
            localStorage.setItem("pch_records", JSON.stringify(pchs));
          }
        }

        // Sync Reports collections
        const repEmpRes = await fetch("/api/reports/employee");
        if (repEmpRes.ok) {
          const repEmps = await repEmpRes.json();
          localStorage.setItem("reports_employee", JSON.stringify(repEmps));
        }

        const repExpRes = await fetch("/api/reports/expense");
        if (repExpRes.ok) {
          const repExps = await repExpRes.json();
          localStorage.setItem("reports_expense", JSON.stringify(repExps));
        }

        const repIncRes = await fetch("/api/reports/income");
        if (repIncRes.ok) {
          const repIncs = await repIncRes.json();
          localStorage.setItem("reports_income", JSON.stringify(repIncs));
        }

        const repStfRes = await fetch("/api/reports/staff");
        if (repStfRes.ok) {
          const repStfs = await repStfRes.json();
          localStorage.setItem("reports_staff", JSON.stringify(repStfs));
        }

      } catch (err) {
        console.error("Failed to preload collections:", err);
      }
    };
    
    syncCollections();

    // --- 2. Geolocation Watcher ---
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          window.__currentCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        },
        (err) => console.error("Error watching location:", err),
        { enableHighAccuracy: true }
      );
    }

    // Helper to calculate distance in meters
    function getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371000;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    // --- 3. localStorage Interceptor ---
    const originalSetItem = localStorage.setItem.bind(localStorage);
    
    localStorage.setItem = function(key, value) {
      if (window.__syncing) {
        originalSetItem(key, value);
        return;
      }

      // Check if employee punches in
      if (key === "punchedIn" && value === "true") {
        const settings = JSON.parse(localStorage.getItem("office_settings") || '{"latitude": 19.0760, "longitude": 72.8777, "radius": 150}');
        const coords = window.__currentCoords;
        
        if (!coords) {
          alert("Punch In failed: Geolocation access is required to verify you are on office premises.");
          originalSetItem("punchedIn", "false");
          originalSetItem("pch_isPunchedIn", "false");
          window.location.reload();
          return;
        }

        const distance = getDistance(coords.latitude, coords.longitude, settings.latitude, settings.longitude);
        if (distance > settings.radius) {
          alert(`Punch In failed: You are outside office premises. Distance: ${Math.round(distance)}m (Allowed: ${settings.radius}m).`);
          originalSetItem("punchedIn", "false");
          originalSetItem("pch_isPunchedIn", "false");
          window.location.reload();
          return;
        }

        // Log Punch In to API
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        fetch("/api/attendance/punch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeId: currentUser.employeeId || "ADM-0001",
            employeeName: currentUser.name || "Super Admin",
            type: "in",
            coords
          })
        }).then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            localStorage.setItem("last_punch_location_in", data.record.locationIn || "Office");
          }
        }).catch(console.error);
      }

      // Check if employee punches out
      if (key === "punchedIn" && value === "false") {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const coords = window.__currentCoords;
        fetch("/api/attendance/punch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeId: currentUser.employeeId || "ADM-0001",
            employeeName: currentUser.name || "Super Admin",
            type: "out",
            coords
          })
        }).then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            localStorage.setItem("last_punch_location_out", data.record.locationOut || "Office");
          }
        }).catch(console.error);
      }

      // Intercept and sync records list
      if (key === "pch_records") {
        try {
          const list = JSON.parse(value);
          if (list.length > 0) {
            const latest = list[0];
            const locIn = localStorage.getItem("last_punch_location_in");
            const locOut = localStorage.getItem("last_punch_location_out");

            if (latest.punchIn && !latest.punchIn.includes("(") && locIn) {
              latest.punchIn = `${latest.punchIn} (${locIn})`;
              localStorage.removeItem("last_punch_location_in");
            }
            if (latest.punchOut && !latest.punchOut.includes("(") && locOut) {
              latest.punchOut = `${latest.punchOut} (${locOut})`;
              localStorage.removeItem("last_punch_location_out");
            }
          }
          
          value = JSON.stringify(list);
          
          window.__syncing = true;
          fetch("/api/attendance/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: value
          }).catch(console.error);
          window.__syncing = false;
        } catch (_) {}
      }

      // Intercept and sync employees list
      if (key === "hrms_employees") {
        window.__syncing = true;
        fetch("/api/employees/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: value
        }).catch(console.error);
        window.__syncing = false;
      }

      // Intercept and sync reports list changes
      if (key === "reports_employee") {
        window.__syncing = true;
        fetch("/api/reports/employee", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: value
        }).catch(console.error);
        window.__syncing = false;
      }
      if (key === "reports_expense") {
        window.__syncing = true;
        fetch("/api/reports/expense", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: value
        }).catch(console.error);
        window.__syncing = false;
      }
      if (key === "reports_income") {
        window.__syncing = true;
        fetch("/api/reports/income", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: value
        }).catch(console.error);
        window.__syncing = false;
      }
      if (key === "reports_staff") {
        window.__syncing = true;
        fetch("/api/reports/staff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: value
        }).catch(console.error);
        window.__syncing = false;
      }

      originalSetItem(key, value);
    };

    // --- 4. Form Submit Interceptor for Login ---
    const handleLoginSubmit = async (e) => {
      const form = e.target;
      const emailInput = form.querySelector('input[type="email"]');
      const passwordInput = form.querySelector('input[type="password"]');
      
      if (emailInput && passwordInput) {
        e.preventDefault();
        e.stopPropagation();
        
        const email = emailInput.value;
        const password = passwordInput.value;

        const submitBtn = form.querySelector('button[type="submit"]');
        let originalText = "";
        if (submitBtn) {
          originalText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = "Logging in...";
        }

        try {
          // 1. Try admin login endpoint first
          let loginEndpoint = "/api/auth/login/admin";
          let res = await fetch(loginEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
          
          let data = await res.json();
          
          // 2. If it is role mismatch (Forbidden 403), call employee login endpoint
          if (res.status === 403) {
            loginEndpoint = "/api/auth/login/employee";
            res = await fetch(loginEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
            });
            data = await res.json();
          }

          if (!res.ok) {
            throw new Error(data.error || "Login failed");
          }

          localStorage.setItem("currentUser", JSON.stringify(data.user));
          window.location.href = "/dashboard";
        } catch (err) {
          alert(err.message || "Invalid email or password");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          const card = form.closest('.form-card') || form;
          card.style.animation = 'none';
          card.offsetHeight; // trigger reflow
          card.style.animation = 'fieldShake 0.6s ease';
        }
      }
    };

    document.addEventListener("submit", (e) => {
      if (window.location.pathname === "/login") {
        handleLoginSubmit(e);
      }
    }, true);

  }, [pathname]);

  return null;
}
