import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardProps {
  photo?: string;
  colspan?: string;
  rowspan?: string;
  height?: string;
}

const CardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
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
          <button
            className="text-black"
            aria-label="Close modal"
            onClick={onClose}
          >
            <img
              src="/assets/icons/close.svg"
              className="cursor-pointer"
              alt="Close icon"
            />
          </button>
        </header>
        <hr />
        <div className="p-[1.6rem] space-y-3 text-[1.4rem] text-[#8A8A8E]">
          <button
            className="rounded-lg w-full py-3 cursor-pointer text-center"
            style={{ border: "1px solid #D9D9D9" }}
          >
            Re-upload
          </button>
          <button
            className="rounded-lg w-full py-3 cursor-pointer text-center"
            style={{ border: "1px solid #D9D9D9" }}
          >
            Delete Photo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Card: React.FC<CardProps> = ({
  photo,
  rowspan = "",
  colspan = "",
  height = "",
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalToggle = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <div
        className={`relative w-full ${colspan} ${rowspan} xs:h-[128px] ${height}`}
      >
        <img
          className="size-[18px] absolute z-50 -top-3 cursor-pointer"
          onClick={handleModalToggle}
          src={
            photo ? "/assets/icons/more.png" : "/assets/icons/camera-gray.png"
          }
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
        {showModal && <CardModal onClose={handleModalToggle} />}
      </AnimatePresence>
    </>
  );
};

const Photos = () => {
  const [photo, setPhoto] = useState<string[]>([
    "https://firebasestorage.googleapis.com/v0/b/whossy-app.appspot.com/o/users%2F3CnZLN9AlaVnwQztnnE87ICdq9S2%2Fprofile_pictures%2F1723121035293?alt=media&token=5eed7a6f-e22c-43db-87ba-296df0886858",
    "https://firebasestorage.googleapis.com/v0/b/whossy-app.appspot.com/o/users%2F3CnZLN9AlaVnwQztnnE87ICdq9S2%2Fprofile_pictures%2F1723121042325?alt=media&token=c9763ef6-7deb-459f-aebe-1a9adb6fc8a2",
    "https://firebasestorage.googleapis.com/v0/b/whossy-app.appspot.com/o/users%2F3CnZLN9AlaVnwQztnnE87ICdq9S2%2Fprofile_pictures%2F1723121045662?alt=media&token=f99fb627-c163-408e-9169-e8f90017a3d8",
  ]);

  return (
    <section className="bg-[#F6F6F6] py-[1.2rem] px-[1.6rem]">
      <div className="grid grid-cols-6 grid-rows-2 gap-4">
        <Card
          photo={photo[0]}
          colspan="col-span-3 xs:col-span-2 "
          rowspan="row-span-2 xs:row-span-1"
          height="h-[184px]"
        />
        <Card
          photo={photo[1]}
          colspan="col-span-3 xs:col-span-2 "
          height="h-[88px]"
        />
        <Card
          photo={photo[2]}
          colspan="col-span-3 xs:col-span-2 "
          height="h-[88px]"
        />
        <Card photo={photo[3]} colspan="col-span-2" height="h-[88px]" />
        <Card photo={photo[4]} colspan="col-span-2" height="h-[88px]" />
        <Card photo={photo[5]} colspan="col-span-2" height="h-[88px]" />
      </div>
    </section>
  );
};

export default Photos;
