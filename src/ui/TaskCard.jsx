import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Modal from "./Modal";
import TaskPreview from "./TaskPreview";
import ConfirmDelete from "./ConfirmDelete";
import { useParams } from "react-router-dom";
import useBoards from "../boardsStore";
import AddTaskForm from "../features/Tasks/AddTaskForm";

function TaskCard({ task }) {
  const { boardId } = useParams();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const deleteTaskFrmBoard = useBoards((state) => state.deleteTaskFrmBoard);

  function handleDeleteTask() {
    deleteTaskFrmBoard(boardId, task.id);
  }
  return (
    <Modal>
      <Modal.Open opens={task.id}>
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          className="group shadow-custom-blue bg-white-bg  rounded-md px-5 py-6 flex flex-col gap-1 w-full select-none touch-none"
        >
          <h3 className="text-md text-heading font-bold select-none group-hover:text-main-purple  break-words">
            {task.title}
          </h3>
          <p className="text-[0.8rem] font-bold text-medium-grey select-none">
            <span>
              {task.subtasks.filter((sub) => sub.checked === true).length}
            </span>{" "}
            of <span>{task.subtasks.length} substasks</span>
          </p>
        </div>
      </Modal.Open>
      <Modal.Window name={task.id}>
        <TaskPreview id={task.id} status={task.status} />
      </Modal.Window>
      <Modal.Window name={`delete-${task.id}`}>
        <ConfirmDelete
          title="Delete this task?"
          type="task"
          name={task.title}
          onConfirm={handleDeleteTask}
        />
      </Modal.Window>
      <Modal.Window name={`edit-${task.id}`}>
        <AddTaskForm taskToEdit={task} />
      </Modal.Window>
    </Modal>
  );
}

export default TaskCard;
