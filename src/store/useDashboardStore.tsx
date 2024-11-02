import { create } from 'zustand';
import { User } from '@/types/user.ts';
import { filterOptions } from '@/constants';

interface DashboardState {
	profiles: User[];
	setProfiles: (profiles: User[]) => void;
	selectedProfile: string | null | undefined;
	setSelectedProfile: (uid: string | null | undefined) => void;
	blockedUsers: string[];
	setBlockedUsers: (blockedUsers: string[]) => void;
	selectedOption: string;
	setSelectedOption: (option: string) => void;
	exploreDataLoading: boolean;
	setExploreDataLoading: (exploreDataLoading: boolean) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
	profiles: [],
	setProfiles: (profiles) => set({ profiles }),

	selectedProfile: null,
	setSelectedProfile: (uid) => set({ selectedProfile: uid }),

	blockedUsers: [],
	setBlockedUsers: (blockedUsers) => set({ blockedUsers }),

	selectedOption: filterOptions[0],
	setSelectedOption: (option) => set({ selectedOption: option }),

	exploreDataLoading: true,
	setExploreDataLoading: (exploreDataLoading) => set({ exploreDataLoading }),
}));

export default useDashboardStore;
