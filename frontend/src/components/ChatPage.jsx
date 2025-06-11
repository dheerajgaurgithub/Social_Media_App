import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode, Send, ArrowLeft } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState('');
    const [showUsersList, setShowUsersList] = useState(true);

    const { user, suggestedUsers, selectedUser } = useSelector((store) => store.auth);
    const { onlineUsers, messages } = useSelector((store) => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        if (!textMessage.trim()) return;
        try {
            const res = await axios.post(
                `https://social-media-app-u9d1.onrender.com/v1/message/send/${receiverId}`,
                { textMessage },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUserSelect = (suggestedUser) => {
        dispatch(setSelectedUser(suggestedUser));
        setShowUsersList(false); // Hide users list on mobile
    };

    const handleBackToUsers = () => {
        setShowUsersList(true);
        dispatch(setSelectedUser(null));
    };

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        };
    }, [dispatch]);

    return (
        <div className="ml-[199px] min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="flex h-screen max-w-7xl mx-auto w-full overflow-hidden">

                {/* Users List Sidebar */}
                <section
                    className={`
            ${showUsersList || !selectedUser ? 'flex' : 'hidden'} 
            md:flex 
            w-full md:w-80 lg:w-96 
            bg-white/80 backdrop-blur-lg 
            border-r border-gray-200/50 
            flex-col
            flex-shrink-0
        `}
                >
                    <div className="p-6 border-b border-gray-200/50 flex items-center gap-3">
                        <Avatar className="w-12 h-12 ring-2 ring-blue-200">
                            <AvatarImage src={user?.profilePicture} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                {user?.username?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-xl text-gray-900">{user?.username}</h1>
                            <p className="text-sm text-gray-500">Messages</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 space-y-2">
                            {suggestedUsers?.map((suggestedUser) => {
                                const isOnline = onlineUsers?.includes(suggestedUser?._id);
                                const isSelected = selectedUser?._id === suggestedUser?._id;
                                return (
                                    <div
                                        key={suggestedUser._id}
                                        onClick={() => handleUserSelect(suggestedUser)}
                                        className={`flex gap-3 items-center p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-blue-50/70 ${isSelected ? 'bg-blue-100/70 ring-1 ring-blue-200' : ''
                                            }`}
                                    >
                                        <div className="relative">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={suggestedUser?.profilePicture} />
                                                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                                    {suggestedUser?.username?.charAt(0)?.toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div
                                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'
                                                    }`}
                                            ></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="font-medium text-gray-900 block truncate">{suggestedUser?.username}</span>
                                            <span className={`text-xs font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                                                {isOnline ? 'Active now' : 'Offline'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Chat Section */}
                {selectedUser ? (
                    <section
                        className={`
              ${!showUsersList ? 'flex' : 'hidden'} 
              md:flex 
              flex-grow 
              bg-white/60 backdrop-blur-lg 
              flex-col h-full
              overflow-hidden
            `}
                        style={{ minWidth: 0 }}
                    >
                        {/* Chat Header */}
                        <div className="flex gap-3 items-center px-4 md:px-6 py-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                            <Button variant="ghost" size="icon" className="md:hidden" onClick={handleBackToUsers}>
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                    {selectedUser?.username?.charAt(0)?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 truncate">{selectedUser?.username}</h3>
                                <p className="text-xs text-gray-500 truncate">
                                    {onlineUsers?.includes(selectedUser?._id) ? 'Active now' : 'Offline'}
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <Messages selectedUser={selectedUser} />

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <Input
                                    value={textMessage}
                                    onChange={(e) => setTextMessage(e.target.value)}
                                    type="text"
                                    className="flex-1 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                    placeholder="Type a message..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && textMessage.trim()) {
                                            sendMessageHandler(selectedUser?._id);
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => sendMessageHandler(selectedUser?._id)}
                                    disabled={!textMessage.trim()}
                                    className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                                    size="icon"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div
                        className={`${showUsersList ? 'hidden' : 'flex'} md:flex flex-grow flex-col items-center justify-center bg-white/40 backdrop-blur-lg`}
                        style={{ minWidth: 0 }}
                    >
                        <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 max-w-md mx-4">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <MessageCircleCode className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Messages</h2>
                            <p className="text-gray-600 mb-6">Send a message to start a conversation with your friends.</p>
                            <Button
                                onClick={() => setShowUsersList(true)}
                                className="md:hidden bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                                Browse Contacts
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
