import { FieldValue } from "firebase/firestore";

export type Chat = {
    lastMessage: string;
    lastMessageId: string;
    lastSenderId: string;
    participants: string[];
    status: 'sent' | 'seen';
    isSeenByInitiator: boolean;
    isSeenByReceiver: boolean;
};

export type Messages = {
    id: string;
    message: string | null;
    photo: string | null;
    senderId: string;
    timestamp: FieldValue | { seconds: number, nanoseconds: number };
    status: 'sent' | 'seen'
}