

"use client";

import React, { useEffect, useState, useRef } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const ROLE_OPTIONS    = ["Staff", "Super Admin", "HR", "Manager", "Developer"];
const DEPT_OPTIONS    = ["Admin", "Engineering", "HR", "Finance", "Marketing"];
const STATUS_OPTIONS  = ["Permanent", "Contract", "Probation", "Internship"];
const JOB_TYPE_OPTIONS= ["Full Time", "Part Time", "Remote", "Freelance"];
const PAYSLIP_OPTIONS = ["Monthly", "Weekly", "Bi-weekly"];
const SHIFT_OPTIONS   = ["Morning Shift (10:00 AM - 06:00 PM)", "Evening Shift (02:00 PM - 10:00 PM)", "Night Shift (10:00 PM - 06:00 AM)"];
const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];
const BRANCHES        = ["Head Office", "Delhi Branch", "Bangalore Branch", "Chennai Branch", "Kolkata Branch", "Hyderabad Branch", "Pune Branch", "Ahmedabad Branch"];
const SPECIALIZATIONS = ["General", "Technical", "Administrative", "Support"];

const EMPTY_FORM = {
  firstName: "", lastName: "", email: "", phone: "", alternatePhone: "",
  designation: "", role: "Staff", department: "Admin", status: "Permanent",
  joiningDate: "", shift: SHIFT_OPTIONS[0], payslipType: "Monthly",
  jobType: "Full Time", reportingManager: "", profileComplete: 0,
  isAbsent: false, dob: "", maritalStatus: "Single", address: "",
  salary: "", qualification: "", experience: "", employeeCode: "",
  panNo: "", gender: "Male", specialization: "", branchName: "",
  accountHolderName: "", accountNumber: "", bankName: "", ifscCode: "",
  bankBranch: "", branchLocation: "",
  highestQualificationCertificate: null, resume: null, aadharCard: null, panCard: null,
};

// ── Progress fields ───────────────────────────────────────────────────────────
const PERCENT_FIELDS = [
  { key: "firstName",   weight: 8,  label: "First Name"    },
  { key: "lastName",    weight: 7,  label: "Last Name"     },
  { key: "email",       weight: 10, label: "Email Address" },
  { key: "phone",       weight: 10, label: "Phone Number"  },
  { key: "joiningDate", weight: 10, label: "Joining Date"  },
  { key: "designation", weight: 8,  label: "Designation"   },
  { key: "salary",      weight: 7,  label: "Salary"        },
  { key: "resume",      weight: 5,  label: "Resume"        },
  { key: "aadharCard",  weight: 8,  label: "Aadhaar Card"  },
  { key: "panCard",     weight: 7,  label: "PAN Card"      },
  { key: "accountHolderName", weight: 5, label: "Account Holder" },
  { key: "accountNumber",     weight: 6, label: "Account Number" },
  { key: "bankName",          weight: 5, label: "Bank Name"      },
  { key: "ifscCode",          weight: 4, label: "IFSC Code"      },
];

function computePercent(form) {
  let earned = 0;
  PERCENT_FIELDS.forEach(({ key, weight }) => {
    const val = form[key];
    if (val && (typeof val === "string" ? val.trim() !== "" : true)) earned += weight;
  });
  return Math.min(100, earned);
}

