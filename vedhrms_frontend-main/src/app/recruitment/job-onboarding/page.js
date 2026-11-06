// "use client";

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   Grid,
//   InputAdornment,
//   Pagination,
//   Stack,
// } from "@mui/material";
// import {
//   Add,
//   EditOutlined,
//   DeleteOutlined,
//   VisibilityOutlined,
//   Search,
//   FilterList,
//   Download,
// } from "@mui/icons-material";
// import Create from "../../../components/Recruitment/job-onboarding/Create";
// import Edit from "../../../components/Recruitment/job-onboarding/Edit";
// import View from "../../../components/Recruitment/job-onboarding/View";
// import Delete from "../../../components/Recruitment/job-onboarding/Delete";
// import CommonDialog from "../../../components/commonDialog";

// const JobOnboardingPage = () => {
//   const [onboardings, setOnboardings] = useState([
//     {
//       id: "ON001",
//       candidateName: "John Doe",
//       jobTitle: "Frontend Developer",
//       department: "IT",
//       branch: "Head Office",
//       startDate: "2024-02-01",
//       status: "In Progress",
//       assignedTo: "HR Manager",
//       documents: "Pending",
//       orientation: "Scheduled"
//     },
//     {
//       id: "ON002",
//       candidateName: "Jane Smith",
//       jobTitle: "Marketing Specialist",
//       department: "Marketing",
//       branch: "Delhi Branch",
//       startDate: "2024-02-15",
//       status: "Completed",
//       assignedTo: "HR Manager",
//       documents: "Completed",
//       orientation: "Completed"
//     },
//     {
//       id: "ON003",
//       candidateName: "Mike Johnson",
//       jobTitle: "Sales Executive",
//       department: "Sales",
//       branch: "Bangalore Branch",
//       startDate: "2024-03-01",
//       status: "Pending",
//       assignedTo: "HR Manager",
//       documents: "Pending",
//       orientation: "Pending"
//     },
//     {
//       id: "ON004",
//       candidateName: "Sarah Wilson",
//       jobTitle: "HR Coordinator",
//       department: "HR",
//       branch: "Chennai Branch",
//       startDate: "2024-03-15",
//       status: "In Progress",
//       assignedTo: "HR Manager",
//       documents: "Completed",
//       orientation: "Scheduled"
//     }
//   ]);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterDepartment, setFilterDepartment] = useState("all");

//   // Dialog States
//   const [openData, setOpenData] = useState(false);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selectedData, setSelectedData] = useState(null);

//   // Form States
//   const [formData, setFormData] = useState({
//     candidateName: "",
//     jobTitle: "",
//     department: "",
//     branch: "",
//     startDate: "",
//     status: "Pending",
//     assignedTo: "",
//     documents: "Pending",
//     orientation: "Pending",
//     notes: ""
//   });

//   const handleClose = () => {
//     setOpenData(false);
//     setOpenView(false);
//     setOpenEdit(false);
//     setOpenDelete(false);
//     setSelectedData(null);
//     setFormData({ 
//       candidateName: "", 
//       jobTitle: "", 
//       department: "", 
//       branch: "",
//       startDate: "", 
//       status: "Pending",
//       assignedTo: "",
//       documents: "Pending",
//       orientation: "Pending",
//       notes: ""
//     });
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleCreate = () => {
//     setOpenData(true);
//   };

//   const handleView = (onboarding) => {
//     setSelectedData(onboarding);
//     setOpenView(true);
//   };

//   const handleEdit = (onboarding) => {
//     setSelectedData(onboarding);
//     setFormData({
//       candidateName: onboarding.candidateName,
//       jobTitle: onboarding.jobTitle,
//       department: onboarding.department,
//       branch: onboarding.branch,
//       startDate: onboarding.startDate,
//       status: onboarding.status,
//       assignedTo: onboarding.assignedTo,
//       documents: onboarding.documents,
//       orientation: onboarding.orientation,
//       notes: onboarding.notes || ""
//     });
//     setOpenEdit(true);
//   };

//   const handleDelete = (onboarding) => {
//     setSelectedData(onboarding);
//     setOpenDelete(true);
//   };

//   const handleSubmit = () => {
//     if (openData) {
//       // Create new onboarding
//       const newOnboarding = {
//         id: `ON${String(onboardings.length + 1).padStart(3, '0')}`,
//         ...formData
//       };
//       setOnboardings([...onboardings, newOnboarding]);
//     } else if (openEdit) {
//       // Update existing onboarding
//       setOnboardings(onboardings.map(onboarding => 
//         onboarding.id === selectedData.id 
//           ? { ...onboarding, ...formData }
//           : onboarding
//       ));
//     }
//     handleClose();
//   };

//   const handleDeleteConfirm = () => {
//     setOnboardings(onboardings.filter(onboarding => onboarding.id !== selectedData.id));
//     handleClose();
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Completed': return 'hrms-badge-success';
//       case 'In Progress': return 'hrms-badge-warning';
//       case 'Pending': return 'hrms-badge-info';
//       case 'On Hold': return 'hrms-badge-error';
//       default: return 'hrms-badge-neutral';
//     }
//   };

//   const filteredOnboardings = onboardings.filter(onboarding => {
//     const matchesSearch = onboarding.candidateName.toLowerCase().includes(search.toLowerCase()) ||
//                          onboarding.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
//                          onboarding.department.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = filterStatus === "all" || onboarding.status === filterStatus;
//     const matchesDepartment = filterDepartment === "all" || onboarding.department === filterDepartment;
    
//     return matchesSearch && matchesStatus && matchesDepartment;
//   });

//   return (
//     <Box sx={{ padding: "0.5rem" }}>

//         <Box sx={{ display: "flex", gap: "0.5rem", paddingBottom:"1rem", display:'flex', justifyContent:'flex-end' }}>
//         <Box>
//           <TextField
//             placeholder="Search onboardings..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: "300px", "& .MuiOutlinedInput-root": { height: "40px" } }}
//           />
      
//         </Box>
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleCreate}
//             sx={{ height: "40px", textTransform: "none" }}
//           >
//             Add Onboarding
//           </Button>
//         </Box>
     

