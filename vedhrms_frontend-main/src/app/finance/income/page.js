// "use client"
// import * as React from 'react';
// import { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Chip,
//   Avatar,
//   Pagination,
//   Stack,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';
// import {
//   Add,
//   Search,
//   Download,
//   PictureAsPdf,
//   VisibilityOutlined,
//   EditOutlined,
//   DeleteOutline
// } from '@mui/icons-material';
// import CommonDialog from '@/components/commonDialog';
// import Create from '@/components/Finance/income/Create';
// import Edit from '@/components/Finance/income/Edit';
// import View from '@/components/Finance/income/View';
// import Delete from '@/components/Finance/income/Delete';


// export default function Income(){
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(10);
//   const [ViewData, setViewData] = useState(null);
//     const [editData, setEditData] = useState(null);
//     const [openData, setOpenData] = useState(false);
//     const [viewShow, setViewShow] = useState(false);
//     const [editShow, setEditShow] = useState(false);
//     const [deleteShow, setDeleteShow] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     amount: "",
//     category: "",
//     branch: "",
//     date: "",
//     client: "",
//     project: "",
//     paymentMethod: "",
//     dueDate: "",
//     receivedDate: "",
//     description: ""
//   });

//   const createData = (id, name, type, amount, category, branch, date, client, project, paymentMethod, dueDate, receivedDate, description) => {
//     return {
//       id,
//       name,
//       type,
//       amount,
//       category,
//       branch,
//       date,
//       client,
//       project,
//       paymentMethod,
//       dueDate,
//       receivedDate,
//       description
//     };
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active':
//         return 'hrms-badge-success';
//       case 'Inactive':
//         return 'hrms-badge-error';
//       case 'Pending':
//         return 'hrms-badge-warning';
//       default:
//         return 'hrms-badge-default';
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'Recurring':
//         return '#3b82f6';
//       case 'One-time':
//         return '#8b5cf6';
//       default:
//         return '#6b7280';
//     }
//   };

//   const getCategoryColor = (category) => {
//     switch (category) {
//       case 'Software':
//         return '#10b981';
//       case 'Service':
//         return '#f59e0b';
//       case 'Education':
//         return '#3b82f6';
//       case 'Marketing':
//         return '#ef4444';
//       case 'Sales':
//         return '#8b5cf6';
//       default:
//         return '#6b7280';
//     }
//   };

//     const handleView = (row) => {
//     setViewData(row);
//     setViewShow(true);
//   };

//   const handleEdit = (data) => {
//     setEditData(data);
//     setFormData(data);
//     setEditShow(true);
//   };

//   const handleFormChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleDelete = (income) => {
//     setViewData(income);
//     setDeleteShow(true);
//   };
  
//   const handleClose = () => {
//     setOpenData(false);
//     setViewShow(false);
//     setEditShow(false);
//     setDeleteShow(false);
//     setViewData(null);
//     setFormData({
//       id: "",
//       name: "",
//       type: "",
//       amount: "",
//       category: "",
//       branch: "",
//       date: "",
//       status: "Active",
//       client: "",
//       project: "",
//       paymentMethod: "",
//       invoiceNumber: "",
//       dueDate: "",
//       receivedDate: "",
//       description: ""
//     });
//   };

//   const handleCreate = (data) => {
//      setOpenData(false);
//   };

//   const handleUpdate = (data) => {
//     setEditShow(false);
//   };

//   const handleDeleteConfirm = () => {
//     setDeleteShow(false);
//     setViewData(null);
//   };

