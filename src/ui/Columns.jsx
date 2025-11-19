import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

function Columns({ column, color, tasks }) {
  const filterTasks = tasks.filter((tk) => tk.status === column);

  const { setNodeRef } = useDroppable({
    id: column,
  });

  const tagColor = color;

  return (
    <div className=" max-sm:w-[270px] w-[300px] snap-center flex-shrink-0 h-full">
      <div className="flex items-center gap-2 py-6">
        <div
          style={{ backgroundColor: tagColor }}
          className={`w-4 h-4 rounded-full`}
        ></div>
        <h1 className="text-[0.68rem] text-medium-grey font-bold tracking-[0.13rem]">
          {column.toUpperCase()} <span>({filterTasks.length})</span>
        </h1>
      </div>

      <div
        ref={setNodeRef}
        className="grid grid-cols-1 gap-5 w-full min-h-[100px]"
      >
        {filterTasks.map((tk) => (
          // <TaskCard />
          <TaskCard task={tk} key={tk.id} />
        ))}
      </div>
    </div>
  );
}

export default Columns;
