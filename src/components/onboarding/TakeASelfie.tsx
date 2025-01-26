import React from 'react'
import {OnboardingProps} from "@/types/onboarding.ts";
import OnboardingPage from "@/components/onboarding/OnboardingPage.tsx";
import Skip from "@/components/onboarding/Skip.tsx";
import OnboardingBackButton from "@/components/onboarding/OnboardingBackButton.tsx";
import Button from "@/components/ui/Button.tsx";

export const TakeASelfie: React.FC<OnboardingProps> = ({advance, goBack}) => {

		return (
				<OnboardingPage>
						<section className="h-[600px] overflow-hidden">
								<Skip advance={advance}/>
								<div className={`flex flex-col gap-y-[100px] h-full`}>
										<div className={`grid gap-y-4`}>
												<h1 className={`text-[30px] font-neue-montreal font-bold`}>Take a Selfie</h1>
												<p className={`text-[12px] max-w-[280px] text-[#8A8A8E] leading-[120%]`}>
														Tap on the camera icon to take a snapshot of yourself for verification. Kindly use a well-lighted background and avoid blurry photos.
												</p>
										</div>

										<div className={`grid gap-y-6`}>
												<div className={`w-[250px] h-[300px] rounded-[15px] bg-opacity-20 bg-[#8A8A8E] relative`}>
														<img className={`size-[30px] cursor-pointer opacity-70 absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]`} src={`/assets/icons/black-camera.svg`} alt={``} />
												</div>
												<div className="onboarding-page__section-one__buttons ">
														<OnboardingBackButton onClick={goBack}/>
														<Button
																text="Get Started"
																onClick={() => {
																		advance();
																}}
														/>
												</div>
										</div>
								</div>
						</section>

				</OnboardingPage>
		)
}
