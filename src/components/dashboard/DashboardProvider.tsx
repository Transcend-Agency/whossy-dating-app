import React, {createContext, useState, ReactNode} from 'react';
import {User} from "@/types/user.ts";
import {filterOptions} from "@/constants";

export interface DashboardContextType {
	profiles: User[]
	setProfiles: (profiles: User[]) => void
	selectedProfile?: string | null;
	setSelectedProfile: (uid: string | null) => void;
	blockedUsers: string[]
	setBlockedUsers: (blockedUsers: string[]) => void;
	selectedOption: string;
	setSelectedOption: (option: string) => void;
	exploreDataLoading: boolean
	setExploreDataLoading: (exploreDataLoading: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{children: ReactNode}> = ({ children }) => {
	const [selectedProfile, setSelectedProfile] = useState<string | null | undefined>(null);
	const [ profiles, setProfiles ] = useState<User[]>([]);
	const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
	const [selectedOption, setSelectedOption] = useState(filterOptions[0])
	const [exploreDataLoading, setExploreDataLoading] = useState(true);

	return (
		<DashboardContext.Provider value={{ selectedProfile, setSelectedProfile, profiles, setProfiles, blockedUsers, setBlockedUsers, selectedOption, setSelectedOption, exploreDataLoading, setExploreDataLoading  }}>
			{children}
		</DashboardContext.Provider>
	);
};