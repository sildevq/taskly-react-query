import TaskList from "@/components/task-list";
import { Button } from "@/components/ui/button";
import type { TaskType } from "@/types";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface TaskDashboardProps {
  tasks: TaskType[];
  onDelete: (id: string) => void;
  setTaskCompletion: (id: string, completed: boolean) => void;
}

const TaskDashboard = ({
  tasks,
  onDelete,
  setTaskCompletion,
}: TaskDashboardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-start">
        <h2 className="text-4xl font-bold">{t("tasks.title")}</h2>
        <Button size={"lg"} onClick={() => navigate("/new")}>
          <Plus className="h-4 w-4" />
          <span>{t("tasks.new")}</span>
        </Button>
      </div>
      <div className="mt-10">
        <TaskList
          tasks={tasks}
          onDelete={onDelete}
          setTaskCompletion={setTaskCompletion}
        />
      </div>
    </>
  );
};
export default TaskDashboard;
