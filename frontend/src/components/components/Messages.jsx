// src/components/Messages.jsx

import React, { useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import "./Messages.css";
import useGetAllMessage from "../../hooks/useGetAllMessage";
import useGetRTM from "../../hooks/useGetRTM";

const Messages = ({ selectedUser }) => {
  const socket = useGetRTM();
  const { user } = useSelector((store) => store.auth);
  const { messages } = useSelector((store) => store.chat);
  const endRef = useRef(null);

  useGetAllMessage(selectedUser?._id);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter messages between user and selectedUser
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === user._id && msg.receiverId === selectedUser._id) ||
      (msg.senderId === selectedUser._id && msg.receiverId === user._id)
  );

  return (
    <div className="message-wrapper">
      {/* Centered profile card */}
      <div className="profile">
        <Avatar className="avatar-large">
          <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Link to={`/profile/${selectedUser?._id}`}>
          <Button className="view-profile">View Profile</Button>
        </Link>
      </div>

      {/* Message Bubbles */}
      <div className="bubble-wrapper">
        {filteredMessages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs break-words ${
                msg.senderId === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default Messages;
