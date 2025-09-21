
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

const Footer = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  return (
    <Box component="footer" sx={{ background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)', color: 'white', pt: 5, pb: 3, mt: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ mb: { xs: 3, md: 0 } }}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 1, fontFamily: 'Montserrat, sans-serif', mb: 1 }}>
              Study Sphere
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 340 }}>
              A website to get any desired notes.<br />
              Users can upload their own notes, view/search for notes, create a profile, or chat with other users.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>ABOUT US</Typography>
            <Button href="https://github.com/harshtakalkar037-boop/pict.notes" target="_blank" sx={{ color: 'white', textTransform: 'none', fontWeight: 500, mb: 1 }}>
              Contact Us
            </Button>
            <Button href="https://github.com/harshtakalkar037-boop/pict.notes" target="_blank" sx={{ color: 'white', textTransform: 'none', fontWeight: 500 }}>
              Want to contribute
            </Button>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: { xs: 2, md: 0 } }}>
            Copyright © 2025 Study Sphere. All Rights Reserved
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button sx={{ color: 'white', textTransform: 'none', fontWeight: 500 }}>Home</Button>
            </Link>
            {currentUser && (
              <Link to={`/profile/${currentUser._id}`} style={{ textDecoration: "none" }}>
                <Button sx={{ color: 'white', textTransform: 'none', fontWeight: 500 }}>Profile</Button>
              </Link>
            )}
            <Link to="/searchuser" style={{ textDecoration: "none" }}>
              <Button sx={{ color: 'white', textTransform: 'none', fontWeight: 500 }}>Chat</Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
