import MessageList from '@/components/Messaging/MessageList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Messages = () => {
  // Mock data - in real app, this would come from API
  const messages = [
    {
      id: '1',
      user: {
        username: 'john_doe',
        fullName: 'John Doe',
        avatar: '/api/placeholder/48/48'
      },
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2m',
      unread: true,
      unreadCount: 2
    },
    {
      id: '2',
      user: {
        username: 'jane_smith',
        fullName: 'Jane Smith',
        avatar: '/api/placeholder/48/48'
      },
      lastMessage: 'Thanks for sharing that post!',
      timestamp: '1h',
      unread: false,
      unreadCount: 0
    },
    {
      id: '3',
      user: {
        username: 'mike_wilson',
        fullName: 'Mike Wilson',
        avatar: '/api/placeholder/48/48'
      },
      lastMessage: 'See you tomorrow! 👋',
      timestamp: '3h',
      unread: true,
      unreadCount: 1
    },
    {
      id: '4',
      user: {
        username: 'sarah_jones',
        fullName: 'Sarah Jones',
        avatar: '/api/placeholder/48/48'
      },
      lastMessage: 'Love your latest photos!',
      timestamp: '1d',
      unread: false,
      unreadCount: 0
    },
    {
      id: '5',
      user: {
        username: 'alex_brown',
        fullName: 'Alex Brown',
        avatar: '/api/placeholder/48/48'
      },
      lastMessage: 'Can you send me that recipe?',
      timestamp: '2d',
      unread: false,
      unreadCount: 0
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <MessageList messages={messages} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;