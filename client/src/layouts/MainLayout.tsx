import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="flex justify-center py-20">
    <Outlet />
  </div>
);

export default MainLayout;