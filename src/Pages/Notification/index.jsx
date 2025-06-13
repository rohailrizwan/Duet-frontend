
import { Popover, Box, Typography, Button, Badge, IconButton } from "@mui/material"
import { MoreVert, Notifications } from "@mui/icons-material"
import Colors from "../../assets/Style"
import { useEffect, useState } from "react"
import io from "socket.io-client";
import { baseUrl } from "../../Config/axios";
import { useSelector } from "react-redux";

const NotificationModal = ({ open, setOpen, anchorEl }) => {
  const handleClose = () => setOpen(false)
  const user=useSelector((state)=>state?.auth?.user)

  const [notifications, setNotifications] = useState([]);

  const socket = io(baseUrl);

  // const notifications = [
  //   {
  //     image: "https://via.placeholder.com/40",
  //     name: "New Job Posting Available",
  //     description:
  //       "We are excited to announce a new job opening for a software developer. Apply now to join our growing team.",
  //     date: "2025-04-26",
  //     unread: true,
  //     type: "job",
  //   },
  //   {
  //     image: "https://via.placeholder.com/40",
  //     name: "Reminder: Meeting Tomorrow",
  //     description: "Don't forget about the meeting scheduled for tomorrow at 10 AM. It's going to be an important one.",
  //     date: "2025-04-25",
  //     unread: true,
  //     type: "reminder",
  //   },
  //   {
  //     image: "https://via.placeholder.com/40",
  //     name: "Event Reminder: Annual Conference",
  //     description:
  //       "The annual tech conference will be held next week. Mark your calendars and register early to secure your spot.",
  //     date: "2025-04-24",
  //     unread: false,
  //     type: "event",
  //   },
  //   {
  //     image: "https://via.placeholder.com/40",
  //     name: "New Course Launched",
  //     description:
  //       "A new course on Advanced React has been launched. Enroll now to upgrade your skills and boost your career prospects.",
  //     date: "2025-04-23",
  //     unread: false,
  //     type: "course",
  //   },
  //   {
  //     image: "https://via.placeholder.com/40",
  //     name: "System Maintenance Notification",
  //     description:
  //       "Our system will undergo scheduled maintenance this weekend. Some services may be temporarily unavailable.",
  //     date: "2025-04-22",
  //     unread: false,
  //     type: "system",
  //   },
  // ]
  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to socket server");
    });
    socket.emit("join", user?._id);

    socket.on("notification", (data) => {
      console.log("📨 New Notification received:", data);
    });

    return () => {
      return () => {
        socket.off("notification");
        socket.off("connect");
      };
    };
  }, []);

  // Get notification type color
  const getTypeColor = (type) => {
    switch (type) {
      case "job":
        return "#4CAF50"
      case "reminder":
        return "#2196F3"
      case "event":
        return "#FF9800"
      case "course":
        return "#9C27B0"
      case "system":
        return "#F44336"
      default:
        return Colors.PrimaryBlue
    }
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        elevation: 6,
        sx: {
          width: 400,
          maxHeight: "70vh",
          top:"65px !important",
          overflowY: "auto",
          borderRadius: 2,
          p: 0, // Removed padding to create a cleaner look
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e0e0e0",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: Colors?.PrimaryBlue,
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: Colors?.PrimaryBlue,
          },
          animation: "fadeIn 0.3s ease-out",
          "@keyframes fadeIn": {
            "0%": {
              opacity: 0,
              transform: "translateY(-20px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "1px solid #f0f0f0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Notifications sx={{ fontSize: 20, color: Colors?.PrimaryBlue }} />
        <Typography
          variant="h6"
          fontWeight={"bold"}
          className="font_poppins"
          sx={{
            background: `linear-gradient(45deg, ${Colors?.PrimaryBlue}, #6a11cb)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Notifications
        </Typography>
        <Badge badgeContent={2} color="error" sx={{ ml: 1 }} />
      </Box>

      {/* Notification List */}
      <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
        {notifications.map((notification, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              p: 2,
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: notification.unread ? "rgba(25, 118, 210, 0.04)" : "transparent",
              transition: "all 0.2s ease",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {/* Type indicator */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "4px",
                backgroundColor: getTypeColor(notification.type),
              }}
            />

            {/* Profile image with status indicator */}
            <Box sx={{ position: "relative" }}>
              <img
                src={notification.image || "/placeholder.svg"}
                alt="notification icon"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${getTypeColor(notification.type)}`,
                }}
              />
              {notification.unread && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#f44336",
                    border: "2px solid white",
                  }}
                />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                fontWeight={notification.unread ? "700" : "600"}
                className="font_poppins"
                sx={{ mb: 0.5 }}
              >
                {notification.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="font_poppins"
                sx={{ mb: 1, lineHeight: 1.4 }}
              >
                {notification.description}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                className="font_poppins"
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {notification.date}
              </Typography>
            </Box>

            {/* Action buttons */}
            <IconButton size="small">
              <MoreVert sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        ))}
      </Box>

    </Popover>
  )
}

export default NotificationModal
