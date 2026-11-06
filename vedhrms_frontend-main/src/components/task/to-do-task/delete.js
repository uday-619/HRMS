// "use client";
// import React from "react";
// import { Box, Typography } from "@mui/material";

// const DeleteTodo = ({ selectedTask, handleDelete, handleClose }) => {
//   return (
//     <Box sx={{ padding: "1rem 0" }}>
//       <Typography variant="body1" sx={{ mb: 2, color: "#374151", fontSize: "0.95rem" }}>
//         Are you sure you want to delete the task &quot;{selectedTask?.taskTitle}&quot;?
//       </Typography>
//       <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
//         <button className="hrms-btn hrms-btn-secondary" onClick={handleClose}>
//           Cancel
//         </button>
//         <button 
//           className="hrms-btn hrms-btn-danger" 
//           onClick={handleDelete}
//           style={{ backgroundColor: '#dc2626', color: 'white', border: '1px solid #dc2626' }}
//         >
//           Delete
//         </button>
//       </Box>
//     </Box>
//   );
// };

// export default DeleteTodo;







"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import {
  DeleteForeverRounded, WarningAmberRounded,
  CheckCircleOutlineRounded, TaskAltRounded,
} from "@mui/icons-material";

/* ─── Styles ─── */
const injectStyles = () => {
  if (document.getElementById("deletetodo-styles")) return;
  const s = document.createElement("style");
  s.id = "deletetodo-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    @keyframes dt-fadeUp    { from{opacity:0;transform:translateY(14px);}  to{opacity:1;transform:translateY(0);}  }
    @keyframes dt-scaleIn   { from{opacity:0;transform:scale(0.9);}        to{opacity:1;transform:scale(1);}       }
    @keyframes dt-shake     { 0%,100%{transform:translateX(0);} 20%,60%{transform:translateX(-4px);} 40%,80%{transform:translateX(4px);} }
    @keyframes dt-shimmer   { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
    @keyframes dt-pulse-red { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4);} 50%{box-shadow:0 0 0 10px rgba(239,68,68,0);} }
    @keyframes dt-deleted   { 0%{transform:scale(1);} 50%{transform:scale(1.1);} 100%{transform:scale(1);} }
    @keyframes dt-fadeOut   { from{opacity:1;transform:scale(1);} to{opacity:0;transform:scale(0.8);} }

    .dt-wrap { font-family:'DM Sans',sans-serif; }

    .dt-card {
      background:linear-gradient(145deg,#0f172a 0%,#1a0a0a 60%,#0f172a 100%);
      border:1px solid rgba(239,68,68,0.22);
      border-radius:20px; padding:32px 28px 28px;
      position:relative; overflow:hidden;
      animation:dt-scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .dt-card::before {
      content:''; position:absolute; inset:0;
      background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,0.1) 0%,transparent 55%);
      pointer-events:none;
    }
    .dt-accent {
      position:absolute; top:0; left:0; right:0; height:3px;
      background:linear-gradient(90deg,#dc2626,#f87171,#fca5a5,#dc2626);
      background-size:300% 100%;
      animation:dt-shimmer 3s linear infinite;
    }

    /* Warning icon */
    .dt-icon-wrap {
      width:72px; height:72px; border-radius:50%; margin:0 auto 20px;
      background:rgba(239,68,68,0.12);
      border:2px solid rgba(239,68,68,0.3);
      display:flex; align-items:center; justify-content:center;
      animation:dt-pulse-red 2.5s ease infinite, dt-fadeUp 0.4s ease both 0.05s;
    }
    .dt-icon-wrap svg { color:#f87171; font-size:2rem !important; }
    .dt-icon-wrap.shake { animation:dt-shake 0.4s ease !important; }

    .dt-title {
      font-family:'Syne',sans-serif; font-size:1.25rem; font-weight:800;
      color:#f1f5f9; text-align:center; margin-bottom:8px;
      animation:dt-fadeUp 0.38s ease both 0.1s;
    }
    .dt-subtitle {
      color:#94a3b8; font-size:0.88rem; text-align:center; line-height:1.55;
      animation:dt-fadeUp 0.38s ease both 0.15s;
    }

    /* Task preview card */
    .dt-preview {
      background:rgba(239,68,68,0.07);
      border:1px solid rgba(239,68,68,0.18);
      border-radius:12px; padding:14px 16px;
      margin:20px 0 24px;
      animation:dt-fadeUp 0.38s ease both 0.2s;
    }
    .dt-preview-label {
      font-family:'Syne',sans-serif; font-size:0.63rem; font-weight:600;
      letter-spacing:0.1em; text-transform:uppercase; color:#94a3b8; margin-bottom:6px;
    }
    .dt-preview-title {
      font-size:0.95rem; font-weight:500; color:#e2e8f0; margin-bottom:4px;
    }
    .dt-preview-meta {
      display:flex; gap:10px; flex-wrap:wrap; margin-top:8px;
    }
    .dt-meta-chip {
      font-size:0.72rem; color:#94a3b8;
      background:rgba(255,255,255,0.05);
      border:1px solid rgba(255,255,255,0.08);
      border-radius:20px; padding:2px 10px;
      font-family:'Syne',sans-serif;
    }

    /* Confirm input */
    .dt-confirm-wrap { margin-bottom:20px; animation:dt-fadeUp 0.38s ease both 0.25s; }
    .dt-confirm-label {
      font-family:'Syne',sans-serif; font-size:0.68rem; font-weight:600;
      letter-spacing:0.08em; text-transform:uppercase; color:#94a3b8; margin-bottom:6px;
    }
    .dt-confirm-input {
      width:100%; background:rgba(15,23,42,0.8) !important;
      border:1px solid rgba(239,68,68,0.25); border-radius:10px;
      padding:9px 14px; color:#e2e8f0;
      font-family:'DM Sans',sans-serif; font-size:0.88rem;
      outline:none; box-sizing:border-box;
      transition:border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .dt-confirm-input:focus {
      border-color:rgba(239,68,68,0.55);
      box-shadow:0 0 0 3px rgba(239,68,68,0.15);
    }
    .dt-confirm-input::placeholder { color:#475569; }
    .dt-confirm-hint { font-size:0.76rem; color:#64748b; margin-top:5px; }
    .dt-confirm-hint span { color:#f87171; font-family:'Syne',sans-serif; font-weight:600; }

    .dt-btn-row {
      display:flex; gap:12px;
      animation:dt-fadeUp 0.38s ease both 0.3s;
    }

    .dt-btn-cancel {
      flex:1;
      font-family:'Syne',sans-serif !important; font-size:0.82rem !important; font-weight:600 !important;
      text-transform:none !important; letter-spacing:0.04em !important;
      border-radius:10px !important; padding:10px !important;
      border:1px solid rgba(239,68,68,0.25) !important; color:#94a3b8 !important;
      background:transparent !important; transition:all 0.2s ease !important;
    }
    .dt-btn-cancel:hover { background:rgba(239,68,68,0.06) !important; color:#fca5a5 !important; }

    .dt-btn-delete {
      flex:1;
      font-family:'Syne',sans-serif !important; font-size:0.82rem !important; font-weight:700 !important;
      text-transform:none !important; letter-spacing:0.05em !important;
      border-radius:10px !important; padding:10px !important;
      background:linear-gradient(135deg,#dc2626,#ef4444) !important;
      color:#fff !important; border:none !important;
      box-shadow:0 4px 18px rgba(220,38,38,0.45) !important;
      transition:all 0.25s ease !important;
    }
    .dt-btn-delete:hover:not(:disabled) { box-shadow:0 6px 24px rgba(220,38,38,0.6) !important; transform:translateY(-1px) !important; }
    .dt-btn-delete:disabled { opacity:0.55 !important; transform:none !important; }

    /* Deleted state */
    .dt-deleted-msg {
      display:flex; flex-direction:column; align-items:center; gap:14px;
      padding:24px 0; text-align:center;
      animation:dt-fadeUp 0.4s ease both;
    }
    .dt-deleted-icon {
      width:60px; height:60px; border-radius:50%;
      background:rgba(16,185,129,0.15); border:2px solid rgba(16,185,129,0.35);
      display:flex; align-items:center; justify-content:center;
    }
    .dt-deleted-icon svg { color:#34d399; font-size:1.7rem !important; animation:dt-deleted 0.5s ease both; }
    .dt-deleted-title { font-family:'Syne',sans-serif; font-weight:700; color:#f1f5f9; font-size:1.05rem; }
    .dt-deleted-sub   { color:#94a3b8; font-size:0.85rem; }
  `;
  document.head.appendChild(s);
};

const CONFIRM_PHRASE = "DELETE";

const DeleteTodo = ({ selectedTask, onDelete, onCancel }) => {
  useEffect(() => { injectStyles(); }, []);
  const [confirmText, setConfirmText] = useState("");
  const [loading,     setLoading]     = useState(false);
  const [deleted,     setDeleted]     = useState(false);
  const [shakeIcon,   setShakeIcon]   = useState(false);

  const confirmed = confirmText.trim().toUpperCase() === CONFIRM_PHRASE;

  const handleDelete = async () => {
    if (!confirmed) { setShakeIcon(true); setTimeout(() => setShakeIcon(false), 400); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    onDelete?.(selectedTask);
    setLoading(false);
    setDeleted(true);
  };

  if (!selectedTask) return <Box sx={{color:"#475569",p:3,textAlign:"center",fontFamily:"'DM Sans',sans-serif"}}>No task selected.</Box>;

  if (deleted)
    return (
      <Box className="dt-wrap">
        <Box className="dt-card" style={{borderColor:"rgba(16,185,129,0.2)"}}>
          <div className="dt-accent" style={{background:"linear-gradient(90deg,#059669,#34d399,#059669)"}} />
          <Box className="dt-deleted-msg">
            <div className="dt-deleted-icon"><CheckCircleOutlineRounded /></div>
            <Typography className="dt-deleted-title">Task Deleted</Typography>
            <Typography className="dt-deleted-sub">The task has been permanently removed.</Typography>
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box className="dt-wrap">
      <Box className="dt-card">
        <div className="dt-accent" />

        {/* Icon */}
        <div className={`dt-icon-wrap ${shakeIcon ? "shake" : ""}`}>
          <WarningAmberRounded />
        </div>

        <Typography className="dt-title">Delete Task?</Typography>
        <Typography className="dt-subtitle">
          This action is permanent and cannot be undone.<br />
          All data associated with this task will be lost.
        </Typography>

        {/* Task preview */}
        <Box className="dt-preview">
          <div className="dt-preview-label">Task to be deleted</div>
          <div className="dt-preview-title">{selectedTask.taskTitle}</div>
          {selectedTask.description && (
            <Typography sx={{fontSize:"0.8rem",color:"#64748b",mt:"2px"}} noWrap>
              {selectedTask.description}
            </Typography>
          )}
          <div className="dt-preview-meta">
            {selectedTask.category && <span className="dt-meta-chip">{selectedTask.category}</span>}
            {selectedTask.priority  && <span className="dt-meta-chip">{selectedTask.priority} Priority</span>}
            {selectedTask.status    && <span className="dt-meta-chip">{selectedTask.status}</span>}
            {selectedTask.dueDate   && <span className="dt-meta-chip">Due: {selectedTask.dueDate}</span>}
          </div>
        </Box>

        {/* Confirm input */}
        <Box className="dt-confirm-wrap">
          <div className="dt-confirm-label">Confirm deletion</div>
          <input
            className="dt-confirm-input"
            placeholder={`Type "${CONFIRM_PHRASE}" to confirm`}
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
          />
          <div className="dt-confirm-hint">
            Type <span>{CONFIRM_PHRASE}</span> to enable the delete button
          </div>
        </Box>

        {/* Buttons */}
        <Box className="dt-btn-row">
          <Button className="dt-btn-cancel" onClick={onCancel} disabled={loading}>Keep Task</Button>
          <Button className="dt-btn-delete" onClick={handleDelete} disabled={loading || !confirmed}>
            {loading ? <CircularProgress size={16} sx={{color:"#fff",mr:1}} /> : <DeleteForeverRounded sx={{fontSize:"1rem",mr:0.5}} />}
            {loading ? "Deleting…" : "Delete Forever"}
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default DeleteTodo;
