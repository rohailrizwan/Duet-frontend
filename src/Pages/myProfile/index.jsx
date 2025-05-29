import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Grid,
  Avatar,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import CreatePostModal from "../CreatePost";
import PostCard from "./HomeFeed";
import jobList from "./Jobdata";
import JobCard from "./Jobcard";
import { NewButton2 } from "../../Components/BtnComponent";
import Headertext from "../../Components/Headertext";
import Dashboardservice from "../../apis/Dashboard";
import { useSelector } from "react-redux";
import UpdateProfileHeader from "../../Components/ProfileHeader";
import { Empty } from "antd";

const MyProfile = () => {
  const [posts, setPosts] = useState([]); // Dynamic posts from API
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const observer = useRef();

  // Infinite scroll callback based on window scroll
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

  return (
    <Box
      sx={{
        bgcolor: '#f3f2ef',
        p: { xs: 2, md: 3 },
      }}
    >
      <CreatePostModal open={open} setOpen={setOpen} />

      {/* Profile Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={user?.profilePicture || "https://www.w3schools.com/w3images/avatar2.png"}
            sx={{
              width: { xs: 60, md: 80 },
              height: { xs: 60, md: 80 },
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a3c5e' }}>
              {user?.name || 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4b5e7a' }}>
              {user?.role === "user"
                ? "Student"
                : user?.role === "alumni"
                  ? "Alumni"
                  : user?.role === "faculty"
                    ? "Faculty"
                    : ""}
            </Typography>
          </Box>
        </Box>
        <NewButton2
          title="Add Post"
          handleFunction={() => setOpen(true)}
          sx={{
            background: '#0a66c2',
            color: '#fff',
            px: 2,
            py: 1,
            borderRadius: 1,
            fontWeight: 500,
          }}
        />
      </Box>

      <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
      <UpdateProfileHeader text={"Social Feed"} />

      <Grid container spacing={2}>
        {/* Posts Column */}
        <Grid item xs={12} md={8}>
          {loader ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <CircularProgress sx={{ color: '#0a66c2' }} />
            </Box>
          ) : posts?.length === 0 ? (
            <Box
              sx={{
                height: '40vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // bgcolor: '#fff',
                borderRadius: 1,
                border: '1px solid #e0e0e0',
              }}
            >
             <Empty/>
            </Box>
          ) : (
            <>
              {posts.slice(0, visiblePosts).map((post, i) => (
                <Box
                  key={post.id || i}
                  ref={i === visiblePosts - 1 ? lastPostElementRef : null}
                  sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: '#fff' }}
                >
                  <PostCard post={post} />
                </Box>
              ))}
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <CircularProgress sx={{ color: '#0a66c2' }} />
                </Box>
              )}
            </>
          )}
        </Grid>

        {/* Jobs Sidebar */}
        <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              position: 'sticky',
              top: 16,
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              bgcolor: '#fff',
            }}
          >
            <Headertext
              title="Latest Jobs"
              sx={{ color: '#1a3c5e', fontWeight: 600, mb: 2 }}
            />
            {jobList?.length === 0 ? (
              <Box
                sx={{
                  py: 4,
                  textAlign: 'center',
                }}
              >
                <Empty/>
              </Box>
            ) : (
              jobList.slice(0, 2).map((job) => (
                <Box
                  key={job.id}
                  sx={{
                    mb: 2,
                    // border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    p: 1,
                    bgcolor: '#fff',
                  }}
                >
                  <JobCard job={job} truncate={true} maxlength={40} istruncate={false} />
                </Box>
              ))
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <NewButton2
                title="View Jobs"
                sx={{
                  background: '#0a66c2',
                  color: '#fff',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>

  );
};

export default MyProfile;