import React, { useState } from "react";
import { Button } from "./ui/button";
import userGetUserProfile from "../../hooks/userGetUserProfile";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Heart, MessageCircle } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");

  userGetUserProfile(id); // ✅ load profile
  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === id;
  const [isFollowing, setIsFollowing] = useState(
    userProfile?.followers?.includes(user?._id)
  );

  const handleTabChange = (tab) => setActiveTab(tab);

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const handleFollowUnfollow = async () => {
    const url = `http://localhost:8000/api/v1/user/followOrUnfollow/${userProfile?._id}`;
    try {
      const res = await axios.post(url, {}, { withCredentials: true });
      if (res.data.success) {
        setIsFollowing((prev) => !prev);
        toast.success(
          isFollowing
            ? "Unfollowed successfully!"
            : "Followed successfully!"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleMessageClick = () => {
    navigate("/chat");
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <Avatar>
              <AvatarImage
                src={userProfile?.profilePicture || "/fallback-image.jpg"}
                alt="profile"
                className="avatar-image"
              />
              <AvatarFallback className="avatar-fallback">CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="profile-info">
            <div className="profile-username-actions">
              <span className="profile-username">
                {userProfile?.username || "username"}
              </span>
              {isLoggedInUserProfile ? (
                <div className="profile-actions">
                  <Link to="/account/edit">
                    <Button variant="secondary" className="h-8">
                      Edit Profile
                    </Button>
                  </Link>
                  <Button variant="secondary" className="h-8">
                    View Archive
                  </Button>
                  <Button variant="secondary" className="h-8">
                    Ad Tools
                  </Button>
                </div>
              ) : (
                <div className="profile-actions">
                  <Button
                    variant="secondary"
                    className={`h-8 ${
                      isFollowing ? "bg-red-500" : "bg-[#0095F6]"
                    }`}
                    onClick={handleFollowUnfollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                  <Button
                    variant="secondary"
                    className="h-8"
                    onClick={handleMessageClick}
                  >
                    Message
                  </Button>
                </div>
              )}
            </div>

            <div className="profile-stats">
              <p>
                <strong>{userProfile?.posts?.length || 0}</strong> posts
              </p>
              <p>
                <strong>{userProfile?.followers?.length || 0}</strong> followers
              </p>
              <p>
                <strong>{userProfile?.following?.length || 0}</strong> following
              </p>
            </div>

            <div className="profile-bio">
              <p className="bio-text">{userProfile?.bio || "bio here ..."}</p>
              <p className="bio-username">@{userProfile?.username}</p>
              {!isLoggedInUserProfile && (
                <p className="bio-love">Love: @{userProfile?.username}</p>
              )}
            </div>
            <div className="full name">
              <p className="bio=text"></p>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <span
            className={`tab-item ${activeTab === "posts" ? "active" : ""}`}
            onClick={() => handleTabChange("posts")}
          >
            Posts
          </span>
          {isLoggedInUserProfile && (
            <span
              className={`tab-item ${activeTab === "saved" ? "active" : ""}`}
              onClick={() => handleTabChange("saved")}
            >
              Saved
            </span>
          )}
          {/* <span className="tab-item">Reels</span>
          <span className="tab-item">Tags</span> */}
        </div>

        <div className="profile-grid">
          {displayedPost?.length > 0 ? (
            displayedPost.map((post) => (
              <div key={post?._id} className="post-item">
                <img src={post.image} alt="post" className="post-image" />
                <div className="post-overlay">
                  <div className="overlay-content">
                    <div className="likes-comments">
                      <Heart className="icon" />
                      <span>{post?.likes.length}</span>
                    </div>
                    <div className="likes-comments">
                      <MessageCircle className="icon" />
                      <span>{post?.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-posts-text">No posts to show</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
