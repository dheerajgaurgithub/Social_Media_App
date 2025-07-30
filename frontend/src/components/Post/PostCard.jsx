import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { postService } from '@/services/postService';
import { useToast } from '@/hooks/use-toast';

const PostCard = ({ post, onUpdate }) => {
  const [liked, setLiked] = useState(post.liked);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    setLoading(true);
    try {
      if (liked) {
        await postService.dislikePost(post.id);
      } else {
        await postService.likePost(post.id);
      }
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      toast({
        title: "Action failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    try {
      await postService.bookmarkPost(post.id);
      setBookmarked(!bookmarked);
      toast({
        title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
        description: bookmarked ? "Post removed from your saved items." : "Post saved to your bookmarks.",
      });
    } catch (error) {
      toast({
        title: "Action failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="post-card mb-6 overflow-hidden">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.user.avatar} alt={post.user.username} />
              <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.user.username}</p>
              <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={16} />
          </Button>
        </div>

        {/* Post Image */}
        <div className="relative">
          <img
            src={post.image}
            alt="Post"
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Post Actions */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={loading}
                className={`like-button p-1 ${liked ? 'text-coral' : 'text-foreground'}`}
              >
                <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
              </Button>
              <Button variant="ghost" size="sm" className="p-1">
                <MessageCircle size={24} />
              </Button>
              <Button variant="ghost" size="sm" className="p-1">
                <Share size={24} />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`p-1 ${bookmarked ? 'text-primary' : 'text-foreground'}`}
            >
              <Bookmark size={24} fill={bookmarked ? 'currentColor' : 'none'} />
            </Button>
          </div>

          {/* Likes Count */}
          <p className="font-semibold text-sm mb-1">
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </p>

          {/* Caption */}
          <div className="mb-2">
            <span className="font-semibold text-sm mr-2">{post.user.username}</span>
            <span className="text-sm">{post.caption}</span>
          </div>

          {/* Comments */}
          {post.comments > 0 && (
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground">
              View all {post.comments} comments
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;