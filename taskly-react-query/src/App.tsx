import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/layout";
import TaskDashboard from "./pages/task-dashboard";
import Settings from "./pages/settings";
import NewTask from "./pages/new-task";
import EditTask from "./pages/edit-task";
import ScrollToTop from "./utils/scroll-to-top";
import Task from "./pages/task";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      gcTime: 10 * 60 * 1000, // 10 min
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ThemeProvider defaultTheme="dark">
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<TaskDashboard />} />
              <Route path="/new" element={<NewTask />} />
              <Route path="/task/:id" element={<Task />} />
              <Route path="/task/:id/edit" element={<EditTask />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<h1>error</h1>} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
