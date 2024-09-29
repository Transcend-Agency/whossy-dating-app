export type Chat = {
    lastMessage: string;
    participants: string[];
    isSeenByInitiator: boolean;
    isSeenByReceiver: boolean;
};

export type Messages = {
    id: string;
    message: string;
    photo: string | null;
    senderId: string;
    timestamp: string;
}