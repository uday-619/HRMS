// "use client";

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   Pagination,
//   Stack,
//   Dialog,
// } from "@mui/material";
// import {
//   Add,
//   EditOutlined,
//   DeleteOutlined,
//   VisibilityOutlined,
//   Search,
//   WorkOutline,
//   LocationOnOutlined,
//   BusinessOutlined,
//   AttachMoneyOutlined,
//   PeopleOutlined,
//   TrendingUp,
//   Close,
//   AccountTreeOutlined,
// } from "@mui/icons-material";

// /* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

//   :root {
//     --bg:           #F5F5F0;
//     --surface:      #FFFFFF;
//     --surface-2:    #FAFAF8;
//     --ink:          #18181B;
//     --ink-2:        #52525B;
//     --ink-3:        #A1A1AA;
//     --border:       rgba(0,0,0,0.08);
//     --border-2:     rgba(0,0,0,0.13);
//     --accent:       #E24B4A;
//     --accent-bg:    #FAECE7;
//     --accent-text:  #D85A30;
//     --teal:         #1D9E75;
//     --teal-bg:      #E1F5EE;
//     --teal-text:    #0F6E56;
//     --amber:        #BA7517;
//     --amber-bg:     #FAEEDA;
//     --blue:         #185FA5;
//     --blue-bg:      #E6F1FB;
//     --r-sm:         8px;
//     --r-md:         12px;
//     --r-lg:         16px;
//     --r-xl:         20px;
//     --shadow-card:  0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04);
//     --shadow-modal: 0 20px 60px rgba(0,0,0,0.15);
//   }

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .jp-root {
//     min-height: 100vh;
//     background: var(--bg);
//     padding: 1.75rem 2rem 3rem;
//     font-family: 'Inter', sans-serif;
//   }

//   /* ── Header ── */
//   .jp-header {
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     margin-bottom: 1.5rem;
//     flex-wrap: wrap;
//     gap: 1rem;
//   }
//   .jp-eyebrow {
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     color: var(--ink-3);
//     margin-bottom: 4px;
//   }
//   .jp-title {
//     font-size: 22px;
//     font-weight: 600;
//     color: var(--ink);
//     letter-spacing: -0.02em;
//   }
//   .jp-title span { color: var(--accent); }

//   /* ── Stats ── */
//   .jp-stats {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     gap: 12px;
//     margin-bottom: 1.25rem;
//   }
//   .jp-stat-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: var(--r-lg);
//     padding: 14px 16px;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     box-shadow: var(--shadow-card);
//   }
//   .jp-stat-icon {
//     width: 40px; height: 40px;
//     border-radius: 10px;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//   }
//   .jp-stat-icon.coral { background: var(--accent-bg); color: var(--accent); }
//   .jp-stat-icon.teal  { background: var(--teal-bg);   color: var(--teal);   }
//   .jp-stat-icon.amber { background: var(--amber-bg);  color: var(--amber);  }
//   .jp-stat-icon.blue  { background: var(--blue-bg);   color: var(--blue);   }
//   .jp-stat-value { font-size: 22px; font-weight: 600; color: var(--ink); line-height: 1; }
//   .jp-stat-label { font-size: 12px; color: var(--ink-3); margin-top: 3px; }

//   /* ── Toolbar ── */
//   .jp-toolbar {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     margin-bottom: 1rem;
//     flex-wrap: wrap;
//   }
//   .jp-search {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     background: var(--surface);
//     border: 1px solid var(--border-2);
//     border-radius: var(--r-md);
//     padding: 0 12px;
//     height: 36px;
//     width: 240px;
//     transition: border-color 0.15s, box-shadow 0.15s;
//   }
//   .jp-search:focus-within {
//     border-color: var(--accent);
//     box-shadow: 0 0 0 3px rgba(226,75,74,0.1);
//   }
//   .jp-search input {
//     border: none; outline: none;
//     background: transparent;
//     font-family: 'Inter', sans-serif;
//     font-size: 13px;
//     color: var(--ink);
//     width: 100%;
//   }
//   .jp-search input::placeholder { color: var(--ink-3); }
//   .jp-filter-btn {
//     height: 32px;
//     padding: 0 12px;
//     border-radius: 999px;
//     font-family: 'Inter', sans-serif;
//     font-size: 12px;
//     font-weight: 500;
//     cursor: pointer;
//     border: 1px solid var(--border-2);
//     background: var(--surface);
//     color: var(--ink-2);
//     transition: all 0.15s;
//   }
//   .jp-filter-btn.active {
//     border-color: var(--accent);
//     background: var(--accent-bg);
//     color: var(--accent-text);
//   }
//   .jp-btn-primary {
//     height: 36px;
//     padding: 0 16px;
//     background: var(--accent);
//     color: #fff;
//     border: none;
//     border-radius: var(--r-md);
//     font-family: 'Inter', sans-serif;
//     font-size: 13px;
//     font-weight: 500;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     transition: opacity 0.18s;
//     box-shadow: 0 2px 8px rgba(226,75,74,0.28);
//   }
//   .jp-btn-primary:hover { opacity: 0.88; }

//   /* ── Table Card ── */
//   .jp-table-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: var(--r-xl);
//     overflow: hidden;
//     box-shadow: var(--shadow-card);
//   }
//   .jp-table-head th {
//     font-family: 'Inter', sans-serif !important;
//     font-size: 11px !important;
//     font-weight: 500 !important;
//     letter-spacing: 0.08em !important;
//     text-transform: uppercase !important;
//     color: var(--ink-3) !important;
//     background: var(--surface-2) !important;
//     border-bottom: 1px solid var(--border) !important;
//     padding: 10px 14px !important;
//     white-space: nowrap;
//   }
//   .jp-table-row td {
//     font-family: 'Inter', sans-serif !important;
//     font-size: 13px !important;
//     color: var(--ink-2) !important;
//     border-bottom: 1px solid var(--border) !important;
//     padding: 11px 14px !important;
//     vertical-align: middle !important;
//   }
//   .jp-table-row:last-child td { border-bottom: none !important; }
//   .jp-table-row:hover td { background: var(--surface-2) !important; }

//   /* ── Job Title Cell ── */
//   .jp-job-cell { display: flex; align-items: center; gap: 10px; }
//   .jp-avatar {
//     width: 30px; height: 30px;
//     border-radius: 8px;
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Inter', sans-serif;
//     font-size: 11px; font-weight: 600;
//     color: #fff; flex-shrink: 0;
//   }
//   .jp-job-name { font-size: 13px; font-weight: 500; color: var(--ink) !important; }
//   .jp-job-id   { font-size: 11px; color: var(--ink-3) !important; }

//   /* ── Dept Pill ── */
//   .jp-dept-pill {
//     display: inline-block;
//     padding: 2px 10px;
//     border-radius: 999px;
//     font-size: 11px;
//     font-weight: 500;
//   }

//   /* ── Status Badge ── */
//   .jp-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 5px;
//     padding: 3px 10px;
//     border-radius: 999px;
//     font-size: 11px;
//     font-weight: 500;
//   }
//   .jp-badge::before {
//     content: '';
//     width: 5px; height: 5px;
//     border-radius: 50%;
//     flex-shrink: 0;
//   }
//   .jp-badge.active { background: var(--teal-bg);   color: var(--teal-text); }
//   .jp-badge.active::before { background: var(--teal); }
//   .jp-badge.closed { background: #FCEBEB;            color: #A32D2D; }
//   .jp-badge.closed::before { background: #E24B4A; }
//   .jp-badge.draft  { background: var(--amber-bg);   color: var(--amber); }
//   .jp-badge.draft::before  { background: var(--amber); }

//   /* ── Action Buttons ── */
//   .jp-action-btn {
//     width: 28px; height: 28px;
//     border-radius: 7px;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer;
//     background: transparent;
//     border: 1px solid transparent;
//     transition: all 0.15s;
//   }
//   .jp-action-btn.view  { color: var(--blue); }
//   .jp-action-btn.view:hover  { background: var(--blue-bg);   border-color: #B5D4F4; }
//   .jp-action-btn.edit  { color: var(--ink-2); }
//   .jp-action-btn.edit:hover  { background: var(--surface-2); border-color: var(--border-2); }
//   .jp-action-btn.del   { color: #A32D2D; }
//   .jp-action-btn.del:hover   { background: #FCEBEB;          border-color: #F7C1C1; }

//   /* ── Table Footer ── */
//   .jp-table-footer {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 10px 16px;
//     border-top: 1px solid var(--border);
//     background: var(--surface-2);
//   }
//   .jp-showing { font-size: 12px; color: var(--ink-3); }

//   /* ── DIALOGS ── */
//   .jp-dialog-paper {
//     border-radius: var(--r-xl) !important;
//     font-family: 'Inter', sans-serif !important;
//     background: var(--surface) !important;
//     box-shadow: var(--shadow-modal) !important;
//     overflow: hidden !important;
//   }
//   .jp-dialog-header {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 16px 20px;
//   }
//   .jp-dialog-header.create { background: linear-gradient(135deg, #E24B4A, #D85A30); }
//   .jp-dialog-header.edit   { background: linear-gradient(135deg, #185FA5, #378ADD); }
//   .jp-dialog-header.view   { background: linear-gradient(135deg, #1D9E75, #0F6E56); }
//   .jp-dialog-header.danger { background: linear-gradient(135deg, #A32D2D, #E24B4A); }
//   .jp-dialog-title {
//     font-family: 'Inter', sans-serif !important;
//     font-size: 15px !important;
//     font-weight: 600 !important;
//     color: #fff !important;
//   }
//   .jp-dialog-close {
//     width: 28px; height: 28px;
//     background: rgba(255,255,255,0.2) !important;
//     border-radius: 7px !important;
//     color: #fff !important;
//     transition: background 0.15s !important;
//   }
//   .jp-dialog-close:hover { background: rgba(255,255,255,0.35) !important; }

//   /* ── Form ── */
//   .jp-form-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 14px;
//     padding: 20px;
//   }
//   .jp-form-full { grid-column: 1 / -1; }
//   .jp-field-label {
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     color: var(--ink-3);
//     margin-bottom: 5px;
//   }
//   .jp-field-label .req { color: var(--accent); }
//   .jp-input, .jp-select, .jp-textarea {
//     width: 100%;
//     background: var(--surface-2);
//     border: 1px solid var(--border-2);
//     border-radius: var(--r-sm);
//     padding: 8px 10px;
//     font-family: 'Inter', sans-serif;
//     font-size: 13px;
//     color: var(--ink);
//     outline: none;
//     transition: border-color 0.15s, box-shadow 0.15s;
//   }
//   .jp-input:focus, .jp-select:focus, .jp-textarea:focus {
//     border-color: var(--accent);
//     box-shadow: 0 0 0 3px rgba(226,75,74,0.1);
//     background: #fff;
//   }
//   .jp-select { cursor: pointer; appearance: none; }
//   .jp-textarea { resize: none; }

//   /* ── Dialog Footer ── */
//   .jp-dialog-footer {
//     display: flex; justify-content: flex-end; gap: 8px;
//     padding: 0 20px 20px;
//   }
//   .jp-btn-cancel {
//     height: 34px; padding: 0 14px;
//     background: transparent;
//     border: 1px solid var(--border-2);
//     border-radius: var(--r-sm);
//     font-family: 'Inter', sans-serif;
//     font-size: 13px; color: var(--ink-2);
//     cursor: pointer;
//     transition: all 0.15s;
//   }
//   .jp-btn-cancel:hover { border-color: var(--border-2); color: var(--ink); }
//   .jp-btn-action {
//     height: 34px; padding: 0 16px;
//     border: none; border-radius: var(--r-sm);
//     font-family: 'Inter', sans-serif;
//     font-size: 13px; font-weight: 500;
//     cursor: pointer; color: #fff;
//     transition: opacity 0.15s;
//   }
//   .jp-btn-action:hover { opacity: 0.88; }
//   .jp-btn-action.primary { background: var(--accent); }
//   .jp-btn-action.blue    { background: var(--blue); }
//   .jp-btn-action.danger  { background: #A32D2D; }

//   /* ── View Dialog ── */
//   .jp-view-hero {
//     display: flex; align-items: center; gap: 14px;
//     padding: 14px;
//     background: var(--surface-2);
//     border: 1px solid var(--border);
//     border-radius: var(--r-md);
//     margin-bottom: 14px;
//   }
//   .jp-view-avatar {
//     width: 52px; height: 52px;
//     border-radius: 14px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 16px; font-weight: 600;
//     color: #fff; flex-shrink: 0;
//   }
//   .jp-detail-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 10px;
//   }
//   .jp-detail-item {
//     display: flex; align-items: center; gap: 10px;
//     padding: 10px 12px;
//     background: var(--surface-2);
//     border: 1px solid var(--border);
//     border-radius: var(--r-md);
//   }
//   .jp-detail-icon {
//     width: 30px; height: 30px;
//     border-radius: 8px;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//   }
//   .jp-detail-label { font-size: 11px; color: var(--ink-3); margin-bottom: 2px; }
//   .jp-detail-value { font-size: 13px; font-weight: 500; color: var(--ink); }

//   /* ── Delete Dialog ── */
//   .jp-delete-body { text-align: center; padding: 24px 20px 8px; }
//   .jp-delete-icon {
//     width: 56px; height: 56px;
//     border-radius: 50%;
//     background: #FCEBEB;
//     display: flex; align-items: center; justify-content: center;
//     margin: 0 auto 14px;
//   }

//   /* ── Empty State ── */
//   .jp-empty { text-align: center; padding: 40px; color: var(--ink-3); font-size: 13px; }

//   /* ── MUI Overrides ── */
//   .MuiPaginationItem-root { font-family: 'Inter', sans-serif !important; border-radius: 7px !important; }
//   .MuiPaginationItem-root.Mui-selected { background: var(--accent) !important; color: #fff !important; }
//   .MuiTableCell-root { font-family: 'Inter', sans-serif !important; }
// `;

// /* ─── HELPERS ────────────────────────────────────────────────────────────── */
// const DEPT_COLORS = {
//   IT: "#7C3AED",
//   HR: "#0891B2",
//   Finance: "#D97706",
//   Marketing: "#DB2777",
//   Operations: "#059669",
//   Default: "#64748B",
// };
// const deptColor = (d) => DEPT_COLORS[d] || DEPT_COLORS.Default;
// const initials = (t) =>
//   t?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "JP";

// /* ─── SEED DATA ─────────────────────────────────────────────────────────── */
// const SEED = [
//   { id: "JP001", jobTitle: "Frontend Developer",  department: "IT",        location: "Mumbai",    experience: "2–4 yrs", salary: "₹6–8 LPA",   status: "Active", postedDate: "2024-01-15", branch: "Delhi Branch",   applications: 25 },
//   { id: "JP002", jobTitle: "HR Manager",           department: "HR",        location: "Delhi",     experience: "5–7 yrs", salary: "₹8–12 LPA",  status: "Active", postedDate: "2024-02-20", branch: "Mumbai Branch",  applications: 15 },
//   { id: "JP003", jobTitle: "Backend Developer",    department: "IT",        location: "Bangalore", experience: "3–5 yrs", salary: "₹7–10 LPA",  status: "Closed", postedDate: "2024-03-10", branch: "Kolkata Branch", applications: 30 },
//   { id: "JP004", jobTitle: "Marketing Lead",       department: "Marketing", location: "Pune",      experience: "4–6 yrs", salary: "₹9–13 LPA",  status: "Draft",  postedDate: "2024-03-18", branch: "Pune Branch",    applications: 8  },
//   { id: "JP005", jobTitle: "Finance Analyst",      department: "Finance",   location: "Chennai",   experience: "2–4 yrs", salary: "₹5–7 LPA",   status: "Active", postedDate: "2024-04-02", branch: "Chennai Branch", applications: 19 },
// ];

// const EMPTY_FORM = {
//   jobTitle: "", department: "", location: "", branch: "",
//   experience: "", salary: "", status: "Active",
//   description: "", requirements: "",
// };

// /* ─── SUB-COMPONENTS ─────────────────────────────────────────────────────── */
// function StatusBadge({ status }) {
//   const cls = status === "Active" ? "active" : status === "Closed" ? "closed" : "draft";
//   return <span className={`jp-badge ${cls}`}>{status}</span>;
// }

// function Field({ label, name, value, onChange, full = false, req = false }) {
//   return (
//     <div className={full ? "jp-form-full" : ""}>
//       <div className="jp-field-label">
//         {label} {req && <span className="req">*</span>}
//       </div>
//       <input className="jp-input" name={name} value={value} onChange={onChange} />
//     </div>
//   );
// }

// function FieldSelect({ label, name, value, onChange, options }) {
//   return (
//     <div>
//       <div className="jp-field-label">{label}</div>
//       <select className="jp-select" name={name} value={value} onChange={onChange}>
//         {options.map((o) => <option key={o}>{o}</option>)}
//       </select>
//     </div>
//   );
// }

// function FieldTextarea({ label, name, value, onChange }) {
//   return (
//     <div className="jp-form-full">
//       <div className="jp-field-label">{label}</div>
//       <textarea className="jp-textarea" name={name} value={value} onChange={onChange} rows={3} />
//     </div>
//   );
// }

// /* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
// const JobPostingPage = () => {
//   const [jobs, setJobs] = useState(SEED);
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 8;
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   const [openCreate, setOpenCreate]   = useState(false);
//   const [openView, setOpenView]       = useState(false);
//   const [openEdit, setOpenEdit]       = useState(false);
//   const [openDelete, setOpenDelete]   = useState(false);
//   const [selected, setSelected]       = useState(null);
//   const [form, setForm]               = useState(EMPTY_FORM);

//   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const closeAll = () => {
//     setOpenCreate(false); setOpenView(false);
//     setOpenEdit(false); setOpenDelete(false);
//     setSelected(null); setForm(EMPTY_FORM);
//   };

//   const handleCreate = () => {
//     if (!form.jobTitle.trim()) return;
//     setJobs((prev) => [...prev, {
//       id: `JP${String(prev.length + 1).padStart(3, "0")}`,
//       ...form,
//       postedDate: new Date().toISOString().split("T")[0],
//       applications: 0,
//     }]);
//     closeAll();
//   };

//   const handleEdit = () => {
//     setJobs((prev) => prev.map((j) => (j.id === selected.id ? { ...j, ...form } : j)));
//     closeAll();
//   };

//   const handleDelete = () => {
//     setJobs((prev) => prev.filter((j) => j.id !== selected.id));
//     closeAll();
//   };

//   const filtered = jobs.filter((j) => {
//     const q = search.toLowerCase();
//     const matchQ = (j.jobTitle + j.department + j.location).toLowerCase().includes(q);
//     const matchS = filterStatus === "all" || j.status === filterStatus;
//     return matchQ && matchS;
//   });

//   const pageJobs = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
//   const totalApps = jobs.reduce((s, j) => s + j.applications, 0);
//   const activeCount = jobs.filter((j) => j.status === "Active").length;
//   const deptCount = new Set(jobs.map((j) => j.department)).size;

//   /* ── Reusable form fields shared by Create and Edit ── */
//   const FormFields = () => (
//     <div className="jp-form-grid">
//       <Field label="Job title" name="jobTitle" value={form.jobTitle} onChange={handleChange} full req />
//       <Field label="Department" name="department" value={form.department} onChange={handleChange} />
//       <Field label="Branch" name="branch" value={form.branch} onChange={handleChange} />
//       <Field label="Location" name="location" value={form.location} onChange={handleChange} />
//       <Field label="Experience" name="experience" value={form.experience} onChange={handleChange} />
//       <Field label="Salary range" name="salary" value={form.salary} onChange={handleChange} />
//       <FieldSelect label="Status" name="status" value={form.status} onChange={handleChange} options={["Active", "Draft", "Closed"]} />
//       <FieldTextarea label="Description" name="description" value={form.description} onChange={handleChange} />
//       <FieldTextarea label="Requirements" name="requirements" value={form.requirements} onChange={handleChange} />
//     </div>
//   );

//   return (
//     <>
//       <style>{globalStyles}</style>

//       <div className="jp-root">

//         {/* ── Header ── */}
//         <div className="jp-header">
//           <div>
//             <div className="jp-eyebrow">Recruitment · Job Postings</div>
//             <div className="jp-title">Open <span>Positions</span></div>
//           </div>
//           <button className="jp-btn-primary" onClick={() => setOpenCreate(true)}>
//             <Add sx={{ fontSize: 17 }} />
//             Post new job
//           </button>
//         </div>

//         {/* ── Stats ── */}
//         <div className="jp-stats">
//           {[
//             { icon: <WorkOutline sx={{ fontSize: 19 }} />,     cls: "coral", val: jobs.length,  label: "Total postings"    },
//             { icon: <TrendingUp sx={{ fontSize: 19 }} />,      cls: "teal",  val: activeCount,  label: "Active jobs"       },
//             { icon: <PeopleOutlined sx={{ fontSize: 19 }} />,  cls: "amber", val: totalApps,    label: "Total applications" },
//             { icon: <BusinessOutlined sx={{ fontSize: 19 }} />,cls: "blue",  val: deptCount,    label: "Departments"        },
//           ].map(({ icon, cls, val, label }, i) => (
//             <div className="jp-stat-card" key={i}>
//               <div className={`jp-stat-icon ${cls}`}>{icon}</div>
//               <div>
//                 <div className="jp-stat-value">{val}</div>
//                 <div className="jp-stat-label">{label}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Toolbar ── */}
//         <div className="jp-toolbar">
//           <div className="jp-search">
//             <Search sx={{ fontSize: 16, color: "var(--ink-3)", flexShrink: 0 }} />
//             <input
//               placeholder="Search title, dept, location…"
//               value={search}
//               onChange={(e) => { setSearch(e.target.value); setPage(0); }}
//             />
//           </div>
//           {["all", "Active", "Draft", "Closed"].map((s) => (
//             <button
//               key={s}
//               className={`jp-filter-btn${filterStatus === s ? " active" : ""}`}
//               onClick={() => { setFilterStatus(s); setPage(0); }}
//             >
//               {s === "all" ? "All" : s}
//             </button>
//           ))}
//           <Box sx={{ flex: 1 }} />
//           <Typography sx={{ fontSize: "12px", color: "var(--ink-3)" }}>
//             {filtered.length} result{filtered.length !== 1 ? "s" : ""}
//           </Typography>
//         </div>

//         {/* ── Table ── */}
//         <div className="jp-table-card">
//           <Table>
//             <TableHead>
//               <TableRow className="jp-table-head">
//                 {["#", "Job title", "Department", "Branch", "Location", "Experience", "Salary", "Status", "Actions"].map((h) => (
//                   <TableCell key={h}>{h}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {pageJobs.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={9}>
//                     <div className="jp-empty">No job postings match your filters.</div>
//                   </TableCell>
//                 </TableRow>
//               ) : pageJobs.map((job, idx) => {
//                 const fg = deptColor(job.department);
//                 return (
//                   <TableRow key={job.id} className="jp-table-row">
//                     <TableCell sx={{ fontSize: "12px !important", color: "var(--ink-3) !important", fontWeight: 500 }}>
//                       {page * rowsPerPage + idx + 1}
//                     </TableCell>
//                     <TableCell>
//                       <div className="jp-job-cell">
//                         <div className="jp-avatar" style={{ background: fg }}>{initials(job.jobTitle)}</div>
//                         <div>
//                           <div className="jp-job-name">{job.jobTitle}</div>
//                           <div className="jp-job-id">{job.id}</div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <span className="jp-dept-pill" style={{ background: `${fg}18`, color: fg }}>
//                         {job.department}
//                       </span>
//                     </TableCell>
//                     <TableCell>{job.branch}</TableCell>
//                     <TableCell>{job.location}</TableCell>
//                     <TableCell>{job.experience}</TableCell>
//                     <TableCell sx={{ fontWeight: "500 !important" }}>{job.salary}</TableCell>
//                     <TableCell><StatusBadge status={job.status} /></TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", gap: "4px" }}>
//                         {[
//                           { cls: "view", Icon: VisibilityOutlined, fn: () => { setSelected(job); setOpenView(true); } },
//                           { cls: "edit", Icon: EditOutlined, fn: () => { setSelected(job); setForm({ jobTitle: job.jobTitle, department: job.department, location: job.location, branch: job.branch, experience: job.experience, salary: job.salary, status: job.status, description: job.description || "", requirements: job.requirements || "" }); setOpenEdit(true); } },
//                           { cls: "del",  Icon: DeleteOutlined, fn: () => { setSelected(job); setOpenDelete(true); } },
//                         ].map(({ cls, Icon, fn }) => (
//                           <button key={cls} className={`jp-action-btn ${cls}`} onClick={fn}>
//                             <Icon sx={{ fontSize: 16 }} />
//                           </button>
//                         ))}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//           <div className="jp-table-footer">
//             <span className="jp-showing">
//               Showing {filtered.length === 0 ? 0 : page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, filtered.length)} of {filtered.length}
//             </span>
//             <Pagination
//               count={Math.max(1, Math.ceil(filtered.length / rowsPerPage))}
//               page={page + 1}
//               onChange={(_, v) => setPage(v - 1)}
//               size="small"
//             />
//           </div>
//         </div>
//       </div>

//       {/* ══════════ CREATE DIALOG ══════════ */}
//       <Dialog open={openCreate} onClose={closeAll} maxWidth="md" fullWidth PaperProps={{ className: "jp-dialog-paper" }}>
//         <div className="jp-dialog-header create">
//           <span className="jp-dialog-title">Post new job</span>
//           <IconButton className="jp-dialog-close" onClick={closeAll} size="small"><Close sx={{ fontSize: 17 }} /></IconButton>
//         </div>
//         <FormFields />
//         <div className="jp-dialog-footer">
//           <button className="jp-btn-cancel" onClick={closeAll}>Cancel</button>
//           <button className="jp-btn-action primary" onClick={handleCreate}>Post job</button>
//         </div>
//       </Dialog>

//       {/* ══════════ EDIT DIALOG ══════════ */}
//       <Dialog open={openEdit} onClose={closeAll} maxWidth="md" fullWidth PaperProps={{ className: "jp-dialog-paper" }}>
//         <div className="jp-dialog-header edit">
//           <span className="jp-dialog-title">Edit job posting</span>
//           <IconButton className="jp-dialog-close" onClick={closeAll} size="small"><Close sx={{ fontSize: 17 }} /></IconButton>
//         </div>
//         <FormFields />
//         <div className="jp-dialog-footer">
//           <button className="jp-btn-cancel" onClick={closeAll}>Cancel</button>
//           <button className="jp-btn-action blue" onClick={handleEdit}>Save changes</button>
//         </div>
//       </Dialog>

//       {/* ══════════ VIEW DIALOG ══════════ */}
//       <Dialog open={openView} onClose={closeAll} maxWidth="sm" fullWidth PaperProps={{ className: "jp-dialog-paper" }}>
//         <div className="jp-dialog-header view">
//           <span className="jp-dialog-title">Job details</span>
//           <IconButton className="jp-dialog-close" onClick={closeAll} size="small"><Close sx={{ fontSize: 17 }} /></IconButton>
//         </div>
//         {selected && (() => {
//           const fg = deptColor(selected.department);
//           return (
//             <div style={{ padding: "20px" }}>
//               <div className="jp-view-hero">
//                 <div className="jp-view-avatar" style={{ background: fg }}>{initials(selected.jobTitle)}</div>
//                 <div>
//                   <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)" }}>{selected.jobTitle}</div>
//                   <div style={{ fontSize: "12px", color: "var(--ink-3)", marginTop: "3px" }}>{selected.id} · Posted {selected.postedDate}</div>
//                   <div style={{ marginTop: "6px" }}><StatusBadge status={selected.status} /></div>
//                 </div>
//               </div>
//               <div className="jp-detail-grid">
//                 {[
//                   { Icon: BusinessOutlined,    cls: ["#FAECE7","#D85A30"], label: "Department",   val: selected.department  },
//                   { Icon: AccountTreeOutlined, cls: ["#E1F5EE","#1D9E75"], label: "Branch",       val: selected.branch      },
//                   { Icon: LocationOnOutlined,  cls: ["#FAEEDA","#BA7517"], label: "Location",     val: selected.location    },
//                   { Icon: WorkOutline,         cls: ["#E6F1FB","#185FA5"], label: "Experience",   val: selected.experience  },
//                   { Icon: AttachMoneyOutlined, cls: ["#FAECE7","#D85A30"], label: "Salary",       val: selected.salary      },
//                   { Icon: PeopleOutlined,      cls: ["#E1F5EE","#1D9E75"], label: "Applications", val: selected.applications},
//                 ].map(({ Icon, cls, label, val }) => (
//                   <div className="jp-detail-item" key={label}>
//                     <div className="jp-detail-icon" style={{ background: cls[0], color: cls[1] }}><Icon sx={{ fontSize: 16 }} /></div>
//                     <div>
//                       <div className="jp-detail-label">{label}</div>
//                       <div className="jp-detail-value">{val}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {selected.description && (
//                 <div style={{ marginTop: "12px", padding: "12px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-md)" }}>
//                   <div className="jp-field-label" style={{ marginBottom: "6px" }}>Description</div>
//                   <p style={{ fontSize: "13px", color: "var(--ink-2)", lineHeight: 1.6 }}>{selected.description}</p>
//                 </div>
//               )}
//             </div>
//           );
//         })()}
//         <div className="jp-dialog-footer">
//           <button className="jp-btn-action primary" onClick={closeAll}>Close</button>
//         </div>
//       </Dialog>

//       {/* ══════════ DELETE DIALOG ══════════ */}
//       <Dialog open={openDelete} onClose={closeAll} maxWidth="xs" fullWidth PaperProps={{ className: "jp-dialog-paper" }}>
//         <div className="jp-dialog-header danger">
//           <span className="jp-dialog-title">Delete posting</span>
//           <IconButton className="jp-dialog-close" onClick={closeAll} size="small"><Close sx={{ fontSize: 17 }} /></IconButton>
//         </div>
//         <div className="jp-delete-body">
//           <div className="jp-delete-icon">
//             <DeleteOutlined sx={{ fontSize: 26, color: "#A32D2D" }} />
//           </div>
//           <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>
//             Delete this posting?
//           </div>
//           <div style={{ fontSize: "13px", color: "var(--ink-2)", lineHeight: 1.6 }}>
//             You're about to permanently delete{" "}
//             <strong style={{ color: "var(--ink)" }}>{selected?.jobTitle}</strong>.
//             This action cannot be undone.
//           </div>
//         </div>
//         <div className="jp-dialog-footer" style={{ paddingTop: "16px" }}>
//           <button className="jp-btn-cancel" onClick={closeAll}>Cancel</button>
//           <button className="jp-btn-action danger" onClick={handleDelete}>Delete</button>
//         </div>
//       </Dialog>
//     </>
//   );
// };

// export default JobPostingPage;












"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  Stack,
  Dialog,
} from "@mui/material";
import {
  Add,
  EditOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  Search,
  WorkOutline,
  LocationOnOutlined,
  BusinessOutlined,
  AttachMoneyOutlined,
  PeopleOutlined,
  TrendingUp,
  Close,
  AccountTreeOutlined,
} from "@mui/icons-material";

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --bg:           #f8fafc;
    --surface:      #ffffff;
    --surface-2:    #f1f5f9;
    --ink:          #1e293b;
    --ink-2:        #475569;
    --ink-3:        #94a3b8;
    --border:       #e2e8f0;
    --border-2:     #cbd5e1;
    --accent:       #6366f1;
    --accent-dark:  #4f46e5;
    --accent-bg:    #eef2ff;
    --accent-text:  #4f46e5;
    --teal:         #10b981;
    --teal-bg:      #d1fae5;
    --teal-text:    #047857;
    --amber:        #f59e0b;
    --amber-bg:     #fef3c7;
    --blue:         #2563eb;
    --blue-bg:      #dbeafe;
    --red:          #ef4444;
    --red-bg:       #fee2e2;
    --r-sm:         8px;
    --r-md:         10px;
    --r-lg:         14px;
    --r-xl:         18px;
    --shadow-sm:    0 1px 2px rgba(16,24,40,.03);
    --shadow-md:    0 2px 8px rgba(16,24,40,.05);
    --shadow-lg:    0 4px 16px rgba(16,24,40,.08);
    --shadow-xl:    0 20px 60px rgba(16,24,40,.15);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .jp-root {
    min-height: 100vh;
    background: linear-gradient(180deg, var(--bg) 0%, #f3f7fc 100%);
    padding: 2rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  /* ── Animations ── */
  @keyframes jp-fade-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes jp-slide-r  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
  @keyframes jp-stat-pop { 0%{transform:scale(0.95);opacity:0} 100%{transform:scale(1);opacity:1} }

  /* ── Header ── */
  .jp-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;
    animation: jp-fade-in .5s cubic-bezier(.22,1,.36,1);
  }
  .jp-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 6px;
  }
  .jp-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  .jp-title span { 
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Stats ── */
  .jp-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
    margin-bottom: 1.75rem;
  }
  @media(max-width:1200px) { .jp-stats { grid-template-columns: repeat(2, 1fr); } }
  @media(max-width:600px)  { .jp-stats { grid-template-columns: 1fr; } }

  .jp-stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: var(--shadow-sm);
    animation: jp-stat-pop .5s cubic-bezier(.22,1,.36,1) both;
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .jp-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .jp-stat-icon {
    width: 46px; height: 46px;
    border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-weight: 600;
  }
  .jp-stat-icon.coral { background: #fef2f2; color: #ef4444; }
  .jp-stat-icon.teal  { background: #f0fdf4; color: #10b981; }
  .jp-stat-icon.amber { background: #fffbeb; color: #f59e0b; }
  .jp-stat-icon.blue  { background: #eff6ff; color: #2563eb; }
  .jp-stat-value { 
    font-size: 1.5rem; 
    font-weight: 800; 
    color: var(--ink); 
    line-height: 1; 
    letter-spacing: -.02em;
  }
  .jp-stat-label { 
    font-size: 0.75rem; 
    color: var(--ink-3); 
    margin-top: 4px; 
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .05em;
  }

  /* ── Toolbar ── */
  .jp-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    animation: jp-fade-in .5s .1s cubic-bezier(.22,1,.36,1) both;
  }
  .jp-search {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 0 12px;
    height: 40px;
    width: 260px;
    transition: all .2s ease;
    box-shadow: var(--shadow-sm);
  }
  .jp-search:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(99,102,241,.1);
  }
  .jp-search input {
    border: none; outline: none;
    background: transparent;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ink);
    width: 100%;
  }
  .jp-search input::placeholder { color: var(--ink-3); }
  
  .jp-filter-btn {
    height: 40px;
    padding: 0 14px;
    border-radius: 999px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: .01em;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--ink-2);
    transition: all .2s ease;
    box-shadow: var(--shadow-sm);
  }
  .jp-filter-btn:hover {
    border-color: var(--border-2);
    background: var(--surface-2);
  }
  .jp-filter-btn.active {
    border-color: var(--accent);
    background: var(--accent-bg);
    color: var(--accent-text);
    box-shadow: 0 0 0 4px rgba(99,102,241,.1);
  }
  
  .jp-btn-primary {
    height: 40px;
    padding: 0 18px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
    color: #fff;
    border: none;
    border-radius: var(--r-md);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: .01em;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: all .2s ease;
    box-shadow: 0 4px 14px rgba(99,102,241,.25);
  }
  .jp-btn-primary:hover { 
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(99,102,241,.32);
    filter: brightness(1.04);
  }

  /* ── Table Card ── */
  .jp-table-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    animation: jp-fade-in .5s .15s cubic-bezier(.22,1,.36,1) both;
  }
  .jp-table-head th {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 0.7rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    color: var(--ink-3) !important;
    background: var(--surface-2) !important;
    border-bottom: 1px solid var(--border) !important;
    padding: 12px 16px !important;
    white-space: nowrap;
  }
  .jp-table-row td {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 0.875rem !important;
    color: var(--ink-2) !important;
    border-bottom: 1px solid var(--border) !important;
    padding: 13px 16px !important;
    vertical-align: middle !important;
    transition: background .15s ease;
  }
  .jp-table-row:last-child td { border-bottom: none !important; }
  .jp-table-row:hover td { background: var(--surface-2) !important; }

  /* ── Job Title Cell ── */
  .jp-job-cell { display: flex; align-items: center; gap: 12px; }
  .jp-avatar {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.85rem; font-weight: 700;
    color: #fff; flex-shrink: 0;
  }
  .jp-job-name { 
    font-size: 0.875rem; 
    font-weight: 700; 
    color: var(--ink) !important; 
    letter-spacing: -.01em;
  }
  .jp-job-id { 
    font-size: 0.75rem; 
    color: var(--ink-3) !important; 
    font-weight: 500;
    margin-top: 2px;
  }

  /* ── Dept Pill ── */
  .jp-dept-pill {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: .01em;
    text-transform: uppercase;
  }

  /* ── Status Badge ── */
  .jp-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 11px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: .01em;
  }
  .jp-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    animation: jp-pulse 1.5s ease-in-out infinite;
  }
  @keyframes jp-pulse { 0%,100%{opacity:.5;transform:scale(.85)} 50%{opacity:1;transform:scale(1.15)} }
  
  .jp-badge.active { background: #f0fdf4; color: #16a34a; }
  .jp-badge.active::before { background: #10b981; }
  .jp-badge.closed { background: #fee2e2; color: #dc2626; }
  .jp-badge.closed::before { background: #ef4444; }
  .jp-badge.draft  { background: #fef3c7; color: #d97706; }
  .jp-badge.draft::before { background: #f59e0b; }

  /* ── Action Buttons ── */
  .jp-action-btn {
    width: 32px; height: 32px;
    border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    background: transparent;
    border: 1px solid transparent;
    transition: all .15s ease;
    color: var(--ink-3);
  }
  .jp-action-btn.view  { color: var(--blue); }
  .jp-action-btn.view:hover  { background: var(--blue-bg); border-color: #bfdbfe; }
  .jp-action-btn.edit  { color: var(--ink-2); }
  .jp-action-btn.edit:hover  { background: var(--surface-2); border-color: var(--border-2); }
  .jp-action-btn.del   { color: #ef4444; }
  .jp-action-btn.del:hover   { background: #fee2e2; border-color: #fecaca; }

  /* ── Table Footer ── */
  .jp-table-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px;
    border-top: 1px solid var(--border);
    background: var(--surface-2);
  }
  .jp-showing { 
    font-size: 0.8rem; 
    color: var(--ink-3); 
    font-weight: 500;
  }

  /* ── DIALOGS ── */
  .jp-dialog-paper {
    border-radius: var(--r-xl) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    background: var(--surface) !important;
    box-shadow: var(--shadow-xl) !important;
    overflow: hidden !important;
  }
  .jp-dialog-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px;
  }
  .jp-dialog-header.create { 
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  }
  .jp-dialog-header.edit { 
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  }
  .jp-dialog-header.view { 
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
  .jp-dialog-header.danger { 
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }
  .jp-dialog-title {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 1rem !important;
    font-weight: 700 !important;
    color: #fff !important;
    letter-spacing: -.01em;
  }
  .jp-dialog-close {
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.15) !important;
    border-radius: var(--r-md) !important;
    color: #fff !important;
    transition: background .2s ease !important;
  }
  .jp-dialog-close:hover { background: rgba(255,255,255,0.3) !important; }

  /* ── Form ── */
  .jp-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 22px;
  }
  .jp-form-full { grid-column: 1 / -1; }
  .jp-field-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 8px;
  }
  .jp-field-label .req { color: #ef4444; }
  .jp-input, .jp-select, .jp-textarea {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 10px 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ink);
    outline: none;
    transition: all .2s ease;
  }
  .jp-input::placeholder, .jp-textarea::placeholder { color: var(--ink-3); }
  .jp-input:focus, .jp-select:focus, .jp-textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(99,102,241,.1);
    background: #f8fafc;
  }
  .jp-input:hover:not(:focus), .jp-select:hover:not(:focus), .jp-textarea:hover:not(:focus) {
    border-color: var(--border-2);
  }
  .jp-select { cursor: pointer; appearance: none; }
  .jp-textarea { resize: none; }

  /* ── Dialog Footer ── */
  .jp-dialog-footer {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 0 22px 22px;
  }
  .jp-btn-cancel {
    height: 40px; padding: 0 18px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.875rem; 
    font-weight: 700;
    color: var(--ink-2);
    cursor: pointer;
    transition: all .2s ease;
  }
  .jp-btn-cancel:hover { 
    border-color: var(--border-2); 
    background: var(--surface-2);
    transform: translateY(-2px);
  }
  .jp-btn-action {
    height: 40px; padding: 0 18px;
    border: none; border-radius: var(--r-md);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.875rem; 
    font-weight: 700;
    letter-spacing: .01em;
    cursor: pointer; 
    color: #fff;
    transition: all .2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .jp-btn-action:hover { transform: translateY(-2px); }
  .jp-btn-action.primary { 
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
    box-shadow: 0 4px 14px rgba(99,102,241,.25);
  }
  .jp-btn-action.primary:hover { box-shadow: 0 8px 22px rgba(99,102,241,.32); }
  .jp-btn-action.blue { 
    background: linear-gradient(135deg, var(--blue) 0%, #1d4ed8 100%);
    box-shadow: 0 4px 14px rgba(37,99,235,.25);
  }
  .jp-btn-action.blue:hover { box-shadow: 0 8px 22px rgba(37,99,235,.32); }
  .jp-btn-action.danger { 
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    box-shadow: 0 4px 14px rgba(239,68,68,.25);
  }
  .jp-btn-action.danger:hover { box-shadow: 0 8px 22px rgba(239,68,68,.32); }

  /* ── View Dialog ── */
  .jp-view-hero {
    display: flex; align-items: center; gap: 16px;
    padding: 16px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    margin-bottom: 16px;
  }
  .jp-view-avatar {
    width: 52px; height: 52px;
    border-radius: var(--r-lg);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; font-weight: 700;
    color: #fff; flex-shrink: 0;
  }
  .jp-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .jp-detail-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .jp-detail-icon {
    width: 34px; height: 34px;
    border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .jp-detail-label { 
    font-size: 0.7rem; 
    color: var(--ink-3); 
    font-weight: 700;
    letter-spacing: .05em;
    text-transform: uppercase;
    margin-bottom: 3px; 
  }
  .jp-detail-value { 
    font-size: 0.875rem; 
    font-weight: 700; 
    color: var(--ink); 
    letter-spacing: -.01em;
  }

  /* ── Delete Dialog ── */
  .jp-delete-body { text-align: center; padding: 28px 22px 8px; }
  .jp-delete-icon {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: #fee2e2;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
  }

  /* ── Empty State ── */
  .jp-empty { text-align: center; padding: 48px 20px; color: var(--ink-3); font-size: 0.875rem; font-weight: 500; }

  /* ── MUI Overrides ── */
  .MuiPaginationItem-root { 
    font-family: 'Plus Jakarta Sans', sans-serif !important; 
    border-radius: var(--r-md) !important; 
    font-weight: 600 !important;
  }
  .MuiPaginationItem-root.Mui-selected { 
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%) !important; 
    color: #fff !important; 
  }
`;

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const DEPT_COLORS = {
  IT: "#6366f1",
  HR: "#0891b2",
  Finance: "#f59e0b",
  Marketing: "#db2777",
  Operations: "#10b981",
  Default: "#64748b",
};
const deptColor = (d) => DEPT_COLORS[d] || DEPT_COLORS.Default;
const initials = (t) =>
  t?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "JP";

/* ─── SEED DATA ─────────────────────────────────────────────────────────── */
const SEED = [
  { id: "JP001", jobTitle: "Frontend Developer",  department: "IT",        location: "Mumbai",    experience: "2–4 yrs", salary: "₹6–8 LPA",   status: "Active", postedDate: "2024-01-15", branch: "Delhi Branch",   applications: 25 },
  { id: "JP002", jobTitle: "HR Manager",           department: "HR",        location: "Delhi",     experience: "5–7 yrs", salary: "₹8–12 LPA",  status: "Active", postedDate: "2024-02-20", branch: "Mumbai Branch",  applications: 15 },
  { id: "JP003", jobTitle: "Backend Developer",    department: "IT",        location: "Bangalore", experience: "3–5 yrs", salary: "₹7–10 LPA",  status: "Closed", postedDate: "2024-03-10", branch: "Kolkata Branch", applications: 30 },
  { id: "JP004", jobTitle: "Marketing Lead",       department: "Marketing", location: "Pune",      experience: "4–6 yrs", salary: "₹9–13 LPA",  status: "Draft",  postedDate: "2024-03-18", branch: "Pune Branch",    applications: 8  },
  { id: "JP005", jobTitle: "Finance Analyst",      department: "Finance",   location: "Chennai",   experience: "2–4 yrs", salary: "₹5–7 LPA",   status: "Active", postedDate: "2024-04-02", branch: "Chennai Branch", applications: 19 },
];

const EMPTY_FORM = {
  jobTitle: "", department: "", location: "", branch: "",
  experience: "", salary: "", status: "Active",
  description: "", requirements: "",
};

/* ─── SUB-COMPONENTS ─────────────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const cls = status === "Active" ? "active" : status === "Closed" ? "closed" : "draft";
  return <span className={`jp-badge ${cls}`}>{status}</span>;
}

function Field({ label, name, value, onChange, full = false, req = false }) {
  return (
    <div className={full ? "jp-form-full" : ""}>
      <div className="jp-field-label">
        {label} {req && <span className="req">*</span>}
      </div>
      <input className="jp-input" name={name} value={value} onChange={onChange} />
    </div>
  );
}

function FieldSelect({ label, name, value, onChange, options }) {
  return (
    <div>
      <div className="jp-field-label">{label}</div>
      <select className="jp-select" name={name} value={value} onChange={onChange}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FieldTextarea({ label, name, value, onChange }) {
  return (
    <div className="jp-form-full">
      <div className="jp-field-label">{label}</div>
      <textarea className="jp-textarea" name={name} value={value} onChange={onChange} rows={3} />
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
const JobPostingPage = () => {
  const [jobs, setJobs] = useState(SEED);
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [openCreate, setOpenCreate]   = useState(false);
  const [openView, setOpenView]       = useState(false);
  const [openEdit, setOpenEdit]       = useState(false);
  const [openDelete, setOpenDelete]   = useState(false);
  const [selected, setSelected]       = useState(null);
  const [form, setForm]               = useState(EMPTY_FORM);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const closeAll = () => {
    setOpenCreate(false); setOpenView(false);
    setOpenEdit(false); setOpenDelete(false);
    setSelected(null); setForm(EMPTY_FORM);
  };

  const handleCreate = () => {
    if (!form.jobTitle.trim()) return;
    setJobs((prev) => [...prev, {
      id: `JP${String(prev.length + 1).padStart(3, "0")}`,
      ...form,
      postedDate: new Date().toISOString().split("T")[0],
      applications: 0,
    }]);
    closeAll();
  };

  const handleEdit = () => {
    setJobs((prev) => prev.map((j) => (j.id === selected.id ? { ...j, ...form } : j)));
    closeAll();
  };

  const handleDelete = () => {
    setJobs((prev) => prev.filter((j) => j.id !== selected.id));
    closeAll();
  };

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchQ = (j.jobTitle + j.department + j.location).toLowerCase().includes(q);
    const matchS = filterStatus === "all" || j.status === filterStatus;
    return matchQ && matchS;
  });

  const pageJobs = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const totalApps = jobs.reduce((s, j) => s + j.applications, 0);
  const activeCount = jobs.filter((j) => j.status === "Active").length;
  const deptCount = new Set(jobs.map((j) => j.department)).size;

  const FormFields = () => (
    <div className="jp-form-grid">
      <Field label="Job title" name="jobTitle" value={form.jobTitle} onChange={handleChange} full req />
      <Field label="Department" name="department" value={form.department} onChange={handleChange} />
      <Field label="Branch" name="branch" value={form.branch} onChange={handleChange} />
      <Field label="Location" name="location" value={form.location} onChange={handleChange} />
      <Field label="Experience" name="experience" value={form.experience} onChange={handleChange} />
      <Field label="Salary range" name="salary" value={form.salary} onChange={handleChange} />
      <FieldSelect label="Status" name="status" value={form.status} onChange={handleChange} options={["Active", "Draft", "Closed"]} />
      <FieldTextarea label="Description" name="description" value={form.description} onChange={handleChange} />
      <FieldTextarea label="Requirements" name="requirements" value={form.requirements} onChange={handleChange} />
    </div>
  );

  return (
    <>
      <style>{globalStyles}</style>

      <div className="jp-root">

        {/* ── Header ── */}
        <div className="jp-header">
          <div>
            <div className="jp-eyebrow">Recruitment · Job Postings</div>
            <div className="jp-title">Open <span>Positions</span></div>
          </div>
          <button className="jp-btn-primary" onClick={() => setOpenCreate(true)}>
            <Add sx={{ fontSize: 17 }} />
            Post new job
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="jp-stats">
          {[
            { icon: <WorkOutline sx={{ fontSize: 19 }} />,     cls: "coral", val: jobs.length,  label: "Total postings"    },
            { icon: <TrendingUp sx={{ fontSize: 19 }} />,      cls: "teal",  val: activeCount,  label: "Active jobs"       },
            { icon: <PeopleOutlined sx={{ fontSize: 19 }} />,  cls: "amber", val: totalApps,    label: "Total applications" },
            { icon: <BusinessOutlined sx={{ fontSize: 19 }} />,cls: "blue",  val: deptCount,    label: "Departments"        },
          ].map(({ icon, cls, val, label }, i) => (
            <div className="jp-stat-card" key={i} style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`jp-stat-icon ${cls}`}>{icon}</div>
              <div>
                <div className="jp-stat-value">{val}</div>
                <div className="jp-stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="jp-toolbar">
          <div className="jp-search">
            <Search sx={{ fontSize: 18, color: "var(--ink-3)", flexShrink: 0 }} />
            <input
              placeholder="Search title, dept, location…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            />
          </div>
          {["all", "Active", "Draft", "Closed"].map((s) => (
            <button
              key={s}
              className={`jp-filter-btn${filterStatus === s ? " active" : ""}`}
              onClick={() => { setFilterStatus(s); setPage(0); }}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
          <Box sx={{ flex: 1 }} />
          <Typography sx={{ fontSize: "0.8rem", color: "var(--ink-3)", fontWeight: 600 }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </Typography>
        </div>

        {/* ── Table ── */}
        <div className="jp-table-card">
          <Table>
            <TableHead>
              <TableRow className="jp-table-head">
                {["#", "Job title", "Department", "Branch", "Location", "Experience", "Salary", "Status", "Actions"].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9}>
                    <div className="jp-empty">No job postings match your filters.</div>
                  </TableCell>
                </TableRow>
              ) : pageJobs.map((job, idx) => {
                const fg = deptColor(job.department);
                return (
                  <TableRow key={job.id} className="jp-table-row">
                    <TableCell sx={{ fontSize: "0.8rem !important", color: "var(--ink-3) !important", fontWeight: 700 }}>
                      {page * rowsPerPage + idx + 1}
                    </TableCell>
                    <TableCell>
                      <div className="jp-job-cell">
                        <div className="jp-avatar" style={{ background: fg }}>{initials(job.jobTitle)}</div>
                        <div>
                          <div className="jp-job-name">{job.jobTitle}</div>
                          <div className="jp-job-id">{job.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="jp-dept-pill" style={{ background: `${fg}18`, color: fg }}>
                        {job.department}
                      </span>
                    </TableCell>
                    <TableCell>{job.branch}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.experience}</TableCell>
                    <TableCell sx={{ fontWeight: "700 !important" }}>{job.salary}</TableCell>
                    <TableCell><StatusBadge status={job.status} /></TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "6px" }}>
                        {[
                          { cls: "view", Icon: VisibilityOutlined, fn: () => { setSelected(job); setOpenView(true); } },
                          { cls: "edit", Icon: EditOutlined, fn: () => { setSelected(job); setForm({ jobTitle: job.jobTitle, department: job.department, location: job.location, branch: job.branch, experience: job.experience, salary: job.salary, status: job.status, description: job.description || "", requirements: job.requirements || "" }); setOpenEdit(true); } },
                          { cls: "del",  Icon: DeleteOutlined, fn: () => { setSelected(job); setOpenDelete(true); } },
                        ].map(({ cls, Icon, fn }) => (
                          <button key={cls} className={`jp-action-btn ${cls}`} onClick={fn}>
                            <Icon sx={{ fontSize: 17 }} />
                          </button>
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="jp-table-footer">
            <span className="jp-showing">
              Showing {filtered.length === 0 ? 0 : page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, filtered.length)} of {filtered.length}
            </span>
            <Pagination
              count={Math.max(1, Math.ceil(filtered.length / rowsPerPage))}
              page={page + 1}
              onChange={(_, v) => setPage(v - 1)}
              size="small"
            />
          </div>
        </div>
      </div>

      {/* ══════════ CREATE DIALOG ══════════ */}
      <Dialog open={openCreate} onClose={closeAll} maxWidth="md" fullWidth PaperProps={{ className: "jp-dialog-paper" }}>
        <div className="jp-dialog-header create">
          <span className="jp-dialog-title">Post new job</span>
          <IconButton className="jp-dialog-close" onClick={closeAll} size="small"><Close sx={{ fontSize: 18 }} /></IconButton>
        </div>
        <FormFields />
        <div className="jp-dialog-footer">
          <button className="jp-btn-cancel" onClick={closeAll}>Cancel</button>
          <button className="jp-btn-action primary" onClick={handleCreate}>Post job</button>
        </div>
      </Dialog>

      {/* ══════════ EDIT DIALOG ══════════ */}
      <Dialog open={openEdit} onClose={closeAll} maxWidth="md" fullWidth PaperProps={{ className: "jp-dialog-paper" }}>
        <div className="jp-dialog-header edit">
          <span className="jp-dialog-title">Edit job posting</span>
          <IconButton className="jp-dialog-close" onClick={closeAll} size="small"><Close sx={{ fontSize: 18 }} /></IconButton>
        </div>
        <FormFields />
        <div className="jp-dialog-footer">
          <button className="jp-btn-cancel" onClick={closeAll}>Cancel</button>
          <button className="jp-btn-action blue" onClick={handleEdit}>Save changes</button>
        </div>
      </Dialog>

      {/* ══════════ VIEW DIALOG ══════════ */}
      <Dialog open={openView} onClose={closeAll} maxWidth="sm" fullWidth PaperProps={{ className: "jp-dialog-paper" }}>
        <div className="jp-dialog-header view">
          <span className="jp-dialog-title">Job details</span>
          <IconButton className="jp-dialog-close" onClick={closeAll} size="small"><Close sx={{ fontSize: 18 }} /></IconButton>
        </div>
        {selected && (() => {
          const fg = deptColor(selected.department);
          return (
            <div style={{ padding: "22px" }}>
              <div className="jp-view-hero">
                <div className="jp-view-avatar" style={{ background: fg }}>{initials(selected.jobTitle)}</div>
                <div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>{selected.jobTitle}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--ink-3)", marginTop: "4px", fontWeight: 500 }}>{selected.id} · Posted {selected.postedDate}</div>
                  <div style={{ marginTop: "8px" }}><StatusBadge status={selected.status} /></div>
                </div>
              </div>
              <div className="jp-detail-grid">
                {[
                  { Icon: BusinessOutlined,    cls: ["#eef2ff","#6366f1"], label: "Department",   val: selected.department  },
                  { Icon: AccountTreeOutlined, cls: ["#dbeafe","#2563eb"], label: "Branch",       val: selected.branch      },
                  { Icon: LocationOnOutlined,  cls: ["#fef3c7","#d97706"], label: "Location",     val: selected.location    },
                  { Icon: WorkOutline,         cls: ["#d1fae5","#10b981"], label: "Experience",   val: selected.experience  },
                  { Icon: AttachMoneyOutlined, cls: ["#eef2ff","#6366f1"], label: "Salary",       val: selected.salary      },
                  { Icon: PeopleOutlined,      cls: ["#d1fae5","#10b981"], label: "Applications", val: selected.applications},
                ].map(({ Icon, cls, label, val }) => (
                  <div className="jp-detail-item" key={label}>
                    <div className="jp-detail-icon" style={{ background: cls[0], color: cls[1] }}><Icon sx={{ fontSize: 17 }} /></div>
                    <div>
                      <div className="jp-detail-label">{label}</div>
                      <div className="jp-detail-value">{val}</div>
                    </div>
                  </div>
                ))}
              </div>
              {selected.description && (
                <div style={{ marginTop: "14px", padding: "12px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-md)" }}>
                  <div className="jp-field-label" style={{ marginBottom: "6px" }}>Description</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--ink-2)", lineHeight: 1.6 }}>{selected.description}</p>
                </div>
              )}
            </div>
          );
        })()}
        <div className="jp-dialog-footer">
          <button className="jp-btn-action primary" onClick={closeAll}>Close</button>
        </div>
      </Dialog>

      {/* ══════════ DELETE DIALOG ══════════ */}
      <Dialog open={openDelete} onClose={closeAll} maxWidth="xs" fullWidth PaperProps={{ className: "jp-dialog-paper" }}>
        <div className="jp-dialog-header danger">
          <span className="jp-dialog-title">Delete posting</span>
          <IconButton className="jp-dialog-close" onClick={closeAll} size="small"><Close sx={{ fontSize: 18 }} /></IconButton>
        </div>
        <div className="jp-delete-body">
          <div className="jp-delete-icon">
            <DeleteOutlined sx={{ fontSize: 28, color: "#ef4444" }} />
          </div>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "10px" }}>
            Delete this posting?
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--ink-2)", lineHeight: 1.6 }}>
            {`You're about to permanently delete`}{" "}
            <strong style={{ color: "var(--ink)" }}>{selected?.jobTitle}</strong>.
            This action cannot be undone.
          </div>
        </div>
        <div className="jp-dialog-footer" style={{ paddingTop: "18px" }}>
          <button className="jp-btn-cancel" onClick={closeAll}>Cancel</button>
          <button className="jp-btn-action danger" onClick={handleDelete}>Delete</button>
        </div>
      </Dialog>
    </>
  );
};

export default JobPostingPage;
