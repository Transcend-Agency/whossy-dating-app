import { Match } from '@/types/likingAndMatching';
import { User } from '@/types/user';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '@/firebase';
import useDashboardStore from "@/store/useDashboardStore.tsx"

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

        const { blockedUsers } = useDashboardStore.getState();

        if (!userId) return;

        const matchesRef = collection(db, 'matches');
        const user1Query = query(matchesRef, where('user1_id', '==', userId));
        const user2Query = query(matchesRef, where('user2_id', '==', userId));

        const uniqueMatchIds = new Set<string>();

        const populateUserData = async (match: Match) => {
            const matchedUserId = match.user1_id === userId ? match.user2_id : match.user1_id;
            const matchedUserDoc = await getDoc(doc(db, 'users', matchedUserId));
            return {
                ...match,
                matchedUserData: matchedUserDoc.exists() ? matchedUserDoc.data() : null,
            };
        };

        // Fetch both queries
        const [user1Snapshot, user2Snapshot] = await Promise.all([
            getDocs(user1Query), // This is the correct method for one-time fetch
            getDocs(user2Query), // This is the correct method for one-time fetch
        ]);

        const allMatches = await Promise.all([
            ...user1Snapshot.docs.map((doc) => populateUserData(doc.data() as Match)),
            ...user2Snapshot.docs.map((doc) => populateUserData(doc.data() as Match)),
        ]);

        const filteredMatches = allMatches.filter((match) => {
            // Check if either user in the match is in the blockedUsers list
            if (blockedUsers.includes(match.user1_id) || blockedUsers.includes(match.user2_id)) {
                return false; // Exclude this match if either user is blocked
            }

            // Create a unique key to prevent duplicate matches
            const matchKey = [match.user1_id, match.user2_id].sort().join('_');
            if (!uniqueMatchIds.has(matchKey)) {
                uniqueMatchIds.add(matchKey);
                return true; // Include this match
            }
            return false; // Exclude this match as it's a duplicate
        });

        set({ matches: filteredMatches as PopulatedMatchData[], loading: false });
    },
}));
