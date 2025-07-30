import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const Explore = () => {
  // Mock explore posts data
  const explorePosts = [
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop',
    '/api/placeholder/300/300',
    '/api/placeholder/300/301',
    '/api/placeholder/300/302',
    '/api/placeholder/300/303',
    '/api/placeholder/300/304',
    '/api/placeholder/300/305',
    '/api/placeholder/300/306'
  ];

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for posts, users, or hashtags..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1">
        {explorePosts.map((image, index) => (
          <div key={index} className="aspect-square">
            <img
              src={image}
              alt={`Explore post ${index + 1}`}
              className="w-full h-full object-cover post-card cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;