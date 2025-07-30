import { useNavigate } from "react-router-dom";

function LogOutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear token from client side
    localStorage.removeItem("pt-token");

    // redirect to home page
    navigate("/");
  };

  return (
    <button className="logout" onClick={handleLogout}>
      <i class="ri-logout-circle-r-line"></i>
      Log Out
    </button>
  );
}

export default LogOutButton;
