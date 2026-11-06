



// "use client";

// import React, { useState, useEffect } from "react";

// // ─── Keyframe Animations (injected once) ─────────────────────────────────────
// const ANIMATIONS = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

// @keyframes fadeSlideIn {
//   from { opacity: 0; transform: translateY(18px); }
//   to   { opacity: 1; transform: translateY(0); }
// }
// @keyframes statNumBounce {
//   0%   { transform: translateY(10px); opacity: 0; }
//   60%  { transform: translateY(-4px); }
//   100% { transform: translateY(0); opacity: 1; }
// }
// @keyframes rowSlide {
//   from { opacity: 0; transform: translateX(-14px); }
//   to   { opacity: 1; transform: translateX(0); }
// }
// @keyframes progressFill {
//   from { width: 0%; }
// }
// @keyframes badgePop {
//   0%   { transform: scale(0.7); opacity: 0; }
//   70%  { transform: scale(1.12); }
//   100% { transform: scale(1); opacity: 1; }
// }
// @keyframes dotPulse {
//   0%, 100% { transform: scale(1); opacity: 1; }
//   50%       { transform: scale(1.6); opacity: 0.6; }
// }
// @keyframes floatBtn {
//   0%, 100% { transform: translateY(0); }
//   50%       { transform: translateY(-4px); }
// }
// @keyframes pulseRing {
//   0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
//   70%  { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
//   100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
// }
// @keyframes drawerIn {
//   from { transform: translateX(100%); opacity: 0.5; }
//   to   { transform: translateX(0);    opacity: 1; }
// }
// @keyframes drawerOut {
//   from { transform: translateX(0);    opacity: 1; }
//   to   { transform: translateX(100%); opacity: 0.5; }
// }
// @keyframes backdropIn {
//   from { opacity: 0; }
//   to   { opacity: 1; }
// }
// @keyframes toastIn {
//   from { opacity: 0; transform: translateY(20px) scale(0.95); }
//   to   { opacity: 1; transform: translateY(0) scale(1); }
// }
// @keyframes toastOut {
//   from { opacity: 1; transform: translateY(0) scale(1); }
//   to   { opacity: 0; transform: translateY(20px) scale(0.95); }
// }

// .tm-stat-card { animation: fadeSlideIn 0.5s ease both; }
// .tm-stat-card:nth-child(1) { animation-delay: 0.05s; }
// .tm-stat-card:nth-child(2) { animation-delay: 0.12s; }
// .tm-stat-card:nth-child(3) { animation-delay: 0.19s; }
// .tm-stat-card:nth-child(4) { animation-delay: 0.26s; }

// .tm-stat-num  { animation: statNumBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
// .tm-header    { animation: fadeSlideIn 0.4s 0s ease both; }
// .tm-filters   { animation: fadeSlideIn 0.45s 0.35s ease both; }
// .tm-table     { animation: fadeSlideIn 0.45s 0.45s ease both; }

// .tm-badge     { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; display: inline-block; }
// .tm-progress  { animation: progressFill 0.9s cubic-bezier(0.4,0,0.2,1) both; }
// .tm-dot-pulse { animation: dotPulse 1.8s ease-in-out infinite; }

// .tm-fab { animation: floatBtn 3s ease-in-out infinite; transition: transform 0.2s, box-shadow 0.2s; }
// .tm-fab:hover { animation: none; transform: translateY(-2px) scale(1.04) !important; }

// .tm-stat-inner {
//   transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
//   cursor: default;
// }
// .tm-stat-inner:hover {
//   transform: translateY(-4px) scale(1.025);
//   box-shadow: 0 8px 28px rgba(15,23,42,0.1) !important;
// }

// .tm-row { animation: rowSlide 0.38s ease both; transition: background 0.15s, transform 0.18s; }
// .tm-row:hover { background: #fafbff !important; transform: translateX(2px); }

// .tm-action-btn {
//   transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), background 0.15s, border-color 0.15s;
// }
// .tm-action-btn:hover  { transform: scale(1.18) rotate(-2deg); }
// .tm-action-btn:active { transform: scale(0.9); }

// .tm-btn-bounce { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
// .tm-btn-bounce:hover  { opacity: 0.88; transform: scale(1.05); }
// .tm-btn-bounce:active { transform: scale(0.95); }

// .tm-drawer-open  { animation: drawerIn  0.45s cubic-bezier(0.25,0.46,0.45,0.94) both; }
// .tm-drawer-close { animation: drawerOut 0.38s cubic-bezier(0.25,0.46,0.45,0.94) both; }
// .tm-backdrop-open  { animation: backdropIn 0.35s ease both; }
// .tm-backdrop-close { animation: backdropIn 0.3s ease reverse both; }

// .tm-delete-icon { animation: pulseRing 1.5s ease infinite; }

// .tm-toast      { animation: toastIn  0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
// .tm-toast-hide { animation: toastOut 0.3s ease both; }

// .tm-view-block { animation: fadeSlideIn 0.4s ease both; }
// .tm-view-block:nth-child(1) { animation-delay: 0.05s; }
// .tm-view-block:nth-child(2) { animation-delay: 0.12s; }
// .tm-view-block:nth-child(3) { animation-delay: 0.19s; }
// .tm-view-block:nth-child(4) { animation-delay: 0.25s; }
// `;

// // ─── Color Maps ───────────────────────────────────────────────────────────────
// const STATUS_COLORS = {
//   "Completed":  { bg: "#dcfce7", col: "#16a34a", border: "#bbf7d0" },
//   "In Progress":{ bg: "#fef9c3", col: "#ca8a04", border: "#fde68a" },
//   "Pending":    { bg: "#f1f5f9", col: "#64748b", border: "#e2e8f0" },
//   "Overdue":    { bg: "#fee2e2", col: "#dc2626", border: "#fca5a5" },
// };
// const PRIORITY_COLORS = {
//   "High":  { bg: "#fee2e2", col: "#dc2626", border: "#fca5a5" },
//   "Medium":{ bg: "#fef9c3", col: "#ca8a04", border: "#fde68a" },
//   "Low":   { bg: "#dcfce7", col: "#16a34a", border: "#bbf7d0" },
// };

// // ─── Shared styles ────────────────────────────────────────────────────────────
// const F = "'DM Sans', sans-serif";

// const inputStyle = {
//   width: "100%", background: "#ffffff", border: "1px solid #e2e8f0",
//   borderRadius: "9px", color: "#1e293b", fontSize: "0.875rem",
//   padding: "0.65rem 0.9rem", outline: "none",
//   fontFamily: F, transition: "border-color 0.2s, box-shadow 0.2s",
//   boxSizing: "border-box",
// };
// const labelStyle = {
//   display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#64748b",
//   marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em",
//   fontFamily: F,
// };

// const focusBind = {
//   onFocus: (e) => { e.target.style.borderColor = "#4f46e5"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.12)"; },
//   onBlur:  (e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; },
// };

// // ─── Small Primitives ─────────────────────────────────────────────────────────
// const SI = ({ style, ...p }) => <input style={{ ...inputStyle, ...style }} {...focusBind} {...p} />;
// const SS = ({ style, children, ...p }) => <select style={{ ...inputStyle, ...style }} {...focusBind} {...p}>{children}</select>;
// const ST = ({ style, ...p }) => <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px", ...style }} {...focusBind} {...p} />;

// const Field = ({ label, children }) => (
//   <div style={{ marginBottom: "1.1rem" }}>
//     <label style={labelStyle}>{label}</label>
//     {children}
//   </div>
// );

