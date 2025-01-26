import React from 'react'
import {OnboardingProps} from "@/types/onboarding.ts";
import OnboardingPage from "@/components/onboarding/OnboardingPage.tsx";
import Skip from "@/components/onboarding/Skip.tsx";
import OnboardingBackButton from "@/components/onboarding/OnboardingBackButton.tsx";

export const GetPhotoVerified: React.FC<OnboardingProps> = ({advance, goBack}) => {
		return (
				<OnboardingPage>
						<section className="max-h-[560px] overflow-y-scroll">
								<Skip advance={advance}/>
								<h1>Get photo verified</h1>
						</section>

						<div className="onboarding-page__section-one__buttons ">
								<OnboardingBackButton onClick={goBack}/>
						</div>
				</OnboardingPage>
)
}
