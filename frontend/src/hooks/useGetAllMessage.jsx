import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/chatSlice";

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);
  const userId = selectedUser?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(
          `https://localhost:8000/api/v1/message/all/${userId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setMessages({ userId, messages: res.data.messages }));
        }
      } catch (error) {
        console.log("Failed to fetch messages:", error);
      }
    };

    fetchAllMessages();
  }, [userId, dispatch]);
};

export default useGetAllMessage;
