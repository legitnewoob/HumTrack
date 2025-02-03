"use client";

import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";

interface TaskColumnProps {
  status: string;
  tasks: { id: string; title: string; description: string; status: string }[];
  moveTask: (taskId: string, newStatus: string) => void;
  openTaskModal: (task: any) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, moveTask, openTaskModal }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <motion.div
      ref={drop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`flex-1 min-w-[250px] bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg transition ${
        isOver ? "bg-gray-700 scale-105" : ""
      }`}
    >
      <h2 className="text-lg font-semibold text-center border-b border-gray-700 pb-2">
        {status}
      </h2>
      <div className="mt-4 space-y-4">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard key={task.id} task={task} moveTask={moveTask} openTaskModal={openTaskModal} />
          ))}
        {tasks.filter((task) => task.status === status).length === 0 && (
          <p className="text-gray-400 text-sm text-center">No tasks yet</p>
        )}
      </div>
    </motion.div>
  );
};

export default TaskColumn;