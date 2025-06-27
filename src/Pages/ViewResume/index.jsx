import { Box, Button, Card, CardContent, Typography, CardActions, Grid, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
import Headertext from '../../Components/Headertext';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // MUI PDF Icon
import { useParams } from 'react-router-dom';
import resumeService from '../../apis/Studentresume';
import { Empty } from 'antd';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';

function ViewResume() {
    const params = useParams()
    const [resume, setresume] = useState([])
    const [loading, setloading] = useState(true)

    const getResume = async () => {
        setloading(true)
        try {
            const response = await resumeService?.getResume(params?.id)
            setresume(response?.matchedResumes || [])
            setloading(false)

        } catch (error) {
            setloading(false)

        }
    }

    useEffect(() => {
        getResume()
    }, [])
    // const handleDownload = (url) => {
    //     fetch(url)
    //         // check to make sure you didn't have an unexpected failure (may need to check other things here depending on use case / backend)
    //         .then((resp) =>
    //             resp.status === 200
    //                 ? resp.blob()
    //                 : Promise.reject("something went wrong")
    //         )
    //         .then((blob) => {
    //             const url = window.URL.createObjectURL(blob);
    //             const a = document.createElement("a");
    //             a.style.display = "none";
    //             a.href = url;
    //             // the filename you want
    //             a.download = "File";
    //             document.body.appendChild(a);
    //             a.click();
    //             window.URL.revokeObjectURL(url);
    //             // or you know, something with better UX...
    //             SuccessToaster("Resume Download");
    //         })
    //         .catch(() => ErrorToaster("Download Failed"));
    // };

    function downloadFile(url, filename = 'downloaded-file') {
        const link = document.createElement('a');
        link.href = url;

        // Force download
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    }


    if (loading) {
        return (
            <Box sx={{ py: 4, minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4,px:3, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* <Container> */}
                <Headertext title="Recommended Resumes" />

                {resume?.length === 0 ? (
                    <Empty description=" No resumes found" />
                ) : (
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            mt: 4,
                        }}
                    >
                        {resume?.map((resumeItem) => (
                            resumeItem?.resumeUrl && (
                                <Grid item xs={12} sm={12} md={6} lg={4} key={resumeItem.id}>
                                    <Card sx={{ borderRadius: 3, boxShadow: 3, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                {resumeItem?.personalInfo?.fullname}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                Current Semester: {resumeItem?.educationalBackground?.academicDetails?.department} ({resumeItem?.educationalBackground?.academicDetails?.semester})
                                            </Typography>

                                            <Box
                                                sx={{
                                                    mt: 2,
                                                    height: 150,
                                                    backgroundColor: '#e0e0e0',
                                                    borderRadius: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <PictureAsPdfIcon sx={{ fontSize: 80, color: '#1976d2' }} />
                                                <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
                                                    Click to download
                                                </Typography>
                                            </Box>
                                        </CardContent>

                                        <CardActions>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                component="a"
                                                // href={resumeItem?.resumeUrl}
                                                onClick={() => downloadFile(resumeItem?.resumeUrl)}
                                                download
                                                sx={{
                                                    mt: 2,
                                                    borderRadius: 8,
                                                    background: 'linear-gradient(to right, #1976d2, #2196f3)',
                                                    color: '#fff',
                                                    textTransform: 'none',
                                                    fontWeight: 500,
                                                    '&:hover': {
                                                        background: 'linear-gradient(to right, #1565c0, #1e88e5)',
                                                    },
                                                }}
                                            >
                                                Download Resume
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        ))}
                    </Grid>
                )}
            {/* </Container> */}
        </Box>
    );
}

export default ViewResume;
