// add | create button
import { useNavigate } from "react-router-dom";

function AddButton() {
  return (
    <button className="add-task" style={{background: 'none'}}>
      <i class="ri-function-add-fill pr-1"></i>
      Add
    </button>
  );
}

export default AddButton;
