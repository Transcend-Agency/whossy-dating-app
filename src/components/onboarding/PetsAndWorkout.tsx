import { useEffect, useState } from "react";
import Button from "../ui/Button";
import OnboardingBackButton from "./OnboardingBackButton";
import Skip from "./Skip";
import RegularOptions from "./RegularOptions";
import { OnboardingProps } from "../../types/onboarding";
import OnboardingPage from "./OnboardingPage";
import { useOnboardingStore } from "../../store/useStore";
import { workout } from "../../constants/onboarding";
// import OnboardingBackButton from "../components/onboarding/OnboardingBackButton";

const PetsAndWorkout: React.FC<OnboardingProps> = ({ advance, goBack }) => {
  const [active, setActive] = useState<number | null>(null);
  const { updateOnboardingData, "onboarding-data":data } = useOnboardingStore();
  useEffect(() => {
    if (data["workout-preference"] !== null && data["workout-preference"] !== undefined) {
      setActive(data["workout-preference"])
    }
 }, [])

  return (
    <OnboardingPage>
      <Skip advance={advance} />
      <h1 className="onboarding-page__header">Do you own any pets?</h1>
      <p className="onboarding-page__text">
        This allows us to suggest the right people for you. You can always
        change this later.
      </p>
      <div className="onboarding-page__regular-options-container">
        {workout.map((item, i) => (
          <RegularOptions
            desc={item}
            index={i}
            active={active}
            onclick={() => setActive(i)}
          />
        ))}
      </div>
      <div className="onboarding-page__section-one__buttons">
        <OnboardingBackButton onClick={goBack} />
        <Button
          text="Continue"
          onClick={() => {
              advance();
              updateOnboardingData({
                "workout-preference": active,
              });
          }}
        />
      </div>
    </OnboardingPage>
  );
};

export default PetsAndWorkout;

