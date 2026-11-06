'use client'
import { useState } from "react";

const initialTrainings = [
  { id: "TRN001", employeeId: "EMP-1042", courseId: "C001", courseName: "Leadership Fundamentals", category: "Management", enrollmentDate: "2024-03-10", completionStatus: "Completed", score: 88, instructor: "Dr. Priya Sharma", duration: "8h" },
  { id: "TRN002", employeeId: "EMP-1042", courseId: "C003", courseName: "Communication & Soft Skills", category: "Soft Skills", enrollmentDate: "2024-04-15", completionStatus: "In Progress", score: null, instructor: "Anita Verma", duration: "4h" },
  { id: "TRN003", employeeId: "EMP-1042", courseId: "C004", courseName: "Cybersecurity Awareness", category: "Compliance", enrollmentDate: "2024-05-01", completionStatus: "Not Started", score: null, instructor: "Vikram Singh", duration: "3h" },
  { id: "TRN004", employeeId: "EMP-1042", courseId: "C005", courseName: "Project Management (PMP Prep)", category: "Management", enrollmentDate: "2024-06-10", completionStatus: "Completed", score: 81, instructor: "Suresh Nair", duration: "12h" },
  { id: "TRN005", employeeId: "EMP-1042", courseId: "C006", courseName: "Python for Non-Programmers", category: "Technical", enrollmentDate: "2024-07-01", completionStatus: "In Progress", score: null, instructor: "Neha Gupta", duration: "10h" },
];

const categoryColor = {
  Management: "#f59e0b",
  Technical: "#3b82f6",
  "Soft Skills": "#10b981",
  Compliance: "#ef4444",
};

const statusStyle = {
  Completed:     { bg: "#dcfce7", color: "#16a34a", label: "✓ Completed" },
  "In Progress": { bg: "#fef9c3", color: "#ca8a04", label: "⏳ In Progress" },
  "Not Started": { bg: "#f1f5f9", color: "#64748b", label: "○ Not Started" },
};

const ALL_STATUSES = ["Completed", "In Progress", "Not Started"];

