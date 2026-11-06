"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─── Global Styles ─── */
const styleTag = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');

* { box-sizing: border-box; }

@keyframes pulseRing {
  0%   { transform: scale(1);    opacity: 0.5; }
  70%  { transform: scale(1.5);  opacity: 0;   }
  100% { transform: scale(1.5);  opacity: 0;   }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0);    }
}
@keyframes successPop {
  0%   { transform: scale(0.5) rotate(-10deg); opacity: 0; }
  60%  { transform: scale(1.15) rotate(3deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0deg);                 }
}
@keyframes tickDraw {
  from { stroke-dashoffset: 80; }
  to   { stroke-dashoffset: 0;  }
}
@keyframes float {
  0%, 100% { transform: translateY(0px);  }
  50%       { transform: translateY(-8px); }
}
@keyframes timerPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.97); }
}
@keyframes glowBreath {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.06); }
}
@keyframes confirmSlideUp {
  from { opacity: 0; transform: translateY(24px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes leaveCardIn {
  from { opacity: 0; transform: translateY(16px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes lockFloat {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-5px) scale(1.02); }
}
@keyframes particleFly {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}
@keyframes overlayFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes successIconIn {
  0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
  50%  { transform: scale(1.2) rotate(5deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0deg); }
}
@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.5); opacity: 0.7; }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
`;

/* ─── Particle Burst ─── */
const ParticleBurst = ({ active, color }) => {
  if (!active) return null;
  const particles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 360;
    const dist = 60 + Math.random() * 60;
    const tx = `${Math.cos((angle * Math.PI) / 180) * dist}px`;
    const ty = `${Math.sin((angle * Math.PI) / 180) * dist}px`;
    return { tx, ty, delay: Math.random() * 0.3, size: 4 + Math.random() * 6 };
  });

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20 }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: "50%", top: "50%",
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: color,
          "--tx": p.tx, "--ty": p.ty,
          animation: `particleFly 0.7s ${p.delay}s ease-out forwards`,
          transform: "translate(-50%, -50%)",
        }} />
      ))}
    </div>
  );
};

/* ─── Success Overlay ─── */
const SuccessOverlay = ({ msg, color, onDone }) => {
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);
  useEffect(() => {
    const t = setTimeout(() => onDoneRef.current(), 2400);
    return () => clearTimeout(t);
  }, []);

  const configs = {
    purple: { grad: "linear-gradient(135deg,#8b5cf6,#6d28d9)", glow: "rgba(139,92,246,0.25)", text: "#7c3aed" },
    green:  { grad: "linear-gradient(135deg,#10b981,#059669)", glow: "rgba(16,185,129,0.25)",  text: "#059669" },
    amber:  { grad: "linear-gradient(135deg,#f59e0b,#d97706)", glow: "rgba(245,158,11,0.25)",  text: "#b45309" },
    pink:   { grad: "linear-gradient(135deg,#ec4899,#db2777)", glow: "rgba(236,72,153,0.25)",  text: "#be185d" },
    red:    { grad: "linear-gradient(135deg,#f43f5e,#e11d48)", glow: "rgba(244,63,94,0.25)",   text: "#be123c" },
  };
  const cfg = configs[color] || configs.purple;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(12px)",
      animation: "overlayFadeIn 0.3s ease both",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 50%, ${cfg.glow} 0%, transparent 60%)`,
        animation: "glowBreath 1.5s ease-in-out infinite",
      }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          background: cfg.grad,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          animation: "successIconIn 0.5s cubic-bezier(.36,.07,.19,.97) both",
          boxShadow: `0 0 0 20px ${cfg.glow}, 0 0 0 40px ${cfg.glow.replace("0.25", "0.08")}`,
        }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <polyline points="12,30 25,43 48,18" stroke="#fff" strokeWidth="5.5"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="80" strokeDashoffset="80"
              style={{ animation: "tickDraw 0.5s 0.3s ease forwards" }} />
          </svg>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 28,
          color: "#1a1a2e", letterSpacing: "-1px", marginBottom: 8,
          animation: "fadeSlideUp 0.4s 0.35s ease both", opacity: 0,
          animationFillMode: "forwards",
        }}>
          {msg}
        </div>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontSize: 15, color: "rgba(0,0,0,0.45)",
          animation: "fadeSlideUp 0.4s 0.5s ease both", opacity: 0,
          animationFillMode: "forwards",
        }}>
          Logged successfully ✦
        </div>
      </div>
    </div>
  );
};

/* ─── Error Overlay ─── */
const ErrorOverlay = ({ msg, onDone }) => {
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);
  useEffect(() => {
    const t = setTimeout(() => onDoneRef.current(), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(12px)",
      animation: "overlayFadeIn 0.3s ease both",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 50%, rgba(244,63,94,0.25) 0%, transparent 60%)",
        animation: "glowBreath 1.5s ease-in-out infinite",
      }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          background: "linear-gradient(135deg,#f43f5e,#e11d48)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          animation: "shake 0.5s ease both",
          boxShadow: "0 0 0 20px rgba(244,63,94,0.25), 0 0 0 40px rgba(244,63,94,0.08)",
        }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="20" stroke="#fff" strokeWidth="2.5" />
            <path d="M30 20v20M20 30h20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 28,
          color: "#1a1a2e", letterSpacing: "-1px", marginBottom: 8,
          animation: "fadeSlideUp 0.4s 0.35s ease both", opacity: 0,
          animationFillMode: "forwards",
        }}>
          {msg}
        </div>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontSize: 15, color: "rgba(0,0,0,0.45)",
          animation: "fadeSlideUp 0.4s 0.5s ease both", opacity: 0,
          animationFillMode: "forwards",
        }}>
          Please try again ✦
        </div>
      </div>
    </div>
  );
};

