import "./App.css";
import Main from "./components/Main";
import Login from "./components/Login";
import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import TaskPage from "./components/TaskPage";
import api from "./api/api";
import { useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import AuthContext from "./context/authContext";
import Register from "./components/Register";
import OTP from "./components/OTP";

function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        };
        const response = await api.get("tasks/", {
          withCredentials: true,
          headers: headers,
        });
        const tasks = await response.data;
        setTasks(tasks);
      } catch {
        console.log("Error");
      }
    };
    if (user) {
      console.log(user);
      fetchTask();
    } else {
      setTasks([]);
    }
  }, [location.pathname, location.search, navigate, user, authTokens]);

  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route
            path="/"
            element={
              <Main
                tasks={tasks}
                setTasks={setTasks}
                newTaskText={newTaskText}
                setNewTaskText={setNewTaskText}
              />
            }
          />
          <Route
            path="task/:id"
            element={<TaskPage tasks={tasks} setTasks={setTasks} />}
          />
        </Route>
        <Route path="login/" element={<Login />} />
        <Route path="Register/" element={<Register />} />
        <Route path="OTP/" element={<OTP />} />
      </Routes>
    </div>
  );
}

export default App;
