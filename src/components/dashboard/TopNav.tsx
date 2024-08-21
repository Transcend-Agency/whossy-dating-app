import { useNavigate } from "react-router-dom";
import { filter, settings } from "../../assets/icons";
import Icon from "../ui/Icon";

const TopNav = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end sticky top-0 bg-white z-50 p-[1rem] space-x-[1.5rem]">
      <Icon
        src={settings}
        className="cursor-pointer"
        onClick={() => navigate("/dashboard/settings")}
      />
      <Icon src={filter} className="cursor-pointer" />
    </div>
  );
};

export default TopNav;
