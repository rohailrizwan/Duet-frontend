import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";

import CreatePostModal from "../CreatePost";
import PostCard from "./HomeFeed";
import posts from "./Data";
import jobList from "./Jobdata";
import JobCard from "./Jobcard";
import { NewButton2 } from "../../Components/BtnComponent";
import Headertext from "../../Components/Headertext";


const MyProfile = () => {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [open, setOpen] = useState(false);

  const handleLoadMore = () => setVisiblePosts((prev) => prev + 5);

  return (
    <Box sx={{ p: 2 }}>
      <CreatePostModal open={open} setOpen={setOpen} />

      {/* profile header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://www.w3schools.com/w3images/avatar2.png"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            User Name
          </Typography>
        </Box>
        <NewButton2 title="Add Post" handleFunction={() => setOpen(true)}/>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        {/* Posts Column */}
        <Grid item xs={12} md={8}>
          <Box sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar on Chrome, Safari
            "-ms-overflow-style": "none", // Hide scrollbar on IE, Edge
            scrollbarWidth: "none", // Hide scrollbar on Firefox
          }}>
            {posts.slice(0, visiblePosts).map((post, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <PostCard post={post} />
              </Box>
            ))}
            {visiblePosts < posts.length && (
              <Box sx={{
                display: "flex",
                justifyContent: "center", marginBottom: "10px"
              }}>
               <NewButton2 title="Load More Posts"/>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Jobs Sidebar */}
        <Grid item
          xs={12}
          md={4}
          sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              position: "sticky",
              top: 16,
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              bgcolor: "#fafafa",
            }}
          >
            <Headertext title={'Latest Jobs'}/>
            {jobList.slice(0, 2).map((job) => (
              <Box key={job.id} sx={{ mb: 2 }}>
                <JobCard job={job} truncate={true} maxlength={40} istruncate={false} />
              </Box>
            ))}
            <Box sx={{display:"flex",justifyContent:"center"}}>
            <NewButton2 title="View Jobs"/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyProfile;
