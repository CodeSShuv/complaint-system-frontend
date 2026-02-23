import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";
import alertContext from "../context/AlertContext";
import Cookies from "js-cookie";
import { LogIn, UserPlus, LogOut, LayoutDashboard, MessageCircle } from "lucide-react";
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
      { name: "login", path: '/login', component: (<LogIn size={20} />) },
      {
        name: "register", path: "/register",
        component: <UserPlus size={20} />
      }
    ],
    student: [
      {
        name: "Dashboard", path: "/user-dashboard",
        component: <LayoutDashboard size={20} />
      },
      {
        name: "My Complaints", path: "/complaints",
        component: <MessageCircle size={20} />
      },
      { name: "Change Password", path: "/change-password" },
    ],
    admin: [
      { name: "Change Password", path: "/change-password" },
      // { name: "All Complaints", path: "/all" },
      // { name: "Departments", path: "/departments" },
      // { name: "Users", path: "/users" },
    ],
    "super admin": [
      { name: "Change Password", path: "/change-password" }
    ],
  };
  // console.log("Navbar Rendered. User:", user);
  return (
    <>
      <nav className="bg-slate-700 text-white p-4 flex justify-between">
        <div className="font-bold text-lg">ComplaintMS</div>
        <div className="flex gap-4">
          {links[user != null ? user.role.toLowerCase() : 'visitor']?.map((link, index) => (
            <NavLink key={index} to={link.path} title={link.name}>
              {link.component}
              {/* {link.name} */}
            </NavLink>
          ))}
          {user && <button className="text-red-300" onClick={handleLogout} title="Logout">
            <LogOut />
          </button>}
        </div>
      </nav>
    </>
  );
};



export default Navbar;
