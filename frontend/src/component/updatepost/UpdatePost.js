import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../../requestMethods";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from '../Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
function UpdatePost() {
  const { notesid } = useParams();
  const { currentUser: user } = useSelector((state) => state.user);
  const [notename, setnotename] = useState();
  const [desc, setdesc] = useState();
  const [noteupdatedphoto, setnoteupdatedphoto] = useState(null);
  const [noteupdatedfile, setnoteupdatedfile] = useState("");

  const navigate = useNavigate();

  const UpdateNoteHandler = async (e) => {
    e.preventDefault();
    alert("Updating started...");
    const newNote = {
      userId: user._id,
      notename: notename,
      desc: desc,
      notefilename: noteupdatedfile,
    };
    if (noteupdatedphoto) {
      const data = new FormData();
      data.append("file", noteupdatedphoto);
      data.append("upload_preset", "handnoteimages");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dw2fok6if/image/upload",
        data
      );
      newNote.thumbnailfilename = await res.data.secure_url;

    }
    try {
      await publicRequest.put(`notes/${notesid}`,newNote);
      alert("successfully uploaded...");
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ pt: 4, pb: 2 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: '#f5faff', boxShadow: '0 2px 12px rgba(33,150,243,0.08)' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 3 }}>Update Your Note</Typography>
          <Box component="form" onSubmit={UpdateNoteHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Note Name" variant="outlined" onChange={e => setnotename(e.target.value)} fullWidth />
            <TextField label="Description" variant="outlined" onChange={e => setdesc(e.target.value)} fullWidth />
            <TextField label="Note File URL (PDF)" variant="outlined" onChange={e => setnoteupdatedfile(e.target.value)} fullWidth />
            <Button variant="contained" component="label" sx={{ background: '#1976d2', textTransform: 'none', fontWeight: 600 }}>
              Upload Thumbnail
              <input type="file" hidden accept=".png,.jpeg,.jpg" onChange={e => setnoteupdatedphoto(e.target.files[0])} />
            </Button>
            <Button type="submit" variant="contained" sx={{ background: '#1976d2', textTransform: 'none', fontWeight: 600 }}>
              Update Note
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default UpdatePost;
