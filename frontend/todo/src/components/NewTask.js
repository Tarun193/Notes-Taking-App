import api from "../api/api";
import AuthContext from "../context/authContext";
import { useContext } from "react";

const NewTask = ({ newTaskText, setNewTaskText, setTasks, tasks }) => {

  const {authTokens} = useContext(AuthContext);
  const headers = {
    'Content-Type':'application/json',
    'Authorization':'Bearer ' + String(authTokens.access)
  }

  const HandleTaskSubmission = async (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length - 1 >= 0 ? tasks[tasks.length - 1].id + 1 : 0,
      task: newTaskText,
      Description: "",
      checked: false,
      reminder: 0
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setNewTaskText("");
    try {
      const response = await api.post("tasks/", newTask, {
        headers: headers
      });
      const tempTasks = [...tasks, response.data];
      setTasks(tempTasks);
    } catch {
      console.log("error");
    }
  };

  return (
    <form autocomplete="off"
      action=""
      onSubmit={(e) => {
        HandleTaskSubmission(e);
      }}
    >
      <input
        type="text"
        name="task"
        id="task"
        placeholder="Write your tasks.."
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
    </form>
  );
};

export default NewTask;
