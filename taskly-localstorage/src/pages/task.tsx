import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTask } from "@/hooks/use-task";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

interface TaskProps {
  onDelete: (id: string) => void;
  setTaskCompletion: (id: string, completed: boolean) => void;
}

const Task = ({ onDelete, setTaskCompletion }: TaskProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useTask();

  const handleDelete = () => {
    onDelete(task.id);
    navigate("/");
  };

  const handleCheck = (checked: CheckedState) => {
    setTaskCompletion(task.id, !!checked);
  };

  return (
    <>
      <h2 className="text-4xl font-bold">{t("task.title")}</h2>
      <p className="mt-4 text-muted-foreground">{t("task.titleDescription")}</p>
      <Card className="mt-7 max-w-screen mx-auto shadow-none">
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleCheck}
                className="size-6 rounded-full cursor-pointer"
              />
              <div className="flex-1">
                <span className="font-bold text-2xl">{task.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate(`/task/${id}/edit`)}
                variant={"secondary"}
              >
                {t("task.edit")}
              </Button>
              <Button onClick={handleDelete}>{t("task.delete")}</Button>
            </div>
          </div>
          <div className="mt-6">
            <span className="text-sm sm:text-base text-muted-foreground">
              {t("task.dueDate")}: {task.dueDate ? task.dueDate : "-"}
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold">{t("task.description")}</h3>
            <p className="mt-6">
              {task.description ? task.description : t("task.emptyDescription")}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default Task;
