// NavBar component
import { NavLink } from "react-router-dom";

function NavBar () {

    return (
        <nav className="flex gap-5 mx-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/register">Login | Create</NavLink>
            {/* <NavLink to=""></NavLink> */}
        </nav>
    )
}


export default NavBar