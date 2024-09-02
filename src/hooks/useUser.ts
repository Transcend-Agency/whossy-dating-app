import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User, UserFilters, UserPrefences, UserProfile } from "@/types/user";

const useGetUserProfile = async (uid: string, ): Promise<User | undefined> => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data() as User);

    // check the path i.e the collection name that was pased
    // if ()
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

const useGetFilteredPrefences = async (
  uid: string,
) => {
  const docRef = doc(db, "filters", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data() as User);
    return docSnap.data() as UserFilters;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export { useGetUserProfile, useUpdateUserProfile, useGetUserPreferences, useUpdateUserPreferences, useGetFilteredPrefences };
