import { useRef, useState } from "react";
import { usePictureStore } from "../../store/onboarding/usePictureStore";
import Modal from "../ui/Modal";

// interface Picture {
//   fileName: string;
//   fileSrc: string;
// }

const BigSnapshots = () => {
  // const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setPictures, pictures } = usePictureStore();
  const [selected, setSelected] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // const [picture, setPicture] = useState<Picture>({
  //   fileName: "",
  //   fileSrc: "",
  // });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictures({ imageOne: file });
        setSelected(reader.result as string);
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
    <figure className="relative h-[35rem] mt-10">
      {selected !== "" && (
        <img
          className="absolute -top-[2rem] size-[5rem] z-[99] cursor-pointer"
          src="/assets/images/onboarding/show-more.svg"
          alt="show more"
          onClick={() => setOpenModal(true)}
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
      {selected === "" && (
        <img
          className="absolute -top-[2rem] size-[5rem] z-[99] cursor-pointer"
          src="/assets/icons/camera.svg"
          alt="add pictures"
          onClick={handleClick}
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageSelect}
      />
      {selected !== "" && (
        <img
          src={selected}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `30rem`,
            height: `33.5rem`,
            zIndex: 50,
            borderRadius: "22px",
            objectFit: "cover",
          }}
          alt="user image"
        />
      )}
      {images.map((item, i) => (
        <div
          style={{
            position: "absolute",
            top: `${i * 2}rem`,
            left: `${i * 6}rem`,
            width: `${30 - i * 3}rem`,
            height: `${33.5 - i * 3}rem`,
            zIndex: `${40 - i * 10}`,
            borderRadius: "22px",
            backgroundColor: item.color,
            transform: `rotate(${0 + i * 5}deg)`,
          }}
          key={i}
        />
      ))}
    </figure>
  );
};

export default BigSnapshots;

const images = [
  { alt: "", image: "", color: "grey" },
  { alt: "", image: "", color: "#F0F0F0" },
  { alt: "", image: "", color: "#F7F7F7" },
];
