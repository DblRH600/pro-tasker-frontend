// creating a custom to to go back to the home page from the sign in / register page
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button 
      className="flex justify-left items-center gap-1"
      style={{background: 'none'}}
      onClick={() => navigate("/")}>
        <ArrowLeftEndOnRectangleIcon className="w-100% h-8" />
        Back
      </button>
    </div>
  );
}

export default BackButton;
