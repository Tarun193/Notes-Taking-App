import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/authContext";

const TaskPage = ({ tasks, setTasks}) => {
  const {authTokens} = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const task = tasks.find((task) => task.id.toString() === id);
  const [newTask, setNewTask] = useState(task.task);
  const [newTaskDesc, setNewTaskDesc] = useState(task.Description);
  const [editTaskReminder, setEditTaskReminder] = useState(task.reminder);
  const headers = {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${authTokens.access}`
  }

  // Handling the editing of the task
  const HandleEdit = async (e) => {
    const id = task.id;
    e.preventDefault();
    try{
      const updatedTask = {
        ...task,
        task: newTask,
        Description: newTaskDesc,
        reminder: editTaskReminder,
      };
      console.log(authTokens.access);
      const response = await api.put("tasks/" + task.id, updatedTask, {
        headers: headers
      })

      const updatedTasks = tasks.map((task) => {
        return task.id === id ? response.data : task;
      });
      setTasks(updatedTasks);
      navigate("/");
    }
    catch{
      console.log("Error");
    }

  };

  return (
    <main className="main-container">
      <form className="taskEdit-Form" onSubmit={(e) => HandleEdit(e, task)}>
        <input
          type="text"
          name="task"
          id={task.id}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="wrapper">
          <textarea
            name="text"
            value={newTaskDesc}
            placeholder="Description..."
            onChange={(e) => setNewTaskDesc(e.target.value)}
          />
          <select
            id="reminder"
            name="cars"
            value={editTaskReminder}
            onChange={(e) => setEditTaskReminder(e.target.value)}
          >
            <option value="0" disabled="disabled">
              SMS Reminder
            </option>

            <option value="0">No reminder</option>
            <option value="1">Every Hour</option>
            <option value="24">Every Day</option>
            <option value="360">Every 15 Days</option>
            <option value="720">Every Month</option>
          </select>

          <button type="submit" id="taskEditButton">
            Done
          </button>
        </div>
      </form>
    </main>
  );
};

export default TaskPage;
