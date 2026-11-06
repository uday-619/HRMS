// "use client";

// import React, { useState } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   TextField,
//   Select,
//   MenuItem,
//   InputAdornment,
//   Pagination,
//   Stack,
//   Typography,
// } from "@mui/material";
// import {
//   Add,
//   EditOutlined,
//   DeleteOutlined,
//   VisibilityOutlined,
//   Search,
//   FileDownloadOutlined,
// } from "@mui/icons-material";
// import CommonDialog from "@/components/commonDialog";
// import CreateBranch from "@/components/Branch/create";
// import EditBranch from "@/components/Branch/edit";
// import ViewBranch from "@/components/Branch/view";
// import DeleteBranch from "@/components/Branch/delete";

// const INIT_BRANCHES = [
//   { id: "BR001", branchName: "Head Office", branchLocation: "Mumbai, Maharashtra", status: "Active", createdAt: "2024-01-15" },
//   { id: "BR002", branchName: "Delhi Branch", branchLocation: "New Delhi, Delhi", status: "Active", createdAt: "2024-02-20" },
//   { id: "BR003", branchName: "Bangalore Branch", branchLocation: "Bangalore, Karnataka", status: "Active", createdAt: "2024-03-10" },
//   { id: "BR004", branchName: "Chennai Branch", branchLocation: "Chennai, Tamil Nadu", status: "Active", createdAt: "2024-03-25" },
//   { id: "BR005", branchName: "Kolkata Branch", branchLocation: "Kolkata, West Bengal", status: "Active", createdAt: "2024-04-05" },
//   { id: "BR006", branchName: "Hyderabad Branch", branchLocation: "Hyderabad, Telangana", status: "Active", createdAt: "2024-04-15" },
//   { id: "BR007", branchName: "Pune Branch", branchLocation: "Pune, Maharashtra", status: "Active", createdAt: "2024-04-20" },
//   { id: "BR008", branchName: "Ahmedabad Branch", branchLocation: "Ahmedabad, Gujarat", status: "Inactive", createdAt: "2024-05-01" },
//   { id: "BR009", branchName: "Jaipur Branch", branchLocation: "Jaipur, Rajasthan", status: "Active", createdAt: "2024-05-10" },
//   { id: "BR010", branchName: "Kochi Branch", branchLocation: "Kochi, Kerala", status: "Active", createdAt: "2024-05-15" },
// ];

// /* ─── helpers ─── */
// const nextId = (branches) => {
//   const nums = branches.map((b) => parseInt(b.id.replace("BR", "")) || 0);
//   return "BR" + String(Math.max(0, ...nums) + 1).padStart(3, "0");
// };

// const exportCSV = (branches) => {
//   const rows = [
//     ["ID", "Branch Name", "Location", "Status", "Created"],
//     ...branches.map((b) => [b.id, b.branchName, b.branchLocation, b.status, b.createdAt]),
//   ];
//   const csv = rows.map((r) => r.join(",")).join("\n");
//   const a = document.createElement("a");
//   a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
//   a.download = "branches.csv";
//   a.click();
// };

// /* ─── stat card ─── */
// const StatCard = ({ label, value, color }) => (
//   <Box
//     sx={{
//       flex: 1,
//       background: "var(--mui-palette-background-default, #f5f6f9)",
//       border: "3px solid",
//       borderColor: "divider",
//       borderRadius: 10,
//       p: "20px 100px",
//     }}
//   >
//     <Typography sx={{ fontSize: 20, color: "text.primary", mb: 0.5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
//       {label}
//     </Typography>
//     <Typography sx={{ fontSize: 30, fontWeight: 600, color: color || "text.primary" }}>
//       {value}
//     </Typography>
//   </Box>
// );

