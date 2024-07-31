const BigSnapshots = () => {
  return (
    <figure className="relative h-[35rem] mt-10">
      <img
        className="absolute -top-8 z-50 cursor-pointer"
        src="/assets/icons/camera.svg"
        alt="add pictures"
      />
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
  { alt: "", image: "", color: "black" },
  { alt: "", image: "", color: "blue" },
  { alt: "", image: "", color: "grey" },
];
