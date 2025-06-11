import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2, ImagePlus, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector((store) => store.auth.user);
  const posts = useSelector((store) => store.post.posts);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const dataUrl = await readFileAsDataURL(selectedFile);
      setImagePreview(dataUrl);
    }
  };

  const removeImage = () => {
    setFile(null);
    setImagePreview('');
    if (imageRef.current) {
      imageRef.current.value = '';
    }
  };

  const createPostHandler = async () => {
    if (!caption.trim() && !imagePreview) {
      toast.error('Please add a caption or image');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    if (imagePreview && file) formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post('https://social-media-app-u9d1.onrender.com/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
        // Reset form
        setCaption('');
        setFile(null);
        setImagePreview('');
        if (imageRef.current) {
          imageRef.current.value = '';
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-0"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 sm:p-6">
          <DialogHeader className="text-center">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create New Post
            </h2>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* User Info */}
          <div className="flex gap-3 items-center p-3 bg-gray-50/50 rounded-xl">
            <Avatar className="w-12 h-12 ring-2 ring-purple-200">
              <AvatarImage src={user?.profilePicture} alt="profile" />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{user?.username || 'User'}</h3>
              <p className="text-sm text-gray-500 truncate">Share your moment with the world</p>
            </div>
          </div>

          {/* Caption Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">What's on your mind?</label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px] resize-none border-gray-200 focus:border-purple-300 focus:ring-purple-200 focus:ring-2 focus:ring-opacity-50 rounded-xl"
              placeholder="Write a caption..."
              maxLength={2200}
            />
            <div className="text-right text-xs text-gray-400">{caption.length}/2200</div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative group">
              <div className="relative w-full max-h-80 overflow-hidden rounded-xl border-2 border-gray-100">
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Button onClick={removeImage} variant="destructive" size="icon" className="rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* File Input */}
          <input ref={imageRef} type="file" className="hidden" onChange={fileChangeHandler} accept="image/*" />

          {/* Action Buttons */}
          <div className="space-y-3">
            {!imagePreview && (
              <Button
                onClick={() => imageRef.current?.click()}
                variant="outline"
                className="w-full h-12 border-dashed border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-200"
              >
                <ImagePlus className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Select image from computer</span>
              </Button>
            )}

            {imagePreview && !loading && (
              <Button onClick={() => imageRef.current?.click()} variant="outline" className="w-full">
                <ImagePlus className="mr-2 h-4 w-4" />
                Change Image
              </Button>
            )}

            {/* Post Button */}
            <Button
              onClick={createPostHandler}
              disabled={loading || (!caption.trim() && !imagePreview)}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Post...
                </>
              ) : (
                <>Share Post</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
