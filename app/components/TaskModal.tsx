// TaskModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { TASK_STATUSES } from "@/app/constants";

interface TaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  handleAddTask?: (title: string, description: string, assignedTo: string, status: string) => void;
  handleEditTask?: (updatedTask: Task) => void;
  handleDeleteTask?: (taskId: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onOpenChange,
  task,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || "");
  const [status, setStatus] = useState(task?.status || TASK_STATUSES[0]);
  const [adminComments, setAdminComments] = useState(task?.adminComments || "");
  const [employeeComments, setEmployeeComments] = useState(task?.employeeComments || "");

  // Reset form when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignedTo(task.assignedTo);
      setStatus(task.status);
      setAdminComments(task.adminComments || "");
      setEmployeeComments(task.employeeComments || "");
    } else {
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setStatus(TASK_STATUSES[0]);
      setAdminComments("");
      setEmployeeComments("");
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    if (task && handleEditTask) {
      handleEditTask({
        ...task,
        title,
        description,
        assignedTo,
        status,
        adminComments,
        employeeComments,
      });
    } else if (handleAddTask) {
      handleAddTask(title, description, assignedTo, status);
    }

    onOpenChange(false);
  };

  const handleDelete = () => {
    if (task && handleDeleteTask) {
      handleDeleteTask(task.id);
      onOpenChange(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      {/* Add New Task Button - Always visible */}
      <Button
        onClick={() => onOpenChange(true)}
        className={`px-6 py-4 text-xl font-semibold rounded-lg bg-purple-500 hover:bg-purple-600 transition duration-300 flex items-center gap-2 shadow-lg ${task ? 'hidden' : ''}`}
      >
        <Plus className="h-6 w-6" />
        Add New Task
      </Button>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              {task ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white"
            />

            <Textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white"
            />

            <Input
              type="text"
              placeholder="Assigned To (Email or Name)"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white"
            />

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {TASK_STATUSES.map((statusOption) => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Admin Comments"
              value={adminComments}
              onChange={(e) => setAdminComments(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white"
            />

            <Textarea
              placeholder="Employee Comments"
              value={employeeComments}
              onChange={(e) => setEmployeeComments(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white"
            />

            <div className="flex justify-between gap-2">
              {task && handleDeleteTask && (
                <Button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 transition"
                >
                  <Trash className="w-5 h-5 mr-1" />
                  Delete Task
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                className={`bg-blue-500 hover:bg-blue-600 transition ${!task ? 'w-full' : 'flex-1'}`}
              >
                {task ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskModal;