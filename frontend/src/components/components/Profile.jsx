import React, { useState } from "react";
import { Button } from "./ui/button";
import useGetUserProfile from "../../hooks/userGetUserProfile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Heart, MessageCircle } from "lucide-react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("posts");

  // Fetch the user profile using ID from URL
  useGetUserProfile(id);

  const { userProfile, user } = useSelector((store) => store.auth);


  const isLoggedInUserProfile = user?._id === id;

  const isFollowing = false; 

  const handleTabChange = (tab) => setActiveTab(tab);

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <Avatar>
            <AvatarImage
              src={userProfile?.profilePicture || "/fallback-image.jpg"}
              alt="profile"
              className="avatar-image"
            />
            <AvatarFallback className="avatar-fallback">U</AvatarFallback>
          </Avatar>
        </div>

        <div className="profile-info">
          <div className="profile-username-actions">
            <span className="profile-username">{userProfile?.username}</span>
              {
                  isLoggedInUserProfile ? (
                    <div className="profile-actions">
                      <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
                    </div>
                  ) : (
                    isFollowing ? (
                      <div className="profile-actions">
                        <Button variant='secondary' className='h-8'>Unfollow</Button>
                        <Button variant='secondary' className='h-8'>Message</Button>
                      </div>
                    ) : (
                      <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                    )
                  )
                }
          </div>

          <div className="profile-stats">
            <p><strong>{userProfile?.posts.length || 0}</strong> posts</p>
            <p><strong>{userProfile?.followers.length || 0}</strong> followers</p>
            <p><strong>{userProfile?.following.length || 0}</strong> following</p>
          </div>

          <div className="profile-bio">
            <p className="bio-text">{userProfile?.bio || "bio here ..."}</p>
            <p className="bio-username">@{userProfile?.username}</p>
            {!isLoggedInUserProfile && (
              <p className="bio-love">Love: @{userProfile?.username}</p>
            )}
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
          <>
            <span
              className={`tab-item ${activeTab === "saved" ? "active" : ""}`}
              onClick={() => handleTabChange("saved")}
            >
              Saved
            </span>
          </>
        )}
        <span className="tab-item">Reels</span>
        <span className="tab-item">Tags</span>
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
  );
};

export default Profile;