// const incomeData = [
//   createData("INC001", "HRMS Software License", "Recurring", 150000, "Software", "Head Office", "2024-01-15", "TechCorp Solutions", "HRMS Implementation", "Bank Transfer", "2024-01-30", "2024-01-28", "Annual HRMS software license renewal"),
//   createData("INC002", "Employee Training Program", "One-time", 75000, "Education", "Delhi Branch", "2024-01-20", "Global Training Inc", "Leadership Development", "Cheque", "2024-02-15", "2024-02-10", "Executive leadership training program"),
//   createData("INC003", "Payroll Processing Service", "Recurring", 45000, "Service", "Bangalore Branch", "2024-01-25", "PayrollPro Services", "Monthly Payroll", "Bank Transfer", "2024-02-05", "2024-02-03", "Monthly payroll processing and compliance"),
//   createData("INC004", "Recruitment Campaign", "One-time", 120000, "Marketing", "Chennai Branch", "2024-01-30", "Digital Marketing Co", "Tech Hiring Campaign", "Bank Transfer", "2024-02-20", "2024-02-18", "Digital recruitment campaign for tech positions"),
//   createData("INC005", "Performance Management Tool", "One-time", 200000, "Software", "Kolkata Branch", "2024-02-01", "PerfTech Solutions", "Performance System", "Bank Transfer", "2024-02-25", "2024-02-22", "Performance management software implementation"),
//   createData("INC006", "Cloud Infrastructure", "Recurring", 85000, "Software", "Hyderabad Branch", "2024-02-05", "CloudTech Services", "AWS Infrastructure", "Bank Transfer", "2024-03-05", "2024-03-02", "Monthly cloud hosting and infrastructure"),
//   createData("INC007", "Legal Compliance Training", "One-time", 95000, "Education", "Pune Branch", "2024-02-10", "LegalEdu Institute", "Compliance Training", "Bank Transfer", "2024-03-10", "", "Legal compliance training for HR team"),
//   createData("INC008", "Employee Wellness Program", "Recurring", 60000, "Service", "Jaipur Branch", "2024-02-15", "WellnessFirst", "Health & Wellness", "Bank Transfer", "2024-03-15", "2024-03-12", "Quarterly employee wellness program"),
//   createData("INC009", "Security Audit Service", "One-time", 110000, "Service", "Kochi Branch", "2024-02-20", "SecureAudit Pro", "Security Assessment", "Cheque", "2024-03-20", "2024-03-18", "Annual security audit and compliance check"),
//   createData("INC010", "Employee Benefits Platform", "Recurring", 70000, "Software", "Ahmedabad Branch", "2024-02-25", "BenefitsTech", "Benefits Management", "Bank Transfer", "2024-03-25", "2024-03-22", "Monthly employee benefits platform subscription"),
//   createData("INC011", "HR Analytics Dashboard", "One-time", 180000, "Software", "Head Office", "2024-03-01", "AnalyticsPro", "HR Analytics", "Bank Transfer", "2024-03-30", "2024-03-28", "Custom HR analytics dashboard development"),
//   createData("INC012", "Employee Engagement Survey", "One-time", 45000, "Service", "Delhi Branch", "2024-03-05", "EngageMetrics", "Employee Survey", "Bank Transfer", "2024-04-05", "2024-04-02", "Annual employee engagement survey and analysis"),
// ];

// // Filter data based on search
// const filteredData = incomeData.filter(income =>
//   income.name.toLowerCase().includes(search.toLowerCase()) ||
//   income.type.toLowerCase().includes(search.toLowerCase()) ||
//   income.category.toLowerCase().includes(search.toLowerCase()) ||
//   income.branch.toLowerCase().includes(search.toLowerCase()) ||
//   income.id.toLowerCase().includes(search.toLowerCase()) ||
//   income.client.toLowerCase().includes(search.toLowerCase()) ||
//   income.project.toLowerCase().includes(search.toLowerCase()) ||
//   income.paymentMethod.toLowerCase().includes(search.toLowerCase())
// );

// // Pagination
// const startIndex = (page - 1) * rowsPerPage;
// const endIndex = startIndex + rowsPerPage;
// const paginatedData = filteredData.slice(startIndex, endIndex);
// const totalPages = Math.ceil(filteredData.length / rowsPerPage);




//   return (
//     <Box sx={{ padding: "0.5rem" }}>

