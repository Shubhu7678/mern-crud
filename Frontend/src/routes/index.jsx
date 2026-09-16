import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

export default router;