// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
// } from "@mui/material";

// const ViewTicket = ({ selectedTicket, getStatusColor, getPriorityColor }) => {
//   if (!selectedTicket) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
//         <Typography>No ticket selected</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
//       <Grid container spacing={2}>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Ticket Code:</Typography>
//           <Typography variant="subtitle2" sx={{ color: "#3b82f6", fontWeight: 600 }}>
//             {selectedTicket.code || "N/A"}
//           </Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Status:</Typography>
//           <Box className={`hrms-badge ${getStatusColor ? getStatusColor(selectedTicket.status) : 'hrms-badge-success'}`}>
//             {selectedTicket.status || "N/A"}
//           </Box>
//         </Grid>
//         <Grid size={{xs:12}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Title:</Typography>
//           <Typography>{selectedTicket.title || "N/A"}</Typography>
//         </Grid>
//         <Grid size={{xs:12}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Description:</Typography>
//           <Typography>{selectedTicket.description || "N/A"}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Employee:</Typography>
//           <Typography>{selectedTicket.employee || "N/A"}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Category:</Typography>
//           <Typography>{selectedTicket.category || "N/A"}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Priority:</Typography>
//           <Box className={`hrms-badge ${getPriorityColor ? getPriorityColor(selectedTicket.priority) : 'hrms-badge-warning'}`}>
//             {selectedTicket.priority || "N/A"}
//           </Box>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Assigned To:</Typography>
//           <Typography>{selectedTicket.assignedTo || "N/A"}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Due Date:</Typography>
//           <Typography>{selectedTicket.endDate || "N/A"}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Created Date:</Typography>
//           <Typography>{selectedTicket.createdDate || "N/A"}</Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ViewTicket;







import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";

