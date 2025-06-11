import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts } from '@/redux/postSlice'
import { Input } from './ui/input'

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector(store => store.post);
  const { user } = useSelector(store => store.auth); // Get logged-in user
  const [comment, setComment] = useState([]);
  const [showFullImage, setShowFullImage] = useState(false); // New state for full image view
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  }

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent 
        onInteractOutside={() => setOpen(false)} 
        className="max-w-7xl w-[95vw] h-[90vh] p-0 flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Image Section */}
        <div className='w-full lg:w-3/5 h-64 lg:h-full bg-black flex items-center justify-center cursor-pointer'
          onClick={() => setShowFullImage(true)} // Click to show full image
        >
          <img
            src={selectedPost?.image}
            alt="post_img"
            className='w-full h-full object-contain lg:object-cover'
          />
        </div>

        {/* Full Image Dialog */}
        {showFullImage && (
          <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
            <DialogContent className="max-w-5xl w-[90vw] h-[90vh] p-0 flex items-center justify-center bg-black">
              <img
                src={selectedPost?.image}
                alt="full_img"
                className='w-full h-full object-contain'
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Content Section */}
        <div className='w-full lg:w-2/5 flex flex-col bg-white'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <div className='flex gap-3 items-center'>
              <Link>
                <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                  <AvatarImage src={selectedPost?.author?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link className='font-semibold text-sm hover:underline'>
                  {selectedPost?.author?.username}
                </Link>
              </div>
            </div>

            {selectedPost?.author?._id !== user?._id && ( // Only show options if not own post
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center max-w-xs">
                  <Button variant="ghost" className='w-full text-red-600 font-bold hover:bg-red-50'>
                    Unfollow
                  </Button>
                  <Button variant="ghost" className='w-full hover:bg-gray-50'>
                    Add to favorites
                  </Button>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Caption */}
          {selectedPost?.caption && (
            <div className='p-4 border-b border-gray-200'>
              <div className='flex gap-3'>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedPost?.author?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <span className='font-semibold text-sm mr-2'>
                    {selectedPost?.author?.username}
                  </span>
                  <span className='text-sm text-gray-800'>
                    {selectedPost?.caption}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4 min-h-0'>
            {comment.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                <p className='text-sm'>No comments yet.</p>
                <p className='text-xs'>Be the first to comment!</p>
              </div>
            ) : (
              comment.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            )}
          </div>

          {/* Comment Input */}
          <div className='p-4 border-t border-gray-200 bg-white'>
            <div className='flex items-center gap-3'>
              <Input
                type="text"
                value={text}
                onChange={changeEventHandler}
                placeholder='Add a comment...'
                className='flex-1 border-0 border-t border-gray-200 rounded-none px-0 focus-visible:ring-0 text-sm'
              />
              <Button 
                disabled={!text.trim()} 
                onClick={sendMessageHandler} 
                variant={text.trim() ? "default" : "ghost"}
                size="sm"
                className="px-4 py-2 text-sm font-semibold"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog
