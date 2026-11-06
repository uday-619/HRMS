"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

// Style injection for animations and form styling
const injectEditStyles = () => {
  if (document.getElementById("et-styles")) return;
  const s = document.createElement("style");
  s.id = "et-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    /* ── animations ── */
    @keyframes et-fade-in      { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes et-field-focus  { 0%{transform:translateY(0)} 50%{transform:translateY(-2px)} 100%{transform:translateY(0)} }

    /* ── root container ── */
    .et-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1e293b;
    }

    /* ── form container ── */
    .et-form-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      animation: et-fade-in .5s cubic-bezier(.22,1,.36,1);
    }

    /* ── MUI TextField overrides ── */
    .et-text-field .MuiOutlinedInput-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #ffffff;
      border-radius: 10px;
      font-size: 0.875rem;
      transition: all .25s ease;
    }

    .et-text-field .MuiOutlinedInput-root fieldset {
      border-color: #e2e8f0;
      border-width: 1px;
    }

    .et-text-field .MuiOutlinedInput-root:hover fieldset {
      border-color: #cbd5e1;
    }

    .et-text-field .MuiOutlinedInput-root.Mui-focused fieldset {
      border-color: #818cf8;
      box-shadow: 0 0 0 4px rgba(99,102,241,.10);
      border-width: 1px;
    }

    .et-text-field .MuiOutlinedInput-input {
      color: #1e293b;
      font-weight: 500;
    }

    .et-text-field .MuiOutlinedInput-input::placeholder {
      color: #cbd5e1;
      opacity: 1;
    }

    .et-text-field .MuiInputBase-input:disabled {
      background: #f1f5f9;
      color: #94a3b8;
      -webkit-text-fill-color: #94a3b8;
    }

    .et-text-field .MuiInputLabel-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #64748b;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .et-text-field .MuiInputLabel-root.Mui-focused {
      color: #4f46e5;
    }

    /* ── Form Control (Select) overrides ── */
    .et-form-control .MuiOutlinedInput-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #ffffff;
      border-radius: 10px;
      font-size: 0.875rem;
      transition: all .25s ease;
    }

    .et-form-control .MuiOutlinedInput-root fieldset {
      border-color: #e2e8f0;
      border-width: 1px;
    }

    .et-form-control .MuiOutlinedInput-root:hover fieldset {
      border-color: #cbd5e1;
    }

    .et-form-control .MuiOutlinedInput-root.Mui-focused fieldset {
      border-color: #818cf8;
      box-shadow: 0 0 0 4px rgba(99,102,241,.10);
      border-width: 1px;
    }

    .et-form-control .MuiInputLabel-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #64748b;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .et-form-control .MuiInputLabel-root.Mui-focused {
      color: #4f46e5;
    }

    .et-form-control .MuiOutlinedInput-input {
      color: #1e293b;
      font-weight: 500;
    }

    /* ── MUI Menu styling ── */
    .et-form-control .MuiPaper-root {
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 8px 24px rgba(16,24,40,.10);
      margin-top: 4px;
    }

    .et-form-control .MuiMenuItem-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1e293b;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all .15s ease;
    }

    .et-form-control .MuiMenuItem-root:hover {
      background: #f0f4ff;
      color: #4f46e5;
    }

    .et-form-control .MuiMenuItem-root.Mui-selected {
      background: #eef2ff;
      color: #4f46e5;
      font-weight: 700;
    }

    .et-form-control .MuiMenuItem-root.Mui-selected:hover {
      background: #e0e7ff;
    }

    /* ── Grid spacing ── */
    .et-grid-container {
      display: grid;
      gap: 1rem;
    }

    /* ── Button group ── */
    .et-button-group {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
      animation: et-fade-in .6s .15s cubic-bezier(.22,1,.36,1) both;
    }

    /* ── Buttons ── */
    .et-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 700;
      letter-spacing: .01em;
      cursor: pointer;
      transition: all .2s ease;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .et-btn-secondary {
      background: #ffffff;
      color: #64748b;
      border: 1.5px solid #e2e8f0;
    }

    .et-btn-secondary:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16,24,40,.08);
    }

    .et-btn-secondary:active {
      transform: translateY(0);
    }

    .et-btn-primary {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(79,70,229,.25);
    }

    .et-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(79,70,229,.32);
      filter: brightness(1.04);
    }

    .et-btn-primary:active {
      transform: translateY(0);
    }

    /* ── Field animation ── */
    .et-grid-item {
      animation: et-fade-in .45s cubic-bezier(.22,1,.36,1) both;
    }

    .et-grid-item:nth-child(1) { animation-delay: 50ms; }
    .et-grid-item:nth-child(2) { animation-delay: 100ms; }
    .et-grid-item:nth-child(3) { animation-delay: 150ms; }
    .et-grid-item:nth-child(4) { animation-delay: 200ms; }
    .et-grid-item:nth-child(5) { animation-delay: 250ms; }
    .et-grid-item:nth-child(6) { animation-delay: 300ms; }
    .et-grid-item:nth-child(7) { animation-delay: 350ms; }
    .et-grid-item:nth-child(8) { animation-delay: 400ms; }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .et-button-group {
        flex-direction: column;
      }

      .et-btn {
        width: 100%;
      }
    }
  `;
  document.head.appendChild(s);
};

const EditTicket = ({ formData, handleInputChange, handleUpdate, handleClose, selectedTicket }) => {
  const [mounted, setMounted] = useState(false);
  const [localStatus, setLocalStatus] = useState(selectedTicket?.status || "Open");
  const [localAssignedTo, setLocalAssignedTo] = useState(selectedTicket?.assignedTo || "");

  useEffect(() => {
    injectEditStyles();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleStatusChange = (e) => {
    setLocalStatus(e.target.value);
  };

  const handleAssignedToChange = (e) => {
    setLocalAssignedTo(e.target.value);
  };

  const handleSubmit = () => {
    // Update the selected ticket with status and assignedTo before calling handleUpdate
    const updatedFormData = {
      ...formData,
      status: localStatus,
      assignedTo: localAssignedTo,
    };
    handleUpdate(updatedFormData);
  };

  return (
    <Box className="et-root et-form-container">
      <Grid container spacing={2} className="et-grid-container">
        {/* Ticket Code - Read Only */}
        <Grid item xs={12} className="et-grid-item">
          <TextField
            fullWidth
            label="Ticket Code"
            value={selectedTicket?.code || ""}
            className="et-text-field"
            disabled
            variant="outlined"
          />
        </Grid>

        {/* Title */}
        <Grid item xs={12} className="et-grid-item">
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="et-text-field"
            variant="outlined"
            required
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12} className="et-grid-item">
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            className="et-text-field"
            variant="outlined"
          />
        </Grid>

        {/* Employee */}
        <Grid item xs={12} sm={6} className="et-grid-item">
          <TextField
            fullWidth
            label="Employee"
            name="employee"
            value={formData.employee}
            onChange={handleInputChange}
            className="et-text-field"
            variant="outlined"
            required
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6} className="et-grid-item">
          <FormControl fullWidth className="et-form-control">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              label="Category"
            >
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Payroll">Payroll</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="General">General</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Priority */}
        <Grid item xs={12} sm={6} className="et-grid-item">
          <FormControl fullWidth className="et-form-control">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              label="Priority"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Status */}
        <Grid item xs={12} sm={6} className="et-grid-item">
          <FormControl fullWidth className="et-form-control">
            <InputLabel>Status</InputLabel>
            <Select
              value={localStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Assigned To */}
        <Grid item xs={12} sm={6} className="et-grid-item">
          <TextField
            fullWidth
            label="Assigned To"
            value={localAssignedTo}
            onChange={handleAssignedToChange}
            className="et-text-field"
            variant="outlined"
          />
        </Grid>

        {/* Due Date */}
        <Grid item xs={12} sm={6} className="et-grid-item">
          <TextField
            fullWidth
            label="Due Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            className="et-text-field"
            variant="outlined"
          />
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box className="et-button-group">
        <button className="et-btn et-btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button className="et-btn et-btn-primary" onClick={handleSubmit}>
          Update Ticket
        </button>
      </Box>
    </Box>
  );
};

export default EditTicket;
