import { useState } from "react";

import SidePanel from "./components/SidePanel.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ManageStaff from "./pages/ManageStaff.jsx";

export default function AdminPanel() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "staff":
        return <ManageStaff />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">

      {/* Sidebar */}
      <SidePanel
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Topbar */}
        <div className="md:hidden p-4 bg-white shadow flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>

          <h1 className="font-semibold text-lg capitalize">
            {activePage}
          </h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
