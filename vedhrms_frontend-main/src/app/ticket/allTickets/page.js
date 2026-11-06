// "use client";
// import { useState } from "react";
// import {
//   Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   TextField, IconButton, 
//   FormControl, InputLabel, Select, MenuItem, Grid, InputAdornment, Pagination, Stack
// } from "@mui/material";
// import { EditOutlined, DeleteOutlined, VisibilityOutlined, Add, Search, FilterList, Download, Reply } from "@mui/icons-material";
// import CommonDialog from "@/components/commonDialog";
// import CreateTicket from "@/components/Ticket/allTickets/create";
// import EditTicket from "@/components/Ticket/allTickets/edit";
// import ViewTicket from "@/components/Ticket/allTickets/view";
// import DeleteTicket from "@/components/Ticket/allTickets/delete";
// import ReplyTicket from "@/components/Ticket/allTickets/reply";

// export default function AllTickets() {
//   const [tickets, setTickets] = useState([
//     { 
//       id: "TKT001", 
//       code: "TCK101", 
//       title: "Login Issue", 
//       description: "Unable to login to the HRMS system",
//       employee: "John Doe", 
//       priority: "High", 
//       endDate: "2025-09-05", 
//       status: "Open",
//       category: "Technical",
//       assignedTo: "IT Support",
//       createdDate: "2024-01-20"
//     },
//     { 
//       id: "TKT002", 
//       code: "TCK102", 
//       title: "Payroll Bug", 
//       description: "Payroll calculation error in salary processing",
//       employee: "Jane Smith", 
//       priority: "Medium", 
//       endDate: "2025-09-10", 
//       status: "In Progress",
//       category: "Payroll",
//       assignedTo: "HR Support",
//       createdDate: "2024-01-22"
//     },
//     { 
//       id: "TKT003", 
//       code: "TCK103", 
//       title: "Signup Issue", 
//       description: "New employee registration not working",
//       employee: "Lee William", 
//       priority: "High", 
//       endDate: "2025-09-15", 
//       status: "Open",
//       category: "Technical",
//       assignedTo: "IT Support",
//       createdDate: "2024-01-25"
//     },
//     { 
//       id: "TKT004", 
//       code: "TCK104", 
//       title: "Dashboard Bug", 
//       description: "Dashboard not loading properly",
//       employee: "Joseph Daw", 
//       priority: "Medium", 
//       endDate: "2025-09-20", 
//       status: "In Progress",
//       category: "Technical",
//       assignedTo: "IT Support",
//       createdDate: "2024-01-28"
//     }
//   ]);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [filterCategory, setFilterCategory] = useState("all");

//   const [openData, setOpenData] = useState(false);
//   const [viewShow, setViewShow] = useState(false);
//   const [editShow, setEditShow] = useState(false);
//   const [deleteShow, setDeleteShow] = useState(false);
//   const [replyShow, setReplyShow] = useState(false);

//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [selectedTicket, setSelectedTicket] = useState(null);

//   // Form data for create/edit
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     employee: "",
//     priority: "Medium",
//     endDate: "",
//     category: "Technical"
//   });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Open dialogs
//   const handleOpenAdd = () => setOpenData(true);
//   const handleClose = () => { 
//     setOpenData(false);
//     setViewShow(false);
//     setEditShow(false);
//     setDeleteShow(false);
//     setReplyShow(false);
//     setSelectedIndex(null);
//     setFormData({
//       title: "",
//       description: "",
//       employee: "",
//       priority: "Medium",
//       endDate: "",
//       category: "Technical"
//     });
//   };

//   const handleView = (ticket) => { setSelectedTicket(ticket); setViewShow(true); };
//   const handleEdit = (ticket, index) => { 
//     setSelectedTicket(ticket); 
//     setSelectedIndex(index); 
//     setFormData({
//       title: ticket.title || "",
//       description: ticket.description || "",
//       employee: ticket.employee || "",
//       priority: ticket.priority || "Medium",
//       endDate: ticket.endDate || "",
//       category: ticket.category || "Technical"
//     });
//     setEditShow(true); 
//   };
//   const handleDelete = (index) => { setSelectedIndex(index); setDeleteShow(true); };
//   const handleReply = (ticket, index) => { setSelectedTicket(ticket); setSelectedIndex(index); setReplyShow(true); };

//   // Helper functions
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Resolved': return 'hrms-badge-success';
//       case 'In Progress': return 'hrms-badge-warning';
//       case 'Open': return 'hrms-badge-error';
//       case 'Closed': return 'hrms-badge-neutral';
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

//   const filteredTickets = tickets.filter(ticket => {
//     const matchesSearch = ticket.title.toLowerCase().includes(search.toLowerCase()) ||
//                          ticket.employee.toLowerCase().includes(search.toLowerCase()) ||
//                          ticket.code.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
//     const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority;
//     const matchesCategory = filterCategory === "all" || ticket.category === filterCategory;
    
//     return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
//   });

//   // Add new ticket
//   const handleAdd = () => {
//     const newTicket = {
//       ...formData,
//       id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
//       code: `TKT${String(tickets.length + 1).padStart(4, '0')}`,
//       status: "Open",
//       createdDate: new Date().toISOString().split('T')[0],
//       assignedTo: "System",
//       replies: []
//     };
//     setTickets([...tickets, newTicket]);
//     handleClose();
//   };

//   // Update ticket
//   const handleUpdate = () => {
//     const updated = [...tickets];
//     updated[selectedIndex] = {
//       ...updated[selectedIndex],
//       ...formData
//     };
//     setTickets(updated);
//     handleClose();
//   };

//   // Delete ticket
//   const confirmDelete = () => {
//     setTickets(tickets.filter((_, i) => i !== selectedIndex));
//     handleClose();
//   };

//   // Add reply to ticket
//   const handleAddReply = (replyText, replyType) => {
//     if (selectedTicket && selectedIndex !== null) {
//       const updated = [...tickets];
//       if (!updated[selectedIndex].replies) {
//         updated[selectedIndex].replies = [];
//       }
//       updated[selectedIndex].replies.push({
//         id: Date.now(),
//         message: replyText,
//         author: replyType === "support" ? "Support Team" : selectedTicket.employee,
//         timestamp: new Date().toISOString(),
//         type: replyType
//       });
      
//       // Update status based on reply type
//       if (replyType === "support" && updated[selectedIndex].status === "Open") {
//         updated[selectedIndex].status = "In Progress";
//       }
      
//       setTickets(updated);
//     }
//   };

//   return (
//     <Box sx={{ padding: "0.5rem" }}>
//       {/* Search and Create Button */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
//         <TextField
//           placeholder="Search tickets..."
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
//           className="hrms-btn hrms-btn-primary"
//           onClick={handleOpenAdd}
//           style={{ height: "40px" }}
//         >
//           <Add />
//           Create Ticket
//         </button>
//       </Box>

