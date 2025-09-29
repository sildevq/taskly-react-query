import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const Task = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-4xl font-bold">{t("task.title")}</h2>
      <p className="mt-4 text-muted-foreground">{t("task.titleDescription")}</p>
      <Card className="mt-7 max-w-screen mx-auto shadow-none">
        <CardContent>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={false}
                onCheckedChange={(checked) => console.log(checked)}
                className="size-6 rounded-full cursor-pointer"
              />
              <div className="flex-1">
                <span className="font-bold text-sm sm:text-2xl">title</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate(`/task/${id}/edit`)}
                variant={"secondary"}
              >
                {t("task.edit")}
              </Button>
              <Button>{t("task.delete")}</Button>
            </div>
          </div>
          <div className="mt-6">
            <span className="text-sm sm:text-base text-muted-foreground">
              {t("task.dueDate")}: dueDate
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold">{t("task.description")}</h3>
            <p className="mt-6">description</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default Task;
