import TaskForm from "@/components/task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const NewTask = () => {
  const { t } = useTranslation();

  return (
    <Card className="max-w-screen md:max-w-8/12 mx-auto shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("tasks.create.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm onSubmit={() => {}} />
      </CardContent>
    </Card>
  );
};
export default NewTask;