export default function TrainingManagement() {
  const [trainings, setTrainings] = useState(initialTrainings);
  const [activeTab, setActiveTab] = useState("list");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editId, setEditId] = useState(null);
  const [editScore, setEditScore] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [newTraining, setNewTraining] = useState({
    employeeId: "EMP-1042", courseId: "", courseName: "", category: "Management",
    enrollmentDate: "", completionStatus: "Not Started", score: "", instructor: "", duration: "",
  });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleUpdateStatus = (id) => {
    setTrainings((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completionStatus: editStatus, score: editScore !== "" ? Number(editScore) : t.score }
          : t
      )
    );
    setEditId(null);
    showToast("Training record updated!");
  };

  const handleDelete = (id) => {
    setTrainings((prev) => prev.filter((t) => t.id !== id));
    showToast("Training record removed.");
  };

  const handleAdd = () => {
    if (!newTraining.courseId || !newTraining.courseName || !newTraining.enrollmentDate) {
      showToast("Please fill all required fields.");
      return;
    }
    const record = {
      ...newTraining,
      id: `TRN00${trainings.length + 1}`,
      score: newTraining.score !== "" ? Number(newTraining.score) : null,
    };
    setTrainings((prev) => [...prev, record]);
    setShowAddForm(false);
    setNewTraining({
      employeeId: "EMP-1042", courseId: "", courseName: "", category: "Management",
      enrollmentDate: "", completionStatus: "Not Started", score: "", instructor: "", duration: "",
    });
    showToast("Training record added!");
  };

  const filtered = trainings.filter((t) => {
    const matchSearch =
      t.courseName.toLowerCase().includes(search.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      t.courseId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || t.completionStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const total = trainings.length;
  const completed = trainings.filter((t) => t.completionStatus === "Completed").length;
  const inProgress = trainings.filter((t) => t.completionStatus === "In Progress").length;
  const notStarted = trainings.filter((t) => t.completionStatus === "Not Started").length;
  const avgScore = Math.round(
    trainings.filter((t) => t.score).reduce((a, b) => a + b.score, 0) /
    trainings.filter((t) => t.score).length
  ) || 0;

  const s = {
    wrap: { maxWidth: "100%", margin: "5px", padding: "0 20px", fontFamily: "Segoe UI, sans-serif", color: "#1e293b" },
    heading: { fontSize: 22, fontWeight: 700, marginBottom: 2 },
    sub: { fontSize: 13, color: "#64748b", marginBottom: 20 },
    statsRow: { display: "flex", gap: 12, marginBottom: 24 },
    statBox: (c) => ({ flex: 1, background: c + "12", border: `1px solid ${c}30`, borderRadius: 8, padding: "12px 16px", textAlign: "center" }),
    statNum: (c) => ({ fontSize: 24, fontWeight: 700, color: c }),
    statLabel: { fontSize: 12, color: "#64748b", marginTop: 2 },
    tabs: { display: "flex", gap: 4, borderBottom: "2px solid #e2e8f0", marginBottom: 20 },
    tab: (a) => ({ padding: "8px 18px", border: "none", background: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, color: a ? "#3b82f6" : "#64748b", borderBottom: a ? "2px solid #3b82f6" : "2px solid transparent", marginBottom: -2 }),
    topBar: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" },
    input: { padding: "9px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", flex: 1, minWidth: 180 },
    select: { padding: "9px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff", cursor: "pointer" },
    addBtn: { background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
    card: { border: "1px solid #e2e8f0", borderRadius: 8, padding: "14px 18px", marginBottom: 10, background: "#fff" },
    row: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
    title: { fontWeight: 600, fontSize: 15, marginBottom: 5 },
    meta: { fontSize: 13, color: "#64748b", display: "flex", flexWrap: "wrap", gap: "4px 16px", marginBottom: 6 },
    badge: (bg, color) => ({ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: bg, color }),
    catBadge: (c) => ({ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: c + "18", color: c, marginRight: 6 }),
    scoreBar: { height: 5, borderRadius: 4, background: "#e2e8f0", marginTop: 5, overflow: "hidden", maxWidth: 200 },
    scoreFill: (score) => ({ height: "100%", borderRadius: 4, width: `${score}%`, background: score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444" }),
    actions: { display: "flex", gap: 8, marginTop: 8 },
    editBtn: { background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer" },
    deleteBtn: { background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer" },
    saveBtn: { background: "#10b981", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer" },
    cancelBtn: { background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer" },
    formBox: { border: "1px solid #bfdbfe", borderRadius: 10, padding: "20px", marginBottom: 16, background: "#eff6ff" },
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 },
    formInput: { padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 7, fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", background: "#fff" },
    formLabel: { fontSize: 12, color: "#475569", marginBottom: 4, display: "block", fontWeight: 600 },
    formBtns: { display: "flex", gap: 8 },
    toast: { position: "fixed", bottom: 28, right: 28, background: "#1e3a5f", color: "#bfdbfe", padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, zIndex: 999, border: "1px solid #3b82f6" },
    empty: { textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 15 },
  };

  return (
    <div style={s.wrap}>
      <div style={s.heading}>📋 Training Management</div>
      <div style={s.sub}>Employee ID: EMP-1042</div>

      {/* Stats */}
      <div style={s.statsRow}>
        {[
          { label: "Total", value: total, color: "#3b82f6" },
          { label: "Completed", value: completed, color: "#10b981" },
          { label: "In Progress", value: inProgress, color: "#f59e0b" },
          { label: "Not Started", value: notStarted, color: "#94a3b8" },
          { label: "Avg Score", value: avgScore + "%", color: "#8b5cf6" },
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
          { key: "list", label: "📋 Training Records" },
          { key: "summary", label: "📊 Summary" },
        ].map((t) => (
          <button key={t.key} style={s.tab(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Training Records Tab */}
      {activeTab === "list" && (
        <div>
          {/* Top Bar */}
          <div style={s.topBar}>
            <input
              style={s.input}
              placeholder="🔍  Search by name, employee ID, course ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select style={s.select} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              {ALL_STATUSES.map((st) => <option key={st}>{st}</option>)}
            </select>
            <button style={s.addBtn} onClick={() => setShowAddForm(!showAddForm)}>+ Add Record</button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div style={s.formBox}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "#1e40af" }}>➕ Add New Training Record</div>
              <div style={s.formGrid}>
                {[
                  { label: "Employee ID *", key: "employeeId" },
                  { label: "Course ID *", key: "courseId" },
                  { label: "Course Name *", key: "courseName" },
                  { label: "Instructor", key: "instructor" },
                  { label: "Duration", key: "duration" },
                  { label: "Enrollment Date *", key: "enrollmentDate", type: "date" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label style={s.formLabel}>{label}</label>
                    <input
                      style={s.formInput}
                      type={type || "text"}
                      value={newTraining[key]}
                      onChange={(e) => setNewTraining({ ...newTraining, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <div>
                  <label style={s.formLabel}>Category</label>
                  <select style={s.formInput} value={newTraining.category} onChange={(e) => setNewTraining({ ...newTraining, category: e.target.value })}>
                    {Object.keys(categoryColor).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.formLabel}>Status</label>
                  <select style={s.formInput} value={newTraining.completionStatus} onChange={(e) => setNewTraining({ ...newTraining, completionStatus: e.target.value })}>
                    {ALL_STATUSES.map((st) => <option key={st}>{st}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.formLabel}>Score (optional)</label>
                  <input
                    style={s.formInput}
                    type="number" min="0" max="100" placeholder="0–100"
                    value={newTraining.score}
                    onChange={(e) => setNewTraining({ ...newTraining, score: e.target.value })}
                  />
                </div>
              </div>
              <div style={s.formBtns}>
                <button style={s.addBtn} onClick={handleAdd}>Save Record</button>
                <button style={{ ...s.cancelBtn, padding: "9px 16px", fontSize: 13 }} onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </div>
          )}

          {filtered.length === 0 && <div style={s.empty}>No training records found.</div>}

          {filtered.map((t) => {
            const st = statusStyle[t.completionStatus];
            const isEditing = editId === t.id;
            return (
              <div key={t.id} style={s.card}>
                <div style={s.row}>
                  <div style={{ flex: 1 }}>
                    <div style={s.title}>
                      <span style={s.catBadge(categoryColor[t.category])}>{t.category}</span>
                      {t.courseName}
                    </div>
                    <div style={s.meta}>
                      <span>🆔 {t.id}</span>
                      <span>👤 {t.employeeId}</span>
                      <span>📚 {t.courseId}</span>
                      <span>📅 Enrolled: {t.enrollmentDate}</span>
                      {t.instructor && <span>🧑‍🏫 {t.instructor}</span>}
                      {t.duration && <span>⏱ {t.duration}</span>}
                    </div>
                    {t.score !== null && (
                      <div style={{ maxWidth: 200 }}>
                        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 2 }}>
                          Score: <strong>{t.score}/100</strong>
                        </div>
                        <div style={s.scoreBar}>
                          <div style={s.scoreFill(t.score)} />
                        </div>
                      </div>
                    )}
                  </div>
                  <span style={s.badge(st.bg, st.color)}>{st.label}</span>
                </div>

                {/* Inline Edit */}
                {isEditing && (
                  <div style={{ marginTop: 12, padding: "12px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
                    <div>
                      <label style={s.formLabel}>Status</label>
                      <select style={{ ...s.formInput, width: 160 }} value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                        {ALL_STATUSES.map((st) => <option key={st}>{st}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={s.formLabel}>Score (0–100)</label>
                      <input
                        style={{ ...s.formInput, width: 100 }}
                        type="number" min="0" max="100" placeholder="Score"
                        value={editScore}
                        onChange={(e) => setEditScore(e.target.value)}
                      />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={s.saveBtn} onClick={() => handleUpdateStatus(t.id)}>Save</button>
                      <button style={s.cancelBtn} onClick={() => setEditId(null)}>Cancel</button>
                    </div>
                  </div>
                )}

                <div style={s.actions}>
                  <button style={s.editBtn} onClick={() => { setEditId(t.id); setEditStatus(t.completionStatus); setEditScore(t.score ?? ""); }}>✏️ Edit</button>
                  <button style={s.deleteBtn} onClick={() => handleDelete(t.id)}>🗑 Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Tab */}
      {activeTab === "summary" && (
        <div>
          {/* By Category */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📂 By Category</div>
            {Object.keys(categoryColor).map((cat) => {
              const count = trainings.filter((t) => t.category === cat).length;
              if (!count) return null;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={cat} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{cat}</span>
                    <span style={{ color: "#64748b" }}>{count} training{count > 1 ? "s" : ""} ({pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: categoryColor[cat], borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* By Status */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📊 By Status</div>
            {ALL_STATUSES.map((status) => {
              const count = trainings.filter((t) => t.completionStatus === status).length;
              const pct = Math.round((count / total) * 100);
              const st = statusStyle[status];
              return (
                <div key={status} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{status}</span>
                    <span style={{ color: "#64748b" }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: st.color, borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score Table */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🎯 Scores</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Course", "Status", "Score"].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trainings.map((t) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px 14px" }}>{t.courseName}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={s.badge(statusStyle[t.completionStatus].bg, statusStyle[t.completionStatus].color)}>
                        {statusStyle[t.completionStatus].label}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      {t.score !== null ? (
                        <span style={{ fontWeight: 600, color: t.score >= 80 ? "#16a34a" : t.score >= 60 ? "#ca8a04" : "#dc2626" }}>
                          {t.score}/100
                        </span>
                      ) : (
                        <span style={{ color: "#94a3b8" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  );
}