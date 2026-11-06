// import React from "react";
// import {
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   Box
// } from "@mui/material";

// const Create = ({ formData, handleInputChange, handleCreate, handleClose }) => {
//   return (
//     <Grid container spacing={2}>
//       <Grid size={{xs:12, sm:6}}>
//         <TextField
//           label="Income Name"
//           fullWidth
//           value={formData.name}
//           onChange={(e) => handleInputChange("name", e.target.value)}
//         />
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <FormControl fullWidth>
//           <InputLabel>Type</InputLabel>
//           <Select 
//             value={formData.type}
//             onChange={(e) => handleInputChange("type", e.target.value)}
//             label="Type"
//           >
//             <MenuItem value="Recurring">Recurring</MenuItem>
//             <MenuItem value="One-time">One-time</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <TextField
//           label="Amount"
//           type="number"
//           fullWidth
//           value={formData.amount}
//           onChange={(e) => handleInputChange("amount", e.target.value)}
//         />
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <FormControl fullWidth>
//           <InputLabel>Category</InputLabel>
//           <Select 
//             value={formData.category}
//             onChange={(e) => handleInputChange("category", e.target.value)}
//             label="Category"
//           >
//             <MenuItem value="Software">Software</MenuItem>
//             <MenuItem value="Service">Service</MenuItem>
//             <MenuItem value="Education">Education</MenuItem>
//             <MenuItem value="Marketing">Marketing</MenuItem>
//             <MenuItem value="Sales">Sales</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <FormControl fullWidth>
//           <InputLabel>Branch</InputLabel>
//           <Select 
//             value={formData.branch}
//             onChange={(e) => handleInputChange("branch", e.target.value)}
//             label="Branch"
//           >
//             <MenuItem value="Head Office">Head Office</MenuItem>
//             <MenuItem value="Delhi Branch">Delhi Branch</MenuItem>
//             <MenuItem value="Bangalore Branch">Bangalore Branch</MenuItem>
//             <MenuItem value="Chennai Branch">Chennai Branch</MenuItem>
//             <MenuItem value="Kolkata Branch">Kolkata Branch</MenuItem>
//             <MenuItem value="Hyderabad Branch">Hyderabad Branch</MenuItem>
//             <MenuItem value="Pune Branch">Pune Branch</MenuItem>
//             <MenuItem value="Ahmedabad Branch">Ahmedabad Branch</MenuItem>
//             <MenuItem value="Jaipur Branch">Jaipur Branch</MenuItem>
//             <MenuItem value="Kochi Branch">Kochi Branch</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <TextField
//           label="Date"
//           type="date"
//           fullWidth
//           value={formData.date}
//           onChange={(e) => handleInputChange("date", e.target.value)}
//           InputLabelProps={{ shrink: true }}
//         />
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <TextField
//           label="Client Name"
//           fullWidth
//           value={formData.client}
//           onChange={(e) => handleInputChange("client", e.target.value)}
//         />
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <TextField
//           label="Project Name"
//           fullWidth
//           value={formData.project}
//           onChange={(e) => handleInputChange("project", e.target.value)}
//         />
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <FormControl fullWidth>
//           <InputLabel>Payment Method</InputLabel>
//           <Select 
//             value={formData.paymentMethod}
//             onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
//             label="Payment Method"
//           >
//             <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
//             <MenuItem value="Cheque">Cheque</MenuItem>
//             <MenuItem value="Cash">Cash</MenuItem>
//             <MenuItem value="UPI">UPI</MenuItem>
//             <MenuItem value="Credit Card">Credit Card</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <TextField
//           label="Due Date"
//           type="date"
//           fullWidth
//           value={formData.dueDate}
//           onChange={(e) => handleInputChange("dueDate", e.target.value)}
//           InputLabelProps={{ shrink: true }}
//         />
//       </Grid>
//       <Grid size={{xs:12, sm:6}}>
//         <TextField
//           label="Received Date"
//           type="date"
//           fullWidth
//           value={formData.receivedDate}
//           onChange={(e) => handleInputChange("receivedDate", e.target.value)}
//           InputLabelProps={{ shrink: true }}
//         />
//       </Grid>
//       <Grid size={{xs:12}}>
//         <TextField
//           label="Description"
//           multiline
//           rows={3}
//           fullWidth
//           value={formData.description}
//           onChange={(e) => handleInputChange("description", e.target.value)}
//         />
//       </Grid>
//       <Grid size={{xs:12}}>
//         <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
//           <button className="hrms-btn hrms-btn-secondary" onClick={handleClose}>
//             Cancel
//           </button>
//           <button className="hrms-btn hrms-btn-primary" onClick={handleCreate}>
//             Save
//           </button>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default Create;






