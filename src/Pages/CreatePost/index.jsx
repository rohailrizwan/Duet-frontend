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
import { ErrorToaster } from "../../Components/Toaster";
import { imagebaseUrl } from "../../Config/axios";
import PostService from "../../apis/Post";

const CreatePostModal = ({ open, setOpen }) => {
    const [altText, setAltText] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setselectedImage] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [loading, setloading] = useState(false);

    
    const handelRemove=()=>{
        setselectedImage(null)
        setimageUrl(null)
    }
    const handleSubmit = async() => {
        if(!title && !altText && !description && !selectedImage){
            return ErrorToaster('Please fill the field')
        }
        setloading(true)
        const formdata = new FormData()
        formdata.append('document',selectedImage)
        try {
            const response=await UploadServices?.uploadImage(formdata)
            console.log(response);
            let obj={
                image:`${imagebaseUrl}/${response?.url}`,
                title:title,
                imageDesc:altText,
                description:description
            }
            handlepost(obj)
        } 
        catch (error) {
            ErrorToaster("Image Failed")
             setloading(false)
        }
    };

    const handlepost=async(obj)=>{
        console.log(obj);
        try {
            const response = await PostService.addpost(obj)
            if(response){
                console.log(response);
                setloading(false)
            }
        } catch (error) {
            console.log(error);
            ErrorToaster(error || "Error")
            setloading(false)
        }
    }

    const handleClose=()=>{
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
        else{
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
                        <Imageupload selectedimage={selectedImage} setSelectedimage={setselectedImage} setimageUrl={setimageUrl} imageUrl={imageUrl} handelRemove={handelRemove}/>
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
            <DialogActions sx={{marginRight:"10px"}}>
                <Button onClick={handleClose} sx={{color:"lightgray"}}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ borderRadius: 2 ,background:Colors?.PrimaryBlue}}
                    disabled={loading}
                >
                    {loading?<CircularProgress size={12} color="white"/>:'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePostModal;
