import ProfileHeader from '@/components/Profile/ProfileHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3X3, Bookmark, Tag } from 'lucide-react';

const Profile = () => {
  // Mock data - in real app, this would come from API or props
  const profile = {
    username: 'your_username',
    fullName: 'Your Full Name',
    avatar: '/api/placeholder/80/80',
    bio: 'Living life one post at a time 📸✨ | Travel enthusiast | Coffee lover ☕',
    posts: 24,
    followers: 1245,
    following: 567,
    isOwnProfile: true,
    isFollowing: false
  };

  const userPosts = [
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop',
    '/api/placeholder/300/300'
  ];

  return (
    <div className="max-w-2xl mx-auto px-4">
      <ProfileHeader profile={profile} />
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="flex items-center space-x-2">
            <Grid3X3 size={16} />
            <span>Posts</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center space-x-2">
            <Bookmark size={16} />
            <span>Saved</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center space-x-2">
            <Tag size={16} />
            <span>Tagged</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-3 gap-1">
            {userPosts.map((image, index) => (
              <div key={index} className="aspect-square">
                <img
                  src={image}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover post-card cursor-pointer"
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Bookmark size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No saved posts yet</h3>
              <p className="text-muted-foreground">
                Posts you save will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tagged" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Tag size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tagged posts yet</h3>
              <p className="text-muted-foreground">
                Posts you're tagged in will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;