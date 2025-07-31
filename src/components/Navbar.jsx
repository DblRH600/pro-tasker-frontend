// NavBar component
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

function NavBar() {
  // destructured assignments to extra the specific values for the currentUser & logout function
  const { currentUser, logout } = useUser();

  return (
    <nav className="flex gap-5 mx-auto">
      <div className="nav-bar flex gap-5 mx-auto">
        {/* <NavLink to="/">Home</NavLink> */}
        {/* <NavLink to="/about">About</NavLink> */}
        {/* <NavLink to=""></NavLink> */}
      </div>

      {/* conditional rendering for navbar configuration */}
      {currentUser ? (
        <div className="nav-bar flex gap-5 mx-auto">
          <span className="greet">{currentUser?.username}, Hello There!</span>
          <NavLink to="/landing">User Dashboard</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          {/* <NavLink to="/tasks">Tasks</NavLink> */}
          <NavLink to="/about">About</NavLink>
          <NavLink to="*">
            <i className="ri-settings-5-line"></i>
          </NavLink>
          <button
            className="logout"
            onClick={logout}
            style={{ background: "none" }}
          >
            <i className="ri-logout-circle-r-line"></i>
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex gap-5 mx-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/signin">Login</NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
