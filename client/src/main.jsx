import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./store/Auth.jsx";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
    <ToastContainer
position="top-left"
autoClose={2500}
limit={3}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
bodyClassName="toastBody"
/>
  </AuthProvider>
);