//       {/* Onboarding Table */}
//       <Box className="hrms-card">
//         <Box className="hrms-card-content" sx={{ padding: 0 }}>
//           <Table className="hrms-table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>S. No</TableCell>
//                 <TableCell>Candidate</TableCell>
//                 <TableCell>Job Title</TableCell>
//                 <TableCell>Department</TableCell>
//                 <TableCell>Branch</TableCell>
//                 <TableCell>Start Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Documents</TableCell>
//                 <TableCell>Orientation</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredOnboardings.map((onboarding) => (
//                 <TableRow key={onboarding.id} hover>
//                   <TableCell>{filteredOnboardings.indexOf(onboarding) + 1}</TableCell>
//                   <TableCell>
//                     <Box>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         {onboarding.candidateName}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "#666" }}>
//                         {onboarding.assignedTo}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>{onboarding.jobTitle}</TableCell>
//                   <TableCell>{onboarding.department}</TableCell>
//                   <TableCell>{onboarding.branch}</TableCell>
//                   <TableCell>{onboarding.startDate}</TableCell>
//                   <TableCell>
//                     <Box className={`hrms-badge ${getStatusColor(onboarding.status)}`}>
//                       {onboarding.status}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box className={`hrms-badge ${
//                       onboarding.documents === 'Completed' ? 'hrms-badge-success' : 'hrms-badge-warning'
//                     }`}>
//                       {onboarding.documents}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box className={`hrms-badge ${
//                       onboarding.orientation === 'Completed' ? 'hrms-badge-success' : 'hrms-badge-warning'
//                     }`}>
//                       {onboarding.orientation}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", gap: "0.25rem" }}>
//                       <IconButton 
//                         size="small"
//                         onClick={() => handleView(onboarding)}
//                         sx={{ color: "#1976D2", fontSize: "16px" }}
//                       >
//                         <VisibilityOutlined />
//                       </IconButton>
//                       <IconButton 
//                         size="small"
//                         onClick={() => handleEdit(onboarding)}
//                         sx={{ color: "#000", fontSize: "16px" }}
//                       >
//                         <EditOutlined />
//                       </IconButton>
//                       <IconButton 
//                         size="small"
//                         onClick={() => handleDelete(onboarding)}
//                         sx={{ color: "#d32f2f", fontSize: "16px" }}
//                       >
//                         <DeleteOutlined />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
        
//         {/* Pagination */}
//         <Box sx={{ padding: "1rem", borderTop: "1px solid #e5e7eb" }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Typography variant="body2" sx={{ color: "#6b7280" }}>
//               Showing {filteredOnboardings.length} of {onboardings.length} onboardings
//             </Typography>
//             <Pagination
//               count={Math.ceil(filteredOnboardings.length / rowsPerPage)}
//               page={page + 1}
//               onChange={(event, value) => setPage(value - 1)}
//               color="primary"
//             />
//           </Stack>
//         </Box>
//       </Box>

//       {/* Common Dialog */}
//       <CommonDialog
//         open={openData || openEdit || openView || openDelete}
//         onClose={handleClose}
//         dialogTitle={
//           openData
//             ? "Add New Onboarding"
//             : openEdit
//             ? "Edit Onboarding"
//             : openView
//             ? "Onboarding Details"
//             : openDelete
//             ? "Delete Onboarding"
//             : ""
//         }
//         dialogContent={
//           openData ? (
//             <Create 
//               formData={formData} 
//               handleInputChange={handleInputChange}
//               handleCreate={handleSubmit}
//               handleClose={handleClose}
//             />
//           ) : openEdit ? (
//             <Edit 
//               formData={formData} 
//               handleInputChange={handleInputChange}
//               handleUpdate={handleSubmit}
//               handleClose={handleClose}
//             />
//           ) : openView ? (
//             selectedData && (
//               <View selectedData={selectedData} getStatusColor={getStatusColor} />
//             )
//           ) : openDelete ? (
//             selectedData && (
//               <Delete 
//                 selectedData={selectedData}
//                 handleDelete={handleDeleteConfirm}
//                 handleClose={handleClose}
//               />
//             )
//           ) : null
//         }
//         maxWidth={openDelete ? "xs" : "md"}
//         fullWidth={!openDelete}
//       />
//     </Box>
//   );
// };

// export default JobOnboardingPage;








"use client";

