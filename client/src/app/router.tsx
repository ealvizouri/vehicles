import type { RouteObject } from "react-router-dom";
import { createBrowserRouter, Outlet, Link, useRoutes, useParams } from "react-router-dom";

/* ERRORS */
import ErrorPage from '../features/errors/ErrorPage';

/* LAYOUTS */
import MainLayout from '../layouts/MainLayout';

/* VIEWS */
import { Vehicle, Vehicles, VehicleForm } from '../features/vehicles';


let routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Vehicles /> },
      {
        path: '/vehicle/view/:vin',
        element: <Vehicle />
      },
      {
        path: '/vehicle/add',
        element: <VehicleForm />
      },
      {
        path: '/vehicle/edit/:vin',
        element: <VehicleForm />
      }
      /* {        path: "/courses",

        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          { path: "/courses/:id", element: <Course /> },
        ],
      },
      { path: "*", element: <NoMatch /> }, */
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;