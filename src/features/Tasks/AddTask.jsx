import { FaPlus } from "react-icons/fa";
import Modal from "../../ui/Modal";
import AddTaskForm from "./AddTaskForm";
import { useParams } from "react-router-dom";

function AddTask() {
  const { boardId } = useParams();

  return (
    <Modal>
      <Modal.Open opens="task-form">
        <button
          disabled={!boardId}
          className={`flex text-white text-[0.75rem] ${
            !boardId && "opacity-25"
          } max-sm:text-[0.78rem] font-medium hover:bg-purple-purple-hover max-sm:px-[0.84rem] max-sm:py-3  items-center gap-1 bg-main-purple rounded-[1.6rem] px-[1rem] py-3`}
        >
          <FaPlus />
          <span className="max-sm:hidden">Add New Task</span>
        </button>
      </Modal.Open>
      <Modal.Window name="task-form">
        <AddTaskForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddTask() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <button
//         onClick={() => setIsOpenModal((show) => !show)}
//         className="flex text-white text-sm max-sm:text-[0.92rem] max-sm:px-[1.1rem] max-sm:py-3  items-center gap-1 bg-main-purple rounded-[1.6rem] px-4 py-3"
//       >
//         <FaPlus />
//         <span className="max-sm:hidden">Add a new task</span>
//       </button>
//       {isOpenModal && (
//         <Modal>
//           <AddTaskForm />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddTask;
