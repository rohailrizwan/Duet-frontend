import {
  Popover,
  Box,
  Typography,
  Button,
  Badge,
  IconButton,
  Avatar,
} from "@mui/material";
import { MoreVert, Notifications } from "@mui/icons-material";
import Colors from "../../assets/Style";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Config/axios";
import { useSelector } from "react-redux";
import WebServices from "../../apis/Website";
import socket from "../../../socket";

const NotificationModal = ({ open, setOpen, anchorEl ,notifications ,setNotifications }) => {
  const handleClose = () => setOpen(false);
  const user = useSelector((state) => state?.auth?.user);
  console.log(user, "userssss");

  // const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to socket server");
    });
    socket.emit("join", user?._id);

    socket.on("notification", (data) => {
      console.log("📨 New Notification received:", data);
      setNotifications([data, ...notifications]);
    });

    return () => {
      return () => {
        socket.off("notification");
        socket.off("connect");
      };
    };
  }, []);

  const getnotify = async () => {
    try {
      const response = await WebServices?.getnotify();
      console.log(response);
      setNotifications(response?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getnotify();
  }, []);
  
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "user":
        return "#4CAF50";
      case "faculty":
        return "#2196F3";
      case "alumni":
        return "#FF9800";
      default:
        return Colors.PrimaryBlue;
    }
  };

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
          top: "65px !important",
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
        {/* <Badge badgeContent={2} color="error" sx={{ ml: 1 }} /> */}
      </Box>

      {/* Notification List */}
      <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
        {notifications?.map((notification, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              p: 2,
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: "transparent",
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
                backgroundColor: getTypeColor(notification?.creator),
              }}
            />

            {/* Profile image with status indicator */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={notification?.image || "/placeholder.svg"}
                alt={notification?.title}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${getTypeColor(notification?.creator)}`,
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                fontWeight={notification?.isRead ? "700" : "600"}
                className="font_poppins"
                sx={{ mb: 0.5 }}
              >
                {notification?.title?.length > 50
                  ? notification.title.substring(0, 50) + "..."
                  : notification?.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="font_poppins"
                sx={{ mb: 1, lineHeight: 1.4 }}
              >
                {notification?.description?.length > 50
                  ? notification.description.substring(0, 50) + "..."
                  : notification?.description}
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
                {new Date(notification?.createdAt).toDateString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Popover>
  );
};

export default NotificationModal;
