import { useOutletContext } from "react-router-dom";
import { type TaskType } from "../types";

export function useTask() {
  return useOutletContext<TaskType>();
}
