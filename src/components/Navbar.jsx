// NavBar component
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

function NavBar() {
  // destructured assignments to extra the specific values for the currentUser & logout function
  const { currentUser, logout, loading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return <div className="nav-bar">Loading...</div>;
  }

  return (
    <nav className="navbar-container">
      {/* top bar for mobile view should always show logout and greeting when logged in */}
      <div className="nav-top">
        <span className="greet">
          {currentUser ? `${currentUser?.username}, Hello There!` : ""}
        </span>

        <div className="navbar-actions">
          {currentUser && (
            <button
              className="logout-btn"
              onClick={logout}
              style={{ background: "none" }}
            >
              <i className="ri-logout-circle-r-line"></i>
              Log Out
            </button>
          )}

          {/* hamburger */}
          <div
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <button>
                <i className="ri-close-line"></i>
              </button>
            ) : (
              <button>
                <i className="ri-align-justify"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="navbar desktop-nav">
        {/* conditional rendering for navbar configuration */}
        {currentUser ? (
          <div className="navbar">
            <NavLink to="*">User Dashboard</NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            {/* <NavLink to="/tasks">Tasks</NavLink> */}
            <NavLink to="/about">About</NavLink>
            <NavLink to="*">
              <i className="ri-settings-5-line"></i>
            </NavLink>
          </div>
        ) : (
          <div className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/signin">Login</NavLink>
          </div>
        )}
      </div>

      {/* mobile nav */}
      {isMenuOpen && (
        <div className="mobile-nav">
          {currentUser ? (
            // onClick function set for each NavLink in mobile menu to help control responsiveness & precision
          <div className="navbar">
            <NavLink to="*" onClick={() => setIsMenuOpen(false)}>User Dashboard</NavLink>
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
            {/* <NavLink to="/tasks">Tasks</NavLink> */}
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="*" onClick={() => setIsMenuOpen(false)}>
              <i className="ri-settings-5-line"></i>
            </NavLink>
          </div>
        ) : (
          <div className="navbar">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="/signin" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
          </div>
        )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
