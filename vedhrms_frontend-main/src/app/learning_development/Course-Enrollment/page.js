'use client'
import { useState } from "react";

const courses = [
  { id: "C001", title: "Leadership Fundamentals", category: "Management", duration: "8h", instructor: "Dr. Priya Sharma", seats: 20, enrolled: 14 },
  { id: "C002", title: "Advanced Excel & Data Analysis", category: "Technical", duration: "6h", instructor: "Rajesh Kumar", seats: 15, enrolled: 15 },
  { id: "C003", title: "Communication & Soft Skills", category: "Soft Skills", duration: "4h", instructor: "Anita Verma", seats: 25, enrolled: 10 },
  { id: "C004", title: "Cybersecurity Awareness", category: "Compliance", duration: "3h", instructor: "Vikram Singh", seats: 30, enrolled: 22 },
  { id: "C005", title: "Project Management (PMP Prep)", category: "Management", duration: "12h", instructor: "Suresh Nair", seats: 18, enrolled: 18 },
  { id: "C006", title: "Python for Non-Programmers", category: "Technical", duration: "10h", instructor: "Neha Gupta", seats: 20, enrolled: 7 },
];

const categoryColor = {
  Management: "#f59e0b",
  Technical: "#3b82f6",
  "Soft Skills": "#10b981",
  Compliance: "#ef4444",
};

export default function CourseEnrollment() {
  const [enrolledIds, setEnrolledIds] = useState(["C001"]);
  const [activeTab, setActiveTab] = useState("catalog");
  const [search, setSearch] = useState("");

  const handleEnroll = (id) => setEnrolledIds((prev) => [...prev, id]);
  const handleUnenroll = (id) => setEnrolledIds((prev) => prev.filter((x) => x !== id));

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  const enrolledCourses = courses.filter((c) => enrolledIds.includes(c.id));

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
    input: { width: "100%", padding: "9px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, marginBottom: 14, outline: "none", boxSizing: "border-box" },
    card: { border: "1px solid #e2e8f0", borderRadius: 8, padding: "14px 18px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" },
    title: { fontWeight: 600, fontSize: 15, marginBottom: 4 },
    meta: { fontSize: 13, color: "#64748b" },
    badge: (c) => ({ display: "inline-block", padding: "1px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: c + "18", color: c, marginRight: 8 }),
    enrollBtn: { background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
    unenrollBtn: { background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
    disabledBtn: { background: "#f1f5f9", color: "#94a3b8", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 13, cursor: "not-allowed", whiteSpace: "nowrap" },
    empty: { textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 15 },
  };

  return (
    <div style={s.wrap}>
      <div style={s.heading}>🎓 Course Enrollment</div>
      <div style={s.sub}>Employee ID: EMP-1042</div>

      {/* Stats */}
      <div style={s.statsRow}>
        {[
          { label: "Total Courses", value: courses.length, color: "#3b82f6" },
          { label: "Enrolled", value: enrolledIds.length, color: "#10b981" },
          { label: "Available", value: courses.length - enrolledIds.length, color: "#f59e0b" },
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
          { key: "catalog", label: "📚 Course Catalog" },
          { key: "my-enrollments", label: `📋 My Enrollments (${enrolledIds.length})` },
        ].map((t) => (
          <button key={t.key} style={s.tab(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Catalog */}
      {activeTab === "catalog" && (
        <div>
          <input
            style={s.input}
            placeholder="🔍  Search courses or instructors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filtered.length === 0 && <div style={s.empty}>No courses found.</div>}
          {filtered.map((course) => {
            const isFull = course.enrolled >= course.seats;
            const isEnrolled = enrolledIds.includes(course.id);
            return (
              <div key={course.id} style={s.card}>
                <div style={{ flex: 1 }}>
                  <div style={s.title}>{course.title}</div>
                  <div style={s.meta}>
                    <span style={s.badge(categoryColor[course.category])}>{course.category}</span>
                    👤 {course.instructor} · ⏱ {course.duration} ·{" "}
                    <span style={{ color: isFull ? "#ef4444" : "#64748b" }}>
                      💺 {course.enrolled}/{course.seats}
                    </span>
                  </div>
                </div>
                <div style={{ marginLeft: 12 }}>
                  {isEnrolled ? (
                    <button style={s.unenrollBtn} onClick={() => handleUnenroll(course.id)}>Unenroll</button>
                  ) : isFull ? (
                    <button style={s.disabledBtn} disabled>Full</button>
                  ) : (
                    <button style={s.enrollBtn} onClick={() => handleEnroll(course.id)}>Enroll</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* My Enrollments */}
      {activeTab === "my-enrollments" && (
        <div>
          {enrolledCourses.length === 0 ? (
            <div style={s.empty}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
                You haven&apos;t enrolled in any courses yet.
            </div>
          ) : (
            enrolledCourses.map((course) => (
              <div key={course.id} style={s.card}>
                <div style={{ flex: 1 }}>
                  <div style={s.title}>{course.title}</div>
                  <div style={s.meta}>
                    <span style={s.badge(categoryColor[course.category])}>{course.category}</span>
                    👤 {course.instructor} · ⏱ {course.duration} · 🆔 {course.id}
                  </div>
                </div>
                <button style={s.unenrollBtn} onClick={() => handleUnenroll(course.id)}>Unenroll</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}