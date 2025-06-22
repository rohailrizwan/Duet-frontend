import React, { useState, useRef, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  styled,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  CardMedia,
  Snackbar,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import moment from "moment";
import DuetLogo from "../../assets/images/duetLogo.png";
import { useSelector } from "react-redux";
import ChatServices from "../../apis/Chat";
import Colors from "../../assets/Style";
import socket from "../../../socket";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#173f72" },
    secondary: { main: "#128C7E" },
    background: { default: "#F5F5F5", paper: "#FFFFFF" },
  },
  typography: { fontFamily: "'Poppins', sans-serif" },
});

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "85vh",
  width: "100%",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: { flexDirection: "column" },
}));

const Sidebar = styled(Box)(({ theme, selectedChat }) => ({
  width: "30%",
  minWidth: "300px",
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: "width 0.3s ease, height 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    minWidth: "100%",
    height: selectedChat ? 0 : "100%",
    overflow: selectedChat ? "hidden" : "auto",
  },
}));

const ChatArea = styled(Box)(({ theme, selectedChat }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  transition: "width 0.3s ease, height 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    height: selectedChat ? "100%" : 0,
    width: "100%",
  },
}));

const MessageBubble = styled(Paper)(({ theme, isSender }) => ({
  padding: "8px 12px",
  maxWidth: "70%",
  borderRadius: isSender ? "20px 20px 0 20px" : "20px 20px 20px 0",
  backgroundColor: isSender ? theme.palette.primary.main : "#65A2D3",
  color: "#FFFFFF",
  alignSelf: isSender ? "flex-end" : "flex-start",
  marginBottom: theme.spacing(1),
  wordBreak: "break-word",
}));

