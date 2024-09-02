import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User, UserFilters, UserPrefences, UserProfile } from "@/types/user";
import toast from "react-hot-toast";

const collection_one ='users';
const collection_two ='preferences';
const collection_three ='filters';

const uid = "Ay2YNO2JnYePExiVo7AGnrkupE22"

const useGetUserProfile = async (path: string): Promise<UserProfile | undefined> => {
  const docRef = doc(db, path, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data() as User);

    // check the path i.e the collection name that was pased
    if (path === collection_one) return docSnap.data() as User;
    if (path === collection_two) return docSnap.data() as UserPrefences;
    if (path === collection_three) return docSnap.data() as UserFilters;
   } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

const useUpdateUserProfile = async (
  path: string,
  success: () => void,
  updatedFields?: Partial<UserProfile>
) => {
  const userRef = doc(db, path, uid);
  await updateDoc(userRef, updatedFields as UserProfile).then(() => {success(); toast.success("Updated!")});
};

export { useGetUserProfile, useUpdateUserProfile };
