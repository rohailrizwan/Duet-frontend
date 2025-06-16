import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  InputBase,
  Badge,
  Collapse,
  CssBaseline,
  Divider,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import AvatarComponent from '../../Components/Avatar';
import { Settings, ExpandLess, ExpandMore, Home, Work, Person, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { FacultyTab, StudentTab, AlumniTab } from '../../routes/Tabs';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/duetlogo.png'
import { useSelector } from 'react-redux';
import NotificationModal from '../../Pages/Notification';
const drawerWidth = 260;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [notifymodal, setnotifymodal] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('Home');
  const [activeTab, setActiveTab] = React.useState([]);
  const [notifications, setNotifications] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();


  const user=useSelector((state)=>state?.auth?.user)

  useEffect(() => {
    console.log(user,"user");
    
    if (user?.role === 'faculty') setActiveTab(FacultyTab);
    else if (user?.role === 'user') setActiveTab(StudentTab);
    else if (user?.role === 'alumni') setActiveTab(AlumniTab);
  }, [user]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleItemClick = (item, path) => {
    setSelectedItem(item);
    navigate(path);
  };

  const drawer = (
    <div>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2,display:"flex",justifyContent:"center" }}>
        <Box
          component="img"
          src={logo} // Replace with your logo path
          alt="Logo"
          sx={{ height: '100px', width: '100px',cursor:"pointer" }}
          onClick={()=>navigate('/')}
        />
      </Box>
      <Divider />
      <List sx={{ pt: 2 }}>
        {activeTab.map((item) => (
          item?.isvisible && (
            <ListItem
              key={item.label}
              disablePadding
              onClick={() => handleItemClick(item.label, item.path)}
            >
              <ListItemButton
                sx={{
                  '&:hover': { backgroundColor: '#f0f2f5' },
                  backgroundColor: selectedItem === item.label ? '#e7f3ff' : 'transparent',
                  borderRadius: '8px',
                  margin: '4px 8px',
                  padding: '12px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <ListItemIcon sx={{ color: selectedItem === item.label ? '#1877f2' : '#1a3c34', minWidth: '40px' }}>
                  {item.icon || <Home />}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: selectedItem === item.label ? '#1877f2' : '#1a3c34',
                    '& .MuiTypography-root': { fontSize: '1rem', fontWeight: 500 },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
      <Divider />
      <List sx={{ pt: 2 }}>
        <ListItem
          disablePadding
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <ListItemButton
            sx={{
              '&:hover': { backgroundColor: '#f0f2f5' },
              backgroundColor: selectedItem === 'Settings' ? '#e7f3ff' : 'transparent',
              borderRadius: '8px',
              margin: '4px 8px',
              padding: '12px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: selectedItem === 'Settings' ? '#1877f2' : '#1a3c34', minWidth: '40px' }}>
              <Settings />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              sx={{
                color: selectedItem === 'Settings' ? '#1877f2' : '#1a3c34',
                '& .MuiTypography-root': { fontSize: '1rem', fontWeight: 500 },
              }}
            />
            {settingsOpen ? (
              <ExpandLess sx={{ color: selectedItem === 'Settings' ? '#1877f2' : '#1a3c34' }} />
            ) : (
              <ExpandMore sx={{ color: selectedItem === 'Settings' ? '#1877f2' : '#1a3c34' }} />
            )}
          </ListItemButton>
        </ListItem>
        <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              disablePadding
              onClick={() => handleItemClick('Change Password', '/profile/ChangePassword')}
            >
              <ListItemButton sx={{ pl: 4, '&:hover': { backgroundColor: '#f0f2f5' }, borderRadius: '8px', margin: '4px 8px', transition: 'background-color 0.3s ease' }}>
                <ListItemIcon sx={{ color: '#1a3c34', minWidth: '40px' }}>
                  <Work />
                </ListItemIcon>
                <ListItemText
                  primary="Change Password"
                  sx={{ color: '#1a3c34', '& .MuiTypography-root': { fontSize: '0.95rem', fontWeight: 400 } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => handleItemClick('Update Profile', '/profile/updateprofile')}
            >
              <ListItemButton sx={{ pl: 4, '&:hover': { backgroundColor: '#f0f2f5' }, borderRadius: '8px', margin: '4px 8px', transition: 'background-color 0.3s ease' }}>
                <ListItemIcon sx={{ color: '#1a3c34', minWidth: '40px' }}>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary="Update Profile"
                  sx={{ color: '#1a3c34', '& .MuiTypography-root': { fontSize: '0.95rem', fontWeight: 400 } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f0f2f5' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: '#ffffff',
          color: '#1a3c34',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '64px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Space Name and Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" noWrap sx={{ fontWeight: 600, color: '#1a3c34', fontFamily: '"Roboto", sans-serif' }}>
              {user?.role === 'user' ? 'Student' : user?.role === 'faculty' ? 'Faculty' : user?.role === 'alumni' ? 'Alumni' : ''} Space
            </Typography>
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              color="inherit"
              sx={{
                '&:hover': { backgroundColor: '#f0f2f5', transform: 'scale(1.1)' },
                transition: 'transform 0.2s ease, background-color 0.3s ease',
              }}
            >
              <Badge badgeContent={4} color="error">
                <ChatIcon sx={{ color: '#1a3c34',cursor:"pointer" }} onClick={()=>navigate('/profile/chat')}/>
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                '&:hover': { backgroundColor: '#f0f2f5', transform: 'scale(1.1)' },
                transition: 'transform 0.2s ease, background-color 0.3s ease',
              }}
            >
              <Badge badgeContent={notifications?.length} color="error">
                <NotificationsIcon sx={{ color: '#1a3c34' ,cursor:"pointer"}} onClick={()=>setnotifymodal(true)}/>
              </Badge>
            </IconButton>
            <Box
              sx={{
                '&:hover': { transform: 'scale(1.1)' },
                transition: 'transform 0.2s ease',
              }}
            >
              <AvatarComponent user={true} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: '#ffffff',
              boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: '#ffffff',
              boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt:0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'white',
          minHeight: '100vh',
          // borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          mt: { xs: 8, sm: 7 },
          width:"100%"
        }}
      >
        <Outlet />
      </Box>
    <NotificationModal open={notifymodal} setOpen={setnotifymodal} notifications ={notifications} setNotifications ={setNotifications}/>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;