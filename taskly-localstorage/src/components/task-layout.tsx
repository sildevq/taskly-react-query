import type { TaskType } from "@/types";
import { Navigate, Outlet, useParams } from "react-router-dom";

interface TaskLayoutProps {
  tasks: TaskType[];
}

const TaskLaoyut = ({ tasks }: TaskLayoutProps) => {
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);

  if (task == null) return <Navigate to={"/"} replace />;
  
  return <Outlet context={task} />;
};
export default TaskLaoyut;
