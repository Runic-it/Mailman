import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Power,
  Settings,
} from "lucide-react";

interface ServiceStatus {
  name: string;
  status: "running" | "stopped" | "error";
  uptime: string;
  lastChecked: string;
}

interface ServerStatusCardProps {
  services?: ServiceStatus[];
  onRestart?: (serviceName: string) => void;
  onReload?: (serviceName: string) => void;
}

const ServerStatusCard: React.FC<ServerStatusCardProps> = ({
  services = [
    {
      name: "Postfix",
      status: "running",
      uptime: "5d 12h 34m",
      lastChecked: "2 minutes ago",
    },
    {
      name: "Dovecot",
      status: "running",
      uptime: "5d 12h 30m",
      lastChecked: "2 minutes ago",
    },
    {
      name: "Rspamd",
      status: "running",
      uptime: "3d 7h 12m",
      lastChecked: "2 minutes ago",
    },
    {
      name: "ClamAV",
      status: "error",
      uptime: "0d 0h 0m",
      lastChecked: "5 minutes ago",
    },
    {
      name: "Redis",
      status: "running",
      uptime: "5d 12h 34m",
      lastChecked: "2 minutes ago",
    },
    {
      name: "MariaDB",
      status: "running",
      uptime: "5d 12h 34m",
      lastChecked: "2 minutes ago",
    },
  ],
  onRestart = () => {},
  onReload = () => {},
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "stopped":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-500">Running</Badge>;
      case "stopped":
        return <Badge className="bg-yellow-500">Stopped</Badge>;
      case "error":
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "stopped":
        return <Power className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Server Status</CardTitle>
            <CardDescription>
              Mail server component status and health
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="border rounded-lg p-4 flex flex-col justify-between bg-card"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  {getStatusIcon(service.status)}
                  <h3 className="text-lg font-medium ml-2">{service.name}</h3>
                </div>
                {getStatusBadge(service.status)}
              </div>

              <div className="text-sm text-muted-foreground mt-2">
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="font-medium">{service.uptime}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Last checked:</span>
                  <span>{service.lastChecked}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReload(service.name)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reload {service.name} configuration</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRestart(service.name)}
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Restart {service.name} service</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Configure {service.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Last system check: <span className="font-medium">2 minutes ago</span>
        </div>
        <Button variant="outline" size="sm">
          View System Logs
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServerStatusCard;
