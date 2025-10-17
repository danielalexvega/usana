import { useLocation, useSearchParams } from "react-router-dom";
import IconSpain from "../icons/IconSpain";
import IconUnitedStates from "../icons/IconUnitedStates";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Login from "./Login";
import Navigation from "./Navigation";
import { IconButton } from "../icons/IconButton";

const Header: React.FC = () => {
  const location = useLocation();
  const isResearchPage = location.pathname.match(/^\/research\/[\w-]+$/);
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang");

  return (
    <header className="bg-[rgb(53,53,53)] font-noto">
      {/* Top Row: Logo, Search, Login */}
      <div className="flex items-center justify-between px-6 py-4 mx-[50px]">
        {/* Logo - 1/5 width */}
        <div className="w-1/5">
          <Logo />
        </div>
        
        {/* Search Bar - 3.5/5 width (w-7/10) */}
        <div className="w-7/10 flex justify-center">
          <SearchBar />
        </div>
        
        {/* Login - 1/5 width */}
        <div className="w-1/5">
          <Login />
        </div>
      </div>
      
      {/* Bottom Row: Navigation */}
      <div className="border-t border-gray-600">
        <div className="px-6 py-4 mx-[50px]">
          <Navigation />
        </div>
      </div>

      {/* Research Page Language Selector */}
      {isResearchPage && (
        <div className="bg-[rgb(53,53,53)] border-t border-gray-600 flex justify-end px-6 py-2">
          <div className="flex gap-2 items-center">
            <IconButton
              icon={
                <IconUnitedStates
                  className={`hover:cursor-pointer hover:scale-110`}
                />
              }
              isSelected={lang === "en-US" || lang === null}
              onClick={() =>
                setSearchParams(prev => {
                  prev.delete("lang");
                  return prev;
                })}
            />
            <IconButton
              icon={
                <IconSpain
                  className={`hover:cursor-pointer hover:scale-110`}
                />
              }
              isSelected={lang === "es-ES"}
              onClick={() => {
                setSearchParams(prev => {
                  prev.set("lang", "es-ES");
                  return prev;
                });
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
