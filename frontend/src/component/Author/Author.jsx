import React, { Component, createContext } from "react";
import "./Author.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {publicRequest} from '../../requestMethods'
import CircularLoader from '../CircularLoader'

const Author = () => {
  const pf = "https://pict-notes.onrender.com/";
  const [authors, setauthors] = useState([]);
  const [isauthors, setisauthors] = useState(false);
  const TotalPublishNotes = createContext();
  
  useEffect(() => {
    const fetchAllFeaturedAuthor = async () => {
      const res = await publicRequest.get("users/stats/authors");
      setauthors(res.data);
      setisauthors(true);
    };
    fetchAllFeaturedAuthor();
  }, []);

  // Inline styles - STRONG COLORS
  const authorContainerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    gap: '15px',
    marginBottom: '20px',
    padding: '10px 0',
    scrollbarWidth: 'thin',
    scrollbarColor: '#667eea #f1f5f9'
  };

  const authorCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    border: '2px solid #5a6fd8',
    minWidth: '200px',
    flexShrink: 0,
    color: 'white'
  };

  // FORCE CIRCLE - Add !important equivalent in inline styles
  const authorImageStyle = {
    height: '80px',
    width: '80px',
    borderRadius: '50% !important',
    WebkitBorderRadius: '50% !important',
    MozBorderRadius: '50% !important',
    objectFit: 'cover',
    border: '3px solid rgba(255, 255, 255, 0.5)',
    marginBottom: '12px'
  };

  const authorNameStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: '15px'
  };

  const countStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: 'white',
    margin: '0'
  };

  const textStyle = {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0'
  };

  const separatorStyle = {
    height: '30px',
    width: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: '12px 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)'
  };

  return (
    <>
      <p className="featured-author">Featured Authors</p>
      {!isauthors ? (
        <CircularLoader item={"featured author"}/>
      ) : (
        <div className="author-container" style={authorContainerStyle}>
          {isauthors && authors.map((author, i) => (
            <div key={i} className="author-card" style={authorCardStyle}>
              <Link to={`/profile/${author._id}`} style={{ textDecoration: "none", textAlign: "center" }}>
                <img
                  src={author.profilePicture ? author.profilePicture : pf + "DefaultBoy.jpg"}
                  style={authorImageStyle}
                  alt={author.username}
                  // ADD INLINE STYLE AS ATTRIBUTE TOO
                  className="author-profile-img"
                />
                <p style={authorNameStyle}>{author.username}</p>
              </Link>
              <div style={containerStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={countStyle}>{author.notes_length}</p>
                  <p style={textStyle}>Notes</p>
                </div>
                <div style={separatorStyle}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={countStyle}>{author.followers_length}</p>
                  <p style={textStyle}>Followers</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Author;
