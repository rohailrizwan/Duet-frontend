import React, { useState, useEffect } from 'react';
import {
  useTheme,
  useMediaQuery,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Settings, ExpandLess, ExpandMore, Home, Lock, } from '@mui/icons-material';
import Person2Icon from '@mui/icons-material/Person2';
import { FacultyTab, StudentTab, AlumniTab } from '../../routes/Tabs';
import { Outlet, useNavigate } from 'react-router-dom';
import AvatarComponent from '../../Components/Avatar';
import Collapse from '@mui/material/Collapse';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationModal from '../../Pages/Notification';
const drawerWidth = 240;

function ProtectedLayout({ type, user }) {
  const [activeTab, setActiveTab] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate()
  useEffect(() => {
    if (type === 'Faculty') setActiveTab(FacultyTab);
    else if (type === 'Student') setActiveTab(StudentTab);
    else if (type === 'Alumni') setActiveTab(AlumniTab);
  }, [type]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        background: `linear-gradient(to right, #1e3c72, #2a5298)`,
        color: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px 0',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }} className="font_poppins">
          {type} Space
        </Typography>
        <List>
          {activeTab.map((item) => (
            item?.isvisble && (
              <ListItem
                button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{ '&:hover': { backgroundColor: '#1f4692', cursor: "pointer" } }}
                className="font_poppins"
              >
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: 'white' }} />
              </ListItem>
            )
          ))}
        </List>
      </Box>
      <Box sx={{ padding: '10px', borderTop: '1px solid #ffffff50' }}>
        <List>
          <ListItem button onClick={() => setSettingsOpen(!settingsOpen)}>
            <ListItemIcon sx={{ color: 'white' }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: 'white' }} />
            {settingsOpen ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
          </ListItem>

          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4, cursor: "pointer" }} onClick={() => navigate('/profile/ChangePassword')}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <Lock />
                </ListItemIcon>
                <ListItemText primary="Change Password" className="font_poppins" sx={{ color: 'white' }} />
              </ListItem>
              <ListItem button sx={{ pl: 4, cursor: "pointer" }} onClick={() => navigate('/profile/updateprofile')}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <Person2Icon />
                </ListItemIcon>
                <ListItemText primary="Update Profile" className="font_poppins" sx={{ color: 'white' }} />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', width: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
           background: `linear-gradient(to right, #1e3c72, #2a5298)`,
          zIndex: 1300,
          boxShadow: 'none',
          pl: isMobile ? 2 : `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Left Title */}
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            {type} Space
          </Typography>

          {/* Right Side Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => {
              setAnchorEl(event.currentTarget);
              setOpen(true)
            }}>
              <NotificationsIcon sx={{ color: 'white' }} />
            </IconButton>
            <AvatarComponent user={true} />
          </Box>
        </Toolbar>
      </AppBar>


      {/* Side Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            overflowX: 'hidden',
            boxSizing: 'border-box',
            display: isMobile ? 'block' : 'flex',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: '100px 20px 20px 20px',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          width: '100%',
          overflowY: 'auto'
        }}
      >
        <Outlet />
      </Box>
      <NotificationModal open={open} setOpen={setOpen} anchorEl={anchorEl}/>
    </Box>
  );
}

export default ProtectedLayout;
