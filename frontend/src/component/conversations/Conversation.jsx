import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = "https://pict-notes.onrender.com/";
  
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await publicRequest("/users/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <div className="conversation-avatar">
        <img
          className="conversationImg"
          src={user && user.profilePicture ? user.profilePicture : PF + "DefaultPic.png"}
          alt={user?.username}
        />
        <div className="online-indicator"></div>
      </div>
      <div className="conversation-info">
        <span className="conversationName">{user?.username}</span>
        <span className="conversation-time">Active recently</span>
      </div>
    </div>
  );
}
