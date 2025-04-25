import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setSuggestedUsers } from "../redux/authSlice";

const userGetSuggestedUser = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchSuggestedUser=async()=>{
      try {
        const res=await axios.get("http://localhost:8000/api/v1/user/suggested", {withCredentials:true});
        if(res.data.success){
          dispatch(setSuggestedUsers(res.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSuggestedUser();
  },[]);
};

export default userGetSuggestedUser;
