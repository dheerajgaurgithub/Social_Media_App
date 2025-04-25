import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './RightSidebar.css'; // External CSS
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="right-sidebar-container">
        <Link to={`/profile/${user?._id}`} className="user-link">
        <Avatar className="avatar">
          <AvatarImage
            src={user?.profilePicture || '/fallback-image.jpg'}
            alt="Profile"
          />
          <AvatarFallback className="fallback">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="user-details">
          <span className="username">{user?.username || 'Unknown User'}</span>
          <span className="bio">{user?.bio || 'Bio here...'}</span>
        </div>
      </Link>
      <SuggestedUsers/>
    </div>
  );
};

export default RightSidebar;
