import Signup from "./components/components/Signup";
import Login from "./components/components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/components/MainLayout";
import Home from "./components/components/Home";
import Profile from "./components/components/Profile";
import SuggestedUsers from "./components/components/SuggestedUsers";
import EditProfile from "./components/components/EditProfile";
import ChatPage from "./components/components/ChatPage";
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/account/edit",
        element: <EditProfile/>,
      },
      {
        path:"/suggested",
        element:<SuggestedUsers/>
      },
      {
        path:"/chat",
        element:<ChatPage/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
