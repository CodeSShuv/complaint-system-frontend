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
    return () => { };
  }, [user]);
  const links = {
    visitor: [
      { name: "login", path: '/login' },
      { name: "register", path: "/register" }
    ],
    student: [
      { name: "Dashboard", path: "/user-dashboard" },
      { name: "My Complaints", path: "/complaints" },
      // { name: "New Complaint", path: "/create" },
    ],
    admin: [
      { name: "Admin Panel", path: "/admin" },
      { name: "All Complaints", path: "/all" },
      { name: "Departments", path: "/departments" },
      { name: "Users", path: "/users" },
    ],
    staff: [
      { name: "Assigned Complaints", path: "/assigned" },
    ],
  };
  // console.log("Navbar Rendered. User:", user);
  return (
    <>
      <nav className="bg-slate-700 text-white p-4 flex justify-between">
        <div className="font-bold text-lg">ComplaintMS</div>
        <div className="flex gap-4">
          {links[user != null ? user.role.toLowerCase() : 'visitor']?.map((link, index) => (
            <NavLink key={index} to={link.path}>
              {link.name}
            </NavLink>
          ))}
          <button className="text-red-300" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  );
};



export default Navbar;
