import { FC, ReactNode } from 'react';
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";

interface MainLayoutProps {
  children: JSX.Element | ReactNode
}

const MainLayout = () => (
  <div>
    <Outlet />
  </div>
);

export default MainLayout;