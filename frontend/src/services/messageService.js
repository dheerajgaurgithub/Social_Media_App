import { apiRequest } from './api';

// Messaging API endpoints
export const messageService = {
  // Send a message to user
  sendMessage: async (userId, messageText) => {
    return await apiRequest(`/message/send/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ message: messageText }),
    });
  },

  // Get all messages with a user
  getMessages: async (userId) => {
    return await apiRequest(`/message/all/${userId}`);
  },

  // Get all conversations (chats list)
  getConversations: async () => {
    return await apiRequest('/message/conversations');
  },
};