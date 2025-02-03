import { useDrop } from 'react-dnd';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TaskCard from './TaskCard';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskColumnProps {
  status: string;
  tasks: Task[];
  moveTask: (taskId: string, status: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, moveTask , onEdit }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      moveTask(item.id, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-80 min-h-[500px] bg-gray-800/50 rounded-lg p-4 ${
        isOver ? 'bg-gray-700/50' : ''
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">{status}</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={onEdit}/>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;