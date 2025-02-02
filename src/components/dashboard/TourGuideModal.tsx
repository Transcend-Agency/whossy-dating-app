import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import useDashboardStore from '@/store/useDashboardStore';
import {CompletedTours} from "@/types/tourGuide.ts";
import { tourGuideSteps} from "@/data/tour-guide-steps.ts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
		variant?: 'primary' | 'outline'
}

export const TourGuideModal = () => {
		const { tourIsOpen, setTourIsOpen } = useDashboardStore();
		const [page, setPage] = useState<string>("explore")
		const location = useLocation();
		const { setIsOpen, setSteps, setCurrentStep } = useTour();

		const [innerWidth, setInnerWidth] = useState(window.innerWidth);

		useEffect(() => {
				const handleResize = () => {
						setInnerWidth(window.innerWidth as number)
				};
				window.addEventListener("resize", handleResize);
				return () => window.removeEventListener("resize", handleResize);
		}, []);

		useEffect(() => {
				const pageKey = location.pathname;
				const pageKeyValue = location.pathname.split('/')[2];
				setPage(pageKeyValue);
				let completedTours: CompletedTours;

				try {
						completedTours = JSON.parse(localStorage.getItem('completedTourPages') || '{"/dashboard/chat: true"}');
				} catch (error) {
						console.error('Error parsing completedTourPages from localStorage:', error);
						completedTours = {};
				}

				if (!completedTours['/dashboard/chat']) {
						completedTours['/dashboard/chat'] = true;
				}
				localStorage.setItem("completedTourPages", JSON.stringify(completedTours));
				const hasCompletedTour = completedTours[pageKey]; // Check if the modal should show based on the page.
				if(!hasCompletedTour){
						setTimeout(() => setTourIsOpen(true), 1000)
				}else{
						setTourIsOpen(false)
				}
		}, [location.pathname, setTourIsOpen]);

		const handleStartTour = () => {
				localStorage.setItem('hasStartedTour', 'true');

				const tourStepsData = tourGuideSteps;
				const pageKeyValue = location.pathname.split('/')[2];
				const steps = tourStepsData[pageKeyValue] || []

				const lastStep = parseInt(localStorage.getItem("lastStep") || "0", 10);

				setTourIsOpen(false);
				setIsOpen(true);
				if(setSteps){
						setCurrentStep(lastStep)
						setSteps(steps)
				}
		};

		if(innerWidth < 1024) return null;
		if (!tourIsOpen) return null;

		return (
				<div className="absolute z-[9999] inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
						<div className="bg-white rounded-lg max-w-[420px] w-full mx-4 relative">
								<img className={`absolute md:-top-[15px] -right-[10px] -top-[30px] md:-right-[25px] rotate-[15deg] size-[50px]`} src={`/assets/icons/logo-gradient.svg`} alt={``} />
								<div className="px-12 py-10 grid gap-y-6">
										<h2 className="text-[34px] md:text-[40px] font-bold whitespace-nowrap">
												Welcome to{' '}<span className={`bg-gradient-to-br bg-clip-text text-transparent from-red to-orange-400 filter`}>Whossy</span>
										</h2>
										<p className={`text-gray-600 text-[17.5px] leading-7`}>This is the{' '}<span className={`uppercase bg-gradient-to-br bg-clip-text text-transparent from-red to-orange-400 filter`}>{page}</span>{' '}Page.</p>
										<div className="text-gray-600 mb-2 text-[16.5px] leading-10 flex flex-col gap-y-3">
												<p>	Would you like a quick tour to help you get started? </p>
												<p>We'll show you all the important features.</p>
										</div>
										<div className="flex justify-end space-x-4">
												<Button variant="outline" onClick={() => setTourIsOpen(false)}>
														Skip for now
												</Button>
												<Button onClick={handleStartTour}>
														{localStorage.getItem('hasStartedTour') === 'true' ? 'Continue Tour' : 'Start Tour'}
												</Button>
										</div>
								</div>
						</div>
				</div>
		);
};

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
		const baseClasses =
				'px-6 py-3 text-[14px] rounded-md cursor-pointer outline-none border-none focus:outline-none font-bold';
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