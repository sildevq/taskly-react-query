import {
  createTask,
  deleteTask,
  getPaginatedTasks,
  getTask,
  getTasks,
  patchTask,
} from "@/api/tasks";
import type { Filter } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTasksQuery() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
}

export function usePaginatedTasksQuery(page: number, filter: Filter) {
  return useQuery({
    queryKey: ["tasks", page, filter],
    queryFn: () => getPaginatedTasks(page, filter),
  });
}

export function useTaskQuery(id: string) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: (task) => {
      queryClient.setQueryData(["task", task.id], task);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    // 1 параметр - data (ответ от сервера после выполнения запроса), 2 параметр - используемые параметры deleteTask, т.е. только id
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ["task", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

// export function useUpdateTask() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateTask,
//     onSuccess: (task) => {
//       queryClient.setQueryData(["task", task.id], task);
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//     },
//   });
// }

export function usePatchTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchTask,
    onSuccess: (task) => {
      queryClient.setQueryData(["task", task.id], task);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
