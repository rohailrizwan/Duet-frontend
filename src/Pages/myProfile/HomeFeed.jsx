import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import { NewButton2 } from "../../Components/BtnComponent";

const PostCard = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const getWordCount = (text) => {
        if (!text) return 0;
        return text.trim().split(/\s+/).length;
    };

    const descriptionWordCount = getWordCount(post.description);

    return (
        <Card
            sx={{
                width: "100%",
                // maxWidth: 600,
                margin: "auto",
                // mt: 4,
                boxShadow: 4,
                // borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#fafafa",
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        src={post.user?.profilePicture}
                        alt={post.user?.name}
                        sx={{ bgcolor: "#1976d2" }}
                    />
                }
                title={
                    <Typography variant="subtitle1" fontWeight="bold">
                        {post.user?.name}
                    </Typography>
                }
                subheader={
                    <Typography variant="caption"  color="text.secondary">
                        {new Date(post?.createdAt).toDateString()}
                    </Typography>
                }
                sx={{ pb: 1 }}
            />

            <Divider />

            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    {post.title}
                </Typography>

                {post.image && (
                    <Box
                        component="img"
                        src={post.image}
                        alt="Post"
                        sx={{
                            width: "100%",
                            height: 250,
                            objectFit: "cover",
                            borderRadius: 2,
                            mb: 2,
                        }}
                    />
                )}

                {post.description && (
                    <>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: descriptionWordCount > 100 ? 2 : 0 }}
                        >
                            {isExpanded ? post.description : truncateText(post.description, 300)}
                        </Typography>

                        {descriptionWordCount > 100 && (
                            <Box sx={{ textAlign: "right" }}>
                                <NewButton2
                                    title={isExpanded ? "Show Less" : "Read More"}
                                    handleFunction={toggleDescription}
                                />
                            </Box>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default PostCard;
