import type { TaskType } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ChevronRight, Flag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type TaskItemProps = TaskType & {
  onDelete: (id: string) => void;
};

const TaskItem = ({
  id,
  title,
  dueDate,
  priority,
  completed,
  onDelete,
}: TaskItemProps) => {
  const PRIORITY_COLORS: Record<string, string> = {
    high: "text-destructive",
    medium: "text-warning",
    low: "text-success",
    none: "text-foreground",
  };
  const { t } = useTranslation();

  return (
    <Card className="py-6 shadow-none">
      <CardContent className="flex items-center gap-4">
        <Checkbox
          checked={completed}
          onCheckedChange={(checked) => console.log(checked)}
          className="size-6 rounded-full cursor-pointer"
        />
        <Link to={`/task/${id}`} className="flex-1">
          <div className="flex flex-col">
            <span className="text-sm sm:text-xl font-medium">{title}</span>
            <span className="text-sm sm:text-base text-muted-foreground ">
              {t("tasks.dueDate")}: {dueDate}
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Flag
            className={`size-4 sm:size-6 ${
              PRIORITY_COLORS[priority] ?? PRIORITY_COLORS.none
            }`}
          />
          <Button
            size={"icon"}
            className={`bg-transparent hover:bg-transparent cursor-pointer text-foreground`}
            onClick={() => onDelete(id)}
          >
            <Trash2 className="size-4 sm:size-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default TaskItem;
