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
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover.jsx";
import { Button } from "./ui/button.jsx";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);

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
    { icon: <MessageCircle />, text: "Messages" },
    {
      icon: <Heart />,
      text: "Notification",
      badge: likeNotification.length,
    },
    { icon: <PlusSquare />, text: "Create" },
  ];

  return (
    <div className={`left-sidebar ${!isAuthenticated ? "hidden" : ""}`}>
      <div className="logo">
        <div className="logo1">Sσƈιαʅ Mҽԃια</div>
      </div>

      <div className="sidebar-scroll-container">
        <div className="sidebar-menu">
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="sidebar-item"
            >
              {item.icon}
              <span>{item.text}</span>
              {item.text === "Notification" && item.badge > 0 && (
                <div className="notif-badge">{item.badge}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-item profile-centered" onClick={() => sidebarHandler("Profile")}>
        <Avatar>
          <AvatarImage
            src={user?.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="avatar-img large-avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

      <div className="sidebar-item" onClick={() => sidebarHandler("LogOut")}>
        <LogOut />
        <span>LogOut</span>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
