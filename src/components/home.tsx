import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  Mail,
  Server,
  Shield,
  Settings,
  Users,
  Clock,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

const Home = () => {
  // Mock data for server status
  const serverComponents = [
    {
      name: "Postfix",
      status: "running",
      uptime: "14d 6h 32m",
      health: "good",
    },
    {
      name: "Dovecot",
      status: "running",
      uptime: "14d 6h 30m",
      health: "good",
    },
    { name: "Rspamd", status: "running", uptime: "14d 5h 45m", health: "good" },
    {
      name: "ClamAV",
      status: "running",
      uptime: "14d 5h 45m",
      health: "warning",
    },
    { name: "Redis", status: "running", uptime: "14d 6h 32m", health: "good" },
    {
      name: "MariaDB",
      status: "running",
      uptime: "14d 6h 32m",
      health: "good",
    },
  ];

  // Mock data for recent activity
  const recentActivity = [
    { type: "mail", message: "15 new emails processed", time: "5 minutes ago" },
    {
      type: "security",
      message: "3 spam emails blocked",
      time: "10 minutes ago",
    },
    { type: "system", message: "Daily backup completed", time: "1 hour ago" },
    {
      type: "user",
      message: "User john@runic.co.za logged in",
      time: "2 hours ago",
    },
  ];

  // Mock data for installation progress
  const installationProgress = 60;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">Runic Mailman</h2>
          <p className="text-sm text-muted-foreground">
            Mail Server Management
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary"
          >
            <Server className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/installation"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="mr-2 h-4 w-4" />
            Installation Wizard
          </Link>
          <Link
            to="/config"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="mr-2 h-4 w-4" />
            Configuration Editor
          </Link>
          <Link
            to="/monitoring"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Monitoring
          </Link>
          <Link
            to="/users"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="mr-2 h-4 w-4" />
            User Management
          </Link>
          <Link
            to="/ssl"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <Shield className="mr-2 h-4 w-4" />
            SSL Certificates
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Server Online</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">v1.0.0</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="default" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Installation progress card (shown if installation is not complete) */}
          {installationProgress < 100 && (
            <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Installation in Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{installationProgress}%</span>
                  </div>
                  <Progress value={installationProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Your mail server setup is incomplete. Continue with the
                    installation wizard to complete the setup.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/installation">Continue Installation</Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Server status overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Server Status Card */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Server Status</CardTitle>
                <CardDescription>
                  Current status of mail server components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serverComponents.map((component) => (
                    <div
                      key={component.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        {component.health === "good" ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                        )}
                        <div>
                          <p className="font-medium">{component.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Uptime: {component.uptime}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          component.health === "good" ? "default" : "outline"
                        }
                        className={
                          component.health === "good"
                            ? "bg-green-500"
                            : "text-amber-500 border-amber-500"
                        }
                      >
                        {component.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Status
                  </Button>
                  <Button variant="outline" size="sm">
                    Restart All Services
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Quick Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Mail Statistics</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Emails Processed
                    </span>
                    <span className="text-2xl font-bold">124</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Spam Detected</span>
                    <span className="text-2xl font-bold">17</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Users</span>
                    <span className="text-2xl font-bold">8</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Disk Usage</span>
                    <span className="text-2xl font-bold">42%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Reports
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest events from your mail server
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {activity.type === "mail" && (
                          <Mail className="h-5 w-5 text-blue-500" />
                        )}
                        {activity.type === "security" && (
                          <Shield className="h-5 w-5 text-red-500" />
                        )}
                        {activity.type === "system" && (
                          <Server className="h-5 w-5 text-purple-500" />
                        )}
                        {activity.type === "user" && (
                          <Users className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common mail server management tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center p-4"
                  >
                    <Users className="h-6 w-6 mb-2" />
                    <span>Add User</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center p-4"
                  >
                    <Mail className="h-6 w-6 mb-2" />
                    <span>Add Alias</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center p-4"
                  >
                    <Shield className="h-6 w-6 mb-2" />
                    <span>Update SSL</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center p-4"
                  >
                    <Server className="h-6 w-6 mb-2" />
                    <span>Backup</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documentation and Help */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Documentation & Resources</CardTitle>
              <CardDescription>
                Helpful guides and resources for Runic Mailman
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="guides">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="guides">Installation Guides</TabsTrigger>
                  <TabsTrigger value="config">Configuration Help</TabsTrigger>
                  <TabsTrigger value="troubleshooting">
                    Troubleshooting
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="guides" className="pt-4">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        Complete Installation Guide for Ubuntu 22.04
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        Setting Up DNS Records for Your Mail Server
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        Configuring Rspamd for Spam Protection
                      </a>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="config" className="pt-4">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        Postfix Configuration Reference
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        Dovecot IMAP/POP3 Setup Guide
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        MariaDB Database Schema Reference
                      </a>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="troubleshooting" className="pt-4">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        Common Mail Delivery Issues and Solutions
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        Debugging SMTP Authentication Problems
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <span className="mr-2">•</span>
                        Fixing SSL Certificate Errors
                      </a>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Home;
