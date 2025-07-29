import "./App.css";
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage';
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage"
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserProfilePage from "./pages/UserProfilePage"

function App() {
  // const [count, setCount] = useState(0)

  return (
  <>
  
  <Routes>
    <Route path="" element={<HomePage />} />
    <Route path="" element={<RegistrationPage />} />
    {/* Nice to Have */}
    <Route path="" element={<AdminDashboardPage />} />
    <Route path="" element={<UserDashboardPage />} />
    {/* Nice to Have */}
    <Route path="" element={<UserProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
  
  </>
  );
}

export default App;
