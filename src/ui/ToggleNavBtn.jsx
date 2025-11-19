import { FaRegEye } from "react-icons/fa";

function ToggleNavBtn({ setIsSidebarOpen }) {
  return (
    <button
      onClick={() => setIsSidebarOpen((show) => !show)}
      className="fixed left-0 bottom-[7%] max-sm:hidden bg-main-purple py-4 px-4 pl-3 hover:bg-purple-purple-hover text-white flex items-center justify-center rounded-tr-full rounded-br-full"
    >
      <FaRegEye />
    </button>
  );
}

export default ToggleNavBtn;
