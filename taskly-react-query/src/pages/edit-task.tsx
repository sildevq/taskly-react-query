import TaskForm from "@/components/task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTask } from "@/hooks/use-task";
import { usePatchTask } from "@/hooks/use-tasks";
import type { TaskType } from "@/types";
import { useTranslation } from "react-i18next";

const EditTask = () => {
  const { t } = useTranslation();

  const patchTaskMutation = usePatchTask();

  const { data: task } = useTask();
  if (!task) return null;

  const onSubmit = (data: Omit<TaskType, "id" | "completed">) => {
    patchTaskMutation.mutate({ id: task.id, data });
  };

  return (
    <Card className="max-w-screen md:max-w-8/12 mx-auto shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("tasks.edit.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm
          onSubmit={onSubmit}
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
