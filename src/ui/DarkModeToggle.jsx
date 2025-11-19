import { MdWbSunny } from "react-icons/md";
import { useDarkMode } from "../context/DarkModeContext";
import { LuMoonStar } from "react-icons/lu";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className=" flex gap-6 cursor-pointer bg-background items-center p-4 max-sm:p-3 rounded-md text-[1.35rem] max-sm:text-[1.1rem] text-medium-grey justify-center">
      <MdWbSunny className="" />
      <div
        onClick={toggleDarkMode}
        className={`bg-main-purple rounded-3xl w-[40px] p-[0.15rem] flex transition-all duration-150 ease-in ${
          isDarkMode ? "justify-end" : "justify-start"
        } w-[40px]`}
      >
        <div className="w-4 h-4  rounded-full bg-white"></div>
      </div>
      <LuMoonStar />
    </div>
  );
}

export default DarkModeToggle;
