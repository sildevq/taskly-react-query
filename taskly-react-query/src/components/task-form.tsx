import { useTranslation } from "react-i18next";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import PrioritySelector from "./priority-selector";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface TaskFormProps {
  onSubmit: () => void;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit();

    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="title">{t("tasks.form.taskTitle")}</Label>
        <Input
          type="text"
          id="title"
          placeholder={t("tasks.form.placeholder")}
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
        <Label>{t("tasks.form.priority")}</Label>
        <PrioritySelector />
      </div>
      <div className="flex justify-end mt-9">
        <Button type="submit">{t("tasks.form.save")}</Button>
      </div>
    </form>
  );
};
export default TaskForm;
