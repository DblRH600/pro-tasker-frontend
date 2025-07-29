// sign up or login page
import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const res = await backendClient.post("/users/login", formData);
      console.log(res.data);

      localStorage.setItem("pt-token", JSON.stringify(res.data.token));

      navigate("/landing");
    } catch (error) {
      console.log(error);

      //   check for error response that user info does not exist
      const message = error?.response?.data.error || "";

      if (message === "user not found") {
        navigate("/register");
      } else {
        alert("Login Failed. Please try again.");
      }
    }
  };

  return (
    <main>
      <h1>Sign In Page</h1>

      <form
        className="flex flex-col my-3 gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <h2>Sign In</h2>
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

        <input type="submit" value="Log In" />
      </form>

      <p>
        Do not have an account?{" "}
        <button onClick={() => navigate("/register")}>Create Account</button>
      </p>
    </main>
  );
}

export default SignInPage;
