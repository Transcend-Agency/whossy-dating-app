import React from "react";

interface OnboardingBackButtonProps {
  onClick?: () => void;
  // active?: string;
}

const OnboardingBackButton: React.FC<OnboardingBackButtonProps> = ({
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="onboarding-page__section-one__buttons__back-button"
    >
      <img src="/assets/icons/back-arrow-black.svg" />
    </div>
  );
};
export default OnboardingBackButton;
