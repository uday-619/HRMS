"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Button,
  InputAdornment,
  Typography,
  Pagination,
  Stack,
  Avatar,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  DeleteOutline,
  VisibilityOutlined,
  Edit,
  Search,
  AccountBalanceWallet,
  Add,
  CheckCircleOutline,
  HourglassEmpty,
  TrendingUp
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import CommonDialog from '@/components/commonDialog';
import Delete from '@/components/Payroll/payslip-list/Delete';

export default function Paysliplist(){
  const router = useRouter();
  const [ViewData, setViewData] = useState(null);
  const [openData, setOpenData] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleView = (row) => {
    router.push(`/payroll/create-payroll?mode=view&id=${row.id}`);
  };

  const handleEdit = (data) => {
    router.push(`/payroll/create-payroll?mode=edit&id=${data.id}`);
  };

  const handleShowDelete = (id) => {
    const selectedRow = rows.find(row => row.id === id);
    setViewData(selectedRow);
    setDeleteShow(true);
  };

  const handleClose = () => {
    setDeleteShow(false);
    setViewData(null);
  };

  const handleDelete = () => {
    setDeleteShow(false);
    setViewData(null);
  }

  const createData = (id, name, days, month, year, bsalary, bonus, tsalary, status) => {
    return { id, name, days, month, year, bsalary, bonus, tsalary, status };
  };

  const rows = [
    createData(1, "John Doe", 22, "September", "2025", 50000, 5000, 55000, "Paid"),
    createData(2, "Jane Smith", 20, "September", "2025", 45000, 4000, 49000, "Pending"),
    createData(3, "Michael Johnson", 21, "September", "2025", 48000, 3500, 51500, "Paid"),
    createData(4, "Emily Davis", 22, "September", "2025", 52000, 6000, 58000, "Paid"),
    createData(5, "Sarah Wilson", 23, "September", "2025", 55000, 7000, 62000, "Paid"),
    createData(6, "David Brown", 19, "September", "2025", 42000, 3000, 45000, "Pending"),
    createData(7, "Lisa Garcia", 21, "September", "2025", 47000, 4000, 51000, "Paid"),
    createData(8, "Robert Lee", 22, "September", "2025", 51000, 5500, 56500, "Paid")
  ];

  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(search.toLowerCase()) ||
    row.status.toLowerCase().includes(search.toLowerCase()) ||
    row.month.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  // Metrics calculations
  const totalPayout = rows.reduce((sum, r) => sum + r.tsalary, 0);
  const paidCount = rows.filter(r => r.status === "Paid").length;
  const pendingCount = rows.filter(r => r.status === "Pending").length;
  const avgSalary = Math.round(rows.reduce((sum, r) => sum + r.bsalary, 0) / rows.length);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid':
        return {
          bgColor: '#e6f4ea',
          color: '#137333',
          borderColor: '#ceead6'
        };
      case 'Pending':
        return {
          bgColor: '#fef7e0',
          color: '#b06000',
          borderColor: '#feebc8'
        };
      default:
        return {
          bgColor: '#f5f5f5',
          color: '#616161',
          borderColor: '#e0e0e0'
        };
    }
  };

  const getAvatarStyle = (name) => {
    const colors = [
      { bgcolor: '#eff6ff', color: '#1d4ed8' }, // Blue
      { bgcolor: '#ecfdf5', color: '#047857' }, // Green
      { bgcolor: '#fffbeb', color: '#b45309' }, // Amber
      { bgcolor: '#f5f3ff', color: '#6d28d9' }, // Purple
      { bgcolor: '#fdf2f8', color: '#be185d' }, // Pink
      { bgcolor: '#ecfeff', color: '#0e7490' }, // Cyan
      { bgcolor: '#f1f5f9', color: '#475569' }  // Cool Gray
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (!isClient) return null;

  return (
    <Box sx={{ padding: { xs: '1rem', md: '1.5rem' }, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Welcome & Title Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
          Payslip & Payroll Registry
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          Monitor, verify, and generate monthly employee payroll records.
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
        {/* Total Payout */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", background: "#ffffff", overflow: "hidden" }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Total Payout</Typography>
                  <Box sx={{ bgcolor: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", p: 1, borderRadius: "10px", display: "flex" }}>
                    <AccountBalanceWallet sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>₹{totalPayout.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Avg Salary */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", background: "#ffffff", overflow: "hidden" }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Average Salary</Typography>
                  <Box sx={{ bgcolor: "rgba(124, 77, 255, 0.1)", color: "#7c3aed", p: 1, borderRadius: "10px", display: "flex" }}>
                    <TrendingUp sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>₹{avgSalary.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Paid Payslips */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", background: "#ffffff", overflow: "hidden" }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Paid Record</Typography>
                  <Box sx={{ bgcolor: "rgba(16, 185, 129, 0.1)", color: "#10b981", p: 1, borderRadius: "10px", display: "flex" }}>
                    <CheckCircleOutline sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>{paidCount} Payslips</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Pending Payslips */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", background: "#ffffff", overflow: "hidden" }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Pending Processing</Typography>
                  <Box sx={{ bgcolor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", p: 1, borderRadius: "10px", display: "flex" }}>
                    <HourglassEmpty sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>{pendingCount} Payslips</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Table Actions Control Deck */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <TextField
          placeholder="Search by employee name or status..."
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
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="contained"
            onClick={() => router.push('/payroll/create-payroll')}
            startIcon={<Add />}
            sx={{
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              fontWeight: 600,
              px: 3,
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
              "&:hover": { backgroundColor: "#2563eb", boxShadow: "0 6px 16px rgba(59, 130, 246, 0.3)" }
            }}
          >
            Add Payslip
          </Button>
        </motion.div>
      </Box>

      {/* Payslip Table Container */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <TableContainer component={Paper} sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)", overflow: "hidden", bgcolor: "#ffffff" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>S. No.</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Work Days</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Month</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Year</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Basic Salary</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Bonus</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Total Salary</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2, textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "#94a3b8" }}>No records found matching your filters.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => {
                  const statusStyle = getStatusStyle(row.status);
                  const avatarStyle = getAvatarStyle(row.name);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: row.status === 'Pending' ? '#fff9e6' : '#ffffff',
                        "&:hover": {
                          backgroundColor: row.status === 'Pending' ? '#fff1cc' : '#f8fafc'
                        },
                        transition: "background-color 0.2s ease"
                      }}
                    >
                      <TableCell sx={{ py: 1.5, fontWeight: 500, color: "#64748b" }}>{startIndex + index + 1}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{ width: 34, height: 34, fontSize: "0.85rem", fontWeight: 700, bgcolor: avatarStyle.bgcolor, color: avatarStyle.color }}>
                            {row.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Typography sx={{ fontWeight: 600, color: "#1e293b", fontSize: "0.9rem" }}>
                            {row.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1.5, color: "#334155", fontWeight: 500 }}>{row.days}</TableCell>
                      <TableCell sx={{ py: 1.5, color: "#475569" }}>{row.month}</TableCell>
                      <TableCell sx={{ py: 1.5, color: "#475569" }}>{row.year}</TableCell>
                      <TableCell sx={{ py: 1.5, fontWeight: 600, color: "#0f172a" }}>₹{row.bsalary.toLocaleString()}</TableCell>
                      <TableCell sx={{ py: 1.5, fontWeight: 600, color: "#0f172a" }}>₹{row.bonus.toLocaleString()}</TableCell>
                      <TableCell sx={{ py: 1.5, fontWeight: 700, color: "#0f172a" }}>₹{row.tsalary.toLocaleString()}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "12px",
                            backgroundColor: statusStyle.bgColor,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.borderColor}`,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            letterSpacing: "0.02em"
                          }}
                        >
                          {row.status}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1.5, align: "center" }}>
                        <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => handleView(row)}
                            sx={{ color: "#2563eb", "&:hover": { bgcolor: "rgba(37,99,235,0.08)" }, width: 32, height: 32 }}
                          >
                            <VisibilityOutlined sx={{ fontSize: 18 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(row)}
                            sx={{ color: "#0f172a", "&:hover": { bgcolor: "rgba(15,23,42,0.08)" }, width: 32, height: 32 }}
                          >
                            <Edit sx={{ fontSize: 18 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleShowDelete(row.id)}
                            sx={{ color: "#dc2626", "&:hover": { bgcolor: "rgba(220,38,38,0.08)" }, width: 32, height: 32 }}
                          >
                            <DeleteOutline sx={{ fontSize: 18 }} />
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
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.85rem" }}>
                Showing {filteredRows.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredRows.length)} of {filteredRows.length} records
              </Typography>
              <Pagination
                count={Math.ceil(filteredRows.length / rowsPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
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

      <CommonDialog
        open={deleteShow}
        onClose={handleClose}
        dialogTitle="Delete PaySlip"
        dialogContent={
          <Delete selectedData={ViewData} handleDelete={handleDelete} handleClose={handleClose} />
        }
        maxWidth="xs"
        fullWidth={false}
      />
    </Box>
  );
}