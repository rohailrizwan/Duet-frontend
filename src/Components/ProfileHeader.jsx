import React from "react";
import { Typography, Box } from "@mui/material";

const UpdateProfileHeader = ({ text }) => {
  return (
    <Box sx={{ mb: 4, position: "relative" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="left"
        sx={{
          fontFamily: "Poppins, sans-serif",
          color: "#ffffff",
          background: "#3b5998", // Static gradient
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          position: "relative",
          display: "inline-block",
          "&:hover": {
            transform: "translateY(-1px)", // Minimal lift on hover
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)", // Slightly stronger shadow on hover
          },
          transition: "transform 0.3s ease, text-shadow 0.3s ease",
        }}
      >
        {text} Use the dynamic text prop
      </Typography>
    </Box>
  );
};

export default UpdateProfileHeader;
