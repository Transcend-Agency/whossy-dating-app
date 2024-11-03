import { FieldValue } from "firebase/firestore";

export type Chat = {
    last_message: string;
    last_message_id: string;
    last_sender_id: string;
    participants: string[];
    status: 'sent' | 'seen';
    is_seen_by_initiator: boolean;
    is_seen_by_receiver: boolean;
    last_message_timestamp: FieldValue | { seconds: number, nanoseconds: number };
};

export type Messages = {
    id: string;
    message: string | null;
    photo: string | null;
    sender_id: string;
    timestamp: FieldValue | { seconds: number, nanoseconds: number };
    status: 'sent' | 'seen'
}