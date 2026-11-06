// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Container,
//   InputAdornment,
//   Card,
//   CardContent
// } from "@mui/material";
// import {
//   Email,
//   Lock,
//   Visibility,
//   VisibilityOff
// } from "@mui/icons-material";

// export default function Login() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     router.push("/dashboard");
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         overflow: "hidden",
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "radial-gradient(circle at top left, #1c92d2, #0f2027)"
//       }}
//     >
//       {/* Floating Glowing Orbs */}
//       <motion.div
//         animate={{ y: [0, -50, 0] }}
//         transition={{ duration: 6, repeat: Infinity }}
//         style={{
//           position: "absolute",
//           width: 400,
//           height: 400,
//           background: "rgba(66,165,245,0.3)",
//           borderRadius: "50%",
//           filter: "blur(120px)",
//           top: -100,
//           left: -100
//         }}
//       />

//       <motion.div
//         animate={{ y: [0, 60, 0] }}
//         transition={{ duration: 8, repeat: Infinity }}
//         style={{
//           position: "absolute",
//           width: 300,
//           height: 300,
//           background: "rgba(25,118,210,0.4)",
//           borderRadius: "50%",
//           filter: "blur(120px)",
//           bottom: -100,
//           right: -100
//         }}
//       />

//       <Container maxWidth="sm">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           whileHover={{ rotateX: 3, rotateY: -3 }}
//           style={{ perspective: 1000 }}
//         >
//           <Card
//             sx={{
//               borderRadius: 6,
//               backdropFilter: "blur(30px)",
//               background: "rgba(255,255,255,0.08)",
//               border: "1px solid rgba(255,255,255,0.2)",
//               boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
//               p: 3
//             }}
//           >
//             <CardContent>
//               {/* Animated Heading */}
//               <motion.div
//                 initial={{ y: -30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <Typography
//                   variant="h4"
//                   textAlign="center"
//                   fontWeight={700}
//                   color="#fff"
//                   mb={1}
//                 >
//                   HRMS Portal
//                 </Typography>
//                 <Typography
//                   textAlign="center"
//                   color="rgba(255,255,255,0.7)"
//                   mb={4}
//                 >
//                   Welcome back! Please login.
//                 </Typography>
//               </motion.div>

//               {/* Form */}
//               <Box component="form" onSubmit={handleSubmit}>
//                 <motion.div
//                   initial={{ x: -40, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     sx={inputStyle}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Email sx={{ color: "#fff" }} />
//                         </InputAdornment>
//                       )
//                     }}
//                   />
//                 </motion.div>

//                 <motion.div
//                   initial={{ x: 40, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <TextField
//                     fullWidth
//                     label="Password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     value={form.password}
//                     onChange={handleChange}
//                     sx={{ ...inputStyle, mt: 3 }}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Lock sx={{ color: "#fff" }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <Button
//                             onClick={() =>
//                               setShowPassword(!showPassword)
//                             }
//                             sx={{ minWidth: "auto", color: "#fff" }}
//                           >
//                             {showPassword ? (
//                               <VisibilityOff />
//                             ) : (
//                               <Visibility />
//                             )}
//                           </Button>
//                         </InputAdornment>
//                       )
//                     }}
//                   />
//                 </motion.div>

//                 {/* Animated Button */}
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   style={{ display: "flex", justifyContent: "center" }}
//                 >
//                   <Button
//                     type="submit"
//                     sx={{
//                       mt: 5,
//                       width: 220,
//                       height: 55,
//                       borderRadius: 50,
//                       fontWeight: 600,
//                       color: "#fff",
//                       background:
//                         "linear-gradient(90deg, #1c92d2, #42a5f5)",
//                       position: "relative",
//                       overflow: "hidden",
//                       boxShadow:
//                         "0 15px 40px rgba(66,165,245,0.6)",
//                       "&::before": {
//                         content: '""',
//                         position: "absolute",
//                         top: 0,
//                         left: "-100%",
//                         width: "100%",
//                         height: "100%",
//                         background:
//                           "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
//                         transition: "0.6s"
//                       },
//                       "&:hover::before": {
//                         left: "100%"
//                       }
//                     }}
//                   >
//                     Sign In
//                   </Button>
//                 </motion.div>
//               </Box>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// }

