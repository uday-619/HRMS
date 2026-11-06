'use client';
import { useState } from "react";

const certifications = [
  {
    id: "CERT001",
    employeeId: "EMP-1042",
    courseId: "C001",
    courseName: "Leadership Fundamentals",
    issuedDate: "2024-03-25",
    expiryDate: "2026-03-25",
    score: 88,
    status: "Active",
    document: "leadership_cert.pdf",
  },
  {
    id: "CERT002",
    employeeId: "EMP-1042",
    courseId: "C004",
    courseName: "Cybersecurity Awareness",
    issuedDate: "2024-05-10",
    expiryDate: "2025-05-10",
    score: 92,
    status: "Expired",
    document: "cybersecurity_cert.pdf",
  },
  {
    id: "CERT003",
    employeeId: "EMP-1042",
    courseId: "C003",
    courseName: "Communication & Soft Skills",
    issuedDate: "2024-06-01",
    expiryDate: "2026-06-01",
    score: 76,
    status: "Active",
    document: "communication_cert.pdf",
  },
];

const pendingCourses = [
  { courseId: "C006", courseName: "Python for Non-Programmers", completionStatus: "In Progress", score: null },
  { courseId: "C005", courseName: "Project Management (PMP Prep)", completionStatus: "Completed", score: 81 },
];

const statusStyle = {
  Active:  { bg: "#dcfce7", color: "#16a34a", label: "✓ Active" },
  Expired: { bg: "#fee2e2", color: "#dc2626", label: "✕ Expired" },
  Pending: { bg: "#fef9c3", color: "#ca8a04", label: "⏳ Pending" },
};

