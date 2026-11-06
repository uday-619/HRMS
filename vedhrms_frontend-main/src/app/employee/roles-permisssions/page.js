"use client";

import React, { useState, useEffect, useRef } from "react";

// ── Data ───────────────────────────────────────────────────────────────────────
const PERMISSION_MODULES = [
  {
    module: "Employee Management",
    icon: "👥",
    permissions: ["View Employee", "Add Employee", "Edit Employee", "Delete Employee", "Export Employee"],
  },
  {
    module: "Attendance & Leave",
    icon: "📅",
    permissions: ["View Attendance", "Mark Attendance", "Approve Leave", "Reject Leave", "View Reports"],
  },
  {
    module: "Payroll",
    icon: "💰",
    permissions: ["View Payroll", "Process Payroll", "Generate Payslip", "Edit Salary", "Export Payroll"],
  },
  {
    module: "Recruitment",
    icon: "🎯",
    permissions: ["View Jobs", "Post Jobs", "View Applicants", "Schedule Interview", "Hire Candidate"],
  },
  {
    module: "Reports & Analytics",
    icon: "📊",
    permissions: ["View Reports", "Generate Reports", "Export Reports", "Share Reports"],
  },
  {
    module: "Settings",
    icon: "⚙️",
    permissions: ["View Settings", "Edit Settings", "Manage Roles", "Manage Departments", "System Config"],
  },
];

const INITIAL_ROLES = [
  {
    id: 1,
    name: "Super Admin",
    color: "#6366F1",
    lightColor: "#EEF2FF",
    description: "Full system access with all permissions",
    employeeCount: 1,
    permissions: Object.fromEntries(
      PERMISSION_MODULES.map(m => [m.module, Object.fromEntries(m.permissions.map(p => [p, true]))])
    ),
  },
  {
    id: 2,
    name: "HR Manager",
    color: "#0EA5E9",
    lightColor: "#E0F2FE",
    description: "Manages HR operations and employee records",
    employeeCount: 3,
    permissions: Object.fromEntries(
      PERMISSION_MODULES.map(m => [
        m.module,
        Object.fromEntries(
          m.permissions.map(p => [
            p,
            ["Employee Management", "Attendance & Leave", "Recruitment"].includes(m.module),
          ])
        ),
      ])
    ),
  },
  {
    id: 3,
    name: "Manager",
    color: "#10B981",
    lightColor: "#D1FAE5",
    description: "Team lead with limited administrative access",
    employeeCount: 8,
    permissions: Object.fromEntries(
      PERMISSION_MODULES.map(m => [
        m.module,
        Object.fromEntries(
          m.permissions.map((p, i) => [p, i === 0])
        ),
      ])
    ),
  },
  {
    id: 4,
    name: "Developer",
    color: "#F59E0B",
    lightColor: "#FEF3C7",
    description: "Technical staff with read access",
    employeeCount: 12,
    permissions: Object.fromEntries(
      PERMISSION_MODULES.map(m => [
        m.module,
        Object.fromEntries(
          m.permissions.map((p, i) => [p, i === 0 && m.module !== "Payroll"])
        ),
      ])
    ),
  },
  {
    id: 5,
    name: "Staff",
    color: "#EC4899",
    lightColor: "#FCE7F3",
    description: "Basic employee with minimal access",
    employeeCount: 45,
    permissions: Object.fromEntries(
      PERMISSION_MODULES.map(m => [
        m.module,
        Object.fromEntries(
          m.permissions.map((p, i) => [
            p,
            m.module === "Attendance & Leave" && i < 2,
          ])
        ),
      ])
    ),
  },
];

