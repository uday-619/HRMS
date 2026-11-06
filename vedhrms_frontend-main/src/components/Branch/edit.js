// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Grid,
// } from "@mui/material";

// const EditBranch = ({ handleUpdate, handleClose, selectedBranch }) => {
//   const [formData, setFormData] = useState({
//     branchName: "",
//     branchLocation: "",
//     status: "Active"
//   });

//   useEffect(() => {
//     if (selectedBranch) {
//       setFormData({
//         branchName: selectedBranch.branchName || "",
//         branchLocation: selectedBranch.branchLocation || "",
//         status: selectedBranch.status || "Active"
//       });
//     }
//   }, [selectedBranch]);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
//       <Grid container spacing={2}>
//         <Grid size={{xs:12, md:6}}>
//           <TextField
//             fullWidth
//             label="Branch Name"
//             name="branchName"
//             value={formData.branchName}
//             onChange={handleInputChange}
//             className="hrms-form-input"
//           />
//         </Grid>
//         <Grid size={{xs:12, md:6}}>
//           <TextField
//             fullWidth
//             label="Branch Location"
//             name="branchLocation"
//             value={formData.branchLocation}
//             onChange={handleInputChange}
//             className="hrms-form-input"
//           />
//         </Grid>
//         <Grid size={{xs:12, md:6}}>
//           <FormControl fullWidth>
//             <InputLabel>Status</InputLabel>
//             <Select
//               name="status"
//               value={formData.status}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="Active">Active</MenuItem>
//               <MenuItem value="Inactive">Inactive</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//       <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
//         <button className="hrms-btn hrms-btn-secondary" onClick={handleClose}>
//           Cancel
//         </button>
//         <button className="hrms-btn hrms-btn-primary" onClick={() => handleUpdate(formData)}>
//           Update
//         </button>
//       </Box>
//     </Box>
//   );
// };

// export default EditBranch;


"use client";

import React, { useState, useEffect } from "react";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, Button } from "@mui/material";

const EditBranch = ({ selectedBranch, handleUpdate, handleClose }) => {
  const [form, setForm] = useState({ branchName: "", branchLocation: "", status: "Active" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedBranch) {
      setForm({
        branchName: selectedBranch.branchName || "",
        branchLocation: selectedBranch.branchLocation || "",
        status: selectedBranch.status || "Active",
      });
    }
  }, [selectedBranch]);

  const validate = () => {
    const e = {};
    if (!form.branchName.trim()) e.branchName = "Branch name is required";
    if (!form.branchLocation.trim()) e.branchLocation = "Location is required";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    handleUpdate(form);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <TextField
          label="Branch Name"
          value={form.branchName}
          onChange={handleChange("branchName")}
          error={!!errors.branchName}
          helperText={errors.branchName}
          fullWidth
          size="small"
        />
        <TextField
          label="Location"
          value={form.branchLocation}
          onChange={handleChange("branchLocation")}
          error={!!errors.branchLocation}
          helperText={errors.branchLocation}
          fullWidth
          size="small"
        />
        <FormControl fullWidth size="small">
          <InputLabel>Status</InputLabel>
          <Select value={form.status} label="Status" onChange={handleChange("status")}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, pt: 1, borderTop: "0.5px solid", borderColor: "divider" }}>
        <Button variant="outlined" size="small" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" size="small" onClick={handleSubmit}>Save Changes</Button>
      </Box>
    </Box>
  );
};

export default EditBranch;
