import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { Button } from './ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';

const Post = ({ post, onDelete }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const { posts } = useSelector((store) => store.post);
    const [liked, setLiked] = useState(post.likes?.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes?.length || 0);
    const [comment, setComment] = useState(post.comments || []);
    const [bookmarked, setBookmarked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const dispatch = useDispatch();

    if (!post || !post.author || !post._id) return null;

    const author = post.author;

    useEffect(() => {
        if (author && user) {
            setIsFollowing(author.followers?.includes(user._id) || false);
        }
    }, [author, user]);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setText(inputText.trim() ? inputText : "");
    };

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`https://social-media-app-u9d1.onrender.com/v1/post/${post._id}/${action}`, { withCredentials: true });
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const commentHandler = async () => {
        try {
            const res = await axios.post(`https://social-media-app-u9d1.onrender.com/v1/post/${post._id}/comment`, { text }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`https://social-media-app-u9d1.onrender.com/v1/post/delete/${post._id}`, { withCredentials: true });
            if (res.data.success) {
                const updatedPostData = posts.filter(postItem => postItem._id !== post._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                onDelete?.(post._id);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error deleting post');
        }
    };

    const bookmarkHandler = async () => {
        try {
            const res = await axios.get(`https://social-media-app-u9d1.onrender.com/v1/post/${post._id}/bookmark`, { withCredentials: true });
            if (res.data.success) {
                setBookmarked(!bookmarked);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFollowUnfollow = async () => {
        try {
            const url = `https://social-media-app-u9d1.onrender.com/v1/user/followOrUnfollow/${author._id}`;
            const res = await axios.post(url, {}, { withCredentials: true });
            if (res.data.success) {
                setIsFollowing(prev => !prev);
                toast.success(isFollowing ? "Unfollowed successfully!" : "Followed successfully!");
            }
        } catch (error) {
            console.error("Follow/Unfollow error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <article className='w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl'>
            {/* Header */}
            <div className='flex items-center justify-between p-4 pb-3'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/${author._id}`}>
                        <Avatar className="w-11 h-11 ring-2 ring-gray-100 hover:ring-blue-200 transition-all duration-300">
                            <AvatarImage src={author.profilePicture} alt="profile" />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                                {author.username?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                    <div className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <Link to={`/profile/${author._id}`} className='font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors duration-200'>
                                {author.username}
                            </Link>
                            {user?._id === author._id && (
                                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200">
                                    Author
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-full">
                            <MoreHorizontal className='w-5 h-5 text-gray-600' />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm mx-auto rounded-2xl p-0 overflow-hidden">
                        <div className="flex flex-col">
                            {post.author._id !== user._id && (
                                <>
                                    <Button onClick={handleFollowUnfollow} variant='ghost' className="py-4 text-blue-600 font-semibold border-b border-gray-100 rounded-none hover:bg-blue-50">
                                        {isFollowing ? 'Unfollow' : 'Follow'}
                                    </Button>
                                </>
                            )}
                            {user && user._id === post.author._id && (
                                <Button onClick={deletePostHandler} variant='ghost' className="py-4 text-red-500 font-semibold rounded-none hover:bg-red-50">
                                    Delete
                                </Button>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Image */}
            <div className="relative bg-gray-50">
                <img
                    className='w-full aspect-square object-cover'
                    src={post.image}
                    alt="post content"
                    loading="lazy"
                    onError={(e) => { e.target.src = "/fallback-image.jpg"; }}
                />
            </div>

            {/* Actions */}
            <div className='p-4'>
                <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-4'>
                        <button onClick={likeOrDislikeHandler} className="transition-all duration-300 hover:scale-110 active:scale-95">
                            {liked ? (
                                <FaHeart size={24} className='text-red-500 drop-shadow-sm' />
                            ) : (
                                <FaRegHeart size={24} className='text-gray-700 hover:text-red-400 transition-colors duration-200' />
                            )}
                        </button>
                        <button onClick={() => { dispatch(setSelectedPost(post)); setOpen(true); }} className="transition-all duration-300 hover:scale-110 active:scale-95">
                            <MessageCircle className='w-6 h-6 text-gray-700 hover:text-blue-500 transition-colors duration-200' />
                        </button>
                        <button className="transition-all duration-300 hover:scale-110 active:scale-95">
                            <Send className='w-6 h-6 text-gray-700 hover:text-green-500 transition-colors duration-200' />
                        </button>
                    </div>
                    <button onClick={bookmarkHandler} className="transition-all duration-300 hover:scale-110 active:scale-95">
                        <Bookmark className={`w-6 h-6 transition-colors duration-200 ${bookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-700 hover:text-yellow-500'}`} />
                    </button>
                </div>

                {/* Likes */}
                <div className='mb-3'>
                    <span className='font-semibold text-gray-900 text-sm'>
                        {postLike} {postLike === 1 ? 'like' : 'likes'}
                    </span>
                </div>

                {/* Caption */}
                <div className='mb-3'>
                    <span className='font-semibold text-gray-900 text-sm mr-2'>
                        {author.username}
                    </span>
                    <span className='text-gray-900 text-sm leading-relaxed'>
                        {post.caption}
                    </span>
                </div>

                {/* Comments Link */}
                {comment.length > 0 && (
                    <button onClick={() => { dispatch(setSelectedPost(post)); setOpen(true); }} className='text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200 mb-3 block'>
                        View all {comment.length} comments
                    </button>
                )}

                {/* Add Comment */}
                <div className='flex items-center gap-3 pt-3 border-t border-gray-100'>
                    <input
                        type="text"
                        placeholder='Add a comment...'
                        value={text}
                        onChange={changeEventHandler}
                        className='flex-1 outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent py-2'
                    />
                    {text && (
                        <button onClick={commentHandler} className='text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors duration-200 px-2'>
                            Post
                        </button>
                    )}
                </div>
            </div>

            <CommentDialog open={open} setOpen={setOpen} />
        </article>
    );
};

export default Post;
