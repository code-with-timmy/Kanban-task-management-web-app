import { FaPlus } from "react-icons/fa";
import AddBoardForm from "./AddBoardForm";
import Modal from "../../ui/Modal";

function AddNewColumn({ currentBoard }) {
  return (
    <div className="w-[300px] hover:text-main-purple snap-center rounded-md text-medium-grey mt-[4rem] flex-shrink-0 flex items-center justify-center hover:bg-[linear-gradient(90deg,rgba(var(--col-hover))_100%,rgba(var(--col-hover))_50%)]">
      <Modal>
        <Modal.Open opens={`editColumn-${currentBoard.id}`}>
          <button className="font-extrabold text-lg flex items-center">
            <FaPlus />
            <span>New Column</span>
          </button>
        </Modal.Open>
        <Modal.Window name={`editColumn-${currentBoard.id}`}>
          <AddBoardForm boardToEdit={currentBoard} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddNewColumn;
