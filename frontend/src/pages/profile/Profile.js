import React from "react";
import Post from '../../component/post/Post';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../../redux/userRedux";
import CircularLoader from '../../component/CircularLoader';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
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
      <Container maxWidth="md" sx={{ pt: 4, pb: 2 }}>
        {user && user.username ? (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: '#f5faff', boxShadow: '0 2px 12px rgba(33,150,243,0.08)' }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar src={user.profilePicture ? user.profilePicture : pf + "DefaultPic.png"} sx={{ width: 120, height: 120, mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>{user.username}</Typography>
                  {user.firstname && (
                    <Typography variant="body1" sx={{ color: '#1565c0', mb: 1 }}>{user.firstname + " " + user.lastname}</Typography>
                  )}
                  {user.desc && (
                    <Typography variant="body2" sx={{ color: '#333', mb: 1 }}>{user.desc}</Typography>
                  )}
                  {user.institution && (
                    <Typography variant="body2" sx={{ color: '#1976d2', mb: 1 }}>🏫 {user.institution}</Typography>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>{user.followers.length || 0}</Typography>
                      <Typography variant="caption" sx={{ color: '#333' }}>Followers</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>{user.followings.length}</Typography>
                      <Typography variant="caption" sx={{ color: '#333' }}>Followings</Typography>
                    </Box>
                  </Box>
                  {user.username !== currentuser.username && (
                    <Button onClick={FollowHandle} variant="contained" sx={{ mt: 2, background: isfollow ? '#d32f2f' : '#1976d2', color: 'white', textTransform: 'none', fontWeight: 600 }}>
                      {isfollow ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <img src="/image/icons8-microsoft-publisher-50.png" alt="Published Notes" style={{ width: 32, marginBottom: 4 }} />
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>{post && post.length}</Typography>
                    <Typography variant="caption" sx={{ color: '#333' }}>Published Notes</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <img src="/image/icons8-like-64.png" alt="Total Likes" style={{ width: 32, marginBottom: 4 }} />
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>{post && totallikes}</Typography>
                    <Typography variant="caption" sx={{ color: '#333' }}>Total Likes</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <img src="/image/icons8-view-50.png" alt="Total Views" style={{ width: 32, marginBottom: 4 }} />
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>{post && totalviews}</Typography>
                    <Typography variant="caption" sx={{ color: '#333' }}>Total Views</Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ color: '#1565c0', mb: 2 }}>User Timeline</Typography>
                  <Box>
                    {post && post.map((note) => (
                      <Post note={note} postUser={user} key={note._id} />
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Box sx={{ pt: 12 }}>
            <CircularLoader item={"User"} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Profile;
