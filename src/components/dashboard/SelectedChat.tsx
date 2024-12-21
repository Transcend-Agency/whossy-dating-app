import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, motion as m} from "framer-motion";
import Skeleton from "react-loading-skeleton";
import EmojiPicker from "emoji-picker-react";
import {IoCheckmarkDone} from "react-icons/io5";
import {
    arrayRemove, arrayUnion,
    collection,
    doc,
    FieldValue,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    updateDoc
} from "firebase/firestore";
import {db} from "@/firebase";
import {v4 as uuidv4} from "uuid";
import upload from "@/hooks/upload";
import {getUserProfile} from "@/hooks/useUser.ts";
import {formatFirebaseTimestampToTime, formatServerTimeStamps} from "@/constants";
import {useChatIdStore} from "@/store/ChatStore";
import {Chat, Messages} from "@/types/chat";
import {User} from "@/types/user";
import toast from "react-hot-toast";
import {useLocation} from "react-router-dom";
import {useMatchStore} from "@/store/Matches.tsx";
import ReportModal from "@/components/dashboard/ReportModal.tsx";

interface SelectedChatProps {
    activePage: string
    closePage: () => void
    updateChatId: (newChatId: string) => void;
    currentUser: User;
    chatUnlocked: boolean;
    unlockTime: FieldValue | { seconds: number, nanoseconds: number };
    expirationTime: FieldValue | { seconds: number, nanoseconds: number };
}

