import { useParams } from 'react-router-dom';
import ChatWindow from '@/components/Messaging/ChatWindow';

const ChatPage = () => {
  const { username } = useParams();

  // Mock data - in real app, this would come from API based on username
  const chatUser = {
    username: username || 'john_doe',
    fullName: 'John Doe',
    avatar: '/api/placeholder/40/40'
  };

  const chatMessages = [
    {
      id: '1',
      text: 'Hey! How are you doing?',
      sender: 'other' as const,
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      text: 'I am doing great! Thanks for asking 😊',
      sender: 'me' as const,
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      text: 'That is awesome! I saw your latest post, it looks amazing!',
      sender: 'other' as const,
      timestamp: '10:35 AM'
    },
    {
      id: '4',
      text: 'Thank you so much! I really appreciate it ❤️',
      sender: 'me' as const,
      timestamp: '10:36 AM'
    },
    {
      id: '5',
      text: 'Are you free this weekend? Would love to catch up!',
      sender: 'other' as const,
      timestamp: '10:40 AM'
    }
  ];

  return <ChatWindow user={chatUser} messages={chatMessages} />;
};

export default ChatPage;