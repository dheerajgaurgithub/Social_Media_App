import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams(); // The profile's user ID (the user we're viewing)
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch profile data using custom hook
  useGetUserProfile(id);
  const { userProfile, user } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = user?._id === id;

  // Check if current user (viewer) is following the profile
  useEffect(() => {
    if (userProfile?.followers && user?._id) {
      setIsFollowing(userProfile.followers.includes(user._id));
    }
  }, [userProfile, user]);

  const handleFollowUnfollow = async () => {
    if (!user) return alert("You must be logged in to follow/unfollow.");
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/followOrUnfollow/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        // Backend returns whether current user is following after update
        setIsFollowing(res.data.isFollowing);

        // Optional: update userProfile state locally (if you want to reflect new followers count)
        // Since you're using Redux for userProfile, a refresh might be better to reflect latest state

        alert(`You have ${res.data.isFollowing ? 'followed' : 'unfollowed'} ${userProfile?.username}`);
      } else {
        alert("Could not update follow status.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating follow status.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => setActiveTab(tab);
  const displayedPost = activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      <div className="flex flex-col md:flex-row items-start gap-8 p-6 md:p-12 border-b border-gray-200">
        <div className="flex-shrink-0">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-gray-100">
            <AvatarImage src={userProfile?.profilePicture || "/fallback-image.jpg"} alt="profile" className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              {userProfile?.username?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-light text-gray-900">{userProfile?.username}</h1>
            {isLoggedInUserProfile ? (
              <div className="flex flex-wrap gap-2">
                <Link to="/account/edit">
                  <Button variant="outline" className="h-8 px-4 text-sm font-medium">Edit profile</Button>
                </Link>
                <Button variant="outline" className="h-8 px-4 text-sm font-medium">View archive</Button>
                <Button variant="outline" className="h-8 px-4 text-sm font-medium">Ad tools</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  className={`h-8 px-6 text-sm font-medium ${isFollowing ? "bg-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                  onClick={handleFollowUnfollow}
                  disabled={loading}
                >
                  {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
                </Button>
                {isFollowing && (
                  <Button variant="outline" className="h-8 px-6 text-sm font-medium">
                    <MessageCircle className="w-4 h-4 mr-1" /> Message
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-8 text-base">
            <div className="text-center sm:text-left">
              <span className="font-semibold text-gray-900">{userProfile?.posts?.length || 0}</span>
              <span className="text-gray-600 ml-1">posts</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="font-semibold text-gray-900">{userProfile?.followers?.length || 0}</span>
              <span className="text-gray-600 ml-1">followers</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="font-semibold text-gray-900">{userProfile?.following?.length || 0}</span>
              <span className="text-gray-600 ml-1">following</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-gray-900 leading-relaxed">{userProfile?.bio || "No bio available"}</p>
            <p className="text-gray-500 text-sm">@{userProfile?.username}</p>
            {!isLoggedInUserProfile && <p className="text-gray-500 text-sm">❤️ @{userProfile?.username}</p>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-4">
        <Button variant={activeTab === "posts" ? "default" : "outline"} onClick={() => handleTabChange("posts")}>
          Posts
        </Button>
        <Button variant={activeTab === "bookmarks" ? "default" : "outline"} onClick={() => handleTabChange("bookmarks")}>
          Bookmarks
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {displayedPost?.length > 0 ? (
          displayedPost.map((post) => (
            <div key={post._id} className="bg-gray-100 p-2 rounded">
              <img src={post.imageUrl} alt={post.caption} className="w-full h-40 object-cover rounded" />
              <p className="mt-2 text-sm text-gray-700">{post.caption}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No posts to display.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
