// "use client";
// import React from "react";
// import { Box, Typography, Grid } from "@mui/material";
// import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

// const ViewTodo = ({ selectedTask, getStatusColor, getPriorityColor }) => {
//   if (!selectedTask) return <p>No Data</p>;

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//       <Grid container spacing={2}>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Task ID:</Typography>
//           <Typography>{selectedTask.id}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Status:</Typography>
//           <Box className={`hrms-badge ${getStatusColor(selectedTask.status)}`}>
//             {selectedTask.status}
//           </Box>
//         </Grid>
//         <Grid size={{xs:12}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Task Title:</Typography>
//           <Typography>{selectedTask.taskTitle}</Typography>
//         </Grid>
//         <Grid size={{xs:12}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Description:</Typography>
//           <Typography>{selectedTask.description}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Category:</Typography>
//           <Typography>{selectedTask.category}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Priority:</Typography>
//           <Box className={`hrms-badge ${getPriorityColor(selectedTask.priority)}`}>
//             {selectedTask.priority}
//           </Box>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Due Date:</Typography>
//           <Typography>{selectedTask.dueDate}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Created Date:</Typography>
//           <Typography>{selectedTask.createdDate}</Typography>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Completed:</Typography>
//           <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//             {selectedTask.completed ? (
//               <CheckCircle sx={{ color: "#10b981", fontSize: "20px" }} />
//             ) : (
//               <RadioButtonUnchecked sx={{ color: "#6b7280", fontSize: "20px" }} />
//             )}
//             <Typography variant="body2">
//               {selectedTask.completed ? "Completed" : "Pending"}
//             </Typography>
//           </Box>
//         </Grid>
//         {selectedTask.notes && (
//           <Grid size={{xs:12}}>
//             <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Notes:</Typography>
//             <Typography>{selectedTask.notes}</Typography>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default ViewTodo;







"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Chip, Divider } from "@mui/material";
import {
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
  CalendarTodayRounded,
  FlagRounded,
  CategoryRounded,
  TagRounded,
  NotesRounded,
  AccessTimeRounded,
} from "@mui/icons-material";

