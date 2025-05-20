import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const NewButton = ({
  title = "",
  handleFunction,
  fullWidth = false,
  height,
  width,
  endicon,
  type = "button",
  isloading = false,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      variant="outlined"
      type={type}
      className="font_poppins"
      onClick={handleFunction}
      endIcon={!isloading && endicon}
      fullWidth={fullWidth}
      disabled={isloading}
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
        ...sx,
      }}
      {...rest}
    >
      {isloading ? (
        <CircularProgress size={20} sx={{ color: 'white' }} />
      ) : (
        title
      )}
    </Button>
  );
};


const NewButton2 = ({
  title = "",
  handleFunction,
  fullWidth = false,
  height,
  width,
  endicon,
  fontsize,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      variant="outlined"
      className='font_poppins'
      type='submit'
      onClick={handleFunction}
      endIcon={endicon}
      sx={{
        // mt: 2,
        borderRadius: rest?.radius || 8,
        width: width || "auto",
        fontSize: fontsize || "",
        background: 'linear-gradient(to right, #1976d2, #2196f3)',
        color: '#fff',
        textTransform: 'none',
        fontWeight: 500,
        '&:hover': {
          background: 'linear-gradient(to right, #1565c0, #1e88e5)'
        }
      }}
      {...rest}
    >
      {title}
    </Button>
  );
};


export { NewButton, NewButton2 };
