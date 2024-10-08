import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Master from "./Layouts/Master";
import Home from "./components/Home/Home";
import TaskCRM from "./components/TaskCRM/TaskCRM";
import Project from "./components/Project/Project";
import Finance from "./components/Finance/Finance";
import Team from "./components/Team/Team";
import Orders from "./components/Orders/Orders";
import Incomes from "./components/Incomes/Incomes";
import Status from "./components/Status/Status";
import Groups from "./components/Groups/Groups";
import AddItem from "./components/AddItem/AddItem";
import TotalProducts from "./components/TotalProducts/TotalProducts";
import Courses from "./components/Courses/Courses";
import Login from "./components/Authentication/Login/Login"; 
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"; // Import the PrivateRoute component
import Registration from "./components/Authentication/Registration"; // Import Registration component
import PrivacyPolicy from "./components/PrivacyPolicy/privacyPolicy";
import Users from "./components/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/> // Public Login Route
  },
  {
    path: "/register", // New registration route
    element: <Registration />
  },
  {
    path:"/privacyPolicy",
    element:<PrivacyPolicy/>
  },
  {
    path: "/master",
    element: (
      <PrivateRoute> 
        <Master /> 
      </PrivateRoute>
    ), // Protect the /master route with PrivateRoute
    children: [
      {
        path: "/master",
        element: <Home />
      },
      {
        path: "/master/task-crm",
        element: <TaskCRM />
      },
      {
        path: "/master/projects",
        element: <Project />
      },
      {
        path: "/master/courses",
        element: <Courses />
      },
      {
        path: "/master/finance",
        element: <Finance />
      },
      {
        path: "/master/team",
        element: <Team />
      },
      {
        path: "/master/orders",
        element: <Orders />
      },
      {
        path: "/master/incomes",
        element: <Incomes />
      },
      {
        path: "/master/status",
        element: <Status />
      },
      {
        path:"/master/users",
        element:<Users/>
      },
      {
        path: "/master/groups",
        element: <Groups />
      },
      {
        path: "/master/additem",
        element: <AddItem />
      },
      {
        path: "/master/totalproducts",
        element: <TotalProducts />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
