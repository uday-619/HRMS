// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
// } from "@mui/material";

// const ViewBranch = ({ selectedBranch, handleClose, getStatusColor }) => {
//   if (!selectedBranch) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
//         <Typography>No branch selected</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
//       <Grid container spacing={2}>
//           <Grid  size={{xs:12, md:6}}>
//           <Box>
//             <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Branch ID:</Typography>
//             <Typography>{selectedBranch.id || "N/A"}</Typography>
//           </Box>
//         </Grid>
//         <Grid  size={{xs:12, md:6}}>
//           <Box>
//             <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Branch Name:</Typography>
//             <Typography>{selectedBranch.branchName || "N/A"}</Typography>
//           </Box>
//         </Grid>
//         <Grid  size={{xs:12, md:6}}>
//           <Box>
//             <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Branch Location:</Typography>
//             <Typography>{selectedBranch.branchLocation || "N/A"}</Typography>
//           </Box>
//         </Grid>
//             <Grid  size={{xs:12, md:6}}>
//           <Box>
//             <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Status:</Typography>
//             <Box className={`hrms-badge ${getStatusColor ? getStatusColor(selectedBranch.status) : 'hrms-badge-success'}`}>
//               {selectedBranch.status || "N/A"}
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ViewBranch;


"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Row = ({ label, children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: "9px",
      borderBottom: "0.5px solid",
      borderColor: "divider",
      fontSize: 13,
      "&:last-child": { borderBottom: "none" },
    }}
  >
    <Typography sx={{ fontSize: 13, fontWeight: 500, color: "text.secondary" }}>{label}</Typography>
    <Box sx={{ textAlign: "right" }}>{children}</Box>
  </Box>
);

const StatusBadge = ({ status }) => {
  const isActive = status === "Active";
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        px: "9px",
        py: "3px",
        borderRadius: "99px",
        fontSize: 11,
        fontWeight: 500,
        background: isActive ? "#EAF3DE" : "#FCEBEB",
        color: isActive ? "#3B6D11" : "#A32D2D",
        "&::before": {
          content: '""',
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: isActive ? "#639922" : "#E24B4A",
          display: "inline-block",
        },
      }}
    >
      {status}
    </Box>
  );
};

const ViewBranch = ({ selectedBranch, handleClose }) => {
  if (!selectedBranch) return null;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Row label="Branch ID">
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: "text.secondary" }}>
            {selectedBranch.id}
          </Typography>
        </Row>
        <Row label="Branch Name">
          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{selectedBranch.branchName}</Typography>
        </Row>
        <Row label="Location">
          <Typography sx={{ fontSize: 13 }}>{selectedBranch.branchLocation}</Typography>
        </Row>
        <Row label="Status">
          <StatusBadge status={selectedBranch.status} />
        </Row>
        <Row label="Created On">
          <Typography sx={{ fontSize: 13 }}>{selectedBranch.createdAt}</Typography>
        </Row>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1, borderTop: "0.5px solid", borderColor: "divider" }}>
        <Button variant="outlined" size="small" onClick={handleClose}>Close</Button>
      </Box>
    </Box>
  );
};

export default ViewBranch;
