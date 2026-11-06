'use client';

import { useState, useEffect, useRef } from "react"
import { Box, Paper, Typography, Avatar, AvatarGroup, Chip, IconButton } from "@mui/material"
import {
  People as PeopleIcon,
  Groups as GroupsIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreHoriz as MoreHorizIcon,
  Notifications as NotificationsIcon,
  CalendarMonth as CalendarMonthIcon,
  ArrowUpward as ArrowUpwardIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Cancel as CancelIcon,
  PersonAdd as PersonAddIcon,
  Assignment as AssignmentIcon,
  DateRange as DateRangeIcon,
} from "@mui/icons-material"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"

// ─── Color palette ──────────────────────────────────────────────
const COLORS = {
  blue: "#1976D2",
  blueLight: "#42A5F5",
  teal: "#009688",
  tealLight: "#4DB6AC",
  orange: "#FF9800",
  orangeLight: "#FFB74D",
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FF9800",
  info: "#2196F3",
  purple: "#7C4DFF",
  pink: "#E91E63",
  dark: "#212121",
  gray: "#757575",
  lightGray: "#E0E0E0",
  bgGray: "#F5F5F5",
}

const CHART_COLORS = ["#1976D2", "#009688", "#FF9800", "#7C4DFF", "#E91E63", "#4CAF50", "#F44336", "#2196F3"]

// ─── Mock Data ──────────────────────────────────────────────────
const statCardsData = [
  {
    id: 1,
    title: "Total Employees",
    value: "1,284",
    change: "+12%",
    isUp: true,
    icon: <PeopleIcon />,
    color: COLORS.blue,
    bgColor: "rgba(25, 118, 210, 0.08)",
  },
  {
    id: 2,
    title: "Active Employees",
    value: "1,142",
    change: "+8%",
    isUp: true,
    icon: <GroupsIcon />,
    color: COLORS.teal,
    bgColor: "rgba(0, 150, 136, 0.08)",
  },
  {
    id: 3,
    title: "Departments",
    value: "12",
    change: "+2",
    isUp: true,
    icon: <BusinessIcon />,
    color: COLORS.orange,
    bgColor: "rgba(255, 152, 0, 0.08)",
  },
  {
    id: 4,
    title: "Open Positions",
    value: "24",
    change: "-3",
    isUp: false,
    icon: <WorkIcon />,
    color: COLORS.purple,
    bgColor: "rgba(124, 77, 255, 0.08)",
  },
]

const employeeGrowthData = [
  { month: "Jan", employees: 820 },
  { month: "Feb", employees: 860 },
  { month: "Mar", employees: 910 },
  { month: "Apr", employees: 945 },
  { month: "May", employees: 1020 },
  { month: "Jun", employees: 1085 },
  { month: "Jul", employees: 1142 },
  { month: "Aug", employees: 1190 },
  { month: "Sep", employees: 1210 },
  { month: "Oct", employees: 1245 },
  { month: "Nov", employees: 1270 },
  { month: "Dec", employees: 1284 },
]

const departmentData = [
  { name: "Engineering", value: 320 },
  { name: "Marketing", value: 180 },
  { name: "Sales", value: 220 },
  { name: "HR", value: 85 },
  { name: "Finance", value: 95 },
  { name: "Operations", value: 140 },
  { name: "Design", value: 110 },
  { name: "Support", value: 134 },
]

const attendanceData = [
  { month: "Jan", present: 780, absent: 28, leave: 12 },
  { month: "Feb", present: 810, absent: 32, leave: 18 },
  { month: "Mar", present: 850, absent: 40, leave: 20 },
  { month: "Apr", present: 890, absent: 35, leave: 20 },
  { month: "May", present: 960, absent: 42, leave: 18 },
  { month: "Jun", present: 1020, absent: 38, leave: 27 },
  { month: "Jul", present: 1080, absent: 45, leave: 17 },
  { month: "Aug", present: 1120, absent: 48, leave: 22 },
  { month: "Sep", present: 1140, absent: 50, leave: 20 },
  { month: "Oct", present: 1170, absent: 55, leave: 20 },
  { month: "Nov", present: 1190, absent: 52, leave: 28 },
  { month: "Dec", present: 1200, absent: 60, leave: 24 },
]

