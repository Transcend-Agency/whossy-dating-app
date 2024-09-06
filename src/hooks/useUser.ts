import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { User, UserFilters, UserPrefences, UserProfile } from "@/types/user";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

type CollectionName = "users" | "preferences" | "filters";

const collection_one = "users";
const collection_two = "preferences";
const collection_three = "filters";

const uid = auth.currentUser?.uid;
// const uid2 = "Ay2YNO2JnYePExiVo7AGnrkupE22";

const useGetUserProfile = async (
  path: CollectionName
): Promise<UserProfile | undefined> => {
  const docRef = doc(db, path, uid as string);
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
  path: CollectionName,
  success: () => void,
  updatedFields?: Partial<UserProfile>
) => {
  const userRef = doc(db, path, uid as string);
  await updateDoc(userRef, updatedFields as UserProfile).then(() => {
    success();
    toast.success("Updated!");
  });
};

const uploadPhotosToGetUrl = (file: File, i: number, addPhotos: (url: string) => void) => {
  if (!file) return;
  const storage = getStorage();
  const storageRef = ref(storage, `tests/${uid as string}/profile_pictures/image_${i}`);
  uploadBytes(storageRef, file)
    .then(() => {
      // toast.success("Image has been uploaded successfully 🚀");
      console.log("File was uploaded was successfully!");
      getDownloadURL(storageRef)
        .then((url) => {
          addPhotos(url);
        })
        .catch((error) => console.log(error));
    })
    .catch((err) => console.log(err));
};

const uploadPhotosToFirestore = async (photo: string[]) => {
  console.log("Loading...");
  try {
    await setDoc(doc(db, collection_two, uid as string), {photo});
    // toast.success("Account has been created successfully 🚀");
    // setOpenModal(false);
    // navigate('/dashboard');
  } catch (err) {
    console.log(err);
  }
};

export { useGetUserProfile, useUpdateUserProfile, uploadPhotosToGetUrl, uploadPhotosToFirestore };
