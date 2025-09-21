import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import Navbar from '../Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
const UpdateUser = () => {
  const pf = "https://pict-notes.onrender.com/";
  const { currentUser: user } = useSelector((state) => state.user);
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [institution, setinstitution] = useState();
  const [interested, setinterested] = useState();
  const [photo, setphoto] = useState(null);
  const [password, setpassword] = useState();

  const navigate = useNavigate();

  const UpdateFormHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      userId: user._id,
      firstname: firstname,
      lastname: lastname,
      interested: interested,
      institution: institution,
      password: password,
    };
    if (photo) {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "handnoteimages");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dw2fok6if/image/upload",
        data
      );
      newUser.profilePicture = await res.data.secure_url;
    }
    try {
      await publicRequest.put(`users/${user._id}`, newUser);
      alert("successfully uploaded...");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ pt: 4, pb: 2 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: '#f5faff', boxShadow: '0 2px 12px rgba(33,150,243,0.08)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar src={user.profilePicture ? user.profilePicture : pf + "DefaultPic.png"} sx={{ width: 100, height: 100, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>{user.firstname} {user.lastname}</Typography>
            <Typography variant="body2" sx={{ color: '#1565c0', mb: 1 }}>{user.username}</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#1565c0', mb: 2 }}>Your Personal Profile Info</Typography>
          <Box component="form" onSubmit={UpdateFormHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="First Name" variant="outlined" onChange={e => setfirstname(e.target.value)} fullWidth />
            <TextField label="Last Name" variant="outlined" onChange={e => setlastname(e.target.value)} fullWidth />
            <TextField label="Institution" variant="outlined" onChange={e => setinstitution(e.target.value)} fullWidth />
            <TextField label="Interested Field" variant="outlined" onChange={e => setinterested(e.target.value)} fullWidth />
            <TextField label="Update Password" variant="outlined" type="password" onChange={e => setpassword(e.target.value)} fullWidth />
            <Button variant="contained" component="label" sx={{ background: '#1976d2', textTransform: 'none', fontWeight: 600 }}>
              Upload Profile Picture
              <input type="file" hidden accept=".png,.jpeg,.jpg" onChange={e => setphoto(e.target.files[0])} />
            </Button>
            <Button type="submit" variant="contained" sx={{ background: '#1976d2', textTransform: 'none', fontWeight: 600 }}>
              Update Profile
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UpdateUser;
