import { apiRequest, apiFormDataRequest } from './api';

// Post API endpoints
export const postService = {
  // Add a new post (with image/video)
  addPost: async (postData) => {
    const formData = new FormData();
    
    // Append text fields
    if (postData.caption) {
      formData.append('caption', postData.caption);
    }
    
    // Append file if exists
    if (postData.image) {
      formData.append('image', postData.image);
    }
    
    return await apiFormDataRequest('/post/addpost', formData);
  },

  // Get all posts
  getAllPosts: async () => {
    return await apiRequest('/post/all');
  },

  // Get all posts by logged-in user
  getUserPosts: async () => {
    return await apiRequest('/post/userpost/all');
  },

  // Like a post
  likePost: async (postId) => {
    return await apiRequest(`/post/${postId}/like`);
  },

  // Dislike a post
  dislikePost: async (postId) => {
    return await apiRequest(`/post/${postId}/dislike`);
  },

  // Add comment to a post
  addComment: async (postId, commentText) => {
    return await apiRequest(`/post/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify({ text: commentText }),
    });
  },

  // Get all comments for a post
  getComments: async (postId) => {
    return await apiRequest(`/post/${postId}/comment/all`, {
      method: 'POST',
    });
  },

  // Delete a post
  deletePost: async (postId) => {
    return await apiRequest(`/post/delete/${postId}`, {
      method: 'DELETE',
    });
  },

  // Bookmark a post
  bookmarkPost: async (postId) => {
    return await apiRequest(`/post/${postId}/bookmark`);
  },

  // Mark post as favorite
  favoritePost: async (postId) => {
    return await apiRequest(`/post/${postId}/favorite`);
  },
};