import React from 'react';
import { Button } from '@mui/material';

const NewButton = ({
  title = "",
  handleFunction,
  fullWidth = false,
  height,
  width,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      variant="outlined"
      className='font_poppins'
      onClick={handleFunction}
      sx={{
        borderRadius: "8px",
        color: "#fff",
        textTransform: "capitalize",
        fontSize: "16px",
        fontWeight: 500,
        padding: "8px 25px",
        height: height || "auto",
        width: width || "auto",
        border: "2px solid white",
        background: "linear-gradient(90deg, #1976d2 0%, #0d47a1 100%)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          background: "linear-gradient(90deg, #1565c0 0%, #0d47a1 100%)",
          color: "#ffffff",
          borderColor: "#0d47a1",
          transform: "scale(1.05)",
        },
        ...sx, // allow custom styling to be merged
      }}
      {...rest}
    >
      {title}
    </Button>
  );
};


export { NewButton };
