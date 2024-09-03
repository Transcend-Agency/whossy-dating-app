import { useState } from "react";
import {
  chat,
  globalSearch,
  heartBottom,
  heartTop,
  match,
  profileBottom,
  profileTop,
} from "../../assets/icons";
import Icon from "../ui/Icon";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [active, setActive] = useState<string>("match");
  const navigate = useNavigate();
  return (
    <div className="sticky bottom-0 w-full bg-white text-white flex">
      {icons.map((icon) => (
        <div
          className={` w-full py-[2rem] flex justify-center`}
          onClick={() => setActive(icon.name)}
        >
          <Icon
            color={active === icon.name ? "#F2243E" : "#8A8A8E"}
            id={icon.name}
            src={icon.src}
            src2={icon.src2}
            className="cursor-pointer"
            onClick={() => navigate("/dashboard/" + icon.route)}
          />
        </div>
      ))}
    </div>
  );
};

export default BottomNav;

const icons = [
  { name: "match", src: match, route: "" },
  { name: "globalSearch", src: globalSearch, route: "globalSearch" },
  { name: "heart", src: heartTop, src2: heartBottom, route: "heart" },
  { name: "chat", src: chat, route: "chat" },
  { name: "profile", src: profileTop, src2: profileBottom, route: "profile" },
];
