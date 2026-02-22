import { useEffect, useState, useContext } from "react";
import { Search, Filter, Trash } from "lucide-react";
import userContext from "../../context/UserContext";
import { fetchAllUsers } from "../../api/admin";
import { deleteUserById } from "../../api/admin";
import alertContext from "../../context/AlertContext";
export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const userState = useContext(userContext);
  const { setAlertOptions } = useContext(alertContext);
  useEffect(() => {
    // TODO: Replace with your backend API
    const fetchUsers = async () => {
      try {
        const res = await fetchAllUsers();
        console.log("Fetched users:", res.data);
        setUsers(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);
  const deleteUser = async (userId) => {
    if (userId === userState.user._id) {
      setAlertOptions({
        msg: "You cannot delete your own account.",
        type: "error",
      });
      return;
    }
    try {
      await deleteUserById(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setAlertOptions({
        msg: "User deleted successfully.",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setAlertOptions({
        msg: error.msg || "Failed to delete user.",
        type: "error",
      });
    }
  };

  const filteredUsers = users?.filter((singleUser) => {

    const matchesSearch =
      singleUser.firstname.toLowerCase().includes(search.toLowerCase()) ||
      singleUser.lastname.toLowerCase().includes(search.toLowerCase()) ||
      singleUser.email.toLowerCase().includes(search.toLowerCase());


    if (userState.user.role !== "Super Admin" && singleUser.role === "Super Admin") {
      return false;
    }

    const matchesRole =
      roleFilter === "All" || singleUser.role === roleFilter;

    return matchesSearch && matchesRole;
  });
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Manage Users
          </h1>
          <p className="text-slate-600">
            View and manage all system users (Admin, Staff, Students)
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col md:flex-row justify-between gap-4 mb-6">

          {/* Search */}
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2 w-full md:w-1/2">
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
            <Filter size={18} className="text-slate-500" />
            <select
              className="outline-none bg-transparent"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Student">Student</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                {/* <th className="p-4">Status</th> */}
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.length > 0 ? (
                filteredUsers?.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-slate-100 transition"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${user.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "Staff"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    {/* <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td> */}
                    <td className="p-4">
                      {userState.user.role === "Admin" && user.role === "Super Admin" ? "" :
                        <button
                          onClick={() => {
                            let userId = user._id;
                            deleteUser(userId);
                          }}
                          className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm font-medium transition"
                        >
                          <Trash size={16} />
                          Delete
                        </button>
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}