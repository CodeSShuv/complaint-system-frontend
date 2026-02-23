import { useState, useContext } from "react";
import userContext from "../../context/UserContext";
export default function SidePanel({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(userContext);
  const menu = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: "📊",
    },

    {
      key: "complaints",
      label: "Complaints",
      icon: "📊",
    },
    {
      key: "staff",
      label: "Create Admin",
      icon: "👥",
    },
    {
      key: "user",
      label: "Manage Users",
      icon: "👥",
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full
          ${collapsed ? "w-20" : "w-64"}
          bg-white/90 backdrop-blur-md shadow-lg border-r border-white/30
          transform transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6">
          {!collapsed && (
            <div className="text-lg font-semibold text-slate-800">
              CMS Admin
            </div>
          )}

          {/* Collapse Button (Desktop Only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-2 rounded hover:bg-slate-200 transition"
          >
            {collapsed ? "➡" : "⬅"}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 mt-4">
          {menu.map((item) => {
            if (item.key === "staff" && user.role !== "Super Admin") {
              return null; // hide "Create Admin" from non-Super Admins
            }
            return <button
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
                setSidebarOpen(false); // auto close mobile
              }}
              className={`
                w-full flex items-center gap-3 px-6 py-3 my-1
                rounded-lg transition
                ${activePage === item.key
                  ? "bg-slate-300 font-semibold shadow text-slate-900"
                  : "text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          })}
        </nav>
      </aside>
    </>
  );
}
