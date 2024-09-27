import { AnimatePresence, motion as m } from "framer-motion"
import { ActionsModal, ImagesModal } from "./ChatsModal"
import { useEffect, useRef, useState } from "react"
import EmojiPicker from "emoji-picker-react"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { v4 as uuidv4 } from 'uuid';
import Skeleton from "../ui/Skeleton"
import { useAuthStore } from "@/store/UserId"

interface SelectedChatTwoProps { 
    activePage: boolean
    closePage: () => void
}

const SelectedChatTwo:React.FC<SelectedChatTwoProps> = ({activePage, closePage}) => {
    const [showActionsModal, setShowActionsModal] = useState<'action' | 'hidden'>("hidden");
    const [text, setText] = useState<string>('');
    const [openEmoji, setOpenEmoji] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    //images
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

    // current user id
    const {auth} = useAuthStore();
    const currentUserId= auth?.uid as string;

    //getting recipient user's name and profile picture from query params i.e the 
    const queryParams = new URLSearchParams(location.search);
    const reciepientUserId = queryParams.get('recipient-user-id');

    const [userDetails, setUserDetails] = useState<{name: string | null, profilePicture: string | null}>({name: null, profilePicture: null});

    useEffect(() => { 
        let isMounted = true;
        const getUserDetails = async () => { 
            try { 
             const docRef = doc(db, "users", reciepientUserId as string);
             const docSnap = await getDoc(docRef);
             if (docSnap.exists()) {
                 setUserDetails({name: docSnap.data().first_name, profilePicture: docSnap.data().photos[0]});
             } else {
                 console.log("No such document!");
             }} catch (error) {
                 console.log("Error getting document:", error);
             }
         }
        if (isMounted && reciepientUserId) {
            getUserDetails();
        }
        return () => {isMounted = false; console.log('Mounted of')}
    }, [reciepientUserId])

    //sending text message to the recipient
    const handleSendMessage = async () => {
        const allchats = await getDocs(collection(db, "allchats"));
        const chats: {first_id: string, second_id: string}[] = [];

        allchats.forEach((doc) => {
          const result = doc.id.split('_');
          chats.push({ first_id: result[0], second_id: result[1] });
        });
    
        // console.log(chats);
        try { 
            const chat = chats.find((chat) => (chat.first_id === currentUserId && chat.second_id === reciepientUserId) || (chat.first_id === reciepientUserId && chat.second_id === currentUserId));
            if (chat) {
                await setDoc(doc(db, "allchats", currentUserId + '_' + reciepientUserId), {
                lastMessage: text,
                lastMessageId: uuidv4(),
                lastSenderId: currentUserId,
                userBlocked: [false, false],
            }); }
        } catch (err) {
            console.log('Error sending message');
        }
        console.log('Message sent')
    }

  return (
    <AnimatePresence>
        {activePage &&  
          <>
           <ActionsModal show={showActionsModal === "action"} hide={() => setShowActionsModal('hidden')} chatName="Temidire" blockUser={() => console.log('You have benn blocked')} reportUser={() => console.log('You have been reported')}/>
           <ImagesModal show={Boolean(image.url)} imageUrl={image.url as string} hide={() => setImage({file: null, url: null})} chatName="Davido" blockUser={() => console.log('You have benn blocked')} reportUser={() => console.log('You have been reported')} />
           <m.div initial={{ opacity: 0, y:100 }}  animate={{ opacity: 1, y:0 }}  exit={{ opacity: 0, y:100 }}  transition={{ duration: 0.3 }} className='z-20 relative bg-white flex flex-col min-h-full'>
                    <header className=" text-[1.8rem] py-[1.6rem] px-[2.4rem] flex justify-between items-center" style={{borderBottom: '1px solid #F6F6F6'}}>
                        <button className="settings-page__title__left gap-x-1" onClick={closePage}>
                            <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                            {userDetails.profilePicture ? <img className='size-[4.8rem] mr-2 object-cover rounded-full' src={userDetails.profilePicture} alt="profile picture" /> : <Skeleton width="4.8rem" height="4.8rem" className="rounded-full" />}
                            <div className="space-y-1">
                                {userDetails.name ? <p className="font-bold">{userDetails.name}</p> : <Skeleton width="8rem" height="1.6rem" />}
                                <p className="text-[#8A8A8E] font-normal">last seen recently</p>
                            </div>
                        </button>
                        <button className="cursor-pointer" onClick={() => setShowActionsModal('action')}>
                            <img src="/assets/icons/three-dots.svg" alt="" />
                        </button>
                    </header>
                    <section className="text-[1.6rem] text-[#121212] z-[30] flex-1 px-8 flex flex-col overflow-y-scroll pb-20 no-scrollbar">
                    <header className=" my-[1.5rem] text-center">Conversation started on 1/8/2024</header>
                    <section className="messages flex flex-col gap-y-6">
                        <div className="max-w-[70%] flex gap-x-2 items-center">
                            <div>
                                <p className="bg-[#F6F6F6] py-[1.6rem] px-[1.2rem]" style={{borderTopLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '1.2rem'}}>Hi, nice to meet you my name is temidire owoeye and I am a student </p>
                                <p className="flex justify-start mt-2 text-[#828181]"> <img src="/assets/icons/delivered.svg" alt="" /> Seen: 1 min ago</p>
                            </div>
                        </div>
                        <div className="max-w-[70%] flex self-end">
                             <div>
                                <p className="bg-[#E5F2FF] py-[1.6rem] px-[1.2rem]" style={{borderTopLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem', borderBottomLeftRadius: '1.2rem', borderBottomRightRadius: '0.4rem'}}>Hi, nice to meet you</p>
                                <p className="flex justify-end mt-2 text-[#828181]"> <img src="/assets/icons/delivered.svg" alt="" /> Sent: 1 min ago</p>
                            </div>
                        </div>
                        
                        {/* <div ref={endRef}/> */}
                </section>
                </section>
               <AnimatePresence>{openEmoji &&  <m.div initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }} transition={{ duration: 0.3, ease: "easeInOut" }} ref={dropdownRef} className="absolute bottom-32 right-8 z-50"><EmojiPicker onEmojiClick={(e) => setText((prev) => prev + e.emoji)}/> </m.div>}</AnimatePresence>
                <footer className="flex justify-between z-50 text-[1.6rem] bg-white items-center gap-x-4 mx-6 sticky bottom-10">
                    <div className="flex-1 flex gap-x-4">
                        <img className="size-[4.4rem] cursor-pointer" src="/assets/icons/add-image.svg" alt="" onClick={() => imageRef.current?.click()}/>
                        <input type="file" className="hidden" ref={imageRef} onChange={handleImage}/>
                        <div className="flex bg-[#F6F6F6] w-full rounded-l-full px-5 items-center rounded-r-full overflow-hidden"><input type="text" className="bg-inherit outline-none w-full" placeholder="say something nice"  value={text} onChange={(e) => setText(e.target.value)}
                         onKeyDown={(e) => {if (e.key == 'Enter') {console.log('Enter was pressed')} else return;}}
                         /> <img className="size-[1.6rem] ml-4 cursor-pointer" src="/assets/icons/emoji.svg"  alt="Emoji selector" onClick={() => setOpenEmoji(true)} /> </div>
                    </div>
                    <div className="space-x-4">
                        <button className="bg-black text-white py-4 font-semibold px-4 rounded-full cursor-pointer"
                        onClick={handleSendMessage}
                         >Send</button>
                        {/* <button><img src="/assets/icons/chat-gift.svg" alt="" /></button> */}
                        {/* <button><img src="/assets/icons/mic.svg" alt="" /></button> */}
                    </div>
                </footer>
            </m.div> 
            </>}
    </AnimatePresence>
  )
}

export default SelectedChatTwo