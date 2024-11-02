import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { AdvancedSearchPreferences, User, UserFilters, UserProfile } from "@/types/user";
import toast from "react-hot-toast";

type CollectionName = "users" | "preferences" | "filters";

const collection_one = "users";
const collection_three = "filters";

const getUserProfile = async (
  path: CollectionName, uid: string
): Promise<UserProfile | undefined> => {
  const docRef = doc(db, path, uid as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (path === collection_one) return docSnap.data() as User;
    if (path === collection_three) return docSnap.data() as UserFilters;
  } else {
    console.log("No such document!");
  }
};

const updateUserProfile = async (
  path: CollectionName, uid: string,
  success: () => void,
  updatedFields?: Partial<UserProfile>
) => {
  const userRef = doc(db, path, uid as string);
  await updateDoc(userRef, updatedFields as UserProfile).then(() => {
    success();
    toast.success("Updated!");
  });
};

const updateAdvancedSearchPreferences = async (
 uid: string,
  success: () => void,
  updatedFields?: Partial<UserProfile>
) => {
  const userRef = doc(db, "advancedSearchPreferences", uid as string);
  await updateDoc(userRef, updatedFields as UserProfile).then(() => {
    success();
    toast.success("Updated!");
  });
}

const getAdvancedSearchPreferences = async (uid: string) => {
  const docRef = doc(db, "advancedSearchPreferences", uid as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as AdvancedSearchPreferences;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    await setDoc(doc(db, "advancedSearchPreferences", uid as string), {
      gender: '',
      age_range: { min: 18, max: 100 }

    } as AdvancedSearchPreferences);
  }
}

export { getUserProfile, updateUserProfile, updateAdvancedSearchPreferences, getAdvancedSearchPreferences };
