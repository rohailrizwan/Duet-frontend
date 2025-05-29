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
    Grid,
    CircularProgress
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import Imageupload from "../../Components/Uploadimage";
import Colors from "../../assets/Style";
import UploadServices from "../../apis/Upload";
import { ErrorToaster, SuccessToaster } from "../../Components/Toaster";
import { imagebaseUrl } from "../../Config/axios";
import PostService from "../../apis/Post";

const CreatePostModal = ({ open, setOpen ,callback}) => {
    const [altText, setAltText] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setselectedImage] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [loading, setloading] = useState(false);


    const handelRemove = () => {
        setselectedImage(null)
        setimageUrl(null)
    }
    const handleSubmit = async () => {
        // If nothing is provided, show an error
        if (!title || !description || !selectedImage) {
            return ErrorToaster('Please fill at least one field');
        }

        setloading(true);

        let imageUrl = '';

        try {
            // Only upload image if one is selected
            if (selectedImage) {
                const formdata = new FormData();
                formdata.append('document', selectedImage);
                const response = await UploadServices?.uploadImage(formdata);
                imageUrl = `${imagebaseUrl}/${response?.url}`;
            }

            // Build post object conditionally
            const obj = {
                ...(imageUrl && { image: imageUrl }),
                ...(title && { title }),
                ...(altText && { imageDesc: altText }),
                ...(description && { description }),
            };

            handlepost(obj);
        } catch (error) {
            ErrorToaster("Image upload failed");
        } finally {
            setloading(false);
        }
    };


    const handlepost = async (obj) => {
        console.log(obj);
        try {
            const response = await PostService.addpost(obj)
            if (response) {
                SuccessToaster("Post added successfully")
                console.log(response);
                setloading(false)
            }
        } catch (error) {
            console.log(error);
            ErrorToaster(error || "Error")
            setloading(false)
        }
        callback()
        handleClose()
    }

    const handleClose = () => {
        setselectedImage(null)
        setAltText('')
        setDescription("")
        setimageUrl(null)
        setTitle('')
        setOpen(false)
    }
    // Description limit
    const handleDescriptionChange = e => {
        if (e.target.value.length <= 200) {
            setDescription(e.target.value);
        }
        else {
            ErrorToaster('Description less than 200 words')
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle className="font_poppins colorgradient font-bold">Create New Post</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Drag & Drop Zone */}
                    <Grid item xs={12}>
                        <Imageupload selectedimage={selectedImage} setSelectedimage={setselectedImage} setimageUrl={setimageUrl} imageUrl={imageUrl} handelRemove={handelRemove} />
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
                    {/* <Grid item xs={12}>
                        <TextField
                            label="Image Description (alt text)"
                            fullWidth
                            value={altText}
                            onChange={e => setAltText(e.target.value)}
                            helperText="For accessibility; optional"
                        />
                    </Grid> */}

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
            <DialogActions sx={{ marginRight: "10px" }}>
                <Button onClick={handleClose} sx={{ color: "lightgray" }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ borderRadius: 2, background: Colors?.PrimaryBlue }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={12} color="white" /> : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePostModal;
