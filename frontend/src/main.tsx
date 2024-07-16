import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store.ts";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