// /* ─── status badge ─── */
// const StatusBadge = ({ status }) => {
//   const isActive = status === "Active";
//   return (
//     <Box
//       sx={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: "5px",
//         px: "9px",
//         py: "3px",
//         borderRadius: "99px",
//         fontSize: 11,
//         fontWeight: 500,
//         background: isActive ? "#f5f3fb" : "#FCEBEB",
//         color: isActive ? "#63d009" : "#A32D2D",
//         "&::before": {
//           content: '""',
//           width: 6,
//           height: 6,
//           borderRadius: "50%",
//           background: isActive ? "#639922" : "#E24B4A",
//           display: "inline-block",
//         },
//       }}
//     >
//       {status}
//     </Box>
//   );
// };

// /* ─── main page ─── */
// const BranchPage = () => {
//   const [branches, setBranches] = useState(INIT_BRANCHES);
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 10;
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   const [openData, setOpenData] = useState(false);
//   const [viewShow, setViewShow] = useState(false);
//   const [editShow, setEditShow] = useState(false);
//   const [deleteShow, setDeleteShow] = useState(false);
//   const [selectedBranch, setSelectedBranch] = useState(null);

//   const handleClose = () => {
//     setOpenData(false);
//     setViewShow(false);
//     setEditShow(false);
//     setDeleteShow(false);
//     setSelectedBranch(null);
//   };

//   const handleCreate = (formData) => {
//     setBranches((prev) => [
//       ...prev,
//       { id: nextId(prev), ...formData, createdAt: new Date().toISOString().split("T")[0] },
//     ]);
//     handleClose();
//   };

//   const handleUpdate = (formData) => {
//     setBranches((prev) =>
//       prev.map((b) => (b.id === selectedBranch.id ? { ...b, ...formData } : b))
//     );
//     handleClose();
//   };

//   const handleDelete = () => {
//     setBranches((prev) => prev.filter((b) => b.id !== selectedBranch.id));
//     handleClose();
//   };

//   const filtered = branches.filter((b) => {
//     const q = search.toLowerCase();
//     const matchSearch =
//       b.branchName.toLowerCase().includes(q) ||
//       b.branchLocation.toLowerCase().includes(q) ||
//       b.id.toLowerCase().includes(q);
//     const matchStatus = filterStatus === "all" || b.status === filterStatus;
//     return matchSearch && matchStatus;
//   });

//   const active = branches.filter((b) => b.status === "Active").length;
//   const inactive = branches.length - active;
//   const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
//   const currentPage = Math.min(page, totalPages - 1);
//   const slice = filtered.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

//   const isAnyOpen = openData || viewShow || editShow || deleteShow;
//   const dialogTitle = openData ? "Add Branch" : viewShow ? "Branch Details" : editShow ? "Edit Branch" : deleteShow ? "Delete Branch" : "";

//   return (
//     <Box sx={{ p: "0.5rem" }}>
//       {/* Stats */}
//       <Box sx={{ display: "flex", gap: "10px", mb: 2 }}>
//         <StatCard label="Total branches" value={branches.length} />
//         <StatCard label="Active" value={active} color="#3B6D11" />
//         <StatCard label="Inactive" value={inactive} color="#A32D2D" />
//       </Box>

//       {/* Toolbar */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, mb: 2, flexWrap: "wrap" }}>
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <TextField
//             placeholder="Search branches…"
//             value={search}
//             onChange={(e) => { setSearch(e.target.value); setPage(0); }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search sx={{ fontSize: 18, color: "text.secondary" }} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: 240, "& .MuiOutlinedInput-root": { height: 36, fontSize: 13 } }}
//           />
//           <Select
//             value={filterStatus}
//             onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }}
//             sx={{ height: 36, fontSize: 13, minWidth: 130 }}
//           >
//             <MenuItem value="all">All status</MenuItem>
//             <MenuItem value="Active">Active</MenuItem>
//             <MenuItem value="Inactive">Inactive</MenuItem>
//           </Select>
//         </Box>

