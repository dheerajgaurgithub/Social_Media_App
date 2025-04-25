import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);

  if (!Array.isArray(posts)) {
    return <div>No posts available.</div>; // or a loading spinner or error message
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id || post.title || post.createdAt} post={post} />
      ))}
    </div>
  );
};

export default Posts;
