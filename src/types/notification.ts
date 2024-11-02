import { Timestamp } from "firebase/firestore";

export type Notifications = {
    id: string;
    likedId: string;
    likerId: string;
    likerName: string;
    likerProfilePicture: string;
    seen: boolean;
    timestamp: Timestamp;
    title: string;
}