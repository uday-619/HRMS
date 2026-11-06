"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
  Chip
} from "@mui/material";
import { Search, History, Person, Event } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Fetch logs
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/actions?search=${encodeURIComponent(search)}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [search]);

  // Pagination calculations
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedLogs = logs.slice(startIndex, endIndex);

  // Style action chip
  const getActionColor = (action) => {
    switch (action.toLowerCase()) {
      case "login success":
      case "signup":
        return { bg: "#e6f4ea", color: "#137333" };
      case "login failed":
      case "punch in failed":
        return { bg: "#fce8e6", color: "#c5221f" };
      case "punch in":
      case "punch out":
        return { bg: "#e8f0fe", color: "#1a73e8" };
      case "start break":
        return { bg: "#fef7e0", color: "#b06000" };
      case "resume work":
        return { bg: "#e6f4ea", color: "#137333" };
      default:
        return { bg: "#f1f3f4", color: "#3c4043" };
    }
  };

  const formatTimestamp = (isoString) => {
    try {
      const d = new Date(isoString);
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    } catch (_) {
      return isoString;
    }
  };

  return (
    <Box sx={{ padding: { xs: "1rem", md: "1.5rem" }, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Welcome & Title Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
            Employee Audit Logs
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Monitor check-ins, security actions, and registration logs across your workforce.
          </Typography>
        </Box>
        <Box sx={{ bgcolor: "rgba(99, 102, 241, 0.1)", color: "#6366f1", p: 1.5, borderRadius: "12px", display: "flex" }}>
          <History />
        </Box>
      </Box>

      {/* Control Deck */}
      <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <TextField
          placeholder="Search by name, ID, or action..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#94a3b8" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "360px" },
            "& .MuiOutlinedInput-root": {
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              "& fieldset": { borderColor: "#e2e8f0" },
              "&:hover fieldset": { borderColor: "#cbd5e1" },
              "&.Mui-focused fieldset": { borderColor: "#6366f1" }
            }
          }}
        />
      </Box>

      {/* Audit Logs Table Container */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <TableContainer component={Paper} sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)", overflow: "hidden", bgcolor: "#ffffff" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Timestamp</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Employee ID</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Employee Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Action</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.825rem", py: 2 }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "#94a3b8" }}>Loading logs...</Typography>
                  </TableCell>
                </TableRow>
              ) : paginatedLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "#94a3b8" }}>No audit logs recorded yet.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLogs.map((log) => {
                  const actionStyle = getActionColor(log.action);
                  return (
                    <TableRow key={log.id} sx={{ "&:hover": { backgroundColor: "#f8fafc" }, transition: "background-color 0.2s ease" }}>
                      <TableCell sx={{ py: 1.5, color: "#475569", fontSize: "0.85rem" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Event sx={{ fontSize: 14, color: "#94a3b8" }} />
                          {formatTimestamp(log.timestamp)}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1.5, fontWeight: 600, color: "#475569", fontSize: "0.85rem" }}>
                        {log.employeeId}
                      </TableCell>
                      <TableCell sx={{ py: 1.5, fontWeight: 500, color: "#1e293b", fontSize: "0.9rem" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Person sx={{ fontSize: 16, color: "#94a3b8" }} />
                          {log.employeeName}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Chip
                          label={log.action}
                          size="small"
                          sx={{
                            backgroundColor: actionStyle.bg,
                            color: actionStyle.color,
                            fontWeight: 700,
                            borderRadius: "6px",
                            fontSize: "0.7rem",
                            height: "22px"
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.5, color: "#334155", fontSize: "0.85rem", maxWidth: "400px", wordBreak: "break-word" }}>
                        {log.details}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* Table Footer with Pagination */}
          <Box sx={{ padding: "1rem 1.5rem", borderTop: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.85rem" }}>
                Showing {logs.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, logs.length)} of {logs.length} records
              </Typography>
              <Pagination
                count={Math.ceil(logs.length / rowsPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "8px",
                    fontWeight: 600,
                    "&.Mui-selected": {
                      backgroundColor: "#6366f1",
                      color: "#ffffff",
                      "&:hover": { backgroundColor: "#4f46e5" }
                    }
                  }
                }}
              />
            </Stack>
          </Box>
        </TableContainer>
      </motion.div>
    </Box>
  );
}
