"use client"
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEED = [
  { id: 1, name: "Priya Sharma", email: "priya.sharma@gmail.com", phone: "+91 98765 43210", role: "Frontend Engineer", dept: "Engineering", exp: "3 yrs", location: "Bengaluru", status: "shortlisted", score: 87, appliedAt: "Apr 18, 2026", resumeName: "priya_sharma_resume.pdf", tags: ["React", "TypeScript", "Next.js"], avatar: "PS", color: "#6366f1" },
  { id: 2, name: "Arjun Mehta", email: "arjun.mehta@outlook.com", phone: "+91 91234 56789", role: "Product Manager", dept: "Product", exp: "5 yrs", location: "Mumbai", status: "under_review", score: 74, appliedAt: "Apr 17, 2026", resumeName: "arjun_mehta_cv.pdf", tags: ["Agile", "Roadmapping", "SQL"], avatar: "AM", color: "#0891b2" },
  { id: 3, name: "Sneha Reddy", email: "sneha.r@yahoo.com", phone: "+91 88990 11223", role: "Data Scientist", dept: "Analytics", exp: "2 yrs", location: "Hyderabad", status: "interview", score: 91, appliedAt: "Apr 16, 2026", resumeName: "sneha_reddy_resume.pdf", tags: ["Python", "ML", "SQL", "Pandas"], avatar: "SR", color: "#059669" },
  { id: 4, name: "Rahul Gupta", email: "rahulg@gmail.com", phone: "+91 99887 76655", role: "Backend Engineer", dept: "Engineering", exp: "4 yrs", location: "Delhi", status: "new", score: 68, appliedAt: "Apr 19, 2026", resumeName: "rahul_gupta_cv.pdf", tags: ["Node.js", "PostgreSQL", "Express"], avatar: "RG", color: "#b45309" },
  { id: 5, name: "Kavya Nair", email: "kavya.nair@gmail.com", phone: "+91 90012 34567", role: "UI/UX Designer", dept: "Design", exp: "3 yrs", location: "Kochi", status: "rejected", score: 55, appliedAt: "Apr 12, 2026", resumeName: "kavya_nair_portfolio.pdf", tags: ["Figma", "Prototyping", "Wireframing"], avatar: "KN", color: "#e94560" },
  { id: 6, name: "Rohan Das", email: "rohan.das@proton.me", phone: "+91 77665 44332", role: "DevOps Engineer", dept: "Engineering", exp: "6 yrs", location: "Pune", status: "hired", score: 95, appliedAt: "Apr 10, 2026", resumeName: "rohan_das_resume.pdf", tags: ["AWS", "Docker", "Kubernetes", "CI/CD"], avatar: "RD", color: "#7c3aed" },
  { id: 7, name: "Ananya Singh", email: "ananya.s@gmail.com", phone: "+91 85214 73698", role: "Frontend Engineer", dept: "Engineering", exp: "1 yr", location: "Remote", status: "new", score: 72, appliedAt: "Apr 20, 2026", resumeName: "ananya_singh_cv.pdf", tags: ["Vue", "CSS", "JavaScript"], avatar: "AS", color: "#0f766e" },
  { id: 8, name: "Vikram Joshi", email: "vikram.j@corp.com", phone: "+91 98102 63748", role: "Data Scientist", dept: "Analytics", exp: "7 yrs", location: "Bengaluru", status: "shortlisted", score: 83, appliedAt: "Apr 15, 2026", resumeName: "vikram_joshi_resume.pdf", tags: ["R", "Deep Learning", "Python"], avatar: "VJ", color: "#be185d" },
];

const STATUS_META = {
  new:          { label: "New",          color: "#6366f1", bg: "rgba(99, 102, 241, 0.08)", dot: "#6366f1" },
  under_review: { label: "Under Review", color: "#d97706", bg: "rgba(217, 119, 6, 0.08)", dot: "#d97706" },
  shortlisted:  { label: "Shortlisted",  color: "#0891b2", bg: "rgba(8, 145, 178, 0.08)", dot: "#0891b2" },
  interview:    { label: "Interview",    color: "#7c3aed", bg: "rgba(124, 77, 255, 0.08)", dot: "#7c3aed" },
  hired:        { label: "Hired",        color: "#10b981", bg: "rgba(16, 185, 129, 0.08)", dot: "#10b981" },
  rejected:     { label: "Rejected",     color: "#ef4444", bg: "rgba(239, 68, 68, 0.08)", dot: "#ef4444" },
};

