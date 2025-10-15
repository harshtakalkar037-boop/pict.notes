import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  const pf = "https://pict-notes.onrender.com/";
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-content">
        <div className="messageTop">
          {!own && (
            <img
              className="messageImg"
              src={pf + "DefaultPic.png"}
              alt="User"
            />
          )}
          <div className="message-bubble">
            <p className="messageText">{message.text}</p>
          </div>
          {own && (
            <img
              className="messageImg"
              src={pf + "DefaultPic.png"}
              alt="You"
            />
          )}
        </div>
        <div className="messageBottom">
          <span className="message-time">{format(message.createdAt)}</span>
          {own && <span className="message-status">✓✓</span>}
        </div>
      </div>
    </div>
  );
}
