import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import './SuggestedUsers.css';
import axios from 'axios';
import { toast } from 'sonner';

const SuggestedUsers = () => {
  const { suggestedUsers, user: currentUser } = useSelector((store) => store.auth);
  const [showAll, setShowAll] = useState(false);
  const [followStatus, setFollowStatus] = useState({}); // { userId: true/false }

  // Ensure it's a valid array
  const users = Array.isArray(suggestedUsers) ? suggestedUsers : [];
  const usersToDisplay = showAll ? users : users.slice(0, 3);

  useEffect(() => {
    const initialFollowState = {};
    users.forEach((user) => {
      initialFollowState[user._id] = user.followers?.includes(currentUser?._id);
    });
    setFollowStatus(initialFollowState);
  }, [suggestedUsers, currentUser]);

  const handleFollowToggle = async (userId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/followOrUnfollow/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        const isFollowingNow = !followStatus[userId];
        setFollowStatus((prev) => ({
          ...prev,
          [userId]: isFollowingNow,
        }));
        toast.success(isFollowingNow ? 'Followed successfully' : 'Unfollowed successfully');
      }
    } catch (error) {
      console.error('Follow/Unfollow error:', error);
      toast.error('Something went wrong!');
    }
  };

  if (!Array.isArray(suggestedUsers)) {
    return (
      <div className="suggested-users-container">
        <div className="suggested-users-header">
          <h3>Suggested for you</h3>
        </div>
        <p>Loading suggestions...</p>
      </div>
    );
  }

  return (
    <div className="suggested-users-container">
      <div className="suggested-users-header">
        <h3>Suggested for you</h3>
        <span className="see-all" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show Less' : 'See All'}
        </span>
      </div>

      {usersToDisplay.map((user) => (
        <div key={user._id} className="user-item">
          <div className="user-info">
            <Link to={`/profile/${user._id}`}>
              <div className="profile-card">
                <Avatar className="img">
                  <AvatarImage src={user?.profilePicture || '/fallback-image.jpg'} alt="Profile" />
                  <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </div>
            </Link>
            <div className="user-details">
              <h1 className="username">
                <Link to={`/profile/${user._id}`}>{user.username}</Link>
              </h1>
              <span className="bio">{user.bio || 'Bio here...'}</span>
            </div>
          </div>
          <span
            className="follow-button"
            onClick={() => handleFollowToggle(user._id)}
          >
            {followStatus[user._id] ? 'Unfollow' : 'Follow'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUsers;
