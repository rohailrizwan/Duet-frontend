import React, { useState, useCallback, useEffect } from "react";
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
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // MUI emoji icon
import Picker from 'emoji-picker-react'; // Emoji picker library
import Imageupload from "../../Components/Uploadimage";
import Colors from "../../assets/Style";
import UploadServices from "../../apis/Upload";
import { ErrorToaster, SuccessToaster } from "../../Components/Toaster";
import { imagebaseUrl } from "../../Config/axios";
import PostService from "../../apis/Post";

const CreatePostModal = ({ open, setOpen, callback,selectedPost,setisedit ,isedit,setselectedpost=()=>{}}) => {
    const [altText, setAltText] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setselectedImage] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [loading, setloading] = useState(false);
    const [showTitleEmojiPicker, setShowTitleEmojiPicker] = useState(false); // Toggle for title emoji picker
    const [showDescEmojiPicker, setShowDescEmojiPicker] = useState(false); // Toggle for description emoji picker

    const handelRemove = () => {
        setselectedImage(null);
        setimageUrl(null);
    };

    const handleSubmit = async () => {
        if (!title && !description && !selectedImage && !imageUrl) {
            return ErrorToaster('Please fill at least one field');
        }

        setloading(true);

        let imageUrls = imageUrl || '';

        try {
            if (selectedImage) {
                const formdata = new FormData();
                formdata.append('document', selectedImage);
                const response = await UploadServices?.uploadImage(formdata);
                imageUrls =  `${imagebaseUrl}/${response?.url}`;
            }

            const obj = {
                ...(imageUrls && { image: imageUrls }),
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
            let response
            if (isedit){
                response = await PostService?.updatePost({id:selectedPost?.id,obj:obj})
            }
            else{
                response = await PostService.addpost(obj);
            }
            if (response) {
                SuccessToaster(`Post ${isedit?'updated':"add"} successfully`);
                console.log(response);
                setloading(false);
            }
        } catch (error) {
            console.log(error);
            ErrorToaster(error || "Error");
            setloading(false);
        }
        callback();
        handleClose();
    };

    const handleClose = () => {
        setselectedImage(null);
        setAltText('');
        setDescription("");
        setimageUrl(null);
        setTitle('');
        setShowTitleEmojiPicker(false);
        setShowDescEmojiPicker(false);
        setOpen(false);
        setselectedpost(null)
        setisedit(null)
    };

    // Description limit
    const handleDescriptionChange = e => {
        if (e.target.value.length <= 200) {
            setDescription(e.target.value);
        } else {
            ErrorToaster('Description less than 200 words');
        }
    };

    // Handle emoji selection for title
    const onEmojiClickTitle = (emojiObject) => {
        setTitle((prev) => prev + emojiObject.emoji);
        setShowTitleEmojiPicker(false);
    };

    // Handle emoji selection for description
    const onEmojiClickDesc = (emojiObject) => {
        if ((description + emojiObject.emoji).length <= 200) {
            setDescription((prev) => prev + emojiObject.emoji);
        } else {
            ErrorToaster('Description less than 200 words');
        }
        setShowDescEmojiPicker(false);
    };

    useEffect(()=>{
        if(isedit){
            setimageUrl(selectedPost?.image)
            console.log(selectedPost,"selectedpost");
            setTitle(selectedPost?.title)
            setDescription(selectedPost?.description)
        }
    },[isedit,selectedPost])

    console.log(imageUrl);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="font_poppins colorgradient font-bold">Create New Post</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Drag & Drop Zone */}
                    <Grid item xs={12}>
                        <Imageupload
                            selectedimage={selectedImage}
                            setSelectedimage={setselectedImage}
                            setimageUrl={setimageUrl}
                            imageUrl={imageUrl}
                            handelRemove={handelRemove}
                        />
                    </Grid>

                    {/* Title */}
                    <Grid item xs={12}>
                        <Box sx={{ position: 'relative' }}>
                            <TextField
                                label="Title"
                                fullWidth
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowTitleEmojiPicker(!showTitleEmojiPicker)}
                                            sx={{ color: '#ff9800' }}
                                        >
                                            <EmojiEmotionsIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                            {showTitleEmojiPicker && (
                                <Box sx={{ position: 'absolute', zIndex: 10, right: 0, mt: 1 }}>
                                    <Picker onEmojiClick={onEmojiClickTitle} />
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <Box sx={{ position: 'relative' }}>
                            <TextField
                                label={`Description (${description.length}/200)`}
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowDescEmojiPicker(!showDescEmojiPicker)}
                                            sx={{ color: '#ff9800' }}
                                        >
                                            <EmojiEmotionsIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                            {showDescEmojiPicker && (
                                <Box sx={{ position: 'absolute', zIndex: 10, right: 0, mt: 1 }}>
                                    <Picker onEmojiClick={onEmojiClickDesc} />
                                </Box>
                            )}
                        </Box>
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