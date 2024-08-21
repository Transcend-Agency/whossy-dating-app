import React from "react";
import { Outlet } from "react-router-dom";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* <nav className="dashboard-layout__top-nav">
        <div className="dashboard-layout__top-nav__logo"></div>
      </nav> */}

      <Outlet />
    </div>
  );
};
export default Dashboard;
