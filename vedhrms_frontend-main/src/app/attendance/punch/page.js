"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  AccessTime,
  Login,
  Logout,
  PlayArrow,
  Coffee,
} from "@mui/icons-material";
import PunchConfirmation from "../../../components/Attendance/punch/PunchConfirmation";
import CommonDialog from "../../../components/commonDialog";

const AttendancePunchPage = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchRecords, setPunchRecords] = useState([
    {
      id: "PCH001",
      date: "2024-01-28",
      punchIn: "09:00:00",
      punchOut: "18:00:00",
      totalHours: "9h 0m",
      status: "Present",
      location: "Office"
    },
    {
      id: "PCH002",
      date: "2024-01-27",
      punchIn: "09:15:00",
      punchOut: "17:45:00",
      totalHours: "8h 30m",
      status: "Present",
      location: "Office"
    }
  ]);

  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [punchType, setPunchType] = useState("");
  const [breakNote, setBreakNote] = useState("");
  
  // Persistent tracking states
  const [checkInTime, setCheckInTime] = useState(null);
  const [breakStart, setBreakStart] = useState(null);
  const [breakDurationAccumulated, setBreakDurationAccumulated] = useState(0);
  
  // Real-time calculated counters
  const [workDuration, setWorkDuration] = useState(0);
  const [liveBreakElapsed, setLiveBreakElapsed] = useState(0);

  // 1. Load data safely from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRecords = localStorage.getItem("pch_records");
      const savedPunchedIn = localStorage.getItem("pch_isPunchedIn") === "true" || localStorage.getItem("punchedIn") === "true";
      const savedIsOnBreak = localStorage.getItem("pch_isOnBreak") === "true" || localStorage.getItem("isOnBreak") === "true";
      const savedCheckInTime = localStorage.getItem("pch_checkInTime") || localStorage.getItem("checkInTime");
      const savedBreakStart = localStorage.getItem("pch_breakStart") || localStorage.getItem("breakStart");
      const savedAccumulatedBreak = localStorage.getItem("pch_accumulatedBreak");

      if (savedRecords) setPunchRecords(JSON.parse(savedRecords));
      setIsPunchedIn(savedPunchedIn);
      setIsOnBreak(savedIsOnBreak);
      if (savedCheckInTime) setCheckInTime(Number(savedCheckInTime));
      if (savedBreakStart) setBreakStart(Number(savedBreakStart));
      if (savedAccumulatedBreak) setBreakDurationAccumulated(Number(savedAccumulatedBreak));
    }
  }, []);

  // 2. Persist real-time session states to browser window storage
  useEffect(() => {
    localStorage.setItem("pch_records", JSON.stringify(punchRecords));
    localStorage.setItem("pch_isPunchedIn", isPunchedIn);
    localStorage.setItem("punchedIn", isPunchedIn);
    localStorage.setItem("pch_isOnBreak", isOnBreak);
    localStorage.setItem("isOnBreak", isOnBreak);
    localStorage.setItem("pch_checkInTime", checkInTime || "");
    localStorage.setItem("checkInTime", checkInTime || "");
    localStorage.setItem("pch_breakStart", breakStart || "");
    localStorage.setItem("breakStart", breakStart || "");
    localStorage.setItem("pch_accumulatedBreak", breakDurationAccumulated);
  }, [punchRecords, isPunchedIn, isOnBreak, checkInTime, breakStart, breakDurationAccumulated]);

  // Update current time every second
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time Duty Duration Tracker Loop
  useEffect(() => {
    let interval;
    if (isPunchedIn && checkInTime && !isOnBreak) {
      interval = setInterval(() => {
        setWorkDuration(Math.floor((Date.now() - checkInTime) / 1000) - breakDurationAccumulated);
      }, 1000);
    } else if (isPunchedIn && checkInTime && isOnBreak) {
      setWorkDuration(Math.floor((breakStart - checkInTime) / 1000) - breakDurationAccumulated);
    } else {
      setWorkDuration(0);
    }
    return () => clearInterval(interval);
  }, [isPunchedIn, checkInTime, isOnBreak, breakDurationAccumulated, breakStart]);

  // Real-time Break Duration Counter Loop
  useEffect(() => {
    let interval;
    if (isOnBreak && breakStart) {
      interval = setInterval(() => {
        setLiveBreakElapsed(Math.floor((Date.now() - breakStart) / 1000));
      }, 1000);
    } else {
      setLiveBreakElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isOnBreak, breakStart]);

  const fmtDuration = (totalSecs) => {
    if (totalSecs <= 0 || isNaN(totalSecs)) return "00:00:00";
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handlePunch = (type) => {
    setPunchType(type);
    setOpenData(true);
  };

  const handleBreak = () => {
    if (!isOnBreak) {
      setPunchType("break");
      setOpenData(true);
    } else {
      // Resume Work / Stop Break Session
      const breakSessionDuration = Math.floor((Date.now() - breakStart) / 1000);
      setBreakDurationAccumulated(prev => prev + breakSessionDuration);
      setBreakStart(null);
      setIsOnBreak(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpenData(false);
    setPunchType("");
    setBreakNote("");
  };

  const confirmBreak = () => {
    setBreakStart(Date.now());
    setIsOnBreak(true);
    handleClose();
  };

  const confirmPunch = (type) => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    const dateString = now.toISOString().split('T')[0];

    const actualType = type || punchType;
    let newRecords = [...punchRecords];

    if (actualType === "in") {
      const locIn = localStorage.getItem('last_punch_location_in') || 'Office';
      const newRecord = {
        id: `PCH${String(punchRecords.length + 1).padStart(3, '0')}`,
        date: dateString,
        punchIn: `${timeString} (${locIn})`,
        punchOut: null,
        totalHours: "In Progress",
        status: "Present",
        location: "Office",
        locationIn: locIn
      };
      newRecords = [newRecord, ...punchRecords];
      setPunchRecords(newRecords);
      setCheckInTime(Date.now());
      setBreakDurationAccumulated(0);
      setIsPunchedIn(true);
    } else {
      const locOut = localStorage.getItem('last_punch_location_out') || 'Office';
      const latestRecordIndex = newRecords.findIndex(record => !record.punchOut);
      if (latestRecordIndex !== -1) {
        newRecords[latestRecordIndex] = {
          ...newRecords[latestRecordIndex],
          punchOut: `${timeString} (${locOut})`,
          locationOut: locOut
        };
        const totalWorkedSeconds = Math.floor((Date.now() - checkInTime) / 1000) - breakDurationAccumulated;
        const h = Math.floor(totalWorkedSeconds / 3600);
        const m = Math.floor((totalWorkedSeconds % 3600) / 60);
        newRecords[latestRecordIndex].totalHours = `${h}h ${m}m`;
      }
      setPunchRecords(newRecords);
      setIsPunchedIn(false);
      setCheckInTime(null);
      setBreakStart(null);
      setBreakDurationAccumulated(0);
    }

    // Sync state to backend
    fetch('/api/attendance/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecords)
    }).catch(err => console.error("Sync failed:", err));

    handleClose();
  };

  return (
    <Box sx={{ padding: "1rem", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Page Header */}
      <Box sx={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#374151" }}>
              Good Morning, Super Admin
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography variant="body1" sx={{ color: "#64748b" }}>
              It&apos;s {mounted ? currentTime.toLocaleTimeString() : "--:--:--"} (Asia/Calcutta)
            </Typography>
          </Box>
        </Box>
        
        {/* Action Buttons - Right Top */}
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {!isPunchedIn ? (
            <Button
              variant="contained"
              onClick={() => handlePunch("in")}
              sx={{
                padding: "0.5rem 1rem",
                backgroundColor: "#10b981",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#059669" }
              }}
            >
              Punch In
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={handleBreak}
                startIcon={isOnBreak ? <PlayArrow /> : <Coffee />}
                sx={{
                  padding: "0.5rem 1rem",
                  backgroundColor: isOnBreak ? "#10b981" : "#f59e0b",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: isOnBreak ? "#059669" : "#d97706" }
                }}
              >
                {isOnBreak ? "Resume Work" : "Break Time"}
              </Button>
              <Button
                variant="contained"
                disabled={isOnBreak}
                onClick={() => handlePunch("out")}
                sx={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#ef4444",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#dc2626" }
                }}
              >
                Punch Out
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column - Punch Status & Leave Info */}
        <Grid size={{xs:12, lg:8}}>
          {/* Punch Status Cards */}
          <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
            <Grid size={{xs:12, sm:6}}>
              <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
                <CardContent sx={{ textAlign: "center", padding: "1.5rem" }}>
                  <Box sx={{ backgroundColor: "#f0f9ff", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <Login sx={{ fontSize: 30, color: "#0ea5e9" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b", marginBottom: "0.5rem" }}>
                    {isPunchedIn && checkInTime ? new Date(checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Not Yet"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    Punch in time
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid size={{xs:12, sm:6}}>
              <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
                <CardContent sx={{ textAlign: "center", padding: "1.5rem" }}>
                  <Box sx={{ backgroundColor: "#fef3c7", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <Logout sx={{ fontSize: 30, color: "#f59e0b" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b", marginBottom: "0.5rem" }}>
                    {isPunchedIn ? "Active Duty" : "Finished"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    Punch out time
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Leave Information */}
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "2rem" }}>
            <CardContent sx={{ padding: "1.5rem" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b", marginBottom: "1.5rem" }}>
                Leave Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{xs:12, sm:6, md:3}}>
                  <Box sx={{ textAlign: "center", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>12</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", marginBottom: "0.5rem" }}>Total leave allowance</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                      <Chip label="CL - 6" size="small" sx={{ backgroundColor: "#dbeafe", color: "#1e40af" }} />
                      <Chip label="SL - 6" size="small" sx={{ backgroundColor: "#dcfce7", color: "#166534" }} />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid size={{xs:12, sm:6, md:3}}>
                  <Box sx={{ textAlign: "center", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>2</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", marginBottom: "0.5rem", whiteSpace: "nowrap" }}>Leave taken</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                      <Chip label="Paid - 2" size="small" sx={{ backgroundColor: "#dbeafe", color: "#1e40af" }} />
                      <Chip label="Unpaid - 0" size="small" sx={{ backgroundColor: "#dcfce7", color: "#166534" }} />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid size={{xs:12, sm:6, md:3}}>
                  <Box sx={{ textAlign: "center", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>10</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", marginBottom: "0.5rem" }}>Total leave available</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                      <Chip label="CL - 4" size="small" sx={{ backgroundColor: "#dbeafe", color: "#1e40af" }} />
                      <Chip label="SL - 6" size="small" sx={{ backgroundColor: "#dcfce7", color: "#166534" }} />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid size={{xs:12, sm:6, md:3}}>
                  <Box sx={{ textAlign: "center", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>0</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", marginBottom: "0.5rem" }}>Leave request pending</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                      <Chip label="Paid - 0" size="small" sx={{ backgroundColor: "#dbeafe", color: "#1e40af" }} />
                      <Chip label="Unpaid - 0" size="small" sx={{ backgroundColor: "#dcfce7", color: "#166534" }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Recent Punch Records */}
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ padding: "1.5rem" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b", marginBottom: "1.5rem" }}>
                Recent Punch Records
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Punch In</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Punch Out</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Total Hours</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {punchRecords.slice(0, 5).map((record) => (
                      <TableRow key={record.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {record.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Login sx={{ fontSize: 16, color: "#10b981" }} />
                            <Typography>{record.punchIn}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {record.punchOut ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <Logout sx={{ fontSize: 16, color: "#ef4444" }} />
                              <Typography>{record.punchOut}</Typography>
                            </Box>
                          ) : (
                            <Typography sx={{ color: "#666", fontStyle: "italic" }}>In Progress</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {record.totalHours}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Time Log */}
        <Grid size={{xs:12, lg:4}}>
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", height: "fit-content" }}>
            <CardContent sx={{ padding: "1.5rem" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b", marginBottom: "1.5rem" }}>
                Time Log
              </Typography>
              
              {/* Today */}
              <Box sx={{ marginBottom: "2rem" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#374151", marginBottom: "1rem" }}>
                  Today Statistics
                </Typography>
                <Box sx={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>09:00:00</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>Scheduled</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <Typography variant="body2" sx={{ color: "#2563eb", fontWeight: 600 }}>{fmtDuration(workDuration)}</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>Worked</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ color: "#d97706", fontWeight: 600 }}>{fmtDuration(breakDurationAccumulated + liveBreakElapsed)}</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>Break</Typography>
                  </Box>
                </Box>
              </Box>

              {/* This Month */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#374151", marginBottom: "1rem" }}>
                  This Month
                </Typography>
                <Box sx={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <AccessTime sx={{ fontSize: 16, color: "#64748b" }} />
                      <Typography variant="body2" sx={{ color: "#64748b" }}>Total Schedule time</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>180h 0m</Typography>
                  </Box>
                  
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Typography variant="body2" sx={{ color: "#64748b", marginBottom: "0.5rem" }}>Worked time</Typography>
                    <Box sx={{ backgroundColor: "#e2e8f0", borderRadius: "4px", height: "8px", marginBottom: "0.5rem" }}>
                      <Box sx={{ backgroundColor: "#3b82f6", height: "100%", width: "75%", borderRadius: "4px" }}></Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>135h 0m</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Common Dialog Modal Framework */}
      <CommonDialog
        open={openData}
        onClose={handleClose}
        dialogTitle={
          punchType === "in" 
            ? "Confirm Punch In" 
            : punchType === "out" 
            ? "Confirm Punch Out" 
            : punchType === "break"
            ? "Start Break"
            : ""
        }
        dialogContent={
          punchType === "break" ? (
            <Box sx={{ padding: "1rem 0 0 0" }}>
              <TextField
                fullWidth
                label="Take break note"
                multiline
                rows={3}
                value={breakNote}
                onChange={(e) => setBreakNote(e.target.value)}
                placeholder="Take break note"
                sx={{ marginBottom: "1.5rem" }}
              />
              <Box sx={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={handleClose} sx={{ textTransform: "none", color: "#64748b", borderColor: "#cbd5e1" }}>
                  Close
                </Button>
                <Button variant="contained" onClick={confirmBreak} sx={{ textTransform: "none", backgroundColor: "#f59e0b", "&:hover": { backgroundColor: "#d97706" } }}>
                  Start
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "1rem 0 0 0" }}>
              <PunchConfirmation 
                punchType={punchType}
                currentTime={currentTime}
                location="Office, Mumbai, Maharashtra"
                compact={true}
                onSuccess={(type) => confirmPunch(type)}
              />
              
              {/* Actions Deck Layout */}
              <Box sx={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", width: "100%" }}>
                {/* <Button 
                  variant="outlined" 
                  onClick={handleClose} 
                  sx={{ textTransform: "none", color: "#64748b", borderColor: "#cbd5e1" }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  onClick={confirmPunch} 
                  sx={{ 
                    textTransform: "none", 
                    backgroundColor: punchType === "in" ? "#10b981" : "#ef4444", 
                    "&:hover": { backgroundColor: punchType === "in" ? "#059669" : "#dc2626" } 
                  }}
                >
                  Confirm {punchType === "in" ? "Punch In" : "Punch Out"}
                </Button> */}
              </Box>
            </Box>
          )
        }
        maxWidth="sm"
      />
    </Box>
  );
};

export default AttendancePunchPage;