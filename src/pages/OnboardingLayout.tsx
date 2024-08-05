import React from "react";
import { Outlet } from "react-router-dom";
import FindYourSoulMate from "../components/onboarding/FindYourSoulMate";
import { motion } from 'framer-motion'

type OnboardingLayoutProps = {};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = () => {
  return (
    <div className="onboarding-page">
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="onboarding-page__section-one">
        <Outlet />
      </motion.section>
      <FindYourSoulMate />
    </div>
  );
};
export default OnboardingLayout;