//         <Box sx={{ display: "flex", gap: 1 }}>
//           <button
//             className="hrms-btn"
//             onClick={() => exportCSV(branches)}
//             style={{ height: 36, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}
//           >
//             <FileDownloadOutlined sx={{ fontSize: 16 }} />
//             Export CSV
//           </button>
//           <button
//             className="hrms-btn hrms-btn-primary"
//             onClick={() => setOpenData(true)}
//             style={{ height: 36, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}
//           >
//             <Add sx={{ fontSize: 16 }} />
//             Add Branch
//           </button>
//         </Box>
//       </Box>

//       {/* Table */}
//       <Box className="hrms-card">
//         <Box className="hrms-card-content" sx={{ padding: 0 }}>
//           <Table className="hrms-table">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ width: 56 }}>S. No.</TableCell>
//                 <TableCell sx={{ width: 90 }}>ID</TableCell>
//                 <TableCell>Branch Name</TableCell>
//                 <TableCell>Location</TableCell>
//                 <TableCell sx={{ width: 110 }}>Status</TableCell>
//                 <TableCell sx={{ width: 110 }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {slice.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} sx={{ textAlign: "center", py: 5, color: "text.secondary", fontSize: 13 }}>
//                     No branches found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 slice.map((branch, index) => (
//                   <TableRow key={branch.id}>
//                     <TableCell>{currentPage * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>
//                       <Typography sx={{ fontSize: 12, fontWeight: 500, color: "text.secondary" }}>
//                         {branch.id}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{branch.branchName}</Typography>
//                     </TableCell>
//                     <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>{branch.branchLocation}</TableCell>
//                     <TableCell>
//                       <StatusBadge status={branch.status} />
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", gap: "4px" }}>
//                         <IconButton
//                           size="small"
//                           title="View"
//                           onClick={() => { setSelectedBranch(branch); setViewShow(true); }}
//                           sx={{ width: 30, height: 30, borderRadius: 1, border: "0.5px solid", borderColor: "divider", color: "text.secondary", "&:hover": { color: "#185FA5", borderColor: "#B5D4F4", background: "#E6F1FB" } }}
//                         >
//                           <VisibilityOutlined sx={{ fontSize: 15 }} />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           title="Edit"
//                           onClick={() => { setSelectedBranch(branch); setEditShow(true); }}
//                           sx={{ width: 30, height: 30, borderRadius: 1, border: "0.5px solid", borderColor: "divider", color: "text.secondary", "&:hover": { color: "#3B6D11", borderColor: "#C0DD97", background: "#EAF3DE" } }}
//                         >
//                           <EditOutlined sx={{ fontSize: 15 }} />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           title="Delete"
//                           onClick={() => { setSelectedBranch(branch); setDeleteShow(true); }}
//                           sx={{ width: 30, height: 30, borderRadius: 1, border: "0.5px solid", borderColor: "divider", color: "text.secondary", "&:hover": { color: "#A32D2D", borderColor: "#F7C1C1", background: "#FCEBEB" } }}
//                         >
//                           <DeleteOutlined sx={{ fontSize: 15 }} />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </Box>

//         {/* Footer */}
//         <Box sx={{ px: 2, py: "10px", borderTop: "0.5px solid", borderColor: "divider", background: "#fafafa" }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
//               Showing {filtered.length === 0 ? 0 : currentPage * rowsPerPage + 1}–
//               {Math.min((currentPage + 1) * rowsPerPage, filtered.length)} of {filtered.length} branches
//             </Typography>
//             <Pagination
//               count={totalPages}
//               page={currentPage + 1}
//               onChange={(_, v) => setPage(v - 1)}
//               color="primary"
//               size="small"
//             />
//           </Stack>
//         </Box>
//       </Box>

//       {/* Dialog */}
//       <CommonDialog
//         open={isAnyOpen}
//         onClose={handleClose}
//         dialogTitle={dialogTitle}
//         dialogContent={
//           openData ? (
//             <CreateBranch handleCreate={handleCreate} handleClose={handleClose} />
//           ) : viewShow ? (
//             <ViewBranch selectedBranch={selectedBranch} handleClose={handleClose} />
//           ) : editShow ? (
//             <EditBranch handleUpdate={handleUpdate} handleClose={handleClose} selectedBranch={selectedBranch} />
//           ) : deleteShow ? (
//             <DeleteBranch selectedBranch={selectedBranch} handleDelete={handleDelete} handleClose={handleClose} />
//           ) : null
//         }
//         maxWidth={deleteShow ? "xs" : "sm"}
//         fullWidth
//       />
//     </Box>
//   );
// };

