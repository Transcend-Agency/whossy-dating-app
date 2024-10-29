import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { ActionsModal } from "./ChatsModal";
import { DocumentData, arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useChatIdStore } from "@/store/ChatStore";
import { useAuthStore } from "@/store/UserId";
import upload from "@/hooks/upload";
import { getTime } from "@/constants";

interface SelectedChatProps {
    activePage: boolean;
    closePage: () => void
    // userData: User | undefined;
    // userPrefencesData: UserPrefences | undefined;
    chatData: any;
}

// type SettingsModal = 'hidden' | 'name' | 'gender' | 'email' | 'phone' | 'relationship-preference' | 'love-language' | 'zodiac' | 'future-family-plans' | 'smoker' | 'religion' | 'drinking' | 'workout' | 'pet' | 'marital-status' | 'height' | 'weight' | 'education'

const SelectedChat: React.FC<SelectedChatProps> = ({ activePage, closePage, chatData }) => {
    const [text, setText] = useState('');
    const [openEmoji, setOpenEmoji] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    const {auth} = useAuthStore();
    const {chatId} = useChatIdStore();

    const [chats, setChats] = useState<DocumentData>();

    useEffect(() => {endRef.current?.scrollIntoView({behavior: 'smooth'})}, [activePage, text])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpenEmoji(false);
			}
        };
		document.addEventListener("mousedown", handleClickOutside);
		return () => {document.removeEventListener("mousedown", handleClickOutside);};
	}, []);

    useEffect(() => {
        if (!chatId) return;
        const unSub = onSnapshot(doc(db, 'chats', chatId as string), (res) => {
           setChats(res.data())
        }, (err) => console.log(err))
        return () => { unSub() }
    }, [chatId])

    const [showModal, setShowModal] = useState<'actions' | 'hidden'>('hidden');
    
    const [image, setImage] = useState<{file: File | null, url: string | null}>({
        file: null,
        url: null
    })

    const imageRef = useRef<HTMLInputElement | null>(null);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            })
        }
    }

    const handleSendMessage = async () => {
        if (text === '') return;
        let imgUrl: string | null = null;
        try {
            if (image.file) {
                imgUrl = await upload(image.file);
            }
            await updateDoc(doc(db,'chats',chatId as string), {
                messages: arrayUnion({
                    senderId: auth?.uid,
                    text,
                    createdAt: new Date(),
                    ...(imgUrl && { img: imgUrl })
                })
            })

            const receiverId = chatData?.user?.uid; // Assuming chatData contains receiver information
            const userIDs = [auth?.uid as string, receiverId as string];

            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, 'userchats', id);
                const userChatsSnapshot = await getDoc(userChatsRef);
                // console.log(id)
            
                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData?.chats?.findIndex((c: { chatId: string }) => c.chatId === chatId);
                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text;
                        userChatsData.chats[chatIndex].isSeen = id === auth?.uid; // If the user is the sender, mark as seen
                        userChatsData.chats[chatIndex].updatedAt = Date.now();
            
                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        });
                    }
                }
            });
            setText('');
            setImage({
                file: null, url: null
            })
           
        } catch (err) {
            console.log(err)
        }
    }

    const handleBlock = async () => {
        const userDocRef = doc(db, 'users', auth?.uid as string);
         try {
          const user = await getDoc(userDocRef);
          const userData = user.data();
          const isRecieverBlocked = userData?.blocked?.some((item: string) => item === chatData?.user?.uid) ?? false;
          await updateDoc(userDocRef, {blocked: isRecieverBlocked ? arrayRemove(chatData?.user?.uid) : arrayUnion(chatData?.user?.uid)});
          
        } catch (error) {
        }
    }


    return (
        <>
            <ActionsModal show={showModal == 'actions'} hide={() => setShowModal('hidden')} chatName="Temidire" blockUser={() => {console.log(chatData)}} reportUser={handleBlock}/>
            <motion.div
                animate={activePage ? { x: "-100%", opacity: 1 } : { x: 0 }} transition={{ duration: 0.25 }} className="dashboard-layout__main-app__body__secondary-page preview-profile settings-page flex flex-col min-h-full z-20">
                <div className="settings-page__container">
                    <div className="bg-white py-[1.6rem] px-[2.4rem] flex justify-between items-center" style={{borderBottom: '1px solid #F6F6F6'}}>
                        <button onClick={closePage} className="settings-page__title__left gap-x-1">
                            <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                            {/* SHOULD ADD A DUMMY PROFILE PICTURE INCASE THERE ISN'T, BUT THERE SHOULD BE */}
                            <img className='size-[4.8rem] mr-2 object-cover rounded-full' src={chatData?.preferences?.photos[0]} alt="profile picture" />
                            <div className="space-y-1">
                                <p className="font-bold">{chatData?.user?.first_name}</p>
                                <p className="text-[#8A8A8E] font-normal">{chats?.test ?? ''}</p>
                            </div>
                        </button>
                        <button className="cursor-pointer" onClick={() => setShowModal('actions')}>
                            <img src="/assets/icons/three-dots.svg" alt="" />
                        </button>
                        {/* <button className="settings-page__title__save-button">Save</button> */}
                    </div>
                </div>
                <section className="text-[1.6rem] text-[#121212] flex-1 mx-8 flex flex-col overflow-y-scroll pb-20 no-scrollbar">
                    <header className=" my-[1.5rem] text-center">Conversation started on 1/8/2024</header>
                    <section className="messages flex flex-col gap-y-6">

                       { chats && chats?.messages?.map((message: any, i: number) =>  
                       <div className={`max-w-[70%] flex ${message.senderId === auth?.uid ? " flex-col self-end our_message" : ' gap-x-2 items-start flex-col their_message'}`} key={i}
                        // key={message.createAt}
                        >
                            <div className="flex flex-col">
                            {message.img && <img className='mr-2 max-h-[30rem] w-full object-contain ' src={message.img ?? '/assets/images/matches/tutorial.png'} alt="profile picture" />}
                            <p  
                            className={`${message.senderId === auth?.uid ? 'bg-[#E5F2FF]  self-end' : 'bg-[#F6F6F6]'} py-[1.6rem] px-[1.2rem] mt-4 w-fit`} style={{borderTopLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem',borderBottomLeftRadius: message.senderId === auth?.uid ? '1.2rem' : '0.4rem', borderBottomRightRadius: message.senderId === auth?.uid ?  '0.4rem' : '1.2rem'}}>{message.text}</p>
                            </div>
                            <p className="flex justify-end mt-2 text-[#cfcfcf]">
                                 {/* <img src="/assets/icons/delivered.svg" alt="" />  */}
                                 {getTime(message.createdAt)}</p>
                        </div>) }
                       {image.url && 
                       <div className="max-w-[70%] flex flex-col self-end">
                            <div className="flex flex-col">
                            <img className='mr-2 max-h-[30rem] w-full object-contain ' src={image.url}/>
                            </div>
                        </div>}
                        {/* <div className="max-w-[70%] flex self-end">
                             <div>
                                <p className="bg-[#E5F2FF] py-[1.6rem] px-[1.2rem]" style={{borderTopLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem', borderBottomLeftRadius: '1.2rem', borderBottomRightRadius: '0.4rem'}}>Hi, nice to meet you</p>
                                <p className="flex justify-end mt-2"> <img src="/assets/icons/delivered.svg" alt="" /> Sent: 1 min ago</p>
                            </div>
                        </div>
                        <div className="max-w-[70%] flex gap-x-2 items-center">
                            <img className='w-[4.8rem] h-[4.8rem] flex-shrink-0 object-cover rounded-full' src={'/assets/images/matches/stephen.png'} alt="profile picture" />
                            <div>
                                <p className="bg-[#F6F6F6] py-[1.6rem] px-[1.2rem]" style={{borderTopLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '1.2rem'}}>Hi, nice to meet you my name is temidire owoeye and I am a student </p>
                                <p className="flex justify-start mt-2"> <img src="/assets/icons/delivered.svg" alt="" /> Seen: 1 min ago</p>
                            </div>
                        </div> */}
                        <div ref={endRef}/>
                </section>
                </section>


               <AnimatePresence>{openEmoji &&  <motion.div initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }} transition={{ duration: 0.3, ease: "easeInOut" }} ref={dropdownRef} className="absolute bottom-32 right-8"><EmojiPicker onEmojiClick={(e) => setText((prev) => prev + e.emoji)}/> </motion.div>}</AnimatePresence>

                <footer className="flex justify-between bg-white items-center gap-x-4 mx-6 sticky bottom-10">
                    <div className="flex-1 flex gap-x-4">
                        <img className="size-[4.4rem] cursor-pointer" src="/assets/icons/add-image.svg" alt="" onClick={() => imageRef.current?.click()}/>
                        <input type="file" className="hidden" ref={imageRef} onChange={handleImage}/>
                        <div className="flex bg-[#F6F6F6] w-full rounded-l-full  px-5 items-center rounded-r-full overflow-hidden"><input type="text" className="bg-inherit outline-none w-full" placeholder="say something nice" value={text} onChange={(e) => setText(e.target.value)}
                         onKeyDown={(e) => {if (e.key == 'Enter') {handleSendMessage()} else return;}}
                         /> <img className="size-[1.6rem] ml-4 cursor-pointer" src="/assets/icons/emoji.svg" onClick={() => setOpenEmoji(!openEmoji)}  alt="Emoji selector" /> </div>
                    </div>
                    <div className="space-x-4">
                        <button className="bg-black text-white py-4 font-semibold px-4 rounded-full cursor-pointer"
                         onClick={handleSendMessage}
                         >Send</button>
                        {/* <button><img src="/assets/icons/chat-gift.svg" alt="" /></button>
                        <button><img src="/assets/icons/mic.svg" alt="" /></button> */}
                    </div>
                </footer>
            </motion.div>
        </>
    )
}

export default SelectedChat;