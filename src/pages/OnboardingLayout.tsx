import React from "react";
import { Outlet } from "react-router-dom";
import FindYourSoulMate from "../components/onboarding/FindYourSoulMate";

type OnboardingLayoutProps = {};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = () => {
  return (
    <div className="onboarding-page">
      <section className="onboarding-page__section-one">
        <Outlet />
      </section>
      <FindYourSoulMate />
    </div>
  );
};
export default OnboardingLayout;
