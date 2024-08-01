import { useRef } from "react";
import {
  PictureData,
  usePictureStore,
} from "../../store/onboarding/usePictureStore";

interface ImageProps {
  // image?: string;
  name: keyof PictureData;
}

const Image: React.FC<ImageProps> = ({ name }) => {
  const { setPictures, pictures } = usePictureStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setPicture({ fileName: file.name, fileSrc: reader.result as string });
        setPictures({ [name]: reader.result as string });
        console.log(file.name);
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
    <figure className="relative mb-10 cursor-pointer" onClick={handleClick}>
      <img
        className="absolute -top-[1rem] size-[2.5rem]"
        src="/assets/images/onboarding/grey-camera.svg"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageSelect}
      />
      {pictures[name] === "" ? (
        <div className="w-[8rem] h-[6.4rem] rounded-lg bg-[#F0F0F0] " />
      ) : (
        <img
          src={pictures[name]}
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
