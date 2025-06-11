import { Heart, Home, LogOut, MessageCircle, PlusSquare, Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'


const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('https://social-media-app-u9d1.onrender.com/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        }
        setMobileMenuOpen(false);
    }

    const sidebarItems = [
        { icon: <Home className="w-6 h-6" />, text: "Home" },
        { icon: <MessageCircle className="w-6 h-6" />, text: "Messages" },
        { icon: <Heart className="w-6 h-6" />, text: "Notifications" },
        { icon: <PlusSquare className="w-6 h-6" />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="Profile" />
                    <AvatarFallback>{user?.username?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut className="w-6 h-6" />, text: "Logout" },
    ]

    const SidebarContent = () => (
        <div className='flex flex-col h-full'>
            <div className="flex-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        SocialConnect
                    </h1>
                <nav className="space-y-2">
                    {sidebarItems.map((item, index) => {
                        return (
                            <div
                                onClick={() => sidebarHandler(item.text)}
                                key={index}
                                className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer rounded-xl p-3 mx-2 transition-colors duration-200 group'
                            >
                                <div className="flex-shrink-0">
                                    {item.icon}
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-gray-900 hidden lg:block">
                                    {item.text}
                                </span>
                                {item.text === "Notifications" && likeNotification.length > 0 && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                size='icon'
                                                className="rounded-full h-5 w-5 bg-red-500 hover:bg-red-600 absolute -top-1 -right-1 text-xs text-white font-bold shadow-lg"
                                            >
                                                {likeNotification.length}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 p-4">
                                            <div>
                                                <h3 className="font-semibold mb-3">Notifications</h3>
                                                {likeNotification.length === 0 ? (
                                                    <p className="text-gray-500 text-sm">No new notifications</p>
                                                ) : (
                                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                                        {likeNotification.map((notification) => (
                                                            <div key={notification.userId} className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg'>
                                                                <Avatar className="w-8 h-8">
                                                                    <AvatarImage src={notification.userDetails?.profilePicture} />
                                                                    <AvatarFallback>
                                                                        {notification.userDetails?.username?.charAt(0)?.toUpperCase() || 'U'}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <p className='text-sm'>
                                                                    <span className='font-semibold'>{notification.userDetails?.username}</span> liked your post
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </div>
                        )
                    })}
                </nav>
            </div>
        </div>
    );
    return (
        <>
            {/* Desktop Sidebar */}
            <div className='fixed top-0 z-20 left-0 border-r border-gray-200 bg-white hidden lg:flex lg:w-16 xl:w-64 h-screen transition-all duration-300'>
                <div className="flex flex-col w-full p-4">
                    <SidebarContent />
                </div>
            </div>
            <CreatePost open={open} setOpen={setOpen} />
        </>
    )
}

export default LeftSidebar
