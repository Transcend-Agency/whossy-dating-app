import { useEffect, useState } from "react";
import Options from "./Options";
import { OnboardingProps } from "../../types/onboarding";
import OnboardingPage from "./OnboardingPage";
import OnboardingButton from "./OnboardingButton";
import { useOnboardingStore } from "../../store/onboarding/useStore";
import { relationship_preferences } from "../../constants";

const RelationshipPreference: React.FC<OnboardingProps> = ({ advance }) => {
  const [active, setActive] = useState<number | null | undefined>(null);
  const { updateOnboardingData, "onboarding-data": data } =
    useOnboardingStore();
  useEffect(() => {
    if (data["relationship-preference"] !== null) {
      setActive(data["relationship-preference"]);
    }
  }, []);
  return (
    <OnboardingPage>
      <h1 className="onboarding-page__header">
        Specify your relationship preference
      </h1>
      <p className="onboarding-page__text">
        Everyone has a choice, feel free to choose. You can always change later.
      </p>
      <div className="onboarding-page__preferences-container">
        {relationship_preferences.map((item, i) => (
          <Options
            image={item.image}
            key={i}
            desc={item.desc}
            title={item.title}
            index={i}
            onclick={() => setActive(i)}
            active={active}
            className="onboarding-page__preferences-container__preferences__image "
          />
        ))}
      </div>
      {/* <Button text="Continue" onClick={() => advance()} /> */}
      <OnboardingButton
        selected={active}
        advance={() => {
          if (active !== null) {
            updateOnboardingData({
              "relationship-preference": active,
            });
            advance();
          }
        }}
      />
      {/* <button className="w-full bg-black text-white">continue</button> */}
      {/* <button onClick={() => console.log(data)}>click</button> */}
    </OnboardingPage>
  );
};

export default RelationshipPreference;
