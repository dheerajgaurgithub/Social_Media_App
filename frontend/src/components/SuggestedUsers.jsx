import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { User } from 'lucide-react';

const SuggestedUsers = () => {
    const { suggestedUsers = [], user } = useSelector((store) => store.auth);

    // Track follow/unfollow state for each user
    const [followState, setFollowState] = useState({});

    const handleFollowToggle = async (userId) => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/user/followOrUnfollow/${userId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );

            setFollowState((prev) => ({
                ...prev,
                [userId]: !prev[userId],
            }));
        } catch (error) {
            console.error('Follow/unfollow error:', error);
            alert("You must be logged in to follow/unfollow users.");
        }
    };

    return (
        <div className="w-full space-y-4">
            <div className="space-y-4">
                {suggestedUsers.length > 0 ? (
                    suggestedUsers.map((suggestedUser) => (
                        <div
                            key={suggestedUser._id}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/50 transition-all duration-200 group"
                        >
                            <Link to={`/profile/${suggestedUser._id}`} className="flex-shrink-0">
                                <Avatar className="w-12 h-12 ring-2 ring-white shadow-md hover:ring-indigo-200 transition-all duration-300">
                                    <AvatarImage
                                        src={suggestedUser.profilePicture || ''}
                                        alt={suggestedUser.username}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium">
                                        {suggestedUser.username?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>

                            <div className="flex-1 min-w-0">
                                <Link
                                    to={`/profile/${suggestedUser._id}`}
                                    className="block hover:text-indigo-700 transition-colors duration-200"
                                >
                                    <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-indigo-700">
                                        {suggestedUser.username}
                                    </h4>
                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                        {suggestedUser.bio}
                                    </p>
                                </Link>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-4 py-2 h-8 bg-white hover:bg-indigo-50 border-indigo-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-300 transition-all duration-200 font-medium flex-shrink-0"
                                onClick={() => handleFollowToggle(suggestedUser._id)}
                            >
                                {followState[suggestedUser._id] ? 'Unfollow' : 'Follow'}
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No suggestions at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default SuggestedUsers;
