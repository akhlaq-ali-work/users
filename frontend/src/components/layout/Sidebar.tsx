import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home as HomeIcon,
  Users as UsersIcon,
  ListChecks as LogsIcon,
  LogOut as LogoutIcon,
} from "lucide-react";
import { useLogout } from "@/hooks/useAuth";

const links = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/users", label: "Users", icon: UsersIcon },
  { to: "/logs", label: "Logs", icon: LogsIcon },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/login");
  };

  return (
    <aside className="flex flex-col w-60 h-screen bg-white border-r">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )
            }
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-6">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start bg-red-500 hover:bg-red-700 text-gray-50 hover:text-gray-50"
          onClick={handleLogout}
        >
          <LogoutIcon className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
