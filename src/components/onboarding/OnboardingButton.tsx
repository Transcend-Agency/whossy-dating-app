import Button from "../ui/Button";
import toast from "react-hot-toast";

interface OnboardingButtonProps {
  selected: number | null | undefined | boolean;
  advance: () => void;
  error?: string
}

const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  advance,
  selected,
  error,
}) => {
  return (
    <Button
      text="Continue"
      onClick={() => {
        if (selected !== null) advance();
        else toast.error(error ?? "Please select an option");
      }}
      //   disabled={selected === null ? true : false}
      //   className="cursor-not-allowed"
      style={{
        backgroundColor: selected === null ? "#F6F6F6" : "",
        color: selected === null ? "#000000" : "",
      }}
    />
  );
};

export default OnboardingButton;
