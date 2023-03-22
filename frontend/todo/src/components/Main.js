import NewTask from "./NewTask.js";
import TaskList from "./TaskList.js";
import AuthContext from "../context/authContext"
import { useContext } from "react"

const Main = ({ tasks, newTaskText, setNewTaskText, setTasks }) => {
  const {user, logout} = useContext(AuthContext);
  return (
    
    <main className="main-container">
      <div className="header">
        <h1>Notes</h1>
        {user ? <span className="logout" onClick={() => logout()}>logout</span> : null}
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
      <NewTask
        newTaskText={newTaskText}
        setNewTaskText={setNewTaskText}
        tasks={tasks}
        setTasks={setTasks}
      />
    </main>
  );
};

export default Main;
