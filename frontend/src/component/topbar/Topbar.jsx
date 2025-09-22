import React, { useEffect, useState } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, search } from "../../redux/userRedux";

const Topbar = () => {
  // Get currentUser from Redux state
  const { currentUser: user } = useSelector((state) => state.user);
  const [searchedItem, setSearchedItem] = useState("");
  const pf = "https://pict-notes.onrender.com/images/";
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    if (searchedItem.trim()) {
      dispatch(search(searchedItem));
    }
  };

  useEffect(() => {
    dispatch(search(""));
  }, [dispatch]);

  return (
    <div className="sidebar">
      <div style={{ width: "100%", textAlign: "center", marginTop: 24, marginBottom: 8 }}>
        <h2
          style={{
            color: "#00bcd4",
            fontFamily: "Inter, Segoe UI, Roboto, sans-serif",
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: 1,
          }}
        >
          Study Sphere
        </h2>
      </div>
      <div className="sidebar-profile">
        <Link to={user ? `/profile/${user._id}` : "/"} className="sidebar-profile-img-link">
          <img
            src={user?.profilePicture ? user.profilePicture : pf + "DefaultPic.png"}
            className="sidebar-profile-img"
            alt="Profile"
          />
        </Link>
        <p className="sidebar-username">{user?.username || "Not Available"}</p>
      </div>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-nav-link">
          Home
        </Link>
        <Link to="/messenger" className="sidebar-nav-link">
          Messenger
        </Link>
        <Link to={user ? `/profile/${user._id}` : "/"} className="sidebar-nav-link">
          Profile
        </Link>
        <Link to="/profile/update" className="sidebar-nav-link">
          Settings
        </Link>
        <button className="sidebar-nav-link sidebar-logout" onClick={logoutHandler}>
          Logout
        </button>
      </nav>
      <form className="sidebar-search-form" onSubmit={searchSubmit}>
        <input
          type="text"
          placeholder="Search notes..."
          className="sidebar-search-input"
          value={searchedItem}
          onChange={(e) => setSearchedItem(e.target.value)}
        />
        <button type="submit" className="sidebar-search-btn">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/search--v2.png"
            alt="search"
            style={{ width: 20 }}
          />
        </button>
      </form>
    </div>
  );
};

export default Topbar;