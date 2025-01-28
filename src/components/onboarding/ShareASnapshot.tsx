import { FC, useEffect } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useOnboardingStore } from "@/store/OnboardingStore";
import { PictureData, usePhotoStore } from "@/store/PhotoStore";
import { useAuthStore } from "@/store/UserId";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import BigSnapshots from "./BigSnapshots";
import OnboardingBackButton from "./OnboardingBackButton";
import OnboardingPage from "./OnboardingPage";
import SmallSnapshots from "./SmallSnapshots";
import {FaceVerification, OnboardingProps} from "@/types/onboarding";

const ShareASnapshot: FC<OnboardingProps> = ({ advance, goBack }) => {
    const { photos, setPhotos, reset: resetPhoto } = usePhotoStore();
    const { updateOnboardingData, "onboarding-data": data } = useOnboardingStore();
    const { auth, user } = useAuthStore();

    const addToFaceVerificationDB = async (uploaded_photos: FaceVerification["uploaded_photos"]) => {
        try {
            const faceVerificationRef = doc(db, "faceVerification", auth?.uid as string);

            const payload: FaceVerification = {
                uid: auth?.uid,
                first_name: user?.first_name,
                last_name: user?.last_name,
                uploaded_photos,
                is_approved: false,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
            };

            await setDoc(faceVerificationRef, payload);
            console.log("Face verification data successfully added to Firestore.");
        } catch (error) {
            console.error("Error adding data to Firestore:", error);
            toast.error("Failed to save photos. Please try again.");
        }
    };

    useEffect(() => {
        const profilePhotoData: string[] = data["photos"] as string[];

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
            <section className="max-h-screen overflow-y-scroll mt-4">
                <h1 className="onboarding-page__header">Share a snapshot of you</h1>
                <div className="onboarding-page__text">
                    <p className="w-fit">Add at least 2 recent photos of yourself 🤗</p>
                    <p className="max-w-[400px] w-full mb-20">
                        Hint: Using your best photo could give a great first impression and the beginning of something great.
                    </p>
                </div>
                <BigSnapshots />
                <SmallSnapshots />
            </section>

            <div className="onboarding-page__section-one__buttons">
                <OnboardingBackButton onClick={goBack} />
                <Button
                    text="Continue"
                    onClick={async () => {
                        const validPhotos = Object.values(photos).filter((value) => Boolean(value));

                        if (validPhotos.length >= 2) {
                            const uploaded_photos = {
                                photo1: validPhotos[0] || "",
                                photo2: validPhotos[1] || "",
                                photo3: validPhotos[2] || "",
                                photo4: validPhotos[3] || "",
                                photo5: validPhotos[4] || "",
                            };

                            await addToFaceVerificationDB(uploaded_photos);

                            updateOnboardingData({ photos: validPhotos });
                            toast.success("Loading...")
                            advance();
                            resetPhoto();
                        } else {
                            toast.error("You need to upload at least 2 photos");
                        }
                    }}
                />
            </div>
        </OnboardingPage>
    );
};

export default ShareASnapshot;