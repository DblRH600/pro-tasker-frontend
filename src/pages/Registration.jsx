// this page is used to either create an account or log in
import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await backendClient.post("/users/register", formData);
      console.log(res.data);

      localStorage.setItem("pt-token", JSON.stringify(res.data.token));

      navigate("/landing");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <h1>Create Account</h1>

      <form
        className="flex flex-col my-3 gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <h2>Please fill out the following</h2>
        <label htmlFor="username" />
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="email" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input type="submit" value="Create Account" />
      </form>
    </main>
  );
}

export default RegistrationPage;
