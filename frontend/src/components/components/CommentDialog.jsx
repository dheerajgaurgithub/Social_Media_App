import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import "./CommentDialog.css";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { toast } from "sonner";

const CommentDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { selectedPost, posts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);

  const [text, setText] = useState("");
  const [comments, setComments] = useState(selectedPost?.comments || []);

  useEffect(() => {
    if (selectedPost) {
      setComments(selectedPost.comments || []);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  const sendMessageHandler = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost._id}/comment`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const newComment = res.data.comment;
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);

        const updatedPosts = posts.map((post) =>
          post._id === selectedPost._id
            ? { ...post, comments: updatedComments }
            : post
        );

        dispatch(setPosts(updatedPosts));
        setText("");
        toast.success("Comment added");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  };

  if (!selectedPost) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="dialog-overlay" />
      <DialogContent className="comment-dialog-content">
        <div className="dialog-image-section">
          <img
            src={selectedPost?.image || "/fallback-image.jpg"}
            alt="post_img"
            className="dialog-image"
            onError={(e) => (e.target.src = "/fallback-image.jpg")}
          />
        </div>

        <div className="dialog-comment-section">
          {/* Header */}
          <div className="comment-header">
            <div className="comment-user">
              <Avatar className="avatar">
                <AvatarImage src={selectedPost?.author?.profilePicture} />
                <AvatarFallback>
                  {selectedPost?.author?.username?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="username">{selectedPost?.author?.username}</span>
                <hr />
                <span className="user-bio">{selectedPost?.caption}</span>
              </div>
            </div>

            <div className="comment-actions-dropdown">
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="more-icon" />
                </DialogTrigger>
                <DialogContent className="dropdown-content">
                  <div className="dropdown-option">Unfollow</div>
                  <div className="dropdown-option">Add to favourite</div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <hr className="divider" />

          {/* Comments List */}
          <div className="comments-display">
            {comments.length > 0 ? (
              comments.map((c, idx) => (
                <div key={idx} className="single-comment">
                  <strong>{c.author?.username || "User"}:</strong> {c.text}
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet.</p>
            )}
          </div>

          {/* Input Area */}
          <div className="comment-input-area">
            <input
              type="text"
              value={text}
              onChange={changeEventHandler}
              placeholder="Add a comment..."
              className="comment-input"
            />
            <button
              disabled={!text.trim()}
              onClick={sendMessageHandler}
              className="comment-button"
            >
              Post
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
