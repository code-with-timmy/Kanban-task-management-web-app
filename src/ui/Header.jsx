import Logo from "./Logo";

import MenuDropDown from "./MenuDropDown";

import AddTask from "../features/Tasks/AddTask";

import useBoards from "../boardsStore";
import Menus from "./Menus";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import AddBoardForm from "../features/Boards/AddBoardForm";
import ToggleNavBtn from "./ToggleNavBtn";

function Header({ setIsSidebarOpen, isSidebarOpen }) {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const boards = useBoards((state) => state.boards);
  const currentBoard = boards.filter((board) => board.id === boardId)[0];

  const deleteBoard = useBoards((state) => state.deleteBoard);

  function handleDeleteBoard() {
    deleteBoard(boardId);
    navigate("/");
  }

  return (
    <header
      className={`area-header ${!isSidebarOpen && "border-b border-border"}`}
    >
      <Logo />
      <div className="flex justify-between items-center grow md:px-[1.5rem] py-[0.9rem] border-b border-border  max-sm:pr-[0.6rem]">
        <h1 className=" flex gap-2 items-center">
          <span className="font-bold text-[1.3rem] text-heading max-sm:text-lg">
            {currentBoard?.title || "New Board"}
          </span>
          <div
            onClick={() => setIsSidebarOpen((open) => !open)}
            className={`md:hidden pt-[0.19rem] text-main-purple text-[0.1rem] transform ${
              isSidebarOpen ? "rotate-180" : "rotate-30"
            }`}
          >
            <MenuDropDown />
          </div>
        </h1>
        <div className="flex items-center gap-2">
          <AddTask />
          <Modal>
            <Menus>
              <Menus.Toggle id={currentBoard?.id} />
              <Menus.List id={currentBoard?.id}>
                <Modal.Open opens={`edit-${currentBoard?.id}`}>
                  <Menus.Button disabled={!currentBoard}>
                    Edit Board
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens={`delete-${currentBoard?.id}`}>
                  <Menus.Button disabled={!currentBoard}>
                    Delete Board
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus>
            <Modal.Window name={`delete-${currentBoard?.id}`}>
              <ConfirmDelete
                title="Delete this board?"
                type="board"
                name={currentBoard?.title}
                onConfirm={handleDeleteBoard}
              />
            </Modal.Window>
            <Modal.Window name={`edit-${currentBoard?.id}`}>
              <AddBoardForm boardToEdit={currentBoard} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      {!isSidebarOpen && <ToggleNavBtn setIsSidebarOpen={setIsSidebarOpen} />}
    </header>
  );
}

export default Header;