/* ─────────────────────────── keyframe injection ─────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("vt-styles")) return;
  const style = document.createElement("style");
  style.id = "vt-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    @keyframes vt-fade-up {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes vt-slide-in {
      from { opacity: 0; transform: translateX(-14px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes vt-pop {
      0%   { transform: scale(0.88); opacity: 0; }
      70%  { transform: scale(1.04); }
      100% { transform: scale(1);    opacity: 1; }
    }
    @keyframes vt-shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }
    @keyframes vt-pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(99,102,241,.35); }
      70%  { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
      100% { box-shadow: 0 0 0 0  rgba(99,102,241,0);  }
    }
    @keyframes vt-badge-in {
      from { opacity: 0; transform: scale(0.75) rotate(-4deg); }
      to   { opacity: 1; transform: scale(1)    rotate(0deg);  }
    }

    .vt-card {
      font-family: 'DM Sans', sans-serif;
      background: #ffffff;
      border-radius: 20px;
      padding: 32px;
      position: relative;
      overflow: hidden;
      box-shadow:
        0 1px 3px rgba(0,0,0,.06),
        0 8px 32px rgba(99,102,241,.10),
        0 0 0 1px rgba(99,102,241,.08);
      animation: vt-fade-up .5s cubic-bezier(.22,1,.36,1) both;
    }

    /* decorative top strip */
    .vt-card::before {
      content: '';
      position: absolute;
      inset: 0 0 auto 0;
      height: 4px;
      background: linear-gradient(90deg, #6366f1 0%, #a78bfa 50%, #38bdf8 100%);
      border-radius: 20px 20px 0 0;
    }

    /* faint mesh in top-right corner */
    .vt-card::after {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 200px; height: 200px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99,102,241,.08) 0%, transparent 70%);
      pointer-events: none;
    }

    .vt-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 28px;
      animation: vt-slide-in .45s .1s cubic-bezier(.22,1,.36,1) both;
    }

    .vt-icon-wrap {
      width: 46px; height: 46px;
      border-radius: 12px;
      background: linear-gradient(135deg, #6366f1, #818cf8);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 14px rgba(99,102,241,.35);
      animation: vt-pulse-ring 2.4s ease-out 1s infinite;
      flex-shrink: 0;
    }

    .vt-icon-wrap svg { color: #fff; }

    .vt-title-group { display: flex; flex-direction: column; }
    .vt-main-title  {
      font-family: 'Sora', sans-serif;
      font-size: 1.2rem; font-weight: 700;
      color: #1e1b4b; line-height: 1.2;
    }
    .vt-subtitle {
      font-size: .78rem; color: #94a3b8; font-weight: 400; margin-top: 2px;
    }

    /* ── divider ── */
    .vt-divider {
      height: 1px;
      background: linear-gradient(90deg, #e0e7ff 0%, transparent 100%);
      margin: 0 0 24px;
    }

    /* ── field rows ── */
    .vt-field {
      animation: vt-fade-up .45s cubic-bezier(.22,1,.36,1) both;
    }
    .vt-label {
      font-family: 'Sora', sans-serif;
      font-size: .68rem;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 4px;
      display: flex; align-items: center; gap: 5px;
    }
    .vt-label-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #6366f1; flex-shrink: 0;
    }
    .vt-value {
      font-size: .9rem; color: #334155; font-weight: 400; line-height: 1.5;
    }
    .vt-value-code {
      font-family: 'Sora', sans-serif;
      font-size: .95rem; font-weight: 700;
      color: #6366f1;
      display: flex; align-items: center; gap: 6px;
    }
    .vt-value-code span {
      display: inline-block;
      background: linear-gradient(90deg, #eef2ff, #e0e7ff);
      border: 1px solid #c7d2fe;
      border-radius: 6px;
      padding: 3px 10px;
    }

    /* ── badges ── */
    .vt-badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: 999px;
      font-size: .75rem; font-weight: 600;
      letter-spacing: .04em;
      animation: vt-badge-in .4s cubic-bezier(.34,1.56,.64,1) both;
    }
    .vt-badge::before {
      content: ''; width: 6px; height: 6px;
      border-radius: 50%; background: currentColor; opacity: .7;
    }

    /* status colours */
    .vt-status-open      { background:#eff6ff; color:#2563eb; }
    .vt-status-resolved  { background:#f0fdf4; color:#16a34a; }
    .vt-status-closed    { background:#f1f5f9; color:#475569; }
    .vt-status-progress  { background:#fefce8; color:#ca8a04; }
    .vt-status-default   { background:#faf5ff; color:#7c3aed; }

    /* priority colours */
    .vt-priority-low      { background:#f0fdf4; color:#16a34a; }
    .vt-priority-medium   { background:#fffbeb; color:#d97706; }
    .vt-priority-high     { background:#fff7ed; color:#ea580c; }
    .vt-priority-critical { background:#fef2f2; color:#dc2626; }
    .vt-priority-default  { background:#f0f9ff; color:#0284c7; }

    /* ── section group box ── */
    .vt-section {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px 20px;
      animation: vt-pop .4s cubic-bezier(.34,1.56,.64,1) both;
    }

    /* hover lift on fields */
    .vt-field-hover {
      padding: 10px 12px;
      border-radius: 10px;
      transition: background .2s, box-shadow .2s, transform .2s;
    }
    .vt-field-hover:hover {
      background: #f1f5f9;
      box-shadow: 0 2px 8px rgba(99,102,241,.09);
      transform: translateY(-1px);
    }

    /* ── empty state ── */
    .vt-empty {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 12px; padding: 40px 20px;
      animation: vt-fade-up .5s both;
    }
    .vt-empty-icon {
      width: 64px; height: 64px; border-radius: 18px;
      background: linear-gradient(135deg, #e0e7ff, #f0f9ff);
      display: flex; align-items: center; justify-content: center;
    }
    .vt-empty-text {
      font-family: 'Sora', sans-serif;
      font-size: 1rem; font-weight: 600; color: #94a3b8;
    }
  `;
  document.head.appendChild(style);
};

/* ─────────────────────────── helpers ─────────────────────────────────────── */
const statusClass = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("open"))     return "vt-status-open";
  if (s.includes("resolv"))   return "vt-status-resolved";
  if (s.includes("close"))    return "vt-status-closed";
  if (s.includes("progress")) return "vt-status-progress";
  return "vt-status-default";
};

const priorityClass = (priority = "") => {
  const p = priority.toLowerCase();
  if (p === "low")      return "vt-priority-low";
  if (p === "medium")   return "vt-priority-medium";
  if (p === "high")     return "vt-priority-high";
  if (p === "critical") return "vt-priority-critical";
  return "vt-priority-default";
};

/* tiny SVG icons */
const Icon = ({ name }) => {
  const icons = {
    ticket: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1.09a2 2 0 0 0 0 3.82V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.09a2 2 0 0 0 0-3.82V9z"/>
      </svg>
    ),
    empty: (
      <svg width="28" height="28" fill="none" stroke="#a5b4fc" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4m0 4h.01"/>
      </svg>
    ),
    user: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    calendar: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

/* ─────────────────────────── Field atom ─────────────────────────────────── */
const Field = ({ label, children, delay = 0, icon }) => (
  <div className="vt-field vt-field-hover" style={{ animationDelay: `${delay}ms` }}>
    <div className="vt-label">
      <span className="vt-label-dot" />
      {icon && <span style={{ opacity: .7 }}>{icon}</span>}
      {label}
    </div>
    {children}
  </div>
);

/* ─────────────────────────── main component ─────────────────────────────── */
const ViewTicket = ({ selectedTicket, getStatusColor, getPriorityColor }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { injectStyles(); setMounted(true); }, []);
  if (!mounted) return null;

  if (!selectedTicket) {
    return (
      <div className="vt-card">
        <div className="vt-empty">
          <div className="vt-empty-icon"><Icon name="empty" /></div>
          <p className="vt-empty-text">No ticket selected</p>
          <p style={{ fontSize: ".8rem", color: "#cbd5e1" }}>
            Choose a ticket from the list to view details.
          </p>
        </div>
      </div>
    );
  }

  const sColor = getStatusColor
    ? getStatusColor(selectedTicket.status)
    : statusClass(selectedTicket.status);
  const pColor = getPriorityColor
    ? getPriorityColor(selectedTicket.priority)
    : priorityClass(selectedTicket.priority);

  return (
    <div className="vt-card">
      {/* ── header ── */}
      <div className="vt-header">
        <div className="vt-icon-wrap"><Icon name="ticket" /></div>
        <div className="vt-title-group">
          <span className="vt-main-title">
            {selectedTicket.title || "Ticket Details"}
          </span>
          <span className="vt-subtitle">Support Ticket Overview</span>
        </div>
      </div>
      <div className="vt-divider" />

      {/* ── top row: code + status ── */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Ticket Code" delay={80}>
            <div className="vt-value-code">
              <span>{selectedTicket.code || "N/A"}</span>
            </div>
          </Field>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Status" delay={120}>
            <span className={`vt-badge ${sColor}`}>
              {selectedTicket.status || "N/A"}
            </span>
          </Field>
        </Grid>
      </Grid>

      {/* ── description block ── */}
      <div className="vt-section" style={{ marginBottom: 20, animationDelay: "160ms" }}>
        <Field label="Description" delay={0}>
          <p className="vt-value" style={{ margin: 0 }}>
            {selectedTicket.description || "No description provided."}
          </p>
        </Field>
      </div>

      {/* ── meta grid ── */}
      <Grid container spacing={1.5}>
        {[
          { label: "Employee",     value: selectedTicket.employee,    delay: 200, icon: <Icon name="user" /> },
          { label: "Category",     value: selectedTicket.category,    delay: 230 },
          { label: "Assigned To",  value: selectedTicket.assignedTo,  delay: 260, icon: <Icon name="user" /> },
          { label: "Created Date", value: selectedTicket.createdDate, delay: 290, icon: <Icon name="calendar" /> },
          { label: "Due Date",     value: selectedTicket.endDate,     delay: 320, icon: <Icon name="calendar" /> },
        ].map(({ label, value, delay, icon }) => (
          <Grid size={{ xs: 12, sm: 6 }} key={label}>
            <Field label={label} delay={delay} icon={icon}>
              <span className="vt-value">{value || "N/A"}</span>
            </Field>
          </Grid>
        ))}

        {/* priority gets its own badge */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Priority" delay={350}>
            <span className={`vt-badge ${pColor}`} style={{ animationDelay: "380ms" }}>
              {selectedTicket.priority || "N/A"}
            </span>
          </Field>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewTicket;
