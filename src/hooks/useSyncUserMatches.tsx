import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase'; // Adjust the path to your Firebase config
import { Match } from '@/types/likingAndMatching';
import { User } from '@/types/user';

interface PopulatedMatchData extends Match {
    matchedUserData: User; // Adjust this type to match your user data
}

const useSyncUserMatches = (userId: string) => {
    const [matches, setMatches] = useState<PopulatedMatchData[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        if (!userId) return;

        const matchesRef = collection(db, 'matches');

        // Query 1: where user1_id matches the current user
        const user1Query = query(matchesRef, where('user1_id', '==', userId));

        // Query 2: where user2_id matches the current user
        const user2Query = query(matchesRef, where('user2_id', '==', userId));

        let user1QueryFetched = false;
        let user2QueryFetched = false;

        const uniqueMatchIds = new Set<string>();

        const populateUserData = async (match: Match) => {
            const matchedUserId = match.user1_id === userId ? match.user2_id : match.user1_id;
            const matchedUserDoc = await getDoc(doc(db, 'users', matchedUserId));

            return {
                ...match,
                matchedUserData: matchedUserDoc.exists() ? matchedUserDoc.data() : null,
            };
        };

        const updateMatches = (newMatches: PopulatedMatchData[]) => {
            const filteredMatches = newMatches.filter((match) => {
                // Create a unique key by combining user1_id and user2_id
                const matchKey = [match.user1_id, match.user2_id].sort().join('_');
                
                // Check if the combination of user1_id and user2_id is already in the Set
                if (!uniqueMatchIds.has(matchKey)) {
                    uniqueMatchIds.add(matchKey); // Add the unique match to the Set
                    return true; // Include the match in the results
                }
                return false; // Exclude duplicate matches
            });

            // Update state with filtered matches
            setMatches(filteredMatches);
        };

        // Listen to both queries and merge the results
        const unsubscribeUser1 = onSnapshot(user1Query, async (snapshot) => {
            const user1Matches = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const match = doc.data() as Match;
                    return await populateUserData(match);
                })
            ) as PopulatedMatchData[];
            updateMatches(user1Matches);
            user1QueryFetched = true;

            // If both queries have fetched for the first time, set loading to false
            if (user1QueryFetched && user2QueryFetched) {
                setLoading(false);
            }

        });

        const unsubscribeUser2 = onSnapshot(user2Query, async (snapshot) => {
            const user2Matches = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const match = doc.data() as Match;
                    return await populateUserData(match);
                })
            ) as PopulatedMatchData[]  ;
            updateMatches(user2Matches);
            user2QueryFetched = true;
            // If both queries have fetched for the first time, set loading to false
            if (user1QueryFetched && user2QueryFetched) {
                setLoading(false);
            }
        });

        // Cleanup both subscriptions when the component unmounts
        return () => {
            unsubscribeUser1();
            unsubscribeUser2();
        };
    }, [userId]);

    return { matches, loading }; // Return both matches and loading state
};

export default useSyncUserMatches;