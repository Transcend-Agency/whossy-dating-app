import { OnboardingProps } from "../../types/onboarding";

const Skip:React.FC<OnboardingProps> = ({advance}) => {
  return (
    <button className="onboarding-page__section-one__buttons__skip" onClick={advance}>
      Skip
    </button>
  );
};

export default Skip;
