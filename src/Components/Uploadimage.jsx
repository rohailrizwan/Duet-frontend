import { Box, IconButton } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import defaultImage from '../assets/images/noimage.png';
import CloseIcon from '@mui/icons-material/Close';
function ImageUpload({ selectedimage, setSelectedimage, setimageUrl,imageUrl,handelRemove }) {
   
    const handleClick = () => {
        document.getElementById('image-input').click();
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            setSelectedimage(image);
        }
    };

    useEffect(() => {
        if (selectedimage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setimageUrl(reader.result);
            };
            reader.readAsDataURL(selectedimage);
        } else {
            setimageUrl(null);
        }
    }, [selectedimage, setimageUrl]);

    return (
        <Box display="flex" alignItems="center" justifyContent={'space-between'} gap={4}>
            {/* Left: Material UI Upload Icon */}
            <IconButton
                onClick={handleClick}
                sx={{
                    width: 50,
                    height: 50,
                    border: '1px dashed #999',
                    borderRadius: '8px',
                }}
            >
                <CloudUpload fontSize="medium" />
            </IconButton>

            {/* Right: Preview Box */}
           <Box
            sx={{
                width: 100,
                height: 100,
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Image */}
            <img
                src={imageUrl || defaultImage}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Remove icon */}
            {imageUrl && (
                <IconButton
                    onClick={handelRemove}
                    sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: '#fff',
                        width: 24,
                        height: 24,
                        padding: 0,
                        '&:hover': { backgroundColor: '#eee' },
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
        </Box>

            {/* Hidden input */}
            <input
                id="image-input"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
        </Box>
    );
}

export default ImageUpload;