/* ─── Keyframes injected once ─── */
const injectStyles = () => {
  if (document.getElementById("viewtodo-styles")) return;
  const s = document.createElement("style");
  s.id = "viewtodo-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    @keyframes vt-fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes vt-scaleIn {
      from { opacity: 0; transform: scale(0.88); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes vt-slideRight {
      from { opacity: 0; transform: translateX(-14px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes vt-shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes vt-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
      50%       { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
    }
    @keyframes vt-checkBounce {
      0%   { transform: scale(0) rotate(-20deg); }
      60%  { transform: scale(1.25) rotate(5deg); }
      100% { transform: scale(1) rotate(0deg); }
    }

    .vt-wrap { font-family: 'DM Sans', sans-serif; }

    .vt-card {
      background: linear-gradient(145deg, #1e1b4b 0%, #0f172a 60%, #1e293b 100%);
      border: 1px solid rgba(99,102,241,0.22);
      border-radius: 20px;
      padding: 28px 28px 24px;
      position: relative;
      overflow: hidden;
      animation: vt-scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .vt-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 20% 10%, rgba(99,102,241,0.15) 0%, transparent 60%);
      pointer-events: none;
    }

    .vt-header-accent {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, #6366f1, #a78bfa, #38bdf8, #6366f1);
      background-size: 300% 100%;
      animation: vt-shimmer 3s linear infinite;
    }

    .vt-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.45rem;
      font-weight: 700;
      color: #f1f5f9;
      line-height: 1.3;
      animation: vt-slideRight 0.4s ease both 0.1s;
    }

    .vt-field {
      animation: vt-fadeUp 0.4s ease both;
    }
    .vt-field-label {
      font-family: 'Syne', sans-serif;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .vt-field-label svg { font-size: 13px !important; color: #6366f1; }

    .vt-field-value {
      font-size: 0.92rem;
      color: #e2e8f0;
      font-weight: 400;
      line-height: 1.55;
    }

    .vt-id-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(99,102,241,0.15);
      border: 1px solid rgba(99,102,241,0.3);
      border-radius: 8px;
      padding: 4px 12px;
      font-family: 'Syne', sans-serif;
      font-size: 0.82rem;
      font-weight: 600;
      color: #a5b4fc;
      animation: vt-pulse 2.5s ease infinite;
    }

    .vt-badge {
      display: inline-block;
      padding: 3px 12px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 600;
      font-family: 'Syne', sans-serif;
      letter-spacing: 0.04em;
    }
    .vt-badge-pending   { background: rgba(251,191,36,0.18);  color: #fbbf24; border: 1px solid rgba(251,191,36,0.35); }
    .vt-badge-progress  { background: rgba(99,102,241,0.2);   color: #818cf8; border: 1px solid rgba(99,102,241,0.4); }
    .vt-badge-done      { background: rgba(16,185,129,0.18);  color: #34d399; border: 1px solid rgba(16,185,129,0.35); }
    .vt-badge-cancelled { background: rgba(239,68,68,0.15);   color: #f87171; border: 1px solid rgba(239,68,68,0.3); }

    .vt-badge-high   { background: rgba(239,68,68,0.15);  color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
    .vt-badge-medium { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
    .vt-badge-low    { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }

    .vt-completed-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 14px;
      border-radius: 30px;
      font-size: 0.82rem;
      font-weight: 500;
      font-family: 'Syne', sans-serif;
    }
    .vt-completed-pill.done    { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
    .vt-completed-pill.pending { background: rgba(148,163,184,0.12); color: #94a3b8; border: 1px solid rgba(148,163,184,0.25); }
    .vt-completed-pill svg { animation: vt-checkBounce 0.5s ease both 0.6s; }

    .vt-divider { border-color: rgba(99,102,241,0.15) !important; margin: 4px 0 !important; }

    .vt-notes-box {
      background: rgba(99,102,241,0.07);
      border-left: 3px solid #6366f1;
      border-radius: 0 10px 10px 0;
      padding: 10px 14px;
      font-size: 0.88rem;
      color: #cbd5e1;
      line-height: 1.6;
    }

    .vt-no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 48px 0;
      color: #475569;
      font-family: 'Syne', sans-serif;
      font-size: 0.95rem;
      animation: vt-fadeUp 0.4s ease both;
    }
    .vt-no-data-icon { font-size: 2.5rem; opacity: 0.35; }
  `;
  document.head.appendChild(s);
};

/* ─── Helpers ─── */
const statusBadgeClass = (s = "") => {
  const map = { pending: "vt-badge-pending", "in progress": "vt-badge-progress", completed: "vt-badge-done", cancelled: "vt-badge-cancelled" };
  return map[s.toLowerCase()] ?? "vt-badge-pending";
};
const priorityBadgeClass = (p = "") => {
  const map = { high: "vt-badge-high", medium: "vt-badge-medium", low: "vt-badge-low" };
  return map[p.toLowerCase()] ?? "vt-badge-medium";
};

/* ─── Field Component ─── */
const Field = ({ icon, label, children, delay = 0, full = false }) => (
  <Grid size={{ xs: 12, sm: full ? 12 : 6 }}>
    <Box className="vt-field" style={{ animationDelay: `${delay}s` }}>
      <div className="vt-field-label">{icon}{label}</div>
      {children}
    </Box>
  </Grid>
);

/* ─── Main Component ─── */
const ViewTodo = ({ selectedTask }) => {
  useEffect(() => { injectStyles(); }, []);

  if (!selectedTask)
    return (
      <Box className="vt-wrap">
        <Box className="vt-no-data">
          <span className="vt-no-data-icon">📋</span>
          <span>Select a task to preview details</span>
        </Box>
      </Box>
    );

  return (
    <Box className="vt-wrap">
      <Box className="vt-card">
        <div className="vt-header-accent" />

        {/* Title */}
        <Box mb={2.5} mt={0.5}>
          <Typography className="vt-title">{selectedTask.taskTitle}</Typography>
        </Box>

        <Divider className="vt-divider" />
        <Box mt={2.5}>
          <Grid container spacing={2.5}>

            <Field icon={<TagRounded />} label="Task ID" delay={0.05}>
              <span className="vt-id-chip">#{selectedTask.id}</span>
            </Field>

            <Field icon={<FlagRounded />} label="Status" delay={0.1}>
              <span className={`vt-badge ${statusBadgeClass(selectedTask.status)}`}>
                {selectedTask.status}
              </span>
            </Field>

            <Field icon={<CategoryRounded />} label="Category" delay={0.15}>
              <span className="vt-field-value">{selectedTask.category}</span>
            </Field>

            <Field icon={<FlagRounded />} label="Priority" delay={0.2}>
              <span className={`vt-badge ${priorityBadgeClass(selectedTask.priority)}`}>
                {selectedTask.priority}
              </span>
            </Field>

            <Field icon={<CalendarTodayRounded />} label="Due Date" delay={0.25}>
              <span className="vt-field-value">{selectedTask.dueDate}</span>
            </Field>

            <Field icon={<AccessTimeRounded />} label="Created Date" delay={0.3}>
              <span className="vt-field-value">{selectedTask.createdDate}</span>
            </Field>

            <Field icon={<CheckCircleRounded />} label="Completion" delay={0.35}>
              <div className={`vt-completed-pill ${selectedTask.completed ? "done" : "pending"}`}>
                {selectedTask.completed
                  ? <CheckCircleRounded style={{ fontSize: 16 }} />
                  : <RadioButtonUncheckedRounded style={{ fontSize: 16 }} />}
                {selectedTask.completed ? "Completed" : "Pending"}
              </div>
            </Field>

            <Field icon={<NotesRounded />} label="Description" delay={0.4} full>
              <span className="vt-field-value">{selectedTask.description}</span>
            </Field>

            {selectedTask.notes && (
              <Field icon={<NotesRounded />} label="Notes" delay={0.45} full>
                <div className="vt-notes-box">{selectedTask.notes}</div>
              </Field>
            )}

          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewTodo;
