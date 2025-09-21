
import React from 'react';
import Navbar from '../../component/Navbar';
import Footer from '../../component/footer/Footer';
import UploadNote from '../../component/uploadNote/UploadNote';
import Author from '../../component/Author/Author.jsx';
import RenderPost from './center/RenderPost.js';
import Homeprofile from './left/Homeprofile.jsx';
import BuildConversation from '../../component/BuildConversation/BuildConversation';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Home = () => {
    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={{ pt: 4, pb: 2, background: 'linear-gradient(90deg, #e3f2fd 0%, #fff 100%)', minHeight: '100vh', transition: 'background 0.5s' }}>
                <Grid container spacing={3} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, mb: 2, background: '#f5faff', boxShadow: '0 2px 12px rgba(33,150,243,0.08)' }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <UploadNote />
                                <Author />
                            </Box>
                        </Paper>
                        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, background: '#fff', boxShadow: '0 1px 8px rgba(33,150,243,0.06)' }}>
                            <RenderPost />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, background: '#f5faff', boxShadow: '0 1px 8px rgba(33,150,243,0.06)', mb: 2 }}>
                                <Homeprofile />
                            </Paper>
                            <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, background: '#f5faff', boxShadow: '0 1px 8px rgba(33,150,243,0.06)' }}>
                                <BuildConversation />
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default Home;
