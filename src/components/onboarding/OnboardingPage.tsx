import React from "react";
import { motion } from "framer-motion";

type OnboardingPageProps = {
  children: React.ReactNode | React.ReactNode[];
  // className: string;
  // key?: string;
};

const OnboardingPage: React.FC<OnboardingPageProps> = ({ children }) => {
  return (
    <motion.div
      // variants={{
      //   hidden: { opacity: 0, y: 20 },
      //   visible: { opacity: 1, y: 0 },
      //   exit: { opacity: 0, y: -20 },
      // }}
      // initial="hidden"
      // animate="visible"
      // exit="exit"
      // transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
export default OnboardingPage;
