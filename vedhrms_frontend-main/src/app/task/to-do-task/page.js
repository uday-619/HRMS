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
//   Checkbox,
// } from "@mui/material";
// import CommonDialog from "@/components/commonDialog";
// import CreateTodo from "@/components/task/to-do-task/create";
// import EditTodo from "@/components/task/to-do-task/edit";
// import ViewTodo from "@/components/task/to-do-task/view";
// import DeleteTodo from "@/components/task/to-do-task/delete";
// import {
//   Add,
//   EditOutlined,
//   DeleteOutlined,
//   VisibilityOutlined,
//   Search,
//   FilterList,
//   Download,
//   CheckCircle,
//   RadioButtonUnchecked,
// } from "@mui/icons-material";

// const ToDoTaskPage = () => {
//   const [todoTasks, setTodoTasks] = useState([
//     {
//       id: "TODO001",
//       taskTitle: "Review Code Changes",
//       description: "Review the latest code changes in the HRMS project",
//       category: "Development",
//       priority: "High",
//       status: "Pending",
//       dueDate: "2024-02-15",
//       createdDate: "2024-01-20",
//       completed: false
//     },
//     {
//       id: "TODO002", 
//       taskTitle: "Update Documentation",
//       description: "Update API documentation for new endpoints",
//       category: "Documentation",
//       priority: "Medium",
//       status: "In Progress",
//       dueDate: "2024-02-20",
//       createdDate: "2024-01-22",
//       completed: false
//     },
//     {
//       id: "TODO003",
//       taskTitle: "Team Meeting Preparation",
//       description: "Prepare agenda for weekly team meeting",
//       category: "Meeting",
//       priority: "Low",
//       status: "Completed",
//       dueDate: "2024-02-10",
//       createdDate: "2024-01-18",
//       completed: true
//     }
//   ]);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterCategory, setFilterCategory] = useState("all");

//   // Dialog States
//   const [openData, setOpenData] = useState(false);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Form States
//   const [formData, setFormData] = useState({
//     taskTitle: "",
//     description: "",
//     category: "General",
//     priority: "Medium",
//     status: "Pending",
//     dueDate: "",
//     completed: false,
//     notes: ""
//   });

