import { useParams } from "react-router-dom";
import { useTaskQuery } from "./use-tasks";

export function useTask() {
  const { id } = useParams();

  if (!id) throw new Error("Task ID is required");

  return useTaskQuery(id);
}
