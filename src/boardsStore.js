// stores/useBoards.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBoards = create(
  persist(
    (set, get) => ({
      boards: [],
      currentBoard: null,

      addNewBoard: ({ id, title, columns }) => {
        const newBoard = {
          id,
          title,
          columns: columns.map((col) => ({ ...col })),
          tasks: [],
        };

        set((state) => ({
          boards: [...state.boards, newBoard],
        }));
      },

      setCurrentBoard: (currentBoardID) => {
        set((state) => ({
          currentBoard:
            state.boards.find((board) => board.id === currentBoardID) || null,
        }));
      },

      addTaskToBoard: (boardId, task) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: [...board.tasks, { ...task }],
                }
              : board
          ),
        }));
      },

      deleteTaskFrmBoard: (boardId, taskId) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.filter((tk) => tk.id !== taskId),
                }
              : board
          ),
        }));
      },

      deleteBoard: (boardId) => {
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== boardId),
        }));
      },

      editTask: (boardId, taskId, data) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.map((tk) =>
                    tk.id === taskId ? { ...tk, ...data } : tk
                  ),
                }
              : board
          ),
        }));
      },

      editBoard: (boardId, data) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, ...data } : board
          ),
        }));
      },

      updateTaskStatus: (boardId, active, over) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.map((t) =>
                    t.id === active ? { ...t, status: over } : t
                  ),
                }
              : board
          ),
        }));
      },

      updateSubtaskChecked: (boardId, taskId, subId, checked) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          subtasks: task.subtasks.map((sub) =>
                            sub.id === subId ? { ...sub, checked } : sub
                          ),
                        }
                      : task
                  ),
                }
              : board
          ),
        }));
      },

      updateTaskInBoard: (boardId, taskId, updatedTask) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.map((t) =>
                    t.id === taskId ? { ...t, ...updatedTask } : t
                  ),
                }
              : board
          ),
        }));
      },
    }),

    {
      name: "kanban-store", // KEY in localStorage
    }
  )
);

export default useBoards;
