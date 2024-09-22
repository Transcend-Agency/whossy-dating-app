import React from 'react'

interface ChatListItemProps {
    profileImage: string;
    contactName: string;
    message: string;
    messageStatus?: boolean;
    onlineStatus?: boolean;
    openChat?: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({profileImage, contactName, message, messageStatus, openChat, onlineStatus}) => {
  return (
    <div className='flex justify-between cursor-pointer hover:bg-[#f9f8f8] px-[1.6rem] pb-[0.6rem] pt-[1.4rem] transition-all duration-300 ease-in-out transform hover:scale-[1.02]' style={{borderBottom: '1px solid #F6F6F6'}} onClick={openChat}>
        <div className='flex gap-x-[0.8rem]'> 
            <div className='relative'>
                <img className='size-[5.6rem] object-cover rounded-full' src={profileImage} alt="profile picture" />
                <div className='bg-white p-[0.2rem] absolute bottom-0 right-0 rounded-full'>
                    <div className='bg-[#0CB25A] size-[1.4rem] rounded-full'/>
                </div>
            </div>
            <div>
                <p className='text-[1.8rem] leading-[2.16rem]'>{contactName}</p>
                <p className='text-[#8A8A8E] text-[1.6rem] leading-[1.92rem]'>{message}</p>
            </div>
        </div>
       {messageStatus && <p className='bg-[#F6F6F6] text-[1.4rem] flex items-center font-normal h-[28px] px-[0.6rem] rounded-[0.6rem]'>Unread</p>}
    </div>
  )
}

export default ChatListItem