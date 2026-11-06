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
  Link
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  Person
} from "@mui/icons-material";

export default function Signup() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setShake(true);
      setErrorMsg("All fields are required");
      setTimeout(() => setShake(false), 600);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setShake(true);
      setErrorMsg("Passwords do not match");
      setTimeout(() => setShake(false), 600);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: 'Super Admin'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setSuccess(true);
      setLoading(false);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      console.error('Signup error:', err);
      setErrorMsg(err.message || 'Something went wrong');
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 600);
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
          margin-bottom: 24px;
        }

        /* custom input */
        .field-wrap {
          position: relative;
          margin-bottom: 16px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #555;
          margin-bottom: 6px;
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
          font-size: 14px;
          color: #1a1a2e;
          padding: 14px 0;
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

        /* submit button */
        .submit-wrap {
          margin-top: 24px;
        }

        .submit-btn {
          width: 100%;
          height: 54px;
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

        /* spinner */
        .spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* error alert */
        .error-alert {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13px;
          margin-bottom: 20px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* success alert */
        .success-alert {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          color: #15803d;
          padding: 16px 20px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          box-shadow: 0 4px 12px rgba(21,128,61,0.1);
        }

        /* footer */
        .form-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: #aaa;
        }
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
              Register as<br />
              a system<br />
              <em>Administrator.</em>
            </div>
            <p className="left-sub">
              Create an administrative profile to assign tasks, authorize payrolls, process leaves, and audit all employee actions.
            </p>
          </div>

          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", position: "relative", zIndex: 2 }}>
            © {new Date().getFullYear()} VED HRMS. All rights reserved.
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="right-panel">
          <div className={`form-card ${mounted ? "show" : ""}`}>
            <span className="form-tag">Admin Setup</span>
            
            {success ? (
              <div className="success-alert" style={{ animation: "fieldShake 0.4s ease" }}>
                🎉 Admin account registered successfully!<br/>
                <span style={{ fontSize: "12px", fontWeight: 400, opacity: 0.8, display: "block", marginTop: "8px" }}>
                  Redirecting to sign-in page...
                </span>
              </div>
            ) : (
              <>
                <div className="form-title">Create Admin</div>
                <p className="form-subtitle">Register to begin monitoring your workspace</p>

                {errorMsg && (
                  <div className="error-alert">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>

                  {/* Name */}
                  <div className="field-wrap">
                    <label className="field-label">Full Name</label>
                    <div className={`field-inner ${focused === "name" ? "focused" : ""} ${shake && !form.name ? "error" : ""}`}>
                      <span className="field-icon">
                        <Person style={{ fontSize: 18 }} />
                      </span>
                      <input
                        className="field-input"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="field-wrap">
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
                  <div className="field-wrap">
                    <label className="field-label">Password</label>
                    <div className={`field-inner ${focused === "password" ? "focused" : ""} ${shake && !form.password ? "error" : ""}`}>
                      <span className="field-icon">
                        <Lock style={{ fontSize: 18 }} />
                      </span>
                      <input
                        className="field-input"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Choose a strong password"
                        value={form.password}
                        onChange={handleChange}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused("")}
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

                  {/* Confirm Password */}
                  <div className="field-wrap">
                    <label className="field-label">Confirm Password</label>
                    <div className={`field-inner ${focused === "confirmPassword" ? "focused" : ""} ${shake && (!form.confirmPassword || form.confirmPassword !== form.password) ? "error" : ""}`}>
                      <span className="field-icon">
                        <Lock style={{ fontSize: 18 }} />
                      </span>
                      <input
                        className="field-input"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Retype password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setFocused("confirmPassword")}
                        onBlur={() => setFocused("")}
                      />
                      <div className="field-end">
                        <button
                          type="button"
                          className="eye-btn"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          tabIndex={-1}
                        >
                          {showConfirmPassword
                            ? <VisibilityOff style={{ fontSize: 18 }} />
                            : <Visibility style={{ fontSize: 18 }} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="submit-wrap">
                    <button
                      type="submit"
                      className={`submit-btn ${loading ? "loading" : ""}`}
                    >
                      {loading ? (
                        <>
                          <div className="spinner" />
                          Creating Account…
                        </>
                      ) : (
                        <>
                          Sign Up Admin
                          <ArrowForward style={{ fontSize: 18 }} />
                        </>
                      )}
                    </button>
                  </div>

                </form>

                <div className="form-footer">
                  Already have an account?&nbsp;
                  <Link href="/login">Sign In</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
