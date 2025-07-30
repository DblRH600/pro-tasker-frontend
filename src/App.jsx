import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import HomePage from "./pages/Home";
import RegistrationPage from "./pages/Registration";
import AdminDashboardPage from "./pages/AdminDashboard";
import UserDashboardPage from "./pages/UserDashboard";
import UserProfilePage from "./pages/UserProfile";
import ProjectPage from "./pages/Project";
import AboutPage from "./pages/About";
import SignInPage from "./pages/SignIn";
import Footer from "./components/Footer";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* Nice to Have */}
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/landing" element={<UserDashboardPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        {/* Nice to Have */}
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
