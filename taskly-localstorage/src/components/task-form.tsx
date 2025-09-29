import { useTranslation } from "react-i18next";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import PrioritySelector from "./priority-selector";
import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Priority, TaskType } from "@/types";
import { Textarea } from "./ui/textarea";

interface TaskFormProps {
  onSubmit: (data: Omit<TaskType, "id" | "completed">) => void;
  submitLabelKey: string;
  defaultTitle?: string;
  defaultDueDate?: Date | undefined;
  defaultDescription?: string;
  defaultPriority?: Priority;
}

const TaskForm = ({
  onSubmit,
  submitLabelKey,
  defaultTitle = "",
  defaultDueDate = undefined,
  defaultDescription = "",
  defaultPriority = "none",
}: TaskFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(defaultDueDate);
  const [priority, setPriority] = useState<Priority>(defaultPriority);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!title) return;

    onSubmit({
      title,
      dueDate: date?.toISOString().split("T")[0],
      description,
      priority,
    });

    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="title">{t("tasks.form.title")}</Label>
        <Input
          type="text"
          id="title"
          ref={titleRef}
          required
          defaultValue={defaultTitle}
          placeholder={t("tasks.form.titlePlaceholder")}
          className="bg-background"
        />
      </div>
      <div className="flex flex-col gap-3 mt-7">
        <Label htmlFor="date">{t("tasks.form.dueDate")}</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : t("tasks.form.pickDate")}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 mt-7">
        <Label htmlFor="title">{t("tasks.form.description")}</Label>
        <Textarea
          id="description"
          ref={descriptionRef}
          defaultValue={defaultDescription}
          placeholder={t("tasks.form.descriptionPlaceholder")}
          className="bg-background"
        />
      </div>
      <div className="flex flex-col gap-3 mt-7">
        <Label>{t("tasks.form.priority")}</Label>
        <PrioritySelector value={priority} onChange={setPriority} />
      </div>
      <div className="flex justify-end mt-9">
        <Button type="submit">{t(submitLabelKey)}</Button>
      </div>
    </form>
  );
};
export default TaskForm;
