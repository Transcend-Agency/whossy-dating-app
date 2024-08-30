interface TagProps {
    image: string;
    text: string;
}

const Tag: React.FC<TagProps> = ({text, image}) => {
  return (
    <div className="bg-white py-2 rounded-lg px-3 gap-2 text-[1.4rem] items-center w-fit flex">
      <img
        className="size-[1.2rem]"
        src={image}
        alt={text}
      />
      <p>{text}</p>
    </div>
  );
};

export default Tag;
