"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  InputAdornment,
  Stack,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  TableContainer
} from '@mui/material';
import { 
  Add,  
  Search, 
  Download, 
  DeleteOutline, 
  VisibilityOutlined, 
  EditOutlined,
  Inbox,
  CheckCircleOutline,
  HourglassEmpty,
  CancelOutlined
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Create from "../../../components/Attendance/attendance-request/Create";
import Edit from "../../../components/Attendance/attendance-request/Edit";
import View from "../../../components/Attendance/attendance-request/View";
import Delete from "../../../components/Attendance/attendance-request/Delete";
import CommonDialog from "../../../components/commonDialog";

const AttendanceRequestPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [requests, setRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      employeeId: "EMP001",
      requestDate: "2024-01-20",
      punchedIn: "09:00",
      punchedOut: "17:00",
      totalHours: "08:00 hrs",
      reason: "Work from home due to personal commitments",
      status: "Approved",
      approvedBy: "HR Manager"
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      requestDate: "2024-01-21",
      punchedIn: "09:30",
      punchedOut: "18:00",
      totalHours: "08:30 hrs",
      reason: "Late arrival due to traffic jam",
      status: "Pending"
    },
    {
      id: 3,
      employeeName: "Alex Lee Wang",
      employeeId: "EMP003",
      requestDate: "2024-01-22",
      punchedIn: "08:45",
      punchedOut: "17:15",
      totalHours: "08:30 hrs",
      reason: "Early departure for medical appointment",
      status: "Rejected",
      approvedBy: "Team Lead"
    },
    {
      id: 4,
      employeeName: "Reyan Doe",
      employeeId: "EMP004",
      requestDate: "2024-01-23",
      punchedIn: "09:15",
      punchedOut: "18:30",
      totalHours: "09:15 hrs",
      reason: "Overtime work on project deadline",
      status: "Approved",
      approvedBy: "Project Manager"
    },
    {
      id: 5,
      employeeName: "Harry Potter",
      employeeId: "EMP005",
      requestDate: "2024-01-24",
      punchedIn: "08:30",
      punchedOut: "17:45",
      totalHours: "09:15 hrs",
      reason: "Half day leave for family event",
      status: "Pending"
    },
    {
      id: 6,
      employeeName: "Antila Williams",
      employeeId: "EMP006",
      requestDate: "2024-01-25",
      punchedIn: "09:45",
      punchedOut: "18:15",
      totalHours: "08:30 hrs",
      reason: "Late arrival due to public transport delay",
      status: "Approved",
      approvedBy: "HR Manager"
    },
    {
      id: 7,
      employeeName: "Sung Jin Woo",
      employeeId: "EMP007",
      requestDate: "2024-01-26",
      punchedIn: "08:15",
      punchedOut: "17:30",
      totalHours: "09:15 hrs",
      reason: "Work from home for personal reasons",
      status: "Rejected",
      approvedBy: "Team Lead"
    },
    {
      id: 8,
      employeeName: "Thomas Andre",
      employeeId: "EMP008",
      requestDate: "2024-01-27",
      punchedIn: "09:00",
      punchedOut: "18:00",
      totalHours: "09:00 hrs",
      reason: "Overtime for urgent project completion",
      status: "Pending"
    },
    {
      id: 9,
      employeeName: "Joseph Rock",
      employeeId: "EMP009",
      requestDate: "2024-01-28",
      punchedIn: "08:45",
      punchedOut: "17:45",
      totalHours: "09:00 hrs",
      reason: "Work from home due to weather conditions",
      status: "Approved",
      approvedBy: "HR Manager"
    }
  ]);

  const filteredRequests = requests.filter(request =>
    request.employeeName.toLowerCase().includes(search.toLowerCase()) ||
    request.employeeId.toLowerCase().includes(search.toLowerCase()) ||
    request.reason.toLowerCase().includes(search.toLowerCase()) ||
    request.status.toLowerCase().includes(search.toLowerCase())
  );

  const [openData, setOpenData] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    requestDate: "",
    punchedIn: "",
    punchedOut: "",
    totalHours: "",
    reason: "",
    status: "Pending",
    approvedBy: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    setOpenData(false);
    setOpenEdit(false);
    setOpenView(false);
    setOpenDelete(false);
    setSelectedData(null);
    setSelectedIndex(null);
  };

  const handleCreate = () => {
    setOpenData(true);
  };

  const handleEdit = (request) => {
    setSelectedData(request);
    setFormData({
      employeeName: request.employeeName,
      employeeId: request.employeeId,
      requestDate: request.requestDate,
      punchedIn: request.punchedIn,
      punchedOut: request.punchedOut,
      totalHours: request.totalHours,
      reason: request.reason,
      status: request.status,
      approvedBy: request.approvedBy || ""
    });
    setOpenEdit(true);
  };

  const handleView = (request) => {
    setSelectedData(request);
    setOpenView(true);
  };

  const handleSubmit = () => {
    setOpenData(false);
    setOpenEdit(false);
    setFormData({
      employeeName: "",
      employeeId: "",
      requestDate: "",
      punchedIn: "",
      punchedOut: "",
      totalHours: "",
      reason: "",
      status: "Pending",
      approvedBy: ""
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "success";
      case "Pending": return "warning";
      case "Rejected": return "error";
      default: return "default";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return {
          bgColor: 'rgba(76, 175, 80, 0.08)',
          color: '#2e7d32',
          borderColor: 'rgba(76, 175, 80, 0.3)',
          dotColor: '#4caf50'
        };
      case 'Pending':
        return {
          bgColor: 'rgba(255, 152, 0, 0.08)',
          color: '#b78103',
          borderColor: 'rgba(255, 152, 0, 0.3)',
          dotColor: '#ff9800'
        };
      case 'Rejected':
        return {
          bgColor: 'rgba(244, 67, 54, 0.08)',
          color: '#c62828',
          borderColor: 'rgba(244, 67, 54, 0.3)',
          dotColor: '#f44336'
        };
      default:
        return {
          bgColor: 'rgba(158, 158, 158, 0.08)',
          color: '#616161',
          borderColor: 'rgba(158, 158, 158, 0.3)',
          dotColor: '#9e9e9e'
        };
    }
  };

  const handleApprove = (requestId) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'Approved', approvedBy: 'Current User' }
        : req
    ));
  };

  const handleReject = (requestId) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'Rejected', approvedBy: 'Current User' }
        : req
    ));
  };

  const handleDelete = () => {
    const updatedRequests = requests.filter((_, index) => index !== selectedIndex);
    setRequests(updatedRequests);
    setOpenDelete(false);
    setSelectedData(null);
    setSelectedIndex(null);
  };

  const getAvatarColor = (name) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#7c3aed', '#ec4899', '#06b6d4', '#8b5cf6'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Metrics calculations
  const totalRequests = requests.length;
  const approvedCount = requests.filter(r => r.status === "Approved").length;
  const pendingCount = requests.filter(r => r.status === "Pending").length;
  const rejectedCount = requests.filter(r => r.status === "Rejected").length;

  if (!isClient) return null;

  return (
    <Box sx={{ padding: { xs: '1rem', md: '1.5rem' }, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Title Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
          Attendance Requests
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          Manage, verify, and approve employee attendance and punch corrections.
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
        {/* Total Requests */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", background: "#ffffff", overflow: "hidden" }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Total Requests</Typography>
                  <Box sx={{ bgcolor: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", p: 1, borderRadius: "10px", display: "flex" }}>
                    <Inbox sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>{totalRequests} Requests</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Approved Requests */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", background: "#ffffff", overflow: "hidden" }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Approved</Typography>
                  <Box sx={{ bgcolor: "rgba(16, 185, 129, 0.1)", color: "#10b981", p: 1, borderRadius: "10px", display: "flex" }}>
                    <CheckCircleOutline sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>{approvedCount} Approved</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Pending Requests */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", background: "#ffffff", overflow: "hidden" }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Pending</Typography>
                  <Box sx={{ bgcolor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", p: 1, borderRadius: "10px", display: "flex" }}>
                    <HourglassEmpty sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>{pendingCount} Pending</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Rejected Requests */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", background: "#ffffff", overflow: "hidden" }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Rejected</Typography>
                  <Box sx={{ bgcolor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", p: 1, borderRadius: "10px", display: "flex" }}>
                    <CancelOutlined sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>{rejectedCount} Rejected</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Search and Action deck */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <TextField
          placeholder="Search requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#94a3b8" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "320px" },
            "& .MuiOutlinedInput-root": {
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              "& fieldset": { borderColor: "#e2e8f0" },
              "&:hover fieldset": { borderColor: "#cbd5e1" },
              "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
            }
          }}
        />
        <Stack direction="row" spacing={1.5}>
          <Button 
            variant="outlined" 
            startIcon={<Download />} 
            sx={{ 
              height: "44px", 
              borderRadius: "12px",
              borderColor: "#cbd5e1",
              color: "#475569",
              fontWeight: 600,
              textTransform: "none",
              px: 2.5,
              backgroundColor: "#ffffff",
              "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" }
            }}
          >
            Export
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreate}
              sx={{ 
                height: "44px", 
                borderRadius: "12px",
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                fontWeight: 600,
                px: 2.5,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
                "&:hover": { backgroundColor: "#2563eb", boxShadow: "0 6px 16px rgba(59, 130, 246, 0.3)" }
              }}
            >
              Add Request
            </Button>
          </motion.div>
        </Stack>
      </Box>

      {/* Attendance Requests Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <TableContainer component={Paper} sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)", overflow: "hidden", bgcolor: "#ffffff" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>S. No.</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Profile</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Request Date</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Punched In</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Punched Out</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Total Hours</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2, textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "#94a3b8" }}>No requests found matching your filters.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request, index) => {
                    const statusStyle = getStatusStyle(request.status);
                    return (
                      <TableRow key={request.id} sx={{ "&:hover": { backgroundColor: "#f8fafc" }, transition: "background-color 0.2s ease" }}>
                        <TableCell sx={{ py: 1.5, fontWeight: 500, color: "#64748b" }}>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 34, height: 34, fontSize: "0.85rem", fontWeight: 700, bgcolor: getAvatarColor(request.employeeName), color: "#ffffff" }}>
                              {request.employeeName.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Box>
                              <Typography sx={{ fontWeight: 600, color: "#1e293b", fontSize: "0.9rem" }}>
                                {request.employeeName}
                              </Typography>
                              <Typography sx={{ color: "#64748b", fontSize: "0.725rem" }}>
                                {request.employeeId}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.5, color: "#475569", fontWeight: 500 }}>{request.requestDate}</TableCell>
                        <TableCell sx={{ py: 1.5, color: "#10b981", fontWeight: 600 }}>{request.punchedIn}</TableCell>
                        <TableCell sx={{ py: 1.5, color: "#ef4444", fontWeight: 600 }}>{request.punchedOut}</TableCell>
                        <TableCell sx={{ py: 1.5, color: "#334155", fontWeight: 600 }}>{request.totalHours}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box 
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 1,
                              px: 2,
                              py: 0.5,
                              borderRadius: '20px',
                              backgroundColor: statusStyle.bgColor,
                              color: statusStyle.color,
                              border: `1px solid ${statusStyle.borderColor}`,
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              letterSpacing: "0.02em"
                            }}
                          >
                            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: statusStyle.dotColor, animation: request.status === 'Pending' ? 'pulse 2s infinite' : 'none' }} />
                            {request.status}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                            <IconButton 
                              size="small"
                              onClick={() => handleView(request)}
                              sx={{ color: "#3b82f6", bgcolor: "rgba(59,130,246,0.04)", "&:hover": { bgcolor: "rgba(59,130,246,0.1)" }, width: 32, height: 32 }}
                            >
                              <VisibilityOutlined sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => handleEdit(request)}
                              sx={{ color: "#475569", bgcolor: "rgba(71,85,105,0.04)", "&:hover": { bgcolor: "rgba(71,85,105,0.1)" }, width: 32, height: 32 }}
                            >
                              <EditOutlined sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => {
                                setSelectedData(request);
                                setSelectedIndex(page * rowsPerPage + index);
                                setOpenDelete(true);
                              }}
                              sx={{ color: "#ef4444", bgcolor: "rgba(239,68,68,0.04)", "&:hover": { bgcolor: "rgba(239,68,68,0.1)" }, width: 32, height: 32 }}
                            >
                              <DeleteOutline sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
          
          {/* Table Footer with Custom Pagination */}
          <Box sx={{ padding: "1rem 1.5rem", borderTop: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.85rem" }}>
                Showing {filteredRequests.length > 0 ? (page * rowsPerPage + 1) : 0} to {Math.min((page + 1) * rowsPerPage, filteredRequests.length)} of {filteredRequests.length} records
              </Typography>
              <Pagination
                count={Math.ceil(filteredRequests.length / rowsPerPage)}
                page={page + 1}
                onChange={(_, newPage) => setPage(newPage - 1)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "8px",
                    fontWeight: 600,
                    "&.Mui-selected": {
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      "&:hover": { backgroundColor: "#2563eb" }
                    }
                  }
                }}
              />
            </Stack>
          </Box>
        </TableContainer>
      </motion.div>

      {/* Common Dialog */}
      <CommonDialog
        open={openData || openEdit || openView || openDelete}
        onClose={() => {
          setOpenData(false);
          setOpenEdit(false);
          setOpenView(false);
          setOpenDelete(false);
          setSelectedData(null);
          setSelectedIndex(null);
        }}
        dialogTitle={
          openData
            ? "Submit New Request"
            : openEdit
            ? "Edit Request"
            : openView
            ? "Request Details"
            : openDelete
            ? "Delete Request"
            : ""
        }
        dialogContent={
          openData ? (
            <Create 
              formData={formData} 
              handleInputChange={handleInputChange}
              handleCreate={handleSubmit}
              handleClose={handleClose}
            />
          ) : openEdit ? (
            <Edit 
              formData={formData} 
              handleInputChange={handleInputChange}
              handleUpdate={handleSubmit}
              handleClose={handleClose}
            />
          ) : openView ? (
            selectedData && (
              <View 
                selectedData={selectedData} 
                getStatusColor={getStatusColor}
                handleClose={handleClose}
              />
            )
          ) : openDelete ? (
            <Delete 
              selectedData={selectedData}
              handleDelete={handleDelete}
              handleClose={handleClose}
            />
          ) : null
        }
        maxWidth={openDelete ? "xs" : "md"}
        fullWidth={!openDelete}
      />
    </Box>
  );
};

export default AttendanceRequestPage;