import React, { useState } from "react";
import { IconButton, Dialog, Pagination } from "@mui/material";
import {
  Add, EditOutlined, DeleteOutlined, VisibilityOutlined,
  Search, Close, PersonOutlined, WorkOutline, BusinessOutlined,
  LocationOnOutlined, CalendarTodayOutlined, AssignmentOutlined,
  CheckCircleOutlined, HourglassEmptyOutlined, PauseCircleOutlined,
  FolderOutlined, SchoolOutlined, GroupsOutlined, TrendingUp,
  AccountTreeOutlined,
} from "@mui/icons-material";

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,400&display=swap');

  :root {
    --bg:        #F4F6FF;
    --surface:   #FFFFFF;
    --surface2:  #F8F9FE;
    --ink:       #111827;
    --ink-soft:  #374151;
    --ink-muted: #6B7280;
    --ink-faint: #9CA3AF;
    --violet:    #5B5BD6;
    --violet-soft:#EEEEFF;
    --violet-mid: #A5A5F0;
    --rose:      #E11D48;
    --rose-soft: #FFF1F4;
    --emerald:   #059669;
    --emerald-soft:#ECFDF5;
    --amber:     #D97706;
    --amber-soft:#FFFBEB;
    --sky:       #0284C7;
    --sky-soft:  #F0F9FF;
    --border:    #E5E7EB;
    --border-v:  #C7C7F0;
    --sh-xs: 0 1px 3px rgba(17,24,39,0.06);
    --sh-sm: 0 4px 14px rgba(17,24,39,0.08);
    --sh-md: 0 10px 30px rgba(17,24,39,0.1);
    --sh-lg: 0 20px 60px rgba(17,24,39,0.13);
    --r-sm: 8px; --r-md: 14px; --r-lg: 20px; --r-xl: 26px; --r-2xl: 34px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--ink); }

  /* ── root ── */
  .ob-root {
    min-height: 100vh;
    padding: 2rem 2.5rem 3rem;
    position: relative;
    overflow-x: hidden;
    background: var(--bg);
  }

  /* ── mesh bg ── */
  .ob-mesh {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 700px 500px at 85% -10%, rgba(91,91,214,0.1) 0%, transparent 70%),
      radial-gradient(ellipse 500px 400px at -5% 80%, rgba(5,150,105,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 400px 350px at 50% 55%, rgba(2,132,199,0.05) 0%, transparent 70%);
  }

  /* ── animated rings ── */
  .ob-ring {
    position: fixed; border-radius: 50%;
    border: 1px solid rgba(91,91,214,0.1);
    pointer-events: none; z-index: 0;
    animation: ringPulse 8s ease-in-out infinite;
  }
  .ob-ring.r1 { width: 600px; height: 600px; top: -200px; right: -150px; animation-delay: 0s; }
  .ob-ring.r2 { width: 400px; height: 400px; top: -100px; right: -50px; animation-delay: -3s; border-color: rgba(91,91,214,0.07); }
  @keyframes ringPulse {
    0%,100% { transform: scale(1) rotate(0deg); opacity: 1; }
    50%      { transform: scale(1.06) rotate(8deg); opacity: 0.6; }
  }

  .ob-content { position: relative; z-index: 1; }

  /* ── header ── */
  .ob-header { margin-bottom: 2rem; animation: slideDown 0.5s ease both; }
  @keyframes slideDown {
    from { opacity:0; transform: translateY(-16px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .ob-eyebrow {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--violet); margin-bottom: 0.3rem;
  }
  .ob-title {
    font-family: 'Fraunces', serif;
    font-size: 2.2rem; font-weight: 900; line-height: 1.12; color: var(--ink);
  }
  .ob-title em { font-style: italic; color: var(--violet); }

  /* ── stat cards ── */
  .ob-stats {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem;
    margin-bottom: 1.75rem;
  }
  .ob-stat {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 1.2rem 1.4rem;
    display: flex; align-items: center; gap: 1rem;
    box-shadow: var(--sh-xs);
    transition: transform 0.28s cubic-bezier(.22,.68,0,1.25), box-shadow 0.28s;
    animation: fadeUp 0.55s ease both;
    cursor: default;
    position: relative; overflow: hidden;
  }
  .ob-stat::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    border-radius: 3px 3px 0 0;
    opacity: 0; transition: opacity 0.25s;
  }
  .ob-stat:hover { transform: translateY(-5px); box-shadow: var(--sh-md); }
  .ob-stat:hover::before { opacity: 1; }
  .ob-stat.s-violet::before { background: var(--violet); }
  .ob-stat.s-emerald::before { background: var(--emerald); }
  .ob-stat.s-amber::before  { background: var(--amber); }
  .ob-stat.s-sky::before    { background: var(--sky); }

  .ob-stat-icon {
    width: 46px; height: 46px; border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .ob-stat-icon.violet  { background: var(--violet-soft); color: var(--violet); }
  .ob-stat-icon.emerald { background: var(--emerald-soft); color: var(--emerald); }
  .ob-stat-icon.amber   { background: var(--amber-soft); color: var(--amber); }
  .ob-stat-icon.sky     { background: var(--sky-soft); color: var(--sky); }
  .ob-stat-val {
    font-family: 'Fraunces', serif;
    font-size: 1.8rem; font-weight: 900; line-height: 1; color: var(--ink);
  }
  .ob-stat-lbl { font-size: 0.76rem; color: var(--ink-muted); margin-top: 0.2rem; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── toolbar ── */
  .ob-toolbar {
    display: flex; align-items: center; gap: 0.7rem;
    margin-bottom: 1.25rem; flex-wrap: wrap;
    animation: fadeUp 0.55s 0.1s ease both;
  }
  .ob-search {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--surface); border: 1.5px solid var(--border);
    border-radius: var(--r-md); height: 44px; padding: 0 1rem;
    width: 280px; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ob-search:focus-within {
    border-color: var(--violet);
    box-shadow: 0 0 0 3px rgba(91,91,214,0.12);
  }
  .ob-search input {
    border: none; outline: none; background: transparent;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.86rem;
    color: var(--ink); width: 100%;
  }
  .ob-pill {
    height: 36px; padding: 0 1rem; border-radius: 999px;
    border: 1.5px solid var(--border); background: var(--surface);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.76rem; font-weight: 600; color: var(--ink-muted);
    cursor: pointer; transition: all 0.18s;
    white-space: nowrap;
  }
  .ob-pill.active {
    border-color: var(--violet); background: var(--violet-soft); color: var(--violet);
  }
  .ob-spacer { flex: 1; }
  .ob-btn-add {
    height: 44px; padding: 0 1.4rem;
    background: var(--violet); color: #fff; border: none;
    border-radius: var(--r-md);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.83rem; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; gap: 0.4rem;
    box-shadow: 0 4px 16px rgba(91,91,214,0.35);
    transition: transform 0.22s cubic-bezier(.22,.68,0,1.4), box-shadow 0.22s, background 0.2s;
  }
  .ob-btn-add:hover { background: #4A4ABF; transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 24px rgba(91,91,214,0.42); }
  .ob-btn-add:active { transform: scale(0.97); }

  /* ── progress mini bar ── */
  .ob-progress-wrap { display: flex; align-items: center; gap: 0.5rem; }
  .ob-progress-bar {
    flex: 1; height: 5px; background: var(--border);
    border-radius: 99px; overflow: hidden; min-width: 60px;
  }
  .ob-progress-fill {
    height: 100%; border-radius: 99px;
    transition: width 0.6s cubic-bezier(.22,.68,0,1.2);
  }

  /* ── table card ── */
  .ob-table-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-2xl); overflow: hidden;
    box-shadow: var(--sh-sm);
    animation: fadeUp 0.55s 0.18s ease both;
  }
  .ob-th {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 0.7rem !important; font-weight: 700 !important;
    letter-spacing: 0.1em !important; text-transform: uppercase !important;
    color: var(--ink-faint) !important;
    background: var(--surface2) !important;
    border-bottom: 1px solid var(--border) !important;
    padding: 0.9rem 1rem !important;
    white-space: nowrap;
  }
  .ob-row { transition: background 0.16s; }
  .ob-row:hover { background: #F8F8FF !important; }
  .ob-td {
    font-size: 0.86rem !important; color: var(--ink-soft) !important;
    border-bottom: 1px solid var(--border) !important;
    padding: 0.85rem 1rem !important;
  }
  .ob-row:last-child .ob-td { border-bottom: none !important; }
  .ob-row-in { animation: rowIn 0.38s ease both; }
  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* ── candidate cell ── */
  .ob-candidate { display: flex; align-items: center; gap: 0.7rem; }
  .ob-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.78rem; font-weight: 800; color: #fff; flex-shrink: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  /* ── badge ── */
  .ob-badge {
    display: inline-flex; align-items: center; gap: 0.3rem;
    padding: 0.22rem 0.65rem; border-radius: 999px;
    font-size: 0.7rem; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif;
    white-space: nowrap;
  }
  .ob-badge.completed  { background: var(--emerald-soft); color: var(--emerald); }
  .ob-badge.inprogress { background: var(--amber-soft);   color: var(--amber);   }
  .ob-badge.pending    { background: var(--sky-soft);     color: var(--sky);     }
  .ob-badge.onhold     { background: var(--rose-soft);    color: var(--rose);    }
  .ob-badge.scheduled  { background: var(--violet-soft);  color: var(--violet);  }

  /* ── action btns ── */
  .ob-act {
    width: 32px; height: 32px; border-radius: 9px;
    border: 1px solid transparent; background: transparent;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.18s, border-color 0.18s, transform 0.18s;
  }
  .ob-act:hover { transform: scale(1.13); }
  .ob-act.view  { color: #0284C7; } .ob-act.view:hover  { background: var(--sky-soft);     border-color: #BAE6FD; }
  .ob-act.edit  { color: var(--ink); } .ob-act.edit:hover  { background: var(--surface2);    border-color: var(--border); }
  .ob-act.del   { color: var(--rose); } .ob-act.del:hover   { background: var(--rose-soft);   border-color: #FECDD3; }

  /* ── footer ── */
  .ob-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.85rem 1.4rem;
    background: var(--surface2); border-top: 1px solid var(--border);
  }
  .ob-footer-txt { font-size: 0.78rem; color: var(--ink-muted); }

  /* ── DIALOG ── */
  .ob-dlg {
    border-radius: var(--r-2xl) !important;
    background: var(--surface) !important;
    box-shadow: var(--sh-lg) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    overflow: hidden !important;
  }
  .ob-dlg-hdr {
    padding: 1.4rem 1.75rem;
    display: flex; align-items: center; justify-content: space-between;
  }
  .ob-dlg-hdr.create  { background: linear-gradient(130deg, #4F46E5, #6D67E8); }
  .ob-dlg-hdr.edit    { background: linear-gradient(130deg, #0369A1, #0284C7); }
  .ob-dlg-hdr.view    { background: linear-gradient(130deg, #065F46, #059669); }
  .ob-dlg-hdr.danger  { background: linear-gradient(130deg, #9F1239, #E11D48); }
  .ob-dlg-title {
    font-family: 'Fraunces', serif !important;
    font-size: 1.15rem !important; font-weight: 900 !important; color: #fff !important;
  }
  .ob-dlg-close { color: rgba(255,255,255,0.7) !important; transition: color 0.2s, transform 0.2s !important; }
  .ob-dlg-close:hover { color: #fff !important; transform: rotate(90deg) !important; }

  /* ── form ── */
  .ob-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; padding: 1.5rem 1.75rem; }
  .ob-form-full { grid-column: 1/-1; }
  .ob-flabel {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--ink-muted); margin-bottom: 0.4rem;
  }
  .ob-field input, .ob-field textarea, .ob-field select {
    width: 100%; background: var(--surface2); border: 1.5px solid var(--border);
    border-radius: var(--r-sm); padding: 0.6rem 0.85rem;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.875rem; color: var(--ink);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: none;
    appearance: none;
  }
  .ob-field input:focus, .ob-field textarea:focus, .ob-field select:focus {
    border-color: var(--violet); box-shadow: 0 0 0 3px rgba(91,91,214,0.1);
    background: #fff;
  }

  /* ── view detail grid ── */
  .ob-view-body { padding: 1.5rem 1.75rem; }
  .ob-view-hero {
    display: flex; align-items: center; gap: 1.1rem;
    padding: 1.2rem; background: var(--surface2);
    border: 1px solid var(--border); border-radius: var(--r-md); margin-bottom: 1.25rem;
  }
  .ob-view-avatar {
    width: 58px; height: 58px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15rem; font-weight: 800; color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif; flex-shrink: 0;
  }
  .ob-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1rem; }
  .ob-detail-item {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--r-sm); padding: 0.8rem 0.95rem;
    display: flex; align-items: center; gap: 0.6rem;
    transition: border-color 0.18s;
  }
  .ob-detail-item:hover { border-color: var(--border-v); }
  .ob-detail-icon {
    width: 30px; height: 30px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ob-detail-lbl { font-size: 0.68rem; color: var(--ink-muted); margin-bottom: 0.1rem; }
  .ob-detail-val { font-size: 0.86rem; font-weight: 600; color: var(--ink); }

  /* ── checklist ── */
  .ob-checklist { display: flex; flex-direction: column; gap: 0.5rem; }
  .ob-check-item {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.7rem 1rem; background: var(--surface2);
    border: 1px solid var(--border); border-radius: var(--r-sm);
  }
  .ob-check-dot {
    width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
  }

  /* ── delete ── */
  .ob-del-body { padding: 1.75rem; text-align: center; }
  .ob-del-ring {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--rose-soft); margin: 0 auto 1rem;
    display: flex; align-items: center; justify-content: center;
    animation: delPulse 1.6s ease infinite;
  }
  @keyframes delPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(225,29,72,0.2); }
    50%      { box-shadow: 0 0 0 12px rgba(225,29,72,0); }
  }

  /* ── dialog actions ── */
  .ob-dlg-actions { padding: 0 1.75rem 1.5rem; display: flex; justify-content: flex-end; gap: 0.6rem; }
  .ob-btn-cancel {
    height: 40px; padding: 0 1.2rem; background: transparent;
    border: 1.5px solid var(--border); border-radius: var(--r-sm);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.8rem; font-weight: 600; color: var(--ink-muted); cursor: pointer;
    transition: border-color 0.18s, color 0.18s;
  }
  .ob-btn-cancel:hover { border-color: #9CA3AF; color: var(--ink); }
  .ob-btn-confirm {
    height: 40px; padding: 0 1.4rem; border: none; border-radius: var(--r-sm);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.82rem; font-weight: 700; color: #fff; cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .ob-btn-confirm.violet { background: var(--violet); box-shadow: 0 4px 14px rgba(91,91,214,0.35); }
  .ob-btn-confirm.sky    { background: var(--sky);    box-shadow: 0 4px 14px rgba(2,132,199,0.35); }
  .ob-btn-confirm.danger { background: var(--rose);   box-shadow: 0 4px 14px rgba(225,29,72,0.35); }
  .ob-btn-confirm:hover  { transform: translateY(-1px) scale(1.02); }
  .ob-btn-confirm:active { transform: scale(0.97); }

  /* ── MUI pagination overrides ── */
  .MuiPaginationItem-root { font-family: 'Plus Jakarta Sans', sans-serif !important; }
  .MuiPaginationItem-root.Mui-selected { background: var(--violet) !important; color: #fff !important; }

  /* empty */
  .ob-empty { text-align: center; padding: 3rem 1rem; color: var(--ink-muted); font-size: 0.9rem; }

  .ob-section-title {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--violet); margin-bottom: 0.65rem; padding-top: 0.25rem;
  }
`;

/* ─── HELPERS ──────────────────────────────────────────────────────────── */
const DEPT_COLORS = {
  IT: "#5B5BD6", HR: "#0284C7", Marketing: "#DB2777",
  Sales: "#D97706", Finance: "#059669", Operations: "#DC2626", Default: "#6B7280",
};
const deptColor = (d) => DEPT_COLORS[d] || DEPT_COLORS.Default;
const initials = (n) => n?.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase() || "?";

const statusClass = (s) => ({
  "Completed": "completed", "In Progress": "inprogress",
  "Pending": "pending", "On Hold": "onhold", "Scheduled": "scheduled",
}[s] || "pending");

const docClass = (s) => s === "Completed" ? "completed" : "inprogress";

const progressMap = { "Completed": 100, "In Progress": 55, "Pending": 10, "On Hold": 0 };
const progressColor = { "Completed": "var(--emerald)", "In Progress": "var(--amber)", "Pending": "var(--sky)", "On Hold": "var(--rose)" };

/* ─── SEED ─────────────────────────────────────────────────────────────── */
const SEED = [
  { id:"ON001", candidateName:"John Doe",      jobTitle:"Frontend Developer",  department:"IT",        branch:"Head Office",      startDate:"2024-02-01", status:"In Progress", assignedTo:"HR Manager", documents:"Pending",   orientation:"Scheduled" },
  { id:"ON002", candidateName:"Jane Smith",    jobTitle:"Marketing Specialist",department:"Marketing", branch:"Delhi Branch",     startDate:"2024-02-15", status:"Completed",   assignedTo:"HR Manager", documents:"Completed", orientation:"Completed" },
  { id:"ON003", candidateName:"Mike Johnson",  jobTitle:"Sales Executive",     department:"Sales",     branch:"Bangalore Branch", startDate:"2024-03-01", status:"Pending",     assignedTo:"HR Manager", documents:"Pending",   orientation:"Pending"   },
  { id:"ON004", candidateName:"Sarah Wilson",  jobTitle:"HR Coordinator",      department:"HR",        branch:"Chennai Branch",   startDate:"2024-03-15", status:"In Progress", assignedTo:"HR Manager", documents:"Completed", orientation:"Scheduled" },
  { id:"ON005", candidateName:"Riya Kapoor",   jobTitle:"Finance Analyst",     department:"Finance",   branch:"Mumbai Branch",    startDate:"2024-04-01", status:"Completed",   assignedTo:"HR Lead",    documents:"Completed", orientation:"Completed" },
];

const EMPTY = {
  candidateName:"", jobTitle:"", department:"", branch:"",
  startDate:"", status:"Pending", assignedTo:"",
  documents:"Pending", orientation:"Pending", notes:"",
};

/* ─── SMALL COMPONENTS ─────────────────────────────────────────────────── */
function Field({ label, name, value, onChange, type="text", span=false }) {
  return (
    <div className={`ob-field${span?" ob-form-full":""}`}>
      <div className="ob-flabel">{label}</div>
      <input type={type} name={name} value={value} onChange={e => onChange(e.target.name, e.target.value)} />
    </div>
  );
}
function FieldSel({ label, name, value, onChange, opts }) {
  return (
    <div className="ob-field">
      <div className="ob-flabel">{label}</div>
      <select name={name} value={value} onChange={e => onChange(e.target.name, e.target.value)}>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
function FieldTxt({ label, name, value, onChange }) {
  return (
    <div className="ob-field ob-form-full">
      <div className="ob-flabel">{label}</div>
      <textarea name={name} value={value} rows={3} onChange={e => onChange(e.target.name, e.target.value)} />
    </div>
  );
}

/* ─── MAIN ─────────────────────────────────────────────────────────────── */
export default function JobOnboardingPage() {
  const [data, setData] = useState(SEED);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const PER = 8;

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit,   setOpenEdit]   = useState(false);
  const [openView,   setOpenView]   = useState(false);
  const [openDel,    setOpenDel]    = useState(false);
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const inp = (name, val) => setForm(f => ({ ...f, [name]: val }));
  const close = () => {
    setOpenCreate(false); setOpenEdit(false); setOpenView(false); setOpenDel(false);
    setSel(null); setForm(EMPTY);
  };

  const doCreate = () => {
    setData(d => [...d, { id:`ON${String(d.length+1).padStart(3,"0")}`, ...form }]);
    close();
  };
  const doEdit = () => {
    setData(d => d.map(x => x.id === sel.id ? { ...x, ...form } : x));
    close();
  };
  const doDel = () => {
    setData(d => d.filter(x => x.id !== sel.id));
    close();
  };

  const filtered = data.filter(x => {
    const q = search.toLowerCase();
    return (x.candidateName.toLowerCase().includes(q) || x.jobTitle.toLowerCase().includes(q) || x.department.toLowerCase().includes(q))
      && (filter === "all" || x.status === filter);
  });
  const rows = filtered.slice(page * PER, (page+1) * PER);

  const completed = data.filter(x => x.status === "Completed").length;
  const inprog    = data.filter(x => x.status === "In Progress").length;
  const pending   = data.filter(x => x.status === "Pending").length;

  return (
    <>
      <style>{G}</style>
      <div className="ob-mesh" />
      <div className="ob-ring r1" /><div className="ob-ring r2" />

      <div className="ob-root">
        <div className="ob-content">

          {/* Header */}
          <div className="ob-header">
            <div className="ob-eyebrow">Recruitment Module</div>
            <div className="ob-title">Job <em>Onboarding</em></div>
          </div>

          {/* Stats */}
          <div className="ob-stats">
            {[
              { cls:"s-violet", ic:"violet", Icon:GroupsOutlined,    val:data.length, lbl:"Total Onboardings" },
              { cls:"s-emerald",ic:"emerald",Icon:CheckCircleOutlined,val:completed,   lbl:"Completed"        },
              { cls:"s-amber",  ic:"amber",  Icon:HourglassEmptyOutlined,val:inprog,   lbl:"In Progress"      },
              { cls:"s-sky",    ic:"sky",    Icon:TrendingUp,         val:pending,    lbl:"Pending"           },
            ].map(({ cls, ic, Icon, val, lbl }, i) => (
              <div className={`ob-stat ${cls}`} key={i} style={{ animationDelay:`${i*0.07}s` }}>
                <div className={`ob-stat-icon ${ic}`}><Icon sx={{ fontSize:20 }} /></div>
                <div>
                  <div className="ob-stat-val">{val}</div>
                  <div className="ob-stat-lbl">{lbl}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="ob-toolbar">
            <div className="ob-search">
              <Search sx={{ fontSize:17, color:"var(--ink-muted)", flexShrink:0 }} />
              <input placeholder="Search candidate, role, dept…" value={search}
                onChange={e => { setSearch(e.target.value); setPage(0); }} />
            </div>
            {["all","Completed","In Progress","Pending","On Hold"].map(s => (
              <button key={s} className={`ob-pill${filter===s?" active":""}`}
                onClick={() => { setFilter(s); setPage(0); }}>
                {s === "all" ? "All" : s}
              </button>
            ))}
            <div className="ob-spacer" />
            <button className="ob-btn-add" onClick={() => setOpenCreate(true)}>
              <Add sx={{ fontSize:18 }} /> Add Onboarding
            </button>
          </div>

          {/* Table */}
          <div className="ob-table-card">
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr>
                  {["#","Candidate","Job Title","Department","Branch","Start Date","Status","Documents","Orientation","Actions"].map(h => (
                    <th key={h} className="ob-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={10}><div className="ob-empty">No onboardings found.</div></td></tr>
                ) : rows.map((ob, i) => {
                  const col = deptColor(ob.department);
                  const prog = progressMap[ob.status] ?? 10;
                  return (
                    <tr key={ob.id} className="ob-row ob-row-in" style={{ animationDelay:`${i*0.04}s` }}>
                      <td className="ob-td" style={{ fontWeight:700, fontSize:"0.78rem", color:"var(--ink-faint)" }}>{page*PER+i+1}</td>
                      <td className="ob-td">
                        <div className="ob-candidate">
                          <div className="ob-avatar" style={{ background:col }}>{initials(ob.candidateName)}</div>
                          <div>
                            <div style={{ fontWeight:600, color:"var(--ink)", fontSize:"0.875rem" }}>{ob.candidateName}</div>
                            <div style={{ fontSize:"0.72rem", color:"var(--ink-muted)" }}>{ob.assignedTo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="ob-td" style={{ fontWeight:500, color:"var(--ink)" }}>{ob.jobTitle}</td>
                      <td className="ob-td">
                        <span style={{ background:`${col}18`, color:col, padding:"0.2rem 0.6rem", borderRadius:999, fontSize:"0.74rem", fontWeight:700 }}>{ob.department}</span>
                      </td>
                      <td className="ob-td">{ob.branch}</td>
                      <td className="ob-td" style={{ whiteSpace:"nowrap" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"0.35rem" }}>
                          <CalendarTodayOutlined sx={{ fontSize:13, color:"var(--ink-muted)" }} />
                          {ob.startDate}
                        </div>
                      </td>
                      <td className="ob-td">
                        <div>
                          <span className={`ob-badge ${statusClass(ob.status)}`}>{ob.status}</span>
                          <div className="ob-progress-wrap" style={{ marginTop:"0.35rem" }}>
                            <div className="ob-progress-bar">
                              <div className="ob-progress-fill" style={{ width:`${prog}%`, background:progressColor[ob.status] || "var(--sky)" }} />
                            </div>
                            <span style={{ fontSize:"0.65rem", color:"var(--ink-muted)", fontWeight:700 }}>{prog}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="ob-td"><span className={`ob-badge ${docClass(ob.documents)}`}>{ob.documents}</span></td>
                      <td className="ob-td"><span className={`ob-badge ${statusClass(ob.orientation)}`}>{ob.orientation}</span></td>
                      <td className="ob-td">
                        <div style={{ display:"flex", gap:"0.25rem" }}>
                          {[
                            { c:"view", I:VisibilityOutlined, fn:() => { setSel(ob); setOpenView(true); } },
                            { c:"edit", I:EditOutlined, fn:() => { setSel(ob); setForm({ candidateName:ob.candidateName, jobTitle:ob.jobTitle, department:ob.department, branch:ob.branch, startDate:ob.startDate, status:ob.status, assignedTo:ob.assignedTo, documents:ob.documents, orientation:ob.orientation, notes:ob.notes||"" }); setOpenEdit(true); } },
                            { c:"del",  I:DeleteOutlined, fn:() => { setSel(ob); setOpenDel(true); } },
                          ].map(({ c, I, fn }) => (
                            <button key={c} className={`ob-act ${c}`} onClick={fn}><I sx={{ fontSize:17 }} /></button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="ob-footer">
              <span className="ob-footer-txt">
                Showing {filtered.length===0?0:page*PER+1}–{Math.min((page+1)*PER,filtered.length)} of {filtered.length}
              </span>
              <Pagination
                count={Math.max(1,Math.ceil(filtered.length/PER))}
                page={page+1}
                onChange={(_,v)=>setPage(v-1)}
                size="small"
                sx={{ "& .MuiPaginationItem-root":{ fontFamily:"'Plus Jakarta Sans',sans-serif", borderRadius:"8px" }, "& .Mui-selected":{ background:"var(--violet) !important", color:"#fff !important" } }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══ CREATE ══ */}
      <Dialog open={openCreate} onClose={close} maxWidth="md" fullWidth PaperProps={{ className:"ob-dlg" }}>
        <div className="ob-dlg-hdr create">
          <span className="ob-dlg-title">Add New Onboarding</span>
          <IconButton className="ob-dlg-close" onClick={close} size="small"><Close /></IconButton>
        </div>
        <div className="ob-form">
          <Field label="Candidate Name" name="candidateName" value={form.candidateName} onChange={inp} span />
          <Field label="Job Title"      name="jobTitle"      value={form.jobTitle}      onChange={inp} />
          <Field label="Department"     name="department"    value={form.department}    onChange={inp} />
          <Field label="Branch"         name="branch"        value={form.branch}        onChange={inp} />
          <Field label="Assigned To"    name="assignedTo"    value={form.assignedTo}    onChange={inp} />
          <Field label="Start Date"     name="startDate"     value={form.startDate}     onChange={inp} type="date" />
          <FieldSel label="Status"      name="status"        value={form.status}        onChange={inp} opts={["Pending","In Progress","Completed","On Hold"]} />
          <FieldSel label="Documents"   name="documents"     value={form.documents}     onChange={inp} opts={["Pending","Completed"]} />
          <FieldSel label="Orientation" name="orientation"   value={form.orientation}   onChange={inp} opts={["Pending","Scheduled","Completed"]} />
          <FieldTxt label="Notes"       name="notes"         value={form.notes}         onChange={inp} />
        </div>
        <div className="ob-dlg-actions">
          <button className="ob-btn-cancel" onClick={close}>Cancel</button>
          <button className="ob-btn-confirm violet" onClick={doCreate}>Add Onboarding</button>
        </div>
      </Dialog>

      {/* ══ EDIT ══ */}
      <Dialog open={openEdit} onClose={close} maxWidth="md" fullWidth PaperProps={{ className:"ob-dlg" }}>
        <div className="ob-dlg-hdr edit">
          <span className="ob-dlg-title">Edit Onboarding</span>
          <IconButton className="ob-dlg-close" onClick={close} size="small"><Close /></IconButton>
        </div>
        <div className="ob-form">
          <Field label="Candidate Name" name="candidateName" value={form.candidateName} onChange={inp} span />
          <Field label="Job Title"      name="jobTitle"      value={form.jobTitle}      onChange={inp} />
          <Field label="Department"     name="department"    value={form.department}    onChange={inp} />
          <Field label="Branch"         name="branch"        value={form.branch}        onChange={inp} />
          <Field label="Assigned To"    name="assignedTo"    value={form.assignedTo}    onChange={inp} />
          <Field label="Start Date"     name="startDate"     value={form.startDate}     onChange={inp} type="date" />
          <FieldSel label="Status"      name="status"        value={form.status}        onChange={inp} opts={["Pending","In Progress","Completed","On Hold"]} />
          <FieldSel label="Documents"   name="documents"     value={form.documents}     onChange={inp} opts={["Pending","Completed"]} />
          <FieldSel label="Orientation" name="orientation"   value={form.orientation}   onChange={inp} opts={["Pending","Scheduled","Completed"]} />
          <FieldTxt label="Notes"       name="notes"         value={form.notes}         onChange={inp} />
        </div>
        <div className="ob-dlg-actions">
          <button className="ob-btn-cancel" onClick={close}>Cancel</button>
          <button className="ob-btn-confirm sky" onClick={doEdit}>Save Changes</button>
        </div>
      </Dialog>

      {/* ══ VIEW ══ */}
      <Dialog open={openView} onClose={close} maxWidth="sm" fullWidth PaperProps={{ className:"ob-dlg" }}>
        <div className="ob-dlg-hdr view">
          <span className="ob-dlg-title">Onboarding Details</span>
          <IconButton className="ob-dlg-close" onClick={close} size="small"><Close /></IconButton>
        </div>
        {sel && (() => {
          const col = deptColor(sel.department);
          return (
            <div className="ob-view-body">
              <div className="ob-view-hero">
                <div className="ob-view-avatar" style={{ background:col }}>{initials(sel.candidateName)}</div>
                <div>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:"1.2rem", fontWeight:900, color:"var(--ink)" }}>{sel.candidateName}</div>
                  <div style={{ fontSize:"0.8rem", color:"var(--ink-muted)", marginTop:"0.2rem" }}>{sel.id} · Starting {sel.startDate}</div>
                  <div style={{ marginTop:"0.55rem" }}>
                    <span className={`ob-badge ${statusClass(sel.status)}`}>{sel.status}</span>
                  </div>
                </div>
              </div>
              <div className="ob-section-title">Details</div>
              <div className="ob-detail-grid">
                {[
                  { Icon:WorkOutline,          color:"#5B5BD6", bg:"#EEEEFF", lbl:"Job Title",   val:sel.jobTitle },
                  { Icon:BusinessOutlined,      color:"#0284C7", bg:"#F0F9FF", lbl:"Department",  val:sel.department },
                  { Icon:AccountTreeOutlined,   color:"#059669", bg:"#ECFDF5", lbl:"Branch",      val:sel.branch },
                  { Icon:PersonOutlined,        color:"#D97706", bg:"#FFFBEB", lbl:"Assigned To", val:sel.assignedTo },
                ].map(({ Icon, color, bg, lbl, val }) => (
                  <div className="ob-detail-item" key={lbl}>
                    <div className="ob-detail-icon" style={{ background:bg, color }}><Icon sx={{ fontSize:16 }} /></div>
                    <div><div className="ob-detail-lbl">{lbl}</div><div className="ob-detail-val">{val}</div></div>
                  </div>
                ))}
              </div>
              <div className="ob-section-title">Checklist</div>
              <div className="ob-checklist">
                {[
                  { lbl:"Documents Submission", val:sel.documents },
                  { lbl:"Orientation Session",  val:sel.orientation },
                ].map(({ lbl, val }) => (
                  <div className="ob-check-item" key={lbl}>
                    <div className="ob-check-dot" style={{ background: val==="Completed"?"var(--emerald)": val==="Scheduled"?"var(--violet)":"var(--sky)" }} />
                    <span style={{ fontSize:"0.86rem", fontWeight:500, flex:1 }}>{lbl}</span>
                    <span className={`ob-badge ${statusClass(val)}`}>{val}</span>
                  </div>
                ))}
              </div>
              {sel.notes && (
                <div style={{ marginTop:"1rem", padding:"0.9rem 1rem", background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:"var(--r-sm)" }}>
                  <div className="ob-flabel" style={{ marginBottom:"0.35rem" }}>Notes</div>
                  <div style={{ fontSize:"0.86rem", color:"var(--ink-soft)", lineHeight:1.6 }}>{sel.notes}</div>
                </div>
              )}
            </div>
          );
        })()}
        <div className="ob-dlg-actions">
          <button className="ob-btn-confirm violet" onClick={close}>Close</button>
        </div>
      </Dialog>

      {/* ══ DELETE ══ */}
      <Dialog open={openDel} onClose={close} maxWidth="xs" fullWidth PaperProps={{ className:"ob-dlg" }}>
        <div className="ob-dlg-hdr danger">
          <span className="ob-dlg-title">Delete Onboarding</span>
          <IconButton className="ob-dlg-close" onClick={close} size="small"><Close /></IconButton>
        </div>
        <div className="ob-del-body">
          <div className="ob-del-ring"><DeleteOutlined sx={{ fontSize:32, color:"var(--rose)" }} /></div>
          <div style={{ fontFamily:"'Fraunces',serif", fontSize:"1.05rem", fontWeight:900, color:"var(--ink)", marginBottom:"0.5rem" }}>Are you sure?</div>
          <div style={{ fontSize:"0.875rem", color:"var(--ink-muted)", lineHeight:1.6 }}>
            {`You're about to remove `}<strong style={{ color:"var(--ink)" }}>{sel?.candidateName}</strong>{`'s onboarding record. This cannot be undone.`}
          </div>
        </div>
        <div className="ob-dlg-actions">
          <button className="ob-btn-cancel" onClick={close}>Cancel</button>
          <button className="ob-btn-confirm danger" onClick={doDel}>Delete</button>
        </div>
      </Dialog>
    </>
  );
}
