"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import Link from 'next/link';

export const STORAGE_KEY = "employee_list_data";

export const INITIAL_EMPLOYEES = [
  { id: "STF-0001", name: "Staff Member", email: "staff@example.com", phone: "+1234567892", designation: "N/A", role: "Staff", department: "Admin", status: "Permanent", joiningDate: "2020-01-01", shift: "Morning Shift (10:00 AM - 06:00 PM)", payslipType: "Monthly", jobType: "Full Time", reportingManager: "N/A", profileComplete: 61, isAbsent: true, dob: "1972-10-19", maritalStatus: "Divorced", address: "6472 Labadie Port South Coleman", salary: "50000", trashed: false },
  { id: "ADM-0001", name: "Super Admin", email: "admin@example.com", phone: "+1234567890", designation: "CEO", role: "Super Admin", department: "Admin", status: "Permanent", joiningDate: "2020-01-01", shift: "Morning Shift (10:00 AM - 06:00 PM)", payslipType: "Monthly", jobType: "Full Time", reportingManager: "N/A", profileComplete: 61, isAbsent: false, dob: "1984-04-15", maritalStatus: "Single", address: "90961 Adrienne Knoll Apt. 843 Wi", salary: "120000", trashed: false },
  { id: "HR-0001", name: "HR Manager", email: "hr@example.com", phone: "+1234567891", designation: "Operations Manager", role: "HR", department: "Admin", status: "Permanent", joiningDate: "2020-01-01", shift: "Morning Shift (10:00 AM - 06:00 PM)", payslipType: "Monthly", jobType: "Full Time", reportingManager: "N/A", profileComplete: 61, isAbsent: false, dob: "1991-10-29", maritalStatus: "Married", address: "789 Littel Ferry Zacheryborough", salary: "75000", trashed: false },
];

export const ROLE_OPTIONS    = ["Staff", "Super Admin", "HR", "Manager", "Developer"];
export const DEPT_OPTIONS    = ["Admin", "Engineering", "HR", "Finance", "Marketing"];
export const STATUS_OPTIONS  = ["Permanent", "Contract", "Probation", "Internship"];
export const JOB_TYPE_OPTIONS= ["Full Time", "Part Time", "Remote", "Freelance"];
export const PAYSLIP_OPTIONS = ["Monthly", "Weekly", "Bi-weekly"];
export const SHIFT_OPTIONS   = ["Morning Shift (10:00 AM - 06:00 PM)", "Evening Shift (02:00 PM - 10:00 PM)", "Night Shift (10:00 PM - 06:00 AM)"];
export const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];

const AVATAR_COLORS = [
  { bg: "#E0F2FE", color: "#0369A1" },
  { bg: "#EDE9FE", color: "#6D28D9" },
  { bg: "#FCE7F3", color: "#9D174D" },
  { bg: "#D1FAE5", color: "#065F46" },
  { bg: "#FEF3C7", color: "#92400E" },
];

function getInitials(name) { return (name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(); }
function getAvatarColor(str) { return AVATAR_COLORS[(str || "A").charCodeAt(0) % AVATAR_COLORS.length]; }

export function loadEmployees() {
  try { const r = localStorage.getItem(STORAGE_KEY); if (r) return JSON.parse(r); } catch (_) {}
  return INITIAL_EMPLOYEES;
}
export function saveEmployees(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    fetch('/api/employees/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    }).catch(err => console.error("Sync failed:", err));
  } catch (_) {}
}

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); }, []);
  const colors = { success: { bg: "#166534", bar: "#22C55E" }, warning: { bg: "#854D0E", bar: "#F59E0B" }, danger: { bg: "#991B1B", bar: "#EF4444" } };
  const c = colors[type] || colors.success;
  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, animation: "slideInRight 0.35s cubic-bezier(.4,0,.2,1)" }}>
      <div style={{ background: c.bg, color: "#fff", padding: "12px 20px 10px", borderRadius: 10, fontSize: 13, fontWeight: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", minWidth: 240, overflow: "hidden", position: "relative" }}>
        {msg}
        <div style={{ position: "absolute", bottom: 0, left: 0, height: 3, background: c.bar, borderRadius: "0 0 10px 10px", animation: "shrink 3s linear forwards" }} />
      </div>
    </div>
  );
}

