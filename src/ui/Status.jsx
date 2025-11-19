import { useState } from "react";
import { Controller } from "react-hook-form";
import { RiArrowDropDownLine } from "react-icons/ri";

import useBoards from "../boardsStore";
import { useParams } from "react-router-dom";

function Status({ title, name, control }) {
  const [showDropOption, setShowDropOption] = useState(false);
  const { boardId } = useParams();

  const boards = useBoards((state) => state.boards);

  const currentBoard = boards.filter((board) => board.id === boardId)[0];

  const options = currentBoard.columns;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options[0].value}
      render={({ field }) => (
        <div className="relative w-full">
          <h1 className="text-input-heading text-[0.77rem] font-semibold mb-2">
            {title}
          </h1>

          <div
            onClick={() => setShowDropOption((show) => !show)}
            className={`w-full border cursor-pointer ${
              showDropOption ? "border-main-purple" : "border-[#828FA3]/25"
            } rounded-[0.26rem] text-sm font-medium text-heading px-2 py-[0.4rem] flex items-center justify-between`}
          >
            <span>{field.value || options[0].value}</span>
            <RiArrowDropDownLine className="text-main-purple text-[1.7rem]" />
          </div>

          {showDropOption && (
            <ul className="absolute w-full z-10 rounded-md bg-background py-3 px-3 flex flex-col gap-4 text-medium-grey text-[0.8rem] shadow-md">
              {options.map((opt) => (
                <li
                  key={opt.value}
                  className="cursor-pointer hover:text-main-purple"
                  onClick={() => {
                    field.onChange(opt.value);
                    setShowDropOption(false);
                  }}
                >
                  {opt.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    />
  );
}

export default Status;
