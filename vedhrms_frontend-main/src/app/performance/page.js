// "use client";
// import { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TextField,
//   InputAdornment,
//   Pagination,
//   Stack,
//   Avatar,
//   LinearProgress,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   Divider
// } from '@mui/material';
// import {
//   Search,
//   Add,
//   Edit,
//   DeleteOutline,
//   VisibilityOutlined,
//   Star
// } from '@mui/icons-material';
// import Create from "../../components/performance/Create";
// import EditComponent from "../../components/performance/Edit";
// import View from "../../components/performance/View";
// import DeleteComponent from "../../components/performance/Delete";
// import CommonDialog from "../../components/commonDialog";

// export default function Performance() {
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(10);
//   const [openData, setOpenData] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openView, setOpenView] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selectedData, setSelectedData] = useState(null);
  
//   // Form state for create/edit
//   const [formData, setFormData] = useState({
//     employee: '',
//     department: '',
//     position: '',
//     manager: '',
//     joinDate: '',
//     appraisal: '',
//     performanceTrend: '',
//     goals: '',
//     completedGoals: '',
//     projectsCompleted: '',
//     trainingHours: '',
//     clientSatisfaction: '',
//     lastReview: '',
//     nextReview: '',
//     reviewPeriod: '',
//     reviewer: '',
//     reviewType: '',
//     technicalSkills: '',
//     communication: '',
//     leadership: '',
//     problemSolving: '',
//     teamwork: '',
//     comments: ''
//   });

//   const performanceData = [
//     {
//       id: 1,
//       employee: 'Rajesh Kumar',
//       employeeId: 'EMP001',
//       department: 'Software Development',
//       position: 'Senior Software Engineer',
//       currentRating: 4.6,
//       appraisal: 'Exceeds Expectations',
//       goals: 8,
//       completedGoals: 7,
//       lastReview: '2024-01-15',
//       nextReview: '2024-07-15'
//     },
//     {
//       id: 2,
//       employee: 'Priya Sharma',
//       employeeId: 'EMP002',
//       department: 'Human Resources',
//       position: 'HR Business Partner',
//       currentRating: 4.3,
//       appraisal: 'Exceeds Expectations',
//       goals: 6,
//       completedGoals: 6,
//       lastReview: '2024-01-20',
//       nextReview: '2024-07-20'
//     },
//     {
//       id: 3,
//       employee: 'Amit Patel',
//       employeeId: 'EMP003',
//       department: 'Sales & Marketing',
//       position: 'Regional Sales Manager',
//       currentRating: 4.1,
//       appraisal: 'Meets Expectations',
//       goals: 10,
//       completedGoals: 8,
//       lastReview: '2024-01-10',
//       nextReview: '2024-07-10'
//     },
//     {
//       id: 4,
//       employee: 'Sneha Gupta',
//       employeeId: 'EMP004',
//       department: 'Finance & Accounting',
//       position: 'Senior Financial Analyst',
//       currentRating: 4.4,
//       appraisal: 'Exceeds Expectations',
//       goals: 7,
//       completedGoals: 6,
//       lastReview: '2024-01-25',
//       nextReview: '2024-07-25'
//     },
//     {
//       id: 5,
//       employee: 'Vikram Singh',
//       employeeId: 'EMP005',
//       department: 'Operations',
//       position: 'Operations Manager',
//       currentRating: 3.9,
//       appraisal: 'Meets Expectations',
//       goals: 9,
//       completedGoals: 7,
//       lastReview: '2024-01-12',
//       nextReview: '2024-07-12'
//     },
//     {
//       id: 6,
//       employee: 'Anita Reddy',
//       employeeId: 'EMP006',
//       department: 'Quality Assurance',
//       position: 'QA Lead',
//       currentRating: 4.2,
//       appraisal: 'Meets Expectations',
//       goals: 8,
//       completedGoals: 7,
//       lastReview: '2024-01-18',
//       nextReview: '2024-07-18'
//     },
//     {
//       id: 7,
//       employee: 'Rohit Agarwal',
//       employeeId: 'EMP007',
//       department: 'Customer Success',
//       position: 'Customer Success Manager',
//       currentRating: 4.5,
//       appraisal: 'Exceeds Expectations',
//       goals: 6,
//       completedGoals: 6,
//       lastReview: '2024-01-22',
//       nextReview: '2024-07-22'
//     },
//     {
//       id: 8,
//       employee: 'Deepika Joshi',
//       employeeId: 'EMP008',
//       department: 'Product Management',
//       position: 'Product Manager',
//       currentRating: 4.7,
//       appraisal: 'Exceeds Expectations',
//       goals: 7,
//       completedGoals: 7,
//       lastReview: '2024-01-28',
//       nextReview: '2024-07-28'
//     }
//   ];

//   const filteredData = performanceData.filter(emp =>
//     emp.employee.toLowerCase().includes(search.toLowerCase()) ||
//     emp.department.toLowerCase().includes(search.toLowerCase()) ||
//     emp.position.toLowerCase().includes(search.toLowerCase())
//   );


//   const getAppraisalColor = (appraisal) => {
//     switch (appraisal) {
//       case 'Exceeds Expectations': return 'hrms-badge-success';
//       case 'Meets Expectations': return 'hrms-badge-primary';
//       case 'Below Expectations': return 'hrms-badge-error';
//       default: return 'hrms-badge-neutral';
//     }
//   };

//   // Dialog handlers
//   const handleAddClick = () => {
//     setOpenData(true);
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

//   const handleView = (employee) => {
//     setSelectedData(employee);
//     setOpenView(true);
//   };