/* ─── Hold Confirmation Popup (Smooth Circle Animation) ─── */
const HoldConfirmPopup = ({ type, onConfirm, onRelease, onCancel, progress, isHolding }) => {
  const isPunchIn = type === "in";
  const BUTTON_SIZE = 160;
  const RING_SIZE = BUTTON_SIZE + 40;
  const RING_RADIUS = (RING_SIZE / 2) - 6;
  const CIRC = 2 * Math.PI * RING_RADIUS;
  
  const c = RING_SIZE / 2;
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const offset = CIRC * (1 - clampedProgress);
  
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(12px)",
      animation: "overlayFadeIn 0.2s ease both",
    }} onClick={onCancel}>
      <div style={{
        position: "relative",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        animation: "confirmSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
      }} onClick={e => e.stopPropagation()}>
        
        {/* Main Button Container with Ring */}
        <div style={{
          position: "relative",
          width: BUTTON_SIZE + 40,
          height: BUTTON_SIZE + 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Animated Ring */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: RING_SIZE,
              height: RING_SIZE,
              pointerEvents: "none",
              zIndex: 10,
              transform: "rotate(-90deg)",
            }}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          >
            <circle 
              cx={c} cy={c} r={RING_RADIUS} fill="none"
              stroke={isPunchIn ? "rgba(139,92,246,0.2)" : "rgba(16,185,129,0.2)"}
              strokeWidth="6"
            />
            <circle 
              cx={c} cy={c} r={RING_RADIUS} fill="none"
              stroke={isPunchIn ? "#8b5cf6" : "#10b981"}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
              style={{
                filter: `drop-shadow(0 0 8px ${isPunchIn ? "rgba(139,92,246,0.6)" : "rgba(16,185,129,0.6)"})`,
              }}
            />
          </svg>
          
          {/* Center Button - Hold to activate */}
          <div
            onMouseDown={onConfirm}
            onTouchStart={onConfirm}
            onMouseUp={onRelease}     
            onTouchEnd={onRelease}    
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              onRelease();            
            }}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              borderRadius: "50%",
              background: isPunchIn 
                ? "linear-gradient(135deg,#8b5cf6,#6d28d9)"
                : "linear-gradient(135deg,#10b981,#059669)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              color: "#fff",
              boxShadow: `0 0 40px ${isPunchIn ? "rgba(139,92,246,0.5)" : "rgba(16,185,129,0.5)"}`,
              cursor: "pointer",
              transition: "transform 0.1s ease",
              zIndex: 20,
              position: "relative",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {isPunchIn ? (
                <>
                  <path d="M12 10a2 2 0 0 0-2 2c0 1.02.408 1.967 1.083 2.667" />
                  <path d="M12 6a6 6 0 0 1 6 6c0 1.993-.5 3.864-1.38 5.5" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 2.21.716 4.255 1.927 5.91" />
                  <path d="M5 15.7A10 10 0 0 1 2 12a10 10 0 0 1 3.5-7.55" />
                  <path d="M12 14c0 2.5-1.5 6-1.5 6" />
                  <path d="M15.5 15.5c-.67 1.5-1.5 3.5-1.5 5.5" />
                  <path d="M9 17.5c-.33.67-.5 1.5-.5 2.5" />
                  <path d="M12 18a2 2 0 0 0 2-2" />
                </>
              ) : (
                <>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </>
              )}
            </svg>
            
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, marginTop: 8 }}>
              {isPunchIn ? "Hold to Punch In" : "Hold to Punch Out"}
            </div>
            
            {/* Progress Percentage Text */}
            {isHolding && (
              <div style={{
                position: "absolute",
                bottom: -30,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                fontSize: 12,
                color: isPunchIn ? "#a78bfa" : "#34d399",
                background: "rgba(0,0,0,0.6)",
                padding: "4px 10px",
                borderRadius: 20,
                backdropFilter: "blur(4px)",
                whiteSpace: "nowrap",
              }}>
                {Math.floor(clampedProgress * 100)}%
              </div>
            )}
          </div>
        </div>
        
        {/* Instruction Text (Cancel Button Removed Here) */}
        <div style={{
          marginTop: 40,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 500,
          fontSize: 14,
          color: "rgba(255,255,255,0.9)",
          textAlign: "center",
          background: "rgba(0,0,0,0.5)",
          padding: "10px 20px",
          borderRadius: 40,
          backdropFilter: "blur(8px)",
          letterSpacing: "0.3px",
        }}>
          Press and hold the button above<br/>
          <span style={{ fontSize: 12, opacity: 0.7 }}>Release early or tap outside to cancel</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Stat Card ─── */
