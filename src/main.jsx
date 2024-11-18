import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import LoginPage from "./Components/Auth/LoginPage.jsx";
import Registration from "./Components/Auth/Registration.jsx";
import Dashboard from "./Components/Dash/Dashboard.jsx";
import Error from "./Components/Error.jsx";
// import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/registration",
    element: <Registration />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
