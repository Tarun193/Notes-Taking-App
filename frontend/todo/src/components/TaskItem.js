import { AiOutlineClose, AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const TaskItem = ({ task, HandleCheck, HandleDelete }) => {
  return (
    <li className="Todo-item">
      <Link to={`/task/${task.id}`}>
        <label style={task.checked ? { textDecoration: "line-through" } : null}>
          {task.task}
        </label>
      </Link>
      <div className="action-group">
        <AiOutlineCheck
          className="action"
          onClick={() => {
            HandleCheck(task.id);
          }}
        />
        <Link to={`/task/${task.id}`}>
          <AiOutlineEdit className="action" />
        </Link>
        <AiOutlineClose
          className="action"
          onClick={() => HandleDelete(task.id)}
        />
      </div>
    </li>
  );
};

export default TaskItem;
