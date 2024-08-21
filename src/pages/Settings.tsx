import Switch from "@/components/ui/Switch";

const Section = () => {
  return (
    <section
      className="bg-[#F6F6F6] text-[1.4rem] px-[1.6rem] py-[1.2rem]"
      style={{
        borderTop: "1px solid #ECECEC",
        borderBottom: "1px solid #ECECEC",
      }}
    >
      <div
        className="space-y-[1.2rem] pb-[1.2rem]"
        style={{ borderBottom: "1px solid #D9D9D9" }}
      >
        <header className="flex">
          <h1>Incognito</h1>
          <div
            className="text-white ml-2 text-[1.2rem] py-[0.4rem] px-[0.8rem]"
            style={{
              background: `linear-gradient(to bottom, #FF5C00, #F0174B)`,
            }}
          >
            Premium
          </div>
        </header>
        <article>
          <p className="max-w-[40rem] text-[#8A8A8E]">
            Your profile will be hidden from public users but will be seen by
            people you like.
          </p>
          <Switch />
        </article>
      </div>
    </section>
  );
};

const Settings = () => {
  return (
    <div>
      <Section></Section>
    </div>
  );
};

export default Settings;
