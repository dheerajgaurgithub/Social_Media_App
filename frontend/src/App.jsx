import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import Signup from "./components/components/Signup";
import Login from "./components/components/Login";
import MainLayout from "./components/components/MainLayout";
import Home from "./components/components/Home";
import Profile from "./components/components/Profile";
import SuggestedUsers from "./components/components/SuggestedUsers";
import EditProfile from "./components/components/EditProfile";
import ChatPage from "./components/components/ChatPage";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtm.Slice";


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element:  <MainLayout/> ,
    children: [
      { path: "/", element: <Home />  },
      { path: "/profile/:id", element: <Profile />  },
      { path: "/account/edit", element: <EditProfile />},
      { path: "/suggested", element:<SuggestedUsers />},
      { path: "/chat", element: <ChatPage />}
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> }
]);

function App() {

  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      socketio.on('notification',(notification)=>{
        dispatch(setLikeNotification(notification));
      })
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