function generateId(role) {
  const prefix = role === "Super Admin" ? "ADM" : role === "HR" ? "HR" : "STF";
  return `${prefix}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

// ── Steps Config ──────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Personal",  icon: "👤", desc: "Identity & contact" },
  { id: 2, label: "Company",   icon: "🏢", desc: "Role & employment"  },
  { id: 3, label: "Documents", icon: "📄", desc: "KYC & certificates" },
  { id: 4, label: "Bank",      icon: "🏦", desc: "Salary disbursement"},
];

// ── Circular Progress Ring ────────────────────────────────────────────────────
function ProgressRing({ percent }) {
  const r    = 46;
  const circ = 2 * Math.PI * r;
  const off  = circ - (percent / 100) * circ;
  const color = percent === 100 ? "#22C55E" : percent > 60 ? "#3B82F6" : "#6366F1";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", width: 116, height: 116 }}>
        <svg width="116" height="116" viewBox="0 0 116 116" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="58" cy="58" r={r} fill="none" stroke="#EEF2FF" strokeWidth="10" />
          <circle cx="58" cy="58" r={r} fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={circ} strokeDashoffset={off}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.55s cubic-bezier(.4,0,.2,1), stroke 0.4s ease" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1, transition: "color 0.4s" }}>{percent}%</span>
          <span style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2, fontWeight: 500 }}>complete</span>
        </div>
      </div>
      <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 8 }}>Profile Completion</span>
    </div>
  );
}

// ── Smart Input ───────────────────────────────────────────────────────────────
function SInput({ label, name, value, onChange, type = "text", placeholder, required, error, onFocus, onBlur, isFocused }) {
  const filled = value && value.toString().trim() !== "";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <label style={F.label}>{label}{required && <span style={{ color: "#EF4444" }}> *</span>}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type} name={name} value={value}
          onChange={onChange} placeholder={placeholder}
          onFocus={onFocus} onBlur={onBlur}
          style={{
            ...F.input,
            borderColor: error ? "#EF4444" : isFocused ? "#6366F1" : filled ? "#A5B4FC" : "#E5E7EB",
            boxShadow: isFocused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
            paddingRight: filled ? 30 : 12,
            background: isFocused ? "#fff" : filled ? "#FAFFFE" : "#FAFAFA",
          }}
        />
        {filled && !error && (
          <span style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", color: "#22C55E", fontSize: 13, animation: "popIn 0.2s ease" }}>✓</span>
        )}
      </div>
      {error && <span style={{ fontSize: 11, color: "#EF4444", marginTop: 1 }}>{error}</span>}
    </div>
  );
}

function SSelect({ label, name, value, onChange, options, placeholder, required, error, onFocus, onBlur, isFocused }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <label style={F.label}>{label}{required && <span style={{ color: "#EF4444" }}> *</span>}</label>
      <select
        name={name} value={value} onChange={onChange}
        onFocus={onFocus} onBlur={onBlur}
        style={{
          ...F.select,
          borderColor: error ? "#EF4444" : isFocused ? "#6366F1" : "#E5E7EB",
          boxShadow: isFocused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ── Section Heading ───────────────────────────────────────────────────────────
function SectionHead({ icon, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: "1.5px solid #F1F5F9" }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{title}</p>
        <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{sub}</p>
      </div>
    </div>
  );
}

// ── Success Toast ─────────────────────────────────────────────────────────────
function SuccessToast({ name }) {
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
      background: "#022c22", color: "#fff", padding: "14px 24px", borderRadius: 14,
      display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      animation: "slideUp 0.35s cubic-bezier(.4,0,.2,1)", zIndex: 9999,
      fontSize: 14, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: 20 }}>🎉</span>
      <span>Employee <span style={{ color: "#4ade80" }}>{name}</span> created successfully!</span>
    </div>
  );
}

// ── Main Create Employee Page ─────────────────────────────────────────────────
export default function CreateEmployeePage({ onBack, onCreated }) {
  const [step, setStep]             = useState(1);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [errors, setErrors]         = useState({});
  const [focused, setFocused]       = useState(null);
  const [animDir, setAnimDir]       = useState("forward");
  const [visible, setVisible]       = useState(true);
  const [animating, setAnimating]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast]   = useState(false);
  const [toastName, setToastName]   = useState("");
  const scrollRef = useRef(null);

  const percent = computePercent(form);
  const isLast  = step === STEPS.length;

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm(p => ({ ...p, [name]: files ? files[0] : value }));
    setErrors(p => ({ ...p, [name]: undefined }));
  }

  function fp(name, extra = {}) {
    return {
      name,
      value: form[name] || "",
      onChange: handleChange,
      isFocused: focused === name,
      onFocus: () => setFocused(name),
      onBlur:  () => setFocused(null),
      ...extra,
    };
  }

  function validate(s) {
    const e = {};
    if (s === 1) {
      if (!form.firstName.trim()) e.firstName = "First name is required";
      if (!form.lastName.trim())  e.lastName  = "Last name is required";
      if (!form.email.trim())     e.email     = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email format";
      if (!form.phone.trim())     e.phone     = "Phone is required";
    }
    if (s === 2) {
      if (!form.joiningDate) e.joiningDate = "Joining date is required";
    }
    return e;
  }

  function animateToStep(newStep, dir) {
    if (animating) return;
    const errs = validate(step);
    if (dir === "forward" && Object.keys(errs).length) { setErrors(errs); return; }
    setAnimDir(dir);
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setStep(newStep);
      setVisible(true);
      setAnimating(false);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, 200);
  }

  // ── handleSubmit: saves data, shows toast, then navigates back ──
  function handleSubmit() {
    const errs = validate(step);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => {
      const name = `${form.firstName} ${form.lastName}`.trim();
      const newEmp = {
        ...form, name,
        id: generateId(form.role),
        trashed: false,
        profileComplete: percent,
        isAbsent: false,
      };

      // Notify parent with the new employee data so it appears in the list
      if (onCreated) onCreated(newEmp);

      // Show toast briefly, then navigate back to employee list
      setToastName(name);
      setShowToast(true);
      setSubmitting(false);

      setTimeout(() => {
        setShowToast(false);
        // Navigate back to employee view page after saving
        if (onBack) onBack();
      }, 1800);
    }, 600);
  }

  const slideStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : animDir === "forward" ? "translateX(24px)" : "translateX(-24px)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  };

  const sidebarFields = PERCENT_FIELDS.map(({ key, label, weight }) => {
    const val    = form[key];
    const filled = val && (typeof val === "string" ? val.trim() !== "" : true);
    return { key, label, weight, filled };
  });

  return (
    <div style={{
      width: "100%",
      height: "100%",
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>
      <style>{`
        @keyframes popIn    { from { transform: translateY(-50%) scale(0); opacity:0; } to { transform: translateY(-50%) scale(1); opacity:1; } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp  { from { opacity:0; transform:translate(-50%, 20px); } to { opacity:1; transform:translate(-50%, 0); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes spin     { to { transform: rotate(360deg); } }
        .ce-scroll::-webkit-scrollbar { width: 4px; }
        .ce-scroll::-webkit-scrollbar-track { background: #F8FAFC; }
        .ce-scroll::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 99px; }
        .hover-lift:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.45) !important; }
        .step-item:hover  { background: #F1F5F9 !important; }
      `}</style>

      {/* ── Success Toast ── */}
      {showToast && <SuccessToast name={toastName} />}

      {/* ── Full area container ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#fff",
        overflow: "hidden",
      }}>

        {/* ── Top Nav ── */}
        {/* CHANGED: Removed Back button. Left side = title only. Right side = step pills moved to CENTER/right */}
        <div style={C.topNav}>

          {/* LEFT: Title + subtitle only (no Back button) */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0F172A" }}>Add New Employee</h1>
              <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>Step {step} of {STEPS.length} — {STEPS[step - 1].label}</p>
            </div>
          </div>

          {/* CENTER/RIGHT: Step pills — moved from red area to green area (center of top nav) */}
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {STEPS.map((s, idx) => {
              const isActive = step === s.id;
              const isDone   = step > s.id;
              return (
                <React.Fragment key={s.id}>
                  <div
                    className="step-item"
                    onClick={() => s.id < step && animateToStep(s.id, "backward")}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                      padding: "6px 10px", borderRadius: 10, cursor: s.id < step ? "pointer" : "default",
                      background: isActive ? "#EEF2FF" : "transparent",
                      transition: "background 0.2s",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: isDone ? 14 : 16,
                      background: isDone ? "#6366F1" : isActive ? "#6366F1" : "#F1F5F9",
                      color: isDone || isActive ? "#fff" : "#9CA3AF",
                      boxShadow: isActive ? "0 4px 12px rgba(99,102,241,0.35)" : "none",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.28s cubic-bezier(.4,0,.2,1)",
                    }}>
                      {isDone ? "✓" : s.icon}
                    </div>
                    <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? "#6366F1" : isDone ? "#6366F1" : "#9CA3AF", transition: "color 0.2s" }}>{s.label}</span>
                    <div style={{ height: 2, width: "100%", borderRadius: 99, background: isActive ? "#6366F1" : "transparent", transition: "background 0.3s" }} />
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div style={{ width: 28, height: 2, background: step > s.id ? "#6366F1" : "#E5E7EB", transition: "background 0.4s", flexShrink: 0, marginBottom: 20 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

        </div>

        {/* Global progress bar */}
        <div style={{ height: 3, background: "#EEF2FF", flexShrink: 0 }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, #6366F1, #A78BFA)", width: `${percent}%`, transition: "width 0.55s cubic-bezier(.4,0,.2,1)", borderRadius: "0 99px 99px 0" }} />
        </div>

        {/* ── Body ── */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* LEFT SIDEBAR */}
          <div style={C.sidebar}>
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <ProgressRing percent={percent} />
            </div>

            {/* Field checklist */}
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Progress</p>
              {sidebarFields.map(({ key, label, weight, filled }) => (
                <div key={key} style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "5px 8px", borderRadius: 7,
                  background: filled ? "#F0FDF4" : "#F8FAFC",
                  border: `1px solid ${filled ? "#BBF7D0" : "#E5E7EB"}`,
                  transition: "all 0.25s",
                }}>
                  <div style={{
                    width: 15, height: 15, borderRadius: "50%",
                    background: filled ? "#22C55E" : "#E5E7EB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 8, color: "#fff", flexShrink: 0,
                    transition: "background 0.25s",
                  }}>
                    {filled ? "✓" : ""}
                  </div>
                  <span style={{ fontSize: 11, color: filled ? "#166534" : "#9CA3AF", fontWeight: filled ? 600 : 400, flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 10, color: filled ? "#22C55E" : "#CBD5E1", fontWeight: 700 }}>+{weight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM AREA */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Scrollable form */}
            <div ref={scrollRef} className="ce-scroll" style={{ flex: 1, overflowY: "auto", padding: "22px 28px 16px" }}>
              <div style={slideStyle}>

                {/* ── STEP 1: Personal ── */}
                {step === 1 && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <SectionHead icon="👤" title="Personal Details" sub="Basic identity and contact information" />
                    <div style={F.grid2}>
                      <SInput label="First Name" placeholder="e.g. Vinit" required {...fp("firstName")} error={errors.firstName} />
                      <SInput label="Last Name"  placeholder="e.g. Kumar" required {...fp("lastName")}  error={errors.lastName} />
                      <SInput label="Email Address" type="email" placeholder="vinit@company.com" required {...fp("email")} error={errors.email} />
                      <SInput label="Phone Number" placeholder="+91 98765 43210" required {...fp("phone")} error={errors.phone} />
                      <SInput label="Alternate Phone" placeholder="+91 98765 43210" {...fp("alternatePhone")} />
                      <SInput label="Date of Birth" type="date" {...fp("dob")} />
                      <SInput label="PAN Number"   placeholder="ABCDE1234F" {...fp("panNo")} />
                      <SInput label="Experience"   placeholder="e.g. 3 years" {...fp("experience")} />
                      <SInput label="Qualification" placeholder="e.g. B.Tech" {...fp("qualification")} />
                      <div />
                      <div style={{ gridColumn: "1/-1" }}>
                        <label style={F.label}>Address</label>
                        <textarea name="address" value={form.address} onChange={handleChange}
                          placeholder="Street, City, State, PIN"
                          style={{ ...F.input, height: 70, resize: "vertical", paddingTop: 10 }}
                        />
                      </div>
                      {/* Gender */}
                      <div style={{ gridColumn: "1/-1" }}>
                        <label style={{ ...F.label, marginBottom: 8 }}>Gender</label>
                        <div style={{ display: "flex", gap: 10 }}>
                          {["Male", "Female", "Others"].map(g => (
                            <div key={g} onClick={() => setForm(p => ({ ...p, gender: g }))}
                              style={{
                                display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
                                padding: "8px 20px", borderRadius: 9,
                                border: `2px solid ${form.gender === g ? "#6366F1" : "#E5E7EB"}`,
                                background: form.gender === g ? "#EEF2FF" : "#fff",
                                fontSize: 13, color: form.gender === g ? "#4338CA" : "#64748B",
                                fontWeight: form.gender === g ? 600 : 400,
                                transition: "all 0.18s", userSelect: "none",
                              }}>
                              <div style={{ width: 14, height: 14, borderRadius: "50%", border: form.gender === g ? "5px solid #6366F1" : "2px solid #CBD5E1", flexShrink: 0, transition: "all 0.15s" }} />
                              {g}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Company ── */}
                {step === 2 && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <SectionHead icon="🏢" title="Company Details" sub="Role, department, and employment information" />
                    <div style={F.grid2}>
                      <SSelect label="Branch Name"   options={BRANCHES}        placeholder="Select branch" {...fp("branchName")} />
                      <SSelect label="Department"    options={DEPT_OPTIONS}    {...fp("department")} />
                      <SInput  label="Designation"   placeholder="e.g. Senior Developer" {...fp("designation")} />
                      <SInput  label="Employee Code" placeholder="e.g. EMP-2024-001" {...fp("employeeCode")} />
                      <SInput  label="Joining Date"  type="date" required {...fp("joiningDate")} error={errors.joiningDate} />
                      <SSelect label="Role"          options={ROLE_OPTIONS}    {...fp("role")} />
                      <SSelect label="Job Type"      options={JOB_TYPE_OPTIONS}{...fp("jobType")} />
                      <SSelect label="Status"        options={STATUS_OPTIONS}  {...fp("status")} />
                      <SSelect label="Shift"         options={SHIFT_OPTIONS}   {...fp("shift")} />
                      <SSelect label="Payslip Type"  options={PAYSLIP_OPTIONS} {...fp("payslipType")} />
                      <SInput  label="Basic Salary (₹)" type="number" placeholder="e.g. 50000" {...fp("salary")} />
                      <SSelect label="Specialization" options={SPECIALIZATIONS} placeholder="Select" {...fp("specialization")} />
                      <SInput  label="Reporting Manager" placeholder="Manager name" {...fp("reportingManager")} />
                      <SSelect label="Marital Status"  options={MARITAL_OPTIONS} {...fp("maritalStatus")} />
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Documents ── */}
                {step === 3 && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <SectionHead icon="📄" title="Document Upload" sub="Upload required documents for verification" />
                    <div style={F.grid2}>
                      {[
                        { label: "Highest Qualification Certificate", name: "highestQualificationCertificate", accept: ".pdf,.doc,.docx", icon: "🎓" },
                        { label: "Resume / CV",   name: "resume",    accept: ".pdf,.doc,.docx", icon: "📋" },
                        { label: "Aadhaar Card",  name: "aadharCard",accept: ".pdf,.jpg,.jpeg,.png", icon: "🪪" },
                        { label: "PAN Card",      name: "panCard",   accept: ".pdf,.jpg,.jpeg,.png", icon: "💳" },
                      ].map(doc => (
                        <div key={doc.name}>
                          <label style={F.label}>{doc.label}</label>
                          <label style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                            border: `2px dashed ${form[doc.name] ? "#A5B4FC" : "#E5E7EB"}`,
                            borderRadius: 10, padding: "18px 12px", cursor: "pointer",
                            background: form[doc.name] ? "#EEF2FF" : "#FAFAFA",
                            transition: "all 0.25s",
                          }}>
                            <input type="file" name={doc.name} accept={doc.accept} hidden onChange={handleChange} />
                            <span style={{ fontSize: 22 }}>{doc.icon}</span>
                            {form[doc.name]
                              ? <span style={{ fontSize: 12, color: "#4338CA", fontWeight: 600, textAlign: "center" }}>✓ {form[doc.name].name}</span>
                              : <span style={{ fontSize: 12, color: "#6B7280" }}><span style={{ color: "#6366F1", fontWeight: 600 }}>Click to upload</span></span>}
                            <span style={{ fontSize: 10, color: "#9CA3AF" }}>{doc.accept.replace(/\./g,"").replace(/,/g,", ").toUpperCase()}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div style={F.infoBox}>📋 Max 5MB per file. PDF, DOC, DOCX for certificates · PDF, JPG, PNG for ID documents.</div>
                  </div>
                )}

                {/* ── STEP 4: Bank ── */}
                {step === 4 && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <SectionHead icon="🏦" title="Bank Details" sub="Used for salary disbursement" />
                    <div style={F.grid2}>
                      <SInput label="Account Holder Name" placeholder="Full name as in bank"    {...fp("accountHolderName")} />
                      <SInput label="Account Number"       placeholder="e.g. 000012345678"       {...fp("accountNumber")} />
                      <SInput label="Bank Name"            placeholder="e.g. State Bank of India"{...fp("bankName")} />
                      <SInput label="IFSC Code"            placeholder="e.g. SBIN0001234"        {...fp("ifscCode")} />
                      <SInput label="Bank Branch"          placeholder="e.g. Connaught Place"    {...fp("bankBranch")} />
                      <SInput label="Branch Location"      placeholder="e.g. New Delhi"          {...fp("branchLocation")} />
                    </div>
                    <div style={{ ...F.infoBox, background: "#F0FDF4", borderColor: "#BBF7D0", color: "#166534" }}>
                      🔒 Bank details are encrypted and stored securely. Only HR & Finance teams have access.
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* ── Footer ── */}
            <div style={C.footer}>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => animateToStep(step - 1, "backward")}
                  disabled={step === 1}
                  style={{ ...C.btnBack, opacity: step === 1 ? 0.35 : 1 }}
                >← Back</button>
                {/* Cancel button navigates back to previous page (employee list) */}
                <button
                  onClick={() => { if (onBack) onBack(); }}
                  style={C.btnCancel}
                >✕ Cancel</button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Step dots */}
                <div style={{ display: "flex", gap: 6 }}>
                  {STEPS.map(s => (
                    <div key={s.id} style={{
                      width: s.id === step ? 20 : 7, height: 7,
                      borderRadius: 99,
                      background: s.id < step ? "#6366F1" : s.id === step ? "#6366F1" : "#E5E7EB",
                      transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                      opacity: s.id === step ? 1 : s.id < step ? 0.5 : 0.3,
                    }} />
                  ))}
                </div>

                {!isLast ? (
                  <button
                    className="hover-lift"
                    onClick={() => animateToStep(step + 1, "forward")}
                    style={C.btnNext}
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    className="hover-lift"
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{ ...C.btnNext, background: "linear-gradient(135deg, #22C55E, #16A34A)", boxShadow: "0 4px 14px rgba(34,197,94,0.4)" }}
                  >
                    {submitting
                      ? <><span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>⟳</span> Saving…</>
                      : "✓ Save Employee"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const C = {
  // CHANGED: topNav padding adjusted; justifyContent space-between keeps title left, steps center-right
  topNav:  { display: "flex", justifyContent: "space-between", alignItems: "space-between", padding: "12px 1px", background: "#fff", borderBottom: "1.5px solid #F1F5F9", flexShrink: 0 },
  sidebar: { width: 210, flexShrink: 0, borderRight: "1.5px solid #F1F5F9", padding: "20px 14px", background: "#FAFBFF", overflowY: "auto" },
  footer:  { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 28px", borderTop: "1.5px solid #F1F5F9", background: "#fff", flexShrink: 0 },
  btnBack:   { padding: "8px 18px", borderRadius: 9, border: "1.5px solid #E5E7EB", background: "#fff", color: "#64748B", fontSize: 13, cursor: "pointer", fontWeight: 500 },
  btnCancel: { padding: "8px 16px", borderRadius: 9, border: "1.5px solid #FEE2E2", background: "#FFF5F5", color: "#EF4444", fontSize: 13, cursor: "pointer", fontWeight: 500 },
  btnNext:   { padding: "9px 24px", borderRadius: 9, border: "none", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 14px rgba(99,102,241,0.4)", transition: "transform 0.15s, box-shadow 0.15s" },
};

const F = {
  grid2:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" },
  label:  { fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 3, display: "block" },
  input:  { height: 38, padding: "0 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 13, color: "#111827", outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s" },
  select: { height: 38, padding: "0 32px 0 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 13, color: "#111827", outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit", background: "#fff", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", cursor: "pointer", transition: "border-color 0.2s, box-shadow 0.2s" },
  infoBox:{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 9, padding: "10px 14px", fontSize: 12, color: "#4338CA", marginTop: 14 },
};