const STATUS_ORDER = ["new", "under_review", "shortlisted", "interview", "hired", "rejected"];

function Avatar({ initials, color, size = 42 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "1a", border: `1.5px solid ${color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.35, color, flexShrink: 0,
      fontFamily: "inherit"
    }}>{initials}</div>
  );
}

function Badge({ status }) {
  const m = STATUS_META[status];
  const pulse = ["new", "under_review", "interview"].includes(status);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, background: m.bg, color: m.color,
      border: `1px solid ${m.color}2b`
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: m.dot,
        display: "inline-block",
        animation: pulse ? "pulse 2s infinite" : "none",
      }} />
      {m.label}
    </span>
  );
}

function ScoreRing({ score }) {
  const c = score >= 85 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444";
  const r = 18, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: 44, height: 44 }}>
      <svg width="44" height="44" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="22" cy="22" r={r} fill="none" stroke="#f1f5f9" strokeWidth="3" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={c} strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: c }}>{score}</div>
    </div>
  );
}

function UploadZone({ onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", dept: "", exp: "", location: "" });
  const [step, setStep] = useState(1);
  const fileRef = useRef();

  const DEPTS = ["Engineering", "Product", "Design", "Analytics", "Marketing", "Operations"];
  const ROLES = ["Frontend Engineer", "Backend Engineer", "DevOps Engineer", "Data Scientist", "Product Manager", "UI/UX Designer", "Marketing Analyst"];

  const inp = (key, label, placeholder, type = "text") => (
    <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: "10px",
          border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none",
          color: "#0f172a", fontFamily: "inherit", transition: "border-color 0.2s"
        }}
        onFocus={e => e.target.style.borderColor = "#3b82f6"}
        onBlur={e => e.target.style.borderColor = "#e2e8f0"}
      />
    </div>
  );

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith(".pdf") || f.name.endsWith(".docx"));
    if (files.length) setUploads(files.map(f => ({ file: f, name: f.name })));
  }

  function handleSubmit() {
    if (!form.name || !form.email || !form.role || !uploads.length) return;
    const colors = ["#6366f1", "#0891b2", "#059669", "#b45309", "#e94560", "#7c3aed", "#0f766e", "#be185d"];
    onUpload({
      id: Date.now(),
      ...form,
      status: "new",
      score: Math.floor(Math.random() * 20 + 65),
      appliedAt: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      resumeName: uploads[0].name,
      tags: [],
      avatar: form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      color: colors[Math.floor(Math.random() * colors.length)],
    });
    setStep(3);
    setTimeout(() => {
      setStep(1);
      setForm({ name: "", email: "", phone: "", role: "", dept: "", exp: "", location: "" });
      setUploads([]);
    }, 3000);
  }

  const isStep1Valid = form.name && form.email && form.role;

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📥</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>Job Application Portal</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 2 }}>Apply to open positions at our company</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              width: 24, height: 24, borderRadius: "50%",
              background: step >= s ? "#3b82f6" : "rgba(255, 255, 255, 0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "#fff", transition: "background 0.3s",
            }}>{s}</div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.75rem 2rem" }}>
        {step === 3 ? (
          <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <div style={{ fontWeight: 700, fontSize: "1.3rem", color: "#0f172a", marginBottom: 6 }}>Application Submitted!</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>We will review your resume and be in touch soon.</div>
          </div>
        ) : step === 1 ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {inp("name", "Full Name *", "Priya Sharma")}
              {inp("email", "Email *", "priya@example.com", "email")}
              {inp("phone", "Phone", "+91 98765 43210", "tel")}
              {inp("exp", "Experience", "e.g. 3 years")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
              {["role", "dept"].map(key => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {key === "role" ? "Applying For *" : "Department"}
                  </label>
                  <select
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: "10px",
                      border: "1.5px solid #e2e8f0", fontSize: 13, color: "#0f172a",
                      background: "#fff", fontFamily: "inherit", outline: "none"
                    }}
                  >
                    <option value="">Select…</option>
                    {(key === "role" ? ROLES : DEPTS).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              {inp("location", "Location", "City / Remote")}
            </div>
            <button
              onClick={() => isStep1Valid && setStep(2)}
              style={{
                width: "100%", padding: "12px", borderRadius: 12, border: "none",
                background: isStep1Valid ? "#3b82f6" : "#e2e8f0",
                color: isStep1Valid ? "#fff" : "#94a3b8",
                fontWeight: 600, fontSize: 14,
                cursor: isStep1Valid ? "pointer" : "default",
                boxShadow: isStep1Valid ? "0 4px 12px rgba(59, 130, 246, 0.2)" : "none",
                transition: "all 0.2s"
              }}
            >
              Continue to Resume Upload →
            </button>
          </>
        ) : (
          <>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
              style={{
                border: `2px dashed ${dragging ? "#3b82f6" : uploads.length ? "#10b981" : "#cbd5e1"}`,
                borderRadius: 16, padding: "2.5rem 1.5rem", textAlign: "center",
                cursor: "pointer",
                background: dragging ? "rgba(59, 130, 246, 0.04)" : uploads.length ? "rgba(16, 185, 129, 0.04)" : "#fafafa",
                transition: "all 0.25s", marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>{uploads.length ? "✅" : "📄"}</div>
              <div style={{ fontWeight: 600, color: "#0f172a", marginBottom: 4, fontSize: 14 }}>
                {uploads.length ? uploads[0].name : "Drop your resume here"}
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                {uploads.length ? "Click to change file" : "PDF or DOCX · Max 5MB"}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx"
                style={{ display: "none" }}
                onChange={e => {
                  const files = Array.from(e.target.files);
                  if (files.length) setUploads(files.map(f => ({ file: f, name: f.name })));
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1, padding: "11px", borderRadius: 12, border: "1.5px solid #cbd5e1",
                  background: "#fff", fontSize: 13, cursor: "pointer", color: "#475569", fontWeight: 600,
                  transition: "all 0.2s"
                }}
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!uploads.length}
                style={{
                  flex: 2, padding: "11px", borderRadius: 12, border: "none",
                  background: uploads.length ? "#3b82f6" : "#e2e8f0",
                  color: uploads.length ? "#fff" : "#94a3b8",
                  fontWeight: 700, fontSize: 14,
                  cursor: uploads.length ? "pointer" : "default",
                  boxShadow: uploads.length ? "0 4px 12px rgba(59, 130, 246, 0.2)" : "none",
                  transition: "all 0.2s"
                }}
              >
                Submit Application
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DetailPanel({ app, onClose, onStatusChange }) {
  if (!app) return null;
  const m = STATUS_META[app.status];
  return (
    <div style={{
      width: 360, flexShrink: 0,
      background: "#fff", borderLeft: "1px solid #e2e8f0",
      display: "flex", flexDirection: "column",
      maxHeight: "calc(100vh - 56px)",
      overflowY: "auto",
      position: "sticky", top: 56, alignSelf: "flex-start",
      boxShadow: "-4px 0 20px rgba(0,0,0,0.02)"
    }}>
      <div style={{ height: 4, background: m.color, flexShrink: 0 }} />
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>Applicant Profile</div>
        <button
          onClick={onClose}
          style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid #e2e8f0", background: "transparent", cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}
        >×</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <Avatar initials={app.avatar} color={app.color} size={64} />
          <div style={{ marginTop: 12, fontWeight: 700, fontSize: 16, color: "#0f172a" }}>{app.name}</div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{app.role}</div>
          <div style={{ marginTop: 8 }}><Badge status={app.status} /></div>
        </div>

        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "1rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <ScoreRing score={app.score} />
          <div>
            <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>Match Score</div>
            <div style={{ fontSize: 13, color: "#0f172a", marginTop: 2, fontWeight: 600 }}>
              {app.score >= 85 ? "Strong match" : app.score >= 70 ? "Good match" : "Below average"}
            </div>
          </div>
        </div>

        {[["📧", "Email", app.email], ["📞", "Phone", app.phone], ["📍", "Location", app.location], ["🗓", "Experience", app.exp], ["🏢", "Department", app.dept], ["📅", "Applied On", app.appliedAt]].map(([icon, label, val]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
            <span style={{ fontSize: 14 }}>{icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 13, color: "#334155", marginTop: 1, fontWeight: 500 }}>{val || "—"}</div>
            </div>
          </div>
        ))}

        {app.tags?.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: 8 }}>Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {app.tags.map(t => (
                <span key={t} style={{ padding: "4px 10px", borderRadius: 20, background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569", fontSize: 11, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 20, padding: "10px 12px", background: "rgba(124, 77, 255, 0.05)", border: "1px solid rgba(124, 77, 255, 0.15)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>📄</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6" }}>{app.resumeName}</div>
            <div style={{ fontSize: 11, color: "#7c3aed", marginTop: 1, fontWeight: 500 }}>Resume attached</div>
          </div>
          <button style={{ padding: "5px 12px", borderRadius: 8, border: "none", background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>View</button>
        </div>
      </div>

      <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #e2e8f0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flexShrink: 0, bgcolor: "#fafafa" }}>
        {["shortlisted", "interview", "hired", "rejected"].map(s => (
          <button
            key={s}
            onClick={() => onStatusChange(app.id, s)}
            style={{
              padding: "8px", borderRadius: 10,
              border: `1px solid ${STATUS_META[s].color}40`,
              background: app.status === s ? STATUS_META[s].bg : "#fff",
              color: STATUS_META[s].color,
              fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {STATUS_META[s].label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RecruitmentManagement() {
  const [apps, setApps] = useState(SEED);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDept, setFilterDept] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("dashboard");
  const [notif, setNotif] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const depts = ["all", ...Array.from(new Set(apps.map(a => a.dept)))];
  const counts = Object.fromEntries(STATUS_ORDER.map(s => [s, apps.filter(a => a.status === s).length]));

  const filtered = apps.filter(a => {
    const ms = filterStatus === "all" || a.status === filterStatus;
    const md = filterDept === "all" || a.dept === filterDept;
    const mq = !search || [a.name, a.role, a.email].some(f => f.toLowerCase().includes(search.toLowerCase()));
    return ms && md && mq;
  });

  function updateStatus(id, status) {
    setApps(p => p.map(a => a.id === id ? { ...a, status } : a));
    setSelected(p => p?.id === id ? { ...p, status } : p);
    showNotif(`Candidate moved to → ${STATUS_META[status].label}`);
  }

  function showNotif(msg) {
    setNotif(msg);
    setTimeout(() => setNotif(""), 3000);
  }

  const NAV = [
    { id: "dashboard", icon: "📊", label: "Overview" },
    { id: "applicants", icon: "👥", label: "Applicants" },
    { id: "portal", icon: "📥", label: "Apply Portal" },
  ];

  const TOPBAR_HEIGHT = 56;

  if (!isClient) return null;

  return (
    <>
      <style>{`
        @keyframes toastIn { from{opacity:0;transform:translateY(8px) translateX(-50%)} to{opacity:1;transform:none translateX(-50%)} }
        .app-row { transition: background-color 0.2s ease; }
        .app-row:hover { background-color: #f8fafc !important; }
        .app-row.selected { background-color: rgba(99, 102, 241, 0.04) !important; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

          {/* Top Navigation Bar */}
          <div style={{
            background: "#ffffff", borderBottom: "1px solid #e2e8f0",
            padding: "0 2rem", height: TOPBAR_HEIGHT,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "sticky", top: 0, zIndex: 40,
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.01)"
          }}>
            {/* Navigation Tabs */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {NAV.map(n => {
                const isActive = view === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => { setView(n.id); if (n.id !== "applicants") setSelected(null); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 16px", borderRadius: "10px", border: "none",
                      background: isActive ? "rgba(59, 130, 246, 0.08)" : "transparent",
                      color: isActive ? "#2563eb" : "#64748b",
                      fontSize: 13, fontWeight: isActive ? 700 : 500,
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{n.icon}</span>
                    {n.label}
                    {n.id === "applicants" && (
                      <span style={{ background: "#2563eb", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 700, marginLeft: 4 }}>
                        {apps.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {view === "applicants" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f1f5f9", borderRadius: 10, padding: "7px 13px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 13, color: "#94a3b8" }}>⌕</span>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, role..."
                    style={{ border: "none", background: "transparent", fontSize: 13, color: "#0f172a", width: 180, outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sub-body Deck */}
          <div style={{ flex: 1, display: "flex", alignItems: "flex-start" }}>
            <div style={{ flex: 1, padding: "1.5rem", minWidth: 0 }}>

              {/* ── OVERVIEW (DASHBOARD) ── */}
              {view === "dashboard" && (
                <div>
                  {/* Top Stats Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
                    {[
                      { label: "Total Applicants", val: apps.length,                                   icon: "👥", color: "#6366f1", bg: "rgba(99, 102, 241, 0.08)" },
                      { label: "Under Review",     val: (counts.under_review || 0) + (counts.new || 0), icon: "🔍", color: "#d97706", bg: "rgba(217, 119, 6, 0.08)" },
                      { label: "In Interview",     val: counts.interview || 0,                          icon: "🎙", color: "#7c3aed", bg: "rgba(124, 77, 255, 0.08)" },
                      { label: "Shortlisted",      val: counts.shortlisted || 0,                        icon: "⭐", color: "#0891b2", bg: "rgba(8, 145, 178, 0.08)" },
                      { label: "Hired",            val: counts.hired || 0,                              icon: "🎉", color: "#10b981", bg: "rgba(16, 185, 129, 0.08)" },
                      { label: "Rejected",         val: counts.rejected || 0,                           icon: "❌", color: "#ef4444", bg: "rgba(239, 68, 68, 0.08)" },
                    ].map((s, i) => (
                      <div
                        key={s.label}
                        onClick={() => setView("applicants")}
                        style={{
                          background: "#fff", borderRadius: 16, padding: "1.25rem 1.5rem",
                          border: "1px solid #e2e8f0", cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.icon}</div>
                        </div>
                        <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{s.val}</div>
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Hiring Pipeline Progress */}
                  <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "1.5rem", marginBottom: 20, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: 16 }}>Hiring Pipeline</div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {STATUS_ORDER.map(s => {
                        const m = STATUS_META[s];
                        const cnt = counts[s] || 0;
                        const pct = apps.length ? Math.round((cnt / apps.length) * 100) : 0;
                        return (
                          <div key={s} style={{ flex: 1, minWidth: "120px", textAlign: "center" }}>
                            <div style={{ height: 6, borderRadius: 6, background: "#f1f5f9", marginBottom: 8, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: pct + "%", background: m.dot, borderRadius: 6 }} />
                            </div>
                            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>{cnt}</div>
                            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, fontWeight: 500 }}>{m.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Applications */}
                  <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "1.5rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>Recent Applications</div>
                      <button onClick={() => setView("applicants")} style={{ fontSize: 12, color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View all →</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {apps.slice(0, 5).map((a, i) => (
                        <div
                          key={a.id}
                          onClick={() => { setView("applicants"); setSelected(a); }}
                          style={{
                            display: "flex", alignItems: "center", gap: 14, padding: "10px 8px",
                            borderBottom: i < 4 ? "1px solid #f1f5f9" : "none", cursor: "pointer",
                            borderRadius: "8px", transition: "background-color 0.2s"
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <Avatar initials={a.avatar} color={a.color} size={36} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 13, color: "#0f172a" }}>{a.name}</div>
                            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{a.role} · {a.dept}</div>
                          </div>
                          <Badge status={a.status} />
                          <div style={{ fontSize: 11, color: "#94a3b8", marginLeft: 8, fontWeight: 500 }}>{a.appliedAt}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── APPLICANTS LIST ── */}
              {view === "applicants" && (
                <div>
                  {/* Filters Block */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
                    {["all", ...STATUS_ORDER].map(s => {
                      const isActive = filterStatus === s;
                      const m = STATUS_META[s];
                      return (
                        <button
                          key={s}
                          onClick={() => setFilterStatus(s)}
                          style={{
                            padding: "6px 14px", borderRadius: 20,
                            border: `1.5px solid ${isActive ? (s === "all" ? "#2563eb" : m.dot) : "#e2e8f0"}`,
                            background: isActive ? (s === "all" ? "#2563eb" : m.bg) : "#fff",
                            color: isActive ? (s === "all" ? "#fff" : m.color) : "#64748b",
                            fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                          }}
                        >
                          {s === "all" ? `All (${apps.length})` : `${m.label} (${counts[s] || 0})`}
                        </button>
                      );
                    })}
                    <select
                      value={filterDept}
                      onChange={e => setFilterDept(e.target.value)}
                      style={{
                        marginLeft: "auto", padding: "6px 12px", borderRadius: 20,
                        border: "1.5px solid #e2e8f0", fontSize: 12, background: "#fff",
                        cursor: "pointer", color: "#475569", fontWeight: 600, outline: "none"
                      }}
                    >
                      {depts.map(d => <option key={d} value={d}>{d === "all" ? "All Departments" : d}</option>)}
                    </select>
                  </div>

                  {/* Applicants Data Table */}
                  <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                          {["Applicant", "Role / Dept", "Location", "Score", "Status", "Applied", "Move To"].map(h => (
                            <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.length === 0 ? (
                          <tr><td colSpan={7} style={{ textAlign: "center", padding: "3.5rem", color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>No applicants match your filters</td></tr>
                        ) : filtered.map((a, i) => (
                          <tr
                            key={a.id}
                            onClick={() => setSelected(prev => prev?.id === a.id ? null : a)}
                            className={`app-row${selected?.id === a.id ? " selected" : ""}`}
                            style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                          >
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <Avatar initials={a.avatar} color={a.color} size={36} />
                                <div>
                                  <div style={{ fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{a.name}</div>
                                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{a.email}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{a.role}</div>
                              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{a.dept}</div>
                            </td>
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{a.location}</div>
                              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2, fontWeight: 500 }}>{a.exp}</div>
                            </td>
                            <td style={{ padding: "12px 16px" }}><ScoreRing score={a.score} /></td>
                            <td style={{ padding: "12px 16px" }}><Badge status={a.status} /></td>
                            <td style={{ padding: "12px 16px", fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{a.appliedAt}</td>
                            <td style={{ padding: "12px 16px" }}>
                              <select
                                value={a.status}
                                onClick={e => e.stopPropagation()}
                                onChange={e => { e.stopPropagation(); updateStatus(a.id, e.target.value); }}
                                style={{ padding: "5px 9px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 12, background: "#fff", cursor: "pointer", fontWeight: 600, outline: "none", color: "#334155" }}
                              >
                                {STATUS_ORDER.map(s => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 10, textAlign: "right", fontWeight: 500 }}>
                    Showing {filtered.length} of {apps.length} applicants · Click a row to view profile
                  </div>
                </div>
              )}

              {/* ── APPLY PORTAL ── */}
              {view === "portal" && (
                <div style={{ maxWidth: 560, margin: "0 auto" }}>
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ fontWeight: 700, fontSize: "1.45rem", color: "#0f172a", marginBottom: 6 }}>Candidate Application Form</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>Share this page with candidates — their submissions appear instantly in Applicants</div>
                  </div>
                  <UploadZone onUpload={a => { setApps(p => [a, ...p]); showNotif("🆕 New application received!"); }} />
                </div>
              )}

            </div>

            {/* Slide Profile Panel */}
            <AnimatePresence>
              {selected && view === "applicants" && (
                <DetailPanel app={selected} onClose={() => setSelected(null)} onStatusChange={updateStatus} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating System Toast notifications */}
      {notif && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%",
          transform: "translateX(-50%)", background: "#0f172a", color: "#fff",
          padding: "10px 20px", borderRadius: 12, fontSize: 12, fontWeight: 600,
          zIndex: 500, boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          animation: "toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)", pointerEvents: "none"
        }}>
          {notif}
        </div>
      )}
    </>
  );
}
