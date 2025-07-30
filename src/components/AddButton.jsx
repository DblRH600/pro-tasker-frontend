// add | create button
import { useNavigate } from "react-router-dom";

function AddButton() {
  return (
    <button className="add-task">
      <i class="ri-function-add-fill"></i>
      Add
    </button>
  );
}

export default AddButton;
