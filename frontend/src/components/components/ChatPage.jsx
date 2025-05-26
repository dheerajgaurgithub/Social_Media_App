import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/authSlice';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import './ChatPage.css'; 
const ChatPage = () => {
  const { user, suggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isOnline = false;

  return (
    <div className="chat-page-container">
      {/* Suggested Users Sidebar */}
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
            suggestedUsers.map((suggestedUser) => (
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
                  <span className={`user-status ${isOnline ? 'online' : 'offline'}`}>
                    {isOnline ? 'online' : 'offline'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedUser ? (
        <section className="chat-main">
          <div className="chat-header">
            <Avatar className='avatar'>
              <AvatarImage src={selectedUser.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="chat-user-info">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <Messages selectedUser={selectedUser}/>
          <div className="chat-footer">
            <input type="text" className="chat-input" placeholder="Message..." />
            <button className="send-button">Send</button>
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
