import { useEffect, lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from "./store";
import PrivateRoute from "./components/PrivateRoute";
import LoaderAnimation from "./components/LoaderAnimation";

const Home = lazy(() => import("./pages/Home"));
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Resources from "./pages/Resources";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ResourceById from "./pages/ResourceById";
import ContributeResources from "./pages/ContributeResources";
import { LOADER_DURATION } from "./utils/constants";
import FavouriteResources from "./pages/FavouriteResources";
import ProjectStructure from "./components/home/ProjectStructure";
import Trending from "./pages/Trending";
import ContributeRoadmaps from "./pages/ContributeRoadmaps";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
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
        path: "/home",
        element: (
          <Suspense fallback={<LoaderAnimation onComplete={() => {}} />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/settings/profile",
        element: <ProfilePage />,
      },
      {
        path: "/contribute/resources",
        element: <ContributeResources />,
      },
      {
        path: "/contribute/roadmaps",
        element: <ContributeRoadmaps />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/resource/:id",
        element: <ResourceById />,
      },
      {
        path: "/favorites/resources",
        element: <FavouriteResources />,
      },
      {
        path: "/projects",
        element: <ProjectStructure />,
      },
      {
        path: "/trending",
        element: <Trending />,
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.body.className = theme === "LIGHT" ? "light-theme" : "dark-theme";

    const handleLoad = () => {
      setTimeout(() => setLoading(false), LOADER_DURATION);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [theme]);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {/* <LoaderAnimation /> */}
      {loading && <LoaderAnimation onComplete={handleLoaderComplete} />}
      {!loading && <RouterProvider router={router} />}
      <ToastContainer />
    </>
  );
};

export default App;
