import React, { useContext, useRef } from "react";
import "./UpdatePost.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../../requestMethods";
import {useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from '../Navbar';

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
    alert("Updating note...");
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
      await publicRequest.put(`notes/${notesid}`, newNote);
      alert("Note updated successfully!");
      navigate("/");
    } catch (err) {
      alert("Error updating note. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="Update-post-container-complete">
        <div className="Update-post-container">
          <p className="Update-post-container-name">Update Your Note</p>
          <form
            onSubmit={UpdateNoteHandler}
            className="Update-post-container-form"
          >
            <div className="Update-post-input-box">
              <p className="Update-post-input-heading">Note Name</p>
              <input
                type="text"
                placeholder="Enter note name"
                onChange={(e) => setnotename(e.target.value)}
                className="Update-post-input-block"
              />
            </div>

            <div className="Update-post-input-box">
              <p className="Update-post-input-heading">Description</p>
              <input
                type="text"
                placeholder="Enter description"
                onChange={(e) => setdesc(e.target.value)}
                className="Update-post-input-block"
              />
            </div>

            <div className="Update-post-input-box">
              <p className="Update-post-input-heading">Note File URL</p>
              <input
                type="text"
                className="Update-post-input-block"
                placeholder="Enter PDF file URL"
                onChange={(e) => setnoteupdatedfile(e.target.value)}
              />
            </div>

            <div className="Update-post-input-box-file">
              <p className="Update-post-input-heading-file">Thumbnail Image</p>
              <input
                type="file"
                className="Update-post-input-block-file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setnoteupdatedphoto(e.target.files[0])}
              />
            </div>
            <button type="submit" className="Update-post-container-form-submit">
              Update Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePost;
