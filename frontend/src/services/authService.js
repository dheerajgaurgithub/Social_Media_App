import { apiRequest, apiFormDataRequest } from './api';

// Auth & User API endpoints
export const authService = {
  // Register new user
  register: async (userData) => {
    return await apiRequest('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    const response = await apiRequest('/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Save token to localStorage if login successful
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Logout user
  logout: async () => {
    const response = await apiRequest('/user/logout');
    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    return response;
  },

  // Get profile by ID
  getProfileById: async (userId) => {
    return await apiRequest(`/user/${userId}/profile`);
  },

  // Get current logged-in user profile
  getCurrentProfile: async () => {
    return await apiRequest('/user/profile');
  },

  // Edit profile with profile photo upload
  editProfile: async (profileData) => {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(profileData).forEach(key => {
      if (key !== 'profilePhoto' && profileData[key]) {
        formData.append(key, profileData[key]);
      }
    });
    
    // Append file if exists
    if (profileData.profilePhoto) {
      formData.append('profilePhoto', profileData.profilePhoto);
    }
    
    return await apiFormDataRequest('/user/profile/edit', formData);
  },

  // Get suggested users to follow
  getSuggestedUsers: async () => {
    return await apiRequest('/user/suggested');
  },

  // Follow or unfollow a user
  followOrUnfollow: async (userId) => {
    return await apiRequest(`/user/followOrUnfollow/${userId}`, {
      method: 'POST',
    });
  },
};

// Helper functions for auth state
export const getAuthToken = () => localStorage.getItem('authToken');
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const isAuthenticated = () => !!getAuthToken();