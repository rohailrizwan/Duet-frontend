import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Grid,
  Avatar,
  Divider,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ImageIcon from "@mui/icons-material/Image"; // MUI icon for images
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CreatePostModal from "../CreatePost";
import PostCard from "./HomeFeed";
import jobList from "./Jobdata";
import JobCard from "./Jobcard";
import Headertext from "../../Components/Headertext";
import Dashboardservice from "../../apis/Dashboard";
import { useSelector } from "react-redux";
import UpdateProfileHeader from "../../Components/ProfileHeader";
import { Empty } from "antd";

const MyProfile = () => {
  const [posts, setPosts] = useState([]); // Dynamic posts from API
  const [job, setjob] = useState([]); // Dynamic posts from API
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const observer = useRef();

  // Infinite scroll callback
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading || loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visiblePosts < posts.length) {
          setLoading(true);
          setTimeout(() => {
            setVisiblePosts((prev) => prev + 5);
            setLoading(false);
          }, 1000); // Simulate API delay
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loader, visiblePosts, posts.length]
  );

  const fetchPost = async () => {
    try {
      const response = await Dashboardservice?.getdashboard();
      if (response) {
        setPosts(response?.posts || []);
        setjob(response?.jobs);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleopen = () => {
    setOpen(true);
  };

  console.log("okkk");

  return (
    <Box
      sx={{
        // bgcolor: '#f0f2f5',
        p: { xs: 1, md: 2 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CreatePostModal open={open} setOpen={setOpen} callback={fetchPost} />

      {/* What's on your mind? Section at the Top */}
      <Box
        sx={{
          backgroundColor: "#e6f0fa", // Soft blue background
          borderRadius: "12px",
          p: 2.5,
          mb: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // Deeper shadow
          width: "100%",
          maxWidth: "800px",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)", // Enhanced shadow on hover
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={handleopen}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
          >
            <Avatar
              src={
                user?.profilePicture ||
                "https://www.w3schools.com/w3images/avatar2.png"
              }
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "2px solid #b3d4fc", // Soft blue border for avatar
              }}
            />
            <Typography
              sx={{ color: "#1a3c5e", fontWeight: 500, fontSize: "1rem" }}
            >
              What's on your mind?
            </Typography>
          </Box>
          <IconButton
            sx={{
              backgroundColor: "#4a90e2", // Soft blue button
              color: "#fff",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "#357abd" }, // Slightly darker blue on hover
              transition: "background-color 0.3s ease",
            }}
            onClick={handleopen}
          >
            <ChatIcon />
          </IconButton>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 1.5, borderColor: "#b3d4fc" }} />

        {/* Image and Emoji Icons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              px: 2,
              py: 0.5,
              borderRadius: "16px",
              backgroundColor: "#f0f7ff", // Very light blue background for icons
              transition: "background-color 0.3s ease",
              "&:hover": { backgroundColor: "#d6e6ff" },
            }}
            onClick={handleopen}
          >
            <ImageIcon sx={{ color: "#4caf50", fontSize: "1.2rem" }} />
            <Typography
              sx={{ color: "#1a3c5e", fontSize: "0.9rem", fontWeight: 500 }}
            >
              Photo
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              px: 2,
              py: 0.5,
              borderRadius: "16px",
              backgroundColor: "#f0f7ff",
              transition: "background-color 0.3s ease",
              "&:hover": { backgroundColor: "#d6e6ff" },
            }}
            onClick={handleopen}
          >
            <EmojiEmotionsIcon sx={{ color: "#ff9800", fontSize: "1.2rem" }} />
            <Typography
              sx={{ color: "#1a3c5e", fontSize: "0.9rem", fontWeight: 500 }}
            >
              Feeling
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          my: 2,
          borderColor: "#e0e0e0",
          width: "100%",
          maxWidth: "1200px",
        }}
      />

      <Grid container spacing={2} sx={{ width: "100%", maxWidth: "1200px" }}>
        {/*   ial Feed Column */}
        <Grid item xs={12} md={8}>
          <UpdateProfileHeader text={"Social Feed"} />
          {loader ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress sx={{ color: "#0a66c2" }} />
            </Box>
          ) : posts?.length === 0 ? (
            <Box
              sx={{
                height: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
                width: "100%",
              }}
            >
              <Empty description="No posts available" />
            </Box>
          ) : (
            <>
              {posts.slice(0, visiblePosts).map((post, i) => (
                <Box
                  key={post.id || i}
                  ref={i === visiblePosts - 1 ? lastPostElementRef : null}
                  sx={{
                    mb: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    bgcolor: "#fff",
                    width: "100%",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <PostCard post={post} />
                </Box>
              ))}
              {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                  <CircularProgress sx={{ color: "#0a66c2" }} />
                </Box>
              )}
            </>
          )}
        </Grid>

        {/* Job Opportunities Column */}
        <Grid item xs={12} md={4} >
          <Box
            sx={{
              position: "sticky",
              top: 16,
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              bgcolor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Headertext
              title="Job Opportunities"
              sx={{ color: "#1a3c5e", fontWeight: 600, mb: 2 }}
            />
            {job?.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Empty description="No jobs available" />
              </Box>
            ) : (
              job?.slice(0, 2).map((job) => (
                <Box
                  key={job._id}
                  sx={{
                    mb: 2,
                    borderRadius: 1,
                    p: 1.5,
                    bgcolor: "#f9f9f9",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <JobCard
                    job={job}
                    truncate={true}
                    maxlength={40}
                    istruncate={false}
                  />
                </Box>
              ))
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyProfile;
