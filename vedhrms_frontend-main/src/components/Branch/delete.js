// import React from "react";
// import { Box, Typography } from "@mui/material";

// const DeleteBranch = ({ selectedBranch, handleDelete, handleClose }) => {
//   return (
//     <Box sx={{ padding: "1rem 0" }}>
//       <Typography variant="body1" sx={{ mb: 2, color: "#374151", fontSize: "0.95rem" }}>
//         Are you sure you want to delete the branch{" "}
//         <Typography component="span" sx={{ fontWeight: 600, color: "#1f2937" }}>
//           &quot;{selectedBranch?.branchName}&quot;
//         </Typography>
//         ?
//       </Typography>
//       <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
//         <button className="hrms-btn hrms-btn-secondary" onClick={handleClose}>
//           Cancel
//         </button>
//         <button 
//           className="hrms-btn hrms-btn-danger" 
//           onClick={handleDelete}
//           style={{ backgroundColor: '#dc2626', color: 'white', border: '1px solid #dc2626' }}
//         >
//           Delete
//         </button>
//       </Box>
//     </Box>
//   );
// };

// export default DeleteBranch;



"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { WarningAmberOutlined } from "@mui/icons-material";

const DeleteBranch = ({ selectedBranch, handleDelete, handleClose }) => {
  if (!selectedBranch) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", py: 2, mb: 2 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#FCEBEB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
          }}
        >
          <WarningAmberOutlined sx={{ fontSize: 26, color: "#E24B4A" }} />
        </Box>
        <Typography sx={{ fontWeight: 500, fontSize: 15, mb: 0.75 }}>
          Delete {selectedBranch.branchName}?
        </Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.6, maxWidth: 260 }}>
          This action cannot be undone. The branch record will be permanently removed.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          pt: 1.5,
          borderTop: "0.5px solid",
          borderColor: "divider",
        }}
      >
        <Button variant="outlined" size="small" onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleDelete}
          sx={{ background: "#E24B4A", "&:hover": { background: "#A32D2D" } }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteBranch;
