// sign up or login page
import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
// import HomeButton from "../components/HomeButton";

function SignInPage() {
  // state inputs for navigation & login/create acc functions
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errortext, setErrorText] = useState("");

  useEffect(() => {}, []);

  // ensures controlled component bahavior while updating form data
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
      // sends form data to login
      const res = await backendClient.post("/users/login", formData);
      console.log(res.data);

      // store token on client side for authentication
      localStorage.setItem("pt-token", JSON.stringify(res.data.token));

      // store user object to enable session management
      setCurrentUser(res.data.user);

      // will eventually route to 'User Dashboard' upon successful login
      // for now route to projects page
      navigate("/projects");
    } catch (error) {
      console.log(error);

      //  check for error response that user info does not exist
      // optional chaining to safely access nested data
      const message = error?.response?.data.error || "";

      if (message === "Cannot find User") {
        navigate("/register");
      } else {
        setErrorText("Login Failed. Please try again.");
      }
    }
  };

  return (
    <main className="signin-container">
      {/* <HomeButton /> */}
      <h1 className="signin-header">LogIn</h1>

      <form
        className="signin-form flex flex-col my-3 gap-2 items-center"
        onSubmit={handleSubmit}
      >
        {errortext && <p className="signin-err">{errortext}</p>}
        <label htmlFor="email" />
        {/* controlled data input */}
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

        <input type="submit" value="LogIn" id="login-btn" />
      </form>

      {/* custom button to redirect to create account page if no account exists */}
      <p className="signin-quest">
        Don't have an account?{" "}
        <button
          className="signin-create-btn"
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
