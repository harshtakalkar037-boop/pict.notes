import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Chat, AccountCircle, ExitToApp, Settings, Home } from "@material-ui/icons";
import Media from '../../../loader/Loader.js';
import "./HomeProfile.css";
import '../../../component/topbar/Topbar.css';

const Homeprofile = () => {
    const pf = "https://pict-notes.onrender.com/";
    
    const { currentUser, isFetching } = useSelector((state) => state.user);
    const user = currentUser;

    const logouthandler = () => {
        console.log("logout");
        localStorage.clear();
        window.location.reload();
    };

    if (isFetching) {
        return <Media />;
    }

    return (
        <div className="homeprofile-container">
            {/* User Profile Section */}
            <div className="homeprofile-header">
                <Link 
                    to={user ? `/profile/${user._id}` : `/`} 
                    className="homeprofile-user-link"
                >
                    <img 
                        src={(user && user.profilePicture) ? user.profilePicture : pf + "DefaultPic.png"} 
                        alt="Profile" 
                        className="homeprofile-avatar" 
                    />
                    <p className="homeprofile-username">
                        {user?.username}
                    </p>
                </Link>
            </div>
            
            {/* Navigation Menu */}
            <div className="homeprofile-menu">
                <Link to={`/`} className="homeprofile-menu-item">
                    <div className="homeprofile-menu-content">
                        <Home className="homeprofile-icon" />
                        <span className="homeprofile-menu-text">Home</span> 
                    </div>     
                </Link>
                
                <Link 
                    to={user ? `/profile/${user._id}` : `/`} 
                    className="homeprofile-menu-item"
                >
                    <div className="homeprofile-menu-content">
                        <AccountCircle className="homeprofile-icon" />
                        <span className="homeprofile-menu-text">View Profile</span> 
                    </div>     
                </Link>
                
                <Link 
                    to={`/messenger`} 
                    className="homeprofile-menu-item"
                >
                    <div className="homeprofile-menu-content">
                        <Chat className="homeprofile-icon chat-icon" />
                        <span className="homeprofile-menu-text">Chat</span>
                    </div>
                </Link>
                
                <Link 
                    to={`/profile/update`} 
                    className="homeprofile-menu-item"
                >
                    <div className="homeprofile-menu-content">
                        <Settings className="homeprofile-icon" />
                        <span className="homeprofile-menu-text">Setting</span>
                    </div>
                </Link>
                
                {/* Logout Button */}
                <div className="homeprofile-menu-item logout-item" onClick={logouthandler}>
                    <div className="homeprofile-menu-content">
                        <ExitToApp className="homeprofile-icon" />
                        <span className="homeprofile-menu-text">Logout</span>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default Homeprofile;
