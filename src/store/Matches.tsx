import { create } from 'zustand';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase'; // Adjust the path to your Firebase config
import { Match } from '@/types/likingAndMatching';
import { User } from '@/types/user';
import useDashboardStore from '@/store/useDashboardStore';
import {useAuthStore} from "@/store/UserId.tsx";

interface PopulatedMatchData extends Match {
    matchedUserData: User | null; // Ensure this matches your User type
}

interface MatchStore {
    matches: PopulatedMatchData[];
    loading: boolean;
    fetchMatches: (userId: string) => void; // Method to fetch matches
}

export const useMatchStore = create<MatchStore>((set) => ({
    matches: [],
    loading: true,
    fetchMatches: async (userId: string) => {
        if (!userId) {
            console.error("Invalid userId provided");
            return;
        }


        try {
            set({ loading: true });

            const { setBlockedUsers } = useDashboardStore.getState();
            const { user } = useAuthStore.getState();
            const fetchBlockedUsers = async () => {
                try {
                    if (!user?.uid) {
                        console.error("Invalid userId provided");
                        return;
                    }

                    const userRef = doc(db, "users", user?.uid as string);
                    const userDoc = await getDoc(userRef);
                    const userData = userDoc.exists() ? userDoc.data() : {};
                    const blockedIds = userData.blockedIds || [];
                    setBlockedUsers(blockedIds);
                    return blockedIds;
                } catch (error) {
                    console.error("Error fetching blocked users:", error);
                    return [];
                }
            };

            const blockedUsers = await fetchBlockedUsers();

            // Fetch matches
            const matchesRef = collection(db, 'matches');
            const user1Query = query(matchesRef, where('user1_id', '==', userId));
            const user2Query = query(matchesRef, where('user2_id', '==', userId));

            const [user1Snapshot, user2Snapshot] = await Promise.all([
                getDocs(user1Query),
                getDocs(user2Query),
            ]);

            // Helper to populate user data
            const populateUserData = async (match: Match) => {
                const matchedUserId = match.user1_id === userId ? match.user2_id : match.user1_id;
                const matchedUserDoc = await getDoc(doc(db, 'users', matchedUserId));
                if (!matchedUserDoc.exists()) {
                    return null;
                }
                const matchedUserData = matchedUserDoc.data() as User;
                if (matchedUserData.is_banned) {
                    return null;
                }
                return {
                    ...match,
                    matchedUserData
                };
            };

            const allMatches = await Promise.all([
                ...user1Snapshot.docs.map((doc) => populateUserData(doc.data() as Match)),
                ...user2Snapshot.docs.map((doc) => populateUserData(doc.data() as Match)),
            ]);

            const uniqueMatchIds = new Set<string>();
            const filteredMatches = allMatches.filter((match) => {
                const matchedUserId = match.user1_id === userId ? match.user2_id : match.user1_id;
                if (blockedUsers.includes(matchedUserId)) {
                    return false;
                }
                const matchKey = [match.user1_id, match.user2_id].sort().join('_');
                if (!uniqueMatchIds.has(matchKey)) {
                    uniqueMatchIds.add(matchKey);
                    return true;
                }
                return false;
            });

            set({ matches: filteredMatches as PopulatedMatchData[], loading: false });
        } catch (error) {
            console.error("Error fetching matches:", error);
            set({ loading: false });
        }
    },
}));
