import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import "./EditProfile.css";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";

const EditProfile = () => {
  const imgRef = useRef();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio || "",
    gender: user?.gender || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePhoto: file });
    }
  };

  const selectChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePhoto) {
      formData.append("profilephoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user?.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        toast.success(res.data.message);
        navigate(`/profile/${user?._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <section>
        <h1>Edit (Customize) Profile</h1>

        <div className="user-section">
          <div className="user-details">
            <div className="user-avatar">
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="Profile" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="user-text">
              <h1>{user?.username}</h1>
              <span>{user?.bio || "bio here..."}</span>
            </div>
          </div>

          <input
            ref={imgRef}
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
          />
          <button
            onClick={() => imgRef?.current.click()}
            className="change-photo-btn"
          >
            Change Profile Photo
          </button>
        </div>

        <div className="bio-section">
          <h1>Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="focus-visible:ring-transparent"
          />
        </div>

        <div className="gender-section">
          <h1 className="gender-title">Gender</h1>
          <div className="gender-options">
            <label className="gender-label">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={input.gender === "male"}
                onChange={selectChangeHandler}
              />
              <span>Male</span>
            </label>
            <label className="gender-label">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={input.gender === "female"}
                onChange={selectChangeHandler}
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        {loading ? (
          <Button disabled>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Please wait
          </Button>
        ) : (
          <Button className="change-photo-btn" onClick={editProfileHandler}>Submit</Button>
        )}
      </section>
    </div>
  );
};

export default EditProfile;
