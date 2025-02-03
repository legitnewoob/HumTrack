"use client";

import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskModal from "@/app/components/TaskModal";
import TaskColumn from "@/app/components/TaskColumn";

const taskStatuses = ["Backlog", "In Progress", "Ongoing", "Review", "Completed"];

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTaskModal = (task: Task | null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = (
    title: string,
    description: string,
    assignedTo: string,
    status: string
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      assignedTo,
      status,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setSelectedTask(null);  // Reset selected task
    setIsModalOpen(false);  // Close modal
  };

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  // const [tasks, setTasks] = useState<Task[]>([]);
  // const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleDeleteTask = (taskId: string) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  //   setSelectedTask(null);  // Reset selected task
  //   setIsModalOpen(false);  // Close modal
  // };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
        {/* Add Task Button & Modal */}
        <div className="flex justify-center mt-10">
          <TaskModal
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            task={selectedTask || undefined}
            handleAddTask={handleAddTask}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>

        <hr className="border-gray-700 my-6 w-full" />

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto px-2">
          {taskStatuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks}
              moveTask={moveTask}
              openTaskModal={openTaskModal}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;