//       {/* Search and Action Bar */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "1.5rem", gap: 2 }}>
//         <TextField
//           placeholder="Search by name, client, project, payment method..."
//           variant="outlined"
//           size="small"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{
//             width: "300px",
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "8px",
//               backgroundColor: "#fff",
//             }
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search sx={{ color: "#6b7280" }} />
//               </InputAdornment>
//             )
//           }}
//         />
        
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => setOpenData(true)}
//           sx={{
//             borderRadius: "8px",
//             textTransform: "none",
//             backgroundColor: "#3b82f6",
//             "&:hover": {
//               backgroundColor: "#2563eb"
//             }
//           }}
//         >
//           Add Income
//         </Button>
//       </Box>

//       {/* Table */}
//       <Box className="hrms-card">
//         <Box className="hrms-card-content" sx={{ padding: 0 }}>
//           <Table className="hrms-table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>S. No</TableCell>
//                 <TableCell>Income</TableCell>
//                 <TableCell>Client</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Branch</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//         <TableBody>
//               {paginatedData.map((income, index) => (
//                 <TableRow key={income.id}>
//                   <TableCell>{startIndex + index + 1}</TableCell>
//                   <TableCell>
//                     <Box>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         {income.name}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "#666" }}>
//                         {income.id}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         {income.client}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       label={income.type}
//                       size="small"
//                       sx={{
//                         backgroundColor: getTypeColor(income.type),
//                         color: "white",
//                         fontWeight: 500,
//                         fontSize: "0.75rem"
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: "#10b981" }}>
//                     ₹{income.amount.toLocaleString()}
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       label={income.category}
//                       size="small"
//                       sx={{
//                         backgroundColor: getCategoryColor(income.category),
//                         color: "white",
//                         fontWeight: 500,
//                         fontSize: "0.75rem"
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 500, color: "#374151" }}>{income.branch}</TableCell>
//                   <TableCell sx={{ fontWeight: 500, color: "#374151" }}>{new Date(income.date).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <Stack direction="row" spacing={1}>
//                       <IconButton
//                         size="small"
//                         onClick={() => handleView(income)}
//                         sx={{ color: "#3b82f6" }}
//                       >
//                         <VisibilityOutlined fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         size="small"
//                         onClick={() => handleEdit(income)}
//                         sx={{ color: "#6b7280" }}
//                       >
//                         <EditOutlined fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         size="small"
//                         onClick={() => handleDelete(income)}
//                         sx={{ color: "#ef4444" }}
//                       >
//                         <DeleteOutline fontSize="small" />
//                       </IconButton>
//                     </Stack>
//                   </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//         </Box>

//         {/* Pagination */}
//         <Box sx={{ 
//           display: "flex", 
//           justifyContent: "space-between", 
//           alignItems: "center", 
//           padding: "1rem",
//           borderTop: "1px solid #e5e7eb"
//         }}>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Typography variant="body2" color="text.secondary">
//               Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
//             </Typography>
//           </Stack>
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={(event, value) => setPage(value)}
//             color="primary"
//             shape="rounded"
//             size="small"
//           />
//         </Box>
//       </Box>

//       {/* Dialog */}
//     <CommonDialog
//           open={openData || viewShow || editShow || deleteShow}
//           onClose={handleClose}
//           dialogTitle={
//             openData
//               ? "Add New Income"
//               : viewShow
//               ? "View Income Details"
//               : editShow
//               ? "Edit Income"
//               : deleteShow
//               ? "Delete Income"
//               : ""
//           }
//         dialogContent={
//           openData ? (
//             <Create formData={formData} handleInputChange={handleFormChange} />
//           ) : viewShow ? (
//             <View selectedData={ViewData} getStatusColor={getStatusColor} />
//           ) : editShow ? (
//             <Edit formData={formData} handleInputChange={handleFormChange} />
//           ) : deleteShow ? (
//             <Delete selectedData={ViewData} />
//           ) : null
//         }
//         primaryAction={openData || editShow || deleteShow}
//         primaryActionText={openData ? "Create" : editShow ? "Update" : "Delete"}
//         primaryActionColor={deleteShow ? "error" : "primary"}
//         onPrimaryAction={openData ? handleCreate : editShow ? handleUpdate : handleDeleteConfirm}
//         secondaryActionText={viewShow ? "Close" : "Cancel"}
//         showActions={!viewShow}
//         maxWidth={deleteShow ? "xs" : "md"}
//         fullWidth={!deleteShow}
//       />
//     </Box>
//   )
// }