// const inputStyle = {
//   input: { color: "#fff" },
//   label: { color: "rgba(255,255,255,0.7)" },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "rgba(255,255,255,0.4)"
//     },
//     "&:hover fieldset": {
//       borderColor: "#42a5f5"
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#1c92d2"
//     }
//   }
// };




"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  Link
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  Fingerprint
} from "@mui/icons-material";

export default function Login() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save user session in localStorage
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setLoading(false);
      alert(err.message || "Invalid email or password");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f5f0eb;
          overflow: hidden;
          position: relative;
        }

        /* ── LEFT PANEL ── */
        .left-panel {
          width: 52%;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
        }

        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .blob1 {
          position: absolute;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,179,237,0.25) 0%, transparent 70%);
          top: -80px; left: -80px;
          animation: blobFloat1 8s ease-in-out infinite;
        }
        .blob2 {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(237,137,54,0.2) 0%, transparent 70%);
          bottom: 80px; right: -60px;
          animation: blobFloat2 10s ease-in-out infinite;
        }
        .blob3 {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(154,230,180,0.15) 0%, transparent 70%);
          bottom: -40px; left: 40%;
          animation: blobFloat3 6s ease-in-out infinite;
        }

        @keyframes blobFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(30px,-40px) scale(1.1); }
        }
        @keyframes blobFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-20px,30px) scale(0.95); }
        }
        @keyframes blobFloat3 {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-20px); }
        }

        /* floating geometric shapes */
        .geo {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.08);
          animation: geoSpin linear infinite;
        }
        .geo-1 { width:80px;height:80px; top:22%;left:15%; border-radius:16px; animation-duration:18s; }
        .geo-2 { width:50px;height:50px; top:55%;left:65%; border-radius:50%; animation-duration:12s; animation-direction:reverse; }
        .geo-3 { width:100px;height:100px; top:70%;left:20%; border-radius:24px; animation-duration:22s; }
        .geo-4 { width:30px;height:30px; top:35%;left:75%; animation-duration:9s; }

        @keyframes geoSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .left-brand {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .left-brand.show { opacity: 1; transform: translateY(0); }

        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px;
          padding: 8px 18px;
          margin-bottom: 28px;
        }
        .brand-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #63b3ed;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.4); }
        }
        .brand-badge span {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .left-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .left-headline em {
          font-style: normal;
          background: linear-gradient(90deg, #63b3ed, #f6ad55);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .left-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 340px;
        }

        .left-stats {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 32px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
        }
        .left-stats.show { opacity: 1; transform: translateY(0); }

        .stat-item { display: flex; flex-direction: column; gap: 4px; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
        }
        .stat-label { font-size: 12px; color: rgba(255,255,255,0.45); letter-spacing: 0.5px; }

        .stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.12);
          align-self: stretch;
        }

        /* ── RIGHT PANEL ── */
        .right-panel {
          width: 48%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          background: #faf8f5;
          position: relative;
          overflow: hidden;
        }

        .right-panel::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 65%);
          top: -150px; right: -150px;
          pointer-events: none;
        }
        .right-panel::after {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(237,137,54,0.07) 0%, transparent 65%);
          bottom: -80px; left: -80px;
          pointer-events: none;
        }

        .form-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 400px;
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
        }
        .form-card.show { opacity: 1; transform: translateX(0); }

        .form-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #0f3460;
          background: rgba(15,52,96,0.08);
          border-radius: 4px;
          padding: 5px 12px;
          margin-bottom: 20px;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 14px;
          color: #888;
          margin-bottom: 36px;
        }

        /* custom input */
        .field-wrap {
          position: relative;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .field-wrap.show { opacity: 1; transform: translateX(0); }
        .field-wrap:nth-child(1) { transition-delay: 0.4s; }
        .field-wrap:nth-child(2) { transition-delay: 0.55s; }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #555;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .field-inner {
          position: relative;
          display: flex;
          align-items: center;
          background: #fff;
          border: 1.5px solid #e8e2da;
          border-radius: 14px;
          transition: border-color 0.3s, box-shadow 0.3s;
          overflow: hidden;
        }
        .field-inner.focused {
          border-color: #0f3460;
          box-shadow: 0 0 0 4px rgba(15,52,96,0.08);
        }
        .field-inner.error {
          border-color: #e53e3e;
          box-shadow: 0 0 0 4px rgba(229,62,62,0.08);
          animation: fieldShake 0.5s ease;
        }

        @keyframes fieldShake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-6px); }
          40%     { transform: translateX(6px); }
          60%     { transform: translateX(-4px); }
          80%     { transform: translateX(4px); }
        }

        .field-icon {
          padding: 0 14px 0 18px;
          color: #aaa;
          display: flex;
          align-items: center;
          transition: color 0.3s;
        }
        .field-inner.focused .field-icon { color: #0f3460; }

        .field-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #1a1a2e;
          padding: 16px 0;
          font-weight: 400;
        }
        .field-input::placeholder { color: #bbb; }

        .field-end {
          padding: 0 14px;
          display: flex;
          align-items: center;
        }

        .eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #aaa;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
        }
        .eye-btn:hover { color: #0f3460; background: rgba(15,52,96,0.06); }

        /* forgot */
        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin: -8px 0 28px;
          opacity: 0;
          transition: opacity 0.7s ease 0.65s;
        }
        .forgot-row.show { opacity: 1; }
        .forgot-link {
          font-size: 13px;
          color: #0f3460;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .forgot-link:hover { opacity: 0.7; }

        /* submit button */
        .submit-wrap {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s;
        }
        .submit-wrap.show { opacity: 1; transform: translateY(0); }

        .submit-btn {
          width: 100%;
          height: 56px;
          border: none;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0f3460, #16213e);
          box-shadow: 0 8px 32px rgba(15,52,96,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.3px;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99,179,237,0.3), rgba(246,173,85,0.2));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(15,52,96,0.45); }
        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:active { transform: translateY(0); }

        .submit-btn.loading { pointer-events: none; }

        /* shimmer */
        .submit-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transition: left 0.6s ease;
        }
        .submit-btn:hover::after { left: 150%; }

        /* spinner */
        .spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* divider */
        .or-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          opacity: 0;
          transition: opacity 0.7s ease 0.85s;
        }
        .or-row.show { opacity: 1; }
        .or-line { flex: 1; height: 1px; background: #ece6de; }
        .or-text { font-size: 12px; color: #bbb; font-weight: 500; letter-spacing: 0.5px; white-space: nowrap; }

        /* SSO buttons */
        .sso-row {
          display: flex;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.7s ease 0.95s;
        }
        .sso-row.show { opacity: 1; }

        .sso-btn {
          flex: 1;
          height: 48px;
          border: 1.5px solid #e8e2da;
          border-radius: 12px;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #444;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .sso-btn:hover {
          border-color: #0f3460;
          box-shadow: 0 4px 16px rgba(15,52,96,0.1);
          transform: translateY(-1px);
        }

        /* footer */
        .form-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: #aaa;
          opacity: 0;
          transition: opacity 0.7s ease 1.05s;
        }
        .form-footer.show { opacity: 1; }
        .form-footer a { color: #0f3460; font-weight: 600; text-decoration: none; }
        .form-footer a:hover { text-decoration: underline; }

        /* progress bar at top */
        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 3px;
          background: linear-gradient(90deg, #63b3ed, #f6ad55);
          border-radius: 0 2px 2px 0;
          width: 0;
          z-index: 999;
          transition: width 1.8s cubic-bezier(0.4,0,0.2,1);
        }
        .progress-bar.loading { width: 85%; }

        /* responsive */
        @media (max-width: 768px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; padding: 32px 24px; }
        }
      `}</style>

      {/* Top Loading Bar */}
      <div className={`progress-bar ${loading ? "loading" : ""}`} />

      <div className="login-root">

        {/* ── LEFT PANEL ── */}
        <div className="left-panel">
          <div className="blob1" />
          <div className="blob2" />
          <div className="blob3" />
          <div className="geo geo-1" />
          <div className="geo geo-2" />
          <div className="geo geo-3" />
          <div className="geo geo-4" />

          <div className={`left-brand ${mounted ? "show" : ""}`}>
            <div className="brand-badge">
              <div className="brand-dot" />
              <span>HRMS Platform</span>
            </div>
            <div className="left-headline">
              Manage your<br />
              workforce with<br />
              <em>intelligence.</em>
            </div>
            <p className="left-sub">
              A unified platform for HR, payroll, attendance, and performance — built for modern teams.
            </p>
          </div>

          <div className={`left-stats ${mounted ? "show" : ""}`}>
            <div className="stat-item">
              <span className="stat-num">12K+</span>
              <span className="stat-label">Employees managed</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">98%</span>
              <span className="stat-label">Uptime SLA</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">4.9★</span>
              <span className="stat-label">Avg rating</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="right-panel">
          <div className={`form-card ${mounted ? "show" : ""}`}>
            <span className="form-tag">Employee Portal</span>
            <div className="form-title">Welcome back</div>
            <p className="form-subtitle">Sign in to access your workspace</p>

            <form onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div className={`field-wrap ${mounted ? "show" : ""}`}>
                <label className="field-label">Email address</label>
                <div className={`field-inner ${focused === "email" ? "focused" : ""} ${shake && !form.email ? "error" : ""}`}>
                  <span className="field-icon">
                    <Email style={{ fontSize: 18 }} />
                  </span>
                  <input
                    className="field-input"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className={`field-wrap ${mounted ? "show" : ""}`}>
                <label className="field-label">Password</label>
                <div className={`field-inner ${focused === "password" ? "focused" : ""} ${shake && !form.password ? "error" : ""}`}>
                  <span className="field-icon">
                    <Lock style={{ fontSize: 18 }} />
                  </span>
                  <input
                    className="field-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                    autoComplete="current-password"
                  />
                  <div className="field-end">
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword
                        ? <VisibilityOff style={{ fontSize: 18 }} />
                        : <Visibility style={{ fontSize: 18 }} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot */}
              <div className={`forgot-row ${mounted ? "show" : ""}`}>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              {/* Submit */}
              <div className={`submit-wrap ${mounted ? "show" : ""}`}>
                <button
                  type="submit"
                  className={`submit-btn ${loading ? "loading" : ""}`}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Signing you in…
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowForward style={{ fontSize: 18 }} />
                    </>
                  )}
                </button>
              </div>

              {/* OR divider */}
              <div className={`or-row ${mounted ? "show" : ""}`}>
                <div className="or-line" />
                <span className="or-text">OR CONTINUE WITH</span>
                <div className="or-line" />
              </div>

              {/* SSO */}
              <div className={`sso-row ${mounted ? "show" : ""}`}>
                <button type="button" className="sso-btn">
                  {/* Google icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className="sso-btn">
                  {/* Microsoft icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z"/>
                    <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                    <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                    <path fill="#FFB900" d="M13 13h10v10H13z"/>
                  </svg>
                  Microsoft
                </button>
              </div>

            </form>

            <div className={`form-footer ${mounted ? "show" : ""}`}>
              Don&apos;t have an account?&nbsp;
              <a href="#">Contact your administrator</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 