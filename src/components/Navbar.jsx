import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";
import alertContext from "../context/AlertContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user, setUser } = useContext(userContext);
  const alertContextOptions = useContext(alertContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    setUser(null);
    alertContextOptions.setAlertOptions({
      msg: "User Logged Out.",
      type: "warning",
    });
  };
  useEffect(() => {
    return () => {};
  }, [user]);
  return (
    <>
      <nav
        className="flex items-center justify-between px-6 py-4 shadow fixed w-screen"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="text-2xl font-bold text-white">CMS</div>

        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 rounded-md"
                  : "text-gray-600 hover:text-purple-600"
              }
            >
              Home
            </NavLink>
          </li>
          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }
                >
                  Login
                </NavLink>
              </li>
              {/* <li>
                {" "}
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }
                >
                  Register
                </NavLink>
              </li> */}
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/user-dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }
                >
                  User Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/complains"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }
                >
                  Complains
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* <li><a href="#" className="hover:text-blue-600">Contact</a></li> */}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
