import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useTheme } from "./hooks/useTheme";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const App = () => {
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme === "LIGHT" ? "light-theme" : "dark-theme";
  }, [theme]);

  return <RouterProvider router={router} />;
};

export default App;
