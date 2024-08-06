import { useRef, useState } from "react";
import {
  PictureData,
  usePictureStore,
} from "../../store/onboarding/usePictureStore";
import Modal from "../ui/Modal";
// import { uploadImage } from "../../constants/onboarding";

interface ImageProps {
  // image?: string;
  name: keyof PictureData;
}

const Image: React.FC<ImageProps> = ({ name }) => {
  const { setPictures, pictures } = usePictureStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selected, setSelected] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setPicture({ fileName: file.name, fileSrc: reader.result as string });
        setPictures({ [name]: file });
        setSelected(reader.result as string);
        console.log(pictures);
      };
      reader.readAsDataURL(file);
      // uploadImage(file)
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <figure className="relative mb-10">
      {selected !== "" ? (
        <img
          className="absolute -top-[1rem] size-[2.5rem] cursor-pointer"
          src="/assets/images/onboarding/show-more.svg"
          onClick={() => setOpenModal(true)}
        />
      ) : (
        <img
          className="absolute -top-[1rem] size-[2.5rem] cursor-pointer"
          src="/assets/icons/camera-gray.png"
          onClick={handleClick}
        />
      )}
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <div className="bg-white w-[45rem] text-[1.8rem] p-6 space-y-8 rounded-2xl">
            <header className="flex  items-center space-x-6">
              <img
                className="py-[8px] px-[12px] rounded-md cursor-pointer bg-[#F6F6F6]"
                src="/assets/icons/left-arrow-black.svg"
                alt="Go back"
                onClick={() => setOpenModal(false)}
              />
              <h1 className=" font-medium">Edit Photo</h1>
            </header>
            <button
              className="w-full py-[14px] rounded-lg font-medium text-[#8A8A8E]"
              style={{ border: "1px solid #D9D9D9" }}
              onClick={() => {
                handleClick();
                setOpenModal(false);
              }}
            >
              Re-upload
            </button>
            <button
              className="w-full py-[14px] rounded-lg font-medium text-[#8A8A8E]"
              style={{ border: "1px solid #D9D9D9" }}
              onClick={() => {
                setSelected("");
                setOpenModal(false);
              }}
            >
              Remove photo
            </button>
          </div>
        </Modal>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageSelect}
      />
      {selected === "" ? (
        <div className="w-[8rem] h-[6.4rem] rounded-lg bg-[#F0F0F0] " />
      ) : (
        <img
          src={selected}
          className="w-[8rem] h-[6.4rem] rounded-lg object-cover"
          alt="user photo"
        />
      )}
    </figure>
  );
};

const SmallSnapshots = () => {
  return (
    <section className="flex space-x-[0.8rem]">
      <Image name="imageTwo" />
      <Image name="imageThree" />
      <Image name="imageFour" />
      <Image name="imageFive" />
      <Image name="imageSix" />
    </section>
  );
};

export default SmallSnapshots;
