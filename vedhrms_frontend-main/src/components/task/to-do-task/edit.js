// "use client";
// import React from "react";
// import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Checkbox, Typography } from "@mui/material";

// const EditTodo = ({ formData, handleInputChange, handleUpdate, handleClose }) => {
//   const handleSubmit = () => {
//     handleUpdate();
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//       <Grid container spacing={2}>
//         <Grid size={{xs:12}}>
//           <TextField
//             fullWidth
//             label="Task Title"
//             name="taskTitle"
//             value={formData.taskTitle}
//             onChange={handleInputChange}
//             className="hrms-form-input"
//           />
//         </Grid>
//         <Grid size={{xs:12}}>
//           <TextField
//             fullWidth
//             label="Task Description"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             multiline
//             rows={3}
//             className="hrms-form-input"
//           />
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <FormControl fullWidth>
//             <InputLabel>Category</InputLabel>
//             <Select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="Development">Development</MenuItem>
//               <MenuItem value="Documentation">Documentation</MenuItem>
//               <MenuItem value="Meeting">Meeting</MenuItem>
//               <MenuItem value="General">General</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <FormControl fullWidth>
//             <InputLabel>Priority</InputLabel>
//             <Select
//               name="priority"
//               value={formData.priority}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="High">High</MenuItem>
//               <MenuItem value="Medium">Medium</MenuItem>
//               <MenuItem value="Low">Low</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <FormControl fullWidth>
//             <InputLabel>Status</InputLabel>
//             <Select
//               name="status"
//               value={formData.status}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="Pending">Pending</MenuItem>
//               <MenuItem value="In Progress">In Progress</MenuItem>
//               <MenuItem value="Completed">Completed</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid size={{xs:12, sm:6}}>
//           <TextField
//             fullWidth
//             label="Due Date"
//             name="dueDate"
//             type="date"
//             value={formData.dueDate}
//             onChange={handleInputChange}
//             InputLabelProps={{ shrink: true }}
//             className="hrms-form-input"
//           />
//         </Grid>
//         <Grid size={{xs:12}}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//             <Checkbox
//               name="completed"
//               checked={formData.completed}
//               onChange={handleInputChange}
//             />
//             <Typography variant="body2">Mark as completed</Typography>
//           </Box>
//         </Grid>
//         <Grid size={{xs:12}}>
//           <TextField
//             fullWidth
//             label="Additional Notes"
//             name="notes"
//             value={formData.notes}
//             onChange={handleInputChange}
//             multiline
//             rows={3}
//             className="hrms-form-input"
//           />
//         </Grid>
//       </Grid>
//       <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
//         <button className="hrms-btn hrms-btn-secondary" onClick={handleClose}>
//           Cancel
//         </button>
//         <button className="hrms-btn hrms-btn-primary" onClick={handleSubmit}>
//           Update
//         </button>
//       </Box>
//     </Box>
//   );
// };

// export default EditTodo;




"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Grid, TextField, MenuItem,
  Button, FormControlLabel, Checkbox, CircularProgress,
} from "@mui/material";
import {
  EditRounded, CheckCircleOutlineRounded,
  FlagRounded, CategoryRounded, CalendarTodayRounded,
  TitleRounded, DescriptionRounded, NotesRounded,
} from "@mui/icons-material";

