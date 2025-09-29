import { useState } from "react";
import Tab from "./tab";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useTranslation } from "react-i18next";
import TaskItem from "./task-item";
import type { TaskType } from "@/types";

type Filter = "all" | "active" | "completed";
const filters: { value: Filter; labelKey: string }[] = [
  { value: "all", labelKey: "tasks.filters.all" },
  { value: "active", labelKey: "tasks.filters.active" },
  { value: "completed", labelKey: "tasks.filters.completed" },
];

const TASKS_PER_PAGE = 5;

interface TaskListProps {
  tasks: TaskType[];
  onDelete: (id: string) => void;
  setTaskCompletion: (id: string, completed: boolean) => void;
}

const TaskList = ({ tasks, onDelete, setTaskCompletion }: TaskListProps) => {
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return !task.completed;
    if (activeFilter === "completed") return task.completed;
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * TASKS_PER_PAGE,
    currentPage * TASKS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const delta = 1; // сколько страниц показывать вокруг текущей

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (left > 2) {
      pages.push("ellipsis-left");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push("ellipsis-right");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

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
              setCurrentPage(1);
            }}
          />
        ))}
      </div>
      <div className="mt-7">
        <div className="space-y-3">
          {paginatedTasks.length > 0 ? (
            paginatedTasks
              .slice(0, 5)
              .map((task) => (
                <TaskItem
                  {...task}
                  onDelete={onDelete}
                  setTaskCompletion={setTaskCompletion}
                />
              ))
          ) : (
            <div className="">
              <span className="text-xl text-muted-foreground ">
                {t("tasks.empty")} :(
              </span>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>

              {visiblePages.map((page, index) =>
                typeof page === "number" ? (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
};
export default TaskList;
