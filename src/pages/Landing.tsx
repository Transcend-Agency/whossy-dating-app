import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../components/landing/Footer';
import Navbar from '../components/landing/Navbar';

const DesktopWebsiteFeatures = () => {
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
        <div className=''>
            <div className='w-screen h-[400dvh] relative features-section hidden lg:block'>
                <div className=' w-full sticky bottom-0 top-0 h-[100dvh] hidden lg:flex items-end justify-center'>
                    <div className='relative '>
                        <div className='lg:h-[94dvh] xl:h-[94dvh] relative top-[8dvh] lg:aspect-[0.49] '>
                            <img className='h-[94dvh] absolute z-[0] image-1' src="/assets/images/website/match.png" />
                            <img className='h-[94dvh] absolute z-[1] image-2 opacity-0' src="/assets/images/website/chat.png" />
                            <img className='h-[94dvh] absolute z-[2] image-3 opacity-0' src="/assets/images/website/explore.png" />
                            <img className='h-[94dvh] absolute z-[3] image-4 opacity-0' src="/assets/images/website/swipe.png" />
                        </div>
                        <div className='absolute bottom-[80px] -right-[375px] bottom-right-text'>
                            <div className='relative w-fit'>
                                <svg width="123" height="61" viewBox="0 0 123 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M122 60L100.407 1H2.98023e-06" stroke="#D9D9D9" stroke-width="1.5" />
                                </svg>
                                <svg className='absolute -bottom-[8px] -right-[8px]' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="14" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                                    <circle cx="16" cy="16" r="8" fill="#FF5C00" />
                                </svg>
                            </div>

                            <div className='relative xl:w-fit mx-auto ml-[43px] mt-[12px]'>
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
            </div>

            <div className='block lg:hidden space-y-[8rem]'>
                <div className="h-[90dvh] relative top-[10dvh] aspect-[0.49] px-[5rem] ">
                    <div className="flex flex-col items-center justify-center bg-white">
                        <h1 className="text-[2rem] font-bold text-center">Get Matched Faster</h1>
                        <p className="text-gray text-[1.6rem] leading-[1.68rem] text-center px-6 mt-4">
                            Our smart algorithm connects you with compatible matches in no time,
                            so you can spend less time searching and more time building real connections.
                        </p>

                        <svg className='mt-3' width="24" height="51" viewBox="0 0 24 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 48V26.2989V1.78814e-07" stroke="#D9D9D9" stroke-width="1.5" />
                            <circle cx="12" cy="39" r="10" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                            <circle cx="12" cy="39" r="6" fill="#FF5C00" />
                        </svg>

                        <div className="mt-3">
                            <img
                                src="/assets/images/website/match.png" alt="Matched Profile" />
                        </div>
                    </div>
                </div>


                <div className='h-[90dvh] relative top-[10dvh] aspect-[0.49] px-[5rem]'>
                    <div className="flex flex-col items-center justify-center bg-white">
                        <h1 className="text-[2rem] font-bold text-center">Find Your Match, Anywhere</h1>
                        <p className="text-gray text-[1.6rem] leading-[1.68rem] text-center px-6 mt-4">
                            From Africa to anywhere in the world, explore connections that feel right. Discover profiles tailored to your preferences and start your story today.
                        </p>

                        <svg className='mt-3' width="24" height="51" viewBox="0 0 24 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 48V26.2989V1.78814e-07" stroke="#D9D9D9" stroke-width="1.5" />
                            <circle cx="12" cy="39" r="10" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                            <circle cx="12" cy="39" r="6" fill="#FF5C00" />
                        </svg>

                        <div className="mt-3">
                            <img
                                src="/assets/images/website/chat.png"
                                alt="Matched Profile"
                                className=""
                            />
                        </div>
                    </div>
                </div>

                <div className='h-[90dvh] relative top-[10dvh] aspect-[0.49] px-[5rem]'>
                    <div className="flex flex-col items-center justify-center bg-white">
                        <h1 className="text-[2rem] font-bold text-center">Swipe, Explore, Connect</h1>
                        <p className="text-gray text-[1.6rem] leading-[1.68rem] text-center px-6 mt-4">
                            Discover unique connections as you swipe through an international community. Explore profiles tailored to your preferences, and watch sparks fly with every match.
                        </p>

                        <svg className='mt-3' width="24" height="51" viewBox="0 0 24 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 48V26.2989V1.78814e-07" stroke="#D9D9D9" stroke-width="1.5" />
                            <circle cx="12" cy="39" r="10" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                            <circle cx="12" cy="39" r="6" fill="#FF5C00" />
                        </svg>

                        <div className="mt-3">
                            <img
                                src="/assets/images/website/explore.png"
                                alt="Matched Profile"
                                className=""
                            />
                        </div>
                    </div>
                </div>

                <div className='h-[90dvh] relative top-[10dvh] aspect-[0.49] px-[5rem]'>
                    <div className="flex flex-col items-center justify-center bg-white">
                        <h1 className="text-[2rem] font-bold text-center">Speak Your Love Language</h1>
                        <p className="text-gray text-[1.6rem] leading-[1.68rem] text-center px-6 mt-4">
                            Instant messaging that adapts to your style. Whether deep or playful, our chat helps you express yourself and truly connect, no matter where you are.
                        </p>

                        <svg className='mt-3' width="24" height="51" viewBox="0 0 24 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 48V26.2989V1.78814e-07" stroke="#D9D9D9" stroke-width="1.5" />
                            <circle cx="12" cy="39" r="10" fill="#FEFEFE" stroke="#FF5C00" stroke-width="4" />
                            <circle cx="12" cy="39" r="6" fill="#FF5C00" />
                        </svg>

                        <div className="mt-3">
                            <img
                                src="/assets/images/website/swipe.png"
                                alt="Matched Profile"
                                className=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

const Landing = () => {
    const secondPageRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()

    const handleStartSwiping = () => {
        if (secondPageRef.current) {
            secondPageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="flex flex-col items-center">
                {/* FIRST PAGE */}

                <section className="relative w-full bg-white overflow-hidden">
                    <div className=" absolute grid grid-cols-6 h-screen w-full">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="flex justify-center">
                                <div className="w-[1px] h-screen bg-gradient-to-b from-[#D9D9D9] to-[#FEFEFE]"></div>
                            </div>
                        ))}
                    </div>

                    <div className="fixed top-0 w-full z-20">
                        <Navbar />
                    </div>

                    <div className="relative z-10 flex flex-col items-center pt-[10rem] lg:pt-[12.8rem]">
                        <p className="text-[4.8rem] leading-[5.6rem] w-5/6 lg:w-11/12 lg:text-[8.8rem] lg:leading-[9.2rem] text-center px-[2rem] ">
                            SWIPE, MATCH, LOVE - YOUR PERFECT PARTNER AWAITS!
                        </p>
                        <button onClick={handleStartSwiping} className="mt-[2rem] bg-red text-white w-[13.3rem] h-[4.6rem] text-center rounded-[1.2rem] text-[1.6rem]">
                            Start Swiping
                        </button>
                    </div>

                    <div className="relative h-[calc(100vh-(0.45*100vh))]">
                        <img src={'/assets/icons/Rectangle1.svg'} alt="frame 1" className="w-[7.2rem] lg:w-[12rem] xl:w-[20rem] absolute bottom-[500px] left-[50%] lg:bottom-[500px] lg:left-[80%] transform -translate-x-1/2 "  />
                        <img src={'/assets/icons/Rectangle2.svg'} alt="frame 2" className="w-[12rem] lg:w-[20rem] absolute top-[50px] left-[40%] lg:top-[50px] transform -translate-x-1/2" />
                        <img src={'/assets/icons/Rectangle3.svg'} alt="frame 3" className="w-[12rem] lg:w-[20rem] absolute top-[150px] left-[75%] lg:top-[150px] lg:left-[70%] transform -translate-x-1/2"/>
                        <img src={'/assets/icons/Rectangle4.svg'} alt="frame 4" className="w-[12rem] lg:w-[20rem] absolute bottom-[50px] left-[0%] lg:bottom-[20px] lg:left-[1%] transform" />
                    </div>
                </section>

                {/* SECOND PAGE */}
                <section ref={secondPageRef} className="relative h-screen pt-40 lg:pt-0 w-full bg-white overflow-hidden space-y-[2rem] lg:grid lg:grid-cols-2 justify-center max-w-[122rem] items-center mx-auto">
                    <div className="text-center lg:text-start px-[2rem] space-y-[2rem] w-11/12 mx-auto" >
                        <p className="text-[4.8rem] leading-[5.2rem] lg:text-[8.8rem] lg:leading-[9.2rem] ">LOVE, NO PASSPORT REQUIRED</p>
                        <p className="text-[1.8rem] leading-[2.4rem] lg:text-[2.4rem] lg:leading-[2.88rem] text-gray">Explore connections that span continents without leaving home. Our app brings you closer to people abroad, creating meaningful relationships no matter where you are.</p>
                        <button onClick={() => navigate('/auth/create-account')} className="mt-5 bg-red text-white w-[8rem] h-[3.3rem] lg:w-[9.6rem] lg:h-[4.6rem] text-[1.6rem] text-center rounded-[0.8rem]">
                            Join Now
                        </button>
                    </div>

                    <img src={'/assets/icons/wedding.svg'} alt="wedding-image" className="w-3/4 mx-auto" />
                </section>

                {/* RONALD */}
                <DesktopWebsiteFeatures />


                {/* LAST PAGE */}

                {/* MOBILE */}
                <section className="block lg:hidden relative w-full py-[12.8rem] space-y-[8rem]">

                    <div className="mx-12 w-3/5 max-w-[50rem]">
                        <p className="text-[3.2rem] italic leading-[3.6rem]">HEAR FROM THOSE WHO FOUND LOVE</p>
                    </div>

                    <img src={"assets/icons/couple.svg"} alt="Image of a couple" className="mx-auto w-4/5 " />

                    <div className="text-center space-y-[2.4rem]">
                        <div className=" right-[2rem] bottom-[16rem] space-y-[2.4rem] ">
                            <p className="text-[3rem]">STEPHANIE & DAVID</p>
                            <p className="text-[2rem] text-gray">
                                He was my first thought when I woke up in the morning.
                            </p>
                        </div>
                        <div className="flex items-center lg:absolute justify-center space-x-[4rem]">
                            <button><img src={'/assets/icons/ArrowLeft.svg'} alt="left arrow" /></button>
                            <button><img src={'/assets/icons/ArrowRight.svg'} alt="right arrow" /></button>
                        </div>
                    </div>
                </section>

                {/* DESKTOP */}
                <section className="hidden lg:block relative py-[12.8rem] w-full bg-white space-y-[4rem] ">
                    <div className="mx-16 w-4/5 max-w-[50rem]">
                        <p className="text-[4.8rem] italic leading-[5.6rem]">HEAR FROM THOSE WHO FOUND LOVE</p>
                    </div>

                    <div className="lg:grid lg:grid-cols-3">
                        <div className="flex items-end justify-start pl-16 space-x-[5rem]">
                            <button><img src={'/assets/icons/ArrowLeft.svg'} alt="left arrow" /></button>
                            <button><img src={'/assets/icons/ArrowRight.svg'} alt="right arrow" /></button>
                        </div>

                        <div>
                            <img src={"assets/icons/couple.svg"} alt="Image of a couple" className="mx-auto w-auto pr-[2rem]" />
                        </div>

                        <div className="w-4/5 flex items-end">
                            <div>
                                <p className="text-[3.2rem] leading-[3.2rem]">STEPHANIE & DAVID</p>
                                <p className="text-gray text-[1.8rem] leading-[2.4rem]">He was my first thought when I woke up in the morning.</p>
                            </div>
                        </div>
                    </div>

                </section>

                <Footer />
            </div>
        </>
    )
}
export default Landing;