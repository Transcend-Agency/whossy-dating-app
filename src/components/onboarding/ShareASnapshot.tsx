import Skip from "./Skip";
import BigSnapshots from "./BigSnapshots";
import SmallSnapshots from "./SmallSnapshots";
import OnboardingBackButton from "./OnboardingBackButton";
import Button from "../ui/Button";
import { OnboardingProps } from "../../types/onboarding";
import OnboardingPage from "./OnboardingPage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ShareASnapshot: React.FC<OnboardingProps> = ({ goBack, advance }) => {
  // Add a new document in collection "cities"
  const test = async () => {
    console.log("Loading...");
    try {
      await setDoc(doc(db, "cities", "SA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      });
      console.log("added");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <OnboardingPage>
      <Skip advance={advance} />
      <section className="max-h-screen overflow-y-scroll">
        <h1 className="onboarding-page__header">Share a snapshot of you</h1>
        <div className="onboarding-page__text">
          <p>Add at least 2 recent photos of yourself 🤗</p>
          <p>
            Hint: Using your best photo could give a great first impression and
            the beginning of something great
          </p>
        </div>
        <BigSnapshots />
        <SmallSnapshots />
      </section>

      <div className="onboarding-page__section-one__buttons">
        <OnboardingBackButton onClick={goBack} />
        <Button
          text="Get Started"
          onClick={() => {
            advance();
            test();
          }}
        />
      </div>
    </OnboardingPage>
  );
};

export default ShareASnapshot;
