import DashboardSettingsModal from './DashboardSettingsModal'
import MobileModal from './MobileModal'

interface ActionsModalProps {
    show: boolean, hide: () => void, chatName: string, blockUser: () => void, reportUser: () => void
}

export const ActionsModal: React.FC<ActionsModalProps> = ({show, hide, chatName, blockUser, reportUser}) => {
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

export const ImagesModal: React.FC<ActionsModalProps> = ({show, hide, chatName, blockUser, reportUser}) => {
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

export const ImagesModalMobile: React.FC<ActionsModalProps> = ({show, hide, chatName, blockUser, reportUser}) => {
  return (
    <MobileModal showing={show} title="Add Photo" hideModal={hide}>
         <div className="flex gap-x-[1.6rem]">
             <button className='cursor-pointer text-[1.4rem] space-x-[0.8rem] font-normal text-[#8A8A8E] bg-[#F6F6F6] p-[0.8rem] flex justify-center items-center gap-x-2 rounded-[0.8rem] transition duration-300 hover:scale-[1.02] active:scale-[0.9]' onClick={blockUser}>Take Photo <img className='size-[1.5rem]' src='/assets/icons/black-camera.svg' /></button>
             <button className='cursor-pointer text-[1.4rem] space-x-[0.8rem] font-normal text-[#8A8A8E] bg-[#F6F6F6] p-[0.8rem] flex justify-center items-center gap-x-2 rounded-[0.8rem] transition duration-300 hover:scale-[1.02] active:scale-[0.9]' onClick={blockUser}>Add from gallery <img className='size-[1.5rem]' src='/assets/icons/black-camera.svg' /></button>
             {/* <div onClick={() => setGender("Male")} className={`modal__gender-option ${gender == 'Male' && 'modal__gender-option--selected'}`}>Male</div> */}
             {/* <div onClick={() => setGender("Female")} className={`modal__gender-option ${gender == 'Female' && 'modal__gender-option--selected'}`}>Female</div> */}
         </div>
     </MobileModal>
  )
}