//   const handleClose = () => {
//     setOpenData(false);
//     setOpenView(false);
//     setOpenEdit(false);
//     setOpenDelete(false);
//     setSelectedTask(null);
//     setFormData({
//       taskTitle: "",
//       description: "",
//       category: "General",
//       priority: "Medium",
//       status: "Pending",
//       dueDate: "",
//       completed: false,
//       notes: ""
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleCreate = () => {
//     const newTask = {
//       id: `TODO${String(todoTasks.length + 1).padStart(3, '0')}`,
//       ...formData,
//       createdDate: new Date().toISOString().split('T')[0]
//     };
//     setTodoTasks([...todoTasks, newTask]);
//     handleClose();
//   };

//   const handleEdit = () => {
//     setTodoTasks(todoTasks.map(task => 
//       task.id === selectedTask.id 
//         ? { ...task, ...formData }
//         : task
//     ));
//     handleClose();
//   };

//   const handleDelete = () => {
//     setTodoTasks(todoTasks.filter(task => task.id !== selectedTask.id));
//     handleClose();
//   };

//   const handleToggleComplete = (taskId) => {
//     setTodoTasks(todoTasks.map(task => 
//       task.id === taskId 
//         ? { 
//             ...task, 
//             completed: !task.completed,
//             status: !task.completed ? "Completed" : "Pending"
//           }
//         : task
//     ));
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Completed': return 'hrms-badge-success';
//       case 'In Progress': return 'hrms-badge-warning';
//       case 'Pending': return 'hrms-badge-neutral';
//       case 'Overdue': return 'hrms-badge-error';
//       default: return 'hrms-badge-neutral';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'High': return 'hrms-badge-error';
//       case 'Medium': return 'hrms-badge-warning';
//       case 'Low': return 'hrms-badge-success';
//       default: return 'hrms-badge-neutral';
//     }
//   };

//   const filteredTasks = todoTasks.filter(task => {
//     const matchesSearch = task.taskTitle.toLowerCase().includes(search.toLowerCase()) ||
//                          task.description.toLowerCase().includes(search.toLowerCase()) ||
//                          task.category.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = filterStatus === "all" || task.status === filterStatus;
//     const matchesCategory = filterCategory === "all" || task.category === filterCategory;
    
//     return matchesSearch && matchesStatus && matchesCategory;
//   });

//   const completedTasks = todoTasks.filter(task => task.completed).length;
//   const totalTasks = todoTasks.length;
//   const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

//   return (
//     <Box sx={{ padding: "0.5rem" }}>
//       {/* Search and Create Button */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
//         <TextField
//           placeholder="Search tasks..."
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
//         <button 
//           className="hrms-btn hrms-btn-primary hrms-btn-fixed-height"
//           onClick={() => setOpenData(true)}
//         >
//           <Add />
//           Add To-do
//         </button>
//       </Box>

//       {/* To-Do Table */}
//       <Box className="hrms-card">
//         <Box className="hrms-card-content" sx={{ padding: 0 }}>
//           <Table className="hrms-table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>S. No.</TableCell>
//                 <TableCell>Task Title</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Priority</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredTasks
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((task, index) => (
//                   <TableRow key={task.id} sx={{ opacity: task.completed ? 0.7 : 1 }}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>
//                       <Typography 
//                         variant="subtitle2" 
//                         sx={{ 
//                           fontWeight: 600,
//                           textDecoration: task.completed ? "line-through" : "none",
//                           color: task.completed ? "#666" : "inherit"
//                         }}
//                       >
//                         {task.taskTitle}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{task.category}</TableCell>
//                     <TableCell>
//                       <Box className={`hrms-badge ${getPriorityColor(task.priority)}`}>
//                         {task.priority}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box className={`hrms-badge ${getStatusColor(task.status)}`}>
//                         {task.status}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{task.dueDate}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", gap: "0.25rem" }}>
//                         <IconButton 
//                           size="small"
//                           onClick={() => { setSelectedTask(task); setOpenView(true); }}
//                           sx={{ color: "#1976D2", fontSize: "16px" }}
//                         >
//                           <VisibilityOutlined />
//                         </IconButton>
//                         <IconButton 
//                           size="small"
//                           onClick={() => { 
//                             setSelectedTask(task); 
//                             setFormData({
//                               taskTitle: task.taskTitle,
//                               description: task.description,
//                               category: task.category,
//                               priority: task.priority,
//                               status: task.status,
//                               dueDate: task.dueDate,
//                               completed: task.completed,
//                               notes: task.notes || ""
//                             });
//                             setOpenEdit(true); 
//                           }}
//                           sx={{ color: "#000", fontSize: "16px" }}
//                         >
//                           <EditOutlined />
//                         </IconButton>
//                         <IconButton 
//                           size="small"
//                           onClick={() => { setSelectedTask(task); setOpenDelete(true); }}
//                           sx={{ color: "#d32f2f", fontSize: "16px" }}
//                         >
//                           <DeleteOutlined />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </Box>
//         <Box sx={{ padding: "0.75rem 1rem", borderTop: "1px solid #e5e5e5", backgroundColor: "#fafafa" }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Typography variant="body2" sx={{ color: "#333", fontWeight: 500, fontSize: "0.875rem" }}>
//               Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredTasks.length)} of {filteredTasks.length} tasks
//             </Typography>
//             <Pagination
//               count={Math.ceil(filteredTasks.length / rowsPerPage)}
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
//             ? "Add To-do List"
//             : openEdit
//             ? "Edit To-do List"
//             : openView
//             ? "Task Details"
//             : openDelete
//             ? "Delete Task"
//             : ""
//         }
//         dialogContent={
//           openData ? (
//             <CreateTodo 
//               formData={formData} 
//               handleInputChange={handleInputChange}
//               handleCreate={handleCreate}
//               handleClose={handleClose}
//             />
//           ) : openEdit ? (
//             <EditTodo 
//               formData={formData} 
//               handleInputChange={handleInputChange}
//               handleUpdate={handleEdit}
//               handleClose={handleClose}
//             />
//           ) : openView ? (
//             selectedTask && (
//               <ViewTodo 
//                 selectedTask={selectedTask} 
//                 getStatusColor={getStatusColor}
//                 getPriorityColor={getPriorityColor}
//                 handleClose={handleClose}
//               />
//             )
//           ) : openDelete ? (
//             selectedTask && (
//               <DeleteTodo 
//                 selectedTask={selectedTask}
//                 handleDelete={handleDelete}
//                 handleClose={handleClose}
//               />
//             )
//           ) : null
//         }
//         maxWidth={openDelete ? "xs" : "md"}
//       />
//     </Box>
//   );
// };

// export default ToDoTaskPage;



"use client";

import React, { useState, useEffect, useRef } from "react";

// ─── Inline styles & keyframes injected once ───────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .todo-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .todo-root { font-family: 'DM Sans', sans-serif; background: #f4f5f7; min-height: 100vh; color: #1a1b1e; }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0px rgba(34,160,100,0.35); }
    70%  { box-shadow: 0 0 0 8px rgba(34,160,100,0); }
    100% { box-shadow: 0 0 0 0px rgba(34,160,100,0); }
  }
  @keyframes shimmer {
    from { background-position: -400px 0; }
    to   { background-position: 400px 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes strikethrough {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes badgePop {
    0%   { transform: scale(0.7); opacity: 0; }
    60%  { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.94) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes progressFill {
    from { width: 0; }
    to   { width: var(--progress-w); }
  }

  .todo-root .card {
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 16px;
  }
  .todo-root .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 20px; font-size: 11.5px;
    font-weight: 500; letter-spacing: 0.3px; white-space: nowrap;
    animation: badgePop 0.25s ease both;
  }
  .todo-root .badge-high    { background: rgba(220,60,60,0.1);  color: #c0292929; border: 1px solid rgba(220,60,60,0.2); }
  .todo-root .badge-medium  { background: rgba(200,130,20,0.1); color: #a0620a; border: 1px solid rgba(200,130,20,0.2); }
  .todo-root .badge-low     { background: rgba(30,150,90,0.1); color: #1a7a50; border: 1px solid rgba(30,150,90,0.2); }
  .todo-root .badge-pending { background: rgba(100,100,130,0.1); color: #555570; border: 1px solid rgba(100,100,130,0.18); }
  .todo-root .badge-inprog  { background: rgba(50,100,200,0.1); color: #2a5bbf; border: 1px solid rgba(50,100,200,0.2); }
  .todo-root .badge-done    { background: rgba(30,150,90,0.1); color: #1a7a50; border: 1px solid rgba(30,150,90,0.2); }
  .todo-root .badge-overdue { background: rgba(220,60,60,0.1);  color: #c02929; border: 1px solid rgba(220,60,60,0.2); }

  .todo-root .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 0 18px; height: 40px; border-radius: 10px; font-size: 13.5px;
    font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer;
    border: none; transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
    outline: none; white-space: nowrap;
  }
  .todo-root .btn:active { transform: scale(0.97); }
  .todo-root .btn-primary {
    background: #22a064; color: #ffffff;
    box-shadow: 0 2px 16px rgba(34,160,100,0.28);
  }
  .todo-root .btn-primary:hover {
    background: #1b8a54;
    box-shadow: 0 4px 22px rgba(34,160,100,0.38);
    animation: pulse-ring 1s ease;
  }
  .todo-root .btn-ghost {
    background: rgba(0,0,0,0.04);
    border: 1px solid rgba(0,0,0,0.1);
    color: #555;
  }
  .todo-root .btn-ghost:hover { background: rgba(0,0,0,0.08); color: #222; }
  .todo-root .btn-danger { background: rgba(220,60,60,0.08); color: #c02929; border: 1px solid rgba(220,60,60,0.2); }
  .todo-root .btn-danger:hover { background: rgba(220,60,60,0.16); }

  .todo-root .icon-btn {
    width: 30px; height: 30px; border-radius: 8px; border: none;
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.15s, transform 0.1s; outline: none;
    background: transparent;
  }
  .todo-root .icon-btn:hover { transform: scale(1.12); }
  .todo-root .icon-btn:active { transform: scale(0.94); }
  .todo-root .icon-btn-view  { color: #2a5bbf; } .icon-btn-view:hover  { background: rgba(50,100,200,0.1); }
  .todo-root .icon-btn-edit  { color: #444; } .icon-btn-edit:hover  { background: rgba(0,0,0,0.07); }
  .todo-root .icon-btn-del   { color: #c02929; } .icon-btn-del:hover   { background: rgba(220,60,60,0.1); }
  .todo-root .icon-btn-check { color: #1a7a50; } .icon-btn-check:hover { background: rgba(30,150,90,0.1); }

  .todo-root input, .todo-root select, .todo-root textarea {
    font-family: 'DM Sans', sans-serif;
    background: #f8f9fa; border: 1px solid rgba(0,0,0,0.12);
    border-radius: 10px; color: #1a1b1e; font-size: 13.5px;
    padding: 0 12px; height: 40px; width: 100%; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .todo-root textarea { height: auto; padding: 10px 12px; resize: vertical; min-height: 80px; }
  .todo-root input:focus, .todo-root select:focus, .todo-root textarea:focus {
    border-color: #22a064; box-shadow: 0 0 0 3px rgba(34,160,100,0.12);
  }
  .todo-root select option { background: #ffffff; color: #1a1b1e; }
  .todo-root label { font-size: 12px; font-weight: 500; color: #888; letter-spacing: 0.4px; text-transform: uppercase; display: block; margin-bottom: 6px; }

  .todo-root table { width: 100%; border-collapse: collapse; }
  .todo-root thead th {
    padding: 13px 16px; text-align: left; font-size: 11px; font-weight: 600;
    letter-spacing: 0.8px; text-transform: uppercase; color: #999;
    border-bottom: 1px solid rgba(0,0,0,0.07);
  }
  .todo-root tbody tr {
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: background 0.15s;
    animation: rowIn 0.25s ease both;
  }
  .todo-root tbody tr:hover { background: rgba(0,0,0,0.02); }
  .todo-root tbody td { padding: 13px 16px; font-size: 13.5px; vertical-align: middle; }
  .todo-root tbody tr.completed-row td { opacity: 0.4; }

  .todo-root .task-title-text { font-weight: 500; font-size: 14px; position: relative; display: inline-block; }
  .todo-root .task-title-text.struck::after {
    content: ''; position: absolute; left: 0; top: 50%;
    height: 1.5px; background: #aaa;
    animation: strikethrough 0.3s ease both;
  }

  .todo-root .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 24px;
    animation: overlayIn 0.2s ease;
  }
  .todo-root .modal {
    background: #ffffff; border-radius: 20px;
    border: 1px solid rgba(0,0,0,0.1);
    width: 100%; max-width: 540px; max-height: 90vh;
    overflow-y: auto; position: relative;
    animation: modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
    box-shadow: 0 24px 80px rgba(0,0,0,0.18);
  }
  .todo-root .modal-sm { max-width: 380px; }
  .todo-root .modal-header {
    padding: 22px 24px 18px; border-bottom: 1px solid rgba(0,0,0,0.07);
    display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0;
    background: #ffffff; z-index: 1; border-radius: 20px 20px 0 0;
  }
  .todo-root .modal-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 600; color: #1a1b1e; }
  .todo-root .modal-body { padding: 24px; }
  .todo-root .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .todo-root .form-full { grid-column: 1 / -1; }

  .todo-root .stat-card {
    background: #ffffff; border: 1px solid rgba(0,0,0,0.07);
    border-radius: 14px; padding: 18px 20px;
    transition: border-color 0.2s, transform 0.2s;
    animation: fadeSlideUp 0.4s ease both;
  }
  .todo-root .stat-card:hover { border-color: rgba(34,160,100,0.3); transform: translateY(-2px); }
  .todo-root .stat-num { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700; color: #1a1b1e; }
  .todo-root .stat-label { font-size: 12px; color: #999; margin-top: 2px; letter-spacing: 0.3px; }

  .todo-root .progress-bar-bg { background: rgba(0,0,0,0.07); border-radius: 99px; height: 6px; overflow: hidden; }
  .todo-root .progress-bar-fill {
    height: 100%; background: linear-gradient(90deg, #22a064, #2a5bbf);
    border-radius: 99px;
    animation: progressFill 0.9s cubic-bezier(0.4,0,0.2,1) both;
    animation-delay: 0.4s;
  }

  .todo-root .search-wrap { position: relative; }
  .todo-root .search-wrap .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #aaa; pointer-events: none; }
  .todo-root .search-wrap input { padding-left: 36px; }

  .todo-root .filter-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .todo-root .filter-chip {
    padding: 5px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 500;
    border: 1px solid rgba(0,0,0,0.1); background: transparent; color: #888;
    cursor: pointer; transition: all 0.15s; white-space: nowrap;
  }
  .todo-root .filter-chip.active { background: #22a064; color: #ffffff; border-color: #22a064; }
  .todo-root .filter-chip:hover:not(.active) { border-color: rgba(34,160,100,0.4); color: #333; }

  .todo-root .view-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .todo-root .view-detail-item label { font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .todo-root .view-detail-item p { font-size: 14px; color: #333; font-weight: 500; }

  .todo-root .empty-state { text-align: center; padding: 60px 20px; color: #bbb; }
  .todo-root .empty-state svg { margin-bottom: 16px; opacity: 0.3; }
  .todo-root .empty-state p { font-size: 14px; }

  .todo-root .page-header { animation: fadeSlideDown 0.4s ease both; }
  .todo-root .toolbar { animation: fadeSlideDown 0.4s ease both; animation-delay: 0.05s; }
  .todo-root .stats-row > * { animation-delay: calc(var(--i) * 0.07s); }

  .todo-root ::-webkit-scrollbar { width: 6px; }
  .todo-root ::-webkit-scrollbar-track { background: transparent; }
  .todo-root ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 99px; }
  .todo-root ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
`;

// ─── SVG Icons ─────────────────────────────────────────────────────────────
const Icon = {
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Edit: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Circle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Alert: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Clipboard: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
};

// ─── Helpers ───────────────────────────────────────────────────────────────
const priorityBadge = (p) =>
  p === "High" ? "badge-high" : p === "Medium" ? "badge-medium" : "badge-low";

const statusBadge = (s) =>
  s === "Completed" ? "badge-done"
  : s === "In Progress" ? "badge-inprog"
  : s === "Overdue" ? "badge-overdue"
  : "badge-pending";

const statusDot = { Completed: "#1a7a50", "In Progress": "#2a5bbf", Pending: "#aaa", Overdue: "#c02929" };

const INITIAL_TASKS = [
  { id: "TODO001", taskTitle: "Review Code Changes", description: "Review the latest code changes in the HRMS project", category: "Development", priority: "High", status: "Pending", dueDate: "2024-02-15", createdDate: "2024-01-20", completed: false, notes: "" },
  { id: "TODO002", taskTitle: "Update Documentation", description: "Update API documentation for new endpoints", category: "Documentation", priority: "Medium", status: "In Progress", dueDate: "2024-02-20", createdDate: "2024-01-22", completed: false, notes: "Focus on the auth endpoints first" },
  { id: "TODO003", taskTitle: "Team Meeting Preparation", description: "Prepare agenda for weekly team meeting", category: "Meeting", priority: "Low", status: "Completed", dueDate: "2024-02-10", createdDate: "2024-01-18", completed: true, notes: "" },
  { id: "TODO004", taskTitle: "Fix Login Bug", description: "Resolve the authentication timeout issue", category: "Development", priority: "High", status: "In Progress", dueDate: "2024-02-18", createdDate: "2024-01-25", completed: false, notes: "" },
  { id: "TODO005", taskTitle: "Design System Update", description: "Sync new color tokens to the design file", category: "Design", priority: "Medium", status: "Pending", dueDate: "2024-02-22", createdDate: "2024-01-26", completed: false, notes: "" },
];

const BLANK_FORM = { taskTitle: "", description: "", category: "General", priority: "Medium", status: "Pending", dueDate: "", completed: false, notes: "" };

const STATUSES = ["All", "Pending", "In Progress", "Completed", "Overdue"];
const CATEGORIES = ["All", "Development", "Documentation", "Meeting", "Design", "General", "Other"];
const ROWS_PER_PAGE = 8;

// ─── Sub-components ────────────────────────────────────────────────────────
function CloseBtn({ onClick }) {
  return (
    <button className="icon-btn" onClick={onClick} style={{ color: "#aaa" }}>
      <Icon.X />
    </button>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label>{label}</label>
      {children}
    </div>
  );
}

function TaskForm({ formData, onChange, onSubmit, onClose, mode }) {
  return (
    <div className="modal-body">
      <div className="form-grid">
        <div className="form-full">
          <FormField label="Task Title">
            <input name="taskTitle" value={formData.taskTitle} onChange={onChange} placeholder="Enter task title…" />
          </FormField>
        </div>
        <div className="form-full">
          <FormField label="Description">
            <textarea name="description" value={formData.description} onChange={onChange} placeholder="Describe the task…" />
          </FormField>
        </div>
        <FormField label="Category">
          <select name="category" value={formData.category} onChange={onChange}>
            {["General", "Development", "Documentation", "Meeting", "Design", "Other"].map(c => <option key={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="Priority">
          <select name="priority" value={formData.priority} onChange={onChange}>
            {["High", "Medium", "Low"].map(p => <option key={p}>{p}</option>)}
          </select>
        </FormField>
        <FormField label="Status">
          <select name="status" value={formData.status} onChange={onChange}>
            {["Pending", "In Progress", "Completed", "Overdue"].map(s => <option key={s}>{s}</option>)}
          </select>
        </FormField>
        <FormField label="Due Date">
          <input type="date" name="dueDate" value={formData.dueDate} onChange={onChange} />
        </FormField>
        <div className="form-full">
          <FormField label="Notes">
            <textarea name="notes" value={formData.notes} onChange={onChange} placeholder="Any additional notes…" style={{ minHeight: 60 }} />
          </FormField>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={onSubmit}>
          {mode === "create" ? <><Icon.Plus /> Create Task</> : <><Icon.Check /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}

function ViewModal({ task, onClose, priorityBadge, statusBadge }) {
  return (
    <div className="modal-body">
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 18, fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#1a1b1e", marginBottom: 8 }}>
          {task.taskTitle}
        </p>
        <p style={{ fontSize: 13.5, color: "#777", lineHeight: 1.6 }}>{task.description}</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        <span className={`badge ${priorityBadge(task.priority)}`}>{task.priority}</span>
        <span className={`badge ${statusBadge(task.status)}`}>{task.status}</span>
        <span className="badge badge-pending">{task.category}</span>
      </div>
      <div className="view-detail-grid">
        {[
          ["Due Date", task.dueDate || "—"],
          ["Created", task.createdDate],
          ["Category", task.category],
          ["Completed", task.completed ? "Yes" : "No"],
        ].map(([l, v]) => (
          <div key={l} className="view-detail-item">
            <label>{l}</label>
            <p>{v}</p>
          </div>
        ))}
      </div>
      {task.notes && (
        <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(34,160,100,0.05)", borderRadius: 10, borderLeft: "3px solid #22a064" }}>
          <label style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px" }}>Notes</label>
          <p style={{ marginTop: 6, fontSize: 13.5, color: "#444", lineHeight: 1.6 }}>{task.notes}</p>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
        <button className="btn btn-ghost" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function DeleteModal({ task, onDelete, onClose }) {
  return (
    <div className="modal-body" style={{ textAlign: "center" }}>
      <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(220,60,60,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#c02929" }}>
        <Icon.Alert />
      </div>
      <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1b1e", marginBottom: 8 }}>Delete this task?</p>
      <p style={{ fontSize: 13, color: "#999", marginBottom: 24, lineHeight: 1.6 }}>
        <span style={{ color: "#444", fontWeight: 500 }}>{task.taskTitle}</span> will be permanently removed.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
const ToDoTaskPage = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(BLANK_FORM);
  const styleRef = useRef(false);

  useEffect(() => {
    if (styleRef.current) return;
    styleRef.current = true;
    const el = document.createElement("style");
    el.textContent = GLOBAL_STYLE;
    document.head.appendChild(el);
  }, []);

  const closeModal = () => { setModal(null); setSelected(null); setForm(BLANK_FORM); };
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const openEdit = (task) => {
    setSelected(task);
    setForm({ taskTitle: task.taskTitle, description: task.description, category: task.category, priority: task.priority, status: task.status, dueDate: task.dueDate, completed: task.completed, notes: task.notes || "" });
    setModal("edit");
  };

  const handleCreate = () => {
    if (!form.taskTitle.trim()) return;
    setTasks(t => [...t, { id: `TODO${String(t.length + 1).padStart(3, "0")}`, ...form, createdDate: new Date().toISOString().split("T")[0] }]);
    closeModal();
  };
  const handleEdit = () => {
    setTasks(t => t.map(x => x.id === selected.id ? { ...x, ...form } : x));
    closeModal();
  };
  const handleDelete = () => {
    setTasks(t => t.filter(x => x.id !== selected.id));
    closeModal();
  };
  const toggleComplete = (id) => {
    setTasks(t => t.map(x => x.id === id ? { ...x, completed: !x.completed, status: !x.completed ? "Completed" : "Pending" } : x));
  };

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase();
    const matchQ = t.taskTitle.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    const matchS = filterStatus === "All" || t.status === filterStatus;
    return matchQ && matchS;
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const visible = filtered.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  const done = tasks.filter(t => t.completed).length;
  const inProg = tasks.filter(t => t.status === "In Progress").length;
  const high = tasks.filter(t => t.priority === "High" && !t.completed).length;
  const rate = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div className="todo-root">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── Header ── */}
        <div className="page-header" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: "#22a064", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>Task Management</p>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: "#1a1b1e", lineHeight: 1.2 }}>
                My To-Do List
              </h1>
              <p style={{ marginTop: 6, fontSize: 13.5, color: "#999" }}>{tasks.length} tasks · {done} completed</p>
            </div>
            <button className="btn btn-primary" onClick={() => setModal("create")}>
              <Icon.Plus /> Add Task
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Total Tasks", val: tasks.length, accent: "#2a5bbf", i: 0 },
            { label: "Completed", val: done, accent: "#1a7a50", i: 1 },
            { label: "In Progress", val: inProg, accent: "#a06010", i: 2 },
            { label: "High Priority", val: high, accent: "#c02929", i: 3 },
          ].map(s => (
            <div key={s.label} className="stat-card" style={{ "--i": s.i }}>
              <div className="stat-num" style={{ color: s.accent }}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
          <div className="stat-card" style={{ "--i": 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <span className="stat-label" style={{ fontSize: 11 }}>Completion</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#22a064" }}>{rate}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ "--progress-w": `${rate}%`, width: `${rate}%` }} />
            </div>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar card" style={{ padding: "14px 18px", marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div className="search-wrap" style={{ flex: "1 1 240px", maxWidth: 320 }}>
              <span className="search-icon"><Icon.Search /></span>
              <input placeholder="Search tasks…" value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} />
            </div>
            <div className="filter-row" style={{ flex: "1 1 auto" }}>
              {STATUSES.map(s => (
                <button key={s} className={`filter-chip ${filterStatus === s ? "active" : ""}`}
                  onClick={() => { setFilterStatus(s); setPage(0); }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="card" style={{ overflow: "hidden" }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: 48 }}>#</th>
                <th>Task</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <Icon.Clipboard />
                      <p>No tasks found</p>
                    </div>
                  </td>
                </tr>
              ) : visible.map((task, i) => (
                <tr key={task.id} className={task.completed ? "completed-row" : ""} style={{ animationDelay: `${i * 0.04}s` }}>
                  <td style={{ color: "#bbb", fontSize: 12 }}>{page * ROWS_PER_PAGE + i + 1}</td>
                  <td>
                    <span className={`task-title-text ${task.completed ? "struck" : ""}`} style={{ color: task.completed ? "#aaa" : "#1a1b1e" }}>
                      {task.taskTitle}
                    </span>
                  </td>
                  <td><span style={{ fontSize: 12.5, color: "#999" }}>{task.category}</span></td>
                  <td><span className={`badge ${priorityBadge(task.priority)}`}>{task.priority}</span></td>
                  <td>
                    <span className={`badge ${statusBadge(task.status)}`}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusDot[task.status] || "#aaa", display: "inline-block" }} />
                      {task.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: "#999" }}>{task.dueDate || "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: 3 }}>
                      <button className="icon-btn icon-btn-check" title={task.completed ? "Mark pending" : "Mark done"} onClick={() => toggleComplete(task.id)}>
                        {task.completed ? <Icon.Check /> : <Icon.Circle />}
                      </button>
                      <button className="icon-btn icon-btn-view" title="View" onClick={() => { setSelected(task); setModal("view"); }}>
                        <Icon.Eye />
                      </button>
                      <button className="icon-btn icon-btn-edit" title="Edit" onClick={() => openEdit(task)}>
                        <Icon.Edit />
                      </button>
                      <button className="icon-btn icon-btn-del" title="Delete" onClick={() => { setSelected(task); setModal("delete"); }}>
                        <Icon.Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span style={{ fontSize: 12.5, color: "#aaa" }}>
                Showing {page * ROWS_PER_PAGE + 1}–{Math.min((page + 1) * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <button className="btn btn-ghost" style={{ height: 32, padding: "0 12px", fontSize: 12 }} disabled={page === 0} onClick={() => setPage(p => p - 1)}>← Prev</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i)}
                    style={{ width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                      background: page === i ? "#22a064" : "rgba(0,0,0,0.05)",
                      color: page === i ? "#ffffff" : "#888",
                      transition: "all 0.15s" }}>
                    {i + 1}
                  </button>
                ))}
                <button className="btn btn-ghost" style={{ height: 32, padding: "0 12px", fontSize: 12 }} disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next →</button>
              </div>
            </div>
          )}
        </div>

        {/* ── Modals ── */}
        {modal && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
            <div className={`modal ${modal === "delete" ? "modal-sm" : ""}`}>
              <div className="modal-header">
                <span className="modal-title">
                  {modal === "create" ? "New Task" : modal === "edit" ? "Edit Task" : modal === "view" ? "Task Details" : "Confirm Delete"}
                </span>
                <CloseBtn onClick={closeModal} />
              </div>
              {modal === "create" && <TaskForm formData={form} onChange={onChange} onSubmit={handleCreate} onClose={closeModal} mode="create" />}
              {modal === "edit" && <TaskForm formData={form} onChange={onChange} onSubmit={handleEdit} onClose={closeModal} mode="edit" />}
              {modal === "view" && selected && <ViewModal task={selected} onClose={closeModal} priorityBadge={priorityBadge} statusBadge={statusBadge} />}
              {modal === "delete" && selected && <DeleteModal task={selected} onDelete={handleDelete} onClose={closeModal} />}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ToDoTaskPage;