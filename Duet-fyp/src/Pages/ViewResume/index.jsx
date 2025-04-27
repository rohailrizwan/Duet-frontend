import { Box, Button, Card, CardContent, Typography, CardActions, Grid } from '@mui/material';
import React from 'react';
import Container from '../../Components/Container';
import Headertext from '../../Components/Headertext';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // MUI PDF Icon

function ViewResume() {
    const resumes = [
        {
            id: 1,
            name: "Ali Khan",
            role: "Frontend Developer",
            pdfUrl: "https://drive.google.com/uc?export=download&id=1wxreLSmvc5N3eusD8pTqIJSGwPOSQJUQ" // Modified Google Drive link
        },
        {
            id: 2,
            name: "Sara Ahmed",
            role: "Backend Developer",
            pdfUrl: "https://drive.google.com/uc?export=download&id=1wxreLSmvc5N3eusD8pTqIJSGwPOSQJUQ" // Modified Google Drive link
        },
    ];

    return (
        <Box sx={{ py: 4, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Container>
                <Headertext title={"Recommended Resumes"} />

                <Grid
                    container
                    spacing={3}
                    sx={{
                        mt: 4,
                    }}
                >
                    {resumes.map((resume) => (
                        <Grid item xs={12} sm={12} md={6} lg={4} key={resume.id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        {resume.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {resume.role}
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
                                        {/* PDF Icon using MUI's PictureAsPdfIcon */}
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
                                        href={resume.pdfUrl}
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
                                        {/* Download icon can be added if needed */}
                                        Download Resume
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default ViewResume;