// export default BranchPage;







"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─── */
const INIT_BRANCHES = [
  { id: "BR001", branchName: "Head Office", branchLocation: "Mumbai, Maharashtra", status: "Active", createdAt: "2024-01-15" },
  { id: "BR002", branchName: "Delhi Branch", branchLocation: "New Delhi, Delhi", status: "Active", createdAt: "2024-02-20" },
  { id: "BR003", branchName: "Bangalore Branch", branchLocation: "Bangalore, Karnataka", status: "Active", createdAt: "2024-03-10" },
  { id: "BR004", branchName: "Chennai Branch", branchLocation: "Chennai, Tamil Nadu", status: "Active", createdAt: "2024-03-25" },
  { id: "BR005", branchName: "Kolkata Branch", branchLocation: "Kolkata, West Bengal", status: "Active", createdAt: "2024-04-05" },
  { id: "BR006", branchName: "Hyderabad Branch", branchLocation: "Hyderabad, Telangana", status: "Active", createdAt: "2024-04-15" },
  { id: "BR007", branchName: "Pune Branch", branchLocation: "Pune, Maharashtra", status: "Active", createdAt: "2024-04-20" },
  { id: "BR008", branchName: "Ahmedabad Branch", branchLocation: "Ahmedabad, Gujarat", status: "Inactive", createdAt: "2024-05-01" },
  { id: "BR009", branchName: "Jaipur Branch", branchLocation: "Jaipur, Rajasthan", status: "Active", createdAt: "2024-05-10" },
  { id: "BR010", branchName: "Kochi Branch", branchLocation: "Kochi, Kerala", status: "Active", createdAt: "2024-05-15" },
];

const ROWS_PER_PAGE = 7;

const nextId = (branches) => {
  const nums = branches.map((b) => parseInt(b.id.replace("BR", "")) || 0);
  return "BR" + String(Math.max(0, ...nums) + 1).padStart(3, "0");
};

const exportCSV = (branches) => {
  const rows = [
    ["ID", "Branch Name", "Location", "Status", "Created"],
    ...branches.map((b) => [b.id, b.branchName, b.branchLocation, b.status, b.createdAt]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = "branches.csv";
  a.click();
};

/* ─── ANIMATED COUNTER ─── */
function AnimatedCount({ value }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const end = value;
    if (start === end) return;
    const steps = 24;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(Math.round(start + ((end - start) * i) / steps));
      if (i >= steps) { setDisplay(end); clearInterval(id); }
    }, 18);
    prev.current = end;
    return () => clearInterval(id);
  }, [value]);
  return <>{display}</>;
}

/* ─── STAT CARD ─── */
function StatCard({ label, value, icon, accent, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <div style={{
      flex: 1,
      background: "#fff",
      borderRadius: 18,
      border: "1.5px solid #eef0f4",
      padding: "22px 28px",
      display: "flex",
      alignItems: "center",
      gap: 18,
      boxShadow: "0 2px 16px rgba(30,40,80,0.06)",
      transform: visible ? "translateY(0)" : "translateY(22px)",
      opacity: visible ? 1 : 0,
      transition: "transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.5s ease",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 90, height: 90,
        borderRadius: "0 18px 0 90px",
        background: accent + "14",
      }} />
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: accent + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#8a94a6", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: accent, lineHeight: 1 }}>
          <AnimatedCount value={value} />
        </div>
      </div>
    </div>
  );
}

