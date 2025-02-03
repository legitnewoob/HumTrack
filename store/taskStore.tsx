import create from "zustand";
import { Task, Status } from "../types";

interface TaskStore {
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: Status) => void;
  addTask: (newTask: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  // Initial state: empty tasks array
  tasks: [],

  // Method to update task status
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    })),

  // Method to add a new task
  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),
}));