"use client"
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Chip, Pagination, Stack
} from '@mui/material';
import {
  Add, Search, VisibilityOutlined, EditOutlined, DeleteOutline,
  TrendingUp, AccountBalanceWallet, Receipt, FilterList
} from '@mui/icons-material';
import CommonDialog from '@/components/commonDialog';
import Create from '@/components/Finance/income/Create';
import Edit from '@/components/Finance/income/Edit';
import View from '@/components/Finance/income/View';
import Delete from '@/components/Finance/income/Delete';

/* ─── Keyframe Injection ─────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

  :root {
    --ink:       #0f172a;
    --ink-2:     #334155;
    --ink-3:     #64748b;
    --surface:   #ffffff;
    --surface-2: #f8fafc;
    --surface-3: #f1f5f9;
    --border:    #e2e8f0;
    --accent:    #2563eb;
    --accent-2:  #0ea5e9;
    --green:     #10b981;
    --amber:     #f59e0b;
    --rose:      #f43f5e;
    --violet:    #8b5cf6;
    --shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md: 0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
    --shadow-lg: 0 12px 40px rgba(15,23,42,0.12), 0 4px 12px rgba(15,23,42,0.06);
    --radius:    14px;
  }

  * { box-sizing: border-box; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
    70%  { box-shadow: 0 0 0 10px rgba(37,99,235,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatBubble {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-8px) rotate(1deg); }
    66%       { transform: translateY(-4px) rotate(-1deg); }
  }
  @keyframes slideInRow {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .income-page { font-family: 'DM Sans', sans-serif; }

  .stat-card {
    background: var(--surface);
    border-radius: var(--radius);
    padding: 1.4rem 1.6rem;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    position: relative;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: var(--radius) var(--radius) 0 0;
  }
  .stat-card-blue::before  { background: linear-gradient(90deg, #2563eb, #38bdf8); }
  .stat-card-green::before { background: linear-gradient(90deg, #10b981, #34d399); }
  .stat-card-violet::before{ background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
  .stat-card-amber::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }

  .stat-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    animation: floatBubble 4s ease-in-out infinite;
  }

  .income-table-wrapper {
    background: var(--surface);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    animation: fadeSlideUp 0.6s 0.2s ease both;
  }

  .toolbar-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border);
    background: var(--surface-2);
  }

  .search-field .MuiOutlinedInput-root {
    border-radius: 10px !important;
    background: var(--surface) !important;
    font-family: 'DM Sans', sans-serif !important;
    font-size: 0.875rem !important;
    transition: box-shadow 0.2s !important;
  }
  .search-field .MuiOutlinedInput-root:hover,
  .search-field .MuiOutlinedInput-root.Mui-focused {
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12) !important;
  }
  .search-field .MuiOutlinedInput-notchedOutline { border-color: var(--border) !important; }
  .search-field .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--accent) !important;
  }

  .add-btn {
    font-family: 'DM Sans', sans-serif !important;
    font-weight: 600 !important;
    border-radius: 10px !important;
    text-transform: none !important;
    padding: 8px 18px !important;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
    box-shadow: 0 2px 8px rgba(37,99,235,0.30) !important;
    transition: all 0.2s ease !important;
    letter-spacing: 0.01em !important;
  }
  .add-btn:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%) !important;
    box-shadow: 0 4px 16px rgba(37,99,235,0.40) !important;
    transform: translateY(-1px) !important;
    animation: pulse-ring 1.2s ease !important;
  }
  .add-btn:active { transform: translateY(0px) !important; }

  .income-table .MuiTableHead-root .MuiTableRow-root {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
  }
  .income-table .MuiTableHead-root .MuiTableCell-root {
    font-family: 'Syne', sans-serif !important;
    font-weight: 600 !important;
    font-size: 0.78rem !important;
    color: var(--ink-3) !important;
    letter-spacing: 0.07em !important;
    text-transform: uppercase !important;
    border-bottom: 2px solid var(--border) !important;
    padding: 14px 16px !important;
    white-space: nowrap !important;
  }

  .income-table .MuiTableBody-root .MuiTableRow-root {
    transition: background 0.18s ease, transform 0.18s ease;
    cursor: pointer;
  }
  .income-table .MuiTableBody-root .MuiTableRow-root:hover {
    background: linear-gradient(90deg, rgba(37,99,235,0.04) 0%, rgba(14,165,233,0.02) 100%) !important;
  }
  .income-table .MuiTableBody-root .MuiTableCell-root {
    font-family: 'DM Sans', sans-serif !important;
    font-size: 0.875rem !important;
    border-bottom: 1px solid var(--border) !important;
    padding: 13px 16px !important;
    color: var(--ink-2) !important;
  }

  .action-btn {
    width: 32px !important; height: 32px !important;
    border-radius: 8px !important;
    transition: all 0.18s ease !important;
  }
  .action-btn-view:hover  { background: rgba(37,99,235,0.10) !important; transform: scale(1.12) !important; }
  .action-btn-edit:hover  { background: rgba(16,185,129,0.10) !important; transform: scale(1.12) !important; }
  .action-btn-del:hover   { background: rgba(244,63,94,0.10) !important;  transform: scale(1.12) !important; }

  .amount-cell {
    font-weight: 700 !important;
    font-family: 'Syne', sans-serif !important;
    letter-spacing: -0.01em !important;
  }

  .pagination-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    background: var(--surface-2);
    border-top: 1px solid var(--border);
  }

  .page-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    color: var(--ink-3);
    background: var(--surface-3);
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid var(--border);
  }

  .section-heading {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
`;

/* ─── Animated Counter ───────────────────────────────────── */
function AnimatedNumber({ value, prefix = '', duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * value));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);
  return <span>{prefix}{display.toLocaleString()}</span>;
}