// ── Action Dropdown ────────────────────────────────────────────────────────────
function ActionDropdown({ emp, onView, onEdit, onTrash }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ background: open ? "#EEF2FF" : "#fff", border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 16, color: "#6366F1", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 3 }}
      >
        ⚙ <span style={{ fontSize: 11, color: "#9CA3AF" }}>▾</span>
      </button>
      {open && (
        <div style={{ position: "absolute", right: 0, top: "110%", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 999, minWidth: 160, overflow: "hidden", animation: "dropDown 0.18s cubic-bezier(.4,0,.2,1)" }}>
          {[
            { label: "👁  View Details", action: onView, color: "#374151" },
            { label: "✏️  Edit Employee", action: onEdit, color: "#374151" },
            { label: "🗑  Move to Trash", action: onTrash, color: "#DC2626" },
          ].map(({ label, action, color }) => (
            <button key={label} onClick={() => { setOpen(false); action(emp); }}
              style={{ display: "block", width: "100%", padding: "10px 16px", background: "none", border: "none", borderBottom: "1px solid #F9FAFB", textAlign: "left", fontSize: 13, cursor: "pointer", color, fontWeight: 500, transition: "background 0.1s" }}
              onMouseEnter={e => e.target.style.background = "#F9FAFB"}
              onMouseLeave={e => e.target.style.background = "none"}
            >{label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Field Row (table cell content) ────────────────────────────────────────────
function FR({ label, value, node }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "82px 8px 1fr", gap: "0 2px", marginBottom: 4, fontSize: 12, alignItems: "start" }}>
      <span style={{ color: "#6B7280", fontWeight: 500 }}>{label}</span>
      <span style={{ color: "#9CA3AF" }}>:</span>
      {node ? node : <span style={{ color: "#111827" }}>{value || "—"}</span>}
    </div>
  );
}

// ── Status Chip ───────────────────────────────────────────────────────────────
function Chip({ label, variant = "green" }) {
  const v = {
    green:  { bg: "#D1FAE5", color: "#065F46" },
    purple: { bg: "#EDE9FE", color: "#4C1D95" },
    red:    { bg: "#FEE2E2", color: "#991B1B" },
    blue:   { bg: "#DBEAFE", color: "#1E40AF" },
    amber:  { bg: "#FEF3C7", color: "#92400E" },
  }[variant];
  return <span style={{ display: "inline-block", background: v.bg, color: v.color, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>{label}</span>;
}

// ── Edit Modal Form Field ──────────────────────────────────────────────────────
function FormField({ label, name, value, onChange, type = "text", options, required, error }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{label}{required && <span style={{ color: "#EF4444" }}> *</span>}</label>
      {options
        ? <select name={name} value={value} onChange={onChange} style={EF.input}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>
        : <input type={type} name={name} value={value} onChange={onChange} style={{ ...EF.input, borderColor: error ? "#EF4444" : "#D1D5DB" }} />}
      {error && <span style={{ fontSize: 11, color: "#EF4444" }}>{error}</span>}
    </div>
  );
}

// ── View Modal ─────────────────────────────────────────────────────────────────
function ViewModal({ emp, onClose, onEdit }) {
  const av = getAvatarColor(emp.id);
  return (
    <div style={M.overlay}>
      <div style={{ ...M.box, maxWidth: 700, animation: "modalIn 0.28s cubic-bezier(.4,0,.2,1)" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", padding: "20px 24px", borderRadius: "14px 14px 0 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff", border: "2px solid rgba(255,255,255,0.3)" }}>{getInitials(emp.name)}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{emp.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{emp.id} · {emp.designation || "No Designation"}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                <Chip label={emp.role} variant="purple" />
                <Chip label={emp.isAbsent ? "Absent Today" : "Present Today"} variant={emp.isAbsent ? "red" : "green"} />
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto", maxHeight: "60vh" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { title: "Personal Info", rows: [["Email", emp.email], ["Phone", emp.phone], ["Date of Birth", emp.dob], ["Marital Status", emp.maritalStatus], ["Address", emp.address]] },
              { title: "Work Info", rows: [["Department", emp.department], ["Designation", emp.designation], ["Joining Date", emp.joiningDate], ["Job Type", emp.jobType], ["Shift", emp.shift], ["Payslip Type", emp.payslipType], ["Reporting Mgr", emp.reportingManager]] },
              { title: "Salary & Status", rows: [["Status", emp.status], ["Profile %", `${emp.profileComplete}%`], ["Salary", emp.salary ? `₹ ${Number(emp.salary).toLocaleString()}` : "N/A"]] },
            ].map(({ title, rows }) => (
              <div key={title} style={{ background: "#F9FAFB", borderRadius: 10, padding: "14px", border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6366F1", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</div>
                {rows.map(([l, v]) => (
                  <div key={l} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 4, marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: "#6B7280", fontWeight: 500 }}>{l}</span>
                    <span style={{ color: "#111827", fontWeight: 500 }}>{v || "—"}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={M.footer}>
          <button style={M.btnCancel} onClick={onClose}>Close</button>
          <button style={M.btnPrimary} onClick={() => { onClose(); onEdit(emp); }}>✏️ Edit Employee</button>
        </div>
      </div>
    </div>
  );
}

// ── Edit Modal ─────────────────────────────────────────────────────────────────
function EditModal({ emp, onClose, onSave }) {
  const [form, setForm] = useState({ ...emp });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: undefined }));
  }
  function validate() {
    const e = {};
    if (!form.name?.trim()) e.name = "Required";
    if (!form.email?.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone?.trim()) e.phone = "Required";
    if (!form.joiningDate) e.joiningDate = "Required";
    return e;
  }
  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
  }

  return (
    <div style={M.overlay}>
      <div style={{ ...M.box, maxWidth: 680, animation: "modalIn 0.28s cubic-bezier(.4,0,.2,1)" }}>
        <div style={M.header}>
          <div>
            <div style={M.headerTitle}>Edit Employee</div>
            <div style={M.headerSub}>{emp.id} · {emp.name}</div>
          </div>
          <button style={M.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={{ padding: "18px 22px", overflowY: "auto", maxHeight: "65vh" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 18px" }}>
            <FormField label="Full Name" name="name" value={form.name || ""} onChange={handleChange} required error={errors.name} />
            <FormField label="Email" name="email" type="email" value={form.email || ""} onChange={handleChange} required error={errors.email} />
            <FormField label="Phone" name="phone" value={form.phone || ""} onChange={handleChange} required error={errors.phone} />
            <FormField label="Designation" name="designation" value={form.designation || ""} onChange={handleChange} />
            <FormField label="Role" name="role" value={form.role || ""} onChange={handleChange} options={ROLE_OPTIONS} />
            <FormField label="Department" name="department" value={form.department || ""} onChange={handleChange} options={DEPT_OPTIONS} />
            <FormField label="Status" name="status" value={form.status || ""} onChange={handleChange} options={STATUS_OPTIONS} />
            <FormField label="Job Type" name="jobType" value={form.jobType || ""} onChange={handleChange} options={JOB_TYPE_OPTIONS} />
            <FormField label="Joining Date" name="joiningDate" type="date" value={form.joiningDate || ""} onChange={handleChange} required error={errors.joiningDate} />
            <FormField label="Shift" name="shift" value={form.shift || ""} onChange={handleChange} options={SHIFT_OPTIONS} />
            <FormField label="Payslip Type" name="payslipType" value={form.payslipType || ""} onChange={handleChange} options={PAYSLIP_OPTIONS} />
            <FormField label="Reporting Manager" name="reportingManager" value={form.reportingManager || ""} onChange={handleChange} />
            <FormField label="Date of Birth" name="dob" type="date" value={form.dob || ""} onChange={handleChange} />
            <FormField label="Marital Status" name="maritalStatus" value={form.maritalStatus || ""} onChange={handleChange} options={MARITAL_OPTIONS} />
            <FormField label="Salary (₹)" name="salary" type="number" value={form.salary || ""} onChange={handleChange} />
            <FormField label="Address" name="address" value={form.address || ""} onChange={handleChange} />
          </div>
        </div>
        <div style={M.footer}>
          <button style={M.btnCancel} onClick={onClose}>Cancel</button>
          <button style={M.btnPrimary} onClick={handleSave}>💾 Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── Trash Modal ────────────────────────────────────────────────────────────────
function TrashModal({ trashed, onClose, onRestore, onDelete, onEmptyAll }) {
  return (
    <div style={M.overlay}>
      <div style={{ ...M.box, maxWidth: 700, animation: "modalIn 0.28s cubic-bezier(.4,0,.2,1)" }}>
        <div style={M.header}>
          <div>
            <div style={M.headerTitle}>🗑 Trash</div>
            <div style={M.headerSub}>{trashed.length} deleted item{trashed.length !== 1 ? "s" : ""}</div>
          </div>
          <button style={M.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={{ padding: "16px 22px", overflowY: "auto", maxHeight: "55vh" }}>
          {trashed.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#9CA3AF" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🗑</div>
              <div style={{ fontSize: 14 }}>Trash is empty</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {trashed.map(emp => {
                const av = getAvatarColor(emp.id);
                return (
                  <div key={emp.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid #F3F4F6", borderRadius: 10, background: "#FAFAFA" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: av.bg, color: av.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{getInitials(emp.name)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{emp.name}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{emp.id} · {emp.email}</div>
                    </div>
                    <Chip label={emp.department} variant="blue" />
                    <Chip label={emp.role} variant="purple" />
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => onRestore(emp)} style={{ padding: "5px 12px", borderRadius: 7, border: "1.5px solid #A5B4FC", background: "#fff", color: "#4338CA", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>↩ Restore</button>
                      <button onClick={() => onDelete(emp)} style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "#FEE2E2", color: "#DC2626", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>✕ Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div style={M.footer}>
          <button style={M.btnCancel} onClick={onClose}>Close</button>
          {trashed.length > 0 && <button onClick={onEmptyAll} style={{ ...M.btnPrimary, background: "#EF4444", boxShadow: "0 4px 12px rgba(239,68,68,0.3)" }}>Empty All Trash</button>}
        </div>
      </div>
    </div>
  );
}

// ── Main Employee List Page ────────────────────────────────────────────────────
export default function EmployeeListPage({ onCreateClick }) {
  const [employees, setEmployees]       = useState(() => loadEmployees());
  const [keyword, setKeyword]           = useState("");
  const [appliedKw, setAppliedKw]       = useState("");
  const [perPage, setPerPage]           = useState(10);
  const [page, setPage]                 = useState(1);
  const [modal, setModal]               = useState(null); // "view"|"edit"|"trash"
  const [selectedEmp, setSelectedEmp]   = useState(null);
  const [toast, setToast]               = useState(null);
  const [rowAnim, setRowAnim]           = useState(false);

  useEffect(() => { saveEmployees(employees); }, [employees]);

  function showToast(msg, type = "success") { setToast({ msg, type }); }

  const active  = useMemo(() => employees.filter(e => !e.trashed), [employees]);
  const trashed = useMemo(() => employees.filter(e => e.trashed),  [employees]);

  const filtered = useMemo(() => {
    const kw = appliedKw.toLowerCase();
    return active.filter(e =>
      !kw ||
      e.name?.toLowerCase().includes(kw) ||
      e.email?.toLowerCase().includes(kw) ||
      e.id?.toLowerCase().includes(kw) ||
      e.phone?.includes(kw)
    );
  }, [active, appliedKw]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  function doSearch() { setAppliedKw(keyword); setPage(1); setRowAnim(v => !v); }

  function handleSaveEdit(updated) {
    setEmployees(prev => prev.map(e => e.id === updated.id ? { ...updated, trashed: false } : e));
    setModal(null);
    showToast(`"${updated.name}" updated successfully!`);
  }
  function moveToTrash(emp) {
    setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, trashed: true } : e));
    showToast(`"${emp.name}" moved to trash.`, "warning");
  }
  function restoreFromTrash(emp) {
    setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, trashed: false } : e));
    showToast(`"${emp.name}" restored!`);
  }
  function permanentDelete(emp) {
    setEmployees(prev => prev.filter(e => e.id !== emp.id));
    showToast(`"${emp.name}" permanently deleted.`, "danger");
  }
  function emptyTrash() {
    setEmployees(prev => prev.filter(e => !e.trashed));
    showToast("Trash emptied.", "danger");
  }

  const stats = [
    { label: "Total",      value: filtered.length,                                       color: "#6366F1" },
    { label: "Active",     value: filtered.length,                                       color: "#059669" },
    { label: "Absent",     value: filtered.filter(e => e.isAbsent).length,               color: "#EF4444" },
    { label: "Present",    value: filtered.filter(e => !e.isAbsent).length,              color: "#3B82F6" },
    { label: "Departments",value: new Set(filtered.map(e => e.department)).size,          color: "#F59E0B" },
    { label: "Roles",      value: new Set(filtered.map(e => e.role)).size,               color: "#8B5CF6" },
  ];

  const start = filtered.length === 0 ? 0 : (safePage - 1) * perPage + 1;
  const end   = Math.min(safePage * perPage, filtered.length);

  return (
    <div style={P.page}>
      <style>{`
        @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes shrink       { from { width: 100%; } to { width: 0%; } }
        @keyframes dropDown     { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalIn      { from { opacity: 0; transform: scale(0.94) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fadeInRow    { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        .emp-row { animation: fadeInRow 0.3s ease both; }
        .emp-row:hover { background: #FAFAFF !important; }
        .pg-btn:hover  { background: #EEF2FF !important; color: #4338CA !important; }
      `}</style>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={P.pageTitle}>Employee List</h1>
          <p style={P.pageSub}>{active.length} total employees · {trashed.length} in trash</p>
        </div>
        <Link href="/employee/create">
          <button
            onClick={onCreateClick}
            style={P.btnCreate}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            + Add Employee
          </button>
        </Link>
      </div>

      {/* Toolbar — single search bar only */}
      <div style={P.toolbar}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#6B7280" }}>Show</span>
          <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }} style={P.select}>
            {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span style={{ fontSize: 12, color: "#6B7280" }}>entries</span>
        </div>

        {/* Single search bar — grows to fill available space */}
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 480 }}>
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && doSearch()}
            placeholder="Search by name, email, ID or phone…"
            style={P.searchInput}
          />
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#9CA3AF" }}>⌕</span>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={doSearch} style={P.btnSearch}>🔍 Search</button>
          <button onClick={() => setModal("trash")} style={P.btnTrash}>
            🗑 Trash {trashed.length > 0 && <span style={P.trashBadge}>{trashed.length}</span>}
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={P.statsBar}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...P.statCell, borderRight: i < stats.length - 1 ? "1px solid #E5E7EB" : "none" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={P.tableCard}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {["ID & Profile", "Employee Info", "Work Profile", "Employment Status", "Other Details", "Action"].map(h => (
                  <th key={h} style={P.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: "48px 0", color: "#9CA3AF", fontSize: 14 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>No employees found.
                </td></tr>
              ) : paginated.map((emp, idx) => {
                const av = getAvatarColor(emp.id);
                return (
                  <tr key={emp.id} className="emp-row" style={{ borderBottom: "1px solid #F3F4F6", animationDelay: `${idx * 0.04}s` }}>
                    {/* ID Column */}
                    <td style={{ ...P.td, textAlign: "center", width: 80 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 11, background: av.bg, color: av.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, margin: "0 auto 4px" }}>{getInitials(emp.name)}</div>
                      <div style={{ fontSize: 10, background: "#EEF2FF", color: "#4338CA", borderRadius: 20, padding: "1px 7px", display: "inline-block", marginBottom: 2, fontWeight: 600 }}>{emp.profileComplete}%</div>
                      <div style={{ fontSize: 11, color: "#6366F1", fontWeight: 600 }}>{emp.id}</div>
                    </td>
                    {/* Employee Info */}
                    <td style={{ ...P.td, minWidth: 170 }}>
                      <FR label="Name"  value={emp.name}  node={<span style={{ fontWeight: 600, color: "#111827" }}>{emp.name}</span>} />
                      <FR label="Desig" value={emp.designation} node={emp.designation && emp.designation !== "N/A" ? <span style={{ color: "#D97706", fontWeight: 600 }}>{emp.designation}</span> : null} />
                      <FR label="Email" value={emp.email} />
                      <FR label="Phone" value={emp.phone} />
                    </td>
                    {/* Work Profile */}
                    <td style={{ ...P.td, minWidth: 200 }}>
                      <FR label="Joined"   value={emp.joiningDate} />
                      <FR label="Shift"    value={emp.shift} />
                      <FR label="Payslip"  value={emp.payslipType} />
                      <FR label="Dept"     node={<Chip label={emp.department} variant="blue" />} />
                    </td>
                    {/* Employment Status */}
                    <td style={{ ...P.td, minWidth: 200 }}>
                      <FR label="Status"  node={<Chip label={emp.status} variant="green" />} />
                      <FR label="Manager" value={emp.reportingManager} />
                      <FR label="Job"     value={emp.jobType} />
                      <FR label="Role"    node={<Chip label={emp.role} variant="purple" />} />
                    </td>
                    {/* Other Details */}
                    <td style={{ ...P.td, minWidth: 190 }}>
                      <FR label="Salary cfg" node={<Chip label={emp.salary ? "Configured" : "Pending"} variant={emp.salary ? "green" : "amber"} />} />
                      <FR label="DOB"       value={emp.dob} />
                      <FR label="Marital"   value={emp.maritalStatus} />
                      <FR label="Address"   value={emp.address ? emp.address.slice(0, 26) + (emp.address.length > 26 ? "…" : "") : "—"} />
                    </td>
                    {/* Action */}
                    <td style={{ ...P.td, textAlign: "center", width: 60 }}>
                      <ActionDropdown
                        emp={emp}
                        onView={e  => { setSelectedEmp(e); setModal("view"); }}
                        onEdit={e  => { setSelectedEmp(e); setModal("edit"); }}
                        onTrash={e => moveToTrash(e)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={P.pagination}>
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>Showing <strong style={{ color: "#374151" }}>{start}–{end}</strong> of <strong style={{ color: "#374151" }}>{filtered.length}</strong> entries</span>
          <div style={{ display: "flex", gap: 4 }}>
            <button className="pg-btn" style={{ ...P.pgBtn, opacity: safePage === 1 ? 0.4 : 1 }} disabled={safePage === 1} onClick={() => setPage(p => p - 1)}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} className="pg-btn" style={{ ...P.pgBtn, ...(n === safePage ? P.pgBtnActive : {}) }} onClick={() => setPage(n)}>{n}</button>
            ))}
            <button className="pg-btn" style={{ ...P.pgBtn, opacity: safePage === totalPages ? 0.4 : 1 }} disabled={safePage === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal === "view"  && selectedEmp && <ViewModal  emp={selectedEmp} onClose={() => setModal(null)} onEdit={e => { setSelectedEmp(e); setModal("edit"); }} />}
      {modal === "edit"  && selectedEmp && <EditModal  emp={selectedEmp} onClose={() => setModal(null)} onSave={handleSaveEdit} />}
      {modal === "trash" && <TrashModal trashed={trashed} onClose={() => setModal(null)} onRestore={restoreFromTrash} onDelete={permanentDelete} onEmptyAll={emptyTrash} />}
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const P = {
  page:       { padding: "24px 28px", fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#F8FAFC", minHeight: "100vh" },
  pageTitle:  { fontSize: 22, fontWeight: 800, margin: 0, color: "#0F172A", letterSpacing: "-0.02em" },
  pageSub:    { fontSize: 13, color: "#94A3B8", margin: "4px 0 0" },
  toolbar:    { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 14 },
  select:     { padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 12, background: "#fff", color: "#374151", cursor: "pointer", outline: "none" },
  searchInput:{ width: "100%", padding: "7px 10px 7px 32px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 13, background: "#fff", color: "#374151", outline: "none", boxSizing: "border-box" },
  btnCreate:  { padding: "9px 22px", borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "#fff", boxShadow: "0 4px 14px rgba(99,102,241,0.4)", transition: "transform 0.15s, box-shadow 0.15s" },
  btnSearch:  { padding: "7px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: "#6366F1", color: "#fff" },
  btnTrash:   { display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: "#FEE2E2", color: "#DC2626" },
  trashBadge: { background: "#DC2626", color: "#fff", borderRadius: 20, padding: "0 6px", fontSize: 11, fontWeight: 700 },
  statsBar:   { display: "grid", gridTemplateColumns: "repeat(6,1fr)", border: "1.5px solid #E5E7EB", borderRadius: 12, overflow: "hidden", background: "#fff", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" },
  statCell:   { padding: "14px 18px" },
  tableCard:  { border: "1.5px solid #E5E7EB", borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" },
  th:         { padding: "11px 14px", textAlign: "left", fontWeight: 600, fontSize: 11, color: "#6B7280", borderBottom: "1.5px solid #E5E7EB", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.05em" },
  td:         { padding: "12px 14px", verticalAlign: "top", color: "#374151" },
  pagination: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: "1.5px solid #F1F5F9", flexWrap: "wrap", gap: 8 },
  pgBtn:      { padding: "5px 11px", borderRadius: 7, border: "1.5px solid #E5E7EB", background: "#fff", fontSize: 13, cursor: "pointer", color: "#374151", transition: "all 0.15s", fontWeight: 500 },
  pgBtnActive:{ background: "#6366F1", color: "#fff", borderColor: "#6366F1" },
};

const M = {
  overlay:     { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20, boxSizing: "border-box", backdropFilter: "blur(3px)" },
  box:         { background: "#fff", borderRadius: 14, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" },
  header:      { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px", borderBottom: "1.5px solid #F1F5F9", background: "#FAFAFA", borderRadius: "14px 14px 0 0", flexShrink: 0 },
  headerTitle: { fontSize: 16, fontWeight: 700, color: "#0F172A" },
  headerSub:   { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  closeBtn:    { background: "#F1F5F9", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", color: "#64748B", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" },
  footer:      { display: "flex", justifyContent: "flex-end", gap: 8, padding: "14px 22px", borderTop: "1.5px solid #F1F5F9", flexShrink: 0 },
  btnCancel:   { padding: "8px 18px", borderRadius: 8, fontSize: 13, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", cursor: "pointer", fontWeight: 500 },
  btnPrimary:  { padding: "8px 20px", borderRadius: 8, fontSize: 13, border: "none", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "#fff", cursor: "pointer", fontWeight: 700, boxShadow: "0 4px 12px rgba(99,102,241,0.35)" },
};

const EF = {
  input: { padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 7, fontSize: 13, color: "#111827", outline: "none", background: "#fff", width: "100%", boxSizing: "border-box" },
};
