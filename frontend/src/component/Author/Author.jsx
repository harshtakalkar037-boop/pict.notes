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

  // Inline styles as temporary fix
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
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
    border: '1px solid #e2e8f0',
    minWidth: '200px',
    flexShrink: 0
  };

  const authorImageStyle = {
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #e2e8f0',
    marginBottom: '12px'
  };

  const authorNameStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: '15px'
  };

  const countStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#667eea',
    margin: '0'
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
                />
                <p style={authorNameStyle}>{author.username}</p>
              </Link>
              <div className="author-notes-followers-container">
                <div className="author-notes-followers">
                  <p style={countStyle}>{author.notes_length}</p>
                  <p className="author-notes-followers-text">Notes</p>
                </div>
                <img src="/image/icons8-vertical-line.png" className="seperation-image" alt="separator" />
                <div className="author-notes-followers">
                  <p style={countStyle}>{author.followers_length}</p>
                  <p className="author-notes-followers-text">Followers</p>
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
