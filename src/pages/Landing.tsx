import React from 'react';
import * as Storytelling from '@bsmnt/scrollytelling';

type LandingProps = {

};

const Landing: React.FC<LandingProps> = () => {
    return <div>
        <div className='h-screen '>
            {/* <Storytelling.Root>
                <Storytelling.Animation>

                </Storytelling.Animation>
            </Storytelling.Root> */}

        </div>
        <div className='w-screen h-[400dvh] relative'>
            <div className='w-full sticky top-0 h-[100dvh] flex items-end justify-center'>
                <div className='relative'>
                    <img className='h-[86dvh]' src="/assets/images/website/chat.png" />
                    <div className='absolute bottom-[80px] -right-[375px]'>
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
                    <div className='absolute top-[80px] -right-[375px]'>
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
                    <div className='absolute bottom-[80px] -left-[420px] flex flex-col items-end'>
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
                            <p className='font-normal text-[18px] leading-[21.6px] text-[#8A8A8E] max-w-[349px]'>Discover unique connections as you swipe through an international community. Explore profiles tailored to your preferences, and watch sparks fly with every match.</p>
                        </div>
                    </div>
                    <div className='absolute top-[52.75px] -left-[420px] flex flex-col items-end'>
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
                            <p className='font-normal text-[18px] leading-[21.6px] text-[#8A8A8E] max-w-[349px]'>Instant messaging that adapts to your style. Whether deep or playful, our chat helps you express yourself and truly connect, no matter where you are.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='h-screen'></div>

    </div>
}
export default Landing;