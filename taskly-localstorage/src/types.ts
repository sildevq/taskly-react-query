export type TaskType = {
  id: string;
  title?: string;
  description: string;
  dueDate?: string; // ISO дата, например "2025-09-30"
  priority: "none" | "low" | "medium" | "high";
  completed: boolean;
};
