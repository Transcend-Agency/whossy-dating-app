import * as SwitchRadix from "@radix-ui/react-switch";
import "./styles.css";

interface SwitchProps {
  text: string;
  textColor?: string;
}

const Switch: React.FC<SwitchProps> = ({ text, textColor='#8A8A8E' }) => (
  <form>
    <div className="flex items-center justify-between">
      <label
        className="w-full text-[#8A8A8E] leading-none pr-[15px]"
        style={{
          color: textColor
        }}
        htmlFor={text}
      >
        {text}
      </label>
      {/* focus:shadow-[0_0_0_2px] */}
      <SwitchRadix.Root
        className="w-[45px] h-[25px] pl-2 bg-blackA6 rounded-full relative shadow-[0_2px_5px] shadow-[#D9D9D9] focus:shadow-[#D9D9D9] data-[state=checked]:bg-black outline-none cursor-default"
        // className="w-[42px] h-[25px] bg-blackA6 rounded-full relative data-[state=checked]:bg-black outline-none cursor-default"
        id={text}
        // style={{ border: "1px solid black" }}
        // style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
      >
        <SwitchRadix.Thumb className="block w-[18px] h-[18px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </SwitchRadix.Root>
    </div>
  </form>
);

export default Switch;
