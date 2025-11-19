import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";

import AddNewColumn from "../features/Boards/AddNewColumn";
import Columns from "./Columns";
import { useParams } from "react-router-dom";
import useBoards from "../boardsStore";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
import AddBoardForm from "../features/Boards/AddBoardForm";

function BoardDisplay() {
  const { boardId } = useParams();
  const boards = useBoards((state) => state.boards);

  const currentBoard = boards.filter((board) => board.id === boardId)[0];

  const updateTaskStatus = useBoards((state) => state.updateTaskStatus);
  const columnColor = ["#49C4E5", "#8471F2", "#67E2AE"];
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),

    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
        delay: 150,
        tolerance: 10,
      },
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    updateTaskStatus(boardId, active.id, over.id);
  }

  if (!currentBoard) return;

  if (currentBoard.columns.length === 0)
    return (
      <div className="h-full flex gap-3 flex-col items-center justify-center">
        <p className="text-medium-grey font-bold text-center">
          This board is empty. Create a new column to get started.
        </p>
        <Modal>
          <Modal.Open opens={`editColumn-${currentBoard.id}`}>
            <button
              className={`flex text-white font-medium text-[0.75rem] max-sm:text-[0.78rem] hover:bg-purple-purple-hover max-sm:px-[0.84rem] max-sm:py-3  items-center gap-1 bg-main-purple rounded-[1.6rem] px-[1rem] py-3`}
            >
              <FaPlus />
              <span>Add New Column</span>
            </button>
          </Modal.Open>
          <Modal.Window name={`editColumn-${currentBoard.id}`}>
            <AddBoardForm boardToEdit={currentBoard} />
          </Modal.Window>
        </Modal>
      </div>
    );

  return (
    <section
      className="
      flex gap-6 overflow-x-auto w-full h-full px-4
      scroll-smooth snap-x snap-mandatory 
      scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
    "
    >
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        autoScroll={{ speed: 15, acceleration: 5 }}
      >
        {currentBoard?.columns?.map((col, index) => (
          <Columns
            key={col.value}
            column={col.value}
            tasks={currentBoard.tasks}
            color={columnColor.at(index)}
          />
        ))}
      </DndContext>

      <AddNewColumn currentBoard={currentBoard} />
    </section>
  );
}

export default BoardDisplay;
