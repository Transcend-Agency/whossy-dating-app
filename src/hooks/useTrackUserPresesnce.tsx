import { useEffect } from 'react';
import { ref, onDisconnect, set } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { useAuthStore } from '@/store/UserId';
import { serverTimestamp } from 'firebase/firestore';

const useTrackUserPresence = () => {
    const { user } = useAuthStore()
    useEffect(() => {
        if (!user?.uid) return

        const presenceRef = ref(realtimeDb, `users/${user?.uid}/presence`);


        // Set the user's presence status to online
        set(presenceRef, { online: true, lastSeen: serverTimestamp() });

        // Handle disconnect
        const disconnectedRef = onDisconnect(presenceRef);
        disconnectedRef.set({ online: false, lastSeen: serverTimestamp() });

        // Cleanup
        return () => {
            disconnectedRef.cancel();
        };
    }, [user?.uid]);
};

export default useTrackUserPresence;