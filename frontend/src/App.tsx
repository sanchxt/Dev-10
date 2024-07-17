import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { RootState } from "./store";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  useEffect(() => {
    document.body.className = theme === "LIGHT" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
