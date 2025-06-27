import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ChatProvider from "./context/ChatContext"; // path as per your folder
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <ChatProvider>
      <App />
    </ChatProvider>
  
);
