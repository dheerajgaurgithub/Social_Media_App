import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const SuggestedUsers = () => {
    const { suggestedUsers, user: currentUser } = useSelector((store) => store.auth);
    const [showAll, setShowAll] = useState(false);
    const [followStatus, setFollowStatus] = useState({}); // { userId: true/false }

    const users = Array.isArray(suggestedUsers) ? suggestedUsers : [];
    const usersToDisplay = showAll ? users : users.slice(0, 3);

    useEffect(() => {
        const initialFollowState = {};
        users.forEach((user) => {
            initialFollowState[user._id] = user.followers?.includes(currentUser?._id) || false;
        });
        setFollowStatus(initialFollowState);
    }, [suggestedUsers, currentUser]);

    const handleFollowToggle = async (userId) => {
        try {
            const res = await axios.post(
                `https://social-media-app-u9d1.onrender.com/v1/user/followOrUnfollow/${userId}`,
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                const isFollowingNow = !followStatus[userId];
                setFollowStatus((prev) => ({
                    ...prev,
                    [userId]: isFollowingNow,
                }));
                toast.success(isFollowingNow ? 'Followed successfully' : 'Unfollowed successfully');
            }
        } catch (error) {
            console.error('Follow/Unfollow error:', error);
            toast.error('Something went wrong!');
        }
    };

    if (!Array.isArray(suggestedUsers)) {
        return (
            <div className="w-full max-w-sm mx-auto lg:max-w-none space-y-4 p-4">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Suggested for you</h3>
                </div>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-pulse text-muted-foreground">Loading suggestions...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm mx-auto lg:max-w-none space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Suggested for you</h3>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 cursor-pointer"
                >
                    {showAll ? 'Show Less' : 'See All'}
                </button>
            </div>

            <div className="space-y-3">
                {usersToDisplay.map((user) => (
                    <div key={user._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-all duration-200 group">
                        <Link to={`/profile/${user._id}`} className="flex-shrink-0">
                            <Avatar className="w-12 h-12 ring-2 ring-background shadow-md hover:ring-primary/20 transition-all duration-300">
                                <AvatarImage
                                    src={user?.profilePicture || '/fallback-image.jpg'}
                                    alt={user?.username}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-medium">
                                    {user?.username?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <div className="flex-1 min-w-0">
                            <Link
                                to={`/profile/${user._id}`}
                                className="block hover:text-primary transition-colors duration-200"
                            >
                                <h4 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors duration-200">
                                    {user.username}
                                </h4>
                                <p className="text-xs text-muted-foreground truncate mt-0.5">
                                    {user.bio || 'Bio here...'}
                                </p>
                            </Link>
                        </div>

                        <Button
                            variant={followStatus[user._id] ? "outline" : "default"}
                            size="sm"
                            className="text-xs px-4 py-2 h-8 font-medium flex-shrink-0 transition-all duration-200"
                            onClick={() => handleFollowToggle(user._id)}
                        >
                            {followStatus[user._id] ? 'Unfollow' : 'Follow'}
                        </Button>
                    </div>
                ))}
            </div>

            {users.length === 0 && (
                <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                        <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No Suggestions</h3>
                    <p className="text-muted-foreground text-sm">Check back later for new suggestions.</p>
                </div>
            )}
        </div>
    );
};

export default SuggestedUsers;