import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

/* ─── Keyframes ──────────────────────────────────────────────── */
const slideInRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`;

const fadeUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const floatBubble = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-18px) scale(1.04); }
`;

/* ─── Styled wrappers ────────────────────────────────────────── */
const PanelRoot = styled(Box)({
  position: "relative",
  background: "linear-gradient(145deg, #ffffff 0%, #f0f7ff 50%, #fef9f0 100%)",
  borderRadius: "28px",
  padding: "2.5rem 2.8rem 2rem",
  boxShadow:
    "0 32px 80px rgba(99,102,241,.13), 0 8px 24px rgba(0,0,0,.07)",
  overflow: "hidden",
  animation: `${slideInRight} 0.55s cubic-bezier(0.22,1,0.36,1) both`,
  fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 60% 40% at 80% 10%, rgba(129,140,248,.18) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(251,191,36,.13) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
});

const Bubble = styled(Box)(({ size, top, left, color, delay }) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  background: color,
  top,
  left,
  opacity: 0.45,
  filter: "blur(2px)",
  animation: `${floatBubble} ${3 + Math.random()}s ease-in-out ${delay} infinite`,
  pointerEvents: "none",
  zIndex: 0,
}));

const HeaderRow = styled(Box)({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  marginBottom: "2rem",
});

const IconBadge = styled(Box)({
  width: 52,
  height: 52,
  borderRadius: 16,
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 8px 20px rgba(99,102,241,.35)",
  fontSize: "1.45rem",
  flexShrink: 0,
});

const TitleText = styled(Box)({
  "& h2": {
    margin: 0,
    fontSize: "1.35rem",
    fontWeight: 800,
    background: "linear-gradient(90deg, #1e1b4b, #6366f1, #a78bfa)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${shimmer} 3.5s linear infinite`,
  },
  "& p": {
    margin: "2px 0 0",
    fontSize: "0.78rem",
    color: "#6b7280",
    letterSpacing: "0.03em",
  },
});

const SectionLabel = styled(Box)({
  fontSize: "0.68rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#9ca3af",
  marginBottom: "0.6rem",
  marginTop: "0.4rem",
});

const FieldWrap = styled(Box)(({ delay }) => ({
  animation: `${fadeUp} 0.5s ease both`,
  animationDelay: delay || "0s",
  position: "relative",
  zIndex: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: 14,
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(8px)",
    transition: "box-shadow 0.25s, transform 0.2s",
    "&:hover": {
      boxShadow: "0 4px 18px rgba(99,102,241,.15)",
      transform: "translateY(-1px)",
    },
    "&.Mui-focused": {
      boxShadow: "0 6px 24px rgba(99,102,241,.22)",
      transform: "translateY(-2px)",
    },
    "& fieldset": {
      borderColor: "rgba(99,102,241,.25)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(99,102,241,.5) !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1 !important",
      borderWidth: "2px !important",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.83rem",
    color: "#6b7280",
    "&.Mui-focused": { color: "#6366f1" },
  },
  "& .MuiSelect-select, & .MuiInputBase-input": {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.88rem",
  },
}));

const Divider = styled(Box)({
  height: 1,
  background:
    "linear-gradient(90deg, transparent, rgba(99,102,241,.2), transparent)",
  margin: "0.8rem 0 1rem",
  position: "relative",
  zIndex: 1,
});

const CancelBtn = styled("button")({
  padding: "0.65rem 1.5rem",
  borderRadius: 12,
  border: "2px solid rgba(99,102,241,.3)",
  background: "transparent",
  color: "#6366f1",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "all 0.2s",
  letterSpacing: "0.02em",
  "&:hover": {
    background: "rgba(99,102,241,.07)",
    borderColor: "#6366f1",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 14px rgba(99,102,241,.15)",
  },
  "&:active": { transform: "translateY(0)" },
});

const SaveBtn = styled("button")({
  padding: "0.65rem 2rem",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#fff",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "all 0.25s",
  letterSpacing: "0.02em",
  boxShadow: "0 6px 20px rgba(99,102,241,.38)",
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 28px rgba(99,102,241,.48)",
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  },
  "&:active": { transform: "translateY(0)", boxShadow: "0 4px 12px rgba(99,102,241,.3)" },
});

/* ─── Field configs ──────────────────────────────────────────── */
const SECTION_BASIC = ["name", "type", "amount", "category"];
const SECTION_BRANCH = ["branch", "date", "client", "project"];
const SECTION_PAYMENT = ["paymentMethod", "dueDate", "receivedDate"];

