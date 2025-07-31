// this page is used to create and display tasks
import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import { useNavigate, useLocation } from "react-router-dom";

function TaskPage() {
  // state inputs for navigation & tasks data
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [editTask, setEditTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const { projectId, taskId } = location.state || {};
  console.log("projectId", projectId);

  // used to authenticate token & fetch existing tasks from DB
  useEffect(() => {
    const token = localStorage.getItem("pt-token");
    console.log(token);

    if (token) {
      const fetchTasks = async () => {
        // try / catch block for error handling when sending request to backend
        try {
          // parse token & embed in Bearer format & header assists w/ backend verification
          const res = await backendClient.get(`/tasks/${projectId}/tasks`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("pt-token")
              )}`,
            },
          });

          // store task data after successful response
          setTasks(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      // load task data when component mounts
      fetchTasks();
    }
  }, [projectId]);

  //   handle edit button clicks and task data updates
  const handleTaskEdit = (task) => {
    if (editTask && editTaskId === task._id) {
      // cancel edit mode
      setEditTask(false);
      setEditTaskId(null);
      setTitle("");
      setDescription("");
      setTaskDueDate("");
      setTaskStatus("To Do");
    } else {
      // edit mode
      setEditTask(true);
      setEditTaskId(task._id);
      setTitle(task.title);
      setDescription(task.description);
      setTaskDueDate(task.taskDueDate?.slice(0, 10));
      setTaskStatus(task.status || "To Do");
    }
  };

  //   handle task deletion
  const handleTaskDelete = async (taskId) => {
    try {
      await backendClient.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("pt-token")
          )}`,
        },
      });

      // remove task
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  // handle form submission -- sends data to backend
  const handleSubmit = async (e) => {
    // prevetn default browser behavior
    e.preventDefault();

    // try / catch w/ condition branching for create|edit modes
    try {
      if (editTask && editTaskId) {
        // if edit mode, send put request so state values can be updated & sent to backend
        const res = await backendClient.put(
          `/tasks/${editTaskId}`,
          {
            title,
            description,
            taskDueDate: taskDueDate,
            status: taskStatus,
            project: projectId,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("pt-token")
              )}`,
            },
          }
        );

        // update local task array(s) displayed w/ updated branch
        setTasks((prev) =>
          prev.map((task) => (task._id === editTaskId ? res.data : task))
        );

        // cancel edit mode and clear form
        setEditTask(false);
        setEditTaskId(null);
      } else {
        // if create mode, send post request to add state values to backend to create task
        console.log("Creating task for projectId:", projectId);

        const res = await backendClient.post(
          `/tasks/${projectId}/tasks`,
          {
            title,
            description,
            taskDueDate: taskDueDate,
            status: taskStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("pt-token")
              )}`,
            },
          }
        );

        console.log(res);

        // add new task array to rendered list for display
        setTasks((prev) => [...prev, res.data]);
      }

      // clear form after successful submission
      setTitle("");
      setDescription("");
      setTaskDueDate("");
      setTaskStatus("To Do");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="task-container">
        <div className="task-header">
          <h1>Tasks Details</h1>
        </div>

        <form
          className="task-details flex flex-col my-5 gap-2 items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="title" />
          <input
            type="text"
            value={title}
            name="title"
            placeholder="Enter Task Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description" />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Task Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <label htmlFor="status" />
            <select
              name="status"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <label htmlFor="dueDate" />
            <input
              type="date"
              name="dueDate"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />
          </div>

          <div>
            <input
              type="submit"
              value={editTask ? "Update Task" : "Create Task"}
            />
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="cancel-btn"
              style={{ background: "none" }}
            >
              Cancel
            </button>
          </div>
        </form>
        <hr />

        <div className="task-display">
          {/* Array.isArray used to validate task arrays before it can render */}
          {Array.isArray(tasks) && tasks.length > 0 ? (
            <>
              <h2>Tasks</h2>
              {/* iterate over each task in tasks */}
              {tasks.map((task) => (
                <div key={task._id}>
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    {/* display readable date in easy to read format if date exists */}
                    {task.createdAt && (
                      <p>
                        <strong>Created:</strong>{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* triggers handleTaskEdit logic: takes task in & out of edit mode */}
                    <button
                      onClick={() => handleTaskEdit(task)}
                      style={{ background: "none" }}
                    >
                      <i class="ri-pencil-ruler-2-line"></i>
                      {editTask && editTaskId === task._id ? "Cancel" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleTaskDelete(task._id)}
                      style={{
                        background: "none",
                        color: "red",
                        marginLeft: "1rem",
                      }}
                    >
                      <i className="ri-delete-bin-6-line"></i>
                      Delete
                    </button>
                    {/* display detail task info */}
                    {task.taskDueDate && (
                      <p>
                        <strong>Due:</strong>{" "}
                        {new Date(task.taskDueDate).toLocaleDateString()}
                      </p>
                    )}
                    {task.status && (
                      <p>
                        <strong>Status:</strong> {task.status}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            // conditional feedback: if there are no existing projs return comment
            <p>No Tasks Created.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskPage;
