import { useRef, useState } from "react";
import { usePictureStore } from "../../store/onboarding/usePictureStore";

// interface Picture {
//   fileName: string;
//   fileSrc: string;
// }

const BigSnapshots = () => {
  // const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setPictures, pictures } = usePictureStore();
  const [selected, setSelected] = useState("");

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
      <img
        className="absolute -top-[2rem] size-[5rem] z-[99] cursor-pointer"
        src="/assets/icons/camera.svg"
        alt="add pictures"
        onClick={handleClick}
      />
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
