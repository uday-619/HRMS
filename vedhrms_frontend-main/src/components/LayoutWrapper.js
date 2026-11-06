"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Layout from "./Layout";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const noLayoutPages = ["/login", "/signup"];
  const isNoLayoutPage = noLayoutPages.includes(pathname);

  // Background database preloader to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const syncCollections = async () => {
        try {
          // 1. Sync employees
          const empRes = await fetch("/api/employees");
          if (empRes.ok) {
            const emps = await empRes.json();
            localStorage.setItem("hrms_employees", JSON.stringify(emps));
          }

          // 2. Sync office settings
          const offRes = await fetch("/api/office-settings");
          if (offRes.ok) {
            const settings = await offRes.json();
            localStorage.setItem("office_settings", JSON.stringify(settings));
          }

          // 3. Sync punch logs
          const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
          if (currentUser.employeeId) {
            const pchRes = await fetch(`/api/attendance/punch?employeeId=${currentUser.employeeId}`);
            if (pchRes.ok) {
              const pchs = await pchRes.json();
              localStorage.setItem("pch_records", JSON.stringify(pchs));
            }
          }
        } catch (err) {
          console.error("Failed to preload collections:", err);
        }
      };
      
      syncCollections();
    }
  }, [pathname]);

  return isNoLayoutPage ? children : <Layout>{children}</Layout>;
}
