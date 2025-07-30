import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImagePlus, X } from 'lucide-react';
import { postService } from '@/services/postService';
import { useToast } from '@/hooks/use-toast';

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      toast({
        title: "Image required",
        description: "Please select an image to share.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await postService.addPost({
        caption,
        image: imageFile,
      });
      
      toast({
        title: "Post created!",
        description: "Your post has been shared successfully.",
      });
      
      setIsOpen(false);
      setCaption('');
      setSelectedImage(null);
      setImageFile(null);
    } catch (error) {
      toast({
        title: "Failed to create post",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary">
          <ImagePlus size={20} className="mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/api/placeholder/40/40" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Your Username</p>
              <p className="text-sm text-muted-foreground">Share your moment</p>
            </div>
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <div>
                <ImagePlus size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Choose a photo to share</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" asChild>
                    <span>Select from device</span>
                  </Button>
                </label>
              </div>
            )}
          </div>

          {/* Caption */}
          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="min-h-[100px] resize-none"
          />

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedImage || loading}
            className="w-full gradient-primary"
          >
            {loading ? 'Sharing...' : 'Share Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;