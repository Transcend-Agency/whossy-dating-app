// import React, { useState } from 'react';
// import ChatListItem from './ChatListItem';

// type ChatInterfaceProps = {

// };

// const ChatInterface: React.FC<ChatInterfaceProps> = () => {

//     const [showChats, setShowChats] = useState<boolean>(false)

//     return ( 
//     <div className='dashboard-layout__chat-interface'>
//         <div className='dashboard-layout__chat-interface__drawer'>
//             <div className='flex justify-between px-[1.6rem] pb-[2.4rem]'>
//                 <div className="dashboard-layout__chat-interface__drawer__left">
//                     <img src="/assets/images/dashboard/chat-heart.svg" />
//                     <span className=''>Chat</span>
//                     <div className='dashboard-layout__chat-interface__drawer__left__unread-count'>20+</div>
//                 </div>
//                 <button className="dashboard-layout__chat-interface__drawer__open-button" >
//                     <img src="/assets/images/dashboard/open-drawer.svg" />
//                 </button>
//             </div>
//             {/* <div className='bg-white p-[1.6rem]'>
//                 <ChatListItem profileImage={'/assets/images/matches/stephen.png'} message='Nice to meet you :)' contactName='Temidire' messageStatus={true}/>
//             </div> */}
//         </div>
//     </div>)
// }
// export default ChatInterface;

import React, { useState } from 'react';
import ChatListItem from './ChatListItem';
import {AnimatePresence, motion} from 'framer-motion'

type ChatInterfaceProps = {

};

const ChatInterface: React.FC<ChatInterfaceProps> = () => {

    const [showChats, setShowChats] = useState<boolean>(false)

    return ( 
    <div className='dashboard-layout__chat-interface'>
        <motion.div className='dashboard-layout__chat-interface__drawer z-50'
        //  initial={{ opacity: 0, y: -20 }} // Initial state: hidden and moved up
        //  animate={{ opacity: 1, y: 0 }}   // Animate to visible and default position
        //  exit={{ opacity: 0, y: -20 }}    // Exit state: hidden and moved up
        //  transition={{ duration: 0.3 }}
        initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
        >
            <div className='flex justify-between px-[1.6rem] pb-[2.2rem]'>
                <div className="dashboard-layout__chat-interface__drawer__left">
                    <img src="/assets/images/dashboard/chat-heart.svg" />
                    <span className=''>Chat</span>
                    <div className='dashboard-layout__chat-interface__drawer__left__unread-count'>20+</div>
                </div>
                <button className="dashboard-layout__chat-interface__drawer__open-button cursor-pointer" onClick={() => setShowChats(!showChats)}>
                    <img src="/assets/images/dashboard/open-drawer.svg" />
                </button>
            </div>
           <AnimatePresence>
               {showChats &&
               <motion.div className='bg-white '
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
               >
                    <ChatListItem profileImage={'/assets/images/matches/stephen.png'} message='Nice to meet you :)' contactName='Temidire' messageStatus={true}/>
                    <ChatListItem profileImage={'/assets/images/matches/stephen.png'} message='Nice to meet you :)' contactName='Temidire' messageStatus={true}/>
                    <ChatListItem profileImage={'/assets/images/matches/stephen.png'} message='Nice to meet you :)' contactName='Temidire' messageStatus={true}/>
                    <ChatListItem profileImage={'/assets/images/matches/stephen.png'} message='Nice to meet you :)' contactName='Temidire' messageStatus={true}/>
                </motion.div>}
           </AnimatePresence>
        </motion.div>
    </div>)
}
export default ChatInterface;