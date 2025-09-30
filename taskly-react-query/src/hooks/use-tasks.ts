import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskAPI } from "@/api/tasks";
import type { TaskType } from "@/types";

// Ключи для кэширования
export const TASK_KEYS = {
  all: ["tasks"] as const,
  byId: (id: string) => ["task", id] as const,
};

// Получение списка задач
export function useTasksQuery(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: [TASK_KEYS.all, params],
    queryFn: () => taskAPI.getTasks(params),
  });
}

// Создание задачи
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Partial<TaskType>) => taskAPI.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
    },
  });
}

// Удаление задачи
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
    },
  });
}

// Обновление задачи (PUT)
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: Partial<TaskType> }) =>
      taskAPI.updateTask(id, task),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.byId(variables.id) });
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
    },
  });
}

// Частичное обновление задачи (PATCH)
export function usePatchTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<TaskType> }) =>
      taskAPI.patchTask(id, patch),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.byId(variables.id) });
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
    },
  });
}
