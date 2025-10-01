import TaskForm from "@/components/task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateTask } from "@/hooks/use-tasks";
import type { TaskType } from "@/types";
import { useTranslation } from "react-i18next";

const NewTask = () => {
  const { t } = useTranslation();

  const createTaskMutation = useCreateTask();
  const onSubmit = (data: Omit<TaskType, "id" | "completed">) => {
    createTaskMutation.mutate(data);
  };

  return (
    <Card className="max-w-screen md:max-w-8/12 mx-auto shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("tasks.create.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm onSubmit={onSubmit} submitLabelKey="tasks.form.create" />
      </CardContent>
    </Card>
  );
};
export default NewTask;
