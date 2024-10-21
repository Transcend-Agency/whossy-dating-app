import { useState, useEffect } from 'react';
import { db } from '../firebase'; // import your Firebase config
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { Like, PopulatedLikeData } from '../types/likingAndMatching'; // import your Like interface
import { useAuthStore } from '@/store/UserId';
import { User } from '@/types/user';



function useSyncPeopleWhoLikedUser() {
    const { user } = useAuthStore()
    const [peopleWhoLiked, setPeopleWhoLiked] = useState<PopulatedLikeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user?.uid) return;

        // Firestore reference to the "likes" collection
        const likesRef = collection(db, 'likes');

        // Firestore query to filter where `liked_id` matches the current user (people who liked the user)
        const q = query(likesRef, where('liked_id', '==', user.uid));

        const populateLikerData = async (like: Like) => {
            // Fetch the liker's details from the 'users' collection
            const likerDoc = await getDoc(doc(db, 'users', like.liker_id));

            return {
                ...like,
                liker: likerDoc.exists() ? likerDoc.data() : null, // Add liker user data to the like
            } as PopulatedLikeData;
        };

        // Real-time listener that automatically syncs the people who liked the current user
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const likes = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const like = doc.data() as Like;
                    return await populateLikerData(like); // Get liker's details for each like
                })
            );

            setPeopleWhoLiked(likes); // Sync the state with the latest data
            setLoading(false);         // Set loading to false after fetching
        });

        console.log(peopleWhoLiked)

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, [user?.uid]);

    return { peopleWhoLiked, loading };
}

export default useSyncPeopleWhoLikedUser;
