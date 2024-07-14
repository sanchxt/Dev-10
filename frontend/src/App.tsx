import { useEffect } from "react";

import { useTheme } from "./hooks/useTheme";
import Login from "./pages/Login";

const App = () => {
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme === "LIGHT" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <div className="w-full">
      <Login />
    </div>
  );
};

export default App;
