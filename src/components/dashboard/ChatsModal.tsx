import DashboardSettingsModal from './DashboardSettingsModal'
import { IoSend } from "react-icons/io5";

interface ActionsModalProps {
  show: boolean, hide: () => void, chatName: string, blockUser: () => void, reportUser: () => void
}

export const ActionsModal: React.FC<ActionsModalProps> = ({ show, hide, chatName, blockUser, reportUser }) => {
  return (
    <DashboardSettingsModal showing={show} title="Actions" hideModal={hide}>
      <div className="flex flex-col gap-y-4">
        <button className='cursor-pointer text-[1.8rem] font-medium bg-[#F6F6F6] py-[1.8rem] flex justify-center items-center gap-x-2 rounded-[0.8rem] hover:bg-[#ececec] transition duration-300 hover:scale-[1.02] active:scale-[0.9]' onClick={blockUser}><img src='/assets/icons/block-user.svg' /><p>Block {chatName} </p></button>
        <button className='cursor-pointer text-[1.8rem] font-medium bg-[#F6F6F6] text-[#F2243E] py-[1.8rem] flex justify-center items-center gap-x-4 rounded-[0.8rem] hover:bg-[#ececec] transition duration-300 hover:scale-[1.02] active:scale-[0.9]' onClick={reportUser}><img src='/assets/icons/report.svg' /><p className='mt-2'>Report {chatName} </p></button>
        {/* <div onClick={() => setGender("Male")} className={`modal__gender-option ${gender == 'Male' && 'modal__gender-option--selected'}`}>Male</div> */}
        {/* <div onClick={() => setGender("Female")} className={`modal__gender-option ${gender == 'Female' && 'modal__gender-option--selected'}`}>Female</div> */}
      </div>
    </DashboardSettingsModal>
  )
}

{/* <AnimatePresence mode='wait'>
      {show &&
        <motion.div initial="hidden" animate="visible" exit="exit" variants={modalVariants} transition={{ duration: 0.3 }} className="fixed inset-0 flex justify-center items-center z-50 bg-[#b9b9b9] bg-opacity-50 w-full h-screen">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-white text opacity-100 z-[9999] py-[2rem] px-[4rem] space-y-[3rem] rounded-[2rem]">
            <div>
                <h1 className='text-3xl font-bold flex justify-center mb-[2rem]'>Help & Support</h1>
                <textarea name="help-box" id="help-box" placeholder="Enter your problem" className="bg-white border border-gray focus:outline-none rounded-lg px-4 py-4 w-[369px] h-[169px] placeholder:text-2xl text-2xl"></textarea>
            </div>

            <div className="flex flex-row gap-x-4"> 
                <button className="bg-[#F6F6F6] py-[1.3rem] w-full text-[1.8rem] font-bold text-center rounded-lg hover:text-white hover:bg-[#F2243E] transition-all duration-300 cursor-pointer" onClick={onCloseModal}>Cancel</button>
                <button className="bg-[#F6F6F6] py-[1.3rem] w-full text-[1.8rem] font-bold text-center rounded-lg hover:text-white hover:bg-[#F2243E] transition-all duration-300 cursor-pointer whitespace-nowrap inline-block" >Send Help {""}</button>
            </div>
          </motion.div>                                                                                                                                                                                         
        </motion.div>}
    </AnimatePresence> */}

export const ImagesModal: React.FC<ActionsModalProps & {imageUrl: string, sendImage: () => void, text: string, setText: (text: string) => void}> = ({show, hide, text, setText, imageUrl, sendImage}) => {
  return (
    <DashboardSettingsModal showing={show} title="Send Image" hideModal={hide}>
         <div className="flex flex-col gap-y-4 ">
          <div className='bg-[#F6F6F6]' style={{border: '1px solid #F6F6F6'}}><img src={imageUrl} className='w-full h-96 object-contain' alt="Selected Image" /></div>
          <div className="flex bg-[#F6F6F6] text-[1.3rem] w-full rounded-l-full px-5 py-5 items-center rounded-r-full overflow-hidden"><input type="text" className="bg-inherit outline-none w-full" placeholder="Write a message... "  value={text} onChange={(e) => setText(e.target.value)}
          // onKeyDown={(e) => {if (e.key == 'Enter') {console.log('Enter was pressed')} else return;}}
          /> <IoSend className='cursor-pointer' onClick={sendImage}/> </div>
         </div>
     </DashboardSettingsModal>
  )
}