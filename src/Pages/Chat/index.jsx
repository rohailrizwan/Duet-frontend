import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import moment from "moment";
import Colors from "../../assets/Style";
import ChatServices from "../../apis/Chat";
import DuetLogo from "../../assets/images/duetLogo.png";
import LaunchIcon from "@mui/icons-material/Launch";
import { io } from "socket.io-client";

import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../Config/axios";
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#075E54",
    },
    secondary: {
      main: "#128C7E",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
  },
});

const Chat = () => {
  const user = useSelector((state) => state?.auth?.user);

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedToggle, setSelectedToggle] = useState("alumini"); // Default toggle value
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [chatLoading, setchatLoading] = useState(false);
  const [lastChat, setLastChat] = useState(null);
  const [count, setCount] = useState(0);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  const chatEndRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const chatStartRef = useRef(null);
  const { state } = useLocation();
  const RoomID = state;
  const navigate = useNavigate();
  const socket = io(baseUrl);
  const [isScrolling, setIsScrolling] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const MessageBubble = styled(Paper)(({ theme, sender }) => ({
    padding: "5px 15px",
    maxWidth: "60%",
    borderRadius:
      sender?.sender_id == selectedChat?.requester_id
        ? "20px 20px 0 20px"
        : "20px 20px 20px 0",
    backgroundColor:
      sender?.sender_id == selectedChat?.requester_id
        ? Colors.primary
        : "rgb(101 158 211)",
    alignSelf:
      sender?.sender_id == selectedChat?.requester_id
        ? "flex-end"
        : "flex-start",
    marginBottom: theme.spacing(1),
    wordBreak: "break-word",
    overflowWrap: "break-word",
  }));

  const handleToggleChange = async (event, newValue) => {
    if (newValue !== null) {
      setSelectedToggle(newValue);

      setLoading(true);
      try {
        const result = await ChatServices.getChatList();
        if (result.responseCode === 200) {
          setChats(result?.data);
          setSelectedChat(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = moment(message.created_at).format("DD-MM-YYYY");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    }, {});
  };
  const groupedMessages = groupMessagesByDate(messages);

  const chatContainerRef = useRef(null);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const element = chatContainerRef.current;
      const scrollTop = element.scrollTop;

      // Prevent setting isScrolling to true if it's a new chat or initial load
      if (scrollTop <= 5 && !isInitialLoad && !isNewChatOpen) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }

      if (scrollTop <= 5) {
        timeoutId = setTimeout(() => {
          if (!chatLoading) {
            setPage((prevPage) => {
              const maxPages = Math.ceil(count / 10);
              if (prevPage < maxPages) {
                return prevPage + 1;
              }
              return prevPage;
            });
          }
        }, 500);
      }
    }
  };
  const openNewChat = (chat) => {
    setIsNewChatOpen(true);
    setIsScrolling(false);
    setTimeout(() => {
      setIsNewChatOpen(false);
    }, 300);
  };

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    console.log(isScrolling, "isScroll");
    if (!isScrolling) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedChat]);

  useEffect(() => {
    const handleReceiveMessage = (messageData) => {
      console.log(messageData, "DataData");
      const parsedData = JSON.parse(messageData);
      console.log(parsedData, "DataData");

      setMessages((prevMessages) => [...prevMessages, parsedData]);
      console.log("messages ==>> ", messages);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    socket.on("newMessage", handleReceiveMessage);
    return () => {
      socket.off("newMessage", handleReceiveMessage);
    };
  }, [selectedChat]);

  const handleSendMessage = async () => {
    const inputElement = document.getElementById("input");
    const newMessage = inputElement?.value?.trim();
  
    if (!newMessage) return;
  
    const messageData = {
      receiver: selectedChat?.receiverId,
      receiverRole: selectedToggle === "alumini" ? "alumni" : "faculty",
      message: newMessage,
    };
  
    console.log(messageData, "messageData");
  
    try {
      const res = await ChatServices.sendChat(messageData);
  

      if (res?.status ==true) {
        console.log(res.data, "response success ==>>");
  
        getChatWithRoomId();
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputElement.value = "";
      } else {
        console.error("API responded with an error status:", res);
      }
    } catch (error) {
      console.error("Error in sending message:", error);
      console.log("Error response:", error?.response);
    }
  };
  
  

  const getAllChats = async () => {
    try {
      const result = await ChatServices.getChatList();
      console.log(result, "chatsData");

      setChats(result?.data);

      // if (RoomID?.room_id && !selectedChat) {
      //   const matchingChat = allChats.find(
      //     (chat) => chat.room_details?._id === RoomID.room_id
      //   );

      //   if (matchingChat) {
      //     getChatWithRoomId(matchingChat)
      //     setSelectedChat(matchingChat);
      //   } else {

      //   }
      // }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  console.log(selectedChat, "selectedChat");
  const getChatWithRoomId = async (chat) => {
    const res = await ChatServices.getChatHistory(user?._id, chat?.receiverId);
    setMessages(res?.data);
  };

  return (
    <ThemeProvider theme={theme} sx={{ padding: "0px 24px !important" }}>
      <Box sx={{ height: "80vh", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}>
          <ToggleButtonGroup
            value={selectedToggle}
            exclusive
            onChange={handleToggleChange}
            aria-label="Chat Type"
            sx={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <ToggleButton
              sx={{
                borderTopLeftRadius: "20px ",
                borderBottomLeftRadius: "20px ",
                "&.Mui-selected": {
                  backgroundColor: Colors.primary,
                  color: "white",
                },
                fontFamily: "Poppins",
              }}
              value="alumini"
              aria-label="Alumini"
            >
              Alumuni
            </ToggleButton>
            <ToggleButton
              sx={{
                borderTopRightRadius: "20px ",
                borderBottomRightRadius: "20px ",
                "&.Mui-selected": {
                  backgroundColor: Colors.primary,
                  color: "white",
                },
                fontFamily: "Poppins",
              }}
              value="faculty"
              aria-label="Faculty"
            >
              Faculty
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {loading ? (
          <>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          </>
        ) : chats?.length > 0 ? (
          <>
            <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
              <Box
                sx={{
                  width: { xs: "100%", sm: "350px" },
                  borderRight: 1,
                  borderColor: "divider",
                }}
              >
                <AppBar position="static" color="default" elevation={0}>
                  <Toolbar
                    sx={{
                      background: Colors.primary,
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        flexGrow: 1,
                        color: Colors.white,
                        fontFamily: "Poppins",
                      }}
                    >
                      Chats
                    </Typography>
                  </Toolbar>
                </AppBar>

                <List
                  sx={{
                    overflow: "auto",
                    height: "460px",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {chats.map((chat) => {
                    console.log(chat, " ==>>> chat");
                    return (
                      <React.Fragment key={chat._id}>
                        <ListItem
                          button
                          style={{
                            backgroundColor:
                              chat?._id === selectedChat?._id
                                ? "rgb(86 86 86 / 17%)"
                                : "",
                          }}
                          sx={{
                            cursor: "pointer",
                            backgroundColor:
                              chat?._id === selectedChat?._id
                                ? "rgb(86 86 86 / 17%)"
                                : "",
                          }}
                          onClick={() => {
                            if (selectedChat?._id == chat?._id) {
                              setSelectedChat(chat);
                              getChatWithRoomId(chat);
                            } else {
                              setSelectedChat(chat);
                              getChatWithRoomId(chat);
                              setMessages([]);
                              openNewChat();
                            }
                            setPage(1);
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src={chat?.profileImage} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontFamily: "Poppins",
                                }}
                              >
                                <Box sx={{ fontFamily: "Poppins" }}>
                                  {/* Client Name */}
                                  <Box>{chat?.name + " " + chat?.lastName}</Box>
                                </Box>

                                {console.log(lastChat, "messageData2")}

                                {/* {chat?.lastMessage && (
                                <Box
                                  sx={{
                                    fontSize: "13px",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  {lastChat?.sender_id ===
                                    chat?.last_chat?.sender_id &&
                                  lastChat?.receiver_id ===
                                    chat?.last_chat?.receiver_id
                                    ? moment(chat?.created_at).format(
                                        "hh:mm a"
                                      )
                                    : moment(chat?.createdAt).format(
                                        "hh:mm a"
                                      )}
                                </Box>
                              )} */}
                              </Box>
                            }
                            secondary={
                              <>
                                {chat?.lastMessage &&
                                  (chat?.unreadCount ? (
                                    <DoneAllIcon
                                      sx={{
                                        color: "rgb(101 158 211)",
                                        fontSize: "1rem",
                                        verticalAlign: "middle",
                                        marginRight: "4px",
                                      }}
                                    />
                                  ) : (
                                    <DoneAllIcon
                                      sx={{
                                        color: "gray",
                                        fontSize: "1rem",
                                        verticalAlign: "middle",
                                        marginRight: "4px",
                                      }}
                                    />
                                  ))}

                                {chat?.lastMessage
                                  ? chat?.lastMessage
                                  : "No New Messaages"}
                              </>
                            }
                            secondaryTypographyProps={{ noWrap: true }}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
                </List>
              </Box>

              <Box
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                {selectedChat ? (
                  <>
                    <AppBar position="static" color="default" elevation={1}>
                      <Toolbar
                        sx={{
                          background: Colors.primary,
                          display: "flex",
                          justifyContent: "space-between",
                          borderTopRightRadius: "10px",
                          borderBottomRightRadius: "10px",
                        }}
                      >
                        {selectedChat && (
                          <>
                            <Typography
                              variant="h6"
                              sx={{
                                flexGrow: 1,
                                color: Colors.white,
                                fontFamily: "Poppins",
                              }}
                            >
                              {selectedChat?.name +
                                " " +
                                selectedChat?.lastName}{" "}
                            </Typography>
                          </>
                        )}
                      </Toolbar>
                    </AppBar>
                    <Box
                      sx={{
                        flex: 1,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        p: "0px ",
                        backgroundColor: Colors.white,
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          flex: 1,
                          overflow: "auto",
                          p: "0px",

                          backgroundColor: "transparent",
                          backgroundColor: "transparent",

                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                        }}
                      >
                        <List>
                          <div ref={chatContainerRef}></div>

                          <Box
                            onScroll={handleScroll}
                            sx={{
                              overflowY: "auto",
                              maxHeight: "830px",

                              "&::-webkit-scrollbar": {
                                display: "none !important",
                              },
                            }}
                            ref={chatContainerRef}
                          >
                            {chatLoading && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  padding: "10px",
                                }}
                              >
                                <CircularProgress
                                  size={40}
                                  sx={{ color: Colors.primary }}
                                />
                              </div>
                            )}

                            <div ref={chatStartRef}></div>

                            {Object.entries(groupedMessages).map(
                              ([date, messages]) => (
                                <div key={date}>
                                  <Typography
                                    sx={{
                                      color: Colors.primary,
                                      fontWeight: "bold",
                                      textAlign: "center",
                                      fontSize: "15px",
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
                                          message.sender_id ===
                                          selectedChat?.requester_id
                                            ? "flex-end"
                                            : "flex-start",
                                      }}
                                      ref={
                                        index === messages.length - 1
                                          ? chatEndRef
                                          : null
                                      }
                                    >
                                      <MessageBubble sender={message}>
                                        <ListItemText
                                          primary={message.message}
                                          secondary={moment(
                                            message.created_at
                                          ).format("hh:mm a")}
                                          sx={{
                                            "& .MuiListItemText-primary": {
                                              color: "#FFFFFF",
                                              fontFamily: "Poppins",
                                            },
                                            "& .MuiListItemText-secondary": {
                                              color: "#ffffff",
                                              display: "flex",
                                              justifyContent: "end",
                                              fontSize: "12px",
                                              fontFamily: "Poppins",
                                            },
                                          }}
                                        />
                                      </MessageBubble>
                                    </ListItem>
                                  ))}
                                </div>
                              )
                            )}
                          </Box>

                          {/* <div ref={chatEndRef}></div> */}
                        </List>
                      </Paper>
                    </Box>
                    <Paper
                      elevation={3}
                      sx={{ p: 1, display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Type a message"
                        id={"input"}
                        // onChange={(e) => console.log(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        sx={{ mx: 1, fontFamily: "Poppins" }}
                      />

                      {true && (
                        <IconButton
                          id="sendIcon"
                          sx={{ color: Colors.primary }}
                          onClick={handleSendMessage}
                        >
                          <SendIcon />
                        </IconButton>
                      )}
                    </Paper>
                  </>
                ) : (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 300, height: "auto" }}
                      image={DuetLogo}
                      alt="Chat Icon"
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Poppins",
              }}
            >
              No Chat Found
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Chat;