const employeeStatusData = [
  { name: "Active", value: 1142 },
  { name: "On Leave", value: 82 },
  { name: "Resigned", value: 45 },
  { name: "On Notice", value: 15 },
]

const recentActivities = [
  { id: 1, user: "Sarah Johnson", action: "joined as Senior Developer", time: "2 min ago", type: "join" },
  { id: 2, user: "Mike Chen", action: "submitted leave request", time: "15 min ago", type: "leave" },
  { id: 3, user: "Emily Davis", action: "completed performance review", time: "1 hour ago", type: "review" },
  { id: 4, user: "Alex Turner", action: "updated department budget", time: "2 hours ago", type: "update" },
  { id: 5, user: "Lisa Wang", action: "feedback for Q2 submitted", time: "3 hours ago", type: "feedback" },
  { id: 6, user: "James Wilson", action: "onboarded 3 new hires", time: "5 hours ago", type: "onboard" },
]

const upcomingEvents = [
  { id: 1, title: "Team Building Workshop", date: "Jun 15, 2026", time: "10:00 AM", attendees: 45 },
  { id: 2, title: "Quarterly Review Meeting", date: "Jun 18, 2026", time: "2:00 PM", attendees: 12 },
  { id: 3, title: "New Hire Orientation", date: "Jun 20, 2026", time: "9:00 AM", attendees: 8 },
]

// ─── Animation Variants ────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

const cardHover = {
  rest: { scale: 1, boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
}

// ─── Animated Number Counter ────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0)
  const numericValue = Number.parseInt(value.replace(/[^0-9]/g, "")) || 0
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 1500
          const step = Math.ceil(numericValue / (duration / 16))
          const timer = setInterval(() => {
            start += step
            if (start >= numericValue) {
              setCount(numericValue)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 16)
          observer.disconnect()
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [numericValue])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ─── Stat Card Component ────────────────────────────────────────
function StatCard({ title, value, change, isUp, icon, color, bgColor, index }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover="hover"
    >
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        style={{
          height: "100%",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "16px",
            border: "1px solid #E0E0E0",
            background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
            position: "relative",
            overflow: "hidden",
            height: "100%",
            cursor: "pointer",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${color}, ${color}88)`,
            },
            "&:hover": {
              "& .stat-icon": {
                transform: "scale(1.1) rotate(-5deg)",
              },
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box
              className="stat-icon"
              sx={{
                width: 52,
                height: 52,
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: bgColor,
                color: color,
                transition: "all 0.3s ease",
                fontSize: "1.5rem",
              }}
            >
              {icon}
            </Box>
            <Chip
              icon={isUp ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />}
              label={change}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
                bgcolor: isUp ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                color: isUp ? COLORS.success : COLORS.error,
                borderRadius: "8px",
                height: 24,
              }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: "2rem", color: COLORS.dark, mb: 0.5 }}>
            <AnimatedCounter value={value} />
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.gray, fontWeight: 500 }}>
            {title}
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: -20,
              right: -20,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${bgColor} 0%, transparent 70%)`,
              opacity: 0.5,
            }}
          />
        </Paper>
      </motion.div>
    </motion.div>
  )
}

// ─── Custom Tooltip ─────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={8}
        sx={{
          p: 1.5,
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography variant="caption" sx={{ color: COLORS.gray, fontWeight: 600, mb: 0.5, display: "block" }}>
          {label}
        </Typography>
        {payload.map((entry, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, my: 0.3 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "2px", bgcolor: entry.color }} />
            <Typography variant="caption" sx={{ fontWeight: 500, color: COLORS.dark }}>
              {entry.name}:{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 700 }}>
                {entry.value.toLocaleString()}
              </Typography>
            </Typography>
          </Box>
        ))}
      </Paper>
    )
  }
  return null
}

