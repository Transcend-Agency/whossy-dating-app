import ExpandableSection from "@/components/landing/ExpandableSection"
import Footer from "@/components/landing/Footer"
import Navbar from "@/components/landing/Navbar"


const Faq = () => {
  return (
    <>
    <Navbar />
    <div className="relative z-10 flex flex-col pt-[12.8rem] lg:pt-[3rem]">
    <p className="text-[3.2rem] lg:text-[4.8rem] px-[2rem] lg:px-[4rem]">GOT A QUESTION?</p>
    </div>

    <div className="p-20 text-[1.6rem] lg:text-[2.4rem] ">
      <ExpandableSection placeholder="Why Whossy"  />
      <ExpandableSection placeholder="Why Whossy" />
      <ExpandableSection placeholder="Why Whossy" />
      <ExpandableSection placeholder="Why Whossy" />
    </div>

    <Footer />
    </>
  )
}

export default Faq