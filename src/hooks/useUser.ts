import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User, UserPrefences } from "@/types/user";

const useGetUserProfile = async (uid: string): Promise<User | undefined> => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data() as User);
    return docSnap.data() as User;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

const useUpdateUserProfile = async (
  uid: string,
  success?: () => void,
  updatedFields?: Partial<User>
) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updatedFields as User).then(success);
};

const useGetUserPreferences = async (
  uid: string
): Promise<UserPrefences | undefined> => {
  const docRef = doc(db, "preferences", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data() as User);
    return docSnap.data() as UserPrefences;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

const useUpdateUserPreferences = async (
  uid: string,
  success?: () => void,
  updatedFields?: Partial<UserPrefences>
) => {
  const userRef = doc(db, "preferences", uid);
  await updateDoc(userRef, updatedFields as UserPrefences).then(success);
};

export { useGetUserProfile, useUpdateUserProfile, useGetUserPreferences, useUpdateUserPreferences };
