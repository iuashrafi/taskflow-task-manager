import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import TaskForm from "./components/Task/TaskForm";
import TaskList from "./components/Task/TaskList";
import OnBoarding from "./components/OnBoarding/OnBoarding";
import fetchAPI from "./libs/fetchAPI";
import FullScreenLoading from "./components/Loaders/FullScreenLoading";
import { Toaster } from "react-hot-toast";
import TaskListLoader from "./components/Loaders/TaskListLoader";

const taskInitialState = {
  id: null,
  title: "",
  description: "",
  duedate: "",
};
function App() {
  const [workspace, setWorkspace] = useState(null);
  const [isWorkspaceReady, setIsWorkspaceReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(taskInitialState);

  // Fetch tasks from the database
  const fetchTasks = async () => {
    if (workspace?.id) {
      fetchAPI(`/tasks/${workspace?.id}`)
        .then((data) => setTasks(data))
        .catch((error) =>
          console.log("Error while fetching tasks from db", error)
        );

      // setTimeout(() => {
      setReady(true);
      // }, 4000);
    }
  };

  useEffect(() => {
    // set workspace
    let workspaceData = JSON.parse(localStorage.getItem("workspace"));
    if (workspaceData) {
      setWorkspace(workspaceData);
      console.log("workspace object  = ", workspace);
    }
    setIsWorkspaceReady(true);
  }, []);

  useEffect(() => {
    if (isWorkspaceReady && workspace?.id) {
      fetchTasks();
    }
  }, [isWorkspaceReady, workspace]);

  if (!isWorkspaceReady) {
    return <FullScreenLoading />;
  }
  return (
    <main>
      {!workspace ? (
        <OnBoarding setWorkspace={setWorkspace} />
      ) : (
        <>
          <Navbar workspace={workspace} setWorkspace={setWorkspace} />
          <div className="container mx-auto p-2 lg:p-0">
            <TaskForm
              setTasks={setTasks}
              workspace={workspace}
              task={task}
              setTask={setTask}
              taskInitialState={taskInitialState}
            />
            {!ready && <TaskListLoader />}
            {ready && (
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                workspace={workspace}
                setTask={setTask}
              />
            )}
          </div>
        </>
      )}
      <Toaster position="bottom-center" style />
    </main>
  );
}

export default App;
