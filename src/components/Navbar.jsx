// NavBar component
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

function NavBar() {
  // destructured assignments to extra the specific values for the currentUser & logout function
  const { currentUser, logout, loading } = useUser();
  if (loading) {
    return <div className="nav-bar">Loading...</div>
  }

  return (
    <nav className="navbar-container flex gap-5 mx-auto">
      <div className="nav-bar flex gap-5 mx-auto">
        {/* <NavLink to="/">Home</NavLink> */}
        {/* <NavLink to="/about">About</NavLink> */}
        {/* <NavLink to=""></NavLink> */}
      </div>

      {/* conditional rendering for navbar configuration */}
      {currentUser ? (
        <div className="navbar">
          <span className="greet">{currentUser?.username}, Hello There!</span>
          <NavLink to="*">User Dashboard</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          {/* <NavLink to="/tasks">Tasks</NavLink> */}
          <NavLink to="/about">About</NavLink>
          <NavLink to="*">
            <i className="ri-settings-5-line"></i>
          </NavLink>
          <button
            className="logout-btn"
            onClick={logout}
            style={{ background: "none" }}
          >
            <i className="ri-logout-circle-r-line"></i>
            Log Out
          </button>
        </div>
      ) : (
        <div className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/signin">Login</NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
