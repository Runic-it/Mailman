import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Wrench,
  FileCode,
  LineChart,
  Users,
  Shield,
  Settings,
  HelpCircle,
  Mail,
} from "lucide-react";

const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Installation Wizard",
      path: "/installation",
      icon: <Wrench className="h-5 w-5" />,
    },
    {
      name: "Configuration Editor",
      path: "/config",
      icon: <FileCode className="h-5 w-5" />,
    },
    {
      name: "Monitoring",
      path: "/monitoring",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      name: "User Management",
      path: "/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "SSL Certificates",
      path: "/ssl",
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card flex flex-col">
        <div className="p-4 flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Runic Mailman</h1>
        </div>
        <Separator />
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={currentPath === item.path ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Button>
            </Link>
          ))}
        </nav>
        <Separator />
        <div className="p-4 space-y-1">
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-5 w-5" />
              <span className="ml-2">Settings</span>
            </Button>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="h-5 w-5" />
                  <span className="ml-2">Help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Documentation and support resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <p>Runic Mailman v1.0.0</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b flex items-center px-6 bg-card">
          <h2 className="text-lg font-medium">
            {navigationItems.find((item) => item.path === currentPath)?.name ||
              "Dashboard"}
          </h2>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Card className="bg-background border-0 shadow-none">
            <CardContent className="p-0">{children || <Outlet />}</CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
