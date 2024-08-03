import OnboardingBackButton from "./OnboardingBackButton";
import OnboardingSearch from "./OnboardingSearch";
import Skip from "./Skip";
import { OnboardingProps } from "../../types/onboarding";
import OnboardingPage from "./OnboardingPage";
import Interests from "./Interests";
// import { useOnboardingStore } from "../../store/useOnboardingStore";
import toast from "react-hot-toast";
import { useOnboardingStore } from "../../store/onboarding/useStore";
// import OnboardingBackButton from "../components/onboarding/OnboardingBackButton";

const WhatMakesYouTick: React.FC<OnboardingProps> = ({ advance, goBack }) => {
  // const { interests } = useOnboardingStore();
  const { "onboarding-data": data } = useOnboardingStore();

  return (
    <OnboardingPage>
      <section className="max-h-[560px] overflow-y-scroll">
        <Skip advance={advance} />
        <h1 className="onboarding-page__header">What makes you tick?</h1>
        <p className="onboarding-page__text">
          Share the interests and habits that defines you
        </p>
        <OnboardingSearch />
        <Interests />
      </section>
      <div className="onboarding-page__section-one__buttons ">
        <OnboardingBackButton onClick={goBack} />
        {/* A */}
        <button
          className="onboarding-page__section-one__buttons__select-button-inactive"
          onClick={() => {
            if (data.interests) {
              if (data.interests.length >= 5) advance();
              else toast.error("Please select up to 5");
            }
          }}
          style={{
            backgroundColor:
              data.interests && data.interests.length >= 5
                ? "#F2243E"
                : "#F6F6F6",
            color:
              data.interests && data.interests.length >= 5
                ? "#FFFFFF"
                : "#000000",
            position: "sticky",
            bottom: 0,
          }}
        >
          Select {data.interests ? data.interests.length : 0}/5
        </button>
      </div>
    </OnboardingPage>
  );
};

export default WhatMakesYouTick;
