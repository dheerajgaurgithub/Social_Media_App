import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Button } from "./ui/button";
import CommentDialog from "./CommentDialog";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "../../redux/postSlice";

const Post = ({ post, onDelete }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  if (!post || !post.author || !post._id) {
    return null;
  }

  const [liked, setLiked] = useState(post.likes?.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes?.length || 0);
  const [comment, setComment] = useState(post.comments || []);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post._id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostData));
        onDelete?.(post._id);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const likeDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Like/Dislike failed");
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const author = post.author;

  return (
    <div className="post-container">
      {/* Header */}
      <div className="post-header">
        <div className="post-header-left">
          <div className="avatar">
            <Avatar>
              <AvatarImage
                src={author?.profilePicture || "/fallback-image.jpg"}
                alt="Profile"
              />
              <AvatarFallback>
                {author?.username?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <Link to={`/profile/${author?._id}`} className="username-link"></Link>
          <h2 className="username flex items-center gap-2">
            {author?.username || "Unknown"}
            {user?._id === author?._id && (
              <span className="text-xs font-semibold text-gray-500 gap-1">
                {" "}
                (Author)
              </span>
            )}
          </h2>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="icon" />
          </DialogTrigger>
          <DialogContent className="dialog-content">
            <button className="dialog-button">Unfollow</button>
            <button className="dialog-button">Add to favourites</button>
            {user && user?._id === author?._id && (
              <Button onClick={deletePostHandler} className="dialog-button">
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Post Image */}
      <img
        className="post-image"
        src={post.image}
        alt="post_img"
        onError={(e) => (e.target.src = "/fallback-image.jpg")}
      />

      {/* Icons */}
      <div className="icon-bar">
        <div className="icon-group">
          {liked ? (
            <FaHeart onClick={likeDislikeHandler} className="icon liked" />
          ) : (
            <FaRegHeart onClick={likeDislikeHandler} className="icon" />
          )}
          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="icon"
          />
          <Send className="icon" />
        </div>
        <Bookmark size={22} className="icon" />
      </div>

      {/* Likes */}
      <span className="likes-count">{postLike} likes</span>

      {/* Caption */}
      <p className="caption">
        <span className="caption-username">{author?.username || "User"}</span>
        {post.caption || ""}
      </p>

      {/* Comments */}
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="view-comments"
        >
          View all {comment.length}
        </span>
      )}

      {/* Comments Dialog */}
      <CommentDialog open={open} setOpen={setOpen} />

      {/* Comment Input */}
      <div className="comment-input-wrapper">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="comment-input"
        />
        {text && (
          <span onClick={commentHandler} className="comment-post-btn">
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
