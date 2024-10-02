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

const router = createBrowserRouter([
  {
    path: "/",
    element:<Master/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path: "task-crm",
        element:<TaskCRM/>
      },
      {
        path: "projects",
        element:<Project/>
      },
      {
        path: "finance",
        element:<Finance/>
      },
      {
        path:"team",
        element:<Team/>
      },
      {
        path:"orders",
        element:<Orders/>
      },
      {
        path:"incomes",
        element:<Incomes/>
      },
      {
        path:"status",
        element:<Status/>
      },
      {
        path:"groups",
        element:<Groups/>
      },
      {
        path:"additem",
        element:<AddItem/>
      },
      {
        path:"totalproducts",
        element:<TotalProducts/>
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);