import React, { useContext } from "react";
import "./Profile.css";
import Post from '../../component/post/Post'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import {
  Add, Remove, School, LocationOn, Edit
} from "@material-ui/icons";
import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../../redux/userRedux";
import CircularLoader from '../../component/CircularLoader'

const Profile = () => {
  const { userId } = useParams();
  const pf = "https://pict-notes.onrender.com";
  const [user, setuser] = useState({})
  const [post, setpost] = useState([])
  const { currentUser: currentuser } = useSelector((state) => state.user)
  const [isfollow, setisfollow] = useState(
    currentuser?.followings.includes(userId)
  )
  const [followerslength, setfollowerslength] = useState(
    user?.followers?.length
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchuser = async () => {
      const res = await publicRequest.get(`users/${userId}`);
      setuser(res.data);
    }
    const fetchpost = async () => {
      const res = await publicRequest.get(`notes/profile/${userId}`);
      setpost(res.data);
    }
    fetchuser();
    fetchpost();
  }, [userId, isfollow])
  
  const FollowHandle = async () => {
    try {
      if (isfollow) {
        await publicRequest.put(`/users/${user._id}/unfollow`, {
          userId: currentuser._id,
        });
        dispatch(unFollow(user?._id));
        setfollowerslength(followerslength - 1)
      } else {
        await publicRequest.put(`/users/${user._id}/follow`, {
          userId: currentuser._id,
        });
        dispatch(follow(user?._id));
        setfollowerslength(followerslength + 1)
      }
      setisfollow(!isfollow)
    } catch (err) {
    }
  };
  
  const totallikes = post?.reduce((a, v) => a = a + v?.likes.length, 0)
  const totalviews = post?.reduce((a, v) => a = a + v?.buy.length, 0)

  return (
    <>
      <Navbar />
      {
        user && user.username ? (
          <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
              <div className="profile-background"></div>
              <div className="profile-content">
                <div className="profile-avatar-section">
                  <div className="avatar-container">
                    <img 
                      src={user && user.profilePicture ? user.profilePicture : pf + "DefaultPic.png"} 
                      alt="profile" 
                      className="profile-avatar"
                    />
                    {currentuser._id === userId && (
                      <Link to="/profile/update" className="edit-profile-btn">
                        <Edit className="edit-icon" />
                      </Link>
                    )}
                  </div>
                  <h1 className="profile-username">{user && user.username}</h1>
                  {user.firstname && (
                    <p className="profile-fullname">{user?.firstname + " " + user?.lastname}</p>
                  )}
                </div>

                {/* Stats Section */}
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-number">{user.followers?.length || 0}</span>
                    <span className="stat-label">Followers</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">{post?.length || 0}</span>
                    <span className="stat-label">Notes</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">{user.followings?.length || 0}</span>
                    <span className="stat-label">Following</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="profile-actions">
                  {user.username !== currentuser.username && (
                    <button 
                      className={`follow-btn ${isfollow ? 'following' : ''}`} 
                      onClick={FollowHandle}
                    >
                      {isfollow ? <Remove className="btn-icon" /> : <Add className="btn-icon" />}
                      {isfollow ? "Following" : "Follow"}
                    </button>
                  )}
                  {currentuser._id === userId && (
                    <Link to="/profile/update" className="edit-profile-main-btn">
                      <Edit className="btn-icon" />
                      Edit Profile
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="profile-info-section">
              <div className="info-card">
                <h3 className="info-title">About</h3>
                {user.desc && (
                  <p className="profile-bio">{user.desc}</p>
                )}
                
                <div className="profile-details">
                  {(currentuser._id === userId || user.institution) && user.institution && (
                    <div className="detail-item">
                      <School className="detail-icon" />
                      <span>{user.institution}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Achievements Card */}
              <div className="achievements-card">
                <h3 className="info-title">Contributions</h3>
                <div className="achievements-grid">
                  <div className="achievement-item">
                    <div className="achievement-icon notes-icon">
                      <img src="/image/icons8-microsoft-publisher-50.png" alt="Notes" />
                    </div>
                    <div className="achievement-info">
                      <span className="achievement-value">{post?.length || 0}</span>
                      <span className="achievement-label">Notes Published</span>
                    </div>
                  </div>
                  
                  <div className="achievement-item">
                    <div className="achievement-icon likes-icon">
                      <img src="/image/icons8-like-64.png" alt="Likes" />
                    </div>
                    <div className="achievement-info">
                      <span className="achievement-value">{totallikes || 0}</span>
                      <span className="achievement-label">Total Likes</span>
                    </div>
                  </div>
                  
                  <div className="achievement-item">
                    <div className="achievement-icon views-icon">
                      <img src="/image/icons8-view-50.png" alt="Views" />
                    </div>
                    <div className="achievement-info">
                      <span className="achievement-value">{totalviews || 0}</span>
                      <span className="achievement-label">Total Views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="notes-section">
              <div className="section-header">
                <h2 className="section-title">
                  {post?.length > 0 ? `Notes (${post.length})` : 'Notes'}
                </h2>
                {post?.length === 0 && (
                  <p className="empty-notes">No notes published yet</p>
                )}
              </div>
              
              <div className="notes-grid">
                {post && post.map((note) => (
                  <Post note={note} postUser={user} key={note._id} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-container">
            <CircularLoader item={"User"} />
          </div>
        )
      }
    </>
  );
};

export default Profile;
