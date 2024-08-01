import Button from "../ui/Button";
import OnboardingBackButton from "./OnboardingBackButton";
import Skip from "./Skip";
import EnterSchoolNameInput from "./EnterSchoolNameInput";
import { OnboardingProps } from "../../types/onboarding";
import OnboardingPage from "./OnboardingPage";
import { useOnboardingStore } from "../../store/onboarding/useStore";
import { useEffect, useState } from "react";
// import OnboardingBackButton from "../components/onboarding/OnboardingBackButton";

const Education: React.FC<OnboardingProps> = ({ advance, goBack }) => {
  const { updateOnboardingData, "onboarding-data": data } =
    useOnboardingStore();
  const [school, setSchool] = useState<string>("");

  useEffect(() => {
    if (data.education !== null && data.education !== undefined) {
      setSchool(data.education);
    }
  }, []);

  return (
    <OnboardingPage>
      <Skip advance={advance} />
      <h1 className="onboarding-page__header">Is education your thing?</h1>
      <p className="onboarding-page__text">
        This would be shown on your profile
      </p>
      <EnterSchoolNameInput getSchool={(e) => setSchool(e)} />
      <div className="onboarding-page__section-one__buttons">
        <OnboardingBackButton onClick={goBack} />
        <Button
          text="Continue"
          onClick={() => {
            advance();
            updateOnboardingData({ education: school });
          }}
        />
      </div>
    </OnboardingPage>
  );
};

export default Education;
