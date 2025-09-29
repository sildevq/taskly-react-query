import TaskList from "@/components/task-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TaskDashboard = () => {
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
        <TaskList />
      </div>
    </>
  );
};
export default TaskDashboard;
