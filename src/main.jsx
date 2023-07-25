import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home"; // Importamos el componente Home
import Admin from "./routes/Admin";


const Main = () => {
  const [adminButtons, setAdminButtons] = useState([]);

  const addAdminButton = (button) => {
    setAdminButtons((prevButtons) => [...prevButtons, button]);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root addAdminButton={addAdminButton} />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home buttons={adminButtons} /> },
        { path: "/admin", element: <Admin addAdminButton={addAdminButton} /> },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      {/* Movemos el RouterProvider aquí para que envuelva todo */}
      <RouterProvider router={router}>
        {/* Pasamos el estado de los botones a Home a través de Outlet */}
        <Outlet />
      </RouterProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
