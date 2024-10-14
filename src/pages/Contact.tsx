import Navbar from "@/components/landing/Navbar"
import { useState } from "react";

import couplePic from "../../public/assets/icons/contact.svg"
import Footer from "@/components/landing/Footer";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };
  return (
    <>
     <Navbar />
     <div  className="relative z-10 flex flex-col pt-[12.8rem] lg:pt-[3rem]">
        <p className="text-[3.2rem] lg:text-[4.8rem] p-[2rem] lg:px-[4rem] italic lg:hidden">SEND US A MESSAGE</p>
     </div>

      <div className="lg:flex lg:items-center lg:gap-10 xl:gap-0 pb-[14rem] ">
     {/* <img src={"/assets/icons/contact.svg"} alt="couple" className="px-[4rem]" /> */}
     <div className="px-[2.5rem] lg:pr-0 lg:w-1/2 sm:px-[3.5rem] md:px-[4rem]">
      <div style={{backgroundImage: `url(${couplePic})`}} className="bg-img lg:max-w-[50.4rem] h-[56rem] w-full transition-all duration-[300ms]"></div>
     </div>

      <div className="pr-[4rem] lg:pr-0  lg:w-2/3 w-full">
     <form onSubmit={handleSubmit} className=" mx-auto w-full  lg:pl-0 lg:pr-16 p-16 pr-0 space-y-[2.4rem] ">
     <p className="text-[3.2rem] lg:text-[4.8rem] lg:py-0 py-[2rem] hidden italic lg:block">SEND US A MESSAGE</p>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-[1.6rem] py-[2.4rem] lg:text-[1.8rem] lg:py-[3.2rem] italic text-gray">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="border-b border-gray outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-[1.6rem] py-[2.4rem] lg:text-[1.8rem] lg:py-[3.2rem] italic text-gray">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border-b border-gray focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="message" className="text-[1.6rem] py-[2.4rem] lg:text-[1.8rem] lg:py-[3.2rem] italic text-gray">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="border-b border-gray focus:outline-none "
        />
      </div>
      <button
        type="submit"
        className="bg-red text-white text-[1.4rem] lg:text-[1.4rem] py-[1.2rem] lg:py-[2rem] px-[1.6rem] "
      >
        Send Message
      </button>
    </form>
    </div>
    </div>

    <Footer />
    </>
  )
}

export default Contact