import axios from "axios";

import type { Filter, PaginatedResponse, TaskType } from "@/types";
import { API_CONFIG } from "./config";
import { v4 as uuidV4 } from "uuid";

// GET
export function getTasks(): Promise<TaskType[]> {
  console.log("All tasks");
  const url = `${API_CONFIG.BASE_URL}/tasks`;
  return axios.get(url).then((res) => res.data);
}

export async function getPaginatedTasks(
  page: number,
  filter: Filter = "all",
  limit = 5
): Promise<PaginatedResponse<TaskType>> {
  console.log("Paginated tasks");

  const url = `${API_CONFIG.BASE_URL}/tasks`;
  const params: Record<string, string | number | boolean> = {
    _page: page,
    _limit: limit,
  };

  if (filter === "active") {
    params.completed = false;
  } else if (filter === "completed") {
    params.completed = true;
  }

  const res = await axios.get(url, { params });

  const totalItems = parseInt(res.headers["x-total-count"], 10);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    first: 1,
    prev: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
    last: totalPages,
    pages: totalPages,
    items: totalItems,
    data: res.data as TaskType[],
  };
}

export function getTask(id: string): Promise<TaskType> {
  console.log("Task");
  const url = `${API_CONFIG.BASE_URL}/tasks/${id}`;
  return axios.get(url).then((res) => res.data);
}

// POST
export function createTask(
  data: Omit<TaskType, "id" | "completed">
): Promise<TaskType> {
  console.log("Create task");
  const newTask: TaskType = { id: uuidV4(), ...data, completed: false };
  const url = `${API_CONFIG.BASE_URL}/tasks`;
  return axios.post(url, newTask).then((res) => res.data);
}

// DELETE
export function deleteTask(id: string): Promise<void> {
  console.log("Delete task");
  const url = `${API_CONFIG.BASE_URL}/tasks/${id}`;
  return axios.delete(url).then(() => {});
}

// // PUT
// export function updateTask({
//   id,
//   data,
// }: {
//   id: string;
//   data: Omit<TaskType, "id" | "completed">;
// }): Promise<TaskType> {
//   console.log("Update task");
//   const url = `${API_CONFIG.BASE_URL}/tasks/${id}`;
//   return axios.put(url, data).then((res) => res.data);
// }

// PATCH
export function patchTask({
  id,
  data,
}: {
  id: string;
  data: Partial<TaskType>;
}): Promise<TaskType> {
  console.log("Patch task");
  const url = `${API_CONFIG.BASE_URL}/tasks/${id}`;
  return axios.patch(url, data).then((res) => res.data);
}
