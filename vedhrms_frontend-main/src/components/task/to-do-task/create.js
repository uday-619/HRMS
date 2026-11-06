// "use client";
// import React from "react";
// import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

// const CreateTodo = ({ formData, handleInputChange, handleCreate, handleClose }) => {
//   const handleSubmit = () => {
//     handleCreate();
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
//           Save
//         </button>
//       </Box>
//     </Box>
//   );
// };

// export default CreateTodo;









"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Grid, TextField, MenuItem,
  Button, FormControlLabel, Checkbox, CircularProgress,
} from "@mui/material";
import {
  AddTaskRounded, CheckCircleOutlineRounded,
  FlagRounded, CategoryRounded, CalendarTodayRounded,
  TitleRounded, DescriptionRounded, NotesRounded,
} from "@mui/icons-material";

/* ─── Styles ─── */
const injectStyles = () => {
  if (document.getElementById("createtodo-styles")) return;
  const s = document.createElement("style");
  s.id = "createtodo-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    @keyframes ct-fadeUp   { from { opacity:0; transform:translateY(16px);  } to { opacity:1; transform:translateY(0);  } }
    @keyframes ct-scaleIn  { from { opacity:0; transform:scale(0.92);       } to { opacity:1; transform:scale(1);       } }
    @keyframes ct-shimmer  { 0% { background-position:-400px 0; } 100% { background-position:400px 0; } }
    @keyframes ct-spin     { to { transform:rotate(360deg); } }
    @keyframes ct-success  { 0%{transform:scale(0) rotate(-30deg);} 60%{transform:scale(1.2) rotate(5deg);} 100%{transform:scale(1);} }

    .ct-wrap { font-family:'DM Sans',sans-serif; }

    .ct-card {
      background: linear-gradient(145deg,#0f172a 0%,#1e1b4b 60%,#0f172a 100%);
      border: 1px solid rgba(99,102,241,0.22);
      border-radius: 20px;
      padding: 28px 28px 24px;
      position: relative;
      overflow: hidden;
      animation: ct-scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .ct-card::before {
      content:'';
      position:absolute; inset:0;
      background:radial-gradient(ellipse at 80% 0%,rgba(99,102,241,0.14) 0%,transparent 55%);
      pointer-events:none;
    }
    .ct-accent {
      position:absolute; top:0; left:0; right:0; height:3px;
      background:linear-gradient(90deg,#38bdf8,#818cf8,#a78bfa,#38bdf8);
      background-size:300% 100%;
      animation:ct-shimmer 3s linear infinite;
    }

    .ct-heading {
      font-family:'Syne',sans-serif;
      font-size:1.3rem; font-weight:800;
      color:#f1f5f9;
      display:flex; align-items:center; gap:10px;
    }
    .ct-heading svg { color:#818cf8; font-size:1.3rem !important; }

    .ct-label {
      font-family:'Syne',sans-serif;
      font-size:0.67rem; font-weight:600;
      letter-spacing:0.1em; text-transform:uppercase;
      color:#94a3b8; margin-bottom:6px;
      display:flex; align-items:center; gap:5px;
    }
    .ct-label svg { font-size:13px !important; color:#6366f1; }

    .ct-field { animation:ct-fadeUp 0.38s ease both; }

    /* MUI overrides */
    .ct-wrap .MuiOutlinedInput-root {
      background:rgba(30,27,75,0.6) !important;
      border-radius:10px !important;
      font-family:'DM Sans',sans-serif !important;
      font-size:0.9rem !important;
      color:#e2e8f0 !important;
      transition:box-shadow 0.2s ease;
    }
    .ct-wrap .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border-color:rgba(99,102,241,0.5) !important;
    }
    .ct-wrap .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color:#6366f1 !important;
      border-width:1.5px !important;
    }
    .ct-wrap .MuiOutlinedInput-root.Mui-focused {
      box-shadow:0 0 0 3px rgba(99,102,241,0.18) !important;
    }
    .ct-wrap .MuiOutlinedInput-notchedOutline {
      border-color:rgba(99,102,241,0.2) !important;
    }
    .ct-wrap .MuiInputBase-input { color:#e2e8f0 !important; }
    .ct-wrap .MuiSelect-icon { color:#6366f1 !important; }
    .ct-wrap .MuiMenuItem-root { font-family:'DM Sans',sans-serif !important; }
    .ct-wrap .MuiFormControlLabel-label { font-family:'DM Sans',sans-serif !important; color:#94a3b8 !important; font-size:0.88rem !important; }
    .ct-wrap .MuiCheckbox-root { color:#6366f1 !important; }

    .ct-btn-row { display:flex; gap:12px; justify-content:flex-end; margin-top:8px; }

    .ct-btn-cancel {
      font-family:'Syne',sans-serif !important;
      font-size:0.82rem !important; font-weight:600 !important;
      text-transform:none !important; letter-spacing:0.04em !important;
      border-radius:10px !important;
      padding:8px 22px !important;
      border:1px solid rgba(99,102,241,0.3) !important;
      color:#94a3b8 !important;
      background:transparent !important;
      transition:all 0.2s ease !important;
    }
    .ct-btn-cancel:hover { background:rgba(99,102,241,0.1) !important; color:#c7d2fe !important; }

    .ct-btn-submit {
      font-family:'Syne',sans-serif !important;
      font-size:0.82rem !important; font-weight:700 !important;
      text-transform:none !important; letter-spacing:0.05em !important;
      border-radius:10px !important;
      padding:8px 26px !important;
      background:linear-gradient(135deg,#6366f1,#818cf8) !important;
      color:#fff !important;
      border:none !important;
      box-shadow:0 4px 18px rgba(99,102,241,0.4) !important;
      transition:all 0.25s ease !important;
    }
    .ct-btn-submit:hover { box-shadow:0 6px 24px rgba(99,102,241,0.55) !important; transform:translateY(-1px) !important; }
    .ct-btn-submit:active { transform:translateY(0) !important; }
    .ct-btn-submit:disabled { opacity:0.6 !important; transform:none !important; }

    .ct-success-msg {
      display:flex; flex-direction:column; align-items:center; gap:14px;
      padding:32px 0; text-align:center;
      animation:ct-fadeUp 0.4s ease both;
    }
    .ct-success-icon {
      width:56px; height:56px; border-radius:50%;
      background:rgba(16,185,129,0.18); border:2px solid rgba(16,185,129,0.4);
      display:flex; align-items:center; justify-content:center;
      animation:ct-success 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .ct-success-icon svg { color:#34d399; font-size:1.6rem !important; }
    .ct-success-title { font-family:'Syne',sans-serif; font-weight:700; color:#f1f5f9; font-size:1.1rem; }
    .ct-success-sub   { color:#94a3b8; font-size:0.86rem; }
  `;
  document.head.appendChild(s);
};

const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Finance", "Learning", "Other"];
const PRIORITIES  = ["High", "Medium", "Low"];

const initialForm = { taskTitle:"", description:"", category:"", priority:"Medium", dueDate:"", notes:"", completed:false };

const CreateTodo = ({ onSubmit, onCancel }) => {
  useEffect(() => { injectStyles(); }, []);
  const [form,    setForm]    = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const change = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));      // simulate async
    onSubmit?.({ ...form, id: Date.now(), createdDate: new Date().toLocaleDateString() });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setForm(initialForm); }, 2000);
  };

  const delays = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45];

  if (success)
    return (
      <Box className="ct-wrap">
        <Box className="ct-card">
          <div className="ct-accent" />
          <Box className="ct-success-msg">
            <div className="ct-success-icon"><CheckCircleOutlineRounded /></div>
            <Typography className="ct-success-title">Task Created!</Typography>
            <Typography className="ct-success-sub">Your new task has been added successfully.</Typography>
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box className="ct-wrap">
      <Box className="ct-card">
        <div className="ct-accent" />

        <Box mb={2.5} display="flex" alignItems="center" gap={1}>
          <Typography className="ct-heading"><AddTaskRounded /> Create New Task</Typography>
        </Box>

        <Grid container spacing={2.5}>

          {/* Task Title */}
          <Grid size={{xs:12}} className="ct-field" style={{animationDelay:`${delays[0]}s`}}>
            <div className="ct-label"><TitleRounded/>Task Title *</div>
            <TextField fullWidth size="small" placeholder="What needs to be done?" value={form.taskTitle} onChange={change("taskTitle")} />
          </Grid>

          {/* Description */}
          <Grid size={{xs:12}} className="ct-field" style={{animationDelay:`${delays[1]}s`}}>
            <div className="ct-label"><DescriptionRounded/>Description</div>
            <TextField fullWidth size="small" multiline rows={3} placeholder="Add more details..." value={form.description} onChange={change("description")} />
          </Grid>

          {/* Category */}
          <Grid size={{xs:12,sm:6}} className="ct-field" style={{animationDelay:`${delays[2]}s`}}>
            <div className="ct-label"><CategoryRounded/>Category</div>
            <TextField fullWidth size="small" select value={form.category} onChange={change("category")} SelectProps={{MenuProps:{PaperProps:{sx:{background:"#1e293b",color:"#e2e8f0",border:"1px solid rgba(99,102,241,0.2)",borderRadius:"12px"}}}}}>
              <MenuItem value=""><em style={{color:"#475569"}}>Select category</em></MenuItem>
              {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>

          {/* Priority */}
          <Grid size={{xs:12,sm:6}} className="ct-field" style={{animationDelay:`${delays[3]}s`}}>
            <div className="ct-label"><FlagRounded/>Priority</div>
            <TextField fullWidth size="small" select value={form.priority} onChange={change("priority")} SelectProps={{MenuProps:{PaperProps:{sx:{background:"#1e293b",color:"#e2e8f0",border:"1px solid rgba(99,102,241,0.2)",borderRadius:"12px"}}}}}>
              {PRIORITIES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
          </Grid>

          {/* Due Date */}
          <Grid size={{xs:12,sm:6}} className="ct-field" style={{animationDelay:`${delays[4]}s`}}>
            <div className="ct-label"><CalendarTodayRounded/>Due Date</div>
            <TextField fullWidth size="small" type="date" value={form.dueDate} onChange={change("dueDate")}
              InputLabelProps={{shrink:true}}
              inputProps={{style:{colorScheme:"dark"}}} />
          </Grid>

          {/* Completed checkbox */}
          <Grid size={{xs:12,sm:6}} className="ct-field" style={{animationDelay:`${delays[5]}s`, display:"flex", alignItems:"flex-end"}}>
            <FormControlLabel
              control={<Checkbox checked={form.completed} onChange={change("completed")} size="small" />}
              label="Mark as Completed"
            />
          </Grid>

          {/* Notes */}
          <Grid size={{xs:12}} className="ct-field" style={{animationDelay:`${delays[6]}s`}}>
            <div className="ct-label"><NotesRounded/>Notes</div>
            <TextField fullWidth size="small" multiline rows={2} placeholder="Optional notes..." value={form.notes} onChange={change("notes")} />
          </Grid>

          {/* Actions */}
          <Grid size={{xs:12}} className="ct-field" style={{animationDelay:`${delays[7]}s`}}>
            <Box className="ct-btn-row">
              <Button className="ct-btn-cancel" variant="outlined" onClick={onCancel} disabled={loading}>Cancel</Button>
              <Button className="ct-btn-submit" variant="contained" onClick={handleSubmit} disabled={loading || !form.taskTitle.trim()}>
                {loading ? <CircularProgress size={16} sx={{color:"#fff",mr:1}} /> : null}
                {loading ? "Saving…" : "Create Task"}
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default CreateTodo;
