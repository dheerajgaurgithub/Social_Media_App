import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';

const Activity = () => {
  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'like',
      user: { username: 'john_doe', avatar: '/api/placeholder/40/40' },
      text: 'liked your post',
      timestamp: '2m',
      postImage: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      type: 'comment',
      user: { username: 'jane_smith', avatar: '/api/placeholder/40/40' },
      text: 'commented on your post: "Beautiful shot!"',
      timestamp: '1h',
      postImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      type: 'follow',
      user: { username: 'mike_wilson', avatar: '/api/placeholder/40/40' },
      text: 'started following you',
      timestamp: '3h'
    },
    {
      id: '4',
      type: 'like',
      user: { username: 'sarah_jones', avatar: '/api/placeholder/40/40' },
      text: 'liked your post',
      timestamp: '5h',
      postImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop'
    },
    {
      id: '5',
      type: 'comment',
      user: { username: 'alex_brown', avatar: '/api/placeholder/40/40' },
      text: 'commented on your post: "Amazing work! 🔥"',
      timestamp: '1d',
      postImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={16} className="text-red-500" />;
      case 'comment':
        return <MessageCircle size={16} className="text-social-blue" />;
      case 'follow':
        return <UserPlus size={16} className="text-primary" />;
      default:
        return <Heart size={16} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-2 hover:bg-accent rounded-lg transition-smooth">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.username} />
                  <AvatarFallback>{activity.user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{activity.user.username}</span>{' '}
                  <span className="text-muted-foreground">{activity.text}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
              
              {activity.postImage && (
                <div className="w-12 h-12">
                  <img
                    src={activity.postImage}
                    alt="Post"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;