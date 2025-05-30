import React, { useEffect, useState } from "react";
import { Box, Container, Button, Menu, MenuItem, IconButton, Modal, TextField, Typography, Avatar, Divider, Chip } from "@mui/material";
import { List, Spin } from "antd";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostService from "../../apis/Post";
import CreatePostModal from "../CreatePost";
import Colors from "../../assets/Style";
import ChatIcon from '@mui/icons-material/Chat';
import ImageIcon from '@mui/icons-material/Image'; // MUI icon for images
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
// PostCard Component (unchanged)
const PostCard = ({ post, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const wordCount = post.description?.split(" ").length || 0;
  const isLongDescription = wordCount > 100;
  const shortDescription = post.description?.split(" ").slice(0, 100).join(" ");

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "#fff",
        transition: "box-shadow 0.3s",
        "&:hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.2)" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={post.userProfile || "https://www.w3schools.com/w3images/avatar2.png"}
            alt={post.username}
            sx={{ mr: 2 }}
          />
          <Box>
            <Typography variant="h6" sx={{ color: "#1e3a8a", fontWeight: 500 }}>
              {post.name || "Anonymous"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "N/A"}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon sx={{ color: "#1e3a8a" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onEdit(post);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onDelete(post.id);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
      {post.title && (
        <Typography variant="h6" sx={{ color: "#6b21a8", mb: 2 }}>
          {post.title}
        </Typography>
      )}
      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt="Post image"
          sx={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 2, mb: 2 }}
        />
      )}
      <Typography variant="body1" sx={{ color: "#1f2937" }}>
        {isLongDescription && !expanded ? shortDescription + "..." : post.description}
      </Typography>
      {isLongDescription && (
        <Button
          variant="text"
          sx={{ color: "#ec4899", mt: 1 }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Read More"}
        </Button>
      )}
    </Box>
  );
};

// EditPostModal Component (unchanged)
const EditPostModal = ({ open, setOpen, post, onSave }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [image, setImage] = useState(post?.image || "");

  const handleSave = () => {
    onSave({ ...post, title, description, image });
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          width: { xs: "90%", sm: 400 },
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#1e3a8a" }}>
          Edit Post
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ color: "#1e3a8a", borderColor: "#1e3a8a" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ background: "linear-gradient(to right, #ec4899, #f97316)" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Main Viewmypost Component
const Viewmypost = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const user = useSelector((state) => state?.auth?.user);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await PostService.getpostbyid(page, 10);
      console.log(response, "res");
      if (response?.data?.length) {
        const newPosts = response.data.map((post) => ({
          id: post.id || Math.random().toString(),
          username: post.username || user?.name || "Anonymous",
          userProfile: post.userProfile || user?.profilePicture,
          createdAt: post.createdAt || new Date().toISOString(),
          title: post.title || "",
          image: post.image || null,
          description: post.description || "",
        }));
        setPosts((prev) => [...prev, ...newPosts]);
        setHasMore(newPosts.length === 10); // Assume more posts if 10 are returned
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedPost) => {
    try {
      await PostService.updatePost(updatedPost.id, updatedPost);
      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await PostService.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCreateCallback = () => {
    setPosts([]);
    setPage(1);
    fetchPosts();
  };


  const MAX_WORDS = 50;
  const description = user?.personalizedDescription || "No bio available";
  const words = description.split(" ");

  const displayDescription =
    words.length > MAX_WORDS && !showFullDesc
      ? words.slice(0, MAX_WORDS).join(" ") + "..."
      : description;
  const getRoleChip = (role) => {
    switch (role) {
      case "user":
        return {
          label: "Student",
          color: "primary",
          icon: <SchoolIcon fontSize="small" />,
        };
      case "alumni":
        return {
          label: "Alumni",
          color: "success",
          icon: <WorkIcon fontSize="small" />,
        };
      case "faculty":
        return {
          label: "Faculty",
          color: "secondary",
          icon: <EmojiPeopleIcon fontSize="small" />,
        };
      default:
        return {
          label: "",
          color: "default",
        };
    }
  };

  const roleInfo = getRoleChip(user?.role);
  const handleopen = () => {
    console.log("hello");
    
    setCreateModalOpen((open)=>!open)
  }
  return (
    <Box sx={{ minHeight: "100vh", p: { xs: 1, md: 2 } }}>
      <Container maxWidth={'lg'}>
        {/* Profile Section */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            mb: 3,
            p: 3,
            width: "100%",
            maxWidth: "1100px",
            mx: "auto",
          }}
        >
          {/* User Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar
              src={user?.profilePicture || "https://www.w3schools.com/w3images/avatar2.png"}
              sx={{ width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 } }}
            />
            <Box>
              <Typography variant="h5" sx={{ color: "#1a3c5e", fontWeight: 600 }}>
                {user?.name || "N/A"}
              </Typography>
              <Chip
                label={roleInfo.label}
                color={roleInfo.color}
                icon={roleInfo.icon}
                variant="outlined"
              />
            </Box>
          </Box>

          {/* Description */}
          <Typography variant="body1" sx={{ color: "#1a3c5e", mb: 1 }}>
            {displayDescription}
            {words.length > MAX_WORDS && (
              <Button
                onClick={() => setShowFullDesc(!showFullDesc)}
                sx={{ textTransform: "none", ml: 1 }}
              >
                {showFullDesc ? "See less" : "See more"}
              </Button>
            )}
          </Typography>

          {/* Create Post Box */}
          <Box
            sx={{
              backgroundColor: "#eaf3fc",
              borderRadius: "12px",
              p: 2,
              mt: 2,
              cursor:'pointer'
            }}
            onClick={handleopen}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}>
                <Avatar
                  src={user?.profilePicture || "https://www.w3schools.com/w3images/avatar2.png"}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid #b3d4fc",
                  }}
                />
                <Typography sx={{ color: "#1a3c5e", fontWeight: 500, fontSize: "1rem" }}>
                  What's on your mind?
                </Typography>
              </Box>
              <IconButton
                sx={{
                  backgroundColor: "#4a90e2",
                  color: "#fff",
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "#357abd" },
                }}
                onClick={handleopen}
              >
                <ChatIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Button
                startIcon={<ImageIcon sx={{ color: "green" }} />}
                sx={{
                  backgroundColor: "#f5faff",
                  textTransform: "none",
                  fontWeight: 500,
                  color: "#1a3c5e",
                  borderRadius: "20px",
                  px: 2,
                }}
                onClick={handleopen}
              >
                Photo
              </Button>
              <Button
                startIcon={<EmojiEmotionsIcon sx={{ color: "orange" }} />}
                sx={{
                  backgroundColor: "#f5faff",
                  textTransform: "none",
                  fontWeight: 500,
                  color: "#1a3c5e",
                  borderRadius: "20px",
                  px: 2,
                }}
                onClick={handleopen}
              >
                Feeling
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Posts List */}

        <Box sx={{ width: "100%", maxWidth: "1100px", mx: "auto" }}>

          <List
            dataSource={posts}
            renderItem={(post) => (
              <PostCard
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
            loadMore={
              hasMore && (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                  {loading ? (
                    <Spin size="large" />
                  ) : (
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(to right, #ec4899, #f97316)",
                        color: "#fff",
                      }}
                      onClick={handleLoadMore}
                    >
                      Load More
                    </Button>
                  )}
                </Box>
              )
            }
          />
        </Box>

        {createModalOpen && (
          <CreatePostModal open={createModalOpen} setOpen={setCreateModalOpen} callback={fetchPosts}/>
        )}
      </Container>
    </Box>
  );
};

export default Viewmypost;