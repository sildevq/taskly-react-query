import type { TaskType } from "@/types";
import { API_CONFIG } from "./config";

class TaskAPI {
  private createUrl(
    endpoint: string,
    params: Record<string, string | number> = {}
  ) {
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // если ответ пустой (например, у DELETE часто бывает 204 No Content)
    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  // GET
  async getTasks(
    params: Record<string, string | number> = {}
  ): Promise<TaskType[]> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/tasks`, params);
    return this.request<TaskType[]>(url, { method: "GET" });
  }

  // POST
  async createTask(task: Partial<TaskType>): Promise<TaskType> {
    const url = `${API_CONFIG.BASE_URL}/tasks`;
    return this.request<TaskType>(url, {
      method: "POST",
      body: JSON.stringify(task),
    });
  }

  // DELETE
  async deleteTask(id: string): Promise<null> {
    const url = `${API_CONFIG.BASE_URL}/tasks/${id}`;
    return this.request<null>(url, { method: "DELETE" });
  }

  // PUT (обновление полностью)
  async updateTask(id: string, task: Partial<TaskType>): Promise<TaskType> {
    const url = `${API_CONFIG.BASE_URL}/tasks/${id}`;
    return this.request<TaskType>(url, {
      method: "PUT",
      body: JSON.stringify(task),
    });
  }

  // PATCH (обновление частично)
  async patchTask(id: string, patch: Partial<TaskType>): Promise<TaskType> {
    const url = `${API_CONFIG.BASE_URL}/tasks/${id}`;
    return this.request<TaskType>(url, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
  }
}

export const taskAPI = new TaskAPI();
