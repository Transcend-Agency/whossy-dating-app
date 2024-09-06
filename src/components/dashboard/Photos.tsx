import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadPhotosToGetUrl, useGetUserProfile, useUpdateUserProfile } from "@/hooks/useUser";
import { UserPrefences } from "@/types/user";
import { useStorePictureFiles } from "@/store/EditProfileStore";

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

const Card: React.FC<CardProps & {onDelete: () => void; index: number}> = ({
  photo,
  rowspan = "",
  colspan = "",
  height = "",
  onDelete,
  index,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalToggle = () => { setShowModal((prev) => !prev);};

  return (
    <>
      <div
        className={`relative w-full ${colspan} ${rowspan} xs:h-[128px] ${height} cursor-pointer hover:scale-[0.95] transition ease-in-out duration-200`}
        onClick={handleModalToggle}
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
      <AnimatePresence>
        {showModal && <CardModal onClose={handleModalToggle} index={index} onDelete={onDelete}/>}
      </AnimatePresence>
    </>
  );
};

const Photos = () => {
  const [photo, setPhoto] = useState<string[]>([]);

  const fetchUserPhotos = async () => {const data = await useGetUserProfile("preferences") as UserPrefences; setPhoto(data?.photos as string[]) }
  const updateUserPhotos = (s: string[]) => {useUpdateUserProfile("preferences", () => {fetchUserPhotos(); }, {photos: s})}

  useEffect(() => {fetchUserPhotos()}, [])
  useEffect(() => {setPhoto(photo)}, [photo])

  return (
    <section className="bg-[#F6F6F6] py-[1.2rem] px-[1.6rem]">
      <div className="grid grid-cols-6 grid-rows-2 gap-4">
        <Card photo={photo[0]} index={1} colspan="col-span-3 xs:col-span-2 " rowspan="row-span-2 xs:row-span-1" height="h-[184px]" onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[0]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={photo[1]} index={2} colspan="col-span-3 xs:col-span-2 " height="h-[88px]" onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[1]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={photo[2]} index={3} colspan="col-span-3 xs:col-span-2 " height="h-[88px]" onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[2]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={photo[3]} index={4} colspan="col-span-2" height="h-[88px]" onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[3]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={photo[4]} index={5} colspan="col-span-2" height="h-[88px]" onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[4]); updateUserPhotos(updatedPhotos);}}/>
        <Card photo={photo[5]} index={6} colspan="col-span-2" height="h-[88px]" onDelete={() => { const updatedPhotos = photo.filter(item => item !== photo[5]); updateUserPhotos(updatedPhotos);}}/>
      </div>
    </section>
  );
};

export default Photos;
