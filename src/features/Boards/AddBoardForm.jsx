import { useNavigate, useParams } from "react-router-dom";
import useBoards from "../../boardsStore";

import AddSubTaskForm from "../Tasks/AddSubTaskForm";
import { useForm } from "react-hook-form";

function AddBoardForm({ onCloseModal, boardToEdit = {} }) {
  const { id: editId, ...editValues } = boardToEdit;
  const isEditSession = Boolean(editId);

  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm({
    defaultValues: isEditSession
      ? { ...editValues }
      : {
          title: "",
          columns: [{ value: "Todo" }, { value: "Doing" }],
        },
  });
  const addNewBoard = useBoards((state) => state.addNewBoard);
  const editBoard = useBoards((state) => state.editBoard);
  const onSubmit = (data) => {
    if (isEditSession) {
      editBoard(editId, {
        id: data.title.toLowerCase().replace(/\s+/g, "-"),
        ...data,
      });
    } else {
      addNewBoard({
        id: data.title.toLowerCase().replace(/\s+/g, "-"),
        title: data.title,
        columns: data.columns,
      });
    }
    onCloseModal();
    navigate(`/${data.title.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-[255px] md:grid-cols-[416px]  gap-6 max-sm:gap-4"
    >
      <h1 className="text-black-bg font-bold">
        {isEditSession ? "Edit Board" : "Add New Board"}
      </h1>

      <div className="flex gap-1 flex-col">
        <label
          htmlFor="title"
          className="text-input-heading text-[0.83rem] font-semibold"
        >
          Name
        </label>
        <input
          {...register("title")}
          type="text"
          name="title"
          id="title"
          className=" border-[1px] border-[#828FA3]/25 rounded-[0.26rem] bg-white-bg text-heading text-[16px] md:text-[13px] px-3 py-2 placeholder:text-heading/25 placeholder:text-[13px] no-active"
          placeholder="e.g. Web Design"
        />
      </div>
      <AddSubTaskForm title="Columns" name="columns" control={control} />

      <button className="w-full rounded-3xl bg-main-purple text-center py-3 font-bold text-sm max-sm:text-[0.85rem] text-white hover:bg-purple-purple-hover">
        {isEditSession ? "Save Changes" : "Create New Board"}
      </button>
    </form>
  );
}

export default AddBoardForm;
