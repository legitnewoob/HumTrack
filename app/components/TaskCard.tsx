import { useDrag } from 'react-dnd';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move"
      onClick={(e) => {
        e.preventDefault();
        onEdit(task);
      }}
    >
      <Card className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors">
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
        </CardHeader>
        {task.description && (
          <CardContent className="text-xs text-gray-400 pt-0">
            {task.description}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default TaskCard;