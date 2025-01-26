import { OnboardingProps } from "@/types/onboarding.ts";
import Button from "../ui/Button";
import BigSnapshots from "./BigSnapshots";
import OnboardingBackButton from "./OnboardingBackButton";
import OnboardingPage from "./OnboardingPage";
import SmallSnapshots from "./SmallSnapshots";
import Skip from "@/components/onboarding/Skip.tsx";
import {FC, useEffect} from "react";
import {useOnboardingStore} from "@/store/OnboardingStore.tsx";
import {PictureData, usePhotoStore} from "@/store/PhotoStore";

const ShareASnapshot: FC<OnboardingProps> = ({ advance ,goBack }) => {
    const { photos, setPhotos, reset: resetPhoto } = usePhotoStore();
    const { updateOnboardingData, "onboarding-data": data } = useOnboardingStore();

    useEffect(() => {
        const profilePhotoData: string[] = data["photos"] as string[]
        console.log(profilePhotoData)

        const photoData: PictureData = {
            imageOne: profilePhotoData[0] || null,
            imageTwo: profilePhotoData[1] || null,
            imageThree: profilePhotoData[2] || null,
            imageFour: profilePhotoData[3] || null,
            imageFive: profilePhotoData[4] || null,
            imageSix: profilePhotoData[5] || null,
        };

        setPhotos(photoData);
    }, [data]);

  return (
      <OnboardingPage>
        <Skip advance={advance} />
        <section className="max-h-screen overflow-y-scroll mt-4">
          <h1 className="onboarding-page__header">Share a snapshot of you</h1>
          <div className="onboarding-page__text">
            <p className={`w-fit`}>Add at least 2 recent photos of yourself 🤗 </p>
            <p className={`max-w-[240px] w-full mb-20`}>Hint: Using your best photo could give a great first impression and the beginning of something great</p>
          </div>
          <BigSnapshots />
          <SmallSnapshots />
        </section>

        <div className="onboarding-page__section-one__buttons">
          <OnboardingBackButton onClick={goBack} />
          <Button
              text="Continue"
              onClick={() => {
                  advance();
                  updateOnboardingData({ "photos": Object.values(photos).filter(value => Boolean(value)) });
                  resetPhoto();
              }}
          />
        </div>
      </OnboardingPage>
  );
};

export default ShareASnapshot;
