import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  user: {
    username: string;
    fullName: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  unreadCount: number;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <Link key={message.id} to={`/app/messages/${message.user.username}`}>
          <Card className="post-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={message.user.avatar} alt={message.user.username} />
                  <AvatarFallback>{message.user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{message.user.fullName}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      {message.unread && (
                        <Badge variant="default" className="bg-primary">
                          {message.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm truncate ${message.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                    {message.lastMessage}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MessageList;