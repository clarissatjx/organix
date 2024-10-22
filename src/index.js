import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TodoContextProvider } from "./context";
import { UserProvider } from "./context/user.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </UserProvider>
  </React.StrictMode>
);