// const Divider = () => <div style={{ borderTop: "1px solid #f1f5f9", margin: "0.5rem 0 1.25rem" }} />;

// const DBtn = ({ children, variant = "primary", onClick, style: extra }) => {
//   const v = {
//     primary: { background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(79,70,229,0.3)" },
//     ghost:   { background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", boxShadow: "none" },
//     danger:  { background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(239,68,68,0.3)" },
//   }[variant];
//   return (
//     <button onClick={onClick} className="tm-btn-bounce"
//       style={{ padding: "0.65rem 1.35rem", borderRadius: "9px", fontFamily: F, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", ...v, ...extra }}>
//       {children}
//     </button>
//   );
// };

// const Badge = ({ text, colors, delay = 0 }) => (
//   <span className="tm-badge" style={{
//     animationDelay: `${delay}s`,
//     padding: "0.2rem 0.65rem", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 600,
//     background: colors.bg, color: colors.col, border: `1px solid ${colors.border}`,
//     fontFamily: F, whiteSpace: "nowrap",
//   }}>{text}</span>
// );

// const ProgressBar = ({ pct, delay = 0 }) => {
//   const grad = pct === 100
//     ? "linear-gradient(90deg,#16a34a,#4ade80)"
//     : "linear-gradient(90deg,#4f46e5,#7c3aed)";
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//       <div style={{ width: "64px", height: "6px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
//         <div className="tm-progress" style={{ animationDelay: `${delay}s`, height: "100%", width: `${pct}%`, background: grad, borderRadius: "10px" }} />
//       </div>
//       <span style={{ fontSize: "0.73rem", color: "#94a3b8", fontFamily: F }}>{pct}%</span>
//     </div>
//   );
// };

