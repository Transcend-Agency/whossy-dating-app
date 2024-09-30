import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path to your Firebase config
import { Match } from '@/types/likingAndMatching';

const useSyncUserMatches = (userId: string) => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        if (!userId) return;

        const matchesRef = collection(db, 'matches');

        // Query 1: where user1_id matches the current user
        const user1Query = query(matchesRef, where('user1_id', '==', userId));

        // Query 2: where user2_id matches the current user
        const user2Query = query(matchesRef, where('user2_id', '==', userId));

        let isFirstSnapshot = true; // To track the first snapshot for both queries

        const populateUserData = async (match: Match) => {
            // Fetch user1 and user2 details from the 'users' collection
            const user1Doc = await getDoc(doc(db, 'users', match.user1_id));
            const user2Doc = await getDoc(doc(db, 'users', match.user2_id));

            return {
                ...match,
                user1: user1Doc.exists() ? user1Doc.data() : null,
                user2: user2Doc.exists() ? user2Doc.data() : null,
            };
        };

        // Listen to both queries and merge the results
        const unsubscribeUser1 = onSnapshot(user1Query, (snapshot) => {
            const user1Matches: Match[] = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setMatches((prevMatches) => [...prevMatches, ...user1Matches]);

            // If both queries have fetched for the first time, set loading to false
            if (isFirstSnapshot) {
                setLoading(false);
                isFirstSnapshot = false;
            }
        });

        const unsubscribeUser2 = onSnapshot(user2Query, (snapshot) => {
            const user2Matches: Match[] = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setMatches((prevMatches) => [...prevMatches, ...user2Matches]);

            // If both queries have fetched for the first time, set loading to false
            if (isFirstSnapshot) {
                setLoading(false);
                isFirstSnapshot = false;
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