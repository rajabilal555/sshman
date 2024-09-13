import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Settings, Shield, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {};

function Navigation({}: Props) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-2xl font-bold">SSHMan</h1>
      <nav className="flex space-x-4">
        <NavLink to="/">
          <Button variant="ghost">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </NavLink>
        {/* <NavLink to="/users">
          <Button variant="ghost">
            <Users className="w-4 h-4 mr-2" />
            Users
          </Button>
        </NavLink> */}
        <NavLink to="/settings">
          <Button variant="ghost">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;