// // ─── Action Button ────────────────────────────────────────────────────────────
// const ActionBtn = ({ onClick, title, icon, hoverBg, hoverBorder }) => {
//   const [hov, setHov] = useState(false);
//   return (
//     <button onClick={onClick} title={title} className="tm-action-btn"
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       style={{
//         background: hov ? hoverBg : "#f8fafc",
//         border: `1px solid ${hov ? hoverBorder : "#e2e8f0"}`,
//         borderRadius: "8px", color: "#94a3b8", cursor: "pointer",
//         width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem",
//       }}>
//       {icon}
//     </button>
//   );
// };

// // ─── Toast ────────────────────────────────────────────────────────────────────
// const Toast = ({ message, icon, hiding }) => (
//   <div className={hiding ? "tm-toast-hide" : "tm-toast"} style={{
//     position: "fixed", bottom: "28px", right: "28px",
//     background: "#1e293b", color: "#fff",
//     padding: "0.65rem 1.2rem", borderRadius: "12px",
//     fontFamily: F, fontSize: "0.85rem", fontWeight: 500,
//     zIndex: 9999, display: "flex", alignItems: "center", gap: "0.5rem",
//     boxShadow: "0 8px 24px rgba(15,23,42,0.22)",
//   }}>
//     <span style={{ fontSize: "1rem" }}>{icon}</span> {message}
//   </div>
// );

// // ─── Sliding Drawer ───────────────────────────────────────────────────────────
// const Drawer = ({ open, onClose, title, children, width = "520px" }) => {
//   const [visible, setVisible] = useState(false);
//   const [closing, setClosing] = useState(false);

//   useEffect(() => {
//     if (open) { setClosing(false); setVisible(true); }
//     else if (visible) {
//       setClosing(true);
//       const t = setTimeout(() => { setVisible(false); setClosing(false); }, 380);
//       return () => clearTimeout(t);
//     }
//   }, [open]);

//   if (!visible) return null;
//   const cls = closing ? "tm-drawer-close" : "tm-drawer-open";
//   const bCls = closing ? "tm-backdrop-close" : "tm-backdrop-open";

//   return (
//     <>
//       <div className={bCls} onClick={onClose} style={{
//         position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.3)",
//         zIndex: 1200, backdropFilter: "blur(2px)",
//       }} />
//       <div className={cls} style={{
//         position: "fixed", top: 0, right: 0, bottom: 0, width, maxWidth: "100vw",
//         backgroundColor: "#ffffff", zIndex: 1300,
//         display: "flex", flexDirection: "column",
//         boxShadow: "-6px 0 40px rgba(15,23,42,0.12)",
//         borderLeft: "1px solid #e8edf3",
//       }}>
//         {/* Header */}
//         <div style={{
//           padding: "1.4rem 1.75rem", borderBottom: "1px solid #f0f4f8",
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           background: "#fafbfc", flexShrink: 0,
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//             <div style={{ width: "3px", height: "22px", borderRadius: "2px", background: "linear-gradient(180deg,#4f46e5,#7c3aed)" }} />
//             <span style={{ fontFamily: F, fontWeight: 700, fontSize: "1rem", color: "#1e293b", letterSpacing: "-0.02em" }}>{title}</span>
//           </div>
//           <button onClick={onClose}
//             onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#64748b"; }}
//             style={{
//               background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px",
//               color: "#64748b", cursor: "pointer", width: "32px", height: "32px",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: "1rem", transition: "all 0.2s",
//             }}>✕</button>
//         </div>
//         {/* Body */}
//         <div style={{ flex: 1, overflowY: "auto", padding: "1.75rem", scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

// // ─── Create / Edit Form ───────────────────────────────────────────────────────
// const TaskForm = ({ formData, onChange, onSubmit, onClose, submitLabel }) => (
//   <div>
//     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
//       <div style={{ gridColumn: "1/-1" }}>
//         <Field label="Task Title">
//           <SI name="taskTitle" value={formData.taskTitle} onChange={onChange} placeholder="e.g. Redesign Landing Page" />
//         </Field>
//       </div>
//       <Field label="Assigned To"><SI name="assignedTo" value={formData.assignedTo} onChange={onChange} placeholder="Employee name" /></Field>
//       <Field label="Assigned By"><SI name="assignedBy" value={formData.assignedBy} onChange={onChange} placeholder="Manager name" /></Field>
//       <Field label="Priority">
//         <SS name="priority" value={formData.priority} onChange={onChange}>
//           {["High","Medium","Low"].map(o => <option key={o}>{o}</option>)}
//         </SS>
//       </Field>
//       <Field label="Status">
//         <SS name="status" value={formData.status} onChange={onChange}>
//           {["Pending","In Progress","Completed","Overdue"].map(o => <option key={o}>{o}</option>)}
//         </SS>
//       </Field>
//       <div style={{ gridColumn: "1/-1" }}>
//         <Field label="Due Date"><SI type="date" name="dueDate" value={formData.dueDate} onChange={onChange} /></Field>
//       </div>
//       <div style={{ gridColumn: "1/-1" }}>
//         <Field label="Description"><ST name="description" value={formData.description} onChange={onChange} placeholder="Describe the task..." /></Field>
//       </div>
//       <div style={{ gridColumn: "1/-1" }}>
//         <Field label={`Progress — ${formData.progress}%`}>
//           <input type="range" min="0" max="100" name="progress" value={formData.progress} onChange={onChange}
//             style={{ width: "100%", accentColor: "#4f46e5" }} />
//         </Field>
//       </div>
//       <div style={{ gridColumn: "1/-1" }}>
//         <Field label="Notes"><ST name="notes" value={formData.notes} onChange={onChange} placeholder="Additional notes..." style={{ minHeight: "60px" }} /></Field>
//       </div>
//     </div>
//     <Divider />
//     <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
//       <DBtn variant="ghost" onClick={onClose}>Cancel</DBtn>
//       <DBtn variant="primary" onClick={onSubmit}>{submitLabel}</DBtn>
//     </div>
//   </div>
// );

// // ─── View Panel ───────────────────────────────────────────────────────────────
// const ViewPanel = ({ task, onClose }) => {
//   const sc = STATUS_COLORS[task.status]   || STATUS_COLORS["Pending"];
//   const pc = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS["Medium"];
//   const grad = task.progress === 100
//     ? "linear-gradient(90deg,#16a34a,#4ade80)"
//     : "linear-gradient(90deg,#4f46e5,#7c3aed)";

//   return (
//     <div>
//       <div className="tm-view-block" style={{ background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", border: "1px solid #ddd6fe", borderRadius: "14px", padding: "1.25rem", marginBottom: "1.5rem" }}>
//         <div style={{ fontSize: "0.68rem", color: "#7c3aed", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.3rem", fontFamily: F }}>{task.id}</div>
//         <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", fontFamily: F, lineHeight: 1.35 }}>{task.taskTitle}</div>
//         <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
//           <Badge text={task.status} colors={sc} delay={0.1} />
//           <Badge text={`${task.priority} Priority`} colors={pc} delay={0.18} />
//         </div>
//       </div>

//       <div className="tm-view-block" style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: "12px", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.55rem" }}>
//           <span style={{ ...labelStyle, marginBottom: 0 }}>Progress</span>
//           <span style={{ fontWeight: 700, color: task.progress === 100 ? "#16a34a" : "#4f46e5", fontFamily: F, fontSize: "0.9rem" }}>{task.progress}%</span>
//         </div>
//         <div style={{ height: "8px", background: "#e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
//           <div className="tm-progress" style={{ height: "100%", width: `${task.progress}%`, background: grad, borderRadius: "10px" }} />
//         </div>
//       </div>

//       <div className="tm-view-block" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
//         {[["Assigned To", task.assignedTo], ["Assigned By", task.assignedBy], ["Due Date", task.dueDate], ["Created Date", task.createdDate]].map(([l, v]) => (
//           <div key={l} style={{ marginBottom: "1rem" }}>
//             <div style={{ ...labelStyle, marginBottom: "0.25rem" }}>{l}</div>
//             <div style={{ color: "#1e293b", fontSize: "0.9rem", fontFamily: F }}>{v || "—"}</div>
//           </div>
//         ))}
//       </div>

//       <div className="tm-view-block">
//         <div style={{ ...labelStyle, marginBottom: "0.25rem" }}>Description</div>
//         <div style={{ color: "#475569", fontSize: "0.88rem", fontFamily: F }}>{task.description || "—"}</div>
//       </div>

//       {task.notes && (
//         <div className="tm-view-block" style={{ marginTop: "1rem" }}>
//           <div style={{ ...labelStyle, marginBottom: "0.25rem" }}>Notes</div>
//           <div style={{ color: "#475569", fontSize: "0.88rem", fontFamily: F }}>{task.notes}</div>
//         </div>
//       )}

//       <Divider />
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <DBtn variant="ghost" onClick={onClose}>Close</DBtn>
//       </div>
//     </div>
//   );
// };

// // ─── Delete Panel ─────────────────────────────────────────────────────────────
// const DeletePanel = ({ task, onDelete, onClose }) => (
//   <div style={{ textAlign: "center", padding: "0.75rem 0" }}>
//     <div className="tm-delete-icon" style={{
//       width: "64px", height: "64px", borderRadius: "50%",
//       background: "#fee2e2", border: "1px solid #fca5a5",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       margin: "0 auto 1.25rem", fontSize: "1.6rem",
//     }}>🗑️</div>
//     <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.4rem", fontFamily: F }}>Delete Task?</div>
//     <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.75rem", fontFamily: F }}>You're about to permanently delete</div>
//     <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.5rem", color: "#dc2626", fontWeight: 600, fontFamily: F, fontSize: "0.9rem" }}>
//       "{task.taskTitle}"
//     </div>
//     <div style={{ color: "#94a3b8", fontSize: "0.78rem", marginBottom: "1.75rem", fontFamily: F }}>This action cannot be undone.</div>
//     <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
//       <DBtn variant="ghost" onClick={onClose}>Cancel</DBtn>
//       <DBtn variant="danger" onClick={onDelete}>Yes, Delete</DBtn>
//     </div>
//   </div>
// );

// // ─── Main Page ────────────────────────────────────────────────────────────────
// const INITIAL_TASKS = [
//   { id: "TSK001", taskTitle: "Complete Frontend Development", description: "Develop responsive UI components for HRMS dashboard", assignedTo: "John Doe",     assignedBy: "Project Manager", priority: "High",   status: "In Progress", dueDate: "2024-02-15", createdDate: "2024-01-20", progress: 65,  notes: "" },
//   { id: "TSK002", taskTitle: "Database Optimization",         description: "Optimize database queries for better performance",    assignedTo: "Jane Smith",   assignedBy: "Tech Lead",        priority: "Medium", status: "Pending",     dueDate: "2024-02-20", createdDate: "2024-01-22", progress: 0,   notes: "" },
//   { id: "TSK003", taskTitle: "API Documentation",             description: "Create comprehensive API documentation",              assignedTo: "Mike Johnson", assignedBy: "Project Manager", priority: "Low",    status: "Completed",   dueDate: "2024-02-10", createdDate: "2024-01-18", progress: 100, notes: "" },
//   { id: "TSK004", taskTitle: "Security Audit",                description: "Full security audit of the platform",                 assignedTo: "Sara Lee",     assignedBy: "CTO",             priority: "High",   status: "Overdue",     dueDate: "2024-01-30", createdDate: "2024-01-10", progress: 30,  notes: "Escalated" },
//   { id: "TSK005", taskTitle: "Mobile App Design",             description: "Design responsive mobile layouts for all screens",    assignedTo: "Alex Kim",     assignedBy: "Design Lead",     priority: "Medium", status: "In Progress", dueDate: "2024-02-25", createdDate: "2024-01-25", progress: 45,  notes: "" },
// ];

// const BLANK_FORM = { taskTitle: "", description: "", assignedTo: "", assignedBy: "", priority: "Medium", status: "Pending", dueDate: "", progress: 0, notes: "" };

// const ROWS_PER_PAGE = 6;

// export default function AssignTaskPage() {
//   const [tasks, setTasks]               = useState(INITIAL_TASKS);
//   const [page, setPage]                 = useState(0);
//   const [search, setSearch]             = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterPriority, setFilterPriority] = useState("all");

//   const [drawer, setDrawer]             = useState({ open: false, mode: null });
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [formData, setFormData]         = useState(BLANK_FORM);

//   // Toast
//   const [toast, setToast]   = useState(null);
//   const [toastHide, setToastHide] = useState(false);
//   const toastTimer = React.useRef(null);

//   const showToast = (msg, icon = "✓") => {
//     if (toastTimer.current) clearTimeout(toastTimer.current);
//     setToastHide(false);
//     setToast({ msg, icon });
//     toastTimer.current = setTimeout(() => {
//       setToastHide(true);
//       setTimeout(() => setToast(null), 300);
//     }, 2200);
//   };

//   // Drawer helpers
//   const openDrawer = (mode, task = null) => {
//     setSelectedTask(task);
//     setFormData(mode === "edit" && task ? { ...task } : BLANK_FORM);
//     setDrawer({ open: true, mode });
//   };
//   const closeDrawer = () => setDrawer(d => ({ ...d, open: false }));

//   const handleChange = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

//   const handleCreate = () => {
//     const id = `TSK${String(tasks.length + 1).padStart(3, "0")}`;
//     setTasks(t => [...t, { ...formData, id, createdDate: new Date().toISOString().split("T")[0] }]);
//     closeDrawer();
//     showToast("Task assigned successfully", "🎯");
//   };
//   const handleEdit = () => {
//     setTasks(t => t.map(x => x.id === selectedTask.id ? { ...x, ...formData } : x));
//     closeDrawer();
//     showToast("Task updated", "✏️");
//   };
//   const handleDelete = () => {
//     setTasks(t => t.filter(x => x.id !== selectedTask.id));
//     closeDrawer();
//     showToast("Task deleted", "🗑");
//   };

//   // Filter & paginate
//   const filtered = tasks.filter(t => {
//     const q = search.toLowerCase();
//     return (
//       (t.taskTitle.toLowerCase().includes(q) || t.assignedTo.toLowerCase().includes(q) || t.assignedBy.toLowerCase().includes(q)) &&
//       (filterStatus === "all" || t.status === filterStatus) &&
//       (filterPriority === "all" || t.priority === filterPriority)
//     );
//   });
//   const paged      = filtered.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);
//   const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);

//   const stats = [
//     { label: "Total Tasks", value: tasks.length,                                    dot: "#4f46e5", light: "#ede9fe" },
//     { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length, dot: "#d97706", light: "#fef3c7" },
//     { label: "Completed",   value: tasks.filter(t => t.status === "Completed").length,   dot: "#16a34a", light: "#dcfce7" },
//     { label: "Overdue",     value: tasks.filter(t => t.status === "Overdue").length,     dot: "#dc2626", light: "#fee2e2" },
//   ];

//   return (
//     <>
//       {/* Inject animations */}
//       <style>{ANIMATIONS}</style>

//       <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "1.5rem", fontFamily: F }}>

//         {/* ── Header ── */}
//         <div className="tm-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
//           <div>
//             <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
//               <span className="tm-dot-pulse" style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: "#4f46e5" }} />
//               Task Management
//             </div>
//             <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "0.2rem" }}>Assign, track, and manage team tasks</div>
//           </div>
//           <button className="tm-fab" onClick={() => openDrawer("create")} style={{
//             display: "flex", alignItems: "center", gap: "0.5rem",
//             background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
//             border: "none", borderRadius: "10px", color: "#fff",
//             fontFamily: F, fontWeight: 600, fontSize: "0.875rem",
//             padding: "0.65rem 1.25rem", cursor: "pointer",
//             boxShadow: "0 4px 16px rgba(79,70,229,0.35)",
//           }}>
//             <span style={{ fontSize: "1.2rem", fontWeight: 400 }}>+</span> Assign Task
//           </button>
//         </div>

//         {/* ── Stats ── */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
//           {stats.map((s, i) => (
//             <div key={s.label} className="tm-stat-card">
//               <div className="tm-stat-inner" style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "14px", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 1px 4px rgba(15,23,42,0.05)" }}>
//                 <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: s.light, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                   <div className="tm-dot-pulse" style={{ width: "12px", height: "12px", borderRadius: "50%", background: s.dot, animationDelay: `${i * 0.25}s` }} />
//                 </div>
//                 <div>
//                   <div className="tm-stat-num" style={{ animationDelay: `${0.3 + i * 0.07}s`, fontSize: "1.6rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
//                   <div style={{ fontSize: "0.74rem", color: "#94a3b8", marginTop: "0.2rem" }}>{s.label}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Filters ── */}
//         <div className="tm-filters" style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "14px", padding: "0.9rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
//           <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
//             <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.9rem", pointerEvents: "none" }}>🔍</span>
//             <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }}
//               placeholder="Search tasks, people..."
//               style={{ ...inputStyle, paddingLeft: "2.2rem" }}
//               {...focusBind} />
//           </div>
//           <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }} style={{ ...inputStyle, width: "145px" }} {...focusBind}>
//             <option value="all">All Status</option>
//             {["Pending","In Progress","Completed","Overdue"].map(o => <option key={o}>{o}</option>)}
//           </select>
//           <select value={filterPriority} onChange={(e) => { setFilterPriority(e.target.value); setPage(0); }} style={{ ...inputStyle, width: "145px" }} {...focusBind}>
//             <option value="all">All Priority</option>
//             {["High","Medium","Low"].map(o => <option key={o}>{o}</option>)}
//           </select>
//         </div>

//         {/* ── Table ── */}
//         <div className="tm-table" style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 6px rgba(15,23,42,0.06)" }}>
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
//                   {["#","Task","Assigned To","Assigned By","Priority","Status","Progress","Due Date","Actions"].map(h => (
//                     <th key={h} style={{ padding: "0.8rem 0.85rem", textAlign: "left", fontSize: "0.67rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: F, whiteSpace: "nowrap" }}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {paged.length === 0 ? (
//                   <tr><td colSpan={9} style={{ padding: "3rem", textAlign: "center", color: "#cbd5e1", fontFamily: F }}>No tasks found</td></tr>
//                 ) : paged.map((task, i) => {
//                   const sc = STATUS_COLORS[task.status]    || STATUS_COLORS["Pending"];
//                   const pc = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS["Medium"];
//                   const delay = (0.05 + i * 0.06).toFixed(2);
//                   return (
//                     <tr key={task.id} className="tm-row" style={{ borderBottom: "1px solid #f8fafc", animationDelay: `${delay}s` }}>
//                       <td style={{ padding: "0.85rem 0.85rem", color: "#cbd5e1", fontSize: "0.8rem", fontFamily: F }}>{page * ROWS_PER_PAGE + i + 1}</td>
//                       <td style={{ padding: "0.85rem 0.85rem", maxWidth: "200px" }}>
//                         <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.875rem", fontFamily: F }}>{task.taskTitle}</div>
//                         <div style={{ fontSize: "0.7rem", color: "#cbd5e1", marginTop: "0.1rem" }}>{task.id}</div>
//                       </td>
//                       <td style={{ padding: "0.85rem 0.85rem", color: "#475569", fontSize: "0.84rem", fontFamily: F }}>{task.assignedTo}</td>
//                       <td style={{ padding: "0.85rem 0.85rem", color: "#475569", fontSize: "0.84rem", fontFamily: F }}>{task.assignedBy}</td>
//                       <td style={{ padding: "0.85rem 0.85rem" }}><Badge text={task.priority} colors={pc} delay={+delay + 0.1} /></td>
//                       <td style={{ padding: "0.85rem 0.85rem" }}><Badge text={task.status}   colors={sc} delay={+delay + 0.15} /></td>
//                       <td style={{ padding: "0.85rem 0.85rem" }}><ProgressBar pct={task.progress} delay={+delay + 0.05} /></td>
//                       <td style={{ padding: "0.85rem 0.85rem", color: "#94a3b8", fontSize: "0.82rem", fontFamily: F, whiteSpace: "nowrap" }}>{task.dueDate}</td>
//                       <td style={{ padding: "0.85rem 0.85rem" }}>
//                         <div style={{ display: "flex", gap: "6px" }}>
//                           <ActionBtn onClick={() => openDrawer("view", task)}   title="View"   icon="👁" hoverBg="#ede9fe" hoverBorder="#ddd6fe" />
//                           <ActionBtn onClick={() => openDrawer("edit", task)}   title="Edit"   icon="✏️" hoverBg="#fef9c3" hoverBorder="#fde68a" />
//                           <ActionBtn onClick={() => openDrawer("delete", task)} title="Delete" icon="🗑" hoverBg="#fee2e2" hoverBorder="#fca5a5" />
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div style={{ padding: "0.9rem 1.25rem", borderTop: "1px solid #f8fafc", background: "#fafbfc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontFamily: F }}>
//               {filtered.length === 0 ? "0" : `${page * ROWS_PER_PAGE + 1}–${Math.min((page + 1) * ROWS_PER_PAGE, filtered.length)}`} of {filtered.length} tasks
//             </span>
//             <div style={{ display: "flex", gap: "4px" }}>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button key={i} onClick={() => setPage(i)} style={{
//                   width: "30px", height: "30px", borderRadius: "8px",
//                   border: i === page ? "none" : "1px solid #e2e8f0",
//                   background: i === page ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "#fff",
//                   color: i === page ? "#fff" : "#64748b",
//                   cursor: "pointer", fontSize: "0.8rem", fontFamily: F, fontWeight: 600,
//                   boxShadow: i === page ? "0 2px 8px rgba(79,70,229,0.3)" : "none",
//                   transform: i === page ? "scale(1.08)" : "scale(1)",
//                   transition: "all 0.2s",
//                 }}>{i + 1}</button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Drawers ── */}
//       <Drawer open={drawer.open && drawer.mode === "create"} onClose={closeDrawer} title="Assign New Task">
//         <TaskForm formData={formData} onChange={handleChange} onSubmit={handleCreate} onClose={closeDrawer} submitLabel="Assign Task" />
//       </Drawer>

//       <Drawer open={drawer.open && drawer.mode === "edit"} onClose={closeDrawer} title="Edit Task">
//         <TaskForm formData={formData} onChange={handleChange} onSubmit={handleEdit} onClose={closeDrawer} submitLabel="Save Changes" />
//       </Drawer>

//       <Drawer open={drawer.open && drawer.mode === "view"} onClose={closeDrawer} title="Task Details">
//         {selectedTask && <ViewPanel task={selectedTask} onClose={closeDrawer} />}
//       </Drawer>

//       <Drawer open={drawer.open && drawer.mode === "delete"} onClose={closeDrawer} title="Confirm Delete" width="400px">
//         {selectedTask && <DeletePanel task={selectedTask} onDelete={handleDelete} onClose={closeDrawer} />}
//       </Drawer>

//       {/* ── Toast ── */}
//       {toast && <Toast message={toast.msg} icon={toast.icon} hiding={toastHide} />}
//     </>
//   );
// }







"use client";

import React, { useState, useEffect } from "react";

// ─── Keyframe Animations (injected once) ─────────────────────────────────────
const ANIMATIONS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes statNumBounce {
  0%   { transform: translateY(10px); opacity: 0; }
  60%  { transform: translateY(-4px); }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes rowSlide {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes progressFill {
  from { width: 0%; }
}
@keyframes badgePop {
  0%   { transform: scale(0.7); opacity: 0; }
  70%  { transform: scale(1.12); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.6); opacity: 0.6; }
}
@keyframes floatBtn {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-4px); }
}
@keyframes pulseRing {
  0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
  70%  { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
  100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.92) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes backdropIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes toastIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes toastOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(20px) scale(0.95); }
}

.tm-stat-card { animation: fadeSlideIn 0.5s ease both; }
.tm-stat-card:nth-child(1) { animation-delay: 0.05s; }
.tm-stat-card:nth-child(2) { animation-delay: 0.12s; }
.tm-stat-card:nth-child(3) { animation-delay: 0.19s; }
.tm-stat-card:nth-child(4) { animation-delay: 0.26s; }

.tm-stat-num  { animation: statNumBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
.tm-header    { animation: fadeSlideIn 0.4s 0s ease both; }
.tm-filters   { animation: fadeSlideIn 0.45s 0.35s ease both; }
.tm-table     { animation: fadeSlideIn 0.45s 0.45s ease both; }

.tm-badge     { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; display: inline-block; }
.tm-progress  { animation: progressFill 0.9s cubic-bezier(0.4,0,0.2,1) both; }
.tm-dot-pulse { animation: dotPulse 1.8s ease-in-out infinite; }

.tm-fab { animation: floatBtn 3s ease-in-out infinite; transition: transform 0.2s, box-shadow 0.2s; }
.tm-fab:hover { animation: none; transform: translateY(-2px) scale(1.04) !important; }

.tm-stat-inner {
  transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
  cursor: default;
}
.tm-stat-inner:hover {
  transform: translateY(-4px) scale(1.025);
  box-shadow: 0 8px 28px rgba(15,23,42,0.1) !important;
}

.tm-row { animation: rowSlide 0.38s ease both; transition: background 0.15s, transform 0.18s; }
.tm-row:hover { background: #fafbff !important; transform: translateX(2px); }

.tm-action-btn {
  transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), background 0.15s, border-color 0.15s;
}
.tm-action-btn:hover  { transform: scale(1.18) rotate(-2deg); }
.tm-action-btn:active { transform: scale(0.9); }

.tm-btn-bounce { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
.tm-btn-bounce:hover  { opacity: 0.88; transform: scale(1.05); }
.tm-btn-bounce:active { transform: scale(0.95); }

.tm-modal-backdrop-open  { animation: backdropIn 0.25s ease both; }
.tm-modal-backdrop-close { animation: backdropIn 0.2s ease reverse both; }

.tm-modal-open  { animation: modalIn 0.3s cubic-bezier(0.34,1.2,0.64,1) both; }
.tm-modal-close { animation: modalIn 0.25s cubic-bezier(0.34,1.2,0.64,1) reverse both; }

.tm-delete-icon { animation: pulseRing 1.5s ease infinite; }

.tm-toast      { animation: toastIn  0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
.tm-toast-hide { animation: toastOut 0.3s ease both; }

.tm-view-block { animation: fadeSlideIn 0.4s ease both; }
.tm-view-block:nth-child(1) { animation-delay: 0.05s; }
.tm-view-block:nth-child(2) { animation-delay: 0.12s; }
.tm-view-block:nth-child(3) { animation-delay: 0.19s; }
.tm-view-block:nth-child(4) { animation-delay: 0.25s; }
`;

// ─── Color Maps ───────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  "Completed":  { bg: "#dcfce7", col: "#16a34a", border: "#bbf7d0" },
  "In Progress":{ bg: "#fef9c3", col: "#ca8a04", border: "#fde68a" },
  "Pending":    { bg: "#f1f5f9", col: "#64748b", border: "#e2e8f0" },
  "Overdue":    { bg: "#fee2e2", col: "#dc2626", border: "#fca5a5" },
};
const PRIORITY_COLORS = {
  "High":  { bg: "#fee2e2", col: "#dc2626", border: "#fca5a5" },
  "Medium":{ bg: "#fef9c3", col: "#ca8a04", border: "#fde68a" },
  "Low":   { bg: "#dcfce7", col: "#16a34a", border: "#bbf7d0" },
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const F = "'DM Sans', sans-serif";

const inputStyle = {
  width: "100%", background: "#ffffff", border: "1px solid #e2e8f0",
  borderRadius: "9px", color: "#1e293b", fontSize: "0.875rem",
  padding: "0.65rem 0.9rem", outline: "none",
  fontFamily: F, transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};
const labelStyle = {
  display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#64748b",
  marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em",
  fontFamily: F,
};

const focusBind = {
  onFocus: (e) => { e.target.style.borderColor = "#4f46e5"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.12)"; },
  onBlur:  (e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; },
};

// ─── Small Primitives ─────────────────────────────────────────────────────────
const SI = ({ style, ...p }) => <input style={{ ...inputStyle, ...style }} {...focusBind} {...p} />;
const SS = ({ style, children, ...p }) => <select style={{ ...inputStyle, ...style }} {...focusBind} {...p}>{children}</select>;
const ST = ({ style, ...p }) => <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px", ...style }} {...focusBind} {...p} />;

const Field = ({ label, children }) => (
  <div style={{ marginBottom: "1.1rem" }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const Divider = () => <div style={{ borderTop: "1px solid #f1f5f9", margin: "0.5rem 0 1.25rem" }} />;

const DBtn = ({ children, variant = "primary", onClick, style: extra }) => {
  const v = {
    primary: { background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(79,70,229,0.3)" },
    ghost:   { background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", boxShadow: "none" },
    danger:  { background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(239,68,68,0.3)" },
  }[variant];
  return (
    <button onClick={onClick} className="tm-btn-bounce"
      style={{ padding: "0.65rem 1.35rem", borderRadius: "9px", fontFamily: F, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", ...v, ...extra }}>
      {children}
    </button>
  );
};

const Badge = ({ text, colors, delay = 0 }) => (
  <span className="tm-badge" style={{
    animationDelay: `${delay}s`,
    padding: "0.2rem 0.65rem", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 600,
    background: colors.bg, color: colors.col, border: `1px solid ${colors.border}`,
    fontFamily: F, whiteSpace: "nowrap",
  }}>{text}</span>
);

const ProgressBar = ({ pct, delay = 0 }) => {
  const grad = pct === 100
    ? "linear-gradient(90deg,#16a34a,#4ade80)"
    : "linear-gradient(90deg,#4f46e5,#7c3aed)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ width: "64px", height: "6px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
        <div className="tm-progress" style={{ animationDelay: `${delay}s`, height: "100%", width: `${pct}%`, background: grad, borderRadius: "10px" }} />
      </div>
      <span style={{ fontSize: "0.73rem", color: "#94a3b8", fontFamily: F }}>{pct}%</span>
    </div>
  );
};

// ─── Action Button ────────────────────────────────────────────────────────────
const ActionBtn = ({ onClick, title, icon, hoverBg, hoverBorder }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} title={title} className="tm-action-btn"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? hoverBg : "#f8fafc",
        border: `1px solid ${hov ? hoverBorder : "#e2e8f0"}`,
        borderRadius: "8px", color: "#94a3b8", cursor: "pointer",
        width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem",
      }}>
      {icon}
    </button>
  );
};

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, icon, hiding }) => (
  <div className={hiding ? "tm-toast-hide" : "tm-toast"} style={{
    position: "fixed", bottom: "28px", right: "28px",
    background: "#1e293b", color: "#fff",
    padding: "0.65rem 1.2rem", borderRadius: "12px",
    fontFamily: F, fontSize: "0.85rem", fontWeight: 500,
    zIndex: 9999, display: "flex", alignItems: "center", gap: "0.5rem",
    boxShadow: "0 8px 24px rgba(15,23,42,0.22)",
  }}>
    <span style={{ fontSize: "1rem" }}>{icon}</span> {message}
  </div>
);

// ─── Centered Popup Modal ─────────────────────────────────────────────────────
const Modal = ({ open, onClose, title, children, width = "560px" }) => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) { setClosing(false); setVisible(true); }
    else if (visible) {
      setClosing(true);
      const t = setTimeout(() => { setVisible(false); setClosing(false); }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!visible) return null;

  const backdropCls = closing ? "tm-modal-backdrop-close" : "tm-modal-backdrop-open";
  const modalCls    = closing ? "tm-modal-close"          : "tm-modal-open";

  return (
    <div
      className={backdropCls}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(15,23,42,0.45)",
        zIndex: 1200,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className={modalCls}
        onClick={(e) => e.stopPropagation()}
        style={{
          width, maxWidth: "96vw", maxHeight: "90vh",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          display: "flex", flexDirection: "column",
          boxShadow: "0 24px 64px rgba(15,23,42,0.18)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "1.4rem 1.75rem", borderBottom: "1px solid #f0f4f8",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#fafbfc", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "3px", height: "22px", borderRadius: "2px", background: "linear-gradient(180deg,#4f46e5,#7c3aed)" }} />
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: "1rem", color: "#1e293b", letterSpacing: "-0.02em" }}>{title}</span>
          </div>
          <button onClick={onClose}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#64748b"; }}
            style={{
              background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px",
              color: "#64748b", cursor: "pointer", width: "32px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", transition: "all 0.2s",
            }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.75rem", scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── Create / Edit Form ───────────────────────────────────────────────────────
const TaskForm = ({ formData, onChange, onSubmit, onClose, submitLabel }) => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label="Task Title">
          <SI name="taskTitle" value={formData.taskTitle} onChange={onChange} placeholder="e.g. Redesign Landing Page" />
        </Field>
      </div>
      <Field label="Assigned To"><SI name="assignedTo" value={formData.assignedTo} onChange={onChange} placeholder="Employee name" /></Field>
      <Field label="Assigned By"><SI name="assignedBy" value={formData.assignedBy} onChange={onChange} placeholder="Manager name" /></Field>
      <Field label="Priority">
        <SS name="priority" value={formData.priority} onChange={onChange}>
          {["High","Medium","Low"].map(o => <option key={o}>{o}</option>)}
        </SS>
      </Field>
      <Field label="Status">
        <SS name="status" value={formData.status} onChange={onChange}>
          {["Pending","In Progress","Completed","Overdue"].map(o => <option key={o}>{o}</option>)}
        </SS>
      </Field>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label="Due Date"><SI type="date" name="dueDate" value={formData.dueDate} onChange={onChange} /></Field>
      </div>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label="Description"><ST name="description" value={formData.description} onChange={onChange} placeholder="Describe the task..." /></Field>
      </div>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label={`Progress — ${formData.progress}%`}>
          <input type="range" min="0" max="100" name="progress" value={formData.progress} onChange={onChange}
            style={{ width: "100%", accentColor: "#4f46e5" }} />
        </Field>
      </div>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label="Notes"><ST name="notes" value={formData.notes} onChange={onChange} placeholder="Additional notes..." style={{ minHeight: "60px" }} /></Field>
      </div>
    </div>
    <Divider />
    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
      <DBtn variant="ghost" onClick={onClose}>Cancel</DBtn>
      <DBtn variant="primary" onClick={onSubmit}>{submitLabel}</DBtn>
    </div>
  </div>
);

// ─── View Panel ───────────────────────────────────────────────────────────────
const ViewPanel = ({ task, onClose }) => {
  const sc = STATUS_COLORS[task.status]    || STATUS_COLORS["Pending"];
  const pc = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS["Medium"];
  const grad = task.progress === 100
    ? "linear-gradient(90deg,#16a34a,#4ade80)"
    : "linear-gradient(90deg,#4f46e5,#7c3aed)";

  return (
    <div>
      <div className="tm-view-block" style={{ background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", border: "1px solid #ddd6fe", borderRadius: "14px", padding: "1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.68rem", color: "#7c3aed", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.3rem", fontFamily: F }}>{task.id}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", fontFamily: F, lineHeight: 1.35 }}>{task.taskTitle}</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
          <Badge text={task.status} colors={sc} delay={0.1} />
          <Badge text={`${task.priority} Priority`} colors={pc} delay={0.18} />
        </div>
      </div>

      <div className="tm-view-block" style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: "12px", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.55rem" }}>
          <span style={{ ...labelStyle, marginBottom: 0 }}>Progress</span>
          <span style={{ fontWeight: 700, color: task.progress === 100 ? "#16a34a" : "#4f46e5", fontFamily: F, fontSize: "0.9rem" }}>{task.progress}%</span>
        </div>
        <div style={{ height: "8px", background: "#e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
          <div className="tm-progress" style={{ height: "100%", width: `${task.progress}%`, background: grad, borderRadius: "10px" }} />
        </div>
      </div>

      <div className="tm-view-block" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
        {[["Assigned To", task.assignedTo], ["Assigned By", task.assignedBy], ["Due Date", task.dueDate], ["Created Date", task.createdDate]].map(([l, v]) => (
          <div key={l} style={{ marginBottom: "1rem" }}>
            <div style={{ ...labelStyle, marginBottom: "0.25rem" }}>{l}</div>
            <div style={{ color: "#1e293b", fontSize: "0.9rem", fontFamily: F }}>{v || "—"}</div>
          </div>
        ))}
      </div>

      <div className="tm-view-block">
        <div style={{ ...labelStyle, marginBottom: "0.25rem" }}>Description</div>
        <div style={{ color: "#475569", fontSize: "0.88rem", fontFamily: F }}>{task.description || "—"}</div>
      </div>

      {task.notes && (
        <div className="tm-view-block" style={{ marginTop: "1rem" }}>
          <div style={{ ...labelStyle, marginBottom: "0.25rem" }}>Notes</div>
          <div style={{ color: "#475569", fontSize: "0.88rem", fontFamily: F }}>{task.notes}</div>
        </div>
      )}

      <Divider />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <DBtn variant="ghost" onClick={onClose}>Close</DBtn>
      </div>
    </div>
  );
};

// ─── Delete Panel ─────────────────────────────────────────────────────────────
const DeletePanel = ({ task, onDelete, onClose }) => (
  <div style={{ textAlign: "center", padding: "0.75rem 0" }}>
    <div className="tm-delete-icon" style={{
      width: "64px", height: "64px", borderRadius: "50%",
      background: "#fee2e2", border: "1px solid #fca5a5",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 1.25rem", fontSize: "1.6rem",
    }}>🗑️</div>
    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.4rem", fontFamily: F }}>Delete Task?</div>
    <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.75rem", fontFamily: F }}>You&apos;re about to permanently delete</div>
      <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.5rem", color: "#dc2626", fontWeight: 600, fontFamily: F, fontSize: "0.9rem" }}>
      &quot;{task.taskTitle}&quot;
    </div>
    <div style={{ color: "#94a3b8", fontSize: "0.78rem", marginBottom: "1.75rem", fontFamily: F }}>This action cannot be undone.</div>
    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
      <DBtn variant="ghost" onClick={onClose}>Cancel</DBtn>
      <DBtn variant="danger" onClick={onDelete}>Yes, Delete</DBtn>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const INITIAL_TASKS = [
  { id: "TSK001", taskTitle: "Complete Frontend Development", description: "Develop responsive UI components for HRMS dashboard", assignedTo: "John Doe",     assignedBy: "Project Manager", priority: "High",   status: "In Progress", dueDate: "2024-02-15", createdDate: "2024-01-20", progress: 65,  notes: "" },
  { id: "TSK002", taskTitle: "Database Optimization",         description: "Optimize database queries for better performance",    assignedTo: "Jane Smith",   assignedBy: "Tech Lead",        priority: "Medium", status: "Pending",     dueDate: "2024-02-20", createdDate: "2024-01-22", progress: 0,   notes: "" },
  { id: "TSK003", taskTitle: "API Documentation",             description: "Create comprehensive API documentation",              assignedTo: "Mike Johnson", assignedBy: "Project Manager", priority: "Low",    status: "Completed",   dueDate: "2024-02-10", createdDate: "2024-01-18", progress: 100, notes: "" },
  { id: "TSK004", taskTitle: "Security Audit",                description: "Full security audit of the platform",                 assignedTo: "Sara Lee",     assignedBy: "CTO",             priority: "High",   status: "Overdue",     dueDate: "2024-01-30", createdDate: "2024-01-10", progress: 30,  notes: "Escalated" },
  { id: "TSK005", taskTitle: "Mobile App Design",             description: "Design responsive mobile layouts for all screens",    assignedTo: "Alex Kim",     assignedBy: "Design Lead",     priority: "Medium", status: "In Progress", dueDate: "2024-02-25", createdDate: "2024-01-25", progress: 45,  notes: "" },
];

const BLANK_FORM = { taskTitle: "", description: "", assignedTo: "", assignedBy: "", priority: "Medium", status: "Pending", dueDate: "", progress: 0, notes: "" };

const ROWS_PER_PAGE = 6;

export default function AssignTaskPage() {
  const [tasks, setTasks]               = useState(INITIAL_TASKS);
  const [page, setPage]                 = useState(0);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const [modal, setModal]               = useState({ open: false, mode: null });
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData]         = useState(BLANK_FORM);

  // Toast
  const [toast, setToast]       = useState(null);
  const [toastHide, setToastHide] = useState(false);
  const toastTimer = React.useRef(null);

  const showToast = (msg, icon = "✓") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastHide(false);
    setToast({ msg, icon });
    toastTimer.current = setTimeout(() => {
      setToastHide(true);
      setTimeout(() => setToast(null), 300);
    }, 2200);
  };

  // Modal helpers
  const openModal = (mode, task = null) => {
    setSelectedTask(task);
    setFormData(mode === "edit" && task ? { ...task } : BLANK_FORM);
    setModal({ open: true, mode });
  };
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const handleChange = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleCreate = () => {
    const id = `TSK${String(tasks.length + 1).padStart(3, "0")}`;
    setTasks(t => [...t, { ...formData, id, createdDate: new Date().toISOString().split("T")[0] }]);
    closeModal();
    showToast("Task assigned successfully", "🎯");
  };
  const handleEdit = () => {
    setTasks(t => t.map(x => x.id === selectedTask.id ? { ...x, ...formData } : x));
    closeModal();
    showToast("Task updated", "✏️");
  };
  const handleDelete = () => {
    setTasks(t => t.filter(x => x.id !== selectedTask.id));
    closeModal();
    showToast("Task deleted", "🗑");
  };

  // Filter & paginate
  const filtered = tasks.filter(t => {
    const q = search.toLowerCase();
    return (
      (t.taskTitle.toLowerCase().includes(q) || t.assignedTo.toLowerCase().includes(q) || t.assignedBy.toLowerCase().includes(q)) &&
      (filterStatus === "all" || t.status === filterStatus) &&
      (filterPriority === "all" || t.priority === filterPriority)
    );
  });
  const paged      = filtered.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);

  const stats = [
    { label: "Total Tasks", value: tasks.length,                                         dot: "#4f46e5", light: "#ede9fe" },
    { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length, dot: "#d97706", light: "#fef3c7" },
    { label: "Completed",   value: tasks.filter(t => t.status === "Completed").length,   dot: "#16a34a", light: "#dcfce7" },
    { label: "Overdue",     value: tasks.filter(t => t.status === "Overdue").length,     dot: "#dc2626", light: "#fee2e2" },
  ];

  const modalWidths = { create: "560px", edit: "560px", view: "540px", delete: "400px" };
  const modalTitles = { create: "Assign New Task", edit: "Edit Task", view: "Task Details", delete: "Confirm Delete" };

  return (
    <>
      {/* Inject animations */}
      <style>{ANIMATIONS}</style>

      <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "1.5rem", fontFamily: F }}>

        {/* ── Header ── */}
        <div className="tm-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="tm-dot-pulse" style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: "#4f46e5" }} />
              Task Management
            </div>
            <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "0.2rem" }}>Assign, track, and manage team tasks</div>
          </div>
          <button className="tm-fab" onClick={() => openModal("create")} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            border: "none", borderRadius: "10px", color: "#fff",
            fontFamily: F, fontWeight: 600, fontSize: "0.875rem",
            padding: "0.65rem 1.25rem", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(79,70,229,0.35)",
          }}>
            <span style={{ fontSize: "1.2rem", fontWeight: 400 }}>+</span> Assign Task
          </button>
        </div>

        {/* ── Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="tm-stat-card">
              <div className="tm-stat-inner" style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "14px", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 1px 4px rgba(15,23,42,0.05)" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: s.light, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div className="tm-dot-pulse" style={{ width: "12px", height: "12px", borderRadius: "50%", background: s.dot, animationDelay: `${i * 0.25}s` }} />
                </div>
                <div>
                  <div className="tm-stat-num" style={{ animationDelay: `${0.3 + i * 0.07}s`, fontSize: "1.6rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.74rem", color: "#94a3b8", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="tm-filters" style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "14px", padding: "0.9rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.9rem", pointerEvents: "none" }}>🔍</span>
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder="Search tasks, people..."
              style={{ ...inputStyle, paddingLeft: "2.2rem" }}
              {...focusBind} />
          </div>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }} style={{ ...inputStyle, width: "145px" }} {...focusBind}>
            <option value="all">All Status</option>
            {["Pending","In Progress","Completed","Overdue"].map(o => <option key={o}>{o}</option>)}
          </select>
          <select value={filterPriority} onChange={(e) => { setFilterPriority(e.target.value); setPage(0); }} style={{ ...inputStyle, width: "145px" }} {...focusBind}>
            <option value="all">All Priority</option>
            {["High","Medium","Low"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        {/* ── Table ── */}
        <div className="tm-table" style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 6px rgba(15,23,42,0.06)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  {["#","Task","Assigned To","Assigned By","Priority","Status","Progress","Due Date","Actions"].map(h => (
                    <th key={h} style={{ padding: "0.8rem 0.85rem", textAlign: "left", fontSize: "0.67rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: F, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr><td colSpan={9} style={{ padding: "3rem", textAlign: "center", color: "#cbd5e1", fontFamily: F }}>No tasks found</td></tr>
                ) : paged.map((task, i) => {
                  const sc = STATUS_COLORS[task.status]     || STATUS_COLORS["Pending"];
                  const pc = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS["Medium"];
                  const delay = (0.05 + i * 0.06).toFixed(2);
                  return (
                    <tr key={task.id} className="tm-row" style={{ borderBottom: "1px solid #f8fafc", animationDelay: `${delay}s` }}>
                      <td style={{ padding: "0.85rem 0.85rem", color: "#cbd5e1", fontSize: "0.8rem", fontFamily: F }}>{page * ROWS_PER_PAGE + i + 1}</td>
                      <td style={{ padding: "0.85rem 0.85rem", maxWidth: "200px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.875rem", fontFamily: F }}>{task.taskTitle}</div>
                        <div style={{ fontSize: "0.7rem", color: "#cbd5e1", marginTop: "0.1rem" }}>{task.id}</div>
                      </td>
                      <td style={{ padding: "0.85rem 0.85rem", color: "#475569", fontSize: "0.84rem", fontFamily: F }}>{task.assignedTo}</td>
                      <td style={{ padding: "0.85rem 0.85rem", color: "#475569", fontSize: "0.84rem", fontFamily: F }}>{task.assignedBy}</td>
                      <td style={{ padding: "0.85rem 0.85rem" }}><Badge text={task.priority} colors={pc} delay={+delay + 0.1} /></td>
                      <td style={{ padding: "0.85rem 0.85rem" }}><Badge text={task.status}   colors={sc} delay={+delay + 0.15} /></td>
                      <td style={{ padding: "0.85rem 0.85rem" }}><ProgressBar pct={task.progress} delay={+delay + 0.05} /></td>
                      <td style={{ padding: "0.85rem 0.85rem", color: "#94a3b8", fontSize: "0.82rem", fontFamily: F, whiteSpace: "nowrap" }}>{task.dueDate}</td>
                      <td style={{ padding: "0.85rem 0.85rem" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <ActionBtn onClick={() => openModal("view", task)}   title="View"   icon="👁" hoverBg="#ede9fe" hoverBorder="#ddd6fe" />
                          <ActionBtn onClick={() => openModal("edit", task)}   title="Edit"   icon="✏️" hoverBg="#fef9c3" hoverBorder="#fde68a" />
                          <ActionBtn onClick={() => openModal("delete", task)} title="Delete" icon="🗑" hoverBg="#fee2e2" hoverBorder="#fca5a5" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: "0.9rem 1.25rem", borderTop: "1px solid #f8fafc", background: "#fafbfc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontFamily: F }}>
              {filtered.length === 0 ? "0" : `${page * ROWS_PER_PAGE + 1}–${Math.min((page + 1) * ROWS_PER_PAGE, filtered.length)}`} of {filtered.length} tasks
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)} style={{
                  width: "30px", height: "30px", borderRadius: "8px",
                  border: i === page ? "none" : "1px solid #e2e8f0",
                  background: i === page ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "#fff",
                  color: i === page ? "#fff" : "#64748b",
                  cursor: "pointer", fontSize: "0.8rem", fontFamily: F, fontWeight: 600,
                  boxShadow: i === page ? "0 2px 8px rgba(79,70,229,0.3)" : "none",
                  transform: i === page ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.2s",
                }}>{i + 1}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <Modal open={modal.open && modal.mode === "create"} onClose={closeModal} title={modalTitles.create} width={modalWidths.create}>
        <TaskForm formData={formData} onChange={handleChange} onSubmit={handleCreate} onClose={closeModal} submitLabel="Assign Task" />
      </Modal>

      <Modal open={modal.open && modal.mode === "edit"} onClose={closeModal} title={modalTitles.edit} width={modalWidths.edit}>
        <TaskForm formData={formData} onChange={handleChange} onSubmit={handleEdit} onClose={closeModal} submitLabel="Save Changes" />
      </Modal>

      <Modal open={modal.open && modal.mode === "view"} onClose={closeModal} title={modalTitles.view} width={modalWidths.view}>
        {selectedTask && <ViewPanel task={selectedTask} onClose={closeModal} />}
      </Modal>

      <Modal open={modal.open && modal.mode === "delete"} onClose={closeModal} title={modalTitles.delete} width={modalWidths.delete}>
        {selectedTask && <DeletePanel task={selectedTask} onDelete={handleDelete} onClose={closeModal} />}
      </Modal>

      {/* ── Toast ── */}
      {toast && <Toast message={toast.msg} icon={toast.icon} hiding={toastHide} />}
    </>
  );
}

