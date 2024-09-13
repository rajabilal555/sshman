import Home from "@/app/home/Home";
import Settings from "@/app/settings/Settings";
import Users from "@/app/users/Users";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/settings",
    element: <Settings />,
  }
]);

export default router;