const SelectedChat: FC<SelectedChatProps> = ({activePage,closePage,updateChatId,currentUser}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>('');
    const [chatModalOpen, setChatModalOpen] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [recipientUser, setRecipientUser] = useState<User>();
    const [currentChat, setCurrentChat] = useState<Chat>();
    const [isBlocked, setIsBlocked] = useState<boolean>(false)
    const [isBlockLoading, setIsBlockLoading] = useState<boolean>(false)
    const [chatUnlocked, setChatUnlocked] = useState<boolean>();
    const [readReceipt, setReadReceipt] = useState<boolean>(false);
    const [readReceiptDisabledAt, setReadReceiptDisabledAt] = useState<Date | null>(null);
    const [openEmoji, setOpenEmoji] = useState(false);
    const [chats, setChats] = useState<Messages[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [recipientDetails, setRecipientDetails] = useState<{
        name: string | null,
        profilePicture: string | null,
        status: {online: boolean, lastSeen: number} | null,
        user_settings: {online_status: boolean} | null }
    >({ name: null, profilePicture: null, status: null, user_settings: null });
    const [image, setImage] = useState<{ file: File | null, url: string | null }>({ file: null, url: null});

    const imageRef = useRef<HTMLInputElement | null>(null);
    // @ts-ignore
    const dropdownRef = useRef<HTMLDivElement>(null);
    // @ts-ignore
    const endRef = useRef<HTMLDivElement>(null);
    const { chatId, setChatId } = useChatIdStore();
    const { fetchMatches } = useMatchStore()

    //getting recipient user's name and profile picture from query params
    const queryParams = new URLSearchParams(location.search);
    const recipientUserId = queryParams.get('recipient-user-id');

    const location2 = useLocation();
    const state = location2.state as { chatId: string; recipientUser: User };

// Initialize chatId from state
    useEffect(() => {
        if (state?.chatId) {
            setChatId(state.chatId);
        }
    }, [state]);

    useEffect(() => { if (endRef.current) { endRef.current.scrollIntoView({ behavior: 'auto' }); } }, [chats])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {setOpenEmoji(false)}
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => { document.removeEventListener("mousedown", handleClickOutside) }
    }, []);

    useEffect(() => {
        let isMounted = true;
        setLoading(true)

        console.log("Recipient User ID", recipientUserId);

        const getUserDetails = async () => {
            setIsLoading(true);
            try {
                const docRef = doc(db, "users", recipientUserId as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && isMounted) {
                    const data = docSnap.data();
                    console.log("Fetched User Data:", data);
                    setRecipientUser(data as User);
                    setRecipientDetails({
                        name: data?.first_name || null,
                        profilePicture: (data?.photos && Array.isArray(data.photos) && data.photos.length > 0) ? data.photos[0] : null,
                        status: { online: data?.status?.online, lastSeen: data?.status?.lastSeen },
                        user_settings: { online_status: data?.user_settings?.online_status },
                    });
                } else if (isMounted) {
                    console.log('No such document found');
                }
            } catch (error) {
                console.log("Error getting document:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };


        if (recipientUserId) {
            updateChatDocument().catch(e => console.error(e))
            getUserDetails().then(
                    () => fetchRecipientUserData().then(
                        () => handleReadReceipts().then(
                            () => setLoading(false)).catch(e => console.error(e))
                    ).catch(e => console.error(e))
            ).catch(e => console.error(e))
        }

        return () => {
            isMounted = false;
        };
    }, [recipientUserId]);

    useEffect(() => {
        console.log("Recipient User Updated:", recipientUser);
    }, [recipientUser]);

    useEffect(() => {
        console.log("Recipient Details Updated:", recipientDetails);
    }, [recipientDetails]);

    const fetchRecipientUserData = async () => {
        console.log("Chat ID:", chatId);
        console.log("Recipient User before fetching:", recipientUser);
        try {
            const data = await getUserProfile("users", chatId.split('_')[1] as string);
            console.log("Fetched data:", data);
            if (data) {
                setRecipientUser(data); // State update is asynchronous
            }
        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    };

    useEffect(() => {
        if (!chatId || !currentUser.uid || activePage !== "selected-chat") return;
        const messagesRef = query(collection(db, `chats/${chatId}/messages`), orderBy("timestamp", "asc"));
        const chatDocRef = doc(db, "chats", chatId as string);

        // Listen to changes in the chat messages
        const unSub = onSnapshot(messagesRef, async (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Messages[];

            setChats(messages);

            // Fetch the chat document (used to get lastSenderId)
            const chatDocSnap = await getDoc(chatDocRef);
            if (chatDocSnap.exists()) {
                const chatData: Chat = chatDocSnap.data() as Chat;
                const last_sender_id = chatData.last_sender_id;
                setChatUnlocked(chatData.is_unlocked)

                // Check if the current user is not the last sender and the chat is open
                if (last_sender_id !== currentUser.uid && chatData.status !== "seen" && activePage === "selected-chat") {
                    // Update the seen status in 'chats' collection
                    await updateDoc(chatDocRef, 'status', 'seen')
                        .then(() => console.log(`${last_sender_id}: ${currentUser.uid}`))
                        .catch((err) => console.error(`Error updating chat ${chatId}:`, err));
                }
            }

            // Check each message to see if it should be marked as 'seen'
            for (const doc1 of snapshot.docs) {
                const messageData = doc1.data();
                const messageSenderId = messageData.sender_id;

                // Only update the message if the sender is not the current user and status is not 'seen'
                if (messageSenderId !== currentUser.uid && messageData.status !== "seen" && activePage === "selected-chat") {
                    try {
                        // Update the status field of the message to "seen"
                        await updateDoc(doc1.ref, 'status', "seen" );
                        console.log(`Message ${doc1.id} marked as seen`);
                    } catch (err) {
                        console.error(`Error updating message ${doc1.id}:`, err);
                    }
                }
            }
        }, (err) => console.log(err));

        // Cleanup function to unsubscribe from the snapshot listener
        return () => {
            unSub();
            // Reset only if leaving the dashboard
            if (!window.location.pathname.includes("/dashboard/chat")) {
                setChats([]);
                debounceUpdateChatId("nil");
            }
        };


    }, [activePage, chatId]);

    // useEffect(() => {
        const updateChatDocument = async () => {
            const currentUserBlockedRecipient = await checkIfUserBlocked(currentUser.uid as string, recipientUserId as string);
            const recipientBlockedCurrentUser = await checkIfUserBlocked(recipientUserId as string, currentUser.uid as string);
            const userBlockedStatus: boolean[] = [currentUserBlockedRecipient, recipientBlockedCurrentUser];

            try {
                const chatRef = doc(db, "chats", chatId);
                await updateDoc(chatRef, { user_blocked: userBlockedStatus } as Partial<Chat>)
                    .then(() => {
                        console.log("Chat document updated!");
                    })
                    .catch((error) => {
                        console.error("Error updating chat document:", error);});

                const chatDocRef = doc(db, "chats", chatId);
                const chatDocSnap = await getDoc(chatDocRef);

                if (chatDocSnap.exists()) {
                    const chatData = chatDocSnap.data() as Chat;
                    setCurrentChat(chatData);
                    setIsBlocked(currentUserBlockedRecipient)
                } else {
                    console.warn("Chat document does not exist.");
                }
                updateChatId(chatId);
            } catch (error) {
                console.error("Error updating or fetching chat:", error);
            }
        };
    //     updateChatDocument().catch(e => console.error(e));
    // }, [recipientUserId]);

    const debounceUpdateChatId = (id: string) => {
        setTimeout(() => {
            updateChatId(id);
        }, 100); // Adjust the delay as needed
    };


    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setImage({
                file: file,
                url: URL.createObjectURL(file),
            });
        }
    };

    const unlockChat = async (chatId: string): Promise<void> => {
        const chatRef = doc(db, "chats", chatId);
        const userRef = doc(db, "users", currentUser.uid as string)

        const expirationTime = Timestamp.fromDate(
            new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        );

        if(currentUser?.credits < 30)
            toast.error("Insufficient credit to unlock chat");
        else {
            const newCredit: number = currentUser?.credits - 30;
            try {
                await updateDoc(chatRef, {
                    is_unlocked: true,
                    unlock_time: serverTimestamp(),
                    expiration_time: expirationTime,
                });
                setChatUnlocked(true)
                console.log("Chat unlocked successfully!");
            } catch (error) {
                console.error("Error unlocking chat:", error);
            }

            try {await updateDoc(userRef, 'credit', newCredit)}
            catch (err) { console.error("Error updating credit balance")}
        }
    };

    const isChatUnlocked = async (chatId: string): Promise<boolean> => {
        try {
            const chatRef = doc(db, "chats", chatId);
            const chatSnapshot = await getDoc(chatRef);
            if (!chatSnapshot.exists()) {
                console.error("Chat document does not exist.");
                return false;
            }

            const chatData = chatSnapshot.data() as Chat;
            const isUnlocked = chatData.is_unlocked;
            const expirationTime = chatData.expiration_time as Timestamp;

            if (!isUnlocked || !expirationTime) return false;

            const currentTime = Date.now();
            const expirationTimeMs = expirationTime.seconds * 1000;

            return currentTime < expirationTimeMs;
        } catch (error) {
            console.error("Error fetching chat data:", error);
            return false;
        }
    };

    const checkIfUserBlocked = async (userId: string, targetUserId: string): Promise<boolean> => {
        try {
            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
                const data = userDoc.data() as User
                const blockedList: string[] = data.blockedIds || [];

                console.log("Blocked List and data: ", blockedList, data)
                return blockedList.includes(targetUserId);
            }
        } catch (error) {
            console.error(`Error checking block status between ${userId} and ${targetUserId}:`, error);
        }
        return false;
    };

    //sending text message to the recipient
    const handleSendMessage = async () => {
        const chats = await getDocs(collection(db, "chats"));
        const recipientsId: string[] = [];
        let imgUrl: string | null = null;

        if(!await isChatUnlocked(chatId) && !currentUser.is_premium){
            toast.error("Chat Unlock Duration Expired")
            setChatUnlocked(false)
            closePage()
            return;
        }

        chats.forEach((doc) => {
            const result = doc.id;
            recipientsId.push(result);
        });

        // Generate the messageId and timestamp upfront
        const messageId = uuidv4();
        const temporaryTimestamp = {
            seconds: Math.floor(Date.now() / 1000),
            nanoseconds: 0
        };

        // Create optimistic message object with a placeholder for image if it's being uploaded
        const optimisticMessage: Messages = {
            id: messageId,
            sender_id: currentUser?.uid as string,
            message: text !== '' ? text : null,
            photo: image.file ? 'loading_image_placeholder' : null, // Placeholder for image
            timestamp: temporaryTimestamp,
            status: 'sent',
        };

        // Optimistically add the message to the chat array
        setChats(prevChats => [...prevChats, optimisticMessage]);

        // Clear input fields
        setText('');
        setImage({ file: null, url: null });

        try {
            if (image.file) {
                // Upload the image and get the URL
                imgUrl = await upload(image.file);

                // Update the chat array with the real image URL after the upload is done
                setChats(prevChats => prevChats.map(chat =>
                    chat.id === messageId ? { ...chat, photo: imgUrl } : chat
                ));
            }

            // Check if chat exists and send message to Firebase
            const existingChat = recipientsId.some((id) => id.includes(recipientUserId as string) && id.includes(currentUser.uid as string));
            let chatToUpdateId = chatId as string;

            const getExpirationTime = () => {
                const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
                return Timestamp.fromMillis(Date.now() + oneWeekInMs);
            };

            if (!existingChat) {
                const newChatId = `${currentUser.uid}_${recipientUserId}`;
                chatToUpdateId = newChatId;

                const currentUserBlockedRecipient = await checkIfUserBlocked(currentUser.uid as string, recipientUserId as string);
                const recipientBlockedCurrentUser = await checkIfUserBlocked(recipientUserId as string, currentUser.uid as string);
                const userBlockedStatus = [currentUserBlockedRecipient, recipientBlockedCurrentUser];

                try {
                    // Create the chat document
                    await setDoc(
                        doc(db, "chats", newChatId),
                        {
                            last_message: text || 'Sent a photo',
                            last_message_id: messageId,
                            last_sender_id: currentUser.uid,
                            user_blocked: userBlockedStatus,
                            participants: [currentUser.uid, recipientUserId],
                            status: 'sent',
                            last_message_timestamp: serverTimestamp(),
                            unlock_time: serverTimestamp(),
                            expiration_time: getExpirationTime(),
                            is_unlocked: false
                        }
                    );

                    // Fetch the newly created chat document
                    const chatDocRef = doc(db, "chats", newChatId);
                    const chatDocSnap = await getDoc(chatDocRef);

                    if (chatDocSnap.exists()) {
                        const chatData = chatDocSnap.data() as Chat;
                        setCurrentChat(chatData); // Assign the fetched chat data to the state
                    } else {
                        console.warn("Chat document does not exist after creation.");
                    }

                    updateChatId(newChatId); // Update the chat ID if necessary
                } catch (error) {
                    console.error("Error creating and fetching chat:", error);
                }
            }

            // Send the message to Firebase
            const messageRef = doc(db, `chats/${chatToUpdateId}/messages`, messageId);
            await setDoc(messageRef, {
                id: messageId,
                sender_id: currentUser.uid,
                message: text !== '' ? text : null,
                photo: imgUrl ?? null,
                timestamp: serverTimestamp(),
                status: "sent"
            });

            // Update chat with last message
            await updateDoc(doc(db, "chats", chatToUpdateId), {
                last_message: text || 'Image',
                last_message_id: messageId,
                last_sender_id: currentUser.uid,
                status: "sent",
                last_message_timestamp: serverTimestamp(),
            });

        } catch (err) {
            console.error('Error sending message:', err);
            // Remove the optimistic message if there was an error
            setChats(prevChats => prevChats.filter(chat => chat.id !== optimisticMessage.id));
        }
    };

    const determineReadReceipt = async () => {
        try {
            if (!chatUnlocked) {
                console.log("Chat is locked. Read receipts are unavailable.");
                return false;
            }

            if (!recipientUser || !currentUser) {
                console.log("Could not fetch both user details.");
                return null;
            }

            const userReadReceipts = currentUser.user_settings?.read_receipts || false;
            const recipientReadReceipts = recipientUser.user_settings?.read_receipts || false;

            if (!userReadReceipts || !recipientReadReceipts) {
                setReadReceiptDisabledAt(new Date());
            }

            return userReadReceipts && recipientReadReceipts;
        } catch (error) {
            console.error("Error determining read receipts:", error);
            throw error;
        }
    };

    const handleReadReceipts = async () => {
        try {
            const readReceiptsEnabled = await determineReadReceipt() as boolean;
            setReadReceipt(readReceiptsEnabled);

            if (readReceiptsEnabled) {
                setReadReceiptDisabledAt(null);
            }
        } catch (error) {
            console.error("Error handling read receipts:", error);
        }
    };

    const handleBlock = async (recipientId: string, isBlocked: boolean) => {
        setIsBlockLoading(true)
        if (!recipientId)
            toast.error("Unable to block user")
        else {
            try {
                const userRef = doc(db, "users", currentUser?.uid as string);

                if (isBlocked) {
                    await updateDoc(userRef, {
                        blockedIds: arrayRemove(recipientId)
                    });
                } else {
                    await updateDoc(userRef, {
                        blockedIds: arrayUnion(recipientId)
                    });
                }

                toast.success(`${recipientDetails.name} has been ${isBlocked ? "unblocked" : "blocked"} successfully.`);
                setIsBlocked(!isBlocked);
                setIsBlockLoading(false)
                updateChatDocument().then(
                    () => { fetchMatches(currentUser?.uid as string);}
                ).catch(e => console.error(e))
            } catch (error) {
                console.error("Error blocking/unblocking user:", error);
                toast.error("Could not block/unblock the user. Please try again.");
                setIsBlockLoading(false)
            }
        }
    };

    if (chatId === "nil") {
        return <p>Loading chat...</p>;
    }

    return (
        <AnimatePresence>
            <ReportModal key={'report-modal'} userData={recipientUser} show={openModal} onCloseModal={() => setOpenModal(false)} />
            {activePage === 'selected-chat' &&
                <>
                    <m.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.25 }} className='relative z-10 bg-white flex flex-col min-h-full'>
                      <>
                        <header className=" text-[1.8rem] py-[1.6rem] px-[2.4rem] flex justify-between items-center" style={{ borderBottom: '1px solid #F6F6F6' }}>
                            <button className="settings-page__title__left gap-x-1" onClick={closePage}>
                                <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" alt={``}/>
                                { !isLoading ? recipientDetails.profilePicture ?
                                        <img className='size-[4.8rem] mr-2 object-cover rounded-full' src={recipientDetails.profilePicture} alt="profile picture"/> :
                                        <div className="rounded-full size-[4.8rem] bg-[#D3D3D3] flex justify-center items-center font-semibold mr-2">
                                            {recipientDetails.name?.charAt(0)}
                                        </div> : <Skeleton width="4.8rem" height="4.8rem" circle/> }
                                <div className="space-y-1">
                                    {recipientDetails.name ? ( <p className="font-bold text-left">{recipientDetails.name}</p> ) : ( <Skeleton width="8rem" height="1.6rem"/>)}
                                    {recipientUser?.user_settings?.online_status ? (
                                        recipientUser.status?.online ? (
                                            <p className="text-[#8A8A8E] text-left font-normal font-sans italic text-[1.5rem]">online</p>
                                        ) : (
                                            <p className="text-[#8A8A8E] font-normal italic text-[1.5rem]">
                                                {recipientUser.status?.lastSeen
                                                    ? `last seen ${formatServerTimeStamps(recipientUser.status?.lastSeen as number)}`
                                                    : !isLoading
                                                        ? "last seen recently"
                                                        : <Skeleton width="10rem" height="1.2rem"/>}
                                            </p>
                                        )
                                    ) : (
                                        <p className="text-[#8A8A8E] font-normal italic text-[1.5rem]">
                                            {!isLoading ? "last seen recently" :
                                                <Skeleton width="10rem" height="1.2rem"/>}
                                        </p>
                                    )}
                                </div>

                            </button>
                            <button className="cursor-pointer" onClick={() => setChatModalOpen(!chatModalOpen)}>
                                <img src="/assets/icons/three-dots.svg" alt=""/>
                                <div className={`absolute ${!chatModalOpen ? 'hidden' : "block"} z-[100] whitespace-nowrap bg-[#F4F4F4] w-[130px] text-center p-6 rounded-md leading-6 right-8 top-[60px] grid items-center gap-4`}>
                                    <button onClick={(e) => {e.preventDefault(); handleBlock(recipientUser?.uid as string, isBlocked).catch(e => console.error(e))} } className={`border-b-[0.1px] border-opacity-30 border-black border-solid pb-4`}>{isBlocked ? 'Unblock' : 'Block'} User</button>
                                    <button onClick={(e) => {e.preventDefault(); setOpenModal(true) }} className={``}>Report User</button>
                                </div>
                            </button>
                        </header>
                          <section className="text-[1.6rem] text-[#121212] flex-1 px-8 flex flex-col overflow-y-scroll pb-20 no-scrollbar">
                              <section className="messages flex flex-col gap-y-6 h-[calc(100vh-32.4rem)] overflow-y-scroll no-scrollbar relative">
                                {chats && Array.isArray(chats) && chats?.map((message: Messages, i: number) =>
                                    <div className={`max-w-[70%] flex ${message.sender_id === currentUser?.uid ? " flex-col self-end our_message" : ' gap-x-2 items-start flex-col their_message'}`} key={i}>
                                        {!chatUnlocked && currentUser.is_premium != true && (
                                            <div className="overlay backdrop-blur-sm absolute inset-0 rounded-md bg-black/25 flex items-center pt-[24px] justify-center z-50">
                                                <div className={`grid p-4 items-center text-[2rem] bg-[#ff1f1] text-white rounded-md font-bold mx-[50px] w-[300px] text-center gap-8`}>
                                                    <img className={`size-[50px] mx-auto`} src="/assets/icons/no-message.svg" alt={``} />
                                                    <p>Chat has not been unlocked 🔒</p>
                                                    <p>Unlock this chat for both of you to connect 😍</p>
                                                    <p>30 Credit is required to unlock chat</p>
                                                    <p className={`whitespace-nowrap`}>Credit Balance: {`${currentUser?.credits || 0}`} credits</p>
                                                    <div className={`flex justify-center gap-4 items-center`}>
                                                        <button onClick={(e) => {
                                                            e.preventDefault();
                                                            unlockChat(chatId)
                                                                .then(() => console.log("Chat Unlocked")).catch(e => console.error("Error Unlocking chat", e))
                                                        }} className={`border p-3 bg-green-700 hover:bg-green-800 active:scale-95 rounded-md px-2 w-[140px]`}>Use Credits</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            {message.photo && message.photo !== 'loading_image_placeholder' ?
                                                <img className='mr-2 max-h-[30rem] w-full object-contain ' src={message.photo as string} alt="profile picture" /> : message.photo === 'loading_image_placeholder' && <Skeleton width="30rem" height="30rem" /> }

                                            {message.message && <p className={`${message.sender_id === currentUser?.uid ? 'bg-[#E5F2FF]  self-end' : 'bg-[#f6f6f6]'} py-[1.6rem] px-[1.2rem] mt-4 w-fit`} style={{ borderTopLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem', borderBottomLeftRadius: message.sender_id === currentUser?.uid ? '1.2rem' : '0.4rem', borderBottomRightRadius: message.sender_id === currentUser?.uid ? '0.4rem' : '1.2rem' }}>{message.message}</p>}
                                        </div>
                                        <p className="flex justify-end mt-2 text-[#cfcfcf]">
                                            {message.sender_id === currentUser?.uid && (
                                                <IoCheckmarkDone
                                                    color={!readReceipt
                                                        ? "#cfcfcf" : (readReceiptDisabledAt && !(message.timestamp instanceof FieldValue) &&
                                                        new Date(message.timestamp.seconds * 1000) < readReceiptDisabledAt)
                                                        ? "#cfcfcf" : message.status === "seen" ? "#2747d8" : "#cfcfcf"
                                                    }
                                                />)}
                                            <span>
                                              {message.timestamp &&
                                                formatFirebaseTimestampToTime(message.timestamp as { seconds: number, nanoseconds: number })}
                                            </span>
                                        </p>
                                    </div>)
                                }
                                <div ref={endRef} />
                            </section>
                        </section>
                        <AnimatePresence>
                            {openEmoji && <m.div initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }} transition={{ duration: 0.3, ease: "easeInOut" }} ref={dropdownRef} className="absolute bottom-32 right-8 "><EmojiPicker onEmojiClick={(e) => { if (!(chatUnlocked || currentUser?.is_premium)) return; setText((prev) => prev + e.emoji) } } /> </m.div>}</AnimatePresence>
                        {/*{loading &&*/}
                        {/*    <div className={`flex justify-between text-[1.6rem] bg-white items-center gap-x-4 mx-6 sticky bottom-10`}>*/}
                        {/*        <p>Loading...</p>*/}
                        {/*    </div>*/}
                        {/*}*/}
                        {!currentChat?.user_blocked[0] || isLoading ? <footer className="flex justify-between text-[1.6rem] bg-white items-center gap-x-4 mx-6 sticky bottom-10">
                            <div className="flex-1 flex gap-x-4">
                                <img className="size-[4.4rem] cursor-pointer" src="/assets/icons/add-image.svg" alt="" onClick={() => imageRef.current?.click()} />
                                <input type="file" className="hidden" ref={imageRef} onChange={handleImage} accept="image/*" />
                                <div className="flex bg-[#F6F6F6] w-full rounded-l-full px-5 items-center rounded-r-full overflow-hidden">
                                    <input disabled={!(chatUnlocked || currentUser?.is_premium)}
                                           type="text" className="bg-inherit outline-none w-full" placeholder="say something nice"
                                           value={image.url ? "" : text}
                                           onChange={(e) => setText(e.target.value) }
                                           onKeyDown={(e) => { if (e.key == 'Enter') { handleSendMessage().catch(e => console.error("Unable to send message", e)) } else return; }}/>
                                    <img className="size-[1.6rem] ml-4 cursor-pointer" src="/assets/icons/emoji.svg" alt="Emoji selector"
                                         onClick={() => setOpenEmoji(true)} />
                                </div>
                            </div>
                            <div className="space-x-4">
                                <button className={`bg-black text-white py-4 font-semibold px-4 rounded-full ${text === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={handleSendMessage}
                                    disabled={text === ''}
                                >Send</button>
                            </div>
                        </footer> :
                            <footer className={`grid text-[1.6rem] bg-white items-center gap-x-4 mx-6 sticky bottom-5 border border-black`}>
                                <div className={`text-center border-b-[0.1px] border-opacity-30 border-black border-solid pb-[1rem]`}>
                                    <p>You can't message <span className={`font-medium`}>{recipientDetails.name}</span>.</p>
                                </div>
                                {isBlockLoading ?
                                    <div className={`action-button grid place-items-center pt-2 items-center w-full`}>
                                        <motion.img key="loading-image" className='button__loader'
                                                    src='/assets/icons/loader-black.gif'/>
                                    </div> :
                                    <button className={`text-red border-[1px] border-black pt-2 font-bold text-2xl`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleBlock(recipientUser?.uid as string, isBlocked).catch(e => console.error(e))
                                            }}>Unblock Account
                                    </button>
                                }
                            </footer>}
                      </>
                    </m.div>
                </>}
        </AnimatePresence>
    )
}

export default SelectedChat