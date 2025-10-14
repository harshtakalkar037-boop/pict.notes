import React from "react";
import "./HomeProfile.css";
import { Link } from "react-router-dom";
import Media from '../../../loader/Loader.js'
import '../../../component/topbar/Topbar.css'
import {useSelector} from 'react-redux';
import { Chat,AccountCircle, ExitToApp,Settings,Home} from "@material-ui/icons";

const Homeprofile = () => {
    const pf = "https://pict-notes.onrender.com/";
    
    const {currentUser, isFetching} = useSelector((state) => state.user);
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
            <div className="homeprofile-header">
                <Link to={user ? `/profile/${user._id}` : `/`} className="homeprofile-user-link">
                    <img src={(user && user.profilePicture) ? user.profilePicture : pf + "DefaultPic.png"} className="homeprofile-avatar" />
                    <p className="homeprofile-username">{user?.username}</p>
                </Link>
            </div>
            
            <div className="homeprofile-menu">
                <Link to={`/`} className="homeprofile-menu-item">
                    <div className="homeprofile-menu-content">
                        <Home style={{color: "#667eea"}}/>
                        <span className="homeprofile-menu-text">Home</span> 
                    </div>     
                </Link>
                
                <Link to={user ? `/profile/${user._id}` : `/`} className="homeprofile-menu-item">
                    <div className="homeprofile-menu-content">
                        <AccountCircle style={{color: "#764ba2"}}/>
                        <span className="homeprofile-menu-text">View Profile</span> 
                    </div>     
                </Link>
                
                <Link to={`/messenger`} className="homeprofile-menu-item">
                    <div className="homeprofile-menu-content">
                        <Chat style={{color: "#4299e1"}}/>
                        <span className="homeprofile-menu-text">Chat</span>
                    </div>
                </Link>
                
                <Link to={`/profile/update`} className="homeprofile-menu-item">
                    <div className="homeprofile-menu-content">
                        <Settings style={{color: "#48bb78"}}/>
                        <span className="homeprofile-menu-text">Setting</span>
                    </div>
                </Link>
                
                <div className="homeprofile-menu-item logout-item" onClick={logouthandler}>
                    <div className="homeprofile-menu-content">
                        <ExitToApp style={{color: "#f56565"}}/>
                        <span className="homeprofile-menu-text">Logout</span>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default Homeprofile;
