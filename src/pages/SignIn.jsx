// sign up or login page
import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errortext, setErrorText] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default functional behavior
    setErrorText(""); // clear previous error; if any

    try {
      const res = await backendClient.post("/users/login", formData);
      console.log(res.data);

      localStorage.setItem("pt-token", JSON.stringify(res.data.token));

      navigate("/landing");
    } catch (error) {
      console.log(error);

      //   check for error response that user info does not exist
      const message = error?.response?.data.error || "";

      if (message === "Cannot find User") {
        navigate("/register");
      } else {
        setErrorText("Login Failed. Please try again.");
      }
    }
  };

  return (
    <main>
      <HomeButton />
      <h1>LogIn</h1>

      {errortext && <p>{errortext}</p>}

      <form
        className="flex flex-col my-3 gap-2 items-center"
        onSubmit={handleSubmit}
      >
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

        <input type="submit" value="LogIn" />
      </form>

      <p>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          style={{ background: "none" }}
        >
          Create Account
        </button>
      </p>
    </main>
  );
}

export default SignInPage;
