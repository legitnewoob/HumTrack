"use client";

import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskModal from "@/app/components/TaskModal";
import TaskColumn from "@/app/components/TaskColumn";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const taskStatuses = ["Backlog", "In Progress", "Ongoing", "Review", "Completed"];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  

  const fetchTasks = async () => {
    if (!session?.user?.email) return;

    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching tasks for user:", session.user.email); // Debug log
      const response = await fetch(`/api/tasks?userId=${session.user.email}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data); // Debug log

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("Invalid data format:", data);
        setTasks([]);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchTasks();
    }
  }, [session]);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const moveTask = (taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
    setIsModified(true); // Mark as modified when task is moved
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks }),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const result = await response.json();
      toast.success(`Successfully updated ${result.modifiedCount} tasks`);
      setIsModified(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setIsModalOpen(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add New Task
          </Button>

          <Button
            onClick={saveChanges}
            disabled={!isModified || isSaving}
            className={`px-6 py-2 text-lg font-semibold rounded-lg transition-all ${
              isModified && !isSaving
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          task={selectedTask}
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}          
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {taskStatuses.map((status) => (
              <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              moveTask={moveTask}
              onEdit={handleEditTask}  // Add this prop
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
}