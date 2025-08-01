// a context created to manage the user's state
// credit to Abe Tavarez for providing / assisting with the UserContext
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendClient } from "../client/backendClient";

const UserContext = createContext({ currentUser: null });

// wraps section(s) to give access to shared user state values
export const UserProvider = ({ children }) => {
  // state variables to track user session and navigation fro conditional rendering
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // check for stored token in order to fetch current user data
  useEffect(() => {
    // retrieve token from localstorage
    const token = JSON.parse(localStorage.getItem("pt-token"));
    console.log(token, "from userContext");

    // skip fetch if no token is found
    if (token) {
      backendClient
        .get("/projects", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("pt-token")
            )}`,
          },
        })
        .then((res) => {
          setCurrentUser(res.data);
        });
    }

    const fetchUser = async () => {
      // retrieve token from localstorage
      const token = JSON.parse(localStorage.getItem("pt-token"));
      console.log(token, "from userContext");

      // try / catch block to safely handle fetch request
      try {
        const res = await fetch(`${backendClient}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // handle failed fetch response
        if (!res.ok) throw new Error("Failed to fetch user");

        // converts response to json format
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (error) {
        // log error, then remove invalid token and reset user
        console.error(error);
        localStorage.removeItem("pt-token");
        setCurrentUser(null);
      } finally {
        // whether or not fetch succeeds, update loading flag
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // logout function -- clears token and resets the state and reroutes to home page
  const logout = () => {
    localStorage.removeItem("pt-token");
    setCurrentUser(null);
    navigate("/");
  };

  // bundles relevant state and functions into a single object
  // helps w/ cross component sharing w/o prop drilling
  const values = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    logout,
  };

  // wraps component tree w/ context provider
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

// custom hook providees clean, reusable way to access context
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export default UserContext;
