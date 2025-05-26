import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import "./LeftSidebar.css";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";
import CreatePost from "./CreatePost.jsx";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user, location.pathname]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };

  const sidebarHandler = (textType) => {
    switch (textType) {
      case "LogOut":
        logoutHandler();
        break;
      case "Create":
        setOpen(true);
        break;
      case "Profile":
        navigate(`/profile/${user?._id}`);
        break;
      case "Home":
        navigate("/");
        break;
      case "Messages":
        navigate("/chat");
        break;
      default:
        break;
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Trending" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notification" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar>
          <AvatarImage
            src={user?.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="avatar-img"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "LogOut" },
  ];

  return (
    <div className={`left-sidebar ${!isAuthenticated ? "hidden" : ""}`}>
      <h2 className="logo my-8 pl-3 font-bold text-xl">𝓜𝓪𝓱𝓲𝓻 𝓖𝓪𝓾𝓻</h2>
      <div className="sidebar-menu">
        {sidebarItems.map((item, index) => (
          <div
            onClick={() => sidebarHandler(item.text)}
            key={index}
            className="sidebar-item"
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
