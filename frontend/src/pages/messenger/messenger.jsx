import Navbar from "../../component/Navbar";
import Conversation from "../../component/conversations/Conversation";
import Message from "../../component/message/Message";
import ChatOnline from "../../component/chatOnline/chatOnline";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from '../../requestMethods';
import { io } from "socket.io-client";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { currentUser:user } = useSelector((state)=>state.user)
  const scrollRef = useRef();

  useEffect(() => {
    // https://notesharing-socket.onrender.com/
    const EndPoint="https://pict-notes-socket.onrender.com/";
    socket.current = io(EndPoint);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await publicRequest.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
   console.log(conversations)
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await publicRequest.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await publicRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ pt: 4, pb: 2 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, background: '#f5faff', boxShadow: '0 2px 12px rgba(33,150,243,0.08)' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 2, minWidth: 260 }}>
              <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>Conversations</Typography>
              <TextField
                placeholder="Search for users"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                {conversations.map((c) => (
                  <Box key={c._id} onClick={() => setCurrentChat(c)} sx={{ mb: 1, cursor: 'pointer' }}>
                    <Conversation conversation={c} currentUser={user} />
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 4, minWidth: 320 }}>
              <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>Chat</Typography>
              <Paper elevation={1} sx={{ p: 2, minHeight: 320, background: '#fff' }}>
                {currentChat ? (
                  <>
                    <Box sx={{ maxHeight: 220, overflowY: 'auto', mb: 2 }}>
                      {messages.map((m, idx) => (
                        <Box ref={scrollRef} key={idx}>
                          <Message message={m} own={m.sender === user._id} />
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        placeholder="Write something..."
                        variant="outlined"
                        size="small"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        fullWidth
                      />
                      <Button onClick={handleSubmit} variant="contained" sx={{ background: '#1976d2', textTransform: 'none', fontWeight: 600 }}>
                        Send
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mt: 4 }}>
                    Open a conversation to start a chat.
                  </Typography>
                )}
              </Paper>
            </Box>
            <Box sx={{ flex: 2, minWidth: 260 }}>
              <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>Online Users</Typography>
              <Paper elevation={1} sx={{ p: 2, background: '#fff' }}>
                <ChatOnline
                  onlineUsers={onlineUsers}
                  currentId={user._id}
                  setCurrentChat={setCurrentChat}
                />
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