/* ─── Stat Card ──────────────────────────────────────────── */
function StatCard({ label, value, prefix, icon, colorClass, iconBg, iconColor, delay }) {
  return (
    <div className={`stat-card ${colorClass}`} style={{ animationDelay: delay }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography sx={{ fontFamily: "'DM Sans'", fontSize: '0.8rem', fontWeight: 500, color: 'var(--ink-3)', mb: 0.5, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            {label}
          </Typography>
          <Typography sx={{ fontFamily: "'Syne'", fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            <AnimatedNumber value={value} prefix={prefix} />
          </Typography>
        </Box>
        <div className={`stat-icon`} style={{ background: iconBg }}>
          {React.cloneElement(icon, { sx: { fontSize: 22, color: iconColor } })}
        </div>
      </Box>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function Income() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [ViewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "", type: "", amount: "", category: "", branch: "",
    date: "", client: "", project: "", paymentMethod: "",
    dueDate: "", receivedDate: "", description: ""
  });

  const createData = (id, name, type, amount, category, branch, date, client, project, paymentMethod, dueDate, receivedDate, description) =>
    ({ id, name, type, amount, category, branch, date, client, project, paymentMethod, dueDate, receivedDate, description });

  const getStatusColor = (s) => ({ Active: 'hrms-badge-success', Inactive: 'hrms-badge-error', Pending: 'hrms-badge-warning' }[s] || 'hrms-badge-default');

  const TYPE_COLORS   = { Recurring: '#2563eb', 'One-time': '#8b5cf6' };
  const CAT_COLORS    = { Software: '#10b981', Service: '#f59e0b', Education: '#3b82f6', Marketing: '#ef4444', Sales: '#8b5cf6' };
  const TYPE_BG       = { Recurring: 'rgba(37,99,235,0.10)', 'One-time': 'rgba(139,92,246,0.10)' };
  const CAT_BG        = { Software: 'rgba(16,185,129,0.10)', Service: 'rgba(245,158,11,0.10)', Education: 'rgba(59,130,246,0.10)', Marketing: 'rgba(239,68,68,0.10)', Sales: 'rgba(139,92,246,0.10)' };

  const handleView   = (r) => { setViewData(r); setViewShow(true); };
  const handleEdit   = (d) => { setEditData(d); setFormData(d); setEditShow(true); };
  const handleDelete = (r) => { setViewData(r); setDeleteShow(true); };
  const handleFormChange = (f, v) => setFormData(p => ({ ...p, [f]: v }));

  const handleClose  = () => {
    setOpenData(false); setViewShow(false); setEditShow(false); setDeleteShow(false); setViewData(null);
    setFormData({ id:"", name:"", type:"", amount:"", category:"", branch:"", date:"", status:"Active", client:"", project:"", paymentMethod:"", invoiceNumber:"", dueDate:"", receivedDate:"", description:"" });
  };

  const incomeData = [
    createData("INC001","HRMS Software License","Recurring",150000,"Software","Head Office","2024-01-15","TechCorp Solutions","HRMS Implementation","Bank Transfer","2024-01-30","2024-01-28","Annual HRMS software license renewal"),
    createData("INC002","Employee Training Program","One-time",75000,"Education","Delhi Branch","2024-01-20","Global Training Inc","Leadership Development","Cheque","2024-02-15","2024-02-10","Executive leadership training program"),
    createData("INC003","Payroll Processing Service","Recurring",45000,"Service","Bangalore Branch","2024-01-25","PayrollPro Services","Monthly Payroll","Bank Transfer","2024-02-05","2024-02-03","Monthly payroll processing and compliance"),
    createData("INC004","Recruitment Campaign","One-time",120000,"Marketing","Chennai Branch","2024-01-30","Digital Marketing Co","Tech Hiring Campaign","Bank Transfer","2024-02-20","2024-02-18","Digital recruitment campaign for tech positions"),
    createData("INC005","Performance Management Tool","One-time",200000,"Software","Kolkata Branch","2024-02-01","PerfTech Solutions","Performance System","Bank Transfer","2024-02-25","2024-02-22","Performance management software implementation"),
    createData("INC006","Cloud Infrastructure","Recurring",85000,"Software","Hyderabad Branch","2024-02-05","CloudTech Services","AWS Infrastructure","Bank Transfer","2024-03-05","2024-03-02","Monthly cloud hosting and infrastructure"),
    createData("INC007","Legal Compliance Training","One-time",95000,"Education","Pune Branch","2024-02-10","LegalEdu Institute","Compliance Training","Bank Transfer","2024-03-10","","Legal compliance training for HR team"),
    createData("INC008","Employee Wellness Program","Recurring",60000,"Service","Jaipur Branch","2024-02-15","WellnessFirst","Health & Wellness","Bank Transfer","2024-03-15","2024-03-12","Quarterly employee wellness program"),
    createData("INC009","Security Audit Service","One-time",110000,"Service","Kochi Branch","2024-02-20","SecureAudit Pro","Security Assessment","Cheque","2024-03-20","2024-03-18","Annual security audit and compliance check"),
    createData("INC010","Employee Benefits Platform","Recurring",70000,"Software","Ahmedabad Branch","2024-02-25","BenefitsTech","Benefits Management","Bank Transfer","2024-03-25","2024-03-22","Monthly employee benefits platform subscription"),
    createData("INC011","HR Analytics Dashboard","One-time",180000,"Software","Head Office","2024-03-01","AnalyticsPro","HR Analytics","Bank Transfer","2024-03-30","2024-03-28","Custom HR analytics dashboard development"),
    createData("INC012","Employee Engagement Survey","One-time",45000,"Service","Delhi Branch","2024-03-05","EngageMetrics","Employee Survey","Bank Transfer","2024-04-05","2024-04-02","Annual employee engagement survey and analysis"),
  ];

  const totalAmount   = incomeData.reduce((s, r) => s + r.amount, 0);
  const recurringCnt  = incomeData.filter(r => r.type === 'Recurring').length;
  const oneTimeCnt    = incomeData.filter(r => r.type === 'One-time').length;

  const filteredData  = incomeData.filter(i =>
    [i.name, i.type, i.category, i.branch, i.id, i.client, i.project, i.paymentMethod]
      .some(f => f.toLowerCase().includes(search.toLowerCase()))
  );

  const startIndex    = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages    = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <>
      <style>{STYLES}</style>
      <Box className="income-page" sx={{ p: '0.75rem 0.5rem', minHeight: '100vh', background: 'linear-gradient(160deg,#f8fafc 0%,#eff6ff 50%,#f0fdf4 100%)' }}>

        {/* ── Header ── */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, animation: 'fadeSlideUp 0.5s ease both' }}>
          <Box>
            <Typography className="section-heading" sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' }, mb: 0.25 }}>
              Income Overview
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans'", fontSize: '0.875rem', color: 'var(--ink-3)' }}>
              Track and manage all income streams
            </Typography>
          </Box>
        </Box>

        {/* ── Stat Cards ── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
          <StatCard label="Total Revenue"   value={totalAmount}  prefix="₹" icon={<AccountBalanceWallet />} colorClass="stat-card-green"  iconBg="rgba(16,185,129,0.12)"  iconColor="#10b981" delay="0s" />
          <StatCard label="Total Entries"   value={incomeData.length} prefix="" icon={<Receipt />}               colorClass="stat-card-blue"   iconBg="rgba(37,99,235,0.12)"   iconColor="#2563eb" delay="0.07s" />
          <StatCard label="Recurring"       value={recurringCnt} prefix="" icon={<TrendingUp />}             colorClass="stat-card-violet" iconBg="rgba(139,92,246,0.12)"  iconColor="#8b5cf6" delay="0.14s" />
          <StatCard label="One-time"        value={oneTimeCnt}   prefix="" icon={<FilterList />}             colorClass="stat-card-amber"  iconBg="rgba(245,158,11,0.12)"  iconColor="#f59e0b" delay="0.21s" />
        </Box>

        {/* ── Table Card ── */}
        <div className="income-table-wrapper">

          {/* Toolbar */}
          <div className="toolbar-row">
            <Typography className="section-heading" sx={{ fontSize: '1rem' }}>
              All Income Records
              <Box component="span" sx={{ ml: 1.5, fontFamily: "'DM Sans'", fontSize: '0.75rem', fontWeight: 500, color: 'var(--accent)', background: 'rgba(37,99,235,0.09)', px: 1.2, py: 0.3, borderRadius: '20px', border: '1px solid rgba(37,99,235,0.15)' }}>
                {filteredData.length} entries
              </Box>
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                className="search-field"
                placeholder="Search income, client, project…"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                sx={{ width: { xs: 180, sm: 280 } }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: 'var(--ink-3)', fontSize: 18 }} /></InputAdornment> }}
              />
              <Button
                className="add-btn"
                variant="contained"
                startIcon={<Add sx={{ fontSize: '18px !important' }} />}
                onClick={() => setOpenData(true)}
              >
                Add Income
              </Button>
            </Stack>
          </div>

          {/* Table */}
          <TableContainer component={Box} sx={{ overflowX: 'auto' }}>
            <Table className="income-table" sx={{ minWidth: 780 }}>
              <TableHead>
                <TableRow>
                  {['#', 'Income', 'Client', 'Type', 'Amount', 'Category', 'Branch', 'Date', 'Actions'].map(h => (
                    <TableCell key={h}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((income, idx) => (
                  <TableRow
                    key={income.id}
                    sx={{ animation: `slideInRow 0.35s ${idx * 0.04}s ease both` }}
                  >
                    <TableCell>
                      <Box sx={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: '0.8rem', color: 'var(--ink-3)', background: 'var(--surface-3)', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {startIndex + idx + 1}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.3 }}>
                        {income.name}
                      </Typography>
                      <Typography sx={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--ink-3)', mt: 0.25, background: 'var(--surface-3)', px: 0.8, py: 0.1, borderRadius: 4, display: 'inline-block' }}>
                        {income.id}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontFamily: "'DM Sans'", fontWeight: 500, fontSize: '0.875rem', color: 'var(--ink-2)' }}>
                        {income.client}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={income.type}
                        size="small"
                        sx={{
                          background: TYPE_BG[income.type] || 'rgba(107,114,128,0.10)',
                          color: TYPE_COLORS[income.type] || '#6b7280',
                          fontFamily: "'DM Sans'", fontWeight: 600, fontSize: '0.75rem',
                          border: `1px solid ${TYPE_COLORS[income.type]}30`,
                          height: 24,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography className="amount-cell" sx={{ fontSize: '0.95rem', color: 'var(--green)' }}>
                        ₹{income.amount.toLocaleString()}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={income.category}
                        size="small"
                        sx={{
                          background: CAT_BG[income.category] || 'rgba(107,114,128,0.10)',
                          color: CAT_COLORS[income.category] || '#6b7280',
                          fontFamily: "'DM Sans'", fontWeight: 600, fontSize: '0.75rem',
                          border: `1px solid ${CAT_COLORS[income.category] || '#6b7280'}30`,
                          height: 24,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontFamily: "'DM Sans'", fontWeight: 500, fontSize: '0.875rem', color: 'var(--ink-2)' }}>
                        {income.branch}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontFamily: "'DM Sans'", fontSize: '0.825rem', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
                        {new Date(income.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={0.5}>
                        <IconButton className="action-btn action-btn-view" size="small" onClick={() => handleView(income)} sx={{ color: '#2563eb' }}>
                          <VisibilityOutlined sx={{ fontSize: 17 }} />
                        </IconButton>
                        <IconButton className="action-btn action-btn-edit" size="small" onClick={() => handleEdit(income)} sx={{ color: '#10b981' }}>
                          <EditOutlined sx={{ fontSize: 17 }} />
                        </IconButton>
                        <IconButton className="action-btn action-btn-del" size="small" onClick={() => handleDelete(income)} sx={{ color: '#f43f5e' }}>
                          <DeleteOutline sx={{ fontSize: 17 }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div className="pagination-bar">
            <span className="page-label">
              {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} records
            </span>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              shape="rounded"
              size="small"
              sx={{
                '& .MuiPaginationItem-root': { fontFamily: "'DM Sans'", fontWeight: 500, borderRadius: '8px', fontSize: '0.8rem' },
                '& .Mui-selected': { background: 'linear-gradient(135deg,#2563eb,#1d4ed8) !important', color: '#fff !important' }
              }}
            />
          </div>
        </div>

        {/* Dialogs */}
        <CommonDialog
          open={openData || viewShow || editShow || deleteShow}
          onClose={handleClose}
          dialogTitle={openData ? "Add New Income" : viewShow ? "View Income Details" : editShow ? "Edit Income" : "Delete Income"}
          dialogContent={
            openData   ? <Create formData={formData} handleInputChange={handleFormChange} /> :
            viewShow   ? <View selectedData={ViewData} getStatusColor={getStatusColor} /> :
            editShow   ? <Edit formData={formData} handleInputChange={handleFormChange} /> :
            deleteShow ? <Delete selectedData={ViewData} /> : null
          }
          primaryAction={openData || editShow || deleteShow}
          primaryActionText={openData ? "Create" : editShow ? "Update" : "Delete"}
          primaryActionColor={deleteShow ? "error" : "primary"}
          onPrimaryAction={openData ? () => setOpenData(false) : editShow ? () => setEditShow(false) : () => { setDeleteShow(false); setViewData(null); }}
          secondaryActionText={viewShow ? "Close" : "Cancel"}
          showActions={!viewShow}
          maxWidth={deleteShow ? "xs" : "md"}
          fullWidth={!deleteShow}
        />
      </Box>
    </>
  );
}
