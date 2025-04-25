import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/authSlice";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import { setMessages } from "../../redux/chatSlice";
import "./ChatPage.css";
import axios from "axios";

const ChatPage = () => {
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const [textMessage, setTextMessage] = useState("");
  const [notifications, setNotifications] = useState({}); // New state for notifications
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Listen for new messages
  useEffect(() => {
    const handleIncomingMessage = (event) => {
      const newMsg = event.detail; // assuming message comes from customEvent (or socket)
      const senderId = newMsg.senderId;

      if (selectedUser?._id !== senderId) {
        setNotifications((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
      }

      dispatch(setMessages([...messages, newMsg]));
    };

    window.addEventListener("newMessage", handleIncomingMessage); // Replace with socket if needed

    return () => {
      window.removeEventListener("newMessage", handleIncomingMessage);
    };
  }, [messages, selectedUser, dispatch]);

  // Clear notification on selecting a user
  useEffect(() => {
    if (selectedUser) {
      setNotifications((prev) => {
        const updated = { ...prev };
        delete updated[selectedUser._id];
        return updated;
      });
    }
  }, [selectedUser]);

  return (
    <div className="chat-page-container">
      {/* Sidebar */}
      <section className="chat-sidebar">
        <Avatar className="avatar">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h1 className="sidebar-username">{user?.username}</h1>
        <hr className="sidebar-divider" />

        <div className="suggested-users-list">
          {suggestedUsers.length === 0 ? (
            <p className="no-users">No suggested users</p>
          ) : (
            suggestedUsers.map((suggestedUser) => {
              const isOnline = onlineUsers.includes(suggestedUser?._id);
              const hasNotification = notifications[suggestedUser._id];

              return (
                <div
                  key={suggestedUser._id}
                  onClick={() => dispatch(setSelectedUser(suggestedUser))}
                  className="user-card"
                >
                  <Avatar className="avatar">
                    <AvatarImage src={suggestedUser?.profilePicture} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="user-info">
                    <span className="user-name">{suggestedUser?.username}</span>
                    <span
                      className={`user-status ${
                        isOnline ? "online" : "offline"
                      }`}
                    >
                      {isOnline ? "online" : "offline"}
                    </span>
                    {hasNotification && (
                      <span className="notification-badge">{hasNotification}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {selectedUser ? (
        <section className="chat-main">
          <div className="chat-header">
            <Avatar className="avatar">
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="chat-user-info">
              <span>{selectedUser?.username}</span>
            </div>
          </div>

          <Messages key={selectedUser._id} selectedUser={selectedUser} />

          <div className="chat-footer">
            <input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="chat-input"
              placeholder="Message..."
            />
            <button
              onClick={() => sendMessageHandler(selectedUser?._id)}
              className="send-button"
            >
              Send
            </button>
          </div>
        </section>
      ) : (
        <div className="chat-placeholder">
          <MessageCircleCode className="placeholder-icon" />
          <h1>Your Messages</h1>
          <span>Send a message to start the chat</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