export default function CertificationModule() {
  const [certs, setCerts] = useState(certifications);
  const [activeTab, setActiveTab] = useState("my-certs");
  const [search, setSearch] = useState("");
  const [issuing, setIssuing] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleIssueCert = (course) => {
    setIssuing(course.courseId);
    setTimeout(() => {
      const newCert = {
        id: `CERT00${certs.length + 1}`,
        employeeId: "EMP-1042",
        courseId: course.courseId,
        courseName: course.courseName,
        issuedDate: new Date().toISOString().split("T")[0],
        expiryDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        score: course.score,
        status: "Active",
        document: `${course.courseName.toLowerCase().replace(/\s+/g, "_")}_cert.pdf`,
      };
      setCerts((prev) => [...prev, newCert]);
      setIssuing(null);
      showToast(`Certificate issued for "${course.courseName}"!`);
    }, 1000);
  };

  const filtered = certs.filter(
    (c) =>
      c.courseName.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  const active = certs.filter((c) => c.status === "Active").length;
  const expired = certs.filter((c) => c.status === "Expired").length;
  const eligible = pendingCourses.filter(
    (c) => c.completionStatus === "Completed" && !certs.find((x) => x.courseId === c.courseId)
  ).length;

  const s = {
    wrap: { maxWidth: "100%" , margin: "5px ", padding: "0 20px", fontFamily: "Segoe UI, sans-serif", color: "#1e293b" },
    heading: { fontSize: 22, fontWeight: 700, marginBottom: 2 },
    sub: { fontSize: 13, color: "#64748b", marginBottom: 20 },
    statsRow: { display: "flex", gap: 12, marginBottom: 24 },
    statBox: (c) => ({ flex: 1, background: c + "12", border: `1px solid ${c}30`, borderRadius: 8, padding: "12px 16px", textAlign: "center" }),
    statNum: (c) => ({ fontSize: 24, fontWeight: 700, color: c }),
    statLabel: { fontSize: 12, color: "#64748b", marginTop: 2 },
    tabs: { display: "flex", gap: 4, borderBottom: "2px solid #e2e8f0", marginBottom: 20 },
    tab: (a) => ({ padding: "8px 18px", border: "none", background: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, color: a ? "#3b82f6" : "#64748b", borderBottom: a ? "2px solid #3b82f6" : "2px solid transparent", marginBottom: -2 }),
    input: { width: "100%", padding: "9px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, marginBottom: 14, outline: "none", boxSizing: "border-box" },
    card: { border: "1px solid #e2e8f0", borderRadius: 8, padding: "16px 18px", marginBottom: 10, background: "#fff" },
    row: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
    title: { fontWeight: 600, fontSize: 15, marginBottom: 6 },
    meta: { fontSize: 13, color: "#64748b", display: "flex", flexWrap: "wrap", gap: "6px 18px", marginBottom: 8 },
    badge: (bg, color) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: bg, color: color }),
    scoreBar: { height: 6, borderRadius: 4, background: "#e2e8f0", marginTop: 6, overflow: "hidden" },
    scoreFill: (score) => ({ height: "100%", borderRadius: 4, width: `${score}%`, background: score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444" }),
    dlBtn: { background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
    issueBtn: { background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
    disabledBtn: { background: "#f1f5f9", color: "#94a3b8", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 13, cursor: "not-allowed", whiteSpace: "nowrap" },
    empty: { textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 15 },
    toast: { position: "fixed", bottom: 28, right: 28, background: "#065f46", color: "#d1fae5", padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, zIndex: 999, border: "1px solid #10b981" },
  };

  return (
    <div style={s.wrap}>
      <div style={s.heading}>🏆 Certifications</div>
      <div style={s.sub}>Employee ID: EMP-1042</div>

      {/* Stats */}
      <div style={s.statsRow}>
        {[
          { label: "Total Certs", value: certs.length, color: "#3b82f6" },
          { label: "Active", value: active, color: "#10b981" },
          { label: "Expired", value: expired, color: "#ef4444" },
          { label: "Eligible", value: eligible, color: "#f59e0b" },
        ].map((item) => (
          <div key={item.label} style={s.statBox(item.color)}>
            <div style={s.statNum(item.color)}>{item.value}</div>
            <div style={s.statLabel}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {[
          { key: "my-certs", label: `🏅 My Certificates (${certs.length})` },
          { key: "eligible", label: `📋 Eligible to Certify (${eligible})` },
        ].map((t) => (
          <button key={t.key} style={s.tab(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* My Certificates Tab */}
      {activeTab === "my-certs" && (
        <div>
          <input
            style={s.input}
            placeholder="🔍  Search by course name or certificate ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filtered.length === 0 && <div style={s.empty}>No certificates found.</div>}
          {filtered.map((cert) => {
            const st = statusStyle[cert.status];
            return (
              <div key={cert.id} style={s.card}>
                <div style={s.row}>
                  <div style={{ flex: 1 }}>
                    <div style={s.title}>{cert.courseName}</div>
                    <div style={s.meta}>
                      <span>🆔 {cert.id}</span>
                      <span>👤 {cert.employeeId}</span>
                      <span>📅 Issued: {cert.issuedDate}</span>
                      <span>⏳ Expires: {cert.expiryDate}</span>
                    </div>
                    {cert.score !== null && (
                      <div style={{ maxWidth: 260 }}>
                        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 3 }}>
                          Score: <strong style={{ color: "#1e293b" }}>{cert.score}/100</strong>
                        </div>
                        <div style={s.scoreBar}>
                          <div style={s.scoreFill(cert.score)} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span style={s.badge(st.bg, st.color)}>{st.label}</span>
                    <button style={s.dlBtn} onClick={() => alert(`Downloading: ${cert.document}`)}>
                      ⬇ Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Eligible Tab */}
      {activeTab === "eligible" && (
        <div>
          {pendingCourses.length === 0 ? (
            <div style={s.empty}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
              No courses pending certification.
            </div>
          ) : (
            pendingCourses.map((course) => {
              const alreadyCertified = certs.some((c) => c.courseId === course.courseId);
              const canIssue = course.completionStatus === "Completed" && !alreadyCertified;
              const pst = alreadyCertified
                ? statusStyle["Active"]
                : course.completionStatus === "Completed"
                ? { bg: "#fef9c3", color: "#ca8a04", label: "✓ Completed" }
                : statusStyle["Pending"];
              return (
                <div key={course.courseId} style={s.card}>
                  <div style={s.row}>
                    <div style={{ flex: 1 }}>
                      <div style={s.title}>{course.courseName}</div>
                      <div style={s.meta}>
                        <span>🆔 {course.courseId}</span>
                        <span>📊 {course.completionStatus}</span>
                        {course.score && <span>🎯 Score: {course.score}/100</span>}
                      </div>
                      {course.score && (
                        <div style={{ maxWidth: 260 }}>
                          <div style={s.scoreBar}>
                            <div style={s.scoreFill(course.score)} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                      <span style={s.badge(pst.bg, pst.color)}>
                        {alreadyCertified ? "✓ Certified" : pst.label}
                      </span>
                      {canIssue ? (
                        <button
                          style={s.issueBtn}
                          disabled={issuing === course.courseId}
                          onClick={() => handleIssueCert(course)}
                        >
                          {issuing === course.courseId ? "Issuing..." : "Issue Certificate"}
                        </button>
                      ) : (
                        <button style={s.disabledBtn} disabled>
                          {alreadyCertified ? "Already Issued" : "Not Eligible"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  );
}