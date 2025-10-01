import { useState } from "react";
import Tab from "./tab";
import { useTranslation } from "react-i18next";
import TaskItem from "./task-item";
import { useDeleteTask, usePaginatedTasksQuery } from "@/hooks/use-tasks";
import { Button } from "./ui/button";
import type { Filter } from "@/types";

const filters: { value: Filter; labelKey: string }[] = [
  { value: "all", labelKey: "tasks.filters.all" },
  { value: "active", labelKey: "tasks.filters.active" },
  { value: "completed", labelKey: "tasks.filters.completed" },
];

const TaskList = () => {
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const { data } = usePaginatedTasksQuery(page, activeFilter);
  const tasks = data?.data ?? [];
  const pages = data?.pages ?? "?";
  const prev = data?.prev;
  const next = data?.next;

  const deleteTaskMutation = useDeleteTask();

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const handleNext = () => {
    setPage((p) => (next ? p + 1 : p));
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(1, prev - 1));
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
              setPage(1);
            }}
          />
        ))}
      </div>
      <div className="mt-7">
        <div className="space-y-3">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={() => handleDelete(task.id)}
              />
            ))
          ) : (
            <h1>0 tasks</h1>
          )}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Button disabled={!prev} onClick={handlePrev}>
          Prev
        </Button>
        <span>
          {page} / {pages}
        </span>
        <Button disabled={!next} onClick={handleNext}>
          Next
        </Button>
      </div>
    </>
  );
};
export default TaskList;