const StatCard = ({ icon, label, value, color, delay = 0 }) => (
  <div style={{
    flex: 1, padding: "14px 12px", borderRadius: 16,
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    textAlign: "center",
    animation: `leaveCardIn 0.5s ${delay}s ease both`,
    animationFillMode: "backwards",
    transition: "all 0.25s",
  }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}>
    <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color, marginBottom: 2 }}>{value}</div>
    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
  </div>
);

/* ─── Modal ─── */
const Modal = ({ open, onClose, title, titleColor, children, confirmLabel, confirmColor, onConfirm }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 8000,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)",
      animation: "overlayFadeIn 0.2s ease both",
    }} onClick={onClose}>
      <div style={{
        background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 20, padding: "28px 28px 24px", maxWidth: 340, width: "90%",
        animation: "confirmSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: titleColor, marginBottom: 16 }}>{title}</div>
        {children}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)",
            background: "transparent", color: "rgba(0,0,0,0.45)",
            fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{
            flex: 1.5, padding: "12px", borderRadius: 12, border: "none",
            background: confirmColor, color: "#fff",
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"; }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── BREAK TAB ─── */
const BreakTab = ({ 
  time, 
  punchedIn, 
  isOnBreak, 
  onBreakStateChange, 
  onGoToCheck,
  breakStart,
  setBreakStart,
  breakHistory,
  setBreakHistory
}) => {
  const [elapsed, setElapsed] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMsg, setOverlayMsg] = useState("");
  const [overlayColor, setOverlayColor] = useState("amber");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState("start");
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!punchedIn) { 
      setBreakStart(null); 
      setElapsed(0); 
      if (isOnBreak) {
        onBreakStateChange(false);
      }
    }
  }, [punchedIn, isOnBreak, onBreakStateChange, setBreakStart]);

  useEffect(() => {
    let interval;
    if (isOnBreak && breakStart) {
      setElapsed(Math.floor((Date.now() - breakStart) / 1000));
      interval = setInterval(() => setElapsed(Math.floor((Date.now() - breakStart) / 1000)), 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isOnBreak, breakStart]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const confirm = async () => {
    setOpenDialog(false);
    const currentUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('currentUser') || '{}') : {};
    const employeeId = currentUser.employeeId || 'ADM-0001';
    const employeeName = currentUser.name || 'Super Admin';
    const breakType = dialogAction === "start" ? "break" : "resume";

    try {
      fetch('/api/attendance/punch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId,
          employeeName,
          type: breakType,
          breakNote: dialogAction === "start" ? "Took a break" : "Returned from break"
        })
      }).catch(console.error);

      if (dialogAction === "start") {
        const startTime = Date.now();
        setBreakStart(startTime);
        setElapsed(0);
        onBreakStateChange(true);
        setOverlayMsg("Break Started");
        setOverlayColor("amber");
      } else {
        setBreakHistory([...breakHistory, { start: breakStart, duration: elapsed }]);
        setBreakStart(null);
        setElapsed(0);
        onBreakStateChange(false);
        setOverlayMsg("Break Ended");
        setOverlayColor("green");
      }
      setBurst(true);
      setTimeout(() => setBurst(false), 800);
      setShowOverlay(true);
    } catch (err) {
      console.error(err);
    }
  };

  const breakTypes = [
    { label: "Tea Break", icon: "☕", max: 15, color: "#d97706" },
    { label: "Lunch",     icon: "🍽️", max: 60, color: "#ea580c" },
    { label: "Personal",  icon: "🚶", max: 30, color: "#4f46e5" },
  ];

  if (!punchedIn) return (
    <div style={{ animation: "fadeSlideIn 0.4s ease both" }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 20, padding: "48px 24px", background: "rgba(0,0,0,0.02)",
        borderRadius: 20, border: "1.5px dashed rgba(0,0,0,0.1)", textAlign: "center",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, animation: "lockFloat 3s ease-in-out infinite",
        }}>🔒</div>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#1a1a2e", marginBottom: 8 }}>Break Unavailable</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, color: "rgba(0,0,0,0.45)", lineHeight: 1.7, maxWidth: 260 }}>
            You must check in before you can start a break.
          </div>
        </div>
        <button onClick={onGoToCheck} style={{
          padding: "12px 28px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
          color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
          cursor: "pointer", boxShadow: "0 8px 20px rgba(109,40,217,0.3)",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(109,40,217,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(109,40,217,0.3)"; }}>
          Go to Check In ↗
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ animation: "fadeSlideIn 0.4s ease both" }}>
      {showOverlay && <SuccessOverlay msg={overlayMsg} color={overlayColor} onDone={() => setShowOverlay(false)} />}

      <div style={{ display: "flex", gap: 10, marginBottom: 28, justifyContent: "center" }}>
        {breakTypes.map((b, i) => (
          <div key={b.label} style={{
            flex: 1, padding: "14px 8px", borderRadius: 14, textAlign: "center", cursor: "pointer",
            border: `1px solid rgba(0,0,0,0.08)`, background: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            animation: `leaveCardIn 0.4s ${i * 0.08}s ease both`, animationFillMode: "backwards",
            transition: "all 0.25s",
            opacity: isOnBreak ? 0.5 : 1,
            pointerEvents: isOnBreak ? "none" : "auto",
          }}
            onMouseEnter={e => { 
              if (!isOnBreak) {
                e.currentTarget.style.borderColor = b.color + "80"; 
                e.currentTarget.style.background = b.color + "10"; 
                e.currentTarget.style.transform = "translateY(-3px)"; 
                e.currentTarget.style.boxShadow = `0 6px 20px ${b.color}20`; 
              }
            }}
            onMouseLeave={e => { 
              if (!isOnBreak) {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; 
                e.currentTarget.style.background = "#ffffff"; 
                e.currentTarget.style.transform = "translateY(0)"; 
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; 
              }
            }}>
            <div style={{ fontSize: 24 }}>{b.icon}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(0,0,0,0.65)", marginTop: 4 }}>{b.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: b.color }}>Max {b.max}m</div>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto 12px" }}>
        <ParticleBurst active={burst} color={isOnBreak ? "#10b981" : "#f59e0b"} />
        <div onClick={() => { if (punchedIn) { setDialogAction(isOnBreak ? "end" : "start"); setOpenDialog(true); } }} style={{
          width: "100%", height: "100%", borderRadius: "50%",
          background: isOnBreak ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#fbbf24,#f59e0b)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          alignItems: "center", color: "#fff", cursor: punchedIn ? "pointer" : "default",
          boxShadow: isOnBreak ? "0 0 32px 8px rgba(16,185,129,0.2), 0 16px 40px rgba(0,0,0,0.12)" : "0 16px 40px rgba(0,0,0,0.12)",
          animation: isOnBreak ? "float 3.5s ease-in-out infinite, breakGlow 2.5s ease-in-out infinite" : "float 3.5s ease-in-out infinite",
          transition: "all 0.4s", position: "relative", zIndex: 2,
          userSelect: "none",
        }}>
          <div style={{ fontSize: isOnBreak ? 44 : 48, lineHeight: 1 }}>
            {isOnBreak ? "🟢" : "☕"}
          </div>
          {isOnBreak
            ? <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 22, animation: "timerPulse 1.5s ease-in-out infinite", marginTop: 4 }}>{fmt(elapsed)}</div>
            : <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginTop: 4 }}>Start Break</div>
          }
        </div>
      </div>

      <div style={{
        display: "inline-block", marginBottom: 24, padding: "5px 14px", borderRadius: 20,
        background: isOnBreak ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
        color: isOnBreak ? "#059669" : "#b45309",
        fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13,
        border: `1px solid ${isOnBreak ? "rgba(16,185,129,0.25)" : "rgba(217,119,6,0.25)"}`,
      }}>
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: isOnBreak ? "#10b981" : "#f59e0b", marginRight: 6, verticalAlign: "middle", animation: "dotPulse 1.5s ease-in-out infinite" }} />
        {isOnBreak ? "On Break" : "Not on Break"}
      </div>

      {breakHistory.length > 0 && (
        <div style={{ background: "#ffffff", borderRadius: 14, padding: 16, textAlign: "left", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: "rgba(0,0,0,0.35)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Today&apos;s Breaks</div>
          {breakHistory.map((b, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < breakHistory.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", animation: "slideDown 0.3s ease both" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(0,0,0,0.55)" }}>{new Date(b.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              <div style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(16,185,129,0.1)", color: "#059669", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 12, border: "1px solid rgba(16,185,129,0.2)" }}>{fmt(b.duration)}</div>
            </div>
          ))}
        </div>
      )}

      <Modal open={openDialog} onClose={() => setOpenDialog(false)}
        title={dialogAction === "start" ? "Start Break?" : "End Break?"}
        titleColor={isOnBreak ? "#059669" : "#b45309"}
        confirmLabel={dialogAction === "start" ? "Start Break" : "End Break"}
        confirmColor={isOnBreak ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#f59e0b,#d97706)"}
        onConfirm={confirm}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
            <span>🕐</span>
            <span>Time: <strong style={{ color: "rgba(0,0,0,0.75)" }}>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</strong></span>
          </div>
          {isOnBreak && <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
            <span>⏱️</span>
            <span>Duration so far: <strong style={{ color: "#059669" }}>{fmt(elapsed)}</strong></span>
          </div>}
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: isOnBreak ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)", color: isOnBreak ? "#059669" : "#b45309", fontWeight: 600, border: isOnBreak ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(217,119,6,0.2)" }}>
            {dialogAction === "start" ? "You are about to start a break." : "You are about to end your break."}
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ─── LEAVE TAB ─── */
const LeaveTab = ({ time, appliedLeaves, setAppliedLeaves }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [burst, setBurst] = useState(false);

  const leaveTypes = [
    { label: "Sick Leave",   icon: "🤒", color: "#e11d48", bg: "rgba(244,63,94,0.08)",  border: "rgba(225,29,72,0.2)",  available: 3,  total: 8  },
    { label: "Casual Leave", icon: "🏖️", color: "#2563eb", bg: "rgba(59,130,246,0.08)", border: "rgba(37,99,235,0.2)", available: 5,  total: 12 },
    { label: "Earned Leave", icon: "⭐", color: "#7c3aed", bg: "rgba(139,92,246,0.08)", border: "rgba(124,58,237,0.2)", available: 8,  total: 15 },
    { label: "Half Day",     icon: "🌗", color: "#be185d", bg: "rgba(236,72,153,0.08)", border: "rgba(190,24,93,0.2)",  available: 2,  total: 4  },
  ];

  const confirm = () => {
    onClose();
    setAppliedLeaves([...appliedLeaves, { type: selectedLeave, date: selectedDate, appliedAt: new Date() }]);
    setBurst(true);
    setTimeout(() => setBurst(false), 800);
    setShowOverlay(true);
    setSelectedLeave(null);
  };

  const onClose = () => setOpenDialog(false);
  const sl = leaveTypes.find(x => x.label === selectedLeave);

  return (
    <div style={{ animation: "fadeSlideIn 0.4s ease both" }}>
      {showOverlay && <SuccessOverlay msg="Leave Applied" color="pink" onDone={() => setShowOverlay(false)} />}

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {leaveTypes.slice(0, 3).map((l, i) => (
          <div key={l.label} style={{
            flex: 1, padding: "12px 8px", borderRadius: 14, textAlign: "center",
            background: l.bg, border: `1px solid ${l.border}`,
            animation: `leaveCardIn 0.4s ${i * 0.08}s ease both`, animationFillMode: "backwards",
          }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{l.icon}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 20, color: l.color }}>{l.available}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: 0.5 }}>{l.label.split(" ")[0]}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(0,0,0,0.35)", marginBottom: 12, textAlign: "left", textTransform: "uppercase", letterSpacing: 1.5 }}>Select Leave Type</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {leaveTypes.map((l, i) => (
          <div key={l.label} onClick={() => setSelectedLeave(l.label)} style={{
            padding: "14px", borderRadius: 14, cursor: "pointer",
            border: selectedLeave === l.label ? `2px solid ${l.color}` : "1px solid rgba(0,0,0,0.08)",
            background: selectedLeave === l.label ? l.bg : "#ffffff",
            boxShadow: selectedLeave === l.label ? `0 0 16px ${l.color}20` : "0 2px 8px rgba(0,0,0,0.04)",
            animation: `leaveCardIn 0.4s ${i * 0.08}s ease both`, animationFillMode: "backwards",
            transition: "all 0.25s",
          }}
            onMouseEnter={e => { if (selectedLeave !== l.label) { e.currentTarget.style.borderColor = l.color + "60"; e.currentTarget.style.background = l.bg; } }}
            onMouseLeave={e => { if (selectedLeave !== l.label) { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.background = "#ffffff"; } }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>{l.icon}</span>
              {selectedLeave === l.label && <div style={{ width: 18, height: 18, borderRadius: "50%", background: l.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="2,5.5 4,8 8,2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>}
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#1a1a2e", marginBottom: 6 }}>{l.label}</div>
            <div style={{ height: 3, borderRadius: 4, background: "rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: 4 }}>
              <div style={{ height: "100%", borderRadius: 4, background: l.color, width: `${(l.available / l.total) * 100}%`, transition: "width 1.2s ease" }} />
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(0,0,0,0.35)" }}>{l.available}/{l.total} remaining</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20, textAlign: "left" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(0,0,0,0.35)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1.5 }}>Date</div>
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.12)", background: "#ffffff",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#1a1a2e",
          outline: "none",
        }} />
      </div>

      <button onClick={() => { if (selectedLeave) setOpenDialog(true); }} style={{
        width: "100%", padding: "15px", borderRadius: 14, border: "none",
        background: selectedLeave ? `linear-gradient(135deg, ${sl?.color}, ${sl?.color}cc)` : "rgba(0,0,0,0.06)",
        color: selectedLeave ? "#fff" : "rgba(0,0,0,0.3)",
        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
        cursor: selectedLeave ? "pointer" : "default",
        boxShadow: selectedLeave ? `0 8px 20px ${sl?.color}30` : "none",
        transition: "all 0.35s", marginBottom: 20,
        position: "relative", overflow: "hidden",
      }}
        onMouseEnter={e => { if (selectedLeave) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 14px 28px ${sl?.color}40`; } }}
        onMouseLeave={e => { if (selectedLeave) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 20px ${sl?.color}30`; } }}>
        {selectedLeave ? `Apply ${selectedLeave}` : "Select a Leave Type"}
      </button>

      {appliedLeaves.length > 0 && (
        <div style={{ background: "#ffffff", borderRadius: 14, padding: 16, textAlign: "left", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(0,0,0,0.35)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1.5 }}>Applied Leaves</div>
          {appliedLeaves.map((a, i) => {
            const l = leaveTypes.find(x => x.label === a.type);
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < appliedLeaves.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", animation: "slideDown 0.3s ease both" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{l?.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>{a.type}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(0,0,0,0.35)" }}>{a.date}</div>
                  </div>
                </div>
                <div style={{ padding: "4px 12px", borderRadius: 20, background: l?.bg, color: l?.color, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 11, border: `1px solid ${l?.border}` }}>Pending</div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={openDialog} onClose={onClose}
        title="Confirm Leave Request"
        titleColor={sl?.color}
        confirmLabel="Apply Leave"
        confirmColor={`linear-gradient(135deg,${sl?.color},${sl?.color}cc)`}
        onConfirm={confirm}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
            <span>{sl?.icon}</span>
            <span>Type: <strong style={{ color: sl?.color }}>{selectedLeave}</strong></span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
            <span>📅</span>
            <span>Date: <strong style={{ color: "rgba(0,0,0,0.75)" }}>{selectedDate}</strong></span>
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: sl?.bg, color: sl?.color, fontWeight: 600, border: `1px solid ${sl?.border}` }}>
            Submit leave request for approval?
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ─── MAIN PUNCH PAGE ─── */
const PunchPage = ({ compact = false, onSuccess }) => {
  const [time, setTime] = useState(new Date());
  const [punchedIn, setPunchedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [successColor, setSuccessColor] = useState("purple");
  const [showOverlay, setShowOverlay] = useState(false);
  const [showErrorOverlay, setShowErrorOverlay] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("Check");
  
  // Lifted & Session Persisted Tab States
  const [breakStart, setBreakStart] = useState(null);
  const [breakHistory, setBreakHistory] = useState([]);
  const [appliedLeaves, setAppliedLeaves] = useState([]);
  
  // Hold confirmation popup state
  const [showHoldPopup, setShowHoldPopup] = useState(false);
  const [pendingType, setPendingType] = useState("in");
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  
  // Work duration tracking
  const [checkInTime, setCheckInTime] = useState(null);
  const [workDuration, setWorkDuration] = useState(0);
  
  // Refs for hold animation
  const holdStartRef = useRef(null);
  const holdAnimationRef = useRef(null);
  const HOLD_DURATION = 2500;

  // 1. Hook to load saved states on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPunchedIn = localStorage.getItem("punchedIn") === "true";
      const savedIsOnBreak = localStorage.getItem("isOnBreak") === "true";
      const savedCheckInTime = localStorage.getItem("checkInTime");
      const savedBreakStart = localStorage.getItem("breakStart");
      const savedBreakHistory = localStorage.getItem("breakHistory");
      const savedAppliedLeaves = localStorage.getItem("appliedLeaves");

      if (savedPunchedIn) setPunchedIn(savedPunchedIn);
      if (savedIsOnBreak) setIsOnBreak(savedIsOnBreak);
      if (savedCheckInTime) setCheckInTime(Number(savedCheckInTime));
      if (savedBreakStart) setBreakStart(Number(savedBreakStart));
      if (savedBreakHistory) setBreakHistory(JSON.parse(savedBreakHistory));
      if (savedAppliedLeaves) setAppliedLeaves(JSON.parse(savedAppliedLeaves));
    }
  }, []);

  // 2. Hook to synchronize state updates directly to browser LocalStorage
  useEffect(() => {
    localStorage.setItem("punchedIn", punchedIn);
    localStorage.setItem("isOnBreak", isOnBreak);
    localStorage.setItem("checkInTime", checkInTime || "");
    localStorage.setItem("breakStart", breakStart || "");
    localStorage.setItem("breakHistory", JSON.stringify(breakHistory));
    localStorage.setItem("appliedLeaves", JSON.stringify(appliedLeaves));
  }, [punchedIn, isOnBreak, checkInTime, breakStart, breakHistory, appliedLeaves]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (punchedIn && checkInTime && !isOnBreak) {
      interval = setInterval(() => setWorkDuration(Math.floor((Date.now() - checkInTime) / 1000)), 1000);
    }
    return () => clearInterval(interval);
  }, [punchedIn, checkInTime, isOnBreak]);

  const fmtDuration = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0
      ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const triggerSuccess = useCallback(async (type) => {
    const currentUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('currentUser') || '{}') : {};
    const employeeId = currentUser.employeeId || 'ADM-0001';
    const employeeName = currentUser.name || 'Super Admin';

    const verifyAndPunch = async (coords = null) => {
      try {
        const res = await fetch('/api/attendance/punch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employeeId,
            employeeName,
            type,
            coords
          })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        // Save resolved location in localStorage so the parent component can pick it up
        if (type === "in") {
          localStorage.setItem('last_punch_location_in', data.record.locationIn || 'Office');
          setSuccessMsg("Punched In");
          setSuccessColor("purple");
          setPunchedIn(true);
          setCheckInTime(Date.now());
          setWorkDuration(0);
          setIsOnBreak(false);
        } else {
          localStorage.setItem('last_punch_location_out', data.record.locationOut || 'Office');
          setSuccessMsg("Punched Out");
          setSuccessColor("green");
          setPunchedIn(false);
          setCheckInTime(null);
          setIsOnBreak(false);
          setBreakStart(null);
        }
        setShowOverlay(true);
        return true;
      } catch (err) {
        console.error(err);
        triggerError(err.message || 'Verification failed');
        return false;
      }
    };

    if (type === "in") {
      if (!navigator.geolocation) {
        triggerError("Geolocation is not supported by your browser");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          await verifyAndPunch(coords);
        },
        (error) => {
          console.error(error);
          triggerError("Location access is required to verify you are on office premises.");
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            await verifyAndPunch(coords);
          },
          async () => {
            await verifyAndPunch(null);
          },
          { enableHighAccuracy: true, timeout: 4000 }
        );
      } else {
        await verifyAndPunch(null);
      }
    }
  }, [triggerError]);

  const triggerError = useCallback((msg) => {
    setErrorMsg(msg);
    setShowErrorOverlay(true);
  }, []);

  const startHold = useCallback((type, event) => {
    if (event) event.preventDefault();
    
    if (type === "in") {
      if (punchedIn) {
        triggerError("You are already punched in!");
        return;
      }
      if (isOnBreak) {
        triggerError("End your break before punching in!");
        return;
      }
    } else {
      if (!punchedIn) {
        triggerError("You are not punched in!");
        return;
      }
      if (isOnBreak) {
        triggerError("End your break before punching out!");
        return;
      }
    }
    
    setPendingType(type);
    setHoldProgress(0);
    setIsHolding(true);
    holdStartRef.current = performance.now();
    
    const animate = (now) => {
      const elapsed = now - holdStartRef.current;
      const progress = Math.min(elapsed / HOLD_DURATION, 1);
      setHoldProgress(progress);
      
      if (progress < 1) {
        holdAnimationRef.current = requestAnimationFrame(animate);
      } else {
        setIsHolding(false);
        // Small delay to visually complete the circle before snapping shut
        setTimeout(() => {
            setShowHoldPopup(false);
            setHoldProgress(0);
            triggerSuccess(type);
        }, 150);
        holdAnimationRef.current = null;
      }
    };
    
    holdAnimationRef.current = requestAnimationFrame(animate);
  }, [punchedIn, isOnBreak, triggerSuccess, triggerError]);
  
  const stopHold = useCallback(() => {
    if (holdAnimationRef.current) {
      cancelAnimationFrame(holdAnimationRef.current);
      holdAnimationRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
  }, []);

  const cancelHold = useCallback(() => {
    stopHold();
    setShowHoldPopup(false);
  }, [stopHold]);

  useEffect(() => {
    return () => {
      if (holdAnimationRef.current) {
        cancelAnimationFrame(holdAnimationRef.current);
      }
    };
  }, []);

  const tabs = ["Break", "Check", "Leave"];
  const tabColors = {
    Break: { bg: "#f59e0b", text: "#fff" },
    Check: { bg: "#8b5cf6", text: "#fff" },
    Leave: { bg: "#ec4899", text: "#fff" },
  };

  const hours = new Date().getHours();
  const greeting = hours < 12 ? "Good Morning" : hours < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <>
      <style>{styleTag}</style>
      
      {/* Hold Confirmation Popup */}
      {showHoldPopup && (
        <HoldConfirmPopup 
          type={pendingType} 
          onConfirm={(e) => startHold(pendingType, e)}
          onRelease={stopHold}
          onCancel={cancelHold}
          progress={holdProgress}
          isHolding={isHolding}
        />
      )}
      
      {showOverlay && (
        <SuccessOverlay 
          msg={successMsg} 
          color={successColor} 
          onDone={() => { 
            setShowOverlay(false); 
            setSuccessMsg(""); 
            if (onSuccess) {
              onSuccess(pendingType);
            }
          }} 
        />
      )}
      {showErrorOverlay && <ErrorOverlay msg={errorMsg} onDone={() => { setShowErrorOverlay(false); setErrorMsg(""); }} />}

      <div style={{
        height: "100vh",
        background: "linear-gradient(150deg, #f5f3ff 0%, #eff6ff 40%, #f0fdf4 100%)",
        padding: "0",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "fixed", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", pointerEvents: "none", animation: "glowBreath 6s ease-in-out infinite" }} />
        <div style={{ position: "fixed", bottom: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", pointerEvents: "none", animation: "glowBreath 7s 2s ease-in-out infinite" }} />

        <div style={{ maxWidth: compact ? 360 : 420, margin: "0 auto", padding: compact ? "12px 10px 16px" : "24px 20px 40px", textAlign: "center", animation: "fadeSlideUp 0.5s ease both", position: "relative", zIndex: 1, height: compact ? "auto" : "100%", overflowY: "auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: "rgba(0,0,0,0.35)", marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>{greeting}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#1a1a2e", letterSpacing: "-0.5px" }}>
              Attendance Portal
            </div>
          </div>

          {/* Tab bar */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            background: "rgba(0,0,0,0.04)", padding: 5, borderRadius: 18,
            marginBottom: 28, border: "1px solid rgba(0,0,0,0.07)",
          }}>
            {tabs.map((label) => {
              const active = activeTab === label;
              const col = tabColors[label];
              return (
                <button key={label} onClick={() => { cancelHold(); setActiveTab(label); }} style={{
                  flex: 1, borderRadius: 13, padding: "10px 8px", border: "none",
                  background: active ? col.bg : "transparent",
                  color: active ? col.text : "rgba(0,0,0,0.4)",
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", transition: "all 0.3s",
                  boxShadow: active ? `0 4px 12px ${col.bg}50` : "none",
                }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(0,0,0,0.65)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(0,0,0,0.4)"; }}>
                  {label}
                </button>
              );
            })}
          </div>

          {/* ── CHECK TAB ── */}
          {activeTab === "Check" && (
            <div style={{ animation: "fadeSlideIn 0.4s ease both" }}>
              {/* Clock Card */}
              <div style={{
                background: "#ffffff", borderRadius: 20, padding: "20px 24px",
                marginBottom: 24, border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 48, color: "#1a1a2e", letterSpacing: -2, lineHeight: 1 }}>
                  {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: "rgba(0,0,0,0.4)", marginTop: 4 }}>
                  {time.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </div>
                <div style={{ marginTop: 16, height: 2, borderRadius: 4, background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 4,
                    background: punchedIn ? "linear-gradient(90deg,#10b981,#059669)" : "linear-gradient(90deg,#8b5cf6,#6d28d9)",
                    width: `${(time.getSeconds() / 60) * 100}%`,
                    transition: "width 0.5s ease",
                  }} />
                </div>
              </div>

              {/* Stats Row */}
              {punchedIn && !isOnBreak && (
                <div style={{ display: "flex", gap: 10, marginBottom: 24, animation: "slideDown 0.4s ease both" }}>
                  <StatCard icon="⏱️" label="Work Time" value={fmtDuration(workDuration)} color="#7c3aed" delay={0} />
                  <StatCard icon="📍" label="Status" value="Active" color="#059669" delay={0.08} />
                  <StatCard icon="✅" label="Today" value="On Time" color="#d97706" delay={0.16} />
                </div>
              )}

              {/* Break Alert */}
              {isOnBreak && (
                <div style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 24,
                  animation: "slideDown 0.4s ease both",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    color: "#059669",
                    fontSize: 14,
                  }}>
                    <span style={{ fontSize: 20 }}>⏸️</span>
                    <span>You are on a break. End your break to punch out.</span>
                  </div>
                </div>
              )}

              {/* Main Interactive Action Button */}
              <div style={{ 
                display: "flex", 
                justifyContent: "center",
                marginBottom: 20
              }}>
                <button
                  onClick={() => {
                    if (punchedIn && isOnBreak) {
                      triggerError("End your break before punching out!");
                      return;
                    }
                    setPendingType(punchedIn ? "out" : "in");
                    setShowHoldPopup(true);
                    setHoldProgress(0);
                    setIsHolding(false);
                  }}
                  style={{
                    width: 180,
                    padding: "18px 24px",
                    borderRadius: 60,
                    border: "none",
                    background: punchedIn 
                      ? "linear-gradient(135deg,#10b981,#059669)"
                      : "linear-gradient(135deg,#8b5cf6,#6d28d9)",
                    color: "#fff",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: (punchedIn && isOnBreak) ? "not-allowed" : "pointer",
                    boxShadow: `0 8px 24px ${punchedIn ? "rgba(16,185,129,0.4)" : "rgba(139,92,246,0.4)"}`,
                    transition: "all 0.3s ease",
                    opacity: (punchedIn && isOnBreak) ? 0.6 : 1,
                  }}
                  onMouseEnter={e => {
                    if (!punchedIn || !isOnBreak) {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 14px 32px ${punchedIn ? "rgba(16,185,129,0.5)" : "rgba(139,92,246,0.5)"}`;
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${punchedIn ? "rgba(16,185,129,0.4)" : "rgba(139,92,246,0.4)"}`;
                  }}
                >
                  {punchedIn ? "Punch Out" : "Punch In"}
                </button>
              </div>

              {/* Status Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20,
                padding: "6px 16px", borderRadius: 20,
                background: punchedIn ? "rgba(16,185,129,0.09)" : "rgba(245,158,11,0.09)",
                color: punchedIn ? "#059669" : "#b45309",
                fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13,
                border: punchedIn ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(217,119,6,0.2)",
              }}>
                <span style={{
                  display: "inline-block", width: 7, height: 7, borderRadius: "50%",
                  background: punchedIn ? "#059669" : "#d97706",
                  animation: "dotPulse 1.5s ease-in-out infinite",
                }} />
                {punchedIn ? "Currently Checked In" : "Not Checked In"}
              </div>

              {/* Info Banner */}
              <div style={{
                background: "rgba(139,92,246,0.06)", padding: "12px 16px", borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                border: "1px solid rgba(139,92,246,0.15)",
              }}>
                <span style={{ fontSize: 16 }}>⏰</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#7c3aed", fontSize: 13 }}>
                  {punchedIn 
                    ? `Checked in at ${checkInTime ? new Date(checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"} ✓` 
                    : "Click 'Punch In' to start your work day"}
                </span>
              </div>
            </div>
          )}

          {activeTab === "Break" && (
            <BreakTab 
              time={time} 
              punchedIn={punchedIn} 
              isOnBreak={isOnBreak} 
              onBreakStateChange={setIsOnBreak}
              onGoToCheck={() => setActiveTab("Check")}
              breakStart={breakStart}
              setBreakStart={setBreakStart}
              breakHistory={breakHistory}
              setBreakHistory={setBreakHistory}
            />
          )}
          
          {activeTab === "Leave" && (
            <LeaveTab 
              time={time} 
              appliedLeaves={appliedLeaves}
              setAppliedLeaves={setAppliedLeaves}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PunchPage;