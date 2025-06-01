import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser, user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchAllMessage = async () => {
            if (!selectedUser || !user?.token) return;

            try {
                const res = await axios.get(
                    `http://localhost:8000/api/v1/message/all/${selectedUser?._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log("Get all message error:", error?.response?.data || error.message);
            }
        };

        fetchAllMessage();
    }, [selectedUser, user?.token, dispatch]);
};

export default useGetAllMessage;
