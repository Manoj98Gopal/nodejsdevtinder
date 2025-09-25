import { Code, Heart, LogOut, MessageSquare, User, Users } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import ThemeToggle from "./ThemeToggle";
import api from "@/utils/http";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/logout",{});
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-10 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Code className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            DevMatch
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button
            variant={isActive("/feed") ? "default" : "ghost"}
            size="sm"
            asChild
            className={isActive("/feed") ? "glow-button" : ""}
          >
            <Link to="/">
              <Heart className="h-4 w-4 mr-2" />
              Feed
            </Link>
          </Button>

          <Button
            variant={isActive("/connections") ? "default" : "ghost"}
            size="sm"
            asChild
            className={isActive("/connections") ? "glow-button" : ""}
          >
            <Link to="/connections">
              <Users className="h-4 w-4 mr-2" />
              Connections
            </Link>
          </Button>

          <Button
            variant={isActive("/requests") ? "default" : "ghost"}
            size="sm"
            asChild
            className={isActive("/requests") ? "glow-button" : ""}
          >
            <Link to="/requests">
              <MessageSquare className="h-4 w-4 mr-2" />
              Requests
            </Link>
          </Button>

          <Button
            variant={isActive("/profile") ? "default" : "ghost"}
            size="sm"
            asChild
            className={isActive("/profile") ? "glow-button" : ""}
          >
            <Link to="/profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </Button>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
