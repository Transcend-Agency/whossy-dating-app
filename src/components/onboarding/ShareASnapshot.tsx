import Skip from "./Skip";
import BigSnapshots from "./BigSnapshots";
import SmallSnapshots from "./SmallSnapshots";
import OnboardingBackButton from "./OnboardingBackButton";
import Button from "../ui/Button";
import { OnboardingProps } from "../../types/onboarding";
import OnboardingPage from "./OnboardingPage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { usePictureStore } from "../../store/onboarding/usePictureStore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Lottie from "lottie-react";
import Cat from "../../Cat.json";
import { useOnboardingStore } from "../../store/onboarding/useStore";
import { useState } from "react";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";

const ShareASnapshot: React.FC<OnboardingProps> = ({ goBack, advance }) => {
  // Add a new document in collection "cities"

  const { pictures } = usePictureStore();
  const { addPhotos, "onboarding-data": data } = useOnboardingStore();
  const uploadImage = (file: File, i: number) => {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, `tests/userId/profile_pictures/image_${i}`);
    uploadBytes(storageRef, file)
      .then(() => {
        // toast.success("Image has been uploaded successfully 🚀");
        console.log("File was uploaded was successfully!");
        getDownloadURL(storageRef)
          .then((url) => {
            addPhotos(url);
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  };

  const uploadToFirestore = async () => {
    console.log("Loading...");
    try {
      await setDoc(doc(db, "preferences", "userId_10"), {
        bio: data["short-introduction"],
        date_of_birth: data["date-of-birth"],
        distance: data["distance-search"],
        drink: data["drinking-preference"],
        education: data.education,
        interests: data.interests,
        meet: data["gender-preference"],
        pets: data.pets,
        photos: data.photos,
        preference: data["relationship-preference"],
        smoke: data["smoking-preference"],
        workout: data["workout-preference"],
      });
      toast.success("Account has been created successfully 🚀");
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [openModal, setOpenModal] = useState(false);
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
            // advance();
            setOpenModal(true);
            // console.log(pictures);
            Object.values(pictures).forEach((item, i) => uploadImage(item, i));
            // Promise.all(uploadPromises)
            //   .then(() => {
            //     // All images have been uploaded successfully
            //     console.log("All images uploaded:", data.photos);
            //     uploadToFirestore();
            //   })
            //   .catch((error) => {
            //     console.error("Error uploading some images:", error);
            //   });
            setTimeout(() => uploadToFirestore(), 8000);
          }}
        />
      </div>
      {openModal && (
        <Modal>
          <div className="bg-white w-[47rem] pt-10 p-6 rounded-2xl text-center  flex flex-col relative">
            <div className="space-y-6">
              <h1 className="text-[3.2rem] font-bold  ">
                All set and ready 🔥
              </h1>
              <p className="text-[1.8rem] text-[#8A8A8E]">
                We are setting up your profile and getting your match ready :)
              </p>
            </div>
            <Lottie animationData={Cat} className="h-96" />
          </div>
        </Modal>
      )}
    </OnboardingPage>
  );
};

export default ShareASnapshot;
