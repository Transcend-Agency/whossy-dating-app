import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import useDashboardStore from '@/store/useDashboardStore';
import {CompletedTours} from "@/types/tourGuide.ts";
import {tourGuideSteps} from "@/data/tour-guide-steps.ts";

// const MAX_VISITS_BEFORE_SHOW = 3; // Show modal every 3 visits if incomplete
// const SHOW_DELAY_HOURS = 24; // Show modal once per 24 hours

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
		variant?: 'primary' | 'outline'
}

export const TourGuideModal = () => {
		const { tourIsOpen, setTourIsOpen } = useDashboardStore();
		const location = useLocation();
		const { setIsOpen, setSteps, setCurrentStep } = useTour();

		const [hasBegunTour, setHasBegunTour] = useState(false);

		useEffect(() => {
				const pageKey = location.pathname;
				const completedTours: CompletedTours = JSON.parse(
						localStorage.getItem('completedTourPages') || '{}'
				);
				// const lastShown = parseInt(localStorage.getItem(`lastShown_${pageKey}`) || '0', 10);
				// const visitCount = parseInt(localStorage.getItem(`visitCount_${pageKey}`) || '0', 10);

				// Increment visit count for the page
				// localStorage.setItem(`visitCount_${pageKey}`, (visitCount + 1).toString());

				// Check if the modal should show
				const hasCompletedTour = completedTours[pageKey];
				// const now = Date.now();
				// const hoursSinceLastShown = (now - lastShown) / (1000 * 60 * 60);

				if (!hasCompletedTour) {
						setTourIsOpen(true);
						// localStorage.setItem(`lastShown_${pageKey}`, now.toString());
				}
		}, [location.pathname, setTourIsOpen]);

		const handleStartTour = () => {
				const pageKey = location.pathname;
				const completedTours: CompletedTours = JSON.parse(
						localStorage.getItem('completedTourPages') || '{}'
				);

				// Mark current page as completed
				completedTours[pageKey] = true;
				localStorage.setItem('completedTourPages', JSON.stringify(completedTours));
				localStorage.setItem('hasStartedTour', 'true');


				const tourStepsData = tourGuideSteps;
				const pageKeyValue = location.pathname.split('/')[2];
				const steps = tourStepsData[pageKeyValue] || []

				const lastStep = localStorage.getItem('lastStep');

				setTourIsOpen(false);
				setHasBegunTour(true);
				setIsOpen(true);// Start the tour
				if(setSteps){
						setCurrentStep()
						setSteps(steps)
				}

		};

		if (!tourIsOpen) return null;

		return (
				<div className="absolute z-[9999] inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 pb-8">
						<div className="bg-white rounded-lg max-w-[400px] max-h-[200px] h-full w-full mx-4">
								<div className="p-12">
										<h2 className="text-[30px] font-bold mb-4">
												Welcome to{' '}
												<span
														className={`bg-gradient-to-br bg-clip-text text-transparent from-red to-orange-400 filter`}
												>
              Whossy
            </span>
										</h2>
										<p className="text-gray-600 mb-6 text-[16px]">
												Would you like a quick tour to help you get started? We'll show you all the important
												features.
										</p>
										<div className="flex justify-end space-x-4">
												<Button variant="outline" onClick={() => setTourIsOpen(false)}>
														Skip for now
												</Button>
												<Button onClick={handleStartTour}>
														{hasBegunTour ? 'Continue Tour' : 'Start Tour'}
												</Button>
										</div>
								</div>
						</div>
				</div>
		);
};

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
		const baseClasses =
				'px-6 py-3 text-[12px] rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
		const variantClasses =
				variant === 'primary'
						? 'bg-gradient-to-br from-red to-orange-400 text-white hover:bg-blue-700 focus:ring-blue-500'
						: 'border border-gray-300 text-gray-700 bg-white box-shadow-sm hover:bg-gray-50 focus:ring-blue-500';

		return (
				<button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
						{children}
				</button>
		);
};
