import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, UserPlus, MessageCircle } from 'lucide-react';

interface ProfileHeaderProps {
  profile: {
    username: string;
    fullName: string;
    avatar: string;
    bio: string;
    posts: number;
    followers: number;
    following: number;
    isOwnProfile: boolean;
    isFollowing: boolean;
  };
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="story-ring">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar} alt={profile.username} />
              <AvatarFallback className="text-2xl">
                {profile.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{profile.username}</h1>
              {profile.isOwnProfile ? (
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant={profile.isFollowing ? "outline" : "default"}
                    size="sm"
                    className={!profile.isFollowing ? "gradient-primary" : ""}
                  >
                    <UserPlus size={16} className="mr-2" />
                    {profile.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle size={16} />
                  </Button>
                </div>
              )}
            </div>
            
            <p className="text-lg font-medium mb-2">{profile.fullName}</p>
            
            <div className="flex space-x-6 mb-3">
              <div className="text-center">
                <div className="font-bold text-lg">{profile.posts}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{profile.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{profile.following}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>
            
            <p className="text-sm">{profile.bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;