//   const handleEdit = (employee) => {
//     setSelectedData(employee);
//     setFormData({
//       employee: employee.employee,
//       employeeId: employee.employeeId,
//       department: employee.department,
//       position: employee.position,
//       manager: 'Manager Name', // Default value
//       joinDate: '2022-01-15', // Default value
//       currentRating: employee.currentRating.toString(),
//       appraisal: employee.appraisal,
//       performanceTrend: 'improving', // Default value
//       goals: employee.goals.toString(),
//       completedGoals: employee.completedGoals.toString(),
//       projectsCompleted: '12', // Default value
//       trainingHours: '24', // Default value
//       clientSatisfaction: '4.8', // Default value
//       lastReview: employee.lastReview,
//       nextReview: employee.nextReview,
//       reviewPeriod: 'Annual', // Default value
//       reviewer: 'Manager Name', // Default value
//       reviewType: 'Formal', // Default value
//       technicalSkills: '4.7', // Default value
//       communication: '4.3', // Default value
//       leadership: '4.1', // Default value
//       problemSolving: '4.6', // Default value
//       teamwork: '4.4', // Default value
//       comments: 'Performance review comments...' // Default value
//     });
//     setOpenEdit(true);
//   };

//   const handleDelete = (employee) => {
//     setSelectedData(employee);
//     setOpenDelete(true);
//   };

//   const handleSubmit = () => {
//     console.log("Performance data submitted:", formData);
//     setOpenData(false);
//     setOpenEdit(false);
//     setFormData({
//       employee: '',
//       department: '',
//       position: '',
//       manager: '',
//       joinDate: '',
//       appraisal: '',
//       performanceTrend: '',
//       goals: '',
//       completedGoals: '',
//       projectsCompleted: '',
//       trainingHours: '',
//       clientSatisfaction: '',
//       lastReview: '',
//       nextReview: '',
//       reviewPeriod: '',
//       reviewer: '',
//       reviewType: '',
//       technicalSkills: '',
//       communication: '',
//       leadership: '',
//       problemSolving: '',
//       teamwork: '',
//       comments: ''
//     });
//   };

//   const handleCloseDialog = () => {
//     setOpenData(false);
//     setOpenEdit(false);
//     setOpenView(false);
//     setOpenDelete(false);
//     setSelectedData(null);
//     // Reset form data
//     setFormData({
//       employee: '',
//       employeeId: '',
//       department: '',
//       position: '',
//       manager: '',
//       joinDate: '',
//       appraisal: '',
//       performanceTrend: '',
//       goals: '',
//       completedGoals: '',
//       projectsCompleted: '',
//       trainingHours: '',
//       clientSatisfaction: '',
//       lastReview: '',
//       nextReview: '',
//       reviewPeriod: '',
//       reviewer: '',
//       reviewType: '',
//       technicalSkills: '',
//       communication: '',
//       leadership: '',
//       problemSolving: '',
//       teamwork: '',
//       comments: ''
//     });
//   };


//   return (
//     <Box sx={{ padding: "0.5rem" }}>
//       {/* Header */}
    

//       {/* Search and Add Button */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap:"1rem", marginBottom: "1rem" }}>
//         <TextField
//           placeholder="Search employees..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: "300px", "& .MuiOutlinedInput-root": { height: "40px" } }}
//         />
//         <Button
//           variant="contained"
//           sx={{textTransform: "none"}}
//           startIcon={<Add />}
//           onClick={handleAddClick}
//         >
//           Add Performance Review
//         </Button>
//       </Box>

//       {/* Performance Table */}
//       <Box className="hrms-card">
//         <Box className="hrms-card-content" sx={{ padding: 0 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: "#374151", paddingTop: "8px", paddingBottom: "8px" }}>Employee</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#374151", paddingTop: "8px", paddingBottom: "8px" }}>Department</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#374151", paddingTop: "8px", paddingBottom: "8px" }}>Position</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#374151", paddingTop: "8px", paddingBottom: "8px" }}>Appraisal</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#374151", paddingTop: "8px", paddingBottom: "8px" }}>Goals Progress</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#374151", paddingTop: "8px", paddingBottom: "8px" }}>Last Review</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#374151", paddingTop: "8px", paddingBottom: "8px" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.map((emp) => (
//                 <TableRow key={emp.id} hover>
//                   <TableCell sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//                       <Avatar sx={{ width: 32, height: 32, backgroundColor: "#3b82f6" }}>
//                         {emp.employee.charAt(0)}
//                       </Avatar>
//                       <Box>
//                         <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
//                           {emp.employee}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: "#6b7280" }}>
//                           {emp.employeeId}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ paddingTop: "8px", paddingBottom: "8px" }}>{emp.department}</TableCell>
//                   <TableCell sx={{ paddingTop: "8px", paddingBottom: "8px" }}>{emp.position}</TableCell>
//                   <TableCell sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
//                     <Box className={`hrms-badge ${getAppraisalColor(emp.appraisal)}`}>
//                       {emp.appraisal}
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                       <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                         {emp.completedGoals}/{emp.goals}
//                       </Typography>
//                       <Box sx={{ width: "60px" }}>
//                         <LinearProgress
//                           variant="determinate"
//                           value={(emp.completedGoals / emp.goals) * 100}
//                           sx={{
//                             height: 6,
//                             borderRadius: 3,
//                             backgroundColor: "#e5e7eb",
//                             "& .MuiLinearProgress-bar": {
//                               backgroundColor: "#10b981"
//                             }
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ paddingTop: "8px", paddingBottom: "8px" }}>{emp.lastReview}</TableCell>
//                   <TableCell sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
//                     <Box sx={{ display: "flex", gap: "0.25rem" }}>
//                       <IconButton 
//                         size="small"
//                         sx={{ color: "#1976D2", fontSize: "16px" }}
//                         onClick={() => handleView(emp)}
//                       >
//                         <VisibilityOutlined />
//                       </IconButton>
//                       <IconButton 
//                         size="small"
//                         sx={{ color: "#000", fontSize: "16px" }}
//                         onClick={() => handleEdit(emp)}
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton 
//                         size="small"
//                         sx={{ color: "#d32f2f", fontSize: "16px" }}
//                         onClick={() => handleDelete(emp)}
//                       >
//                         <DeleteOutline />
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
//               Showing {filteredData.length} of {performanceData.length} employees
//             </Typography>
//             <Pagination
//               count={Math.ceil(filteredData.length / rowsPerPage)}
//               page={page}
//               onChange={(event, value) => setPage(value)}
//               color="primary"
//             />
//           </Stack>
//         </Box>
//       </Box>

