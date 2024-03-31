import React from "react";
import Home from "../Components/Home";
import Find from "../Components/Find";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/Find", element: <Find /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
