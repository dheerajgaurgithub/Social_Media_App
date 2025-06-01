import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();

    const { messages } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
            {/* User Profile Section */}
            <div className="flex justify-center pb-4 border-b border-gray-100">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <Avatar className="h-16 w-16 md:h-20 md:w-20 ring-2 ring-gray-200">
                        <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                            {selectedUser?.username?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-gray-900 text-sm md:text-base">
                        {selectedUser?.username}
                    </span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="h-8 px-4 text-xs md:text-sm" variant="secondary">
                            View profile
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Messages Section */}
            <div className="space-y-3">
                {messages?.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex items-end gap-2 ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        {/* Avatar for received messages */}
                        {msg.senderId !== user?._id && (
                            <Avatar className="w-6 h-6 md:w-8 md:h-8 mb-1">
                                <AvatarImage src={selectedUser?.profilePicture} />
                                <AvatarFallback className="text-xs">
                                    {selectedUser?.username?.charAt(0)?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}

                        {/* Message Bubble */}
                        <div
                            className={`px-3 py-2 md:px-4 md:py-2 rounded-2xl max-w-[280px] md:max-w-xs lg:max-w-md break-words text-sm md:text-base shadow-sm ${msg.senderId === user?._id
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                                    : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-md'
                                }`}
                        >
                            {msg.message}
                        </div>

                        {/* Avatar for sent messages */}
                        {msg.senderId === user?._id && (
                            <Avatar className="w-6 h-6 md:w-8 md:h-8 mb-1">
                                <AvatarImage src={user?.profilePicture} />
                                <AvatarFallback className="text-xs bg-blue-500 text-white">
                                    {user?.username?.charAt(0)?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messages;
