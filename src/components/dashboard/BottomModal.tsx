const BottomModal = ({
  item,
  close,
}: {
  item: { title: string; options?: string[]; type?: string };
  close: () => void;
}) => {
  return (
    <div
      className="bg-white text-black flex-1 fixed w-full bottom-0 z-50"
      style={{
        border: "1px solid",
        borderColor: "transparent",
        borderTopRightRadius: "1.8rem",
        borderTopLeftRadius: "1.8rem",
      }}
    >
      <header
        className="text-[1.6rem] flex justify-between p-[1.6rem]"
        style={{ borderBottom: "2px solid #F6F6F6" }}
      >
        <h1>{item.title}</h1>
        <p onClick={close} className="cursor-pointer">
          X
        </p>
      </header>
      {item.options && (
        <div className=" w-full p-[1.6rem] space-y-[1rem]">
          {item.options.map((item, i) => (
            <div
              className="p-[0.8rem] inline-block mr-[1.6rem] text-[1.4rem] text-[#8A8A8E] bg-[#F6F6F6] w-fit rounded-[0.6rem]"
              key={i}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      {item.type && (
        <div className="flex bg-[#F6F6F6] m-[1.6rem] gap-2 p-[1.6rem] text-[1.4rem]">
          <img src="/assets/icons/search.svg" alt="" />
          <input
            className="w-full outline-none bg-inherit"
            type="text"
            placeholder="Enter city name"
          />{" "}
        </div>
      )}
    </div>
  );
};

export default BottomModal;
