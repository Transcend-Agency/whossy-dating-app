import { AnimatePresence, motion } from 'framer-motion'
import React, {useState} from "react";
import {useAuthStore} from "@/store/UserId.tsx";
import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "@/firebase";
import toast from "react-hot-toast";
import {User} from "@/types/user.ts";

interface ReportModalProps {
  show: boolean
  onCloseModal: () => void;
  userData: User
}

const modalVariants = {
  hidden: { opacity: 0, },
  visible: { opacity: 1, },
  exit: { opacity: 0, }
};

const ReportModal: React.FC<ReportModalProps> = ({ show, onCloseModal, userData }) => {

  const { user } = useAuthStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const sendReport = async () => {
    if (!message.trim()) return; // Avoid sending empty messages

    setLoading(true);
    try {
      const reportRef = collection(db, 'userReports');
      const reportId = `${user?.uid}_${userData.uid}`

      await setDoc(doc(reportRef, reportId), {
        reporterId: user?.uid,
        reportedId: userData.uid,
        message: message,
        timestamp: new Date().toISOString(),
      });

      setMessage("");
      onCloseModal();
      toast.success("Report Sent Successfully.");
    } catch (error) {
      console.log("Error sending report", error)
      toast.error("Error sending report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode='wait'>
      {show &&
        <motion.div initial="hidden" animate="visible" exit="exit" variants={modalVariants} transition={{ duration: 0.3 }} className="fixed inset-0 flex justify-center items-center z-50 bg-[#b9b9b9] bg-opacity-50 w-full h-screen">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-white text opacity-100 z-[9999] py-[2rem] px-[4rem] space-y-[3rem] rounded-[2rem]">
            <div>
                <h1 className='text-3xl font-bold flex justify-center mb-[2rem]'>Report Account</h1>
                <textarea
                    name="help-box" id="help-box" placeholder="Enter your problem" className="bg-white border border-gray focus:outline-none rounded-lg px-4 py-4 w-[369px] h-[169px] placeholder:text-2xl text-2xl" value={message}
                    onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>

            <div className="flex flex-row gap-x-4"> 
                <button className="bg-[#F6F6F6] py-[1.3rem] w-full text-[1.8rem] font-bold text-center rounded-lg hover:text-white hover:bg-[#F2243E] transition-all duration-300 cursor-pointer" onClick={() => {
                  setMessage("")
                  onCloseModal()
                }}>Cancel</button>
                <button onClick={sendReport} className={` ${loading ? 'bg-[#F2243E] text-white' : 'bg-[#F6F6F6]'}  py-[1.3rem] w-full text-[1.8rem] font-bold text-center rounded-lg hover:text-white hover:bg-[#F2243E] transition-all duration-300 cursor-pointer whitespace-nowrap inline-block`} >{loading ? "Sending..." : "Report Account"}</button>
            </div>
          </motion.div>                                                                                                                                                                                         
        </motion.div>}
    </AnimatePresence>
  )
}

export default ReportModal;