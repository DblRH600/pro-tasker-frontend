// this is the page seen with user (default) access
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendClient } from "../client/backendClient";
import { useUser } from "../context/UserContext";

function UserDashboardPage() {
  // state inputs for nagivation and user data
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("userdashboard paramid: ", id);
  const [user, setUser] = useState(null);
  const [projs, setProjs] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("pt-token");
    console.log(token);

    const fetchUser = async () => {
      try {
        const res = await backendClient.get("/users/me/landing", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("pt-token")
            )}`,
          },
        });

        setUser(res.data.user);
        setProjs(res.data.projects);
        setTasks(res.data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const switchToProj = (projectId) => navigate(`/projects/${projectId}`);
  const switchToTask = (taskId) => navigate(`/tasks/${taskId}`);

  return (
    <div>
      <h1>Greetings {user?.username}</h1>
      <div className="user-container">
        <section className="proj-sect">
          <h2>Your Projects</h2>
          <ul>
            {projs.map((proj) => (
              <li key={proj._id} onClick={() => switchToProj(proj._id)}>
                <h3>{proj.name}</h3>
                <p>
                  <strong>Status:</strong> {proj.status}
                </p>
                <p>
                  <strong>Due:</strong>{" "}
                  {new Date(proj.dueDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section className="task-sect">
          <h2>Your Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task._id} onClick={() => switchToTask(task._id)}>
                <h3>{task.title}</h3>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <p>
                  <strong>Due:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default UserDashboardPage;
