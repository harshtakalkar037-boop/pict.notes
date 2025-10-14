import React, { useContext, useRef } from "react";
import "./UpdateUser.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import Navbar from '../Navbar';
const UpdateUser = () => {
  const pf = "https://pictnotes.onrender.com/";
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
      alert("Profile updated successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="Update-container">
        <div className="Update-profile-container">
          <div className="Update-profile-container-left">
            <div className="Update-profile-container-left-top">
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : pf + "DefaultPic.png"
                }
                className="Update-profile-container-left-top-img"
                alt="Profile"
              />

              <div className="Update-profile-container-left-top-user-desc">
                <p className="Update-profile-container-left-top-name">
                  <span>{user.firstname}</span> <span>{user.lastname} </span>
                </p>
                <p className="Update-profile-container-left-top-username">
                  {user.username}
                </p>
              </div>
            </div>
          </div>

          <div className="Update-profile-container-right">
            <p className="Update-profile-container-right-heading">
              Update Your Profile
            </p>
            <form
              onSubmit={UpdateFormHandler}
              className="Update-profile-container-right-form"
            >
              <div className="input-box">
                <p className="input-heading">First Name</p>
                <input
                  type="text"
                  placeholder="Enter first name"
                  onChange={(e) => setfirstname(e.target.value)}
                  className="input-block"
                ></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Last Name</p>
                <input
                  type="text"
                  placeholder="Enter last name"
                  onChange={(e) => setlastname(e.target.value)}
                  className="input-block"
                ></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Institution</p>
                <input
                  type="text"
                  placeholder="Enter your institution"
                  onChange={(e) => setinstitution(e.target.value)}
                  className="input-block"
                ></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Interested Field</p>
                <input
                  type="text"
                  placeholder="e.g. Physics, Coding, Biology..."
                  onChange={(e) => setinterested(e.target.value)}
                  className="input-block"
                ></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Update Password</p>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  onChange={(e) => setpassword(e.target.value)}
                  minLength="6"
                  className="input-block"
                ></input>
              </div>

              <div className="input-box">
                <p className="input-heading">Profile Picture</p>
                <input
                  type="file"
                  className="input-block"
                  id="input-bloack-file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setphoto(e.target.files[0])}
                  style={{ border: "none", borderRadius: "0%", padding: "8px" }}
                ></input>
              </div>

              <button
                type="submit"
                className="Update-profile-container-right-form-submit"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
