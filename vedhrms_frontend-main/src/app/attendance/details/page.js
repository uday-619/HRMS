"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  InputAdornment,
  Pagination,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  Paper
} from "@mui/material";
import { Search, Download } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function AttendanceDetails() {
  const today = new Date("2026-06-28"); // Set baseline date to match user time context
  const [view, setView] = useState("thisWeek");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const employees = [
    { name: "Super Admin", role: "Admin" },
    { name: "John Doe", role: "Developer" },
    { name: "Sarah Lee", role: "Designer" },
    { name: "Amit Kumar", role: "HR" },
    { name: "Emma Brown", role: "Tester" },
    { name: "Michael Johnson", role: "Manager" },
    { name: "Lisa Wilson", role: "Analyst" },
    { name: "David Smith", role: "Developer" },
    { name: "Jennifer Davis", role: "Designer" },
    { name: "Robert Brown", role: "HR" },
    { name: "Amanda Taylor", role: "Tester" },
    { name: "William Anderson", role: "Manager" },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  // Date helpers
  const getStartOfWeek = (d) => {
    const date = new Date(d);
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // Start on Monday
    return new Date(date.setDate(diff));
  };
  const getEndOfWeek = (d) => {
    const start = getStartOfWeek(d);
    return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
  };

  const getRange = () => {
    const todayStr = formatDate(today);
    let start, end;

    if (view === "today") {
      start = end = todayStr;
    } else if (view === "thisWeek") {
      start = formatDate(getStartOfWeek(today));
      end = formatDate(getEndOfWeek(today));
    } else if (view === "lastWeek") {
      const startOfThis = getStartOfWeek(today);
      start = formatDate(
        new Date(startOfThis.getFullYear(), startOfThis.getMonth(), startOfThis.getDate() - 7)
      );
      end = formatDate(
        new Date(startOfThis.getFullYear(), startOfThis.getMonth(), startOfThis.getDate() - 1)
      );
    } else if (view === "thisMonth") {
      start = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
      end = formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    } else if (view === "lastMonth") {
      start = formatDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
      end = formatDate(new Date(today.getFullYear(), today.getMonth(), 0));
    } else if (view === "thisYear") {
      start = formatDate(new Date(today.getFullYear(), 0, 1));
      end = formatDate(new Date(today.getFullYear(), 11, 31));
    }
    return { start, end };
  };

  const { start, end } = getRange();

  const getDatesBetween = (s, e) => {
    const dates = [];
    let d = new Date(s);
    while (d <= new Date(e)) {
      dates.push(formatDate(d));
      d.setDate(d.getDate() + 1);
    }
    return dates;
  };

  const dateHeaders = getDatesBetween(start, end);

  // Generate predictable details based on employee name and date hash
  const getCellDetails = (empName, dateStr) => {
    // Generate a hash from employee name and date string
    const hash = (empName + dateStr).split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    const states = ["onDuty", "sickLeave", "maternity", "casual", "weekOff", "absent"];
    // Deterministic state assignment
    let state = states[hash % states.length];
    
    // Override weekends to weekOff
    const dateObj = new Date(dateStr);
    const day = dateObj.getDay();
    if (day === 0 || day === 6) {
      state = "weekOff";
    }

    let hours = "0:00";
    let subtext = "";
    
    switch (state) {
      case "onDuty":
        hours = "8:00";
        // Deterministic check-in/out times
        const checkInMin = 30 + (hash % 30);
        const checkOutMin = 15 + (hash % 45);
        subtext = `In: 09:${checkInMin} AM | Out: 06:${checkOutMin} PM`;
        break;
      case "sickLeave":
        hours = "0:00";
        subtext = "Sick Leave";
        break;
      case "maternity":
        hours = "0:00";
        subtext = "Maternity Leave";
        break;
      case "casual":
        hours = "4:00";
        subtext = "Casual - Half Day";
        break;
      case "weekOff":
        hours = "0:00";
        subtext = "Week Off";
        break;
      case "absent":
        hours = "0:00";
        subtext = "Absent";
        break;
    }

    return { state, hours, subtext };
  };

  const getCellColors = (state) => {
    switch (state) {
      case "onDuty":
        return {
          bg: "rgba(16, 185, 129, 0.08)",
          border: "rgba(16, 185, 129, 0.2)",
          color: "#047857",
          label: "On Duty"
        };
      case "sickLeave":
        return {
          bg: "rgba(245, 158, 11, 0.08)",
          border: "rgba(245, 158, 11, 0.2)",
          color: "#b78103",
          label: "Sick Leave"
        };
      case "maternity":
        return {
          bg: "rgba(236, 72, 153, 0.08)",
          border: "rgba(236, 72, 153, 0.2)",
          color: "#db2777",
          label: "Maternity"
        };
      case "casual":
        return {
          bg: "rgba(249, 115, 22, 0.08)",
          border: "rgba(249, 115, 22, 0.2)",
          color: "#c2410c",
          label: "Casual"
        };
      case "weekOff":
        return {
          bg: "rgba(59, 130, 246, 0.08)",
          border: "rgba(59, 130, 246, 0.2)",
          color: "#1d4ed8",
          label: "Week Off"
        };
      default:
        return {
          bg: "rgba(239, 68, 68, 0.08)",
          border: "rgba(239, 68, 68, 0.2)",
          color: "#b91c1c",
          label: "Absent"
        };
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#7c3aed', '#ec4899', '#06b6d4', '#8b5cf6'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (!isClient) return null;

  return (
    <Box sx={{ padding: { xs: '1rem', md: '1.5rem' }, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Title Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
          Employee Weekly Attendance Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          Monitor daily logs, breaks, and shifts on a rolling calendar layout.
        </Typography>
      </Box>

      {/* Control Bar - Search & Export */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", mb: 3, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search by employee name or role..."
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
            Export Logs
          </Button>
        </Stack>
      </Box>

      {/* Legend Deck */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3, p: 2, bgcolor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <Typography variant="body2" sx={{ color: "#64748b", display: "flex", alignItems: "center", mr: 1, fontWeight: 600 }}>
          Legend Status:
        </Typography>
        {["sickLeave", "maternity", "casual", "onDuty", "weekOff", "absent"].map((stateKey) => {
          const colors = getCellColors(stateKey);
          return (
            <Box
              key={stateKey}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.5,
                borderRadius: "20px",
                backgroundColor: colors.bg,
                color: colors.color,
                border: `1px solid ${colors.border}`,
                fontSize: "0.75rem",
                fontWeight: 700
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: colors.color }} />
              {colors.label}
            </Box>
          );
        })}
      </Box>

      {/* Filter Tabs Section */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Stack direction="row" spacing={1} sx={{ bgcolor: "#f1f5f9", p: 0.5, borderRadius: "14px" }}>
          {[
            ["today", "Today"],
            ["thisWeek", "This Week"],
            ["lastWeek", "Last Week"],
            ["thisMonth", "This Month"],
            ["lastMonth", "Last Month"],
            ["thisYear", "This Year"]
          ].map(([val, label]) => {
            const isActive = view === val;
            return (
              <Button
                key={val}
                size="small"
                onClick={() => setView(val)}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  px: 2,
                  py: 0.75,
                  color: isActive ? "#0f172a" : "#64748b",
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                  "&:hover": {
                    backgroundColor: isActive ? "#ffffff" : "rgba(255,255,255,0.3)"
                  }
                }}
              >
                {label}
              </Button>
            );
          })}
        </Stack>
      </Box>

      {/* Grid calendar details */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <TableContainer component={Paper} sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)", overflow: "hidden", bgcolor: "#ffffff" }}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>S. No.</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Employee Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2 }}>Total Hours</TableCell>
                {dateHeaders.map((d) => (
                  <TableCell key={d} sx={{ fontWeight: 700, color: "#475569", fontSize: "0.825rem", textTransform: "uppercase", py: 2, minWidth: "120px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>
                        {new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </Typography>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 500 }}>
                        {new Date(d).toLocaleDateString("en-US", { weekday: "short" })}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={dateHeaders.length + 4} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "#94a3b8" }}>No records found matching your filters.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((emp, index) => {
                    // Accumulate hours
                    let totalH = 0;
                    dateHeaders.forEach((d) => {
                      const cellDetails = getCellDetails(emp.name, d);
                      if (cellDetails.hours !== "0:00") {
                        totalH += parseInt(cellDetails.hours.split(":")[0], 10);
                      }
                    });

                    return (
                      <TableRow key={emp.name} sx={{ "&:hover": { backgroundColor: "#f8fafc" }, transition: "background-color 0.2s ease" }}>
                        <TableCell sx={{ py: 1.5, color: "#64748b", fontWeight: 500 }}>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 34, height: 34, fontSize: "0.85rem", fontWeight: 700, bgcolor: getAvatarColor(emp.name), color: "#ffffff" }}>
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Typography sx={{ fontWeight: 600, color: "#1e293b", fontSize: "0.9rem" }}>
                              {emp.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.5, color: "#475569", fontWeight: 500 }}>{emp.role}</TableCell>
                        <TableCell sx={{ py: 1.5, color: "#2563eb", fontWeight: 700 }}>{totalH} Hours</TableCell>
                        
                        {/* Daily Calendar Columns */}
                        {dateHeaders.map((d) => {
                          const cell = getCellDetails(emp.name, d);
                          const colors = getCellColors(cell.state);
                          return (
                            <TableCell key={d} sx={{ py: 1.5, px: 1, textAlign: "center" }}>
                              <Tooltip 
                                title={
                                  <Box sx={{ p: 0.5 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, display: "block", mb: 0.5 }}>{colors.label}</Typography>
                                    {cell.subtext && <Typography variant="caption" sx={{ display: "block" }}>{cell.subtext}</Typography>}
                                    <Typography variant="caption" sx={{ display: "block", opacity: 0.7 }}>Date: {d}</Typography>
                                  </Box>
                                }
                                arrow
                              >
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      px: 1,
                                      py: 1,
                                      borderRadius: "10px",
                                      backgroundColor: colors.bg,
                                      border: `1px solid ${colors.border}`,
                                      color: colors.color,
                                      cursor: "pointer",
                                      minHeight: "56px"
                                    }}
                                  >
                                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>
                                      {cell.hours !== "0:00" ? cell.hours : "—"}
                                    </Typography>
                                    {cell.state === "onDuty" ? (
                                      <Typography sx={{ fontSize: "0.625rem", opacity: 0.7, fontWeight: 500, mt: 0.25 }}>
                                        Regular
                                      </Typography>
                                    ) : (
                                      <Typography sx={{ fontSize: "0.625rem", opacity: 0.8, fontWeight: 600, mt: 0.25 }}>
                                        {colors.label}
                                      </Typography>
                                    )}
                                  </Box>
                                </motion.div>
                              </Tooltip>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
          
          {/* Footer controls */}
          <Box sx={{ padding: "1rem 1.5rem", borderTop: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.85rem" }}>
                Showing {filteredEmployees.length > 0 ? (page * rowsPerPage + 1) : 0} to {Math.min((page + 1) * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length} records
              </Typography>
              <Pagination
                count={Math.ceil(filteredEmployees.length / rowsPerPage)}
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
    </Box>
  );
}