const Chat = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedToggle, setSelectedToggle] = useState("alumni");
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);
  const prevScrollHeightRef = useRef(0);
  const location=useLocation()
  const toggleOptions = {
    user: [
      { value: "alumni", label: "Alumni" },
      { value: "faculty", label: "Faculty" },
    ],
    alumni: [
      { value: "user", label: "Student" },
      { value: "alumni", label: "Alumni" },
      { value: "faculty", label: "Faculty" },
    ],
    faculty: [
      { value: "user", label: "Student" },
      { value: "alumni", label: "Alumni" },
      { value: "faculty", label: "Faculty" },
    ],
  };

  const filterChatsByRole = (chats, role) => {
    console.log("Filtering chats:", chats, "for role:", role);
    return chats.filter((chat) => chat.role === role);
  };

  const handleToggleChange = async (event, newValue) => {
    if (newValue !== null) {
      setSelectedToggle(newValue);
      setLoading(true);
      setSelectedChat(null);
      setMessages([]);
      await getAllChats(newValue);
      setLoading(false);
    }
  };

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    setMessages([]);
    setPage(1);
    setHasMore(true);
    await getChatWithRoomId(chat, 1);
  };

  const handleBackToSidebar = () => {
    setSelectedChat(null);
    setMessages([]);
    setPage(1);
    setHasMore(true);
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = moment(message.created_at).format("DD-MM-YYYY");
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  const getAllChats = async (role = selectedToggle) => {
    try {
      setLoading(true);
      const result = await ChatServices.getChatList();
      if (result?.data) {
        const filteredChats = filterChatsByRole(result?.data || [], role);
        setChats(filteredChats);
      } else {
        console.error("API error:", result);
        setChats([]);
        setError("Failed to load chats");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      setChats([]);
      setError("Error fetching chats");
    } finally {
      setLoading(false);
    }
  };

  const getChatWithRoomId = async (chat, pageNum = 1) => {
    try {
      setChatLoading(true);
      const receiverId = chat?.receiverId || chat?.receiver;
      const res = await ChatServices.getChatHistory(user?._id, receiverId, pageNum);
      if (res?.data) {
        const newMessages = res?.data || [];
        if (pageNum === 1) {
          setMessages(newMessages);
        } else {
          setMessages((prev) => [...newMessages, ...prev]);
        }
        setHasMore(newMessages.length > 0 && messages.length + newMessages.length < (res?.total || 0));
      } else {
        console.error("API error:", res);
        setError("Failed to load chat history");
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setError("Error fetching chat history");
    } finally {
      setChatLoading(false);
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight } = chatContainerRef.current;
      if (scrollTop < 50 && !chatLoading && hasMore) {
        prevScrollHeightRef.current = scrollHeight;
        setPage((prev) => prev + 1);
      }
    }
  };

  const handleSendMessage = async () => {
    const inputElement = document.getElementById("input");
    const newMessage = inputElement?.value?.trim();

    if (!newMessage || !selectedChat) return;

    const messageData = {
      receiver: selectedChat?.receiverId || selectedChat?.receiver,
      receiverRole: selectedToggle,
      message: newMessage,
      sender: user?._id,
      created_at: new Date().toISOString(),
      _id: `temp_${Date.now()}`,
    };

    try {
      // Add message locally for sender
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === messageData._id)) {
          return [...prevMessages, messageData];
        }
        return prevMessages;
      });
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

      // Update chats for sender
      setChats((prevChats) => {
        const chatExists = prevChats.find(
          (chat) => (chat.receiverId || chat.receiver) === messageData.receiver
        );
        if (chatExists) {
          return prevChats.map((chat) =>
            (chat.receiverId || chat.receiver) === messageData.receiver
              ? {
                  ...chat,
                  lastMessage: messageData.message,
                  created_at: messageData.created_at,
                }
              : chat
          );
        }
        return prevChats;
      });

      // Emit socket event
      socket.emit("sendMessage", {
        receiver: messageData.receiver,
        receiverRole: messageData.receiverRole,
        message: messageData.message,
        sender: messageData.sender,
        created_at: messageData.created_at,
      });
      console.log("Emitted sendMessage:", messageData);

      // Send message via API
      const res = await ChatServices.sendChat({
        receiver: messageData.receiver,
        receiverRole: messageData.receiverRole,
        message: messageData.message,
      });

      if (res?.status && res?.data) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageData._id ? { ...msg, _id: res.data._id } : msg
          )
        );
        inputElement.value = "";
      } else {
        console.error("API responded with an error status:", res);
        setError("Failed to send message");
      }
    } catch (error) {
      console.error("Error in sending message:", error);
      setError("Error sending message");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      setError("Socket connection failed");
    });

    socket.on("newMessage", (data) => {
      console.log("New message received:", data);
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === data._id)) {
          return [...prevMessages, data];
        }
        return prevMessages;
      });
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

      setChats((prevChats) => {
        const receiverId = data.sender === user?._id ? data.receiver : data.sender;
        const chatExists = prevChats.find(
          (chat) => (chat.receiverId || chat.receiver) === receiverId
        );
        if (chatExists) {
          return prevChats.map((chat) =>
            (chat.receiverId || chat.receiver) === receiverId
              ? {
                  ...chat,
                  lastMessage: data.message,
                  created_at: data.created_at,
                }
              : chat
          );
        }
        return [
          ...prevChats,
          {
            _id: `chat_${receiverId}_${Date.now()}`,
            lastMessage: data.message,
            created_at: data.created_at,
            name: data.sender?.name || "Unknown",
            lastName: data.sender?.lastName || "",
            profileImage: data.sender?.profileImage || "",
            role: data.sender?.role || selectedToggle,
            receiverId: receiverId,
          },
        ];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    if (selectedChat && page > 1) {
      getChatWithRoomId(selectedChat, page);
    }
  }, [page, selectedChat]);

  useEffect(() => {
    if (selectedChat && page === 1 && !chatLoading) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatLoading, selectedChat]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, [chatLoading, hasMore, selectedChat]);

  useEffect(() => {
    if (page > 1 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - prevScrollHeightRef.current;
    }
  }, [messages]);
  useEffect(()=>{
      if(location?.state){
        console.log(location?.state);
        handleChatSelect(location?.state)
      }
  },[])
  return (
    <ThemeProvider theme={theme}>
      <ChatContainer>
        <Sidebar selectedChat={selectedChat}>
          <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Chats
              </Typography>
            </Toolbar>
          </AppBar>
          {user?.role && (
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
              <ToggleButtonGroup
                value={selectedToggle}
                exclusive
                onChange={handleToggleChange}
                aria-label="Chat Type"
                sx={{ width: "100%", display: "flex", gap: 1 }}
              >
                {toggleOptions[user?.role]?.map((option) => (
                  <ToggleButton
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                    sx={{
                      flex: 1,
                      borderRadius: "20px",
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                      },
                    }}
                  >
                    {option.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          )}
          {loading ? (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Box>
          ) : chats.length === 0 ? (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography color="text.secondary">No Chats Found</Typography>
            </Box>
          ) : (
            <List sx={{ overflow: "auto", flex: 1, "&::-webkit-scrollbar": { width: "5px" } }}>
              {chats.map((chat) => (
                <React.Fragment key={chat._id}>
                  <ListItem
                    button
                    onClick={() => handleChatSelect(chat)}
                    sx={{
                      backgroundColor: chat._id === selectedChat?._id ? "rgba(86, 86, 86, 0.17)" : "",
                      "&:hover": { backgroundColor: "rgba(86, 86, 86, 0.1)" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={chat?.profileImage} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ fontWeight: 500 }}>
                            {chat?.name + " " + chat?.lastName}
                          </Typography>
                          {chat?.lastMessage && (
                            <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                              {moment(chat?.created_at).format("hh:mm a")}
                            </Typography>
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {chat?.lastMessage && (
                            <DoneAllIcon
                              sx={{
                                color: chat?.unreadCount ? "#65A2D3" : "gray",
                                fontSize: "1rem",
                              }}
                            />
                          )}
                          <Typography
                            sx={{
                              color: "text.secondary",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {chat?.lastMessage || "No New Messages"}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Sidebar>
        <ChatArea selectedChat={selectedChat}>
          {selectedChat ? (
            <>
              <AppBar position="static" color="primary" elevation={1}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleBackToSidebar}
                    sx={{ display: { xs: "block", sm: "none" }, mr: 1 }}
                  >
                    <SendIcon sx={{ transform: "rotate(180deg)" }} />
                  </IconButton>
                  <Avatar src={selectedChat?.profileImage} sx={{ mr: 2 }} />
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {selectedChat?.name + " " + selectedChat?.lastName}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Box sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <Paper
                  elevation={0}
                  sx={{ flex: 1, overflow: "auto", "&::-webkit-scrollbar": { width: "5px" } }}
                  ref={chatContainerRef}
                >
                  {chatLoading && (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                      <CircularProgress size={24} />
                    </Box>
                  )}
                  <List sx={{ p: 2 }}>
                    {Object.entries(groupedMessages).map(([date, messages]) => (
                      <Box key={date} sx={{ mb: 2 }}>
                        <Typography
                          sx={{
                            textAlign: "center",
                            color: theme.palette.primary.main,
                            fontWeight: "bold",
                            fontSize: "14px",
                            my: 1,
                          }}
                        >
                          {date}
                        </Typography>
                        {messages.map((message, index) => (
                          <ListItem
                            key={message._id}
                            sx={{
                              display: "flex",
                              justifyContent:
                                (message.sender?._id === user?._id || message?.sender === user?._id)
                                  ? "flex-end"
                                  : "flex-start",
                              p: 0.5,
                            }}
                            ref={index === messages.length - 1 && page === 1 ? chatEndRef : null}
                          >
                            <MessageBubble
                              isSender={message.sender?._id === user?._id || message?.sender === user?._id}
                            >
                              <ListItemText
                                primary={message.message}
                                secondary={moment(message.created_at).format("hh:mm a")}
                                sx={{
                                  "& .MuiListItemText-primary": { fontSize: "14px", whiteSpace: "normal" },
                                  "& .MuiListItemText-secondary": {
                                    color: "#FFFFFF",
                                    fontSize: "12px",
                                    textAlign: "right",
                                  },
                                }}
                              />
                            </MessageBubble>
                          </ListItem>
                        ))}
                      </Box>
                    ))}
                  </List>
                </Paper>
                <Paper elevation={3} sx={{ p: 1, display: "flex", alignItems: "center" }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Type a message"
                    id="input"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    InputProps={{ disableUnderline: true }}
                    sx={{ mx: 1, fontFamily: "Poppins" }}
                  />
                  <IconButton id="sendIcon" sx={{ color: Colors.primary }} onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </Paper>
              </Box>
            </>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%" sx={{display:{lg:"flex",md:"flex",sm:'none',xs:"none"}}}>
              <CardMedia component="img" sx={{ width: 300, height: "auto" }} image={DuetLogo} alt="Chat Icon" />
            </Box>
          )}
        </ChatArea>
      </ChatContainer>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Chat;