"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

/* ─── style injection ──────────────────────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("ct-styles")) return;
  const s = document.createElement("style");
  s.id = "ct-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    @keyframes ct-fade-up      { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes ct-slide-in     { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
    @keyframes ct-pop          { 0%{transform:scale(0.93);opacity:0} 70%{transform:scale(1.02)} 100%{transform:scale(1);opacity:1} }
    @keyframes ct-label-up     { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
    @keyframes ct-check-in     { 0%{stroke-dashoffset:24} 100%{stroke-dashoffset:0} }
    @keyframes ct-shake        { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-4px)} 40%,80%{transform:translateX(4px)} }
    @keyframes ct-focus-glow   { from{box-shadow:0 0 0 0 rgba(99,102,241,.3)} to{box-shadow:0 0 0 4px rgba(99,102,241,0)} }

    /* ── wrapper ── */
    .ct-form {
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 4px 0 8px;
      color: #1e293b;
    }

    /* ── section label ── */
    .ct-section-label {
      font-size: .7rem;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      animation: ct-slide-in .4s cubic-bezier(.22,1,.36,1) both;
    }
    .ct-section-label::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, #e2e8f0 0%, transparent 100%);
    }

    /* ── field wrapper ── */
    .ct-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      animation: ct-fade-up .45s cubic-bezier(.22,1,.36,1) both;
    }
    .ct-label {
      font-size: .8rem;
      font-weight: 700;
      color: #475569;
      display: flex;
      align-items: center;
      gap: 6px;
      letter-spacing: -.01em;
      animation: ct-label-up .35s cubic-bezier(.22,1,.36,1) both;
    }
    .ct-label-required {
      color: #ef4444;
      font-size: .75rem;
      line-height: 1;
      font-weight: 800;
    }

    /* ── inputs ── */
    .ct-input,
    .ct-textarea,
    .ct-select {
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: .875rem;
      font-weight: 500;
      color: #1e293b;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      outline: none;
      transition: all .25s ease;
    }
    .ct-input,
    .ct-select {
      height: 44px;
      padding: 0 14px;
    }
    .ct-textarea {
      padding: 12px 14px;
      resize: vertical;
      min-height: 96px;
      line-height: 1.6;
    }
    .ct-select {
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 38px;
    }

    .ct-input::placeholder,
    .ct-textarea::placeholder {
      color: #cbd5e1;
    }

    .ct-input:focus,
    .ct-textarea:focus,
    .ct-select:focus {
      border-color: #818cf8;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
      background: #f8fafc;
    }

    .ct-input:hover:not(:focus),
    .ct-textarea:hover:not(:focus),
    .ct-select:hover:not(:focus) {
      border-color: #cbd5e1;
      background: #f8fafc;
    }

    /* filled state subtle bg */
    .ct-input.ct-filled,
    .ct-textarea.ct-filled,
    .ct-select.ct-filled {
      background: #f8fafc;
      border-color: #cbd5e1;
    }

    /* error state */
    .ct-input.ct-error,
    .ct-textarea.ct-error,
    .ct-select.ct-error {
      border-color: #ef4444;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.08);
      animation: ct-shake .35s ease both;
    }
    .ct-error-msg {
      font-size: .75rem;
      color: #dc2626;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 5px;
      animation: ct-fade-up .25s both;
    }

    /* ── character count ── */
    .ct-char-count {
      font-size: .75rem;
      color: #94a3b8;
      text-align: right;
      font-weight: 500;
      animation: ct-fade-up .3s both;
    }

    /* ── priority pills ── */
    .ct-priority-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .ct-priority-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 16px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: .8rem;
      font-weight: 700;
      letter-spacing: .01em;
      cursor: pointer;
      transition: all .2s ease;
      user-select: none;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.02);
    }
    .ct-priority-pill:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 24, 40, 0.06);
    }
    .ct-priority-pill-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    /* active states */
    .ct-pill-high.ct-pill-active {
      background: #fef2f2;
      border-color: #fee2e2;
      color: #dc2626;
    }
    .ct-pill-medium.ct-pill-active {
      background: #fffbeb;
      border-color: #fef3c7;
      color: #d97706;
    }
    .ct-pill-low.ct-pill-active {
      background: #f0fdf4;
      border-color: #dcfce7;
      color: #16a34a;
    }

    .ct-pill-dot-high {
      background: #ef4444;
    }
    .ct-pill-dot-medium {
      background: #f59e0b;
    }
    .ct-pill-dot-low {
      background: #10b981;
    }

    /* ── category chips ── */
    .ct-category-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .ct-category-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: .8rem;
      font-weight: 700;
      letter-spacing: .01em;
      color: #64748b;
      cursor: pointer;
      transition: all .2s ease;
      user-select: none;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.02);
    }
    .ct-category-chip:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
      color: #475569;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 24, 40, 0.06);
    }
    .ct-category-chip.ct-chip-active {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      border-color: #4f46e5;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.25);
    }
    .ct-category-chip svg {
      font-size: 14px;
    }

    /* ── footer buttons ── */
    .ct-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      padding-top: 20px;
      margin-top: 8px;
      border-top: 1px solid #e2e8f0;
      animation: ct-fade-up .5s .35s cubic-bezier(.22,1,.36,1) both;
    }
    .ct-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      height: 42px;
      padding: 0 20px;
      border-radius: 10px;
      border: none;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: .875rem;
      font-weight: 700;
      letter-spacing: .01em;
      cursor: pointer;
      transition: all .2s ease;
      text-transform: uppercase;
    }
    .ct-btn:hover {
      transform: translateY(-2px);
    }
    .ct-btn:active {
      transform: translateY(0);
    }
    .ct-btn-cancel {
      background: #ffffff;
      color: #64748b;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.02);
    }
    .ct-btn-cancel:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      box-shadow: 0 4px 12px rgba(16, 24, 40, 0.08);
    }
    .ct-btn-save {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.25);
    }
    .ct-btn-save:hover {
      box-shadow: 0 8px 22px rgba(79, 70, 229, 0.32);
      filter: brightness(1.04);
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .ct-footer {
        flex-direction: column;
        gap: 12px;
      }
      .ct-btn {
        width: 100%;
      }
      .ct-priority-group,
      .ct-category-group {
        flex-direction: column;
      }
      .ct-priority-pill,
      .ct-category-chip {
        flex: 1;
        width: 100%;
        justify-content: center;
      }
    }
  `;
  document.head.appendChild(s);
};

/* ─── Field component ─────────────────────────────────────────────────── */
const Field = ({ label, required, children, error, hint, delay = 0 }) => (
  <div className="ct-field" style={{ animationDelay: `${delay}ms` }}>
    {label && (
      <label className="ct-label" style={{ animationDelay: `${delay + 30}ms` }}>
        {label}
        {required && <span className="ct-label-required">*</span>}
      </label>
    )}
    {children}
    {error && (
      <span className="ct-error-msg">
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4m0 4h.01" />
        </svg>
        {error}
      </span>
    )}
    {hint && !error && <span className="ct-char-count">{hint}</span>}
  </div>
);

/* ─── Priority Pill ───────────────────────────────────────────────────── */
const PriorityPill = ({ value, active, onClick }) => {
  const map = {
    High: { cls: "ct-pill-high", dot: "ct-pill-dot-high" },
    Medium: { cls: "ct-pill-medium", dot: "ct-pill-dot-medium" },
    Low: { cls: "ct-pill-low", dot: "ct-pill-dot-low" },
  };
  const { cls, dot } = map[value] || {};
  return (
    <button
      type="button"
      className={`ct-priority-pill ${cls} ${active ? "ct-pill-active" : ""}`}
      onClick={() => onClick(value)}
    >
      <span className={`ct-priority-pill-dot ${dot}`} />
      {value}
      {active && (
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
};

/* ─── Category Chip ───────────────────────────────────────────────────── */
const catIcons = {
  Technical: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
    </svg>
  ),
  Payroll: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  HR: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  General: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4m0-4h.01" />
    </svg>
  ),
};

const CategoryChip = ({ value, active, onClick }) => (
  <button
    type="button"
    className={`ct-category-chip ${active ? "ct-chip-active" : ""}`}
    onClick={() => onClick(value)}
  >
    {catIcons[value]}
    {value}
  </button>
);

/* ─── Main component ─────────────────────────────────────────────────── */
const CreateTicket = ({ formData, handleInputChange, handleCreate, handleClose }) => {
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    injectStyles();
    setMounted(true);
  }, []);

  /* synthetic event helper for pill/chip clicks */
  const synth = (name, value) =>
    handleInputChange({ target: { name, value } });

  const markTouched = (name) => setTouched((p) => ({ ...p, [name]: true }));

  const validate = () => {
    const e = {};
    if (!formData.title?.trim()) e.title = "Title is required";
    if (!formData.description?.trim()) e.description = "Description is required";
    if (!formData.employee?.trim()) e.employee = "Employee name is required";
    if (!formData.endDate) e.endDate = "Due date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      setTouched({ title: true, description: true, employee: true, endDate: true });
      return;
    }
    handleCreate();
  };

  const getErr = (f) => (touched[f] && errors[f] ? errors[f] : null);

  const clearErr = (name) => {
    markTouched(name);
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  };

  if (!mounted) return null;

  return (
    <div className="ct-form">
      <Grid container spacing={2}>
        {/* ── Basic Info ── */}
        <Grid size={{ xs: 12 }}>
          <div className="ct-section-label" style={{ animationDelay: "0ms" }}>
            Basic Information
          </div>
        </Grid>

        {/* Title */}
        <Grid size={{ xs: 12 }}>
          <Field label="Title" required error={getErr("title")} delay={60}>
            <input
              className={`ct-input ${formData.title ? "ct-filled" : ""} ${getErr("title") ? "ct-error" : ""}`}
              placeholder="e.g. Login page not loading"
              name="title"
              value={formData.title}
              onChange={(e) => {
                handleInputChange(e);
                clearErr("title");
              }}
              onBlur={() => markTouched("title")}
            />
          </Field>
        </Grid>

        {/* Description */}
        <Grid size={{ xs: 12 }}>
          <Field
            label="Description"
            required
            error={getErr("description")}
            hint={`${(formData.description || "").length} / 500`}
            delay={100}
          >
            <textarea
              className={`ct-textarea ${formData.description ? "ct-filled" : ""} ${getErr("description") ? "ct-error" : ""}`}
              placeholder="Describe the issue in detail…"
              name="description"
              value={formData.description}
              maxLength={500}
              onChange={(e) => {
                handleInputChange(e);
                clearErr("description");
              }}
              onBlur={() => markTouched("description")}
            />
          </Field>
        </Grid>

        {/* Employee */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Employee" required error={getErr("employee")} delay={140}>
            <input
              className={`ct-input ${formData.employee ? "ct-filled" : ""} ${getErr("employee") ? "ct-error" : ""}`}
              placeholder="Full name"
              name="employee"
              value={formData.employee}
              onChange={(e) => {
                handleInputChange(e);
                clearErr("employee");
              }}
              onBlur={() => markTouched("employee")}
            />
          </Field>
        </Grid>

        {/* Due Date */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Due Date" required error={getErr("endDate")} delay={170}>
            <input
              type="date"
              className={`ct-input ${formData.endDate ? "ct-filled" : ""} ${getErr("endDate") ? "ct-error" : ""}`}
              name="endDate"
              value={formData.endDate}
              onChange={(e) => {
                handleInputChange(e);
                clearErr("endDate");
              }}
              onBlur={() => markTouched("endDate")}
            />
          </Field>
        </Grid>

        {/* ── Classification ── */}
        <Grid size={{ xs: 12 }}>
          <div className="ct-section-label" style={{ animationDelay: "200ms" }}>
            Classification
          </div>
        </Grid>

        {/* Category */}
        <Grid size={{ xs: 12 }}>
          <Field label="Category" delay={220}>
            <div className="ct-category-group">
              {["Technical", "Payroll", "HR", "General"].map((cat) => (
                <CategoryChip
                  key={cat}
                  value={cat}
                  active={formData.category === cat}
                  onClick={(v) => synth("category", v)}
                />
              ))}
            </div>
          </Field>
        </Grid>

        {/* Priority */}
        <Grid size={{ xs: 12 }}>
          <Field label="Priority" delay={260}>
            <div className="ct-priority-group">
              {["High", "Medium", "Low"].map((p) => (
                <PriorityPill
                  key={p}
                  value={p}
                  active={formData.priority === p}
                  onClick={(v) => synth("priority", v)}
                />
              ))}
            </div>
          </Field>
        </Grid>
      </Grid>

      {/* ── Footer ── */}
      <div className="ct-footer">
        <button className="ct-btn ct-btn-cancel" onClick={handleClose}>
          Cancel
        </button>
        <button className="ct-btn ct-btn-save" onClick={handleSubmit}>
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Create Ticket
        </button>
      </div>
    </div>
  );
};

export default CreateTicket;
