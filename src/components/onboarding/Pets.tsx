import { pets } from "../../constants/onboarding";
import PetTag from "./PetTag";

const Pets = () => {
  return (
    <div className="space-y-[1rem]">
      {pets.map((pet, i) => (
        <PetTag text={pet} key={i} />
      ))}
    </div>
  );
};

export default Pets;
