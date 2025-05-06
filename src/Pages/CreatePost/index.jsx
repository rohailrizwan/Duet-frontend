import React, { useState, useCallback } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Grid
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

const CreatePostModal = ({ open, setOpen }) => {
    const [file, setFile] = useState(null);
    const [altText, setAltText] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Dropzone setup
    const onDrop = useCallback(accepted => {
        if (accepted.length) {
            setFile(
                Object.assign(accepted[0], {
                    preview: URL.createObjectURL(accepted[0])
                })
            );
        }
    }, []);
    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false
    });

    // Remove selected image
    const removeImage = () => {
        URL.revokeObjectURL(file.preview);
        setFile(null);
    };

    // Submit handler
    const handleSubmit = () => {
        setOpen(false);
    };

    // Description limit
    const handleDescriptionChange = e => {
        if (e.target.value.length <= 200) {
            setDescription(e.target.value);
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle className="font_poppins colorgradient font-bold">Create New Post</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Drag & Drop Zone */}
                    <Grid item xs={12}>
                        <Box
                            {...getRootProps()}
                            sx={{
                                border: "2px dashed #aaa",
                                borderRadius: 2,
                                p: 3,
                                textAlign: "center",
                                cursor: "pointer",
                                bgcolor: isDragActive ? "#f0f0f0" : "transparent"
                            }}
                        >
                            <input {...getInputProps()} />
                            {file ? (
                                <Box sx={{ position: "relative", display: "inline-block" }}>
                                    <img
                                        src={file.preview}
                                        alt={altText || "preview"}
                                        style={{ width: 100, height: 100, objectFit: "cover" }}
                                    />
                                    <IconButton
                                        onClick={removeImage}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            bgcolor: "rgba(255,255,255,0.8)"
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Typography>
                                    {isDragActive
                                        ? "Drop the image here..."
                                        : "Drag & drop an image, or click to select one"}
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                    {/* Title */}
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </Grid>

                    {/* Alt Text */}
                    <Grid item xs={12}>
                        <TextField
                            label="Image Description (alt text)"
                            fullWidth
                            value={altText}
                            onChange={e => setAltText(e.target.value)}
                            helperText="For accessibility; optional"
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            label={`Description (${description.length}/200)`}
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} sx={{color:"lightgray"}}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePostModal;
