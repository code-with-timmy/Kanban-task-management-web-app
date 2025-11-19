import { FaPlus, FaRegEyeSlash } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { LuMoonStar } from "react-icons/lu";
import { MdWbSunny } from "react-icons/md";
import { NavLink } from "react-router-dom";
// import { useBoards } from "./useBoards";
import AddBoardForm from "../features/Boards/AddBoardForm";
import Modal from "./Modal";

import useBoards from "../boardsStore";
import DarkModeToggle from "./DarkModeToggle";

function MainNav({ setisSidebarOpen }) {
  const boards = useBoards((state) => state.boards);

  return (
    <>
      <nav>
        <h2 className="text-[0.78rem] px-6 text-medium-grey font-semibold pb-4 tracking-[0.1rem]">
          ALL BOARDS ({boards.length})
        </h2>
        <ul className="pr-[1.5rem] flex flex-col">
          {boards.map((board) => (
            <NavLinkItem key={board.id} name={board.title} id={board.id} />
          ))}
        </ul>
        <Modal>
          <Modal.Open opens="newColumn-form">
            <button className="flex items-center gap-3 py-3 pl-5 pr-[3.7rem] rounded-tr-full rounded-br-full font-bold text-sm text-main-purple">
              <FiSidebar className="text-lg" />
              <span className="flex items-center gap-1">
                <FaPlus className="font-medium text-[0.6rem]" />
                Create New Boards
              </span>
            </button>
          </Modal.Open>
          <Modal.Window name="newColumn-form">
            <AddBoardForm />
          </Modal.Window>
        </Modal>
      </nav>
      <div className="flex flex-col gap-3">
        <div className="mx-5">
          <DarkModeToggle />
        </div>

        <button
          onClick={() => setisSidebarOpen((open) => !open)}
          className="flex text-medium-grey hover:bg-sub-btn mr-5 hover:text-main-purple items-center gap-2 font-bold text-sm max-sm:hidden py-3 pl-5 pr-[3.7rem] rounded-tr-full rounded-br-full"
        >
          <FaRegEyeSlash />
          <span>Hide Sidebar</span>
        </button>
      </div>
    </>
  );
}

function NavLinkItem({ name, id }) {
  return (
    <NavLink
      to={id}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-main-purple text-white "
            : " text-medium-grey hover:bg-sub-btn hover:text-main-purple"
        } flex items-center gap-3 py-3 pl-5 pr-[3.7rem] rounded-tr-full rounded-br-full font-semibold text-sm `
      }
    >
      <FiSidebar className="text-lg" />
      <span>{name}</span>
    </NavLink>
  );
}
export default MainNav;