/* ─── STATUS BADGE ─── */
function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 99,
      fontSize: 12, fontWeight: 600,
      background: isActive ? "#e8f9ee" : "#fef0f0",
      color: isActive ? "#1a7f3c" : "#c0392b",
      border: `1px solid ${isActive ? "#b6e8c8" : "#f5c0c0"}`,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: isActive ? "#27ae60" : "#e74c3c",
        display: "inline-block",
        boxShadow: isActive ? "0 0 0 2px #b6e8c840" : "0 0 0 2px #f5c0c040",
        animation: "pulse 2s infinite",
      }} />
      {status}
    </span>
  );
}

/* ─── AVATAR ─── */
function BranchAvatar({ name }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const colors = ["#5b4cf5","#0ea5e9","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#14b8a6"];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div style={{
      width: 34, height: 34, borderRadius: 10,
      background: colors[idx] + "22",
      color: colors[idx],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 700, flexShrink: 0, letterSpacing: "0.04em",
    }}>{initials}</div>
  );
}

/* ─── MODAL ─── */
function Modal({ open, onClose, title, children, maxWidth = 480 }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15,20,40,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
      backdropFilter: "blur(4px)",
      animation: "fadeIn 0.2s ease",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#fff", borderRadius: 22,
        width: "100%", maxWidth,
        boxShadow: "0 24px 80px rgba(20,30,80,0.18)",
        animation: "slideUp 0.3s cubic-bezier(.22,1,.36,1)",
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #f0f2f5" }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1a2035" }}>{title}</h2>
          <button onClick={onClose} style={{ border: "none", background: "#f5f6f8", width: 32, height: 32, borderRadius: 10, cursor: "pointer", fontSize: 18, color: "#8a94a6", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <div style={{ padding: "24px" }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── FORM FIELD ─── */
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#5a6478", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  padding: "10px 14px", border: "1.5px solid #e4e7ef",
  borderRadius: 12, fontSize: 14, color: "#1a2035",
  background: "#fafbfc", outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

/* ─── CREATE FORM ─── */
function CreateForm({ onCreate, onClose }) {
  const [form, setForm] = useState({ branchName: "", branchLocation: "", status: "Active" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <>
      <Field label="Branch Name">
        <input style={inputStyle} value={form.branchName} onChange={set("branchName")} placeholder="e.g. Surat Branch" />
      </Field>
      <Field label="Location">
        <input style={inputStyle} value={form.branchLocation} onChange={set("branchLocation")} placeholder="City, State" />
      </Field>
      <Field label="Status">
        <select style={inputStyle} value={form.status} onChange={set("status")}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: 12, border: "1.5px solid #e4e7ef", background: "#fff", color: "#5a6478", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Cancel</button>
        <button onClick={() => form.branchName && form.branchLocation && onCreate(form)} style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#5b4cf5,#7c6fff)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, boxShadow: "0 4px 14px rgba(91,76,245,0.35)" }}>
          Add Branch
        </button>
      </div>
    </>
  );
}

/* ─── EDIT FORM ─── */
function EditForm({ branch, onUpdate, onClose }) {
  const [form, setForm] = useState({ branchName: branch.branchName, branchLocation: branch.branchLocation, status: branch.status });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <>
      <Field label="Branch Name">
        <input style={inputStyle} value={form.branchName} onChange={set("branchName")} />
      </Field>
      <Field label="Location">
        <input style={inputStyle} value={form.branchLocation} onChange={set("branchLocation")} />
      </Field>
      <Field label="Status">
        <select style={inputStyle} value={form.status} onChange={set("status")}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: 12, border: "1.5px solid #e4e7ef", background: "#fff", color: "#5a6478", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Cancel</button>
        <button onClick={() => onUpdate(form)} style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, boxShadow: "0 4px 14px rgba(14,165,233,0.35)" }}>
          Save Changes
        </button>
      </div>
    </>
  );
}

/* ─── VIEW MODAL ─── */
function ViewDetails({ branch, onClose }) {
  const fields = [
    ["Branch ID", branch.id],
    ["Branch Name", branch.branchName],
    ["Location", branch.branchLocation],
    ["Status", null],
    ["Created", branch.createdAt],
  ];
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22, padding: "14px", background: "#f8f9ff", borderRadius: 14 }}>
        <BranchAvatar name={branch.branchName} />
        <div>
          <div style={{ fontWeight: 700, color: "#1a2035", fontSize: 15 }}>{branch.branchName}</div>
          <div style={{ color: "#8a94a6", fontSize: 13 }}>{branch.branchLocation}</div>
        </div>
      </div>
      {fields.map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f2f5", fontSize: 14 }}>
          <span style={{ color: "#8a94a6", fontWeight: 500 }}>{k}</span>
          {k === "Status" ? <StatusBadge status={branch.status} /> : <span style={{ fontWeight: 600, color: "#1a2035" }}>{v}</span>}
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button onClick={onClose} style={{ padding: "10px 22px", borderRadius: 12, border: "1.5px solid #e4e7ef", background: "#fff", color: "#5a6478", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Close</button>
      </div>
    </>
  );
}

/* ─── DELETE CONFIRM ─── */
function DeleteConfirm({ branch, onDelete, onClose }) {
  return (
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <div style={{ width: 56, height: 56, borderRadius: 18, background: "#fef0f0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 26 }}>🗑️</div>
      <h3 style={{ margin: "0 0 8px", color: "#1a2035", fontSize: 17 }}>Delete Branch?</h3>
      <p style={{ margin: "0 0 24px", color: "#8a94a6", fontSize: 14, lineHeight: 1.6 }}>
        {`You're about to delete `}<strong style={{ color: "#1a2035" }}>{branch.branchName}</strong>. This action cannot be undone.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={onClose} style={{ padding: "10px 22px", borderRadius: 12, border: "1.5px solid #e4e7ef", background: "#fff", color: "#5a6478", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Cancel</button>
        <button onClick={onDelete} style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#ef4444,#f87171)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, boxShadow: "0 4px 14px rgba(239,68,68,0.35)" }}>
          Delete
        </button>
      </div>
    </div>
  );
}

/* ─── ACTION ICON BUTTON ─── */
function ActionBtn({ title, onClick, hoverColor, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32, height: 32, borderRadius: 9, border: "1.5px solid",
        borderColor: hovered ? hoverColor + "60" : "#e8eaf0",
        background: hovered ? hoverColor + "12" : "#fafbfc",
        color: hovered ? hoverColor : "#8a94a6",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15, transition: "all 0.18s ease",
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}
    >{children}</button>
  );
}

/* ─── TABLE ROW ─── */
function BranchRow({ branch, index, onView, onEdit, onDelete, visible }) {
  return (
    <tr style={{
      borderBottom: "1px solid #f3f5f9",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-12px)",
      transition: `opacity 0.35s ease ${index * 40}ms, transform 0.35s ease ${index * 40}ms`,
    }}>
      <td style={{ padding: "14px 16px", fontSize: 12, color: "#c2c8d8", fontWeight: 600 }}>
        {String(index + 1).padStart(2, "0")}
      </td>
      <td style={{ padding: "14px 16px" }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#5b4cf5", background: "#f0eeff", padding: "3px 8px", borderRadius: 7 }}>{branch.id}</span>
      </td>
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BranchAvatar name={branch.branchName} />
          <span style={{ fontWeight: 600, color: "#1a2035", fontSize: 14 }}>{branch.branchName}</span>
        </div>
      </td>
      <td style={{ padding: "14px 16px", color: "#8a94a6", fontSize: 13 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14 }}>📍</span>
          {branch.branchLocation}
        </span>
      </td>
      <td style={{ padding: "14px 16px", fontSize: 12, color: "#a0aab8" }}>{branch.createdAt}</td>
      <td style={{ padding: "14px 16px" }}><StatusBadge status={branch.status} /></td>
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <ActionBtn title="View" onClick={onView} hoverColor="#0ea5e9">👁</ActionBtn>
          <ActionBtn title="Edit" onClick={onEdit} hoverColor="#10b981">✏️</ActionBtn>
          <ActionBtn title="Delete" onClick={onDelete} hoverColor="#ef4444">🗑</ActionBtn>
        </div>
      </td>
    </tr>
  );
}

/* ─── MAIN PAGE ─── */
export default function BranchPage() {
  const [branches, setBranches] = useState(INIT_BRANCHES);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsVisible, setRowsVisible] = useState(false);

  const [modal, setModal] = useState(null); // "create" | "view" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeaderVisible(true), 80); }, []);
  useEffect(() => { setRowsVisible(false); setTimeout(() => setRowsVisible(true), 60); }, [page, search, filterStatus]);

  const closeModal = () => { setModal(null); setSelected(null); };

  const handleCreate = (formData) => {
    setBranches(prev => [...prev, { id: nextId(prev), ...formData, createdAt: new Date().toISOString().split("T")[0] }]);
    closeModal();
  };
  const handleUpdate = (formData) => {
    setBranches(prev => prev.map(b => b.id === selected.id ? { ...b, ...formData } : b));
    closeModal();
  };
  const handleDelete = () => {
    setBranches(prev => prev.filter(b => b.id !== selected.id));
    closeModal();
  };

  const filtered = branches.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = b.branchName.toLowerCase().includes(q) || b.branchLocation.toLowerCase().includes(q) || b.id.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const active = branches.filter(b => b.status === "Active").length;
  const inactive = branches.length - active;
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages - 1);
  const slice = filtered.slice(currentPage * ROWS_PER_PAGE, (currentPage + 1) * ROWS_PER_PAGE);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(155deg,#f8f9ff 0%,#f0f2ff 40%,#f5f8ff 100%)", padding: "28px 24px", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 2px transparent } 50% { box-shadow: 0 0 0 3px currentColor } }
        @keyframes shimmer { from { background-position: -200% 0 } to { background-position: 200% 0 } }
        .hrms-search:focus { border-color: #5b4cf5 !important; box-shadow: 0 0 0 3px rgba(91,76,245,0.12) !important; }
        .hrms-select:focus { border-color: #5b4cf5 !important; outline: none; }
        tr:hover td { background: #f8f9ff !important; }
        .page-btn { transition: all 0.18s ease; }
        .page-btn:hover { background: #f0eeff !important; color: #5b4cf5 !important; border-color: #c4b8ff !important; }
        .page-btn.active { background: #5b4cf5 !important; color: #fff !important; border-color: #5b4cf5 !important; }
      `}</style>

      {/* ─── Header ─── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        marginBottom: 28,
        opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(-16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#5b4cf5,#7c6fff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 4px 14px rgba(91,76,245,0.3)" }}>🏢</div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1a2035", letterSpacing: "-0.02em" }}>Branch Management</h1>
          </div>
          <p style={{ margin: 0, color: "#8a94a6", fontSize: 14 }}>Manage all your organization branches from one place</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => exportCSV(branches)}
            style={{ padding: "10px 18px", borderRadius: 12, border: "1.5px solid #e4e7ef", background: "#fff", color: "#5a6478", fontWeight: 600, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 7, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.18s" }}
          >
            ⬇ Export CSV
          </button>
          <button
            onClick={() => setModal("create")}
            style={{ padding: "10px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#5b4cf5,#7c6fff)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 7, boxShadow: "0 4px 16px rgba(91,76,245,0.35)", transition: "all 0.2s" }}
          >
            + Add Branch
          </button>
        </div>
      </div>

      {/* ─── Stat Cards ─── */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Branches" value={branches.length} icon="🏢" accent="#5b4cf5" delay={0} />
        <StatCard label="Active" value={active} icon="✅" accent="#10b981" delay={80} />
        <StatCard label="Inactive" value={inactive} icon="⏸️" accent="#ef4444" delay={160} />
      </div>

      {/* ─── Main Card ─── */}
      <div style={{ background: "#fff", borderRadius: 22, border: "1.5px solid #eef0f4", boxShadow: "0 4px 30px rgba(20,30,80,0.06)", overflow: "hidden" }}>

        {/* Toolbar */}
        <div style={{ padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f5f9", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#c2c8d8" }}>🔍</span>
              <input
                className="hrms-search"
                placeholder="Search branches…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0); }}
                style={{ padding: "9px 14px 9px 36px", border: "1.5px solid #e8eaf0", borderRadius: 12, fontSize: 13, color: "#1a2035", width: 230, background: "#fafbfc", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "inherit" }}
              />
            </div>
            <select
              className="hrms-select"
              value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setPage(0); }}
              style={{ padding: "9px 14px", border: "1.5px solid #e8eaf0", borderRadius: 12, fontSize: 13, color: "#5a6478", background: "#fafbfc", cursor: "pointer", fontFamily: "inherit" }}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <span style={{ fontSize: 13, color: "#a0aab8", fontWeight: 500 }}>
            {filtered.length} branch{filtered.length !== 1 ? "es" : ""} found
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fc" }}>
                {["#", "ID", "Branch Name", "Location", "Created", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a0aab8", textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slice.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "60px 16px", color: "#c2c8d8" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#8a94a6" }}>No branches found</div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your search or filters</div>
                  </td>
                </tr>
              ) : (
                slice.map((branch, i) => (
                  <BranchRow
                    key={branch.id}
                    branch={branch}
                    index={currentPage * ROWS_PER_PAGE + i}
                    visible={rowsVisible}
                    onView={() => { setSelected(branch); setModal("view"); }}
                    onEdit={() => { setSelected(branch); setModal("edit"); }}
                    onDelete={() => { setSelected(branch); setModal("delete"); }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: "14px 22px", borderTop: "1px solid #f3f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#a0aab8" }}>
            Showing {filtered.length === 0 ? 0 : currentPage * ROWS_PER_PAGE + 1}–{Math.min((currentPage + 1) * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="page-btn"
              style={{ width: 34, height: 34, borderRadius: 10, border: "1.5px solid #e8eaf0", background: "#fafbfc", color: "#8a94a6", cursor: currentPage === 0 ? "not-allowed" : "pointer", opacity: currentPage === 0 ? 0.4 : 1, fontSize: 16 }}
            >‹</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`page-btn${i === currentPage ? " active" : ""}`}
                style={{ width: 34, height: 34, borderRadius: 10, border: "1.5px solid #e8eaf0", background: i === currentPage ? "#5b4cf5" : "#fafbfc", color: i === currentPage ? "#fff" : "#8a94a6", cursor: "pointer", fontWeight: 600, fontSize: 13 }}
              >{i + 1}</button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="page-btn"
              style={{ width: 34, height: 34, borderRadius: 10, border: "1.5px solid #e8eaf0", background: "#fafbfc", color: "#8a94a6", cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer", opacity: currentPage === totalPages - 1 ? 0.4 : 1, fontSize: 16 }}
            >›</button>
          </div>
        </div>
      </div>

      {/* ─── Modals ─── */}
      <Modal open={modal === "create"} onClose={closeModal} title="Add New Branch">
        <CreateForm onCreate={handleCreate} onClose={closeModal} />
      </Modal>
      <Modal open={modal === "view"} onClose={closeModal} title="Branch Details" maxWidth={420}>
        {selected && <ViewDetails branch={selected} onClose={closeModal} />}
      </Modal>
      <Modal open={modal === "edit"} onClose={closeModal} title="Edit Branch">
        {selected && <EditForm branch={selected} onUpdate={handleUpdate} onClose={closeModal} />}
      </Modal>
      <Modal open={modal === "delete"} onClose={closeModal} title="Confirm Delete" maxWidth={380}>
        {selected && <DeleteConfirm branch={selected} onDelete={handleDelete} onClose={closeModal} />}
      </Modal>
    </div>
  );
}
