import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, FileText, RefreshCw, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConfigFile {
  name: string;
  path: string;
  content: string;
  service: string;
}

const ConfigEditor = () => {
  const [selectedService, setSelectedService] = useState<string>("postfix");
  const [selectedFile, setSelectedFile] = useState<ConfigFile | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Mock data for available services and their config files
  const services = [
    { id: "postfix", name: "Postfix" },
    { id: "dovecot", name: "Dovecot" },
    { id: "rspamd", name: "Rspamd" },
    { id: "clamav", name: "ClamAV" },
    { id: "apache", name: "Apache" },
    { id: "fail2ban", name: "Fail2Ban" },
  ];

  // Mock data for configuration files
  const configFiles: Record<string, ConfigFile[]> = {
    postfix: [
      {
        name: "main.cf",
        path: "/etc/postfix/main.cf",
        content:
          "# Postfix main configuration file\n\nsmtpd_banner = $myhostname ESMTP $mail_name\nbiff = no\nappend_dot_mydomain = no\nreadme_directory = no\ncompatibility_level = 3.6\n\n# TLS parameters\nsmtpd_tls_cert_file=/etc/letsencrypt/live/mailman.runic.co.za/fullchain.pem\nsmtpd_tls_key_file=/etc/letsencrypt/live/mailman.runic.co.za/privkey.pem\nsmtpd_use_tls=yes",
        service: "postfix",
      },
      {
        name: "master.cf",
        path: "/etc/postfix/master.cf",
        content:
          "# Postfix master process configuration file\n\nsmtp      inet  n       -       y       -       -       smtpd\nsmtps     inet  n       -       y       -       -       smtpd\n  -o syslog_name=postfix/smtps\n  -o smtpd_tls_wrappermode=yes",
        service: "postfix",
      },
      {
        name: "mysql-virtual-mailbox-domains.cf",
        path: "/etc/postfix/mysql-virtual-mailbox-domains.cf",
        content:
          "user = runic_mail_user\npassword = Kaymar1990#@!\nhosts = 127.0.0.1\ndbname = runic_mail_db\nquery = SELECT 1 FROM domain WHERE domain='%s' AND active = '1'",
        service: "postfix",
      },
    ],
    dovecot: [
      {
        name: "dovecot.conf",
        path: "/etc/dovecot/dovecot.conf",
        content:
          "# Main configuration file for Dovecot\n\nprotocols = imap pop3 lmtp sieve\nlisten = *, ::\nmail_location = maildir:/var/vmail/%d/%n/Maildir",
        service: "dovecot",
      },
      {
        name: "10-auth.conf",
        path: "/etc/dovecot/conf.d/10-auth.conf",
        content:
          "# Disable plaintext authentication unless SSL/TLS is used\ndisable_plaintext_auth = yes\n\n# Mechanisms for authentication\nauth_mechanisms = plain login",
        service: "dovecot",
      },
    ],
    rspamd: [
      {
        name: "worker-proxy.inc",
        path: "/etc/rspamd/local.d/worker-proxy.inc",
        content:
          '# This is the milter worker for Postfix\nbind_socket = "127.0.0.1:11332";\ntimeout = 120s;\nmilter = yes;\nspam_header = "X-Spam-Status";',
        service: "rspamd",
      },
      {
        name: "classifier-bayes.conf",
        path: "/etc/rspamd/local.d/classifier-bayes.conf",
        content: 'backend = "redis";\nautolearn = true;',
        service: "rspamd",
      },
    ],
    clamav: [
      {
        name: "clamd.conf",
        path: "/etc/clamav/clamd.conf",
        content:
          "# ClamAV configuration\n\nTCPSocket 3310\nTCPAddr 127.0.0.1\nMaxThreads 2\nMaxConnectionQueueLength 15\nMaxFileSize 25M\nMaxScanSize 100M",
        service: "clamav",
      },
    ],
    apache: [
      {
        name: "mailman.runic.co.za.conf",
        path: "/etc/apache2/sites-available/mailman.runic.co.za.conf",
        content:
          "<VirtualHost *:80>\n  ServerName mailman.runic.co.za\n  Redirect permanent / https://mailman.runic.co.za/\n</VirtualHost>\n\n<VirtualHost *:443>\n  ServerName mailman.runic.co.za\n  SSLEngine on\n  SSLCertificateFile /etc/letsencrypt/live/mailman.runic.co.za/fullchain.pem\n  SSLCertificateKeyFile /etc/letsencrypt/live/mailman.runic.co.za/privkey.pem\n</VirtualHost>",
        service: "apache",
      },
    ],
    fail2ban: [
      {
        name: "jail.local",
        path: "/etc/fail2ban/jail.local",
        content:
          "[DEFAULT]\nbantime = 1d\nfindtime = 10m\nmaxretry = 5\ndestemail = your-admin-email@example.com\nsender = fail2ban@mailman.runic.co.za\naction = %(action_mwl)s",
        service: "fail2ban",
      },
    ],
  };

  // Handle service selection
  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedFile(null);
    setEditorContent("");
    setValidationError(null);
    setSaveSuccess(false);
  };

  // Handle file selection
  const handleFileSelect = (file: ConfigFile) => {
    setSelectedFile(file);
    setEditorContent(file.content);
    setValidationError(null);
    setSaveSuccess(false);
  };

  // Handle content change in the editor
  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    setSaveSuccess(false);
  };

  // Validate configuration
  const validateConfig = () => {
    // This is a mock validation function
    // In a real application, this would send the config to a backend service for validation

    // Simulate validation based on the service
    if (selectedService === "postfix" && selectedFile?.name === "main.cf") {
      if (!editorContent.includes("smtpd_tls_cert_file=")) {
        setValidationError(
          "Error: Missing required parameter smtpd_tls_cert_file",
        );
        return false;
      }
    }

    if (
      selectedService === "dovecot" &&
      selectedFile?.name === "dovecot.conf"
    ) {
      if (!editorContent.includes("protocols =")) {
        setValidationError("Error: Missing required parameter protocols");
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  // Save configuration
  const saveConfig = () => {
    if (!validateConfig()) return;

    setIsSaving(true);

    // Simulate API call to save configuration
    setTimeout(() => {
      // Update the file content in our mock data
      if (selectedFile) {
        const serviceFiles = [...configFiles[selectedService]];
        const fileIndex = serviceFiles.findIndex(
          (f) => f.name === selectedFile.name,
        );
        if (fileIndex !== -1) {
          serviceFiles[fileIndex] = {
            ...serviceFiles[fileIndex],
            content: editorContent,
          };
          configFiles[selectedService] = serviceFiles;
        }
      }

      setIsSaving(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  // Restart service
  const restartService = () => {
    setIsRestarting(true);

    // Simulate API call to restart service
    setTimeout(() => {
      setIsRestarting(false);
    }, 2000);
  };

  return (
    <div className="bg-background h-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Configuration Editor</CardTitle>
          <CardDescription>
            Edit configuration files for your mail server components
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* Left sidebar - Service and file selection */}
            <div className="col-span-3 border rounded-md p-4 flex flex-col">
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Service
                </label>
                <Select
                  value={selectedService}
                  onValueChange={handleServiceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <label className="text-sm font-medium mb-2 block">
                Configuration Files
              </label>
              <ScrollArea className="flex-1 h-[400px]">
                <div className="space-y-1">
                  {configFiles[selectedService]?.map((file) => (
                    <Button
                      key={file.name}
                      variant={
                        selectedFile?.name === file.name ? "secondary" : "ghost"
                      }
                      className="w-full justify-start text-left"
                      onClick={() => handleFileSelect(file)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {file.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Right side - Editor */}
            <div className="col-span-9 flex flex-col h-full">
              {selectedFile ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">{selectedFile.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile.path}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={validateConfig}
                      >
                        Validate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={saveConfig}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={restartService}
                        disabled={isRestarting}
                      >
                        {isRestarting ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Restarting...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart Service
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  {validationError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Validation Error</AlertTitle>
                      <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                  )}

                  {saveSuccess && (
                    <Alert className="mb-4 bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-500" />
                      <AlertTitle className="text-green-700">
                        Success
                      </AlertTitle>
                      <AlertDescription className="text-green-600">
                        Configuration saved successfully.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex-1 relative">
                    <Textarea
                      className="h-full min-h-[500px] font-mono text-sm p-4"
                      value={editorContent}
                      onChange={handleEditorChange}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full border rounded-md border-dashed">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">
                      No file selected
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select a configuration file from the sidebar to edit
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigEditor;