const TYPE_OPTS    = ["Recurring", "One-time"];
const CAT_OPTS     = ["Software", "Service", "Education", "Marketing", "Sales"];
const BRANCH_OPTS  = ["Head Office","Delhi Branch","Bangalore Branch","Chennai Branch","Kolkata Branch","Hyderabad Branch","Pune Branch","Ahmedabad Branch","Jaipur Branch","Kochi Branch"];
const PM_OPTS      = ["Bank Transfer","Cheque","Cash","UPI","Credit Card"];

const fieldMeta = {
  name:          { label: "Income Name",     type: "text" },
  type:          { label: "Type",            type: "select", opts: TYPE_OPTS },
  amount:        { label: "Amount (₹)",      type: "number" },
  category:      { label: "Category",        type: "select", opts: CAT_OPTS },
  branch:        { label: "Branch",          type: "select", opts: BRANCH_OPTS },
  date:          { label: "Date",            type: "date" },
  client:        { label: "Client Name",     type: "text" },
  project:       { label: "Project Name",    type: "text" },
  paymentMethod: { label: "Payment Method",  type: "select", opts: PM_OPTS },
  dueDate:       { label: "Due Date",        type: "date" },
  receivedDate:  { label: "Received Date",   type: "date" },
};

/* ─── Component ──────────────────────────────────────────────── */
const Create = ({ formData, handleInputChange, handleCreate, handleClose }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const renderField = (key, delay) => {
    const meta = fieldMeta[key];
    if (!meta) return null;

    return (
      <Grid size={{ xs: 12, sm: 6 }} key={key}>
        <FieldWrap delay={delay}>
          {meta.type === "select" ? (
            <FormControl fullWidth size="small">
              <InputLabel>{meta.label}</InputLabel>
              <Select
                value={formData[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                label={meta.label}
              >
                {meta.opts.map((o) => (
                  <MenuItem key={o} value={o} sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.86rem" }}>
                    {o}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              label={meta.label}
              type={meta.type}
              fullWidth
              size="small"
              value={formData[key] || ""}
              onChange={(e) => handleInputChange(key, e.target.value)}
              InputLabelProps={meta.type === "date" ? { shrink: true } : undefined}
            />
          )}
        </FieldWrap>
      </Grid>
    );
  };

  return (
    <PanelRoot>
      {/* Decorative bubbles */}
      <Bubble size="90px"  top="-30px"  left="-20px" color="rgba(129,140,248,.35)" delay="0s" />
      <Bubble size="60px"  top="20%"    left="92%"   color="rgba(251,191,36,.4)"   delay="0.8s" />
      <Bubble size="50px"  top="75%"    left="-10px" color="rgba(52,211,153,.3)"   delay="1.4s" />
      <Bubble size="40px"  top="88%"    left="85%"   color="rgba(248,113,113,.3)"  delay="0.4s" />

      {/* Header */}
      <HeaderRow>
        <IconBadge>💰</IconBadge>
        <TitleText>
          <h2>Add New Income</h2>
          <p>Fill in the details to record a new income entry</p>
        </TitleText>
      </HeaderRow>

      <Grid container spacing={2}>
        {/* Section 1 */}
        <Grid size={{ xs: 12 }}>
          <SectionLabel>📋 Basic Details</SectionLabel>
        </Grid>
        {SECTION_BASIC.map((key, i) => renderField(key, `${0.05 + i * 0.07}s`))}

        <Grid size={{ xs: 12 }}><Divider /></Grid>

        {/* Section 2 */}
        <Grid size={{ xs: 12 }}>
          <SectionLabel>🏢 Branch & Project</SectionLabel>
        </Grid>
        {SECTION_BRANCH.map((key, i) => renderField(key, `${0.3 + i * 0.07}s`))}

        <Grid size={{ xs: 12 }}><Divider /></Grid>

        {/* Section 3 */}
        <Grid size={{ xs: 12 }}>
          <SectionLabel>💳 Payment Details</SectionLabel>
        </Grid>
        {SECTION_PAYMENT.map((key, i) => renderField(key, `${0.55 + i * 0.07}s`))}

        {/* Description */}
        <Grid size={{ xs: 12 }}>
          <FieldWrap delay="0.78s">
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              size="small"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Add any additional notes about this income..."
            />
          </FieldWrap>
        </Grid>

        {/* Actions */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "flex-end",
              marginTop: "0.5rem",
              position: "relative",
              zIndex: 1,
              animation: `${fadeUp} 0.5s ease 0.85s both`,
            }}
          >
            <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
            <SaveBtn onClick={handleCreate}>
              <span>✦</span> Save Income
            </SaveBtn>
          </Box>
        </Grid>
      </Grid>
    </PanelRoot>
  );
};

export default Create;
