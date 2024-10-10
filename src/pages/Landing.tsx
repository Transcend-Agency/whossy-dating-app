import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Landing = () => {
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
            <Navbar/>
        </div>

        <div className="relative z-10 flex flex-col items-center pt-[12.8rem]">
          <p className="text-[4.8rem] lg:text-[9.6rem] text-center px-[2rem] ">
            SWIPE, MATCH, LOVE - YOUR PERFECT PARTNER AWAITS!
          </p>
          <button className="mt-[2rem] bg-red text-white py-[0.8rem] px-[1.2rem] rounded-lg text-[1.6rem]">
            Start Swiping
          </button>     
        </div>

        <div className="relative h-screen">
            <img src={'/assets/icons/Rectangle1.svg'} alt="frame 1" className="lg:w-1/6 absolute top-[-20%] left-[50%] lg:top-[-35%] lg:left-[80%] transform -translate-x-1/2"/>
            <img src={'/assets/icons/Rectangle2.svg'} alt="frame 2" className="lg:w-1/6 absolute top-[10%] left-[40%] lg:top-[5%] transform -translate-x-1/2"/>
            <img src={'/assets/icons/Rectangle3.svg'} alt="frame 3" className="lg:w-1/6 absolute top-[25%] left-[75%] lg:top-[15%] lg:left-[90%] transform -translate-x-1/2"/>
            <img src={'/assets/icons/Rectangle4.svg'} alt="frame 4" className="lg:w-1/6 absolute top-[42%] left-[0%] lg:top-[25%] lg:left-[5%] transform "/>
        </div>

      </section>

      {/* SECOND PAGE */}

       <section className="relative w-full bg-white overflow-hidden space-y-[2rem] lg:grid lg:grid-cols-2 justify-center max-w-[122rem] items-center">
        <div className="text-center lg:text-start px-[2rem] space-y-[2rem]">
            <p className="text-[4.8rem] lg:text-7.5xl">LOVE, NO PASSPORT REQUIRED</p>
            <p className="text-[1.4rem] text-gray">Explore connections that span continents without leaving home. Our app brings you closer to people abroad, creating meaningful relationships no matter where you are.</p>
            <button className="mt-5 bg-red text-white py-[0.8rem] px-[1.2rem] text-[1.6rem] rounded-[0.8rem]">
            Join Now
          </button>         
        </div>
        <img src={'/assets/icons/wedding.svg'} alt="wedding-image" className="w-3/4 mx-auto"/>
      </section>

      { /* RONALD */}

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

        {/* LAST PAGE */}

    {/* MOBILE */}
    <section className="block lg:hidden relative w-full py-[12.8rem] space-y-[8rem]">
        <img src={"assets/icons/couple.svg"} alt="Image of a couple" className="mx-auto w-4/5 "/>

        <div className=" text-center lg:text-start space-y-[2.4rem] lg:w-[320px]">
            <div className="lg:absolute right-[2rem] bottom-[16rem] gap-y-[3.2rem] ">
                <p className=" text-[2rem] lg:text-[3rem]">STEPHANIE & DAVID</p>
                <p className="text-[1.4rem] text-gray lg:text-[1.8rem]">
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
          <div className="mx-8 w-4/5 max-w-[50rem]">
            <p className="text-[4.8rem]  italic leading-light">HEAR FROM THOSE WHO FOUND LOVE</p>      
          </div>

          <div className="lg:grid lg:grid-cols-3">


            <div className="flex items-end justify-start pl-[3.2rem] space-x-[8rem]">
                <button><img src={'/assets/icons/ArrowLeft.svg'} alt="left arrow" /></button>
                <button><img src={'/assets/icons/ArrowRight.svg'} alt="right arrow" /></button>
            </div>

            <div>
                <img src={"assets/icons/couple.svg"} alt="Image of a couple" className="mx-auto w-auto pr-[2rem]"/>
            </div>

            <div className="w-4/5 flex items-end ">
                <div>
                    <p className="text-3xl">STEPHANIE & DAVID</p>
                    <p className="text-sm text-gray lg:text-lg">
                      He was my first thought when I woke up in the morning.
                    </p>
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