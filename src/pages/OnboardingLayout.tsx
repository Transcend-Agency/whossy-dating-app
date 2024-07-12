import React from "react";
import { Outlet } from "react-router-dom";

type OnboardingLayoutProps = {};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = () => {
  return (
    <div className="grid grid-cols-2 h-screen px-16 py-12 ">
      <Outlet />
      <div>Hello bro</div>
    </div>
  );
};
export default OnboardingLayout;
