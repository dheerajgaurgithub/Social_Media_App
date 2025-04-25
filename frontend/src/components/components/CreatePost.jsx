import React, { useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "../lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import './CreatePost.css';
import { toast } from "sonner";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const imgRef = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const { user } = useSelector(store => store.auth);
  const store = useStore();
  const dispatch = useDispatch();

  // File change handler
  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  // Create post handler
  const createPostHandler = async (e) => {
    e.preventDefault();

    if (!caption.trim() || !imageFile) {
      toast.error("Please add caption and image");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", imageFile);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const newPost = res.data.post;
        const currentPosts = store.getState().post.posts;
        dispatch(setPosts([newPost, ...currentPosts]));

        toast.success("Post created!");
        setOpen(false);
        setCaption("");
        setImagePreview("");
        setFile(null);
        setImageFile(null);

        // Optional: Refetch all posts instead of local update
        // const response = await axios.get("http://localhost:8000/api/v1/post/getall", { withCredentials: true });
        // dispatch(setPosts(response.data.posts));
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        toast.error("No response from the server. Please check your connection.");
      } else {
        toast.error("Error in setting up the request.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogContent className="radix-dialog-content">
        <DialogTitle>Create New Post</DialogTitle>
        <DialogDescription>
          Create a new post by adding a caption and image.
        </DialogDescription>

        <form onSubmit={createPostHandler} className="create-post-form">
          <div className="profile">
            <Avatar className="img">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="username">{user?.username}</h1>
            </div>
          </div>

          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="custom-textarea"
            placeholder="Write a caption..."
          />

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="preview" />
            </div>
          )}

          <input
            type="file"
            ref={imgRef}
            className="hidden"
            accept="image/*"
            onChange={fileChangeHandler}
          />

          <button
            type="button"
            className="select-file-button"
            onClick={() => imgRef.current?.click()}
          >
            Select from computer
          </button>

          <Button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </form>
      </DialogContent>
    </DialogPrimitive.Root>
  );
};

export default CreatePost;
