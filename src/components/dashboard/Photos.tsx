import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadPhotosToGetUrl, useGetUserProfile, useUpdateUserProfile } from "@/hooks/useUser";
import { UserPrefences } from "@/types/user";
import { useStorePictureFiles } from "@/store/EditProfileStore";
import { useAuthStore } from "@/store/UserId";
import { PhotoModal, UploadPhotoModal } from "./PhotoModal";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Oval } from "react-loader-spinner";

interface CardProps {
  photo?: string;
  colspan?: string;
  rowspan?: string;
  height?: string;
}

const CardModal: React.FC<{ onClose: () => void; onDelete: () => void; index: number }> = ({ onClose, onDelete, index }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {addPicture} = useStorePictureFiles();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // addPictureFile(file);
        uploadPhotosToGetUrl(file, index, (url) => addPicture(url) )
        // setSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white w-[35rem] h-fit rounded-lg shadow-lg z-50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <header className="flex items-center justify-between p-[1.6rem] border-b">
          <h1 className="text-black text-[1.6rem]">Edit Photo</h1>
          <button className="text-black" aria-label="Close modal"  onClick={onClose}>
            <img src="/assets/icons/close.svg" className="cursor-pointer" alt="Close icon"/>
          </button>
        </header>
        <hr />
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageSelect}/>
        <div className="p-[1.6rem] space-y-3 text-[1.4rem] text-[#8A8A8E]">
          <button className="rounded-lg w-full py-3 cursor-pointer text-center" style={{ border: "1px solid #D9D9D9" }} onClick={handleClick}>
            Re-upload
          </button>
          <button className="rounded-lg w-full py-3 cursor-pointer text-center" style={{ border: "1px solid #D9D9D9" }} onClick={onDelete}>
            Delete Photo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Card: React.FC<CardProps & {onDelete?: () => void; index?: number; onPress?: () => void}> = ({
  photo,
  rowspan = "",
  colspan = "",
  height = "",
  onDelete,
  onPress,
  index,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalToggle = () => { setShowModal((prev) => !prev);};

  return (
    <>
      <div
        className={`relative w-full ${colspan} ${rowspan} xs:h-[128px] ${height} cursor-pointer hover:scale-[0.95] transition ease-in-out duration-200`}
        onClick={onPress}
      >
        <img
          className="size-[18px] absolute z-20 -top-3 cursor-pointer"
          src={ photo ? "/assets/icons/more.png" : "/assets/icons/camera-gray.png"}
          alt=""
        />
        {photo ? (
          <img
            className={`object-cover xs:h-[128px] ${height} w-full rounded-2xl `}
            src={photo}
            alt=""
          />
        ) : (
          <div
            className={`bg-gray-300 absolute w-full xs:h-[128px] ${height} rounded-2xl `}
          />
        )}
      </div>
      {/* <AnimatePresence>
        {showModal && <CardModal onClose={handleModalToggle} index={index} onDelete={onDelete}/>}
      </AnimatePresence> */}
    </>
  );
};

type PhotoModal = "hidden" | "photo-one" | "photo-two" | "photo-three" | "photo-four" | "photo-five" | "photo-six" | "photo-one-first-upload" | 'photo-two-first-upload' | 'photo-three-first-upload' | 'photo-four-first-upload' | 'photo-five-first-upload' | "photo-six-first-upload";

const Photos: React.FC<{refetchUserPreferences: () => void}> = ({refetchUserPreferences}) => {
  const [photo, setPhoto] = useState<string[]>([]);
  const [mutatedPhoto, setMutatedPhoto] = useState<string[]>([]);
  const [fileMap, setFileMap] = useState<Map<number, File>>(new Map());

  const {auth} = useAuthStore();

  const [isUpdating, setIsUpdating] = useState(false)

  const fetchUserPhotos = async () => {const data = await useGetUserProfile("preferences", auth?.uid as string) as UserPrefences; setPhoto(data?.photos as string[]) }
  const updateUserPhotos = (s: string[]) => {useUpdateUserProfile("preferences", auth?.uid as string, () => { fetchUserPhotos();refetchUserPreferences(); setIsUpdating(false) }, {photos: s})}

  useEffect(() => {fetchUserPhotos()}, [])
  useEffect(() => {setPhoto(photo); setMutatedPhoto(photo)}, [photo])

  const [photoModalShowing, setPhotoModalShowing] = useState<PhotoModal>('hidden')

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `tests/${auth}/profile_pictures/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMutatedPhoto((prev) => [...prev, reader.result as string]);
        setFileMap((prev) => new Map(prev).set(prev.size, file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const finalizePhotos = async () => {
    setIsUpdating(true)
    const newMutatedPhotos = await Promise.all(
      mutatedPhoto.map(async (photo, index) => {
        if (!photo.startsWith("https://")) {
          const file = fileMap.get(index);
          if (file) {
            const url = await uploadImage(file);
            return url;
          }
        }
        return photo;
      })
    );
    updateUserPhotos(newMutatedPhotos);
  };

  // const uploadImage = (file: File, i: number) => {
  //   if (!file) return;
  //   const storage = getStorage();
  //   const storageRef = ref(storage, `tests/${auth}/profile_pictures/${file}`);
  //   uploadBytes(storageRef, file)
  //     .then(() => {
  //       // toast.success("Image has been uploaded successfully 🚀");
  //       console.log("File was uploaded was successfully!");
  //       getDownloadURL(storageRef)
  //         .then((url) => {
  //           addPhotos(url);
  //         })
  //         .catch((error) => console.log(error));
  //     })
  //     .catch((err) => console.log(err));
  // };
  

  return (
    <>
    <PhotoModal showing={photoModalShowing === 'photo-one'} onModalClose={() => setPhotoModalShowing('hidden')} deleteImage={() => { const updatedPhotos = mutatedPhoto.filter(item => item !== mutatedPhoto[0]); setMutatedPhoto(updatedPhotos); setPhotoModalShowing('hidden')}} changeImage={() => {setPhotoModalShowing('hidden'); handleButtonClick()}}/>
    <PhotoModal showing={photoModalShowing === 'photo-two'} onModalClose={() => setPhotoModalShowing('hidden')} deleteImage={() => { const updatedPhotos = mutatedPhoto.filter(item => item !== mutatedPhoto[1]); setMutatedPhoto(updatedPhotos); setPhotoModalShowing('hidden')}} changeImage={() => {setPhotoModalShowing('hidden'); handleButtonClick()}}/>
    <PhotoModal showing={photoModalShowing === 'photo-three'} onModalClose={() => setPhotoModalShowing('hidden')} deleteImage={() => { const updatedPhotos = mutatedPhoto.filter(item => item !== mutatedPhoto[2]); setMutatedPhoto(updatedPhotos); setPhotoModalShowing('hidden')}} changeImage={() => {setPhotoModalShowing('hidden'); handleButtonClick()}}/>
    <PhotoModal showing={photoModalShowing === 'photo-four'} onModalClose={() => setPhotoModalShowing('hidden')} deleteImage={() => { const updatedPhotos = mutatedPhoto.filter(item => item !== mutatedPhoto[3]); setMutatedPhoto(updatedPhotos); setPhotoModalShowing('hidden')}} changeImage={() => {setPhotoModalShowing('hidden'); handleButtonClick()}}/>
    <PhotoModal showing={photoModalShowing === 'photo-five'} onModalClose={() => setPhotoModalShowing('hidden')} deleteImage={() => { const updatedPhotos = mutatedPhoto.filter(item => item !== mutatedPhoto[4]); setMutatedPhoto(updatedPhotos); setPhotoModalShowing('hidden')}} changeImage={() => {setPhotoModalShowing('hidden'); handleButtonClick()}}/>
    <PhotoModal showing={photoModalShowing === 'photo-six'} onModalClose={() => setPhotoModalShowing('hidden')} deleteImage={() => { const updatedPhotos = mutatedPhoto.filter(item => item !== mutatedPhoto[5]); setMutatedPhoto(updatedPhotos); setPhotoModalShowing('hidden')}} changeImage={() => {setPhotoModalShowing('hidden'); handleButtonClick()}}/>
    <UploadPhotoModal showing={photoModalShowing === 'photo-one-first-upload'} onModalClose={() => setPhotoModalShowing('hidden')} changeImage={() => {handleButtonClick(); setPhotoModalShowing('hidden')}}/>
    <UploadPhotoModal showing={photoModalShowing === 'photo-two-first-upload'} onModalClose={() => setPhotoModalShowing('hidden')} changeImage={() => {handleButtonClick(); setPhotoModalShowing('hidden')}}/>
    <UploadPhotoModal showing={photoModalShowing === 'photo-three-first-upload'} onModalClose={() => setPhotoModalShowing('hidden')} changeImage={() => {handleButtonClick(); setPhotoModalShowing('hidden')}}/>
    <UploadPhotoModal showing={photoModalShowing === 'photo-four-first-upload'} onModalClose={() => setPhotoModalShowing('hidden')} changeImage={() => {handleButtonClick(); setPhotoModalShowing('hidden')}}/>
    <UploadPhotoModal showing={photoModalShowing === 'photo-five-first-upload'} onModalClose={() => setPhotoModalShowing('hidden')} changeImage={() => {handleButtonClick(); setPhotoModalShowing('hidden')}}/>
    <UploadPhotoModal showing={photoModalShowing === 'photo-six-first-upload'} onModalClose={() => setPhotoModalShowing('hidden')} changeImage={() => {handleButtonClick(); setPhotoModalShowing('hidden')}}/>


    <section className="bg-[#F6F6F6] py-[1.2rem] px-[1.6rem] flex flex-col">
      <div className="grid grid-cols-6 grid-rows-2 gap-4">
        <input ref={fileInputRef} accept="image/*" type="file" className="hidden" onChange={handleImageUpload}/>
        <Card photo={mutatedPhoto[0]} index={1} colspan="col-span-3 xs:col-span-2 " rowspan="row-span-2 xs:row-span-1" height="h-[184px]" onPress={() => {if (mutatedPhoto[0]) {setPhotoModalShowing('photo-one')} else {setPhotoModalShowing('photo-one-first-upload')}}} onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[0]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={mutatedPhoto[1]} index={2} colspan="col-span-3 xs:col-span-2 " onPress={() => {if (mutatedPhoto[1]) {setPhotoModalShowing('photo-two')} else {setPhotoModalShowing('photo-two-first-upload')}}} height="h-[88px]" onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[1]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={mutatedPhoto[2]} index={3} colspan="col-span-3 xs:col-span-2 " onPress={() => {if (mutatedPhoto[2]) {setPhotoModalShowing('photo-three')} else {setPhotoModalShowing('photo-three-first-upload')}}} height="h-[88px]" onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[2]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={mutatedPhoto[3]} index={4} colspan="col-span-2" height="h-[88px]" onPress={() => {if (mutatedPhoto[3]) {setPhotoModalShowing('photo-four')} else {setPhotoModalShowing('photo-four-first-upload')}}} onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[3]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={mutatedPhoto[4]} index={5} colspan="col-span-2" height="h-[88px]" onPress={() => {if (mutatedPhoto[4]) {setPhotoModalShowing('photo-five')} else {setPhotoModalShowing('photo-five-first-upload')}}} onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[4]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={mutatedPhoto[5]} index={6} colspan="col-span-2" height="h-[88px]" onPress={() => {if (mutatedPhoto[5]) {setPhotoModalShowing('photo-six')} else {setPhotoModalShowing('photo-six-first-upload')}}} />
      </div>
      {JSON.stringify(mutatedPhoto) !== JSON.stringify(photo) && <button className="text-center modal__body__header__save-button mt-4 flex justify-center" onClick={() => {if (mutatedPhoto.length < 2){toast.error("A minumum of 2 images is required")} else {finalizePhotos()}}}>{!isUpdating ? 'Save' : <Oval color="#485FE6" secondaryColor="#485FE6" width={20} height={20}/>}</button>}
    </section>
    </>
  );
};

export default Photos;
