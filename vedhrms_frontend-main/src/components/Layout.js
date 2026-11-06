'use client';

import { useState } from "react";

import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar receives collapsed state and a toggle callback */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

      {/* Main content grows to fill remaining space */}
      <div
        className="main-content"
        style={{
          marginLeft: collapsed ? "110px" : "240px",
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
        }}
      >
        <Header />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}