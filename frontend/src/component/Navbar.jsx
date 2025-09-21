import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToApp from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, search } from "../redux/userRedux";
import TopNavbar from './TopNavbar/TopNavbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {logout,search} from "../redux/userRedux";
import { useRef } from "react";
import TopNavbar from './TopNavbar/TopNavbar'

const SearchBar = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #e0e0e0',
  padding: '2px 8px',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  marginLeft: theme.spacing(1),
  flex: 1,
  fontSize: 16,
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
}));

const TopNavWrapper = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));
 


const Navbar = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [searchedValue, setSearchedValue] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(search(searchedValue));
  };

  useEffect(() => {
    dispatch(search(null));
  }, [dispatch]);

  return (
    <>
      <TopNavWrapper>
        <TopNavbar />
      </TopNavWrapper>
      <AppBar position="static" color="default" elevation={2} sx={{ background: 'linear-gradient(90deg, #e3f2fd 0%, #fff 100%)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: isMobile ? 1 : 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Typography variant="body2" sx={{ mr: 2, color: '#1976d2', fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
              EN
            </Typography>
            <SearchBar onSubmit={searchHandler}>
              <StyledInputBase
                placeholder="Search..."
                value={searchedValue}
                onChange={e => setSearchedValue(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton type="submit" size="small" sx={{ p: '4px', color: '#1976d2' }}>
                <SearchIcon />
              </IconButton>
            </SearchBar>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: 1, fontFamily: 'Montserrat, sans-serif', transition: 'color 0.3s', '&:hover': { color: '#1565c0' } }}>
                Study Sphere
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
            {currentUser ? (
              <>
                <Link to={`/profile/${currentUser._id}`} style={{ textDecoration: "none" }}>
                  <IconButton size="large" sx={{ color: '#1976d2', mx: 1 }}>
                    <AccountCircle />
                  </IconButton>
                  <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 500, display: { xs: 'none', sm: 'inline' } }}>
                    {currentUser.username}
                  </Typography>
                </Link>
                <Button onClick={logoutHandler} startIcon={<ExitToApp />} sx={{ color: '#d32f2f', fontWeight: 500, ml: 2, textTransform: 'none' }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: '#1976d2', fontWeight: 500, textTransform: 'none', mx: 1 }}>Sign In</Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: '#1976d2', fontWeight: 500, textTransform: 'none', mx: 1 }}>Register</Button>
                </Link>
              </>
            )}
            <Link to="/searchuser" style={{ textDecoration: "none" }}>
              <IconButton size="large" sx={{ color: '#1976d2', mx: 1 }}>
                <ChatIcon />
              </IconButton>
              <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 500, display: { xs: 'none', sm: 'inline' } }}>
                Chat
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;