//       {/* Ticket Table */}
//       <Box className="hrms-card">
//         <Box className="hrms-card-content" sx={{ padding: 0 }}>
//           <Table className="hrms-table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>S. No.</TableCell>
//                 <TableCell>Ticket Code</TableCell>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Priority</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Employee</TableCell>
//                 <TableCell>Assigned To</TableCell>
//                 <TableCell>End Date</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredTickets
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((ticket, index) => (
//                   <TableRow key={ticket.id}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#3b82f6" }}>
//                         {ticket.code}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         {ticket.title}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{ticket.category}</TableCell>
//                     <TableCell>
//                       <Box className={`hrms-badge ${getPriorityColor(ticket.priority)}`}>
//                         {ticket.priority}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box className={`hrms-badge ${getStatusColor(ticket.status)}`}>
//                         {ticket.status}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{ticket.employee}</TableCell>
//                     <TableCell>{ticket.assignedTo}</TableCell>
//                     <TableCell>{ticket.endDate}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", gap: "0.25rem" }}>
//                         <IconButton 
//                           size="small"
//                           onClick={() => handleView(ticket)}
//                           sx={{ color: "#1976D2", fontSize: "16px" }}
//                           title="View Ticket"
//                         >
//                           <VisibilityOutlined />
//                         </IconButton>
//                         <IconButton 
//                           size="small"
//                           onClick={() => handleReply(ticket, index)}
//                           sx={{ color: "#9c27b0", fontSize: "16px" }}
//                           title="Reply to Ticket"
//                         >
//                           <Reply />
//                         </IconButton>
//                         <IconButton 
//                           size="small"
//                           onClick={() => handleEdit(ticket, index)}
//                           sx={{ color: "#000", fontSize: "16px" }}
//                           title="Edit Ticket"
//                         >
//                           <EditOutlined />
//                         </IconButton>
//                         <IconButton 
//                           size="small"
//                           onClick={() => handleDelete(index)}
//                           sx={{ color: "#d32f2f", fontSize: "16px" }}
//                           title="Delete Ticket"
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
//               Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredTickets.length)} of {filteredTickets.length} tickets
//             </Typography>
//             <Pagination
//               count={Math.ceil(filteredTickets.length / rowsPerPage)}
//               page={page + 1}
//               onChange={(event, value) => setPage(value - 1)}
//               color="primary"
//             />
//           </Stack>
//         </Box>
//       </Box>

//       {/* Common Dialog */}
//       <CommonDialog
//         open={openData || viewShow || editShow || deleteShow || replyShow}
//         onClose={handleClose}
//         dialogTitle={
//           openData
//             ? "Add New Ticket"
//             : viewShow
//             ? "Ticket Details"
//             : editShow
//             ? "Edit Ticket"
//             : deleteShow
//             ? "Delete Ticket"
//             : replyShow
//             ? "Reply to Ticket"
//             : ""
//         }
//         dialogContent={
//           openData ? (
//             <CreateTicket 
//               formData={formData}
//               handleInputChange={handleInputChange}
//               handleCreate={handleAdd} 
//               handleClose={handleClose} 
//             />
//           ) : viewShow ? (
//             <ViewTicket 
//               selectedTicket={selectedTicket} 
//               handleClose={handleClose} 
//               getStatusColor={getStatusColor}
//               getPriorityColor={getPriorityColor}
//             />
//           ) : editShow ? (
//             <EditTicket 
//               formData={formData}
//               handleInputChange={handleInputChange}
//               handleUpdate={handleUpdate} 
//               handleClose={handleClose} 
//               selectedTicket={selectedTicket}
//             />
//           ) : deleteShow ? (
//             <DeleteTicket 
//               selectedTicket={selectedTicket}
//               handleDelete={confirmDelete}
//               handleClose={handleClose}
//             />
//           ) : replyShow ? (
//             <ReplyTicket 
//               selectedTicket={selectedTicket}
//               onAddReply={handleAddReply}
//               onClose={handleClose}
//             />
//           ) : null
//         }
//         maxWidth={deleteShow ? "xs" : replyShow ? "md" : "md"}
//       />
//     </Box>
//   );
// }









// "use client";
// import { useState, useEffect } from "react";
// import { Pagination } from "@mui/material";
// import {
//   EditOutlined, DeleteOutlined, VisibilityOutlined,
//   Add, Search, Reply
// } from "@mui/icons-material";
// import CommonDialog from "@/components/commonDialog";
// import CreateTicket from "@/components/Ticket/allTickets/create";
// import EditTicket from "@/components/Ticket/allTickets/edit";
// import ViewTicket from "@/components/Ticket/allTickets/view";
// import DeleteTicket from "@/components/Ticket/allTickets/delete";
// import ReplyTicket from "@/components/Ticket/allTickets/reply";

// /* ─── style injection ──────────────────────────────────────────────────── */
// const injectStyles = () => {
//   if (document.getElementById("at-styles")) return;
//   const s = document.createElement("style");
//   s.id = "at-styles";
//   s.textContent = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

//     /* ── keyframes ── */
//     @keyframes at-fade-up  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
//     @keyframes at-slide-r  { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
//     @keyframes at-row-in   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
//     @keyframes at-badge-pop{ 0%{transform:scale(0.75) rotate(-4deg);opacity:0} 70%{transform:scale(1.06)} 100%{transform:scale(1) rotate(0);opacity:1} }
//     @keyframes at-stat-up  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

//     /* ── root ── */
//     .at-root {
//       font-family: 'Outfit', sans-serif;
//       padding: 1.5rem;
//       background: #ffffff;
//       min-height: 100vh;
//     }

//     /* ── page header ── */
//     .at-page-header {
//       display: flex; align-items: center; justify-content: space-between;
//       margin-bottom: 1.5rem;
//       animation: at-slide-r .45s cubic-bezier(.22,1,.36,1) both;
//     }
//     .at-page-title {
//       font-size: 1.5rem; font-weight: 700; color: #111827;
//       letter-spacing: -.02em; display: flex; align-items: center; gap: 10px;
//     }
//     .at-page-title-icon {
//       width: 36px; height: 36px; border-radius: 9px;
//       background: #111827;
//       display: flex; align-items: center; justify-content: center;
//     }
//     .at-page-title-icon svg { color: #fff; }
//     .at-page-sub { font-size: .8rem; color: #9ca3af; font-weight: 400; margin-top: 2px; }

//     /* ── stat cards ── */
//     .at-stats {
//       display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem;
//       margin-bottom: 1.5rem;
//     }
//     @media(max-width:900px){ .at-stats{ grid-template-columns:repeat(2,1fr); } }
//     @media(max-width:500px){ .at-stats{ grid-template-columns:1fr; } }

//     .at-stat-card {
//       background: #fff;
//       border: 1.5px solid #e5e7eb;
//       border-radius: 14px;
//       padding: 18px 20px;
//       display: flex; align-items: center; gap: 14px;
//       animation: at-fade-up .5s cubic-bezier(.22,1,.36,1) both;
//       transition: transform .2s, box-shadow .2s, border-color .2s;
//       position: relative; overflow: hidden;
//     }
//     .at-stat-card::before {
//       content: '';
//       position: absolute; top: 0; left: 0; right: 0; height: 3px;
//       border-radius: 14px 14px 0 0;
//       background: #111827;
//     }
//     .at-stat-card:hover {
//       transform: translateY(-3px);
//       box-shadow: 0 8px 24px rgba(0,0,0,.08);
//       border-color: #d1d5db;
//     }
//     .at-stat-icon {
//       width: 42px; height: 42px; border-radius: 10px;
//       background: #f3f4f6;
//       display: flex; align-items: center; justify-content: center; flex-shrink: 0;
//       color: #374151;
//     }
//     .at-stat-icon svg { font-size: 19px; }
//     .at-stat-num {
//       font-size: 1.55rem; font-weight: 700; color: #111827; line-height: 1;
//       animation: at-stat-up .5s cubic-bezier(.22,1,.36,1) both;
//     }
//     .at-stat-label { font-size: .73rem; color: #9ca3af; font-weight: 500; margin-top: 3px; text-transform: uppercase; letter-spacing: .05em; }

//     /* individual accent top strips */
//     .at-stat-open::before   { background: #ef4444; }
//     .at-stat-prog::before   { background: #f59e0b; }
//     .at-stat-done::before   { background: #10b981; }

//     /* ── toolbar ── */
//     .at-toolbar {
//       display: flex; align-items: center; gap: .75rem;
//       flex-wrap: wrap; margin-bottom: 1rem;
//       animation: at-fade-up .5s .08s cubic-bezier(.22,1,.36,1) both;
//     }
//     .at-search-wrap { flex: 1; min-width: 200px; max-width: 300px; position: relative; }
//     .at-search-input {
//       width: 100%; height: 40px; padding: 0 14px 0 40px;
//       border: 1.5px solid #e5e7eb; border-radius: 9px;
//       font-family: 'Outfit', sans-serif; font-size: .875rem; color: #111827;
//       background: #fff; outline: none;
//       transition: border-color .2s, box-shadow .2s;
//     }
//     .at-search-input::placeholder { color: #161718; }
//     .at-search-input:focus { border-color: #88adfb; box-shadow: 0 0 0 3px rgba(111, 154, 246, 0.08); }
//     .at-search-icon {
//       position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
//       color: #191a1b; font-size: 18px; pointer-events: none;
//     }
//     .at-filter-select {
//       height: 40px; padding: 0 12px;
//       border: 1.5px solid #e5e7eb; border-radius: 9px;
//       font-family: 'Outfit', sans-serif; font-size: .8rem; color: #374151;
//       background: #fff; outline: none; cursor: pointer;
//       transition: border-color .2s, box-shadow .2s;
//     }
//     .at-filter-select:focus { border-color: #111827; box-shadow: 0 0 0 3px rgba(17,24,39,.08); }

//     .at-btn-create {
//       display: inline-flex; align-items: center; gap: 6px;
//       height: 40px; padding: 0 18px; border-radius: 9px; border: none; cursor: pointer;
//       background: #111827;
//       color: #fff; font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 600;
//       transition: transform .2s, background .2s, box-shadow .2s;
//       margin-left: auto;
//     }
//     .at-btn-create:hover { transform: translateY(-2px); background: #1f2937; box-shadow: 0 6px 18px rgba(17,24,39,.2); }
//     .at-btn-create:active { transform: translateY(0); }

//     /* ── table card ── */
//     .at-table-card {
//       background: #fff;
//       border: 1.5px solid #e5e7eb;
//       border-radius: 16px;
//       overflow: hidden;
//       animation: at-fade-up .5s .15s cubic-bezier(.22,1,.36,1) both;
//       box-shadow: 0 1px 6px rgba(0,0,0,.05);
//     }
//     .at-table-card table { width: 100%; border-collapse: collapse; }
//     .at-table-card thead tr {
//       background: #f9fafb;
//       border-bottom: 1.5px solid #e5e7eb;
//     }
//     .at-table-card thead th {
//       padding: 12px 16px; text-align: left;
//       font-family: 'Outfit', sans-serif; font-size: .7rem; font-weight: 700;
//       letter-spacing: .08em; text-transform: uppercase; color: #6b7280;
//       white-space: nowrap;
//     }
//     .at-table-card tbody tr {
//       border-bottom: 1px solid #f3f4f6;
//       transition: background .15s;
//       animation: at-row-in .4s cubic-bezier(.22,1,.36,1) both;
//     }
//     .at-table-card tbody tr:last-child { border-bottom: none; }
//     .at-table-card tbody tr:hover { background: #f9fafb; }
//     .at-table-card tbody td {
//       padding: 13px 16px;
//       font-size: .875rem; color: #374151;
//       font-family: 'Outfit', sans-serif;
//     }

//     /* code chip */
//     .at-code-chip {
//       font-family: 'Geist Mono', monospace; font-size: .78rem; font-weight: 500;
//       color: #111827; background: #f3f4f6;
//       border: 1px solid #e5e7eb;
//       border-radius: 6px; padding: 3px 9px; display: inline-block;
//       transition: background .15s;
//     }
//     .at-table-card tbody tr:hover .at-code-chip { background: #e5e7eb; }
//     .at-row-title { font-weight: 600; color: #111827; }

//     /* ── badges ── */
//     .at-badge {
//       display: inline-flex; align-items: center; gap: 5px;
//       padding: 3px 10px; border-radius: 999px;
//       font-size: .71rem; font-weight: 600; letter-spacing: .04em;
//       animation: at-badge-pop .4s cubic-bezier(.34,1.56,.64,1) both;
//       border: 1px solid transparent;
//     }
//     .at-badge::before {
//       content: ''; width: 5px; height: 5px; border-radius: 50%;
//       background: currentColor; opacity: .6;
//     }

//     /* status */
//     .at-s-open      { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
//     .at-s-progress  { background: #fffbeb; color: #b45309; border-color: #fde68a; }
//     .at-s-resolved  { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
//     .at-s-closed    { background: #f9fafb; color: #6b7280; border-color: #e5e7eb; }
//     .at-s-default   { background: #f9fafb; color: #6b7280; border-color: #e5e7eb; }

//     /* priority */
//     .at-p-high     { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
//     .at-p-medium   { background: #fffbeb; color: #b45309; border-color: #fde68a; }
//     .at-p-low      { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
//     .at-p-critical { background: #fdf2f8; color: #be185d; border-color: #fbcfe8; }
//     .at-p-default  { background: #f9fafb; color: #6b7280; border-color: #e5e7eb; }

//     /* ── action buttons ── */
//     .at-action-btn {
//       width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid #e5e7eb;
//       cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
//       background: #fff; transition: transform .15s, background .15s, border-color .15s, box-shadow .15s;
//     }
//     .at-action-btn:hover { transform: translateY(-2px); box-shadow: 0 3px 8px rgba(0,0,0,.1); }
//     .at-action-btn svg { font-size: 15px; }

//     .at-btn-view   { color: #2563eb; }
//     .at-btn-view:hover   { background: #eff6ff; border-color: #bfdbfe; }
//     .at-btn-reply  { color: #7c3aed; }
//     .at-btn-reply:hover  { background: #faf5ff; border-color: #ddd6fe; }
//     .at-btn-edit   { color: #374151; }
//     .at-btn-edit:hover   { background: #f3f4f6; border-color: #d1d5db; }
//     .at-btn-delete { color: #dc2626; }
//     .at-btn-delete:hover { background: #fef2f2; border-color: #fecaca; }

//     /* ── table footer ── */
//     .at-table-footer {
//       padding: .85rem 1.25rem;
//       border-top: 1.5px solid #f3f4f6;
//       background: #f9fafb;
//       display: flex; align-items: center; justify-content: space-between;
//       flex-wrap: wrap; gap: .5rem;
//     }
//     .at-footer-text { font-size: .8rem; color: #9ca3af; font-weight: 500; }

//     /* ── empty state ── */
//     .at-empty {
//       text-align: center; padding: 48px 20px;
//       animation: at-fade-up .5s both;
//     }
//     .at-empty-icon {
//       width: 60px; height: 60px; border-radius: 14px; margin: 0 auto 14px;
//       background: #f3f4f6; border: 1.5px solid #e5e7eb;
//       display: flex; align-items: center; justify-content: center;
//     }
//     .at-empty-icon svg { font-size: 26px; color: #9ca3af; }
//     .at-empty-msg { font-size: .95rem; font-weight: 600; color: #9ca3af; }
//   `;
//   document.head.appendChild(s);
// };

// /* ─── colour helpers ─────────────────────────────────────────────────────── */
// const statusCls = (status = "") => {
//   const s = status.toLowerCase();
//   if (s.includes("open"))     return "at-s-open";
//   if (s.includes("progress")) return "at-s-progress";
//   if (s.includes("resolv"))   return "at-s-resolved";
//   if (s.includes("close"))    return "at-s-closed";
//   return "at-s-default";
// };
// const priorityCls = (p = "") => {
//   const v = p.toLowerCase();
//   if (v === "high")     return "at-p-high";
//   if (v === "medium")   return "at-p-medium";
//   if (v === "low")      return "at-p-low";
//   if (v === "critical") return "at-p-critical";
//   return "at-p-default";
// };

// /* ─── Stat Card ─────────────────────────────────────────────────────────── */
// const StatCard = ({ label, value, cls, icon, delay }) => (
//   <div className={`at-stat-card ${cls || ""}`} style={{ animationDelay: `${delay}ms` }}>
//     <div className="at-stat-icon">{icon}</div>
//     <div>
//       <div className="at-stat-num" style={{ animationDelay: `${delay + 80}ms` }}>{value}</div>
//       <div className="at-stat-label">{label}</div>
//     </div>
//   </div>
// );

// /* ─── Main component ─────────────────────────────────────────────────────── */
// export default function AllTickets() {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => { injectStyles(); setMounted(true); }, []);

//   const [tickets, setTickets] = useState([
//     { id:"TKT001", code:"TCK101", title:"Login Issue",   description:"Unable to login to the HRMS system",            employee:"John Doe",    priority:"High",   endDate:"2025-09-05", status:"Open",        category:"Technical", assignedTo:"IT Support", createdDate:"2024-01-20" },
//     { id:"TKT002", code:"TCK102", title:"Payroll Bug",   description:"Payroll calculation error in salary processing", employee:"Jane Smith",  priority:"Medium", endDate:"2025-09-10", status:"In Progress", category:"Payroll",   assignedTo:"HR Support", createdDate:"2024-01-22" },
//     { id:"TKT003", code:"TCK103", title:"Signup Issue",  description:"New employee registration not working",          employee:"Lee William", priority:"High",   endDate:"2025-09-15", status:"Open",        category:"Technical", assignedTo:"IT Support", createdDate:"2024-01-25" },
//     { id:"TKT004", code:"TCK104", title:"Dashboard Bug", description:"Dashboard not loading properly",                 employee:"Joseph Daw",  priority:"Medium", endDate:"2025-09-20", status:"In Progress", category:"Technical", assignedTo:"IT Support", createdDate:"2024-01-28" },
//   ]);

//   const [page, setPage]                     = useState(0);
//   const [rowsPerPage]                       = useState(10);
//   const [search, setSearch]                 = useState("");
//   const [filterStatus, setFilterStatus]     = useState("all");
//   const [filterPriority, setFilterPriority] = useState("all");

//   const [openData,   setOpenData]   = useState(false);
//   const [viewShow,   setViewShow]   = useState(false);
//   const [editShow,   setEditShow]   = useState(false);
//   const [deleteShow, setDeleteShow] = useState(false);
//   const [replyShow,  setReplyShow]  = useState(false);

//   const [selectedIndex,  setSelectedIndex]  = useState(null);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [formData, setFormData] = useState({
//     title:"", description:"", employee:"", priority:"Medium", endDate:"", category:"Technical"
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
//   const handleClose = () => {
//     setOpenData(false); setViewShow(false); setEditShow(false);
//     setDeleteShow(false); setReplyShow(false); setSelectedIndex(null);
//     setFormData({ title:"", description:"", employee:"", priority:"Medium", endDate:"", category:"Technical" });
//   };
//   const handleView   = (t)    => { setSelectedTicket(t); setViewShow(true); };
//   const handleEdit   = (t, i) => {
//     setSelectedTicket(t); setSelectedIndex(i);
//     setFormData({ title:t.title||"", description:t.description||"", employee:t.employee||"",
//                   priority:t.priority||"Medium", endDate:t.endDate||"", category:t.category||"Technical" });
//     setEditShow(true);
//   };
//   const handleDelete = (i)    => { setSelectedIndex(i); setDeleteShow(true); };
//   const handleReply  = (t, i) => { setSelectedTicket(t); setSelectedIndex(i); setReplyShow(true); };

//   const handleAdd = () => {
//     setTickets([...tickets, {
//       ...formData,
//       id:`TKT${String(tickets.length+1).padStart(3,"0")}`,
//       code:`TKT${String(tickets.length+1).padStart(4,"0")}`,
//       status:"Open", createdDate:new Date().toISOString().split("T")[0],
//       assignedTo:"System", replies:[]
//     }]);
//     handleClose();
//   };
//   const handleUpdate = () => {
//     const updated = [...tickets];
//     updated[selectedIndex] = { ...updated[selectedIndex], ...formData };
//     setTickets(updated); handleClose();
//   };
//   const confirmDelete = () => {
//     setTickets(tickets.filter((_,i) => i !== selectedIndex)); handleClose();
//   };
//   const handleAddReply = (replyText, replyType) => {
//     if (selectedTicket && selectedIndex !== null) {
//       const updated = [...tickets];
//       if (!updated[selectedIndex].replies) updated[selectedIndex].replies = [];
//       updated[selectedIndex].replies.push({
//         id:Date.now(), message:replyText,
//         author:replyType === "support" ? "Support Team" : selectedTicket.employee,
//         timestamp:new Date().toISOString(), type:replyType
//       });
//       if (replyType === "support" && updated[selectedIndex].status === "Open")
//         updated[selectedIndex].status = "In Progress";
//       setTickets(updated);
//     }
//   };

//   const filtered = tickets.filter(t => {
//     const ms = t.title.toLowerCase().includes(search.toLowerCase()) ||
//                t.employee.toLowerCase().includes(search.toLowerCase()) ||
//                t.code.toLowerCase().includes(search.toLowerCase());
//     return ms &&
//       (filterStatus   === "all" || t.status   === filterStatus) &&
//       (filterPriority === "all" || t.priority === filterPriority);
//   });
//   const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   if (!mounted) return null;

//   const total   = tickets.length;
//   const openCnt = tickets.filter(t => t.status === "Open").length;
//   const progCnt = tickets.filter(t => t.status === "In Progress").length;
//   const resCnt  = tickets.filter(t => t.status === "Resolved").length;

//   return (
//     <div className="at-root">

//       {/* ── page header ── */}
//       <div className="at-page-header">
//         <div>
//           <div className="at-page-title">
//             <div className="at-page-title-icon">
//               <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
//                 strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                 <path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1.09a2 2 0 0 0 0 3.82V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.09a2 2 0 0 0 0-3.82V9z"/>
//               </svg>
//             </div>
//             All Tickets
//           </div>
//           <div className="at-page-sub">Manage and track all support tickets</div>
//         </div>
//       </div>

//       {/* ── stat cards ── */}
//       <div className="at-stats">
//         <StatCard label="Total Tickets" value={total}   cls=""            delay={50}
//           icon={<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1.09a2 2 0 0 0 0 3.82V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.09a2 2 0 0 0 0-3.82V9z"/></svg>}
//         />
//         <StatCard label="Open"          value={openCnt} cls="at-stat-open" delay={100}
//           icon={<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>}
//         />
//         <StatCard label="In Progress"   value={progCnt} cls="at-stat-prog" delay={150}
//           icon={<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
//         />
//         <StatCard label="Resolved"      value={resCnt}  cls="at-stat-done" delay={200}
//           icon={<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
//         />
//       </div>

//       {/* ── toolbar ── */}
//       <div className="at-toolbar">
//         <div className="at-search-wrap">
//           <Search className="at-search-icon" />
//           <input
//             className="at-search-input"
//             placeholder="Search tickets, employees…"
//             value={search}
//             onChange={e => { setSearch(e.target.value); setPage(0); }}
//           />
//         </div>

//         <select className="at-filter-select" value={filterStatus}
//           onChange={e => { setFilterStatus(e.target.value); setPage(0); }}>
//           <option value="all">All Status</option>
//           <option value="Open">Open</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Resolved">Resolved</option>
//           <option value="Closed">Closed</option>
//         </select>

//         <select className="at-filter-select" value={filterPriority}
//           onChange={e => { setFilterPriority(e.target.value); setPage(0); }}>
//           <option value="all">All Priority</option>
//           <option value="High">High</option>
//           <option value="Medium">Medium</option>
//           <option value="Low">Low</option>
//           <option value="Critical">Critical</option>
//         </select>

//         <button className="at-btn-create" onClick={() => setOpenData(true)}>
//           <Add sx={{ fontSize: 17 }} />
//           Create Ticket
//         </button>
//       </div>

//       {/* ── table ── */}
//       <div className="at-table-card">
//         <table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Code</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Assigned To</th>
//               <th>Due Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paged.length === 0 ? (
//               <tr>
//                 <td colSpan={10}>
//                   <div className="at-empty">
//                     <div className="at-empty-icon">
//                       <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"
//                         strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                         <path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1.09a2 2 0 0 0 0 3.82V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.09a2 2 0 0 0 0-3.82V9z"/>
//                       </svg>
//                     </div>
//                     <div className="at-empty-msg">No tickets found</div>
//                   </div>
//                 </td>
//               </tr>
//             ) : paged.map((ticket, idx) => (
//               <tr key={ticket.id} style={{ animationDelay: `${idx * 35}ms` }}>
//                 <td style={{ color:"#101317", fontSize:".8rem" }}>
//                   {page * rowsPerPage + idx + 1}
//                 </td>
//                 <td><span className="at-code-chip">{ticket.code}</span></td>
//                 <td><span className="at-row-title">{ticket.title}</span></td>
//                 <td style={{ color:"#0e1014" }}>{ticket.category}</td>
//                 <td>
//                   <span className={`at-badge ${priorityCls(ticket.priority)}`}>
//                     {ticket.priority}
//                   </span>
//                 </td>
//                 <td>
//                   <span className={`at-badge ${statusCls(ticket.status)}`}>
//                     {ticket.status}
//                   </span>
//                 </td>
//                 <td>{ticket.employee}</td>
//                 <td style={{ color:"#0a101b" }}>{ticket.assignedTo}</td>
//                 <td style={{ color:"#090b10", fontSize:".82rem" }}>{ticket.endDate}</td>
//                 <td>
//                   <div style={{ display:"flex", gap:5 }}>
//                     <button className="at-action-btn at-btn-view"   title="View"
//                       onClick={() => handleView(ticket)}>
//                       <VisibilityOutlined />
//                     </button>
//                     <button className="at-action-btn at-btn-reply"  title="Reply"
//                       onClick={() => handleReply(ticket, tickets.indexOf(ticket))}>
//                       <Reply />
//                     </button>
//                     <button className="at-action-btn at-btn-edit"   title="Edit"
//                       onClick={() => handleEdit(ticket, tickets.indexOf(ticket))}>
//                       <EditOutlined />
//                     </button>
//                     <button className="at-action-btn at-btn-delete" title="Delete"
//                       onClick={() => handleDelete(tickets.indexOf(ticket))}>
//                       <DeleteOutlined />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="at-table-footer">
//           <span className="at-footer-text">
//             Showing {filtered.length === 0 ? 0 : page * rowsPerPage + 1}–{Math.min((page+1)*rowsPerPage, filtered.length)} of {filtered.length} tickets
//           </span>
//           <Pagination
//             count={Math.ceil(filtered.length / rowsPerPage)}
//             page={page + 1}
//             onChange={(_, v) => setPage(v - 1)}
//             size="small"
//             sx={{
//               "& .MuiPaginationItem-root": {
//                 fontFamily:"'Outfit',sans-serif", fontSize:".8rem", borderRadius:"7px",
//                 color:"#a0c1f7", border:"1.5px solid #e5e7eb",
//               },
//               "& .Mui-selected": {
//                 background:"#83a8f8 !important",
//                 color:"#fff !important",
//                 borderColor:"#87aaf7 !important",
//               },
//             }}
//           />
//         </div>
//       </div>

//       {/* ── dialogs ── */}
//       <CommonDialog
//         open={openData || viewShow || editShow || deleteShow || replyShow}
//         onClose={handleClose}
//         dialogTitle={
//           openData   ? "Create New Ticket" :
//           viewShow   ? "Ticket Details"    :
//           editShow   ? "Edit Ticket"       :
//           deleteShow ? "Delete Ticket"     :
//           replyShow  ? "Reply to Ticket"   : ""
//         }
//         dialogContent={
//           openData ? (
//             <CreateTicket formData={formData} handleInputChange={handleInputChange}
//               handleCreate={handleAdd} handleClose={handleClose} />
//           ) : viewShow ? (
//             <ViewTicket selectedTicket={selectedTicket} handleClose={handleClose}
//               getStatusColor={statusCls} getPriorityColor={priorityCls} />
//           ) : editShow ? (
//             <EditTicket formData={formData} handleInputChange={handleInputChange}
//               handleUpdate={handleUpdate} handleClose={handleClose} selectedTicket={selectedTicket} />
//           ) : deleteShow ? (
//             <DeleteTicket selectedTicket={selectedTicket}
//               handleDelete={confirmDelete} handleClose={handleClose} />
//           ) : replyShow ? (
//             <ReplyTicket selectedTicket={selectedTicket}
//               onAddReply={handleAddReply} onClose={handleClose} />
//           ) : null
//         }
//         maxWidth={deleteShow ? "xs" : "md"}
//       />
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import {
  EditOutlined, DeleteOutlined, VisibilityOutlined,
  Add, Search, Reply
} from "@mui/icons-material";
import CommonDialog from "@/components/commonDialog";
import CreateTicket from "@/components/Ticket/allTickets/create";
import EditTicket from "@/components/Ticket/allTickets/edit";
import ViewTicket from "@/components/Ticket/allTickets/view";
import DeleteTicket from "@/components/Ticket/allTickets/delete";
import ReplyTicket from "@/components/Ticket/allTickets/reply";

/* ─── style injection ──────────────────────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("at-styles")) return;
  const s = document.createElement("style");
  s.id = "at-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap');

    /* ── keyframes ── */
    @keyframes at-fade-up   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes at-fade-in   { from{opacity:0} to{opacity:1} }
    @keyframes at-slide-r   { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
    @keyframes at-row-in    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes at-badge-pop { 0%{transform:scale(.8) rotate(-3deg);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1) rotate(0);opacity:1} }
    @keyframes at-shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes at-pulse-dot { 0%,100%{opacity:.5;transform:scale(.85)} 50%{opacity:1;transform:scale(1.15)} }

    /* ── root ── */
    .at-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 2rem;
      background: linear-gradient(180deg, #f8fafc 0%, #f3f4f8 100%);
      min-height: 100vh;
      color: #1e293b;
    }

    /* ── page header ── */
    .at-page-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.75rem;
      animation: at-slide-r .5s cubic-bezier(.22,1,.36,1) both;
    }
    .at-page-title {
      font-size: 1.65rem; font-weight: 800; color: #1e293b;
      letter-spacing: -.025em; display: flex; align-items: center; gap: 12px;
    }
    .at-page-title-icon {
      width: 40px; height: 40px; border-radius: 12px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      box-shadow: 0 6px 16px rgba(79,70,229,.28);
      display: flex; align-items: center; justify-content: center;
    }
    .at-page-title-icon svg { color: #fff; }
    .at-page-sub { font-size: .85rem; color: #94a3b8; font-weight: 500; margin-top: 3px; }

    /* ── stat cards ── */
    .at-stats {
      display: grid; grid-template-columns: repeat(4,1fr); gap: 1.1rem;
      margin-bottom: 1.75rem;
    }
    @media(max-width:900px){ .at-stats{ grid-template-columns:repeat(2,1fr); } }
    @media(max-width:500px){ .at-stats{ grid-template-columns:1fr; } }

    .at-stat-card {
      background: #ffffff;
      border: 1px solid #eef0f4;
      border-radius: 16px;
      padding: 20px 22px;
      display: flex; align-items: center; gap: 16px;
      animation: at-fade-up .55s cubic-bezier(.22,1,.36,1) both;
      transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
      position: relative; overflow: hidden;
      box-shadow: 0 1px 2px rgba(16,24,40,.03);
    }
    .at-stat-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, #6366f1, #818cf8);
      transform: scaleX(0); transform-origin: left;
      transition: transform .4s cubic-bezier(.22,1,.36,1);
    }
    .at-stat-card:hover::before { transform: scaleX(1); }
    .at-stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(79,70,229,.10);
      border-color: #e0e3ff;
    }
    .at-stat-icon {
      width: 46px; height: 46px; border-radius: 12px;
      background: #eef2ff;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      color: #4f46e5;
      transition: transform .25s ease;
    }
    .at-stat-card:hover .at-stat-icon { transform: scale(1.08) rotate(-4deg); }
    .at-stat-icon svg { font-size: 20px; }
    .at-stat-num {
      font-size: 1.7rem; font-weight: 800; color: #1e293b; line-height: 1;
      letter-spacing: -.02em;
      animation: at-fade-in .6s ease both;
    }
    .at-stat-label { font-size: .73rem; color: #94a3b8; font-weight: 600; margin-top: 4px; text-transform: uppercase; letter-spacing: .07em; }

    /* individual accent icons */
    .at-stat-open   .at-stat-icon { background: #fef2f2; color: #ef4444; }
    .at-stat-prog   .at-stat-icon { background: #fffbeb; color: #f59e0b; }
    .at-stat-done   .at-stat-icon { background: #f0fdf4; color: #10b981; }

    /* ── toolbar ── */
    .at-toolbar {
      display: flex; align-items: center; gap: .75rem;
      flex-wrap: wrap; margin-bottom: 1.1rem;
      animation: at-fade-up .55s .08s cubic-bezier(.22,1,.36,1) both;
    }
    .at-search-wrap { flex: 1; min-width: 220px; max-width: 320px; position: relative; }
    .at-search-input {
      width: 100%; height: 42px; padding: 0 14px 0 42px;
      border: 1px solid #e2e5ec; border-radius: 10px;
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: .875rem; color: #1e293b;
      background: #fff; outline: none;
      transition: border-color .2s, box-shadow .2s;
    }
    .at-search-input::placeholder { color: #aab2c0; }
    .at-search-input:focus { border-color: #818cf8; box-shadow: 0 0 0 4px rgba(99,102,241,.10); }
    .at-search-icon {
      position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
      color: #94a3b8; font-size: 19px; pointer-events: none;
    }
    .at-filter-select {
      height: 42px; padding: 0 14px;
      border: 1px solid #e2e5ec; border-radius: 10px;
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: .8rem; font-weight: 500; color: #475569;
      background: #fff; outline: none; cursor: pointer;
      transition: border-color .2s, box-shadow .2s;
    }
    .at-filter-select:focus { border-color: #818cf8; box-shadow: 0 0 0 4px rgba(99,102,241,.10); }

    .at-btn-create {
      display: inline-flex; align-items: center; gap: 7px;
      height: 42px; padding: 0 20px; border-radius: 10px; border: none; cursor: pointer;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: .875rem; font-weight: 700;
      letter-spacing: .01em;
      box-shadow: 0 4px 14px rgba(79,70,229,.25);
      transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
      margin-left: auto;
    }
    .at-btn-create:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(79,70,229,.32); filter: brightness(1.04); }
    .at-btn-create:active { transform: translateY(0); }

    /* ── table card ── */
    .at-table-card {
      background: #fff;
      border: 1px solid #eef0f4;
      border-radius: 18px;
      overflow: hidden;
      animation: at-fade-up .55s .15s cubic-bezier(.22,1,.36,1) both;
      box-shadow: 0 1px 3px rgba(16,24,40,.04), 0 12px 32px rgba(16,24,40,.03);
    }
    .at-table-card table { width: 100%; border-collapse: collapse; }
    .at-table-card thead tr {
      background: #f8f9fc;
      border-bottom: 1px solid #eef0f4;
    }
    .at-table-card thead th {
      padding: 14px 16px; text-align: left;
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: .7rem; font-weight: 700;
      letter-spacing: .09em; text-transform: uppercase; color: #94a3b8;
      white-space: nowrap;
    }
    .at-table-card tbody tr {
      border-bottom: 1px solid #f4f5f8;
      transition: background .18s ease;
      animation: at-row-in .45s cubic-bezier(.22,1,.36,1) both;
    }
    .at-table-card tbody tr:last-child { border-bottom: none; }
    .at-table-card tbody tr:hover { background: #f8f9ff; }
    .at-table-card tbody td {
      padding: 14px 16px;
      font-size: .875rem; color: #475569;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* code chip */
    .at-code-chip {
      font-family: 'Geist Mono', monospace; font-size: .78rem; font-weight: 500;
      color: #4f46e5; background: #eef2ff;
      border: 1px solid #e0e3ff;
      border-radius: 7px; padding: 4px 10px; display: inline-block;
      transition: background .15s, transform .15s;
    }
    .at-table-card tbody tr:hover .at-code-chip { background: #e0e7ff; transform: translateY(-1px); }
    .at-row-title { font-weight: 700; color: #1e293b; }

    /* ── badges ── */
    .at-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 11px; border-radius: 999px;
      font-size: .71rem; font-weight: 700; letter-spacing: .03em;
      animation: at-badge-pop .45s cubic-bezier(.34,1.56,.64,1) both;
      border: 1px solid transparent;
    }
    .at-badge::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: currentColor;
    }
    .at-s-open::before, .at-s-progress::before { animation: at-pulse-dot 1.8s ease-in-out infinite; }

    /* status */
    .at-s-open      { background: #fef2f2; color: #dc2626; border-color: #fee2e2; }
    .at-s-progress  { background: #fffbeb; color: #d97706; border-color: #fef3c7; }
    .at-s-resolved  { background: #f0fdf4; color: #16a34a; border-color: #dcfce7; }
    .at-s-closed    { background: #f1f5f9; color: #64748b; border-color: #e2e8f0; }
    .at-s-default   { background: #f1f5f9; color: #64748b; border-color: #e2e8f0; }

    /* priority */
    .at-p-high     { background: #fef2f2; color: #dc2626; border-color: #fee2e2; }
    .at-p-medium   { background: #fffbeb; color: #d97706; border-color: #fef3c7; }
    .at-p-low      { background: #f0fdf4; color: #16a34a; border-color: #dcfce7; }
    .at-p-critical { background: #fdf2f8; color: #db2777; border-color: #fce7f3; }
    .at-p-default  { background: #f1f5f9; color: #64748b; border-color: #e2e8f0; }

    /* ── action buttons ── */
    .at-action-btn {
      width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e5ec;
      cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
      background: #fff; transition: transform .15s ease, background .15s ease, border-color .15s ease, box-shadow .15s ease, color .15s ease;
      color: #94a3b8;
    }
    .at-action-btn:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 4px 10px rgba(16,24,40,.08); }
    .at-action-btn svg { font-size: 16px; }

    .at-btn-view:hover   { background: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
    .at-btn-reply:hover  { background: #f5f3ff; border-color: #ddd6fe; color: #7c3aed; }
    .at-btn-edit:hover   { background: #f8fafc; border-color: #cbd5e1; color: #334155; }
    .at-btn-delete:hover { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

    /* ── table footer ── */
    .at-table-footer {
      padding: 1rem 1.4rem;
      border-top: 1px solid #f4f5f8;
      background: #f8f9fc;
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: .5rem;
    }
    .at-footer-text { font-size: .8rem; color: #94a3b8; font-weight: 500; }

    /* ── empty state ── */
    .at-empty {
      text-align: center; padding: 56px 20px;
      animation: at-fade-up .5s both;
    }
    .at-empty-icon {
      width: 64px; height: 64px; border-radius: 16px; margin: 0 auto 16px;
      background: #f1f5f9; border: 1px solid #e2e8f0;
      display: flex; align-items: center; justify-content: center;
    }
    .at-empty-icon svg { font-size: 28px; color: #cbd5e1; }
    .at-empty-msg { font-size: .95rem; font-weight: 700; color: #94a3b8; }
  `;
  document.head.appendChild(s);
};

/* ─── colour helpers ─────────────────────────────────────────────────────── */
const statusCls = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("open"))     return "at-s-open";
  if (s.includes("progress")) return "at-s-progress";
  if (s.includes("resolv"))   return "at-s-resolved";
  if (s.includes("close"))    return "at-s-closed";
  return "at-s-default";
};
const priorityCls = (p = "") => {
  const v = p.toLowerCase();
  if (v === "high")     return "at-p-high";
  if (v === "medium")   return "at-p-medium";
  if (v === "low")      return "at-p-low";
  if (v === "critical") return "at-p-critical";
  return "at-p-default";
};

/* ─── Stat Card ─────────────────────────────────────────────────────────── */
const StatCard = ({ label, value, cls, icon, delay }) => (
  <div className={`at-stat-card ${cls || ""}`} style={{ animationDelay: `${delay}ms` }}>
    <div className="at-stat-icon">{icon}</div>
    <div>
      <div className="at-stat-num" style={{ animationDelay: `${delay + 100}ms` }}>{value}</div>
      <div className="at-stat-label">{label}</div>
    </div>
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function AllTickets() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { injectStyles(); setMounted(true); }, []);

  const [tickets, setTickets] = useState([
    { id:"TKT001", code:"TCK101", title:"Login Issue",   description:"Unable to login to the HRMS system",            employee:"John Doe",    priority:"High",   endDate:"2025-09-05", status:"Open",        category:"Technical", assignedTo:"IT Support", createdDate:"2024-01-20" },
    { id:"TKT002", code:"TCK102", title:"Payroll Bug",   description:"Payroll calculation error in salary processing", employee:"Jane Smith",  priority:"Medium", endDate:"2025-09-10", status:"In Progress", category:"Payroll",   assignedTo:"HR Support", createdDate:"2024-01-22" },
    { id:"TKT003", code:"TCK103", title:"Signup Issue",  description:"New employee registration not working",          employee:"Lee William", priority:"High",   endDate:"2025-09-15", status:"Open",        category:"Technical", assignedTo:"IT Support", createdDate:"2024-01-25" },
    { id:"TKT004", code:"TCK104", title:"Dashboard Bug", description:"Dashboard not loading properly",                 employee:"Joseph Daw",  priority:"Medium", endDate:"2025-09-20", status:"In Progress", category:"Technical", assignedTo:"IT Support", createdDate:"2024-01-28" },
  ]);

  const [page, setPage]                     = useState(0);
  const [rowsPerPage]                       = useState(10);
  const [search, setSearch]                 = useState("");
  const [filterStatus, setFilterStatus]     = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const [openData,   setOpenData]   = useState(false);
  const [viewShow,   setViewShow]   = useState(false);
  const [editShow,   setEditShow]   = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [replyShow,  setReplyShow]  = useState(false);

  const [selectedIndex,  setSelectedIndex]  = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({
    title:"", description:"", employee:"", priority:"Medium", endDate:"", category:"Technical"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleClose = () => {
    setOpenData(false); setViewShow(false); setEditShow(false);
    setDeleteShow(false); setReplyShow(false); setSelectedIndex(null);
    setFormData({ title:"", description:"", employee:"", priority:"Medium", endDate:"", category:"Technical" });
  };
  const handleView   = (t)    => { setSelectedTicket(t); setViewShow(true); };
  const handleEdit   = (t, i) => {
    setSelectedTicket(t); setSelectedIndex(i);
    setFormData({ title:t.title||"", description:t.description||"", employee:t.employee||"",
                  priority:t.priority||"Medium", endDate:t.endDate||"", category:t.category||"Technical" });
    setEditShow(true);
  };
  const handleDelete = (i)    => { setSelectedIndex(i); setDeleteShow(true); };
  const handleReply  = (t, i) => { setSelectedTicket(t); setSelectedIndex(i); setReplyShow(true); };

  const handleAdd = () => {
    setTickets([...tickets, {
      ...formData,
      id:`TKT${String(tickets.length+1).padStart(3,"0")}`,
      code:`TKT${String(tickets.length+1).padStart(4,"0")}`,
      status:"Open", createdDate:new Date().toISOString().split("T")[0],
      assignedTo:"System", replies:[]
    }]);
    handleClose();
  };
  const handleUpdate = () => {
    const updated = [...tickets];
    updated[selectedIndex] = { ...updated[selectedIndex], ...formData };
    setTickets(updated); handleClose();
  };
  const confirmDelete = () => {
    setTickets(tickets.filter((_,i) => i !== selectedIndex)); handleClose();
  };
  const handleAddReply = (replyText, replyType) => {
    if (selectedTicket && selectedIndex !== null) {
      const updated = [...tickets];
      if (!updated[selectedIndex].replies) updated[selectedIndex].replies = [];
      updated[selectedIndex].replies.push({
        id:Date.now(), message:replyText,
        author:replyType === "support" ? "Support Team" : selectedTicket.employee,
        timestamp:new Date().toISOString(), type:replyType
      });
      if (replyType === "support" && updated[selectedIndex].status === "Open")
        updated[selectedIndex].status = "In Progress";
      setTickets(updated);
    }
  };

  const filtered = tickets.filter(t => {
    const ms = t.title.toLowerCase().includes(search.toLowerCase()) ||
               t.employee.toLowerCase().includes(search.toLowerCase()) ||
               t.code.toLowerCase().includes(search.toLowerCase());
    return ms &&
      (filterStatus   === "all" || t.status   === filterStatus) &&
      (filterPriority === "all" || t.priority === filterPriority);
  });
  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (!mounted) return null;

  const total   = tickets.length;
  const openCnt = tickets.filter(t => t.status === "Open").length;
  const progCnt = tickets.filter(t => t.status === "In Progress").length;
  const resCnt  = tickets.filter(t => t.status === "Resolved").length;

  return (
    <div className="at-root">

      {/* ── page header ── */}
      <div className="at-page-header">
        <div>
          <div className="at-page-title">
            <div className="at-page-title-icon">
              <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1.09a2 2 0 0 0 0 3.82V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.09a2 2 0 0 0 0-3.82V9z"/>
              </svg>
            </div>
            All Tickets
          </div>
          <div className="at-page-sub">Manage and track all support tickets</div>
        </div>
      </div>

      {/* ── stat cards ── */}
      <div className="at-stats">
        <StatCard label="Total Tickets" value={total}   cls=""            delay={50}
          icon={<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1.09a2 2 0 0 0 0 3.82V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.09a2 2 0 0 0 0-3.82V9z"/></svg>}
        />
        <StatCard label="Open"          value={openCnt} cls="at-stat-open" delay={100}
          icon={<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>}
        />
        <StatCard label="In Progress"   value={progCnt} cls="at-stat-prog" delay={150}
          icon={<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
        <StatCard label="Resolved"      value={resCnt}  cls="at-stat-done" delay={200}
          icon={<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
        />
      </div>

      {/* ── toolbar ── */}
      <div className="at-toolbar">
        <div className="at-search-wrap">
          <Search className="at-search-icon" />
          <input
            className="at-search-input"
            placeholder="Search tickets, employees…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
          />
        </div>

        <select className="at-filter-select" value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value); setPage(0); }}>
          <option value="all">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select className="at-filter-select" value={filterPriority}
          onChange={e => { setFilterPriority(e.target.value); setPage(0); }}>
          <option value="all">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
          <option value="Critical">Critical</option>
        </select>

        <button className="at-btn-create" onClick={() => setOpenData(true)}>
          <Add sx={{ fontSize: 17 }} />
          Create Ticket
        </button>
      </div>

      {/* ── table ── */}
      <div className="at-table-card">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Employee</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={10}>
                  <div className="at-empty">
                    <div className="at-empty-icon">
                      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1.09a2 2 0 0 0 0 3.82V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.09a2 2 0 0 0 0-3.82V9z"/>
                      </svg>
                    </div>
                    <div className="at-empty-msg">No tickets found</div>
                  </div>
                </td>
              </tr>
            ) : paged.map((ticket, idx) => (
              <tr key={ticket.id} style={{ animationDelay: `${idx * 40}ms` }}>
                <td style={{ color:"#94a3b8", fontSize:".8rem", fontWeight:600 }}>
                  {page * rowsPerPage + idx + 1}
                </td>
                <td><span className="at-code-chip">{ticket.code}</span></td>
                <td><span className="at-row-title">{ticket.title}</span></td>
                <td style={{ color:"#64748b" }}>{ticket.category}</td>
                <td>
                  <span className={`at-badge ${priorityCls(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td>
                  <span className={`at-badge ${statusCls(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.employee}</td>
                <td style={{ color:"#64748b" }}>{ticket.assignedTo}</td>
                <td style={{ color:"#94a3b8", fontSize:".82rem", fontWeight:500 }}>{ticket.endDate}</td>
                <td>
                  <div style={{ display:"flex", gap:6 }}>
                    <button className="at-action-btn at-btn-view"   title="View"
                      onClick={() => handleView(ticket)}>
                      <VisibilityOutlined />
                    </button>
                    <button className="at-action-btn at-btn-reply"  title="Reply"
                      onClick={() => handleReply(ticket, tickets.indexOf(ticket))}>
                      <Reply />
                    </button>
                    <button className="at-action-btn at-btn-edit"   title="Edit"
                      onClick={() => handleEdit(ticket, tickets.indexOf(ticket))}>
                      <EditOutlined />
                    </button>
                    <button className="at-action-btn at-btn-delete" title="Delete"
                      onClick={() => handleDelete(tickets.indexOf(ticket))}>
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="at-table-footer">
          <span className="at-footer-text">
            Showing {filtered.length === 0 ? 0 : page * rowsPerPage + 1}–{Math.min((page+1)*rowsPerPage, filtered.length)} of {filtered.length} tickets
          </span>
          <Pagination
            count={Math.ceil(filtered.length / rowsPerPage)}
            page={page + 1}
            onChange={(_, v) => setPage(v - 1)}
            size="small"
            sx={{
              "& .MuiPaginationItem-root": {
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:".8rem", fontWeight:600, borderRadius:"8px",
                color:"#64748b", border:"1px solid #e2e5ec",
              },
              "& .Mui-selected": {
                background:"linear-gradient(135deg,#6366f1,#4f46e5) !important",
                color:"#fff !important",
                borderColor:"#4f46e5 !important",
              },
            }}
          />
        </div>
      </div>

      {/* ── dialogs ── */}
      <CommonDialog
        open={openData || viewShow || editShow || deleteShow || replyShow}
        onClose={handleClose}
        dialogTitle={
          openData   ? "Create New Ticket" :
          viewShow   ? "Ticket Details"    :
          editShow   ? "Edit Ticket"       :
          deleteShow ? "Delete Ticket"     :
          replyShow  ? "Reply to Ticket"   : ""
        }
        dialogContent={
          openData ? (
            <CreateTicket formData={formData} handleInputChange={handleInputChange}
              handleCreate={handleAdd} handleClose={handleClose} />
          ) : viewShow ? (
            <ViewTicket selectedTicket={selectedTicket} handleClose={handleClose}
              getStatusColor={statusCls} getPriorityColor={priorityCls} />
          ) : editShow ? (
            <EditTicket formData={formData} handleInputChange={handleInputChange}
              handleUpdate={handleUpdate} handleClose={handleClose} selectedTicket={selectedTicket} />
          ) : deleteShow ? (
            <DeleteTicket selectedTicket={selectedTicket}
              handleDelete={confirmDelete} handleClose={handleClose} />
          ) : replyShow ? (
            <ReplyTicket selectedTicket={selectedTicket}
              onAddReply={handleAddReply} onClose={handleClose} />
          ) : null
        }
        maxWidth={deleteShow ? "xs" : "md"}
      />
    </div>
  );
}
