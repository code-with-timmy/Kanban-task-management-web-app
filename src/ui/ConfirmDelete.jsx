function ConfirmDelete({ title, name, type, onConfirm, onCloseModal }) {
  const boardMessage = `Are you sure you want to delete the ‘${name}’  board? This action will remove all columns and tasks and cannot be reversed.`;
  const taskMessage = `Are you sure you want to delete the ‘${name}’ task and its subtasks? This action cannot be reversed.`;
  return (
    <div className="w-[400px] max-sm:w-[300px] flex flex-col gap-4 py-3">
      <h1 className="text-[17px] text-[#EA5555] font-bold">{title}</h1>
      <p className="text-[0.75rem] max-sm:text-[0.88rem] text-medium-grey">
        {type === "task" ? taskMessage : boardMessage}
      </p>
      <div className="flex flex-row max-sm:flex-col items-center justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-[#EA5555] hover:bg-[#FF9898] rounded-3xl py-3 w-full px-16 text-[0.78rem] text-heading font-bold"
        >
          Delete
        </button>
        <button
          onClick={onCloseModal}
          className="bg-sub-btn  rounded-3xl py-3 w-full px-16 text-[0.78rem]  text-main-purple font-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
