import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const url = `http://localhost:8000/api/v1/user/${userId}/profile`;
      console.log("Requesting URL:", url); // Log the URL to make sure it's correct

      try {
        const res = await axios.get(url, { withCredentials: true });
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user)); // Store user profile in Redux state
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    if (userId) {
      fetchUserProfile();
    }
  }, [userId, dispatch]);
};

export default useGetUserProfile;