/* ─── Styles (same palette, unique accent) ─── */
const injectStyles = () => {
  if (document.getElementById("edittodo-styles")) return;
  const s = document.createElement("style");
  s.id = "edittodo-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    @keyframes et-fadeUp  { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
    @keyframes et-scaleIn { from{opacity:0;transform:scale(0.93);} to{opacity:1;transform:scale(1);} }
    @keyframes et-shimmer { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
    @keyframes et-success { 0%{transform:scale(0) rotate(-30deg);} 60%{transform:scale(1.2) rotate(5deg);} 100%{transform:scale(1);} }
    @keyframes et-changed {
      0%   { box-shadow:0 0 0 0 rgba(251,146,60,0.5); }
      70%  { box-shadow:0 0 0 6px rgba(251,146,60,0); }
      100% { box-shadow:0 0 0 0 rgba(251,146,60,0); }
    }

    .et-wrap { font-family:'DM Sans',sans-serif; }

    .et-card {
      background:linear-gradient(145deg,#0f172a 0%,#1c1917 55%,#0f172a 100%);
      border:1px solid rgba(251,146,60,0.2);
      border-radius:20px;
      padding:28px 28px 24px;
      position:relative; overflow:hidden;
      animation:et-scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .et-card::before {
      content:''; position:absolute; inset:0;
      background:radial-gradient(ellipse at 10% 90%,rgba(251,146,60,0.1) 0%,transparent 55%);
      pointer-events:none;
    }
    .et-accent {
      position:absolute; top:0; left:0; right:0; height:3px;
      background:linear-gradient(90deg,#f97316,#fb923c,#fbbf24,#f97316);
      background-size:300% 100%;
      animation:et-shimmer 3s linear infinite;
    }

    .et-heading { font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:800; color:#f1f5f9; display:flex; align-items:center; gap:10px; }
    .et-heading svg { color:#fb923c; font-size:1.3rem !important; }

    .et-label {
      font-family:'Syne',sans-serif; font-size:0.67rem; font-weight:600;
      letter-spacing:0.1em; text-transform:uppercase;
      color:#94a3b8; margin-bottom:6px;
      display:flex; align-items:center; gap:5px;
    }
    .et-label svg { font-size:13px !important; color:#fb923c; }

    .et-field { animation:et-fadeUp 0.38s ease both; }

    .et-changed-indicator {
      display:inline-block; width:6px; height:6px; border-radius:50%;
      background:#fb923c; margin-left:6px; vertical-align:middle;
      animation:et-changed 1.5s ease infinite;
    }

    /* MUI overrides */
    .et-wrap .MuiOutlinedInput-root {
      background:rgba(28,25,23,0.7) !important; border-radius:10px !important;
      font-family:'DM Sans',sans-serif !important; font-size:0.9rem !important;
      color:#e2e8f0 !important; transition:box-shadow 0.2s ease;
    }
    .et-wrap .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color:rgba(251,146,60,0.5) !important; }
    .et-wrap .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color:#fb923c !important; border-width:1.5px !important; }
    .et-wrap .MuiOutlinedInput-root.Mui-focused { box-shadow:0 0 0 3px rgba(251,146,60,0.18) !important; }
    .et-wrap .MuiOutlinedInput-notchedOutline { border-color:rgba(251,146,60,0.2) !important; }
    .et-wrap .MuiInputBase-input { color:#e2e8f0 !important; }
    .et-wrap .MuiSelect-icon { color:#fb923c !important; }
    .et-wrap .MuiFormControlLabel-label { font-family:'DM Sans',sans-serif !important; color:#94a3b8 !important; font-size:0.88rem !important; }
    .et-wrap .MuiCheckbox-root { color:#fb923c !important; }

    .et-btn-row { display:flex; gap:12px; justify-content:flex-end; margin-top:8px; }

    .et-btn-cancel {
      font-family:'Syne',sans-serif !important; font-size:0.82rem !important; font-weight:600 !important;
      text-transform:none !important; letter-spacing:0.04em !important;
      border-radius:10px !important; padding:8px 22px !important;
      border:1px solid rgba(251,146,60,0.3) !important; color:#94a3b8 !important;
      background:transparent !important; transition:all 0.2s ease !important;
    }
    .et-btn-cancel:hover { background:rgba(251,146,60,0.08) !important; color:#fdba74 !important; }

    .et-btn-submit {
      font-family:'Syne',sans-serif !important; font-size:0.82rem !important; font-weight:700 !important;
      text-transform:none !important; letter-spacing:0.05em !important;
      border-radius:10px !important; padding:8px 26px !important;
      background:linear-gradient(135deg,#f97316,#fb923c) !important;
      color:#fff !important; border:none !important;
      box-shadow:0 4px 18px rgba(249,115,22,0.4) !important;
      transition:all 0.25s ease !important;
    }
    .et-btn-submit:hover { box-shadow:0 6px 24px rgba(249,115,22,0.55) !important; transform:translateY(-1px) !important; }
    .et-btn-submit:disabled { opacity:0.6 !important; transform:none !important; }

    .et-success-msg { display:flex; flex-direction:column; align-items:center; gap:14px; padding:32px 0; text-align:center; animation:et-fadeUp 0.4s ease both; }
    .et-success-icon { width:56px; height:56px; border-radius:50%; background:rgba(251,146,60,0.15); border:2px solid rgba(251,146,60,0.4); display:flex; align-items:center; justify-content:center; animation:et-success 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
    .et-success-icon svg { color:#fb923c; font-size:1.6rem !important; }
    .et-success-title { font-family:'Syne',sans-serif; font-weight:700; color:#f1f5f9; font-size:1.1rem; }
    .et-success-sub   { color:#94a3b8; font-size:0.86rem; }

    .et-changes-count {
      font-size:0.75rem; color:#fb923c; font-family:'Syne',sans-serif;
      background:rgba(251,146,60,0.12); border:1px solid rgba(251,146,60,0.2);
      border-radius:12px; padding:2px 10px; margin-left:10px;
    }
  `;
  document.head.appendChild(s);
};

const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Finance", "Learning", "Other"];
const PRIORITIES  = ["High", "Medium", "Low"];
const STATUSES    = ["Pending", "In Progress", "Completed", "Cancelled"];

const EditTodo = ({ selectedTask, onSubmit, onCancel }) => {
  useEffect(() => { injectStyles(); }, []);
  const [form,    setForm]    = useState(selectedTask ?? {});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => { if (selectedTask) setForm(selectedTask); }, [selectedTask]);

  const changedFields = selectedTask
    ? Object.keys(form).filter(k => form[k] !== selectedTask[k]).length
    : 0;

  const change = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    onSubmit?.({ ...form });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const delays = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4];

  if (!selectedTask) return <Box sx={{color:"#475569",p:3,textAlign:"center",fontFamily:"'DM Sans',sans-serif"}}>No task selected for editing.</Box>;

  if (success)
    return (
      <Box className="et-wrap">
        <Box className="et-card">
          <div className="et-accent" />
          <Box className="et-success-msg">
            <div className="et-success-icon"><CheckCircleOutlineRounded /></div>
            <Typography className="et-success-title">Task Updated!</Typography>
            <Typography className="et-success-sub">Your changes have been saved successfully.</Typography>
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box className="et-wrap">
      <Box className="et-card">
        <div className="et-accent" />

        <Box mb={2.5} display="flex" alignItems="center">
          <Typography className="et-heading"><EditRounded /> Edit Task</Typography>
          {changedFields > 0 && <span className="et-changes-count">{changedFields} change{changedFields > 1 ? "s" : ""}</span>}
        </Box>

        <Grid container spacing={2.5}>

          <Grid size={{xs:12}} className="et-field" style={{animationDelay:`${delays[0]}s`}}>
            <div className="et-label">
              <TitleRounded/>Task Title *
              {form.taskTitle !== selectedTask.taskTitle && <span className="et-changed-indicator"/>}
            </div>
            <TextField fullWidth size="small" value={form.taskTitle ?? ""} onChange={change("taskTitle")} />
          </Grid>

          <Grid size={{xs:12}} className="et-field" style={{animationDelay:`${delays[1]}s`}}>
            <div className="et-label">
              <DescriptionRounded/>Description
              {form.description !== selectedTask.description && <span className="et-changed-indicator"/>}
            </div>
            <TextField fullWidth size="small" multiline rows={3} value={form.description ?? ""} onChange={change("description")} />
          </Grid>

          <Grid size={{xs:12,sm:6}} className="et-field" style={{animationDelay:`${delays[2]}s`}}>
            <div className="et-label"><CategoryRounded/>Category</div>
            <TextField fullWidth size="small" select value={form.category ?? ""} onChange={change("category")} SelectProps={{MenuProps:{PaperProps:{sx:{background:"#1c1917",color:"#e2e8f0",border:"1px solid rgba(251,146,60,0.2)",borderRadius:"12px"}}}}}>
              {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>

          <Grid size={{xs:12,sm:6}} className="et-field" style={{animationDelay:`${delays[3]}s`}}>
            <div className="et-label"><FlagRounded/>Priority</div>
            <TextField fullWidth size="small" select value={form.priority ?? "Medium"} onChange={change("priority")} SelectProps={{MenuProps:{PaperProps:{sx:{background:"#1c1917",color:"#e2e8f0",border:"1px solid rgba(251,146,60,0.2)",borderRadius:"12px"}}}}}>
              {PRIORITIES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
          </Grid>

          <Grid size={{xs:12,sm:6}} className="et-field" style={{animationDelay:`${delays[4]}s`}}>
            <div className="et-label"><FlagRounded/>Status</div>
            <TextField fullWidth size="small" select value={form.status ?? "Pending"} onChange={change("status")} SelectProps={{MenuProps:{PaperProps:{sx:{background:"#1c1917",color:"#e2e8f0",border:"1px solid rgba(251,146,60,0.2)",borderRadius:"12px"}}}}}>
              {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Grid>

          <Grid size={{xs:12,sm:6}} className="et-field" style={{animationDelay:`${delays[5]}s`}}>
            <div className="et-label"><CalendarTodayRounded/>Due Date</div>
            <TextField fullWidth size="small" type="date" value={form.dueDate ?? ""} onChange={change("dueDate")} inputProps={{style:{colorScheme:"dark"}}} />
          </Grid>

          <Grid size={{xs:12,sm:6}} className="et-field" style={{animationDelay:`${delays[6]}s`, display:"flex", alignItems:"flex-end"}}>
            <FormControlLabel control={<Checkbox checked={!!form.completed} onChange={change("completed")} size="small" />} label="Mark as Completed" />
          </Grid>

          <Grid size={{xs:12}} className="et-field" style={{animationDelay:`${delays[7]}s`}}>
            <div className="et-label"><NotesRounded/>Notes</div>
            <TextField fullWidth size="small" multiline rows={2} value={form.notes ?? ""} onChange={change("notes")} />
          </Grid>

          <Grid size={{xs:12}} className="et-field" style={{animationDelay:`${delays[7]}s`}}>
            <Box className="et-btn-row">
              <Button className="et-btn-cancel" onClick={onCancel} disabled={loading}>Cancel</Button>
              <Button className="et-btn-submit" onClick={handleSubmit} disabled={loading || !form.taskTitle?.trim()}>
                {loading ? <CircularProgress size={16} sx={{color:"#fff",mr:1}} /> : null}
                {loading ? "Saving…" : "Save Changes"}
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default EditTodo;
