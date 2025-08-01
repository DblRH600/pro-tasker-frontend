// this page is used to create and diplay projects and associated tasks
import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import InviteButton from "../components/InviteButton";
import { useNavigate } from "react-router-dom";
// import LogOutButton from "../components/LogOutButton";
// import AddButton from "../components/AddButton";

function ProjectPage() {
  // state inputs for navigation & project data
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projs, setProjs] = useState([]);
  const [projDueDate, setProjDueDate] = useState("");
  const [projStatus, setProjStatus] = useState("Discovery");
  const [editProj, setEditProj] = useState(false);
  const [editProjId, setEditProjId] = useState(null);

  // used to authenticate token & fetch existing projs from DB
  useEffect(() => {
    const token = localStorage.getItem("pt-token");
    console.log(token);

    // check for token, then fetch proj from backend
    if (token) {
      const fetchProjs = async () => {
        // try / catch block for error handling when sending request to the backend using axios
        try {
          // parse token & embed in Bearer format & header assists w/ backend verification
          const res = await backendClient.get("/projects", {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("pt-token")
              )}`,
            },
          });

          // store proj data after successful response
          setProjs(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      // load proj data when component mounts
      fetchProjs();
    }
  }, []);

  // redirects to task page when button is clicked to add task to proj
  const handleTask = (task, projectId) => {
    console.log("Add a task to project", projectId);
    navigate("/tasks", { state: { taskId: task._id, projectId: projectId } });
  };

  // handle edit button clicks and proj data updates
  const handleProjEdit = (project) => {
    if (editProj && editProjId === project._id) {
      // cancel edit mode
      setEditProj(false);
      setEditProjId(null);
      setName("");
      setDescription("");
      setProjDueDate("");
      setProjStatus("Discovery");
    } else {
      // edit mode
      setEditProj(true);
      setEditProjId(project._id);
      setName(project.name);
      setDescription(project.description);
      setProjDueDate(project.projDueDate?.slice(0, 10));
      setProjStatus(project.status || "Discovery");
    }
  };

  // handle form submission -- sends data to backend
  const handleSubmit = async (e) => {
    // prevent default browser behavior
    e.preventDefault();

    // try / catch w/ condition branching for create|edit modes
    try {
      if (editProj && editProjId) {
        // if edit mode, send put request so state values can be updated & sent to backend
        const res = await backendClient.put(
          `/projects/${editProjId}`,
          {
            name,
            description,
            projectDueDate: projDueDate,
            status: projStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("pt-token")
              )}`,
            },
          }
        );

        // update local proj array(s) displayed with updated branch
        setProjs((prev) =>
          prev.map((proj) => (proj._id === editProjId ? res.data : proj))
        );

        // cancel edit mode and clear form
        setEditProj(false);
        setEditProjId(null);
      } else {
        // if create mode, send post request to add state values to backend and create project
        const res = await backendClient.post(
          "/projects",
          {
            name,
            description,
            projectDueDate: projDueDate,
            status: projStatus,
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

        // add new proj array to rendered list for display
        setProjs((prev) => [...prev, res.data]);
      }

      // clear form after successful submission
      setName("");
      setDescription("");
      setProjDueDate("");
      setProjStatus("Discovery");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="proj-container">
        <div className="proj-header">
          <h1>Project Details</h1>
        </div>

        <form
          className="proj-details flex flex-col my-5 gap-2 items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" />
          <input
            type="text"
            title={name}
            name="name"
            placeholder="Project Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description" />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Project Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <label htmlFor="status" />
            <select
              name="status"
              value={projStatus}
              onChange={(e) => setProjStatus(e.target.value)}
            >
              <option value="Discovery">Discovery</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <label htmlFor="dueDate" />
            <input
              type="date"
              name="dueDate"
              value={projDueDate}
              onChange={(e) => setProjDueDate(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value={editProj ? "Update Project" : "Create Project"}
          />
        </form>
        <hr />

        <div className="proj-display">
          {/* Array.isArray used to validate proj arrays before it can render */}
          {Array.isArray(projs) && projs.length > 0 ? (
            <>
              <h2>Projects</h2>
              {/* iterate over each proj in projs */}
              {projs.map((proj) => (
                <div key={proj._id}>
                  <div>
                    <h3>{proj.name}</h3>
                    <p>{proj.description}</p>
                    {/* display readable date in easy to read format if date exists */}
                    {proj.createdAt && (
                      <p>
                        <strong>Created:</strong>{" "}
                        {new Date(proj.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div>
                    {/* display detail proj info */}
                    {proj.projectDueDate && (
                      <p>
                        <strong>Due:</strong>{" "}
                        {new Date(proj.projectDueDate).toLocaleDateString()}
                      </p>
                    )}
                    {proj.status && (
                      <p>
                        <strong>Status:</strong> {proj.status}
                      </p>
                    )}
                  </div>

                  {proj.user && (
                    <p>
                      <strong>Project Owner:</strong>{" "}
                      {typeof proj.user === "object"
                        ? proj.user.username
                        : proj.user}
                    </p>
                  )}
                  <div>
                    {/* triggers handleProjEdit logic: change proj in & out of edit mode */}
                    <InviteButton />
                    <button
                      onClick={() => handleProjEdit(proj)}
                      style={{ background: "none" }}
                    >
                      <i className="ri-pencil-ruler-2-line"></i>
                      {editProj && editProjId === proj._id ? "Cancel" : "Edit"}
                    </button>
                    {/* triggers navigation over to task page to create tasks */}
                    <button
                      style={{ background: "none" }}
                      onClick={() => handleTask({}, proj._id)}
                    >
                      <i className="ri-function-add-fill pr-1"></i>
                      Add Task
                    </button>
                    
                  </div>

                  <div>
                    {/* checks for task array w/ optional chaining to minimize runtime errors  */}
                    {proj.tasks?.length > 0 && (
                      <div>
                        <h4>Tasks:</h4>
                        <ul>
                          {/* map (iterate) over each array & return each task array*/}
                          {proj.tasks.map((task) => (
                            <li
                              key={task._id}
                              onClick={() => handleTask(task, proj._id)}
                            >
                              <strong>{task.title}</strong> - {task.status}
                              {task.taskDueDate && (
                                <>
                                  {" "}
                                  (Due:{" "}
                                  {new Date(
                                    task.taskDueDate
                                  ).toLocaleDateString()}
                                  )
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            // conditional feedback: if there are no existing projs return comment
            <p>No projects yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
