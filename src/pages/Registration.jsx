// this page is used to either create an account or log in
import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import { useNavigate } from "react-router-dom";
// import HomeButton from "../components/HomeButton";

function RegistrationPage() {
  // state inputs for navigation & login/create acc functions
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ensures controlled component behavior while updating form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default browser behavior

    try {
      // sends form data to register/create account
      const res = await backendClient.post("/users/register", formData);
      console.log(res.data);

      // store token on client side for authentication
      localStorage.setItem("pt-token", JSON.stringify(res.data.token));

      // route to 'User Dashboard' upon successful account creation
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="create-acc-container" id="create-acc-container">
      {/* <HomeButton /> */}
      <h1 className="create-acc-header">Create Account</h1>

      <form
        className="create-acc-form flex flex-col my-3 gap-2 items-center"
        id="create-acc-form"
        onSubmit={handleSubmit}
      >
        <h2 className="create-acc-text">Please fill out the form below to create an account</h2>
        <label htmlFor="username"/>
        {/* controlled data input that maps formData */}
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

        <input type="submit" value="Create Account" id="login-btn" />
      </form>

      {/* custom button to redirect to sign in page from create account page */}
      <p className="create-acc-quest">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/signin")}
          style={{ background: "none" }}
          className="signin-create-btn"
        >
          LogIn
        </button>
      </p>
    </main>
  );
}

export default RegistrationPage;
