import Home from "@/app/home/Home";
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
    element: <div>Settings WIP</div>,
  }
]);

export default router;
