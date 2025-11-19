import { useForm } from "react-hook-form";
import Status from "./Status";
import useBoards from "../boardsStore";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Menus from "./Menus";
import Modal from "./Modal";

function TaskPreview({ id, status }) {
  const { boardId } = useParams();
  const boards = useBoards((state) => state.boards);

  const currentBoard = boards.filter((board) => board.id === boardId)[0];

  const { title, description, subtasks } = currentBoard.tasks.filter(
    (tk) => tk.id === id
  )[0];
  const { control } = useForm({
    defaultValues: {
      status,
    },
  });

  return (
    <div className="w-[400px] max-sm:w-[300px] flex flex-col gap-4">
      <div className="flex flex-row gap-6 items-center">
        <h1 className="text-[16px] text-heading font-bold grow">{title}</h1>

        <Menus>
          <Menus.Toggle id={id} />
          <Menus.List id={id} xPos={20}>
            <Modal.Open opens={`edit-${id}`}>
              <Menus.Button>Edit Task</Menus.Button>
            </Modal.Open>
            <Modal.Open opens={`delete-${id}`}>
              <Menus.Button>Delete Task</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus>
      </div>
      <p className="text-[0.77rem] text-medium-grey">{description || ""}</p>

      <div className="flex flex-col gap-2">
        <p className="text-[0.77rem] font-bold text-medium-grey">
          Subtasks ({subtasks.filter((sub) => sub.checked === true).length} of{" "}
          {subtasks.length})
        </p>
      </div>

      {subtasks.map((sub) => (
        <SubtaskItem
          key={sub.id}
          boardId={boardId}
          taskId={id}
          subId={sub.id}
          checked={sub.checked}
          value={sub.value}
        />
      ))}
      <Status title="Current Status" name="status" control={control} />
    </div>
  );
}

function SubtaskItem({ value, checked, boardId, taskId, subId }) {
  const updateSubtaskChecked = useBoards((state) => state.updateSubtaskChecked);
  const [onChecked, setOnChecked] = useState(checked);

  function handleOnChecked(e) {
    const newChecked = e.target.checked;
    setOnChecked(newChecked);

    console.log(newChecked); // true/false correctly
    updateSubtaskChecked(boardId, taskId, subId, newChecked);
  }

  return (
    <div className="flex flex-row gap-2 items-center bg-light-grey p-4 rounded-md group hover:bg-main-purple/25 cursor-pointer">
      <input
        type="checkbox"
        id="check"
        checked={onChecked}
        onChange={handleOnChecked}
        className="border border-[#828FA3] border-opacity-[24.89%] accent-main-purple cursor-pointer"
      />
      <label
        htmlFor="check"
        className={`text-[0.8rem] ${
          onChecked && "line-through opacity-50"
        }  font-bold text-black-bg cursor-pointer`}
      >
        {value}
      </label>
    </div>
  );
}

export default TaskPreview;
