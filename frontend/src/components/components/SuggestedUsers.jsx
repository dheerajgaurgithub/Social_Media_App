import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import './SuggestedUsers.css'; 

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div className="suggested-users-container">
      <div className="suggested-users-header">
        <h3>Suggested for you</h3>
        <span className="cursor-pointer">See All</span>
      </div>

      {Array.isArray(suggestedUsers) && suggestedUsers.map((user) => (
        <div key={user._id} className="user-item">
          <div className="user-info">
            <Link to={`/profile/${user?._id}`}>
              <div className="profile-card">
                <Avatar className="p">
                  {/* Show the user's own profile picture */}
                  <AvatarImage src={user?.profilePicture || '/fallback-image.jpg'} alt="Profile" />
                  <AvatarFallback>{user?.username?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </div>
            </Link>
            <div className="user-details">
              <h1 className="username">
                <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
              </h1>
              <span className="bio">{user?.bio || 'Bio here...'}</span>
            </div>
          </div>
          <span className="follow-button">Follow</span>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUsers;
