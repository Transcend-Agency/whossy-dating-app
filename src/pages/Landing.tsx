import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React from 'react';

type LandingProps = {

};


const WebsiteFeatures = () => {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger);


    useGSAP(
        () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.features-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    markers: true,
                    end: "bottom bottom"
                },
            });
            // time
            timeline.fromTo('.bottom-right-text', {
                opacity: 0,
            }, { opacity: 1, duration: 1 })

            timeline.to('.bottom-right-text', {
                opacity: 0, duration: 0.3,
            })
            timeline.to('.image-2', {
                opacity: 1, duration: 0.3
            }, "<")
            timeline.fromTo('.top-left-text', {
                opacity: 0,
            }, { opacity: 1, duration: 1 })
            timeline.to('.top-left-text', {
                opacity: 0, duration: 0.3,
            })
            timeline.to('.image-3', {
                opacity: 1, duration: 0.3
            }, "<")
            timeline.fromTo('.top-right-text', {
                opacity: 0,
            }, { opacity: 1, duration: 1 })
            timeline.to('.top-right-text', {
                opacity: 0, duration: 0.3,
            })
            timeline.to('.image-4', {
                opacity: 1, duration: 0.3
            }, "<")
            timeline.fromTo('.bottom-left-text', {
                opacity: 0,
            }, { opacity: 1, duration: 1 })
        }
    );
    return (
        <div>
            <div className='h-screen '>


            </div>
            <div className='w-screen h-[400dvh] relative features-section'>
                <div className='w-full sticky bottom-0 top-0 h-[100dvh] hidden lg:flex items-end justify-center'>
                    <div className='relative'>
                        <div className='h-[94dvh] relative top-[8dvh] aspect-[0.49]'>
                            <img className='h-[94dvh] absolute z-[0] image-1' src="/assets/images/website/match.png" />
                            <img className='h-[94dvh] absolute z-[1] image-2 opacity-0' src="/assets/images/website/chat.png" />
                            <img className='h-[94dvh] absolute z-[2] image-3 opacity-0' src="/assets/images/website/explore.png" />
                            <img className='h-[94dvh] absolute z-[3] image-4 opacity-0' src="/assets/images/website/swipe.png" />
                        </div>
                        <div className='absolute bottom-[80px] -right-[375px] bottom-right-text '>
                            <div className='relative w-fit'>
                                <svg width="123" height="61" viewBox="0 0 123 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M122 60L100.407 1H2.98023e-06" stroke="#D9D9D9" stroke-width="1.5" />
                                </svg>
                                <svg className='absolute -bottom-[8px] -right-[8px]' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="14" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                                    <circle cx="16" cy="16" r="8" fill="#FF5C00" />
                                </svg>

                            </div>
                            <div className='relative w-fit ml-[43px] mt-[12px]'>
                                <h2 className='font-bold text-[24px] leading-[28.8px] mb-[12px]'>Get Matched Faster</h2>
                                <p className='font-normal text-[18px] leading-[21.6px] text-[#8A8A8E] max-w-[319px]'>Our smart algorithm connects you with compatible matches in no time, so you can spend less time searching and more time building real connections.</p>
                            </div>
                        </div>
                        <div className='absolute top-[calc(80px+8dvh)] -right-[375px] top-right-text opacity-0'>
                            <div className='relative w-fit'>
                                <svg width="123" height="61" viewBox="0 0 123 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M122 60L100.407 1H2.98023e-06" stroke="#D9D9D9" stroke-width="1.5" />
                                </svg>
                                <svg className='absolute -bottom-[8px] -right-[8px]' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="14" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                                    <circle cx="16" cy="16" r="8" fill="#FF5C00" />
                                </svg>

                            </div>
                            <div className='relative w-fit ml-[43px] mt-[12px]'>
                                <h2 className='font-bold text-[24px] leading-[28.8px] mb-[12px]'>Find Your Match, Anywhere</h2>
                                <p className='font-normal text-[18px] leading-[21.6px] text-[#8A8A8E] max-w-[319px]'>From Africa to anywhere in the world, explore connections that feel right. Discover profiles tailored to your preferences and start your story today.</p>
                            </div>
                        </div>
                        <div className='absolute bottom-[80px] -left-[380px] xl:-left-[420px] flex flex-col items-end bottom-left-text opacity-0'>
                            <div className='relative w-fit'>
                                <svg width="123" height="61" viewBox="0 0 123 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 60L22.5929 1H123" stroke="#D9D9D9" stroke-width="1.5" />
                                </svg>

                                <svg className='absolute -bottom-[8px] -left-[8px]' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="14" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                                    <circle cx="16" cy="16" r="8" fill="#FF5C00" />
                                </svg>

                            </div>
                            <div className='relative w-fit ml-[43px] mt-[12px] text-right'>
                                <h2 className='font-bold text-[24px] leading-[28.8px] mb-[12px]'>Swipe, Explore, Connect</h2>
                                <p className='font-normal text-[18px] leading-[21.6px] text-[#8A8A8E] max-w-[300px] xl:max-w-[349px]'>Discover unique connections as you swipe through an international community. Explore profiles tailored to your preferences, and watch sparks fly with every match.</p>
                            </div>
                        </div>
                        <div className='absolute top-[calc(8dvh+52.75px)] -left-[389px] xl:-left-[420px] flex flex-col items-end top-left-text opacity-0'>
                            <div className='relative w-fit'>
                                <svg width="123" height="61" viewBox="0 0 123 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 60L22.5929 1H123" stroke="#D9D9D9" stroke-width="1.5" />
                                </svg>

                                <svg className='absolute -bottom-[8px] -left-[8px]' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="14" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                                    <circle cx="16" cy="16" r="8" fill="#FF5C00" />
                                </svg>

                            </div>
                            <div className='relative w-fit ml-[43px] mt-[12px] text-right'>
                                <h2 className='font-bold text-[24px] leading-[28.8px] mb-[12px]'>Speak Your Love Language</h2>
                                <p className='font-normal text-[18px] leading-[21.6px] text-[#8A8A8E] max-w-[300px] xl:max-w-[349px]'>Instant messaging that adapts to your style. Whether deep or playful, our chat helps you express yourself and truly connect, no matter where you are.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:hidden flex flex-col'>
                    <div className='min-h-[]'></div>
                    <div className='flex flex-1'></div>
                </div>
            </div>

            <div className='h-screen'></div>

        </div>
    )
}

const Landing: React.FC<LandingProps> = () => {
    return <div>
        <div className='h-screen '>
        </div>
        <WebsiteFeatures />
        <div className='h-screen'></div>

    </div>
}
export default Landing;