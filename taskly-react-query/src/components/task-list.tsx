import { useState } from "react";
import Tab from "./tab";
import { useTranslation } from "react-i18next";
import TaskItem from "./task-item";
import { useDeleteTask, useTasksQuery } from "@/hooks/use-tasks";

type Filter = "all" | "active" | "completed";
const filters: { value: Filter; labelKey: string }[] = [
  { value: "all", labelKey: "tasks.filters.all" },
  { value: "active", labelKey: "tasks.filters.active" },
  { value: "completed", labelKey: "tasks.filters.completed" },
];

const TaskList = () => {
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const { data: tasks, isLoading } = useTasksQuery();
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  return (
    <>
      <div className="flex gap-4 border-b">
        {filters.map((filter) => (
          <Tab
            key={filter.value}
            label={t(filter.labelKey)}
            isActive={activeFilter === filter.value}
            onClick={() => {
              setActiveFilter(filter.value);
            }}
          />
        ))}
      </div>
      <div className="mt-7">
        <div className="space-y-3">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem {...task} onDelete={() => handleDelete(task.id)} />
            ))
          ) : (
            <h1>0 tasks</h1>
          )}
        </div>
      </div>
    </>
  );
};
export default TaskList;
