"use client";

import React from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
  moveTask: (taskId: string, newStatus: string) => void;
  openTaskModal: (task: any) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, openTaskModal }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: isDragging ? 1.05 : 1, opacity: isDragging ? 0.7 : 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.03 }}
      className="p-4 bg-gray-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-grab active:cursor-grabbing"
      onClick={() => openTaskModal(task)} // ✅ Fix: Ensure task modal opens
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-300">{task.description}</p>
    </motion.div>
  );
};

export default TaskCard;