// ── Toggle Switch ──────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, color }) {
  return (
    <label style={{ position: "relative", display: "inline-block", width: 36, height: 20, cursor: "pointer", flexShrink: 0 }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0, position: "absolute" }} />
      <span style={{
        position: "absolute", inset: 0, borderRadius: 20, transition: "background 0.25s",
        background: checked ? color : "#E5E7EB",
      }} />
      <span style={{
        position: "absolute", left: checked ? 18 : 2, top: 2, width: 16, height: 16,
        borderRadius: "50%", background: "#fff", transition: "left 0.25s cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
      }} />
    </label>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  const bg = type === "success" ? "#166534" : type === "danger" ? "#991B1B" : "#854D0E";
  const bar = type === "success" ? "#22C55E" : type === "danger" ? "#EF4444" : "#F59E0B";
  return (
    <div style={{ position: "fixed", top: 22, right: 22, zIndex: 9999, animation: "slideIn 0.32s cubic-bezier(.4,0,.2,1)" }}>
      <div style={{ background: bg, color: "#fff", padding: "12px 20px 10px", borderRadius: 10, fontSize: 13, fontWeight: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", minWidth: 230, position: "relative", overflow: "hidden" }}>
        {msg}
        <div style={{ position: "absolute", bottom: 0, left: 0, height: 3, background: bar, animation: "shrinkBar 3s linear forwards", borderRadius: "0 0 10px 10px" }} />
      </div>
    </div>
  );
}

// ── Add / Edit Role Modal ──────────────────────────────────────────────────────
function RoleModal({ role, onClose, onSave }) {
  const isEdit = !!role;
  const COLORS = ["#6366F1", "#0EA5E9", "#10B981", "#F59E0B", "#EC4899", "#EF4444", "#8B5CF6", "#06B6D4"];
  const [form, setForm] = useState(
    isEdit
      ? { name: role.name, description: role.description, color: role.color }
      : { name: "", description: "", color: COLORS[0] }
  );
  const [err, setErr] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Role name is required";
    return e;
  }
  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) { setErr(e); return; }
    onSave(form);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 440, boxShadow: "0 24px 64px rgba(0,0,0,0.18)", animation: "modalPop 0.26s cubic-bezier(.4,0,.2,1)", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{isEdit ? "Edit Role" : "Create New Role"}</div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{isEdit ? `Editing "${role.name}"` : "Set up a new role with custom permissions"}</div>
          </div>
          <button onClick={onClose} style={{ background: "#F1F5F9", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 13, color: "#64748B" }}>✕</button>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={FL.label}>Role Name <span style={{ color: "#EF4444" }}>*</span></label>
            <input value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErr(p => ({ ...p, name: undefined })); }}
              placeholder="e.g. Finance Manager"
              style={{ ...FL.input, borderColor: err.name ? "#EF4444" : "#E2E8F0" }} />
            {err.name && <span style={{ fontSize: 11, color: "#EF4444", marginTop: 3, display: "block" }}>{err.name}</span>}
          </div>
          <div>
            <label style={FL.label}>Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Brief description of this role…" rows={3}
              style={{ ...FL.input, resize: "vertical", lineHeight: 1.5 }} />
          </div>
          <div>
            <label style={FL.label}>Role Color</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setForm(p => ({ ...p, color: c }))}
                  style={{ width: 30, height: 30, borderRadius: "50%", background: c, border: form.color === c ? `3px solid #0F172A` : "3px solid transparent", cursor: "pointer", transition: "transform 0.15s", transform: form.color === c ? "scale(1.18)" : "scale(1)" }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: "14px 24px", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} style={FL.btnCancel}>Cancel</button>
          <button onClick={handleSave} style={{ ...FL.btnPrimary, background: form.color }}>
            {isEdit ? "💾 Save Changes" : "✚ Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ───────────────────────────────────────────────────────
function DeleteModal({ role, onClose, onConfirm }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 380, padding: "28px 28px 22px", boxShadow: "0 24px 64px rgba(0,0,0,0.18)", animation: "modalPop 0.26s cubic-bezier(.4,0,.2,1)", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 14px" }}>🗑</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>Delete Role?</div>
        <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 22 }}>
          {`Are you sure you want to delete `}<strong>&ldquo;{role.name}&rdquo;</strong>? {`This action cannot be undone and will affect `}<strong>{role.employeeCount} employee{role.employeeCount !== 1 ? "s" : ""}</strong>.
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button onClick={onClose} style={FL.btnCancel}>Cancel</button>
          <button onClick={onConfirm} style={{ ...FL.btnPrimary, background: "#EF4444" }}>Delete Role</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [activeRole, setActiveRole] = useState(INITIAL_ROLES[0]);
  const [modal, setModal] = useState(null); // "add" | "edit" | "delete"
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  function showToast(msg, type = "success") { setToast({ msg, type }); }

  function handleToggle(module, perm) {
    setRoles(prev =>
      prev.map(r =>
        r.id === activeRole.id
          ? { ...r, permissions: { ...r.permissions, [module]: { ...r.permissions[module], [perm]: !r.permissions[module][perm] } } }
          : r
      )
    );
    setActiveRole(prev => ({
      ...prev,
      permissions: { ...prev.permissions, [module]: { ...prev.permissions[module], [perm]: !prev.permissions[module][perm] } },
    }));
  }

  function handleToggleAll(module) {
    const perms = activeRole.permissions[module];
    const allOn = Object.values(perms).every(Boolean);
    const updated = Object.fromEntries(Object.keys(perms).map(p => [p, !allOn]));
    setRoles(prev =>
      prev.map(r =>
        r.id === activeRole.id ? { ...r, permissions: { ...r.permissions, [module]: updated } } : r
      )
    );
    setActiveRole(prev => ({ ...prev, permissions: { ...prev.permissions, [module]: updated } }));
  }

  function handleSaveRole(form) {
    if (modal === "add") {
      const newRole = {
        id: Date.now(),
        name: form.name,
        color: form.color,
        lightColor: form.color + "22",
        description: form.description,
        employeeCount: 0,
        permissions: Object.fromEntries(
          PERMISSION_MODULES.map(m => [m.module, Object.fromEntries(m.permissions.map(p => [p, false]))])
        ),
      };
      setRoles(prev => [...prev, newRole]);
      setActiveRole(newRole);
      showToast(`Role "${form.name}" created!`);
    } else {
      setRoles(prev => prev.map(r => r.id === activeRole.id ? { ...r, name: form.name, description: form.description, color: form.color } : r));
      setActiveRole(prev => ({ ...prev, name: form.name, description: form.description, color: form.color }));
      showToast(`Role "${form.name}" updated!`);
    }
    setModal(null);
  }

  function handleDelete() {
    setRoles(prev => {
      const next = prev.filter(r => r.id !== activeRole.id);
      setActiveRole(next[0] || null);
      return next;
    });
    showToast(`Role "${activeRole.name}" deleted.`, "danger");
    setModal(null);
  }

  function handleSavePermissions() {
    showToast(`Permissions for "${activeRole.name}" saved successfully!`);
  }

  const filteredModules = PERMISSION_MODULES.filter(m =>
    m.module.toLowerCase().includes(search.toLowerCase()) ||
    m.permissions.some(p => p.toLowerCase().includes(search.toLowerCase()))
  );

  function getPermCount(role) {
    return Object.values(role.permissions).flatMap(Object.values).filter(Boolean).length;
  }
  function getTotalPerms() {
    return PERMISSION_MODULES.reduce((acc, m) => acc + m.permissions.length, 0);
  }

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes slideIn    { from { transform: translateX(40px); opacity: 0; } to { transform: none; opacity: 1; } }
        @keyframes shrinkBar  { from { width: 100%; } to { width: 0%; } }
        @keyframes modalPop   { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes fadeUp     { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes fadeLeft   { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: none; } }
        @keyframes pulseRing  { 0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.18); } 50% { box-shadow: 0 0 0 6px rgba(99,102,241,0); } }
        .role-card:hover      { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        .perm-row:hover       { background: #F8FAFC !important; }
        .mod-header:hover     { background: #F1F5F9 !important; }
        .btn-icon:hover       { opacity: 0.8; transform: scale(1.06); }
      `}</style>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
      {modal === "add"    && <RoleModal role={null}       onClose={() => setModal(null)} onSave={handleSaveRole} />}
      {modal === "edit"   && <RoleModal role={activeRole} onClose={() => setModal(null)} onSave={handleSaveRole} />}
      {modal === "delete" && <DeleteModal role={activeRole} onClose={() => setModal(null)} onConfirm={handleDelete} />}

      {/* Page Header */}
      <div style={{ ...S.header, opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 0.5s ease both" : "none" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={S.headerIcon}>🔐</div>
            <div>
              <h1 style={S.title}>Roles & Permissions</h1>
              <p style={S.subtitle}>Manage access control and define what each role can do across the system.</p>
            </div>
          </div>
        </div>
        <button onClick={() => setModal("add")} style={S.btnCreate}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "none"}>
          + Create Role
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24, opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 0.55s 0.05s ease both" : "none" }}>
        {[
          { label: "Total Roles", value: roles.length, icon: "🏷️", color: "#6366F1", bg: "#EEF2FF" },
          { label: "Total Permissions", value: getTotalPerms(), icon: "🔑", color: "#0EA5E9", bg: "#E0F2FE" },
          { label: "Total Employees", value: roles.reduce((a, r) => a + r.employeeCount, 0), icon: "👤", color: "#10B981", bg: "#D1FAE5" },
          { label: "Active Modules", value: PERMISSION_MODULES.length, icon: "📦", color: "#F59E0B", bg: "#FEF3C7" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 14, animation: `fadeUp 0.5s ${0.08 + i * 0.05}s ease both`, opacity: mounted ? 1 : 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 3, fontWeight: 500 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main layout: sidebar + permissions panel */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 0.6s 0.1s ease both" : "none" }}>

        {/* Roles Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2, paddingLeft: 2 }}>All Roles ({roles.length})</div>
          {roles.map((role, idx) => {
            const isActive = activeRole?.id === role.id;
            const count = getPermCount(role);
            return (
              <div key={role.id} className="role-card"
                onClick={() => setActiveRole(role)}
                style={{
                  background: isActive ? role.lightColor : "#fff",
                  border: `1.5px solid ${isActive ? role.color + "55" : "#F1F5F9"}`,
                  borderRadius: 13, padding: "13px 15px", cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
                  boxShadow: isActive ? `0 4px 16px ${role.color}22` : "0 1px 4px rgba(0,0,0,0.04)",
                  animation: `fadeLeft 0.4s ${idx * 0.06}s ease both`,
                  position: "relative", overflow: "hidden",
                }}>
                {isActive && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: role.color, borderRadius: "0 3px 3px 0" }} />}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: role.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: 800 }}>
                      {role.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{role.name}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>{role.employeeCount} employee{role.employeeCount !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: role.color }}>{count}</div>
                    <div style={{ fontSize: 10, color: "#CBD5E1" }}>perms</div>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{ marginTop: 10, background: "#F1F5F9", borderRadius: 20, height: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(count / getTotalPerms()) * 100}%`, height: "100%", background: role.color, borderRadius: 20, transition: "width 0.5s ease" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Permissions Panel */}
        {activeRole ? (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #F1F5F9", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Panel header */}
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #F8FAFC", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FAFBFC" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: activeRole.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#fff", fontWeight: 800, boxShadow: `0 4px 12px ${activeRole.color}44` }}>
                  {activeRole.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>{activeRole.name}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 1 }}>{activeRole.description || "No description"}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ fontSize: 12, color: "#94A3B8", background: "#F8FAFC", padding: "4px 12px", borderRadius: 20, border: "1px solid #E2E8F0" }}>
                  <strong style={{ color: activeRole.color }}>{getPermCount(activeRole)}</strong> / {getTotalPerms()} permissions
                </div>
                <button onClick={() => setModal("edit")} className="btn-icon"
                  style={{ width: 34, height: 34, borderRadius: 9, border: "1.5px solid #E2E8F0", background: "#fff", cursor: "pointer", fontSize: 14, transition: "all 0.15s" }} title="Edit Role">✏️</button>
                {activeRole.id !== 1 && (
                  <button onClick={() => setModal("delete")} className="btn-icon"
                    style={{ width: 34, height: 34, borderRadius: 9, border: "1.5px solid #FEE2E2", background: "#FFF5F5", cursor: "pointer", fontSize: 14, transition: "all 0.15s" }} title="Delete Role">🗑</button>
                )}
              </div>
            </div>

            {/* Search bar inside panel */}
            <div style={{ padding: "12px 22px", borderBottom: "1px solid #F8FAFC" }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search modules or permissions…"
                style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #E2E8F0", borderRadius: 9, fontSize: 13, color: "#0F172A", outline: "none", boxSizing: "border-box", background: "#F8FAFC" }}
              />
            </div>

            {/* Permission modules */}
            <div style={{ overflowY: "auto", flex: 1, padding: "14px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
              {filteredModules.map((mod, mi) => {
                const perms = activeRole.permissions[mod.module] || {};
                const allOn = mod.permissions.every(p => perms[p]);
                const someOn = mod.permissions.some(p => perms[p]);
                return (
                  <div key={mod.module} style={{ border: "1.5px solid #F1F5F9", borderRadius: 12, overflow: "hidden", animation: `fadeUp 0.35s ${mi * 0.05}s ease both` }}>
                    {/* Module header */}
                    <div className="mod-header"
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: allOn ? `${activeRole.color}08` : "#FAFBFC", cursor: "pointer", transition: "background 0.15s", borderBottom: "1px solid #F1F5F9" }}
                      onClick={() => handleToggleAll(mod.module)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{mod.icon}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{mod.module}</div>
                          <div style={{ fontSize: 11, color: "#94A3B8" }}>{mod.permissions.filter(p => perms[p]).length} of {mod.permissions.length} enabled</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {someOn && !allOn && (
                          <span style={{ fontSize: 10, background: "#FEF3C7", color: "#92400E", padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>Partial</span>
                        )}
                        {allOn && (
                          <span style={{ fontSize: 10, background: activeRole.lightColor, color: activeRole.color, padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>All On</span>
                        )}
                        <Toggle checked={allOn} onChange={() => handleToggleAll(mod.module)} color={activeRole.color} />
                      </div>
                    </div>
                    {/* Individual permissions */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                      {mod.permissions.map((perm, pi) => (
                        <div key={perm} className="perm-row"
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 16px", borderBottom: pi < mod.permissions.length - 2 ? "1px solid #F8FAFC" : "none", borderRight: pi % 2 === 0 ? "1px solid #F8FAFC" : "none", transition: "background 0.12s", background: perms[perm] ? `${activeRole.color}05` : "#fff" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: perms[perm] ? activeRole.color : "#E2E8F0", transition: "background 0.2s", flexShrink: 0 }} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: perms[perm] ? "#1E293B" : "#94A3B8", transition: "color 0.2s" }}>{perm}</span>
                          </div>
                          <Toggle checked={!!perms[perm]} onChange={() => handleToggle(mod.module, perm)} color={activeRole.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {filteredModules.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#94A3B8" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                  <div style={{ fontSize: 14 }}>No modules match your search.</div>
                </div>
              )}
            </div>

            {/* Save footer */}
            <div style={{ padding: "14px 22px", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "flex-end", gap: 8, background: "#FAFBFC" }}>
              <button onClick={() => setActiveRole(roles.find(r => r.id === activeRole.id))}
                style={{ padding: "8px 18px", borderRadius: 9, border: "1.5px solid #E2E8F0", background: "#fff", color: "#475569", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
                Reset
              </button>
              <button onClick={handleSavePermissions}
                style={{ padding: "8px 22px", borderRadius: 9, border: "none", background: activeRole.color, color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 700, boxShadow: `0 4px 12px ${activeRole.color}44`, transition: "transform 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                💾 Save Permissions
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, color: "#94A3B8", padding: 48 }}>
            <div style={{ fontSize: 40 }}>🔐</div>
            <div style={{ fontSize: 14 }}>Select a role to manage permissions</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const S = {
  page:       { padding: "26px 30px", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", background: "#F8FAFC", minHeight: "100vh" },
  header:     { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  headerIcon: { width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 14px rgba(99,102,241,0.3)", flexShrink: 0 },
  title:      { fontSize: 22, fontWeight: 800, color: "#0F172A", margin: 0, letterSpacing: "-0.02em" },
  subtitle:   { fontSize: 13, color: "#94A3B8", margin: "3px 0 0" },
  btnCreate:  { padding: "9px 22px", borderRadius: 10, fontSize: 13, fontWeight: 700, border: "none", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "#fff", cursor: "pointer", boxShadow: "0 4px 14px rgba(99,102,241,0.35)", transition: "transform 0.15s, box-shadow 0.15s", whiteSpace: "nowrap" },
};

const FL = {
  label:     { fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" },
  input:     { width: "100%", padding: "8px 11px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 13, color: "#0F172A", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  btnCancel: { padding: "8px 18px", borderRadius: 9, border: "1.5px solid #E2E8F0", background: "#fff", color: "#475569", fontSize: 13, cursor: "pointer", fontWeight: 500 },
  btnPrimary:{ padding: "8px 20px", borderRadius: 9, border: "none", color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 700, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
};
