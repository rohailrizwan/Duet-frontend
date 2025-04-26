import React, { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Button,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const AvatarComponent = ({ scrolled }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToProfile = () => {
    console.log("Go to Profile");
    navigate('/profile'); // or whatever your route is
    handleClose();
  };
  const handleHome = () => {
    navigate('/'); // or whatever your route is
    handleClose();
  };

  const handleLogout = () => {
    console.log("Logout");
    handleClose();
  };

  const isOnProfilePage = location.pathname.includes('profile');

  return (
    <>
      <div className='position-relative'>
        <IconButton onClick={handleAvatarClick} size="small">
          <Avatar sx={{ bgcolor: '#1976d2' }}></Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              backgroundColor: "#f5f9ff", // light bluish background
              color: "#0D47A1", // deep blue text
              '& .MuiMenuItem-root': {
                transition: 'all 0.3s ease',
              }
            },
          }}
        >
          <MenuItem onClick={isOnProfilePage ? handleHome : handleGoToProfile}>
            <ListItemIcon sx={{ color: "#0D47A1" }}>
              {isOnProfilePage ? <ArrowBackIosIcon fontSize="small" /> : <Person fontSize="small" />}
            </ListItemIcon>
            {isOnProfilePage ? 'Back To Home' : 'Go To Profile'}
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ color: "#0D47A1" }}>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

      </div>
    </>
  );
};

export default AvatarComponent;
