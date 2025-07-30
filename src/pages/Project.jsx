// this page is used to create projects and tasks
import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import InviteButton from "../components/InviteButton";
import LogOutButton from "../components/LogOutButton";
import AddButton from "../components/AddButton";

function ProjectPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projs, setProjs] = useState([]);

  useEffect(() => {
    const fetchProjs = async () => {
      try {
        const res = await backendClient.get("/projects", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("pt-token")
            )}`,
          },
        });

        setProjs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await backendClient.post(
        "/projects",
        {
          name,
          description,
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

      setName("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="proj-container"></div>
      <div className="proj-header">
        <InviteButton />
        <AddButton />
        <h1>Porject Details</h1>
        <LogOutButton />
      </div>

      <form className="proj-details" onSubmit={handleSubmit}>
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
      </form>

      <div className="proj-display"></div>
    </>
  );
}

export default ProjectPage;
