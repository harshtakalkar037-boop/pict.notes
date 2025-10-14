import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ThumbUp,
  ThumbUpAltOutlined,
  Visibility,
  Comment,
  Edit,
  Delete,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import "./Post.css";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";

const Post = ({ note, postUser }) => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;
  const pf = "https://pict-notes.onrender.com/";
  const [like, setlike] = useState(note.likes.length);
  const [islike, setislike] = useState(false);
  const [isseen, setisseen] = useState(false);
  const [seen, setseen] = useState(note.buy.length);
  const [allcomment, setallcomment] = useState(0);

  const navigate = useNavigate();
  
  useEffect(() => {
    setislike(note.likes.includes(user._id));
  }, [user._id, note.likes]);

  useEffect(() => {
    setisseen(note.buy.includes(user._id));
  }, [user._id, note.seen]);
  
  useEffect(() => {
    const fetchComment = async (req, res) => {
      try {
        const res = await publicRequest.get("comments/" + note._id);
        setallcomment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  }, []);

  const likehandler = () => {
    try {
      publicRequest.put("notes/" + note._id + "/like", { userId: user._id });
    } catch (err) {}
    setlike(islike ? like - 1 : like + 1);
    setislike(!islike);
  };
  
  const seenhandler = async () => {
    try {
      await publicRequest.put("notes/" + note._id + "/buy", {
        userId: user._id,
      });
    } catch (err) {}
    setseen(isseen ? seen - 1 : seen + 1);
    setisseen(!isseen);
    window.open(note.notefilename, "_blank").focus();
  };
  
  const DeleteNotes = async () => {
    let response = prompt(
      `Do you really want to delete this note if yes then type "YES" or type "NO" `
    );
    try {
      response === "YES" &&
        (await publicRequest.delete(`notes/${note._id}`, { userId: user._id }));
      response === "YES" && alert("notes deleted successfully");
      response === "YES" && window.location.reload();
    } catch (err) {
      alert("sorry you can not delete this note");
      console.log("unsuccess");
    }
  };

  return (
    <>
      <div className="post-container" key={note._id}>
        {/* Header */}
        <div className="post-topbar">
          <Link
            to={`/profile/${note.userId}`}
            style={{ textDecoration: "none" }}
            className="post-user-info"
          >
            <img
              src={
                postUser && postUser.profilePicture
                  ? postUser.profilePicture
                  : pf + "DefaultPic.png"
              }
              className="post-topbar-img"
              alt="User avatar"
            />
            <div className="post-topbar-desc">
              <p className="post-topbar-name">
                {postUser && postUser.username}
              </p>
              <div className="post-topbar-follow-ago-container">
                <span>{postUser && postUser.followers.length} Followers</span>
                <span>{format(note.createdAt)}</span>
              </div>
            </div>
          </Link>

          {user && note && note.userId === user._id && (
            <div className="post-topbar-edit-delete-container">
              <Link
                to={`/note/update/${note._id}`}
                style={{ textDecoration: "none", color: "#2d3748" }}
                className="post-topbar-edit-icon"
              >
                <Edit />
              </Link>
              <Delete onClick={DeleteNotes} className="delete-icon" />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="main-post">
          <div className="main-post-img-container" onClick={seenhandler}>
            <img
              src={
                note.thumbnailfilename
                  ? note.thumbnailfilename
                  : pf + "images-notes.jpg"
              }
              alt="note-thumbnail"
              className="post-thumbnail"
            />
            <div className="view-pdf-btn" onClick={seenhandler}>
              <span>View PDF</span>
              <img src="/image/icons8-view-50.png" alt="view icon" />
            </div>
          </div>
          <div className="main-post-about">
            <h3 className="main-post-notename">{note.notename}</h3>
            <div className="post-description-section">
              <p className="main-post-description">Description:</p>
              <p className="main-post-desc">{note.desc}</p>
            </div>
          </div>
        </div>

        {/* Reactions */}
        <div className="post-reaction-container">
          <div className="post-reaction" onClick={likehandler}>
            {islike ? (
              <ThumbUp className="reaction-icon liked" />
            ) : (
              <ThumbUpAltOutlined className="reaction-icon" />
            )}
            <span className="reaction-count">{like}</span>
          </div>
          
          <Link
            to={`/viewcomment/${note._id}`}
            className="post-reaction link-in-comment"
            style={{ textDecoration: "none", color: "#2d3748" }}
          >
            <Comment className="reaction-icon" />
            <span className="reaction-count">{allcomment.length}</span>
          </Link>
          
          <div className="post-reaction">
            <Visibility className="reaction-icon" />
            <span className="reaction-count">{note.buy.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
