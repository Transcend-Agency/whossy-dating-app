
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router";


const Navbar = () => {
  const [mobileNav, toggleMobileNav] = useCycle(false, true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate()


  return (
    <>
      {/* MOBILE HEADER relative */}
      <header className="absolute top-0 z-20 lg:hidden bg-red text-white max-w-[10000px] rounded-[8px] m-[28px] overflow-hidden">
        <div className="container flex items-center justify-between py-[12px] px-[12px]">
          <div className="flex items-center mr-[80px]">
            <img src={"/assets/icons/logo.svg"} alt="Logo" className="mr-[8px]" />
            <p className="text-[16px] font-black">whossy</p>
          </div>

          <div className="h-[20px]" style={{ borderLeft: '1px solid #FFFFFF' }} />
          <motion.button
            animate={mobileNav ? "open" : "closed"}
            ref={buttonRef}
            onClick={() => toggleMobileNav()}
            className="flex flex-col space-y-[6px] px-[16px] "
          >

            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 },
              }}
              className="w-[28px] h-[2px] bg-white"
            ></motion.span>
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="w-[28px] h-[2px] bg-white"
            ></motion.span>
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 },
              }} 
              className="w-[28px] h-[2px] bg-white"
            ></motion.span>
          </motion.button>
        </div>
      </header>

      {/* DESKTOP HEADER */}
      <header className="relative z-10 bg-red text-white max-w-[60rem] m-[4rem] rounded-[0.8rem] hidden lg:block">
        <div className="container flex justify-between items-center py-[1.2rem] px-[2.4rem]">
          <div className="flex items-center">
            <img src={'/assets/icons/logo.svg'} alt="Logo" className="mr-[0.8rem]" />
            <p className="text-[1.6rem] font-black">whossy</p>
          </div>

          <div className="h-[3rem]" style={{ borderLeft: '1px solid #FFFFFF' }}></div>

          <nav className="flex items-center space-x-[2.4rem]">
            <button onClick={() => navigate('/auth/login')} className="text-[1.6rem]">Login</button>
            <button
            onClick={() => navigate('/auth/create-account')}
              className="border bg-white text-red text-[1.6rem] px-[1.2rem] py-[1.4rem] rounded-[0.8rem]"
            >
              Create account
            </button>
          </nav>

          <div className="h-[3rem]" style={{ borderLeft: '1px solid #FFFFFF' }}></div>

          <div className="flex items-center text-[1.6rem] space-x-[1.6rem]">
            <p>Download on</p>
            <a href="#ios-download" >
              <img src={'/assets/icons/apple.svg'} alt="Download on Apple Store" />
            </a>
            <a href="#android-download" >
              <img src={'assets/icons/playstore.svg'} alt="Download on Google Play" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
