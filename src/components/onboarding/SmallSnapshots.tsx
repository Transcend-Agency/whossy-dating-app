
const SmallSnapshots = () => {
  return (
    <section className="flex space-x-[0.8rem]">
      {Array.from({ length: 5 }, (_, index) => (
        <figure className="relative mb-10" key={index}>
          <img
            className="absolute -top-[1rem]"
            src="/assets/images/onboarding/grey-camera.svg"
            alt=""
          />
          <div className="w-[8rem] h-[6.4rem] rounded-lg bg-black " />
        </figure>
      ))}
    </section>
  );
};

export default SmallSnapshots;