//       {/* Common Dialog */}
//       <CommonDialog
//         open={openData || openEdit || openView || openDelete}
//         onClose={handleCloseDialog}
//         dialogTitle={
//           openData
//             ? "Add New Performance Review"
//             : openEdit
//             ? "Edit Performance Review"
//             : openView
//             ? "View Performance Details"
//             : openDelete
//             ? "Delete Performance Record"
//             : ""
//         }
//         dialogContent={
//           openData ? (
//             <Create formData={formData} handleInputChange={handleInputChange} handleCreate={handleSubmit} handleClose={handleCloseDialog} />
//           ) : openEdit ? (
//             <EditComponent formData={formData} handleInputChange={handleInputChange} handleUpdate={handleSubmit} handleClose={handleCloseDialog} />
//           ) : openView ? (
//             selectedData && (
//               <View selectedData={selectedData} />
//             )
//           ) : openDelete ? (
//             selectedData && (
//               <DeleteComponent selectedData={selectedData} handleDelete={() => console.log("Delete performance record")} handleClose={handleCloseDialog} />
//             )
//           ) : null
//         }
//         maxWidth={openDelete ? "xs" : "md"}
//         fullWidth={!openDelete}
//       />
//     </Box>
//   );
// }








"use client";
import { useState } from 'react';

