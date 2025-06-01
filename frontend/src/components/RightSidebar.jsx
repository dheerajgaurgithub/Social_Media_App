import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';
import { User, ChevronRight } from 'lucide-react';

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-full max-w-sm mx-auto lg:max-w-none lg:w-80 xl:w-96 p-4 lg:p-6 space-y-6">
      {/* User Profile Card */}
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <Link 
          to={`/profile/${user?._id}`} 
          className="block p-6 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 ring-2 ring-white shadow-md group-hover:ring-indigo-200 transition-all duration-300">
                <AvatarImage
                  src={user?.profilePicture || '/fallback-image.jpg'}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-bold">
                  {user?.username?.charAt(0)?.toUpperCase() || <User className="w-6 h-6" />}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-lg group-hover:text-indigo-700 transition-colors duration-200">
                {user?.username || 'Unknown User'}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                {user?.bio || 'Add a bio to tell people about yourself...'}
              </p>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200 flex-shrink-0" />
          </div>
        </Link>
      </div>

      {/* Suggested Users Section */}
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Suggested for you
            </h2>
            <Link 
              to="/explore" 
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
            >
              See All
            </Link>
          </div>
          <SuggestedUsers />
        </div>
      </div>

      {/* Footer Links */}
      <div className="hidden lg:block bg-white/50 backdrop-blur-lg rounded-2xl shadow-md border border-white/10 p-6">
        <div className="space-y-3 text-xs text-gray-500">
          <div className="flex flex-wrap gap-2">
            <Link to="/about" className="hover:text-gray-700 transition-colors">About</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-gray-700 transition-colors">Help</Link>
            <span>•</span>
            <Link to="/press" className="hover:text-gray-700 transition-colors">Press</Link>
            <span>•</span>
            <Link to="/api" className="hover:text-gray-700 transition-colors">API</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/jobs" className="hover:text-gray-700 transition-colors">Jobs</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <p className="text-gray-400">© 2024 BlueSocial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;