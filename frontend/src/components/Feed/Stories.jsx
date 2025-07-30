import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

interface Story {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  viewed: boolean;
}

interface StoriesProps {
  stories: Story[];
}

const Stories = ({ stories }: StoriesProps) => {
  return (
    <div className="flex space-x-4 p-4 overflow-x-auto">
      {/* Add Your Story */}
      <div className="flex flex-col items-center space-y-2 min-w-0">
        <div className="relative">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/api/placeholder/64/64" alt="Your story" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
            <Plus size={16} className="text-white" />
          </div>
        </div>
        <span className="text-xs text-center font-medium">Your story</span>
      </div>

      {/* Stories */}
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center space-y-2 min-w-0">
          <div className={`story-ring ${story.viewed ? 'opacity-50' : ''}`}>
            <Avatar className="w-16 h-16">
              <AvatarImage src={story.user.avatar} alt={story.user.username} />
              <AvatarFallback>{story.user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs text-center font-medium max-w-[60px] truncate">
            {story.user.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;