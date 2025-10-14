import React, { useRef } from "react";
import "./UploadNote.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import {
   CloudUpload, Close, PictureAsPdf, AddCircle, Image,
} from "@material-ui/icons";
import { publicRequest } from "../../requestMethods";

const UploadNote = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  const pf = "https://pict-notes.onrender.com/";

  const notename = useRef();
  const description = useRef();
  const [isUpload, setIsUpload] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileImg, setFileImg] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  const uploadNoteFormSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (fileImg && fileImg.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    alert("Uploading started, it will take a few minutes...");
    
    const newNote = {
      userId: user._id,
      desc: description.current.value,
      notename: notename.current.value,
      notefilename: fileUrl,
    };

    if (fileImg) {
      const data = new FormData();
      data.append("file", fileImg);
      data.append("upload_preset", 'handnoteimages');
      
      try {
        setUploadProgress(50);
        const res = await axios.post("https://api.cloudinary.com/v1_1/dw2fok6if/image/upload", data);
        newNote.thumbnailfilename = res.data.secure_url;
        setUploadProgress(100);
      } catch (err) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    try {
      await publicRequest.post("/notes", newNote);
      alert("Successfully uploaded!");
      setIsUpload(false);
      setFileUrl("");
      setFileImg(null);
      setFileName("");
      setUploadProgress(0);
      // Reset form
      notename.current.value = "";
      description.current.value = "";
    } catch (err) {
      alert("Upload failed. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      setFileImg(file);
      setFileName(file.name);
    }
  };

  return (
    <> 
      {!isUpload ? (
        <div className="upload-note-card" onClick={() => setIsUpload(true)}>
          <div className="upload-card-content">
            <PictureAsPdf className="upload-card-icon pdf-icon" />
            <div className="upload-card-text">
              <h3>Share Your Knowledge</h3>
              <p>Upload study notes and help others learn</p>
            </div>
            <CloudUpload className="upload-card-icon upload-icon" />
          </div>
        </div>
      ) : (
        <div className="upload-form-modal">
          <div className="upload-form-container">
            {/* Header */}
            <div className="upload-form-header">
              <div className="upload-form-title">
                <AddCircle className="title-icon" />
                <h2>Upload New Note</h2>
              </div>
              <Close 
                onClick={() => {
                  setIsUpload(false);
                  setFileUrl("");
                  setFileImg(null);
                  setFileName("");
                }} 
                className="close-icon"
              />
            </div>

            {/* Form */}
            <form onSubmit={uploadNoteFormSubmitHandler} className="upload-form">
              <div className="form-group">
                <label>Note Title *</label>
                <input
                  type="text"
                  placeholder="Enter note title (max 30 characters)"
                  ref={notename}
                  maxLength="30"
                  required
                />
                <span className="char-count">{notename.current?.value.length || 0}/30</span>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  placeholder="Describe your note (max 300 characters)"
                  ref={description}
                  maxLength="300"
                  required
                />
                <span className="char-count">{description.current?.value.length || 0}/300</span>
              </div>

              <div className="form-group">
                <label>PDF Link *</label>
                <input
                  type="url"
                  placeholder="Paste your PDF URL here"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Thumbnail Image</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="thumbnail-upload"
                    accept=".png,.jpeg,.jpg"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <label htmlFor="thumbnail-upload" className="file-upload-label">
                    <Image className="file-upload-icon" />
                    <div className="file-upload-text">
                      <p>Click to upload thumbnail</p>
                      <span>PNG, JPG up to 2MB</span>
                    </div>
                    <CloudUpload className="file-upload-icon" />
                  </label>
                  {fileName && (
                    <div className="file-selected">
                      <span>Selected: {fileName}</span>
                    </div>
                  )}
                </div>
              </div>

              {uploadProgress > 0 && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span>{uploadProgress}%</span>
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setIsUpload(false);
                    setFileUrl("");
                    setFileImg(null);
                    setFileName("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="upload-btn">
                  Upload Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadNote;
