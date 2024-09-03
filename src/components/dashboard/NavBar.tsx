import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

interface NavBarProps {
  children: React.ReactNode | React.ReactNode[];
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <>
      <TopNav />
      {children}
      <BottomNav />
    </>
  );
};

export default NavBar;
