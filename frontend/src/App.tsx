import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useTheme } from "./hooks/useTheme";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFoundPage />,
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
