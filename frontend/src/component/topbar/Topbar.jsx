import React, { useContext, useEffect, useRef,Component } from "react";
import "./Topbar.css";
import { Link} from "react-router-dom";
import {
  LibraryBooksTwoTone,
  CloseRounded,
} from "@material-ui/icons";
import { useState } from "react";
 
import {publicRequest} from'../../requestMethods'
import {useSelector,useDispatch} from 'react-redux'
import {logout,search} from "../../redux/userRedux";
const Topbar = () => {
  const {curreUser:user,searchedValue} =useSelector((state)=>state.user)
  const [searchedItem,setsearch] =useState("");
  const menu=useRef();
  const [placeholder, setplaceholder] = useState("..");
  const pf="https://pict-notes.onrender.com/images/";
  const dispatch=useDispatch();
  const MenuClickHandler=()=>{
    if(menu.current.style.display=="flex" )
    {
      menu.current.style.display="none";
    }
    else if(menu.current.style.display="none" && user._id)
        menu.current.style.display="flex";
   }
      
  const logouthandler=()=>{
    dispatch(logout());
  }

   const searchsubmit=(e)=>{
    e.preventDefault();
    dispatch(search(searchedItem));
   }
   useEffect(()=>{
    dispatch(search(null));
  },[])
  
  return (
    <div className="sidebar">
      <div style={{width: '100%', textAlign: 'center', marginTop: '24px', marginBottom: '8px'}}>
        <h2 style={{color: '#00bcd4', fontFamily: 'Inter, Segoe UI, Roboto, sans-serif', fontWeight: 700, fontSize: '2rem', letterSpacing: '1px'}}>Study Sphere</h2>
      </div>
      <div className="sidebar-profile">
        <Link to={user ? `/profile/${user._id}` : `/`} className="sidebar-profile-img-link">
          <img src={(user && user.profilePicture)?user.profilePicture:pf+"DefaultPic.png"} className="sidebar-profile-img" />
        </Link>
        <p className="sidebar-username">{user?user.username:"Not Available"}</p>
      </div>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-nav-link">Home</Link>
        <Link to="/message" className="sidebar-nav-link">Messenger</Link>
        <Link to={user ? `/profile/${user._id}` : `/`} className="sidebar-nav-link">Profile</Link>
        <Link to="/profile/update" className="sidebar-nav-link">Settings</Link>
        <button className="sidebar-nav-link sidebar-logout" onClick={logouthandler}>Logout</button>
      </nav>
      <form className="sidebar-search-form" onSubmit={searchsubmit}>
        <input
          type="text"
          placeholder={`Search notes...`}
          className="sidebar-search-input"
          onChange={(e)=>setsearch(e.target.value)}
        />
        <button type="submit" className="sidebar-search-btn">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/search--v2.png" alt="search" style={{width:'20px'}} />
        </button>
      </form>
    </div>
  );
};

export default Topbar;
