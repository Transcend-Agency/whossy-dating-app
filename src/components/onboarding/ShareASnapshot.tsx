import { usePhotoStore } from "@/store/PhotoStore";
import { useAuthStore } from "@/store/UserId";
import {arrayUnion, doc, getDoc, serverTimestamp, updateDoc} from "firebase/firestore";
import Lottie from "lottie-react";
import {FC, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cat from "../../Cat.json";
import { db } from "@/firebase";
import { useOnboardingStore } from "../../store/OnboardingStore";
import { OnboardingProps } from "@/types/onboarding.ts";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import BigSnapshots from "./BigSnapshots";
import OnboardingBackButton from "./OnboardingBackButton";
import OnboardingPage from "./OnboardingPage";
import SmallSnapshots from "./SmallSnapshots";
import {User} from "@/types/user.ts";

const ShareASnapshot: FC<OnboardingProps> = ({ goBack }) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore();
  const { photos, reset: resetPhoto } = usePhotoStore();
  const { "onboarding-data": data, reset } = useOnboardingStore();

  const userSettings = {
    incoming_messages: true,
    public_search: true,
    read_receipts: true,
    online_status: true
  }

  useEffect(() => {
    console.log(auth, userSettings)
    if (auth?.has_completed_onboarding) {
      navigate('/dashboard/explore');
    }
  }, [auth?.has_completed_onboarding]);

  const uploadToFirestore = async () => {
    console.log(auth?.uid)
    console.log("Loading...");

    if (!auth?.uid) {
      console.error("User ID is undefined. Cannot update Firestore without a valid UID.");
      toast.error("An error occurred. Please try again.");
      return;
    }

    try {
      console.log(auth.uid)
      console.log(data['date-of-birth'])
      const userDocRef = doc(db, "users", auth.uid);

      // Completing the user's profile update in Firestore
      await updateDoc(userDocRef, {
        bio: data["short-introduction"],
        date_of_birth: data["date-of-birth"],
        distance: data["distance-search"],
        drink: data["drinking-preference"],
        education: data.education,
        interests: data.interests,
        meet: data["gender-preference"],
        pets: data.pets,
        photos: Object.values(photos).filter(value => Boolean(value)),
        preference: data["relationship-preference"],
        smoke: data["smoking-preference"],
        workout: data["workout-preference"],
        uid: auth.uid,
        is_premium: false,
        credits: 0,
        amount_paid_in_total: 0,
        paystack: {reference: ""},
        created_at: serverTimestamp(),
        blockedIds: arrayUnion(),
        credit_balance: 0,
        is_banned: false,
        has_completed_onboarding: true,
        user_settings: {
          ...userSettings
        },
      });

      toast.success("Account has been created successfully 🚀");
      resetPhoto();
      reset();

      // Re-fetch the updated user data from Firestore to reflect in local state
      const updatedUserDoc = await getDoc(userDocRef);
      const updatedUserData = updatedUserDoc.data();

      if (updatedUserData) {
        setAuth({
          uid: auth.uid,
          has_completed_onboarding: updatedUserData.has_completed_onboarding,
        }, updatedUserData as User);

        console.log("Updated local auth state:", updatedUserData);
        navigate('/dashboard/explore');
      }

    } catch (error) {
      console.error("Failed to update Firestore document:", error);
      toast.error("Failed to set up profile. Please try again.");
    }
  };

  const [openModal, setOpenModal] = useState(false);

  return (
      <OnboardingPage>
        <section className="max-h-screen overflow-y-scroll">
          <h1 className="onboarding-page__header">Share a snapshot of you</h1>
          <div className="onboarding-page__text">
            <p>Add at least 2 recent photos of yourself 🤗 </p>
            <p>Hint: Using your best photo could give a great first impression and the beginning of something great</p>
          </div>
          <BigSnapshots />
          <SmallSnapshots />
        </section>

        <div className="onboarding-page__section-one__buttons">
          <OnboardingBackButton onClick={goBack} />
          <Button
              text="Get Started"
              onClick={() => {
                if (Object.values(photos).filter(value => Boolean(value)).length > 1) {
                  setOpenModal(true);
                  setTimeout(() => uploadToFirestore(), 5000);
                } else {
                  toast.error("Please add at least 2 photos of yourself 🤗");
                }
              }}
          />
        </div>
        {openModal && (
            <Modal>
              <div className="bg-white w-[47rem] pt-10 p-6 rounded-2xl text-center flex flex-col relative">
                <div className="space-y-6">
                  <h1 className="text-[3.2rem] font-bold">All set and ready 🔥</h1>
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