const performanceData = [
  { id: 1, employee: 'Rajesh Kumar', employeeId: 'EMP001', department: 'Software Development', position: 'Senior Software Engineer', currentRating: 4.6, appraisal: 'Exceeds Expectations', goals: 8, completedGoals: 7, lastReview: '2024-01-15', nextReview: '2024-07-15', color: '#4f46e5' },
  { id: 2, employee: 'Priya Sharma', employeeId: 'EMP002', department: 'Human Resources', position: 'HR Business Partner', currentRating: 4.3, appraisal: 'Exceeds Expectations', goals: 6, completedGoals: 6, lastReview: '2024-01-20', nextReview: '2024-07-20', color: '#db2777' },
  { id: 3, employee: 'Amit Patel', employeeId: 'EMP003', department: 'Sales & Marketing', position: 'Regional Sales Manager', currentRating: 4.1, appraisal: 'Meets Expectations', goals: 10, completedGoals: 8, lastReview: '2024-01-10', nextReview: '2024-07-10', color: '#d97706' },
  { id: 4, employee: 'Sneha Gupta', employeeId: 'EMP004', department: 'Finance & Accounting', position: 'Senior Financial Analyst', currentRating: 4.4, appraisal: 'Exceeds Expectations', goals: 7, completedGoals: 6, lastReview: '2024-01-25', nextReview: '2024-07-25', color: '#059669' },
  { id: 5, employee: 'Vikram Singh', employeeId: 'EMP005', department: 'Operations', position: 'Operations Manager', currentRating: 3.9, appraisal: 'Meets Expectations', goals: 9, completedGoals: 7, lastReview: '2024-01-12', nextReview: '2024-07-12', color: '#2563eb' },
  { id: 6, employee: 'Anita Reddy', employeeId: 'EMP006', department: 'Quality Assurance', position: 'QA Lead', currentRating: 4.2, appraisal: 'Meets Expectations', goals: 8, completedGoals: 7, lastReview: '2024-01-18', nextReview: '2024-07-18', color: '#7c3aed' },
  { id: 7, employee: 'Rohit Agarwal', employeeId: 'EMP007', department: 'Customer Success', position: 'Customer Success Manager', currentRating: 4.5, appraisal: 'Exceeds Expectations', goals: 6, completedGoals: 6, lastReview: '2024-01-22', nextReview: '2024-07-22', color: '#0891b2' },
  { id: 8, employee: 'Deepika Joshi', employeeId: 'EMP008', department: 'Product Management', position: 'Product Manager', currentRating: 4.7, appraisal: 'Exceeds Expectations', goals: 7, completedGoals: 7, lastReview: '2024-01-28', nextReview: '2024-07-28', color: '#e11d48' },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f0f4ff;
    --bg2: #e8eeff;
    --white: #ffffff;
    --surface: #ffffff;
    --surface2: #f8faff;
    --border: #e2e8f5;
    --border-hover: #c7d4f0;
    --text-1: #0f172a;
    --text-2: #475569;
    --text-3: #94a3b8;
    --accent: #4f46e5;
    --accent-light: #eef2ff;
    --accent-mid: #c7d2fe;
    --success: #059669;
    --success-light: #ecfdf5;
    --success-mid: #a7f3d0;
    --warning: #d97706;
    --warning-light: #fffbeb;
    --error: #dc2626;
    --error-light: #fef2f2;
    --font: 'Plus Jakarta Sans', sans-serif;
    --mono: 'DM Mono', monospace;
    --r: 16px;
    --r-sm: 10px;
    --shadow-sm: 0 1px 4px rgba(79,70,229,0.06), 0 2px 12px rgba(79,70,229,0.04);
    --shadow: 0 4px 20px rgba(79,70,229,0.1), 0 1px 4px rgba(0,0,0,0.04);
    --shadow-lg: 0 16px 48px rgba(79,70,229,0.18), 0 4px 12px rgba(0,0,0,0.06);
    --shadow-hover: 0 8px 30px rgba(79,70,229,0.16), 0 2px 8px rgba(0,0,0,0.06);
  }

  body { font-family: var(--font); background: var(--bg); color: var(--text-1); min-height: 100vh; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes fillBar {
    from { width: 0; }
    to   { width: var(--w); }
  }
  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.93) translateY(16px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -300% 0; }
    100% { background-position: 300% 0; }
  }
  @keyframes badge-pop {
    0%   { transform: scale(0.85); opacity: 0; }
    60%  { transform: scale(1.05); }
    100% { transform: scale(1);    opacity: 1; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0);   }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── LAYOUT ── */
  .perf-page {
    padding: 2rem 2.5rem;
    max-width: 1440px;
    margin: 0 auto;
    animation: fadeIn 0.3s ease;
  }

  /* ── HEADER ── */
  .perf-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2rem;
    animation: fadeUp 0.5s ease both;
  }
  .header-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); background: var(--accent-light);
    padding: 4px 10px; border-radius: 99px;
    margin-bottom: 0.5rem;
    border: 1px solid var(--accent-mid);
    animation: badge-pop 0.4s ease 0.1s both;
  }
  .header-tag::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
  .page-title {
    font-size: clamp(1.6rem, 2.8vw, 2.2rem);
    font-weight: 800; letter-spacing: -0.035em; color: var(--text-1); line-height: 1.1;
  }
  .page-title em { font-style: normal; color: var(--accent); }
  .page-sub { color: var(--text-2); font-size: 0.875rem; margin-top: 4px; }
  .header-date {
    font-family: var(--mono); font-size: 0.78rem; color: var(--text-3);
    background: var(--white); border: 1px solid var(--border);
    padding: 6px 14px; border-radius: 99px;
    box-shadow: var(--shadow-sm);
    animation: fadeUp 0.5s ease 0.15s both;
  }

  /* ── KPI STRIP ── */
  .kpi-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.75rem;
  }
  .kpi-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--r);
    padding: 1.25rem 1.4rem;
    box-shadow: var(--shadow-sm);
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
    animation: fadeUp 0.5s ease both;
  }
  .kpi-card:nth-child(1) { animation-delay: 0.08s; }
  .kpi-card:nth-child(2) { animation-delay: 0.13s; }
  .kpi-card:nth-child(3) { animation-delay: 0.18s; }
  .kpi-card:nth-child(4) { animation-delay: 0.23s; }
  .kpi-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-3px); border-color: var(--border-hover); }
  .kpi-accent-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: var(--r) var(--r) 0 0;
  }
  .kpi-icon {
    width: 38px; height: 38px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px; margin-bottom: 0.85rem; flex-shrink: 0;
  }
  .kpi-label { font-size: 0.7rem; font-weight: 700; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
  .kpi-value {
    font-size: 1.9rem; font-weight: 800; letter-spacing: -0.04em; color: var(--text-1);
    animation: countUp 0.5s ease both; animation-delay: 0.35s;
  }
  .kpi-foot { margin-top: 4px; font-size: 0.75rem; color: var(--text-2); display: flex; align-items: center; gap: 5px; }
  .chip { font-size: 0.68rem; font-weight: 700; padding: 2px 7px; border-radius: 99px; }
  .chip-green { background: var(--success-light); color: var(--success); }
  .chip-blue  { background: var(--accent-light);  color: var(--accent);  }
  .chip-amber { background: var(--warning-light); color: var(--warning); }

  /* ── TOOLBAR ── */
  .toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.1rem;
    animation: fadeUp 0.5s ease 0.28s both;
  }
  .toolbar-left { display: flex; align-items: center; gap: 0.65rem; }
  .search-wrap { position: relative; }
  .search-ico { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--text-3); pointer-events: none; }
  .search-input {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    padding: 0.55rem 1rem 0.55rem 2.2rem;
    font-family: var(--font); font-size: 0.84rem; color: var(--text-1);
    outline: none; width: 270px;
    box-shadow: var(--shadow-sm);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-input::placeholder { color: var(--text-3); }
  .search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(79,70,229,0.12); }
  .pill-btn {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    padding: 0.52rem 0.9rem;
    font-family: var(--font); font-size: 0.82rem; font-weight: 500; color: var(--text-2);
    cursor: pointer; display: flex; align-items: center; gap: 5px;
    box-shadow: var(--shadow-sm);
    transition: all 0.18s;
  }
  .pill-btn:hover { border-color: var(--border-hover); color: var(--text-1); background: var(--surface2); }

  .add-btn {
    background: var(--accent);
    border: none; border-radius: var(--r-sm);
    padding: 0.6rem 1.2rem;
    font-family: var(--font); font-size: 0.85rem; font-weight: 700; color: #fff;
    cursor: pointer; display: flex; align-items: center; gap: 6px;
    box-shadow: 0 4px 14px rgba(79,70,229,0.35);
    transition: all 0.2s;
    position: relative; overflow: hidden;
  }
  .add-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
    background-size: 300% 100%; opacity: 0;
    transition: opacity 0.3s;
  }
  .add-btn:hover { background: #4338ca; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(79,70,229,0.45); }
  .add-btn:hover::after { opacity: 1; animation: shimmer 0.6s ease; }
  .add-btn:active { transform: translateY(0); }

  /* ── TABLE CARD ── */
  .table-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--r);
    overflow: hidden;
    box-shadow: var(--shadow);
    animation: fadeUp 0.5s ease 0.32s both;
  }
  .t-head {
    display: grid;
    grid-template-columns: 2.2fr 1.5fr 1.8fr 1.3fr 1.1fr 1fr 0.65fr;
    padding: 0.7rem 1.5rem;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
  }
  .th {
    font-size: 0.68rem; font-weight: 700; color: var(--text-3);
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .t-body {}
  .t-row {
    display: grid;
    grid-template-columns: 2.2fr 1.5fr 1.8fr 1.3fr 1.1fr 1fr 0.65fr;
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid var(--border);
    align-items: center;
    transition: background 0.15s;
    opacity: 0;
    animation: rowIn 0.35s ease forwards;
    position: relative;
  }
  .t-row:last-child { border-bottom: none; }
  .t-row:hover { background: #fafbff; }
  .t-row:hover .row-actions { opacity: 1; transform: translateX(0); }

  .emp-cell { display: flex; align-items: center; gap: 10px; }
  .emp-av {
    width: 38px; height: 38px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; font-weight: 800; color: #fff; flex-shrink: 0;
    position: relative; overflow: hidden;
  }
  .emp-av::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 60%);
  }
  .emp-name { font-size: 0.875rem; font-weight: 700; color: var(--text-1); }
  .emp-id   { font-family: var(--mono); font-size: 0.67rem; color: var(--text-3); margin-top: 1px; }

  .cell-text { font-size: 0.82rem; color: var(--text-2); }
  .cell-pos  { font-size: 0.8rem; color: var(--text-2); line-height: 1.35; }

  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 9px; border-radius: 99px;
    font-size: 0.69rem; font-weight: 700; white-space: nowrap;
    animation: badge-pop 0.35s ease both;
  }
  .badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .badge-exceed { background: var(--success-light); color: var(--success); border: 1px solid var(--success-mid); }
  .badge-meet   { background: var(--accent-light);  color: var(--accent);  border: 1px solid var(--accent-mid); }
  .badge-below  { background: var(--error-light);   color: var(--error);   border: 1px solid #fecaca; }

  .goals-cell { display: flex; flex-direction: column; gap: 4px; }
  .goals-nums { font-family: var(--mono); font-size: 0.76rem; font-weight: 500; color: var(--text-1); }
  .prog-track { height: 5px; background: #e2e8f5; border-radius: 99px; overflow: hidden; width: 72px; }
  .prog-fill  {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, #059669, #34d399);
    animation: fillBar 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
    width: 0;
  }

  .date-cell { font-family: var(--mono); font-size: 0.74rem; color: var(--text-2); }

  .row-actions {
    display: flex; gap: 4px;
    opacity: 0; transform: translateX(4px);
    transition: opacity 0.18s, transform 0.18s;
  }
  .act-btn {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--white); color: var(--text-2);
    cursor: pointer; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; box-shadow: var(--shadow-sm);
  }
  .act-btn:hover { transform: scale(1.08); }
  .act-btn.view:hover { border-color: #93c5fd; background: #eff6ff; color: #2563eb; }
  .act-btn.edit:hover { border-color: var(--accent-mid); background: var(--accent-light); color: var(--accent); }
  .act-btn.del:hover  { border-color: #fca5a5; background: var(--error-light); color: var(--error); }

  /* ── TABLE FOOTER ── */
  .t-footer {
    padding: 0.85rem 1.5rem;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    background: var(--surface2);
  }
  .t-footer-info { font-size: 0.78rem; color: var(--text-3); }
  .pagination { display: flex; gap: 4px; }
  .pg-btn {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--white);
    font-family: var(--mono); font-size: 0.75rem; color: var(--text-2);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; box-shadow: var(--shadow-sm);
  }
  .pg-btn:hover, .pg-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; box-shadow: 0 3px 10px rgba(79,70,229,0.3); }

  /* ── MODAL ── */
  .overlay {
    position: fixed; inset: 0;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(5px);
    display: flex; align-items: center; justify-content: center;
    z-index: 999;
    animation: overlayIn 0.2s ease;
  }
  .modal {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 20px;
    width: 92%;
    max-width: 620px;
    max-height: 92vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
    animation: modalPop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .modal-sm { max-width: 420px; }

  .modal-head {
    padding: 1.4rem 1.5rem 1rem;
    border-bottom: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-start;
    position: sticky; top: 0; background: var(--white); z-index: 1;
    border-radius: 20px 20px 0 0;
  }
  .modal-title { font-size: 1.05rem; font-weight: 800; color: var(--text-1); letter-spacing: -0.02em; }
  .modal-sub   { font-size: 0.78rem; color: var(--text-2); margin-top: 2px; }
  .close-btn {
    width: 32px; height: 32px; border-radius: 9px;
    border: 1px solid var(--border); background: var(--surface2);
    color: var(--text-2); cursor: pointer; font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .close-btn:hover { background: var(--error-light); border-color: #fca5a5; color: var(--error); }

  .modal-body { padding: 1.4rem 1.5rem; }
  .modal-foot {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border);
    display: flex; justify-content: flex-end; gap: 0.65rem;
    position: sticky; bottom: 0; background: var(--white);
    border-radius: 0 0 20px 20px;
  }

  /* Form */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
  .fg { display: flex; flex-direction: column; gap: 5px; }
  .fg.full { grid-column: 1 / -1; }
  .f-label { font-size: 0.69rem; font-weight: 700; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.09em; }
  .f-input, .f-select, .f-textarea {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    padding: 0.58rem 0.85rem;
    font-family: var(--font); font-size: 0.84rem; color: var(--text-1);
    outline: none; width: 100%;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .f-input:focus, .f-select:focus, .f-textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
    background: #fff;
  }
  .f-textarea { resize: vertical; min-height: 80px; }
  .f-select option { background: #fff; }

  .divider {
    display: flex; align-items: center; gap: 10px;
    margin: 1.1rem 0 0.9rem;
  }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-label { font-size: 0.69rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap; }

  /* Buttons */
  .btn { border: none; border-radius: var(--r-sm); padding: 0.58rem 1.2rem; font-family: var(--font); font-size: 0.84rem; font-weight: 700; cursor: pointer; transition: all 0.18s; }
  .btn-ghost { background: var(--surface2); color: var(--text-2); border: 1px solid var(--border); }
  .btn-ghost:hover { border-color: var(--border-hover); color: var(--text-1); }
  .btn-primary { background: var(--accent); color: #fff; box-shadow: 0 3px 12px rgba(79,70,229,0.3); }
  .btn-primary:hover { background: #4338ca; box-shadow: 0 5px 18px rgba(79,70,229,0.4); transform: translateY(-1px); }
  .btn-danger { background: var(--error); color: #fff; box-shadow: 0 3px 12px rgba(220,38,38,0.25); }
  .btn-danger:hover { background: #b91c1c; box-shadow: 0 5px 18px rgba(220,38,38,0.35); transform: translateY(-1px); }

  /* View modal */
  .view-band {
    padding: 1.5rem;
    background: linear-gradient(135deg, var(--accent-light) 0%, #fdf4ff 100%);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 1rem;
  }
  .view-av-lg {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.25rem; font-weight: 800; color: #fff; flex-shrink: 0;
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
  .view-name { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; }
  .view-pos  { font-size: 0.8rem; color: var(--text-2); margin-top: 2px; }
  .stars { display: flex; gap: 2px; margin-top: 5px; align-items: center; }
  .star { font-size: 13px; }
  .rating-num { font-family: var(--mono); font-size: 0.72rem; color: var(--accent); margin-left: 4px; font-weight: 500; }

  .stat-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 1.1rem; }
  .stat-box {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--r-sm); padding: 0.9rem; text-align: center;
  }
  .stat-v { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; }
  .stat-l { font-size: 0.65rem; color: var(--text-3); margin-top: 2px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; }

  .skill-list { display: flex; flex-direction: column; gap: 9px; }
  .skill-row  { display: flex; align-items: center; gap: 10px; }
  .skill-name { font-size: 0.78rem; color: var(--text-2); width: 120px; flex-shrink: 0; font-weight: 500; }
  .skill-track { flex: 1; height: 5px; background: #e2e8f5; border-radius: 99px; overflow: hidden; }
  .skill-fill  { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--accent), #818cf8); animation: fillBar 1s ease forwards; }
  .skill-score { font-family: var(--mono); font-size: 0.7rem; color: var(--accent); font-weight: 500; width: 26px; text-align: right; flex-shrink: 0; }

  /* Delete */
  .del-icon {
    width: 58px; height: 58px; border-radius: 18px;
    background: var(--error-light); border: 1px solid #fecaca;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; margin: 0 auto 1rem;
    animation: badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

  /* Responsive */
  @media (max-width: 1100px) {
    .kpi-strip { grid-template-columns: repeat(2,1fr); }
    .t-head, .t-row { grid-template-columns: 2fr 1.5fr 1.2fr 1fr 0.8fr 0.65fr; }
    .t-head .th:nth-child(3), .t-row .cell-pos { display: none; }
  }
  @media (max-width: 700px) {
    .perf-page { padding: 1rem; }
    .form-grid { grid-template-columns: 1fr; }
    .kpi-strip { grid-template-columns: 1fr 1fr; }
  }
`;

/* ── HELPERS ── */
const AppraisalBadge = ({ a }) => {
  const map = {
    'Exceeds Expectations': ['badge-exceed', 'Exceeds'],
    'Meets Expectations':   ['badge-meet',   'Meets'],
    'Below Expectations':   ['badge-below',  'Below'],
  };
  const [cls, label] = map[a] || ['badge-meet', a];
  return <span className={`badge ${cls}`}>{label}</span>;
};

const ProgressBar = ({ pct, delay = '0s' }) => (
  <div className="prog-track">
    <div className="prog-fill" style={{ '--w': `${pct}%`, animationDelay: delay }} />
  </div>
);

const Stars = ({ rating }) => (
  <div className="stars">
    {[1,2,3,4,5].map(n => (
      <span key={n} className="star" style={{ color: n <= Math.round(rating) ? '#f59e0b' : '#e2e8f5' }}>★</span>
    ))}
    <span className="rating-num">{rating}</span>
  </div>
);

/* ── MODALS ── */
const CreateModal = ({ onClose }) => {
  const [f, sf] = useState({ employee: '', department: '', position: '', appraisal: 'Meets Expectations', goals: '', done: '', reviewer: '', comments: '' });
  const s = (k, v) => sf(p => ({ ...p, [k]: v }));
  return (
    <>
      <div className="modal-head">
        <div><div className="modal-title">Add Performance Review</div><div className="modal-sub">Create a new employee review record</div></div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <div className="form-grid">
          <div className="fg"><label className="f-label">Employee Name</label><input className="f-input" placeholder="Full name" value={f.employee} onChange={e => s('employee', e.target.value)} /></div>
          <div className="fg"><label className="f-label">Department</label><input className="f-input" placeholder="e.g. Engineering" value={f.department} onChange={e => s('department', e.target.value)} /></div>
          <div className="fg full"><label className="f-label">Position / Role</label><input className="f-input" placeholder="Job title" value={f.position} onChange={e => s('position', e.target.value)} /></div>
          <div className="fg"><label className="f-label">Total Goals</label><input className="f-input" type="number" placeholder="0" value={f.goals} onChange={e => s('goals', e.target.value)} /></div>
          <div className="fg"><label className="f-label">Completed Goals</label><input className="f-input" type="number" placeholder="0" value={f.done} onChange={e => s('done', e.target.value)} /></div>
        </div>
        <div className="divider"><div className="divider-line" /><span className="divider-label">Review Details</span><div className="divider-line" /></div>
        <div className="form-grid">
          <div className="fg">
            <label className="f-label">Appraisal</label>
            <select className="f-select" value={f.appraisal} onChange={e => s('appraisal', e.target.value)}>
              <option>Exceeds Expectations</option><option>Meets Expectations</option><option>Below Expectations</option>
            </select>
          </div>
          <div className="fg"><label className="f-label">Reviewer</label><input className="f-input" placeholder="Manager name" value={f.reviewer} onChange={e => s('reviewer', e.target.value)} /></div>
          <div className="fg full"><label className="f-label">Comments</label><textarea className="f-textarea" placeholder="Add notes or review summary…" value={f.comments} onChange={e => s('comments', e.target.value)} /></div>
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={onClose}>Save Review</button>
      </div>
    </>
  );
};

const EditModal = ({ data, onClose }) => {
  const [f, sf] = useState({ appraisal: data.appraisal, goals: String(data.goals), done: String(data.completedGoals), comments: 'Consistent high performance with excellent project delivery and team collaboration.' });
  const s = (k, v) => sf(p => ({ ...p, [k]: v }));
  return (
    <>
      <div className="modal-head">
        <div><div className="modal-title">Edit Review</div><div className="modal-sub">{data.employee} · {data.employeeId}</div></div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <div className="form-grid">
          <div className="fg">
            <label className="f-label">Appraisal</label>
            <select className="f-select" value={f.appraisal} onChange={e => s('appraisal', e.target.value)}>
              <option>Exceeds Expectations</option><option>Meets Expectations</option><option>Below Expectations</option>
            </select>
          </div>
          <div className="fg"><label className="f-label">Current Rating (/ 5)</label><input className="f-input" type="number" step="0.1" min="1" max="5" defaultValue={data.currentRating} /></div>
          <div className="fg"><label className="f-label">Total Goals</label><input className="f-input" type="number" value={f.goals} onChange={e => s('goals', e.target.value)} /></div>
          <div className="fg"><label className="f-label">Completed Goals</label><input className="f-input" type="number" value={f.done} onChange={e => s('done', e.target.value)} /></div>
          <div className="fg"><label className="f-label">Next Review Date</label><input className="f-input" type="date" defaultValue={data.nextReview} /></div>
          <div className="fg"><label className="f-label">Reviewer</label><input className="f-input" defaultValue="Direct Manager" /></div>
          <div className="fg full"><label className="f-label">Comments</label><textarea className="f-textarea" value={f.comments} onChange={e => s('comments', e.target.value)} /></div>
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={onClose}>Update Review</button>
      </div>
    </>
  );
};

const ViewModal = ({ data, onClose }) => {
  const skills = [
    { name: 'Technical Skills', v: 4.7 },
    { name: 'Communication',    v: 4.3 },
    { name: 'Leadership',       v: 4.1 },
    { name: 'Problem Solving',  v: 4.6 },
    { name: 'Teamwork',         v: 4.4 },
  ];
  return (
    <>
      <div className="modal-head" style={{ paddingBottom: '0.9rem' }}>
        <div className="modal-title">Performance Details</div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="view-band">
        <div className="view-av-lg" style={{ background: data.color }}>{data.employee.charAt(0)}</div>
        <div>
          <div className="view-name">{data.employee}</div>
          <div className="view-pos">{data.position} · {data.department}</div>
          <Stars rating={data.currentRating} />
        </div>
        <div style={{ marginLeft: 'auto' }}><AppraisalBadge a={data.appraisal} /></div>
      </div>
      <div className="modal-body">
        <div className="stat-grid-3">
          <div className="stat-box"><div className="stat-v" style={{ color: '#059669' }}>{data.completedGoals}/{data.goals}</div><div className="stat-l">Goals Done</div></div>
          <div className="stat-box"><div className="stat-v" style={{ color: '#4f46e5' }}>{data.currentRating}</div><div className="stat-l">Rating</div></div>
          <div className="stat-box"><div className="stat-v" style={{ color: '#d97706' }}>{Math.round((data.completedGoals / data.goals) * 100)}%</div><div className="stat-l">Completion</div></div>
        </div>
        <div className="divider"><div className="divider-line" /><span className="divider-label">Skill Breakdown</span><div className="divider-line" /></div>
        <div className="skill-list">
          {skills.map((sk, i) => (
            <div className="skill-row" key={sk.name}>
              <span className="skill-name">{sk.name}</span>
              <div className="skill-track"><div className="skill-fill" style={{ '--w': `${(sk.v / 5) * 100}%`, animationDelay: `${i * 0.08}s` }} /></div>
              <span className="skill-score">{sk.v}</span>
            </div>
          ))}
        </div>
        <div className="divider"><div className="divider-line" /><span className="divider-label">Review Timeline</span><div className="divider-line" /></div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="stat-box" style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-1)' }}>{data.lastReview}</div>
            <div className="stat-l">Last Review</div>
          </div>
          <div className="stat-box" style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent)' }}>{data.nextReview}</div>
            <div className="stat-l">Next Review</div>
          </div>
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn btn-ghost" onClick={onClose}>Close</button>
        <button className="btn btn-primary" onClick={() => {}}>Export PDF</button>
      </div>
    </>
  );
};

const DeleteModal = ({ data, onClose }) => (
  <>
    <div className="modal-head">
      <div className="modal-title">Delete Record</div>
      <button className="close-btn" onClick={onClose}>✕</button>
    </div>
    <div className="modal-body" style={{ textAlign: 'center', padding: '1.75rem 1.5rem' }}>
      <div className="del-icon">🗑️</div>
      <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Delete this review permanently?</div>
      <div style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.65 }}>
        {`You're about to remove the performance record for`}{' '}
        <strong style={{ color: 'var(--text-1)' }}>{data.employee}</strong>{' '}
        ({data.employeeId}). This action cannot be undone.
      </div>
    </div>
    <div className="modal-foot">
      <button className="btn btn-ghost" onClick={onClose}>Keep Record</button>
      <button className="btn btn-danger" onClick={onClose}>Yes, Delete</button>
    </div>
  </>
);

/* ── MAIN COMPONENT ── */
export default function Performance() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [page] = useState(1);

  const filtered = performanceData.filter(e =>
    [e.employee, e.department, e.position].some(f => f.toLowerCase().includes(search.toLowerCase()))
  );

  const avgRating = (performanceData.reduce((s, e) => s + e.currentRating, 0) / performanceData.length).toFixed(1);
  const exceedCount = performanceData.filter(e => e.appraisal === 'Exceeds Expectations').length;
  const totalGoals = performanceData.reduce((s, e) => s + e.goals, 0);
  const doneGoals = performanceData.reduce((s, e) => s + e.completedGoals, 0);

  const open = (type, data) => setModal({ type, data });
  const close = () => setModal(null);

  return (
    <>
      <style>{css}</style>
      <div className="perf-page">
        {/* Header */}
        <div className="perf-header">
          <div>
            <div className="header-tag">HR Dashboard</div>
            <h1 className="page-title">Performance <em>Reviews</em></h1>
            <p className="page-sub">Track, evaluate and manage employee performance across all teams</p>
          </div>
          <div className="header-date">June 2024 · Q2 Cycle</div>
        </div>

        {/* KPI Strip */}
        <div className="kpi-strip">
          <div className="kpi-card">
            <div className="kpi-accent-bar" style={{ background: '#4f46e5' }} />
            <div className="kpi-icon" style={{ background: '#eef2ff' }}>👥</div>
            <div className="kpi-label">Total Employees</div>
            <div className="kpi-value">{performanceData.length}</div>
            <div className="kpi-foot">Under review <span className="chip chip-blue">+2 this cycle</span></div>
          </div>
          <div className="kpi-card">
            <div className="kpi-accent-bar" style={{ background: '#059669' }} />
            <div className="kpi-icon" style={{ background: '#ecfdf5' }}>⭐</div>
            <div className="kpi-label">Average Rating</div>
            <div className="kpi-value">{avgRating}</div>
            <div className="kpi-foot">Out of 5.0 <span className="chip chip-green">↑ 0.2</span></div>
          </div>
          <div className="kpi-card">
            <div className="kpi-accent-bar" style={{ background: '#d97706' }} />
            <div className="kpi-icon" style={{ background: '#fffbeb' }}>🏆</div>
            <div className="kpi-label">Exceeding Goals</div>
            <div className="kpi-value">{exceedCount}<span style={{ fontSize: '1rem', color: 'var(--text-3)', fontWeight: 500 }}>/{performanceData.length}</span></div>
            <div className="kpi-foot">Employees <span className="chip chip-amber">75%</span></div>
          </div>
          <div className="kpi-card">
            <div className="kpi-accent-bar" style={{ background: '#0891b2' }} />
            <div className="kpi-icon" style={{ background: '#ecfeff' }}>🎯</div>
            <div className="kpi-label">Goals Completed</div>
            <div className="kpi-value">{doneGoals}<span style={{ fontSize: '1rem', color: 'var(--text-3)', fontWeight: 500 }}>/{totalGoals}</span></div>
            <div className="kpi-foot">Across all staff <span className="chip chip-blue">{Math.round((doneGoals/totalGoals)*100)}%</span></div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-wrap">
              <span className="search-ico">🔍</span>
              <input
                className="search-input"
                placeholder="Search by name, team, role…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="pill-btn">⇅ Sort</button>
            <button className="pill-btn">▾ Filter</button>
          </div>
          <button className="add-btn" onClick={() => open('create')}>
            <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span> Add Review
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="t-head">
            <div className="th">Employee</div>
            <div className="th">Department</div>
            <div className="th">Position</div>
            <div className="th">Appraisal</div>
            <div className="th">Progress</div>
            <div className="th">Last Review</div>
            <div className="th">Actions</div>
          </div>
          <div className="t-body">
            {filtered.map((emp, i) => (
              <div key={emp.id} className="t-row" style={{ animationDelay: `${0.05 * i}s` }}>
                <div className="emp-cell">
                  <div className="emp-av" style={{ background: emp.color }}>{emp.employee.charAt(0)}</div>
                  <div>
                    <div className="emp-name">{emp.employee}</div>
                    <div className="emp-id">{emp.employeeId}</div>
                  </div>
                </div>
                <div className="cell-text">{emp.department}</div>
                <div className="cell-pos">{emp.position}</div>
                <div><AppraisalBadge a={emp.appraisal} /></div>
                <div className="goals-cell">
                  <span className="goals-nums">{emp.completedGoals}/{emp.goals}</span>
                  <ProgressBar pct={(emp.completedGoals / emp.goals) * 100} delay={`${0.4 + i * 0.05}s`} />
                </div>
                <div className="date-cell">{emp.lastReview}</div>
                <div className="row-actions">
                  <button className="act-btn view" title="View"   onClick={() => open('view',   emp)}>👁</button>
                  <button className="act-btn edit" title="Edit"   onClick={() => open('edit',   emp)}>✏️</button>
                  <button className="act-btn del"  title="Delete" onClick={() => open('delete', emp)}>🗑</button>
                </div>
              </div>
            ))}
          </div>
          <div className="t-footer">
            <span className="t-footer-info">Showing {filtered.length} of {performanceData.length} employees</span>
            <div className="pagination">
              <button className="pg-btn">‹</button>
              <button className="pg-btn active">1</button>
              <button className="pg-btn">2</button>
              <button className="pg-btn">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && close()}>
          <div className={`modal ${modal.type === 'delete' ? 'modal-sm' : ''}`}>
            {modal.type === 'create' && <CreateModal onClose={close} />}
            {modal.type === 'view'   && <ViewModal   data={modal.data} onClose={close} />}
            {modal.type === 'edit'   && <EditModal   data={modal.data} onClose={close} />}
            {modal.type === 'delete' && <DeleteModal data={modal.data} onClose={close} />}
          </div>
        </div>
      )}
    </>
  );
}
