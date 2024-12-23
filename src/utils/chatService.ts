import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import {checkIfUserBlocked} from "@/components/dashboard/SelectedChat.tsx";

export const createOrFetchChat = async ( currentUserId: string,  recipientUserId: string, updateChatId: (id: string) => void): Promise<void> => {
	const newChatId = [currentUserId, recipientUserId].sort().join('_');
	const chatDocRef = doc(db, "chats", newChatId);

	const chatDocSnap = await getDoc(chatDocRef);

	if (!chatDocSnap.exists()) {
		const currentUserBlockedRecipient = await checkIfUserBlocked(currentUserId, recipientUserId);
		const recipientBlockedCurrentUser = await checkIfUserBlocked(recipientUserId, currentUserId);
		const userBlockedStatus = [currentUserBlockedRecipient, recipientBlockedCurrentUser];

		const getExpirationTime = () => {
			const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
			return Timestamp.fromMillis(Date.now() + oneWeekInMs);
		};

		await setDoc(chatDocRef, {
			last_message: null,
			last_message_id: null,
			last_sender_id: null,
			user_blocked: userBlockedStatus,
			participants: [currentUserId, recipientUserId],
			status: 'inactive',
			last_message_timestamp: null,
			unlock_time: Timestamp.now(),
			expiration_time: getExpirationTime(),
			is_unlocked: false,
		});
	}

	updateChatId(newChatId);
};
