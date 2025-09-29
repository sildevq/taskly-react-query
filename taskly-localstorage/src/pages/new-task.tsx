import TaskForm from "@/components/task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TaskType } from "@/types";
import { useTranslation } from "react-i18next";

interface NewTaskProps {
  onCreate: (data: Omit<TaskType, "id" | "completed">) => void;
}

const NewTask = ({ onCreate }: NewTaskProps) => {
  const { t } = useTranslation();

  return (
    <Card className="max-w-screen md:max-w-8/12 mx-auto shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("tasks.create.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm onSubmit={onCreate} submitLabelKey="tasks.form.create" />
      </CardContent>
    </Card>
  );
};
export default NewTask;
