

const Footer = () => {
  return (
    <div className="lg:flex lg:justify-center px-[8rem] bg-red w-full lg:h-[25rem]">
      <footer className=" text-white py-[4rem] w-full space-y-[1.6rem] lg:grid lg:grid-cols-3 lg:items-center">
        <div className="space-y-[2.4rem]">
          <div className="flex items-center">
            <img src={'/assets/icons/logo.svg'} alt="Logo" className="mr-[0.8rem]" />
            <p className="text-[1.6rem]">whossy</p>
          </div>
          <div>
            <p className="mb-[2.4rem] font-medium text-[1.6rem]" >whossy © 2024. All rights reserved</p>
          </div>
          <div className="flex space-x-[4rem]">
            <a href="#x">
              <img src={'/assets/icons/twitter.svg'} alt="X" />
            </a>
            <a href="#instagram">
              <img src={'/assets/icons/instagram.svg'} alt="Instagram" />
            </a>
            <a href="#facebook">
              <img src={'/assets/icons/facebookLogo.svg'} alt="Facebook" />
            </a>
            <a href="#telegram">
              <img src={'/assets/icons/telegram.svg'} alt="Telegram" />
            </a>
          </div>
        </div>

        <div className="flex flex-col space-y-[2.4rem] text-[1.6rem]">
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact Us</a>
        </div>

        <div className="flex flex-col space-y-[4rem] ">
          <h3 className="font-bold text-[1.6rem]">DOWNLOAD OUR APP</h3>
            <div className="space-y-[2rem] lg:space-y-0 lg:grid lg:grid-cols-2 lg:space-x-[0.8rem]">
              <div>
                <a href="#app-store">
                  <img src={'/assets/icons/AppleStore.svg'} alt="App Store" />
                </a>
              </div>
              <div>
              <a href="#play-store">
                <img src={'/assets/icons/Play-Store.svg'} alt="Play Store" />
              </a>
              </div>
            </div>

        </div>

      </footer>
    </div>
  );
};

export default Footer;
