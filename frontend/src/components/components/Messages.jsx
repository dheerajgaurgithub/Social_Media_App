import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import "./Messages.css";

const Messages = ({ selectedUser }) => {
  return (
    <div className="message-wrapper">
      {/* Centered profile card */}
      <div className="profile-card">
        <Avatar className="avatar-large">
          <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Link to={`/profile/${selectedUser?._id}`}>
          <Button className="view-profile">View Profile</Button>
        </Link>
      </div>

      <div className="bubble-wrapper">
        {["1", "2", "3", "4"].map((msg, idx) => (
          <div className="bubble" key={idx}>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
