import {useCallback} from "react";
import {collection, doc, getDoc, getDocs, query, Timestamp, where} from "firebase/firestore";
import {db} from "@/firebase";
import {User, UserFilters, UserProfile} from "@/types/user.ts";
import useDashboardStore from "@/store/useDashboardStore.tsx";
import {useAuthStore} from "@/store/UserId.tsx";

function useProfileFetcher() {
	const { user } = useAuthStore()
	const { blockedUsers, setBlockedUsers, setProfiles , selectedOption, setExploreDataLoading } = useDashboardStore()

	const fetchBlockedUsers = useCallback(async () => {
		if (!user?.uid) return [];
		try {
			const userRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userRef);
			const userData = userDoc.exists() ? userDoc.data() : {};
			const blockedIds = userData.blockedIds || []
			setBlockedUsers(blockedIds);
			return blockedIds;
		} catch (error) {
			console.error("Error fetching blocked users:", error);
			return [];
		}
	}, [user?.uid]);

	const filterBlockedAndCurrentUser = (userData: User[], blockedUsers: string[]) => {
		return userData.filter(u => !blockedUsers.includes(u.uid as string) && u.uid !== user?.uid);
	};

	const fetchBlockedAndFilteredProfiles = async (queryParam: any) => {
		try {
			setExploreDataLoading(true);
			let data
			if (!user?.uid) return [];
			const userRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userRef);
			const userInfo = userDoc.exists() ? userDoc.data() : {};
			const userInterest = userInfo.interests || []

			const usersCollection = collection(db, "users");
			const interestsFilter: boolean = userInterest && userInterest.length > 0;

			let querySnapshot = await getDocs(queryParam);
			let userData = querySnapshot.docs.map(doc => doc.data() as User);

			if (selectedOption === "Similar interest" && interestsFilter) {
				const currentUserInterests2 = userInterest || [];
				querySnapshot = await getDocs(query(usersCollection, where("has_completed_onboarding", "==", true), where("interests", "array-contains-any", userInterest || [])))
				userData = querySnapshot.docs.map(doc => doc.data() as UserProfile)

				data = userData.sort((a , b) => {
					const interestsA = (a as UserFilters).interests || [];
					const interestsB = (b as UserFilters).interests || [];

					const sharedInterestsA = currentUserInterests2.filter((interest: string) => interestsA.includes(interest)).length;
					const sharedInterestsB = currentUserInterests2.filter((interest: string) => interestsB.includes(interest)).length;

					return sharedInterestsB - sharedInterestsA;
				});

			} else {
				data = userData
			}
			data = userData
			setProfiles(filterBlockedAndCurrentUser(data as User[], blockedUsers));
		} catch (error) {
			console.error("Error fetching profiles:", error);
		} finally {
			setExploreDataLoading(false);
		}
	};

	const refreshProfiles = useCallback(async () => {
		try {
			const blockedIds = await fetchBlockedUsers().then(async () => {
				console.log("Blocked users refreshed successfully", blockedIds)
				await fetchProfilesBasedOnOption().catch((err) => console.error("Refreshed UnSuccessful", err))
			})
		} catch (error) {
			console.error("Error refreshing profiles:", error);
		}
	}, [fetchBlockedUsers]);

	const getUsers = (user?: User) => {
		const usersCollection = collection(db, "users");
		const q_base = query(usersCollection,
			where("has_completed_onboarding", "==", true));
		let q;
		if (user) {
			const userGender = user.gender;
			if (user.meet === 2) {
				q = query(q_base,
					where("meet", "in", [2, userGender === "Male" ? 0 : 1])
				);
			} else if (user.meet === 0 || user.meet === 1) {
				const targetGender = user.meet === 0 ? "Male" : "Female";
				q = query(q_base,
					where("gender", "==", targetGender),
				);
			} else {
				throw new Error("Invalid meet value provided.");
			}
		} else {
			q = q_base;
		}
		return q;
	};

	const fetchProfilesBasedOnOption = async () => {
		let fetchQuery;
		let fourteenDaysAgo;
		const q = getUsers(user);
		switch (selectedOption) {
			case "Discover":
				fetchQuery = query(q);
				break;
			case "Similar interest":
				fetchQuery = query(q);
				break;
			case "Online":
				fetchQuery = query(q, where("status.online", "==", true));
				break;
			case "Popular in my area":
				fetchQuery = query(q, where("country_of_origin", "==", user?.country_of_origin));
				break;
			case "New members":
				fourteenDaysAgo = new Date();
				fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
				fetchQuery = query(q, where("created_at", ">=", Timestamp.fromDate(fourteenDaysAgo)));
				break;
			case "Looking to date":
				fetchQuery = query(q, where("preference", "==", 0));
				break;
			case "Outside my country":
				fetchQuery = query(q, where("country_of_origin", "!=", user?.country_of_origin));
				break;
			default:
				console.log("Option not recognized");
				return;
		}
		await fetchBlockedAndFilteredProfiles(fetchQuery);
	};


	return { refreshProfiles, fetchBlockedUsers, fetchProfilesBasedOnOption, fetchBlockedAndFilteredProfiles }
}

export default useProfileFetcher;
