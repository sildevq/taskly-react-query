import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout";
import TaskDashboard from "./pages/task-dashboard";
import Settings from "./pages/settings";
import NewTask from "./pages/new-task";
import EditTask from "./pages/edit-task";
import ScrollToTop from "./utils/scroll-to-top";
import Task from "./pages/task";
import TaskLaoyut from "./components/task-layout";
import { useLocalStorage } from "./hooks/use-local-storage";
import { v4 as uuidV4 } from "uuid";
import type { TaskType } from "./types";

const queryClient = new QueryClient();

const App = () => {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("TASKS", []);

  const createTask = (data: Omit<TaskType, "id" | "completed">) => {
    const newTask: TaskType = { id: uuidV4(), completed: false, ...data };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };
  const setTaskCompletion = (id: string, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed };
        } else {
          return task;
        }
      })
    );
  };
  const editTask = (id: string, data: Omit<TaskType, "id" | "completed">) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, ...data };
        } else {
          return task;
        }
      })
    );
  };
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ThemeProvider defaultTheme="dark">
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <TaskDashboard
                    tasks={tasks}
                    onDelete={deleteTask}
                    setTaskCompletion={setTaskCompletion}
                  />
                }
              />
              <Route path="/new" element={<NewTask onCreate={createTask} />} />
              <Route path="/task/:id" element={<TaskLaoyut tasks={tasks} />}>
                <Route index element={<Task onDelete={deleteTask} setTaskCompletion={setTaskCompletion} />} />
                <Route
                  path="/task/:id/edit"
                  element={<EditTask onEdit={editTask} />}
                />
              </Route>
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<h1>error</h1>} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};
export default App;
