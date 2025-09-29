import TaskForm from "@/components/task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTask } from "@/hooks/use-task";
import type { TaskType } from "@/types";
import { useTranslation } from "react-i18next";

interface EditTaskProps {
  onEdit: (id: string, data: Omit<TaskType, "id" | "completed">) => void;
}

const EditTask = ({ onEdit }: EditTaskProps) => {
  const { t } = useTranslation();
  const task = useTask();

  return (
    <Card className="max-w-screen md:max-w-8/12 mx-auto shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("tasks.edit.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm
          onSubmit={(data) => onEdit(task.id, data)}
          submitLabelKey="tasks.form.edit"
          defaultTitle={task.title}
          defaultDueDate={task.dueDate ? new Date(task.dueDate) : undefined}
          defaultDescription={task.description}
          defaultPriority={task.priority}
        />
      </CardContent>
    </Card>
  );
};
export default EditTask;
