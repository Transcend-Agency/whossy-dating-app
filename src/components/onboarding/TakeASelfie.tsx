import React, {useEffect, useRef, useState} from 'react';
import {OnboardingProps} from "@/types/onboarding.ts";
import OnboardingPage from "@/components/onboarding/OnboardingPage.tsx";
import Skip from "@/components/onboarding/Skip.tsx";
import OnboardingBackButton from "@/components/onboarding/OnboardingBackButton.tsx";
import Button from "@/components/ui/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/store/UserId.tsx";
import {usePhotoStore} from "@/store/PhotoStore.tsx";
import {useOnboardingStore} from "@/store/OnboardingStore.tsx";
import toast from "react-hot-toast";
import {arrayUnion, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {serverTimestamp} from "firebase/database";
import {AdvancedSearchPreferences, User} from "@/types/user.ts";
import Modal from "../ui/Modal";
import Lottie from "lottie-react";
import Cat from "../../Cat.json";
import { resolve } from 'path';

export const TakeASelfie: React.FC<OnboardingProps> = ({ advance, goBack }) => {
		const [openModal, setOpenModal] = useState(false);

		const navigate = useNavigate();
		const { auth, setAuth } = useAuthStore();
		const { photos, reset: resetPhoto } = usePhotoStore();
		const { "onboarding-data": data, reset } = useOnboardingStore();

		const userSettings = {
				incoming_messages: true,
				public_search: true,
				read_receipts: true,
				online_status: true,
		};

		const videoRef = useRef<HTMLVideoElement>(null);
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const [capturedImage, setCapturedImage] = useState<string | null>(null);
		const [cameraHasStarted, setCameraHasStarted] = useState<boolean>(false);
		const [pictureHasBeenTaken, setPictureHasBeenTaken] = useState<boolean>(false);

		const updateFaceVerificationDB = async (capturedPhotoUrl: string) => {
				try {
						const faceVerificationRef = doc(db, "faceVerification", auth?.uid as string);
						await updateDoc(faceVerificationRef, {
								captured_photo: capturedPhotoUrl
						});

						console.log("Face verification updated on Firestore.");
				} catch (error) {
						console.error("Error updating data", error);
				}
		};

		const startCamera = async () => {
			toast.success("Camera Loading...")
			setCapturedImage(null)
			setCameraHasStarted(true)
				if (navigator.mediaDevices.getUserMedia) {
						try {
								const stream = await navigator.mediaDevices.getUserMedia({ video: true });
								if (videoRef.current) {
										videoRef.current.srcObject = stream;
								}
						} catch (err) {
								console.error('Error accessing camera:', err);
								setCameraHasStarted(false)
								setPictureHasBeenTaken(false)
						}
				}
		};

		const stopCamera = async () => {
			if (videoRef.current) {
				const stream = videoRef.current.srcObject as MediaStream;
				if (stream) {
					const tracks = stream.getTracks(); 
					tracks.forEach((track) => {
						track.stop(); 
					});
				}
				videoRef.current.srcObject = null;
			}
			navigator.mediaDevices.getUserMedia({ video: false }).catch(() => {
			});
			setCameraHasStarted(false);
		};			

		const captureImage = async () => {
				if (videoRef.current && canvasRef.current) {
						const canvas = canvasRef.current;
						const context = canvas.getContext('2d');
						if (context) {
								const video = videoRef.current;

								// Set canvas size to match video
								canvas.width = video.videoWidth;
								canvas.height = video.videoHeight;
					
								// Flip the canvas horizontally to match the video
								context.save();
								context.translate(canvas.width, 0);
								context.scale(-1, 1);
								context.drawImage(video, 0, 0, canvas.width, canvas.height);
								context.restore();
					
								const imageData = canvas.toDataURL('image/png');
								setCapturedImage(imageData);
					
								// Stop the camera
								stopCamera();

								toast.success("Processing Image...")
								setCameraHasStarted(false)
								const img = new Image();

								img.src = imageData;
								img.onload = async () => {
										const validation = validateImageClarity(img);
										if (!(await validation).brightness) {
												toast.error("The image is too dark or too bright. Please try again.", {duration: 5000});
												stopCamera()
												setCapturedImage(null);
												setCameraHasStarted(false)
												setPictureHasBeenTaken(false)
										} else if (!(await validation).blur) {
												toast.error("The image is too blurry. Please try again.", {duration: 5000});
												stopCamera()
												setCapturedImage(null);
												setCameraHasStarted(false)
												setPictureHasBeenTaken(false)
										} else {
											setPictureHasBeenTaken(true);
											toast.success("Image captured successfully! Looks great.", {duration: 5000});
										}
								};
						}
				}
		};

		const validateImageClarity = async (image: HTMLImageElement) : Promise<{ brightness: boolean; blur: boolean }> => {
				const canvas = document.createElement("canvas");
				const context = canvas.getContext("2d");

				if (!context) return { brightness: false, blur: false };

				canvas.width = image.width;
				canvas.height = image.height;
				context.drawImage(image, 0, 0, image.width, image.height);

				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				const data = imageData.data;

				// Brightness Check
				let totalBrightness = 0;
				for (let i = 0; i < data.length; i += 4) {
						const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
						totalBrightness += avg;
				}
				const avgBrightness = totalBrightness / (canvas.width * canvas.height);
				const brightnessOK = avgBrightness >= 50 && avgBrightness <= 200;

				// Blurriness Check
				const laplacianVariance = calculateLaplacianVariance(image, canvas, context);
				const blurOK = laplacianVariance > 100;

				return new Promise((resolve) => setTimeout(() => resolve({ brightness: brightnessOK, blur: blurOK }), 2000)) 
				// return { brightness: brightnessOK, blur: blurOK };
		}

		function calculateLaplacianVariance(_image: HTMLImageElement, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				const gray = new Uint8ClampedArray(imageData.width * imageData.height);

				for (let i = 0; i < imageData.data.length; i += 4) {
						gray[i / 4] = 0.2989 * imageData.data[i] + 0.5870 * imageData.data[i + 1] + 0.1140 * imageData.data[i + 2];
				}

				const laplacian = gray.map((_, i) => {
						const neighbors = [
								gray[i - imageData.width - 1], gray[i - imageData.width], gray[i - imageData.width + 1],
								gray[i - 1], gray[i], gray[i + 1],
								gray[i + imageData.width - 1], gray[i + imageData.width], gray[i + imageData.width + 1],
						].filter(Boolean);
						return Math.max(...neighbors) - Math.min(...neighbors);
				});

				return laplacian.reduce((acc, value) => acc + (value - (laplacian.reduce((a, b) => a + b) / laplacian.length)) ** 2, 0) / laplacian.length;
		}

		useEffect(() => {
				if (auth?.has_completed_onboarding) {
						navigate('/dashboard/explore');
				}
		}, [auth?.has_completed_onboarding]);

		const uploadToFirestore = async () => {
				console.log(auth?.uid);
				console.log("Loading...");

				if (!auth?.uid) {
						console.error("User ID is undefined. Cannot update Firestore without a valid UID.");
						toast.error("An error occurred. Please try again.");
						return;
				}

				try {
						console.log(auth.uid);
						console.log(data['date-of-birth']);
						const userDocRef = doc(db, "users", auth.uid);

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
								amount_paid_in_total: {
										naira: 0,
										kenyan_shillings: 0
								},
								paystack: {},
								created_at: serverTimestamp(),
								blockedIds: arrayUnion(),
								credit_balance: 0,
								is_banned: false,
								has_completed_onboarding: true,
								user_settings: {
										...userSettings
								},
						});

						await setDoc(doc(db, "advancedSearchPreferences", auth.uid as string), {
								gender: '',
								age_range: { min: 18, max: 100 },
								country: '',
								relationship_preference: null,
								religion: null,
						} as AdvancedSearchPreferences);

						toast.success("Account has been created successfully 🚀");
						resetPhoto();
						reset();

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

		return (
				<OnboardingPage>
						<section className="h-[500px] overflow-hidden">
								<Skip advance={advance} />
								<div className={`flex flex-col gap-y-[30px] h-full`}>
										<div className={`grid gap-y-4`}>
												<h1 className={`text-[30px] font-neue-montreal font-bold`}>Take a Selfie</h1>
												<p className={`text-[12px] max-w-[280px] text-[#8A8A8E] leading-[120%]`}>
														Tap on the camera icon to take a snapshot of yourself for verification. Kindly use a well-lighted background and avoid blurry photos.
												</p>
										</div>

										<div className={`grid gap-y-6`}>
												<div className={`w-[250px] h-[250px] bg-center bg-no-repeat bg-cover rounded-[15px] bg-opacity-20 bg-[#8A8A8E] relative`}>
														<video className={`size-[250px] absolute z-10 video-flip ${capturedImage ? "hidden" : "block"}`} ref={videoRef} autoPlay></video>
														<canvas className={`size-[250px] absolute z-20`} ref={canvasRef} style={{ display: 'none' }}></canvas>
														{capturedImage && <img className={`size-[250px] absolute z-10 rounded-[15px] object-center object-scale-down`} src={capturedImage} alt="Captured" />}
														<img onClick={() => {
																startCamera()
																		.then(() => console.log("Camera Started"))
														}} className={`size-[30px] cursor-pointer z-50 opacity-70 absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]`} src={`/assets/icons/black-camera.svg`} alt={``} />
														{pictureHasBeenTaken && <div onClick={() => {
															setCapturedImage(null)
															setPictureHasBeenTaken(false)
														}} className={`absolute z-[60] bg-black/80 text-white px-3 py-2 rounded-[8px] top-[10px] left-[10px] font-bold text-[10px] cursor-pointer`}>Clear</div> }
														{cameraHasStarted && 
														<button className={`absolute z-[60] bg-black/80 text-white px-3 py-2 rounded-[8px] bottom-[10px] right-[10px] font-bold text-[10px] cursor-pointer ${capturedImage ? "hidden" : "block"}`} onClick={captureImage}>Capture</button> }
												</div>
												<div className="onboarding-page__section-one__buttons">
														<OnboardingBackButton onClick={goBack} />
														<Button text='Get Started' onClick={() => {
																advance();
																if (capturedImage) {
																		setOpenModal(true);
																		updateFaceVerificationDB(capturedImage).then(() => {
																				setTimeout(() => uploadToFirestore(), 5000);
																		}).catch((e) => console.error("Error onboarding user: ", e));
																}else {
																		toast.error("An Error occurred while onboarding");
																}
														}} />
												</div>
										</div>
								</div>
						</section>
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
		)
}
