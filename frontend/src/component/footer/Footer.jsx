import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Instagram, Facebook, YouTube, WhatsApp } from "@material-ui/icons";

const Footer = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  
  return (
    <>
      <div className="footer-container">
        <div className="about-footer">
          <div className="logo-section">
            <p className="logo">Study Sphere</p>
            <p className="tagline">Connect • Learn • Share</p>
            
            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="https://www.instagram.com/harsh_5858_?igsh=cXU4OTJ6bzRzdXFi&utm_source=qr" className="social-link" target="_blank" rel="noopener noreferrer">
                <Instagram className="social-icon" />
              </a>
              <a href="https://www.facebook.com/share/19RpNRtJjJ/?mibextid=wwXIfr" className="social-link" target="_blank" rel="noopener noreferrer">
                <Facebook className="social-icon" />
              </a>
              <a href="https://youtube.com/@djadamgaming9092?si=B-Tpw2fMA_QG9JW8" className="social-link" target="_blank" rel="noopener noreferrer">
                <YouTube className="social-icon" />
              </a>
              <a href="https://chat.whatsapp.com/KxlSpByyKC5LZqeZawFx0H" className="social-link" target="_blank" rel="noopener noreferrer">
                <WhatsApp className="social-icon" />
              </a>
            </div>
          </div>
          
          <div className="about-content-container">
            <p className="about-us-title">ABOUT US</p>
            <p className="about-content">
              A platform where students connect, share knowledge, and grow together.
              <br />
              Upload your notes, discover study materials, create your profile, and chat with peers.
            </p>
          </div>

          <div className="Contact-contribute-container">
            <a href="https://github.com/harshtakalkar037-boop/pict.notes" className="about-us-title" target="_blank" rel="noopener noreferrer">
              Contact Us
            </a>   
            <a href="https://github.com/harshtakalkar037-boop/pict.notes" className="about-us-title" target="_blank" rel="noopener noreferrer">
              Want to contribute
            </a>   
          </div>
        </div>

        <div className="footer-bottom-container">
          <p className="copyright">
            Copyright © 2023 Study Sphere. All Rights Reserved
          </p>
          <div className="footer-link">
            <Link to="/" className="footer-link-item" style={{textDecoration:"none"}}>
              Home
            </Link>
            <Link to={currentUser ? `/profile/${currentUser._id}` : "/"} className="footer-link-item" style={{textDecoration:"none"}}>
              Profile
            </Link>
            <Link to="/messenger" className="footer-link-item" style={{textDecoration:"none"}}>
              Chat
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
