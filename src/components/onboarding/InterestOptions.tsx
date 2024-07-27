import { alphabet } from "../../constants/onboarding";
import TagSelector from "../ui/TagSelector";

const InterestOptions = () => {
  return (
    <>
      {alphabet.map((item, _) => (
        <div className=" mb-[0.8rem]" key={_}>
          <h1 className="text-[1.8rem]">{item.letter.toUpperCase()}</h1>
          <div className="space-y-[1rem]">
            {item.options.map((option, i) => (
              <TagSelector key={i} text={option} />
            ))}
          </div>
          <hr className="mt-[1.8rem]" />
        </div>
      ))}
    </>
  );
};

export default InterestOptions;

