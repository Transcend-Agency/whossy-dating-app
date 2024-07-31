import Button from "../ui/Button";
import OnboardingBackButton from "./OnboardingBackButton";
// import Slider from "../ui/Slider";
import { OnboardingProps } from "../../types/onboarding";
// import OnboardingBackButton from "../components/onboarding/OnboardingBackButton";
import "../ui/styles.css";
import Slider from "../ui/Slider";
import OnboardingPage from "./OnboardingPage";
import { useEffect, useState } from "react";
import { useOnboardingStore } from "../../store/useStore";


const DistanceSearch: React.FC<OnboardingProps> = ({ advance, goBack }) => {
  const [distance, setDistance] = useState<number>();
  const { updateOnboardingData, "onboarding-data":data } = useOnboardingStore();

  useEffect(() => {
    if (data["distance-search"] !== undefined && data["distance-search"] !== null) {
      setDistance(data["distance-search"])
    }
 }, [])
  return (
    <OnboardingPage>
      <h1 className="onboarding-page__header">Distance Search Results</h1>
      <p className="onboarding-page__text">
        Use the slider below to set a radius of how far you want our system to
        search for matches within your current location. You can always change
        this later in the settings.
      </p>
      <Slider getDistance={(s) => setDistance(s)} />
      <div className="onboarding-page__section-one__buttons">
        <OnboardingBackButton onClick={goBack} />
        <Button
          text="Continue"
          onClick={() => {
            advance();
            updateOnboardingData({ "distance-search": distance });
          }}
        />
      </div>
      <button onClick={() => console.log(distance)}>click</button>

    </OnboardingPage>
  );
};

export default DistanceSearch;
