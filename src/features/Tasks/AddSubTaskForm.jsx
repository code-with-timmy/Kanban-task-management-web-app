import { useFieldArray } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

function AddSubTaskForm({ title, name, control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  if (!fields) return null;

  function handleAddNewArrayField() {
    if (fields.length >= 5) return;
    append({ value: "" });
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-input-heading text-[0.83rem] font-semibold">
        {title}
      </h1>

      <div className="flex flex-col gap-2 h-fit w-full">
        {fields.map((field, index) => (
          <div
            className="flex flex-row items-center gap-2 w-full"
            key={field.id}
          >
            <div className="relative w-full">
              <input
                {...control.register(`${name}.${index}.value`, {
                  required: "Can't be empty",
                })}
                defaultValue={field.value}
                type="text"
                className={`w-full border-[1px] text-[16px]  ${
                  errors?.[name]?.[index]?.value
                    ? "border-[#EA5555]"
                    : "border-[#828FA3]/25"
                } rounded-[0.26rem] px-3 py-2 placeholder:text-heading/25 md:text-[13px] bg-white-bg text-heading placeholder:text-[0.8rem] no-active`}
                placeholder="e.g. Make coffee"
              />
              {errors?.[name]?.[index]?.value && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EA5555] text-[0.75rem] font-medium pointer-events-none">
                  {errors[name][index].value.message}
                </span>
              )}
            </div>

            <button type="button" onClick={() => remove(index)}>
              <IoCloseSharp
                className={` text-3xl font-extrabold ${
                  errors?.[name]?.[index]?.value
                    ? "text-[#EA5555]"
                    : "text-medium-grey"
                } `}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddNewArrayField}
        className="rounded-3xl font-bold text-main-purple bg-sub-btn flex items-center justify-center py-3 mt-1"
      >
        <FaPlus className="text-[0.7rem]" />
        <span className="text-sm max-sm:text-[0.85rem]">Add New {title}</span>
      </button>
    </div>
  );
}

export default AddSubTaskForm;
