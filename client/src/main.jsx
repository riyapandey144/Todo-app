import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./context/user/UserState";
import TodoProvider from "./context/todos/TodoState.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </UserProvider>
  </React.StrictMode>
);