// ─── Activity Icon ──────────────────────────────────────────────
function ActivityIcon({ type }) {
  const iconMap = {
    join: <PersonAddIcon sx={{ fontSize: 18 }} />,
    leave: <CalendarMonthIcon sx={{ fontSize: 18 }} />,
    review: <AssignmentIcon sx={{ fontSize: 18 }} />,
    update: <DateRangeIcon sx={{ fontSize: 18 }} />,
    feedback: <CheckCircleIcon sx={{ fontSize: 18 }} />,
    onboard: <GroupsIcon sx={{ fontSize: 18 }} />,
  }
  const colorMap = {
    join: COLORS.blue,
    leave: COLORS.orange,
    review: COLORS.teal,
    update: COLORS.purple,
    feedback: COLORS.success,
    onboard: COLORS.info,
  }
  const bgMap = {
    join: "rgba(25, 118, 210, 0.1)",
    leave: "rgba(255, 152, 0, 0.1)",
    review: "rgba(0, 150, 136, 0.1)",
    update: "rgba(124, 77, 255, 0.1)",
    feedback: "rgba(76, 175, 80, 0.1)",
    onboard: "rgba(33, 150, 243, 0.1)",
  }
  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: bgMap[type] || bgMap.join,
        color: colorMap[type] || colorMap.join,
        flexShrink: 0,
      }}
    >
      {iconMap[type] || iconMap.join}
    </Box>
  )
}

