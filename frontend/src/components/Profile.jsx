import React, { useState } from "react";
import { Button } from "./ui/button";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Grid, Bookmark, Settings, Archive } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "sonner";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");

  useGetUserProfile(id);
  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === id;
  const [isFollowing, setIsFollowing] = useState(
    userProfile?.followers?.includes(user?._id)
  );

  const handleTabChange = (tab) => setActiveTab(tab);

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const handleFollowUnfollow = async () => {
    const url = `https://social-media-app-u9d1.onrender.com/v1/user/followOrUnfollow/${userProfile?._id}`;
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
      <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-background">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 pb-8 border-b border-border">
          {/* Avatar Section */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-accent">
              <AvatarImage
                src={userProfile?.profilePicture || "/fallback-image.jpg"}
                alt="profile"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                {userProfile?.username?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info Section */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            {/* Username and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-light text-foreground">
                {userProfile?.username || "username"}
              </h1>
              {isLoggedInUserProfile ? (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Link to="/account/edit">
                    <Button variant="outline" size="sm" className="h-8 px-4">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit profile
                    </Button>
                  </Link>
                  {/* <Button variant="outline" size="sm" className="h-8 px-4">
                    <Archive className="w-4 h-4 mr-2" />
                    View archive
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 px-4">
                    Ad tools
                  </Button> */}
                </div>
              ) : (
                <div className="flex gap-2 justify-center sm:justify-start">
                  <Button
                    variant={isFollowing ? "destructive" : "default"}
                    size="sm"
                    className="h-8 px-6"
                    onClick={handleFollowUnfollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-6"
                    onClick={handleMessageClick}
                  >
                    Message
                  </Button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center md:justify-start text-base">
              <div className="text-center md:text-left">
                <span className="font-semibold text-foreground">
                  {userProfile?.posts?.length || 0}
                </span>
                <span className="text-muted-foreground ml-1">posts</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold text-foreground">
                  {userProfile?.followers?.length || 0}
                </span>
                <span className="text-muted-foreground ml-1">followers</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold text-foreground">
                  {userProfile?.following?.length || 0}
                </span>
                <span className="text-muted-foreground ml-1">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <p className="text-foreground leading-relaxed">
                {userProfile?.bio || "No bio available"}
              </p>
              <p className="text-muted-foreground text-sm">
                @{userProfile?.username}
              </p>
              {!isLoggedInUserProfile && (
                <p className="text-muted-foreground text-sm">
                  ❤️ @{userProfile?.username}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-background sticky top-0 z-10 mt-8">
          <button
            className={`flex-1 py-4 px-1 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
              activeTab === "posts"
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => handleTabChange("posts")}
          >
            <Grid className="w-3 h-3" />
            Posts
          </button>
          
          {isLoggedInUserProfile && (
            <button
              className={`flex-1 py-4 px-1 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                activeTab === "saved"
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleTabChange("saved")}
            >
              <Bookmark className="w-3 h-3" />
              Saved
            </button>
          )}
          
          {/* <button className="flex-1 py-4 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
            Reels
          </button>
          
          <button className="flex-1 py-4 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
            Tags
          </button> */}
        </div>

        {/* Posts Grid */}
        <div className="mt-6">
          {displayedPost?.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {displayedPost.map((post) => (
                <div key={post?._id} className="relative aspect-square group cursor-pointer">
                  <img 
                    src={post.image} 
                    alt="post" 
                    className="w-full h-full object-cover rounded-lg group-hover:brightness-75 transition-all duration-200" 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <div className="flex items-center gap-6 text-white">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="font-semibold">{post?.likes?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span className="font-semibold">{post?.comments?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-light text-foreground mb-2">No Posts Yet</h3>
              <p className="text-muted-foreground">When you share photos, they'll appear on your profile.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;