import type { TaskType } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Flag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePatchTask } from "@/hooks/use-tasks";
import type { CheckedState } from "@radix-ui/react-checkbox";

type TaskItemProps = {
  task: TaskType;
  onDelete: () => void;
};

const TaskItem = ({ task, onDelete }: TaskItemProps) => {
  const PRIORITY_COLORS: Record<string, string> = {
    high: "text-destructive",
    medium: "text-warning",
    low: "text-success",
    none: "text-foreground",
  };
  const { t } = useTranslation();

  const patchTaskMutation = usePatchTask();

  const handleCheck = (checked: CheckedState) => {
    patchTaskMutation.mutate({ id: task.id, data: { completed: checked === true } });
  };

  return (
    <Card className="py-6 shadow-none">
      <CardContent className="flex items-center gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleCheck}
          className="size-6 rounded-full cursor-pointer"
        />
        <Link to={`/task/${task.id}`} className="flex-1">
          <div className="flex flex-col">
            <span className="text-sm sm:text-xl font-medium">{task.title}</span>
            <span className="text-sm sm:text-base text-muted-foreground ">
              {t("tasks.dueDate")}: {task.dueDate}
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Flag
            className={`size-4 sm:size-6 ${
              PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.none
            }`}
          />
          <Button
            size={"icon"}
            className={`bg-transparent hover:bg-transparent cursor-pointer text-foreground`}
            onClick={onDelete}
          >
            <Trash2 className="size-4 sm:size-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default TaskItem;