// ─── Main Dashboard Component ───────────────────────────────────
export default function DashboardPage() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: "auto" }}>
      {/* ── Welcome Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3.5 },
            mb: 3,
            borderRadius: "20px",
            background: "linear-gradient(135deg, #1976D2 0%, #42A5F5 50%, #009688 100%)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -80,
              left: "60%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 20,
              right: "30%",
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.85rem" }, mb: 0.5 }}>
              {greeting}, Admin! 👋
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.85, mb: 2, fontSize: { xs: "0.875rem", md: "1rem" } }}>
              {`Here's what's happening with your organization today.`}
            </Typography>
            <Box sx={{ display: "flex", gap: { xs: 1.5, md: 3 }, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarMonthIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.8rem" }}>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#4CAF50",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.3 },
                    },
                  }}
                />
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.8rem" }}>
                  System Active
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* ── Stat Cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        {statCardsData.map((card, i) => (
          <StatCard key={card.id} {...card} index={i} />
        ))}
      </motion.div>

      {/* ── Charts Row 1 ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Employee Growth Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              background: "#fff",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: COLORS.dark }}>
                  Employee Growth
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.gray }}>
                  Monthly employee count overview
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: COLORS.gray }}>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employeeGrowthData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="month" tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="employees"
                  stroke={COLORS.blue}
                  strokeWidth={3}
                  dot={{ fill: COLORS.blue, stroke: "#fff", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: COLORS.blue, stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </motion.div>

        {/* Employee Status Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              background: "#fff",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: COLORS.dark }}>
                  Employee Status
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.gray }}>
                  Current distribution
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: COLORS.gray }}>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={employeeStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {employeeStatusData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={[COLORS.success, COLORS.orange, COLORS.error, COLORS.info][i]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend */}
              <Box sx={{ ml: { xs: 0, md: 1 }, minWidth: 100 }}>
                {employeeStatusData.map((item, i) => (
                  <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "3px",
                        bgcolor: [COLORS.success, COLORS.orange, COLORS.error, COLORS.info][i],
                      }}
                    />
                    <Box>
                      <Typography variant="caption" sx={{ display: "block", color: COLORS.gray, fontSize: "0.7rem" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: COLORS.dark }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>

      {/* ── Charts Row 2 ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Department Distribution Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              background: "#fff",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: COLORS.dark }}>
                  Department Distribution
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.gray }}>
                  Employees by department
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: COLORS.gray }}>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={departmentData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  {CHART_COLORS.map((color, i) => (
                    <linearGradient key={i} id={`barGradient${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.4} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: COLORS.gray, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
                  {departmentData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={`url(#barGradient${i % CHART_COLORS.length})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </motion.div>

        {/* Attendance Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              background: "#fff",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: COLORS.dark }}>
                  Attendance Trends
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.gray }}>
                  Monthly attendance overview
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: COLORS.gray }}>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={attendanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={COLORS.success} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="absentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.error} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS.error} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="leaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.orange} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS.orange} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="month" tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <Typography component="span" variant="caption" sx={{ color: COLORS.gray, fontWeight: 500 }}>
                      {value}
                    </Typography>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="present"
                  stroke={COLORS.success}
                  strokeWidth={2}
                  fill="url(#presentGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: COLORS.success }}
                />
                <Area
                  type="monotone"
                  dataKey="absent"
                  stroke={COLORS.error}
                  strokeWidth={2}
                  fill="url(#absentGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: COLORS.error }}
                />
                <Area
                  type="monotone"
                  dataKey="leave"
                  stroke={COLORS.orange}
                  strokeWidth={2}
                  fill="url(#leaveGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: COLORS.orange }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </motion.div>
      </Box>

      {/* ── Bottom Row: Recent Activity + Upcoming Events ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
          gap: 3,
        }}
      >
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              background: "#fff",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: COLORS.dark }}>
                Recent Activity
              </Typography>
              <Chip
                label="View All"
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  bgcolor: COLORS.bgGray,
                  color: COLORS.gray,
                  borderRadius: "8px",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#E0E0E0" },
                }}
              />
            </Box>
            <Box>
              {recentActivities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 1.5,
                      borderBottom: i < recentActivities.length - 1 ? "1px solid #F0F0F0" : "none",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.01)", borderRadius: "10px" },
                      px: 1,
                      mx: -1,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ActivityIcon type={activity.type} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.dark }}>
                        {activity.user}{" "}
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: COLORS.gray, fontWeight: 400, fontSize: "0.825rem" }}
                        >
                          {activity.action}
                        </Typography>
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#BDBDBD", fontSize: "0.7rem" }}>
                        {activity.time}
                      </Typography>
                    </Box>
                    <NotificationsIcon sx={{ fontSize: 16, color: "#E0E0E0" }} />
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              background: "#fff",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: COLORS.dark }}>
                Upcoming Events
              </Typography>
              <CalendarMonthIcon sx={{ fontSize: 20, color: COLORS.gray }} />
            </Box>
            <Box>
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      borderRadius: "14px",
                      border: "1px solid #F0F0F0",
                      bgcolor: "#FAFAFA",
                      "&:hover": {
                        bgcolor: "#F5F5F5",
                        borderColor: "#E0E0E0",
                      },
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {/* Date Badge */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "12px",
                          background: `linear-gradient(135deg, ${[COLORS.blue, COLORS.teal, COLORS.purple][i % 3]} 0%, ${[COLORS.blueLight, COLORS.tealLight, COLORS.purple][i % 3]} 100%)`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        <Typography variant="caption" sx={{ fontSize: "0.6rem", fontWeight: 700, lineHeight: 1 }}>
                          {event.date.split(",")[0].split(" ")[0].substring(0, 3)}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "0.85rem", fontWeight: 800, lineHeight: 1.2 }}>
                          {event.date.split(" ")[1].replace(",", "")}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.dark, mb: 0.3 }}>
                          {event.title}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Typography variant="caption" sx={{ color: COLORS.gray, fontSize: "0.7rem" }}>
                            {event.time}
                          </Typography>
                          <Box
                            sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "#E0E0E0" }}
                          />
                          <Typography variant="caption" sx={{ color: COLORS.gray, fontSize: "0.7rem" }}>
                            {event.attendees} attendees
                          </Typography>
                        </Box>
                      </Box>
                      <ArrowUpwardIcon
                        sx={{
                          fontSize: 18,
                          color: COLORS.gray,
                          transform: "rotate(45deg)",
                          opacity: 0.6,
                        }}
                      />
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Box>

            {/* Quick Stats */}
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px solid #F0F0F0",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.blue }}>
                  85%
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.gray }}>
                  Attendance
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.teal }}>
                  92%
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.gray }}>
                  Retention
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.orange }}>
                  4.5
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.gray }}>
                  Avg Rating
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  )
}