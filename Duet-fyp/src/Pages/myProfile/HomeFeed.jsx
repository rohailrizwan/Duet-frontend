import React, { useState } from "react";
import { Card, CardHeader, CardContent, Avatar, Typography, Button, Box } from "@mui/material";
import { NewButton, NewButton2 } from "../../Components/BtnComponent";

const PostCard = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Function to truncate the description
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card sx={{ maxWidth: 900, width: "100%", mb: 4, boxShadow: 3 }}>
            <CardHeader
                avatar={<Avatar src={post.userAvatar} alt={post.name} />}
                title={post.name}
                subheader={post.date}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {post.title}
                </Typography>
                {post.postImage && (
                    <img src={post.postImage} alt="Post" style={{ width: "100%", height: "250px", objectFit:"cover", borderRadius: "8px" }} />
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {isExpanded ? post.description : truncateText(post.description, 150)}
                </Typography>

                <Box sx={{ marginTop: "20px" }}>
                    <NewButton2 title={isExpanded ? "Show Less" : "Read More"} handleFunction={toggleDescription}/>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCard;
