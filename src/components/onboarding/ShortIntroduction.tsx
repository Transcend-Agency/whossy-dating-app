import OnboardingBackButton from "./OnboardingBackButton";
import Button from "../ui/Button";
import Skip from "./Skip";
import { OnboardingProps } from "../../types/onboarding";
import OnboardingPage from "./OnboardingPage";
import { useEffect, useState } from "react";
import { useOnboardingStore } from "../../store/useStore";

const ShortIntroduction: React.FC<OnboardingProps> = ({ advance, goBack }) => {
  const [value, setValue] = useState("");
  const { updateOnboardingData, "onboarding-data":data } = useOnboardingStore();
  useEffect(() => {
    if (data["short-introduction"]) {
      setValue(data["short-introduction"])
    }
 }, [])

  return (
    <OnboardingPage>
      <Skip advance={advance} />
      <h1 className="onboarding-page__header">
        Your bio: Let others know who you are:)
      </h1>
      <p className="onboarding-page__text">
        A short introduction about who you are.
      </p>
      <div className="my-20 space-y-2">
        <textarea
          className="w-full border-b outline-none text-[1.6rem] resize-none"
          name=""
          id=""
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={5}
        />
        <p className="text-[1.6rem] text-[#8A8A8E]">0/500 characters</p>
      </div>

      <div className="onboarding-page__section-one__buttons">
        <OnboardingBackButton onClick={goBack} />
        <Button
          text="Continue"
          onClick={() => {
            advance();
            updateOnboardingData({ "short-introduction": value });
          }}
        />
      </div>
    </OnboardingPage>
  );
};

export default ShortIntroduction;
