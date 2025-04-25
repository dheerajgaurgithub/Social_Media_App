import React from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux
import Feed from './Feed';
import { Outlet } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import userGetAllPost from '../../hooks/userGetAllPost';
import userGetSuggestedUser from '../../hooks/userGetSuggestedUser';
import userGetUserProfile from '../../hooks/userGetUserProfile';

const Home = () => {
  const userId = useSelector((state) => state.auth.userId); 

  userGetAllPost();
  userGetSuggestedUser();
  userGetUserProfile(userId);

  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
