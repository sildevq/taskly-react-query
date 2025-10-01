export type TaskType = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO дата, например "2025-09-30"
  priority: Priority;
  completed: boolean;
};

export type Priority = "none" | "low" | "medium" | "high";

export type Filter = "all" | "active" | "completed";

export interface PaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}
