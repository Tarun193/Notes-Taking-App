import TaskItem from "./TaskItem";
import api from '../api/api'
import AuthContext from "../context/authContext";
import { useContext } from "react";
const TaskList = ({ tasks, setTasks }) => {

  const {authTokens} = useContext(AuthContext);
  const headers = {
    'Content-Type':'application/json',
    'Authorization':'Bearer ' + String(authTokens.access)
  }
  // For checking and unchecking items
  const HandleCheck = async (id) => {
    try{

      const task = tasks.find((task) => task.id === id);
      task.checked = !task.checked
      const response = await api.put("tasks/" + task.id, task, {
        headers: headers
      })
      const tasks_updated = tasks.map((task) => {
        return task.id === id ? response.data : task;
      });
      setTasks(tasks_updated);
    }
    catch{
      console.log("error");
    }
  };

  // Function for Deleting the task
  const HandleDelete = (id) => {
    try{
      const updatedTasks = tasks.filter((task) => task.id !== id);
      api.delete("tasks/"+id, {
        headers: headers
      });
      setTasks(updatedTasks);
    }
    catch{
      console.log("Error");
    }
  };
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          task={task}
          HandleCheck={HandleCheck}
          HandleDelete={HandleDelete}
          key={task.id}
        />
      ))}
    </ul>
  );
};
export default TaskList;
