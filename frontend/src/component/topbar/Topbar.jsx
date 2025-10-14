import React from 'react'
import './Topbar.css'
import { Search, Chat, Notifications, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Topbar() {
  const { currentUser: user } = useSelector((state) => state.user);
  const PF = "https://pictnotes.onrender.com/";

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">StudySphere</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            placeholder="Search for friend, post or video"
            className="search-input"
          />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-link">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Homepage
          </Link>
        </div>
        <div className="topbar-link">
          <Link to={`/profile/${user?._id}`} style={{ textDecoration: "none", color: "white" }}>
            Profile
          </Link>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-item">
            <Person />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Chat />
            <span className="topbar-icon-badge">2</span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
            <span className="topbar-icon-badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user?._id}`}>
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : PF + "DefaultPic.png"
            }
            alt=""
            className="topbar-img"
          />
        </Link>
      </div>
    </div>
  )
}
