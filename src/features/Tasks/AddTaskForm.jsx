import { useParams } from "react-router-dom";
import AddSubTaskForm from "./AddSubTaskForm";
import Status from "../../ui/Status";
import { useForm } from "react-hook-form";
import useBoards from "../../boardsStore";

function AddTaskForm({ onCloseModal, taskToEdit = {} }) {
  const { id: editId, ...editValues } = taskToEdit;
  const isEditSession = Boolean(editId);

  const boards = useBoards((state) => state.boards);
  const { boardId } = useParams();
  const currentBoard = boards.filter((board) => board.id === boardId)[0];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? { id: editId, ...editValues }
      : {
          id: Math.random().toString(36).substr(2, 6),
          title: "",
          description: "",
          subtasks: [
            {
              id: Math.random().toString(36).substr(2, 6),
              value: "",
              checked: false,
            },
            {
              id: Math.random().toString(36).substr(2, 6),
              value: "",
              checked: false,
            },
          ],
          status: currentBoard.columns.value,
        },
  });
  const addTaskToBoard = useBoards((state) => state.addTaskToBoard);
  const editTask = useBoards((state) => state.editTask);
  const onSubmit = (data) => {
    if (isEditSession) {
      editTask(boardId, editId, data);
    } else {
      addTaskToBoard(boardId, data);
    }
    onCloseModal();
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(boards);
  };

  function onError(errors) {
    // console.log(errors);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="grid grid-cols-[295px] md:grid-cols-[416px]  gap-6 max-sm:gap-2"
    >
      <h1 className="font-bold text-heading">
        {isEditSession ? "Edit Task" : "Add New Task"}
      </h1>

      <div className="flex gap-1 flex-col w-full">
        <label
          htmlFor="title"
          className="text-input-heading text-[0.83rem] font-semibold"
        >
          Title
        </label>
        <div className="relative w-full">
          <input
            {...register("title", {
              required: "Can't be empty",
            })}
            type="text"
            name="title"
            id="title"
            className={` border-[1px] w-full text-[16px] text-heading bg-white-bg  rounded-[0.26rem] ${
              errors?.title?.message
                ? "border-[#EA5555]"
                : "border-[#828FA3]/25"
            } px-3 py-2 placeholder:text-heading/25 placeholder:text-[0.8rem] no-active`}
            placeholder="e.g. Take coffee break"
          />
          {errors?.title?.message && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EA5555] text-[0.75rem] font-medium pointer-events-none">
              {errors?.title?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-col">
        <label
          htmlFor="description"
          className="text-input-heading text-[0.83rem] font-semibold"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          type="text"
          name="description"
          id="description"
          className=" h-[1120x] bg-white-bg text-heading resize-none border-[1px] border-[#828FA3]/25 rounded-[0.26rem]  px-3 py-2 placeholder:text-heading/25 placeholder:text-[0.8rem] no-active  yScroll"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        />
      </div>

      <AddSubTaskForm
        title="Subtasks"
        name="subtasks"
        control={control}
        errors={errors}
      />
      <Status title="Status" name="status" control={control} />

      <button className="w-full rounded-3xl bg-main-purple text-center py-3 font-bold text-sm text-white hover:bg-purple-purple-hover">
        {isEditSession ? "Save Changes" : "Create Task"}
      </button>
    </form>
  );
}

export default AddTaskForm;
