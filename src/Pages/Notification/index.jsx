import { Popover, Box, Typography } from "@mui/material";
import Colors from "../../assets/Style";

const NotificationModal = ({ open, setOpen,anchorEl }) => {
  const handleClose = () => setOpen(false);
  const notifications = [
    {
      image: "https://via.placeholder.com/40",
      name: "New Job Posting Available",
      description:
        "We are excited to announce a new job opening for a software developer. Apply now to join our growing team.",
      date: "2025-04-26",
    },
    {
      image: "https://via.placeholder.com/40",
      name: "Reminder: Meeting Tomorrow",
      description:
        "Don't forget about the meeting scheduled for tomorrow at 10 AM. It's going to be an important one.",
      date: "2025-04-25",
    },
    {
      image: "https://via.placeholder.com/40",
      name: "Event Reminder: Annual Conference",
      description:
        "The annual tech conference will be held next week. Mark your calendars and register early to secure your spot.",
      date: "2025-04-24",
    },
    {
      image: "https://via.placeholder.com/40",
      name: "New Course Launched",
      description:
        "A new course on Advanced React has been launched. Enroll now to upgrade your skills and boost your career prospects.",
      date: "2025-04-23",
    },
    {
      image: "https://via.placeholder.com/40",
      name: "System Maintenance Notification",
      description:
        "Our system will undergo scheduled maintenance this weekend. Some services may be temporarily unavailable.",
      date: "2025-04-22",
    },
  ];
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: 400,
          maxHeight: "70vh",
          overflowY: "auto",
          borderRadius: 2,
          p: 2,
          '&::-webkit-scrollbar': {
            width: '4px', // scrollbar ki width
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#e0e0e0', // scrollbar ka track (background)
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor:Colors?.PrimaryBlue, // scrollbar ka thumb (jo move karta hai)
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: Colors?.PrimaryBlue, // hover pe thoda dark blue
          },
        }
      }}
      
    >
      <Typography variant="h6" fontWeight={"bold"} className="font_poppins colorgradient" sx={{ mb: 2 }}>
        Notifications
      </Typography>

      {notifications.map((notification, index) => (
        <Box
          key={index}
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid #f0f0f0",
            pb: 2,
          }}
        >
          <img
            src={notification.image}
            alt="notification icon"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" fontWeight="600" className="font_poppins">
              {notification.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="font_poppins">
              {notification.description}
            </Typography>
            <Typography variant="caption" color="text.secondary" className="font_poppins">
              {notification.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Popover>
  );
};

export default NotificationModal;
