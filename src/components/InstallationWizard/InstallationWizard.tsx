import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Server, Database, Shield, Globe, Mail, FileCode, Lock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InstallationWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [serverDetails, setServerDetails] = useState({
    hostname: 'mailman.example.com',
    ipAddress: '192.168.1.100',
    domain: 'example.com',
    adminEmail: 'admin@example.com',
    password: 'SecurePassword123#'
  });
  
  const steps = [
    { id: 'requirements', title: 'System Requirements', icon: <Server className="h-5 w-5" /> },
    { id: 'database', title: 'Database Setup', icon: <Database className="h-5 w-5" /> },
    { id: 'redis', title: 'Redis Setup', icon: <Database className="h-5 w-5" /> },
    { id: 'postfix', title: 'Postfix Setup', icon: <Mail className="h-5 w-5" /> },
    { id: 'dovecot', title: 'Dovecot Setup', icon: <Mail className="h-5 w-5" /> },
    { id: 'clamav', title: 'ClamAV Setup', icon: <Shield className="h-5 w-5" /> },
    { id: 'rspamd', title: 'Rspamd Setup', icon: <Shield className="h-5 w-5" /> },
    { id: 'apache', title: 'Apache Setup', icon: <Globe className="h-5 w-5" /> },
    { id: 'ssl', title: 'SSL Certificates', icon: <Lock className="h-5 w-5" /> },
    { id: 'fail2ban', title: 'Fail2ban Setup', icon: <Shield className="h-5 w-5" /> },
    { id: 'user', title: 'Create Mail User', icon: <FileCode className="h-5 w-5" /> },
    { id: 'complete', title: 'Complete', icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServerDetails(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-background p-6 rounded-lg w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Runic Mailman Installation Wizard</h1>
        <p className="text-muted-foreground mb-4">
          Follow this step-by-step guide to set up your self-hosted mail server
        </p>
        
        <div className="flex items-center gap-2 mb-2">
          <Progress value={progressPercentage} className="h-2" />
          <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {steps.map((step, index) => (
            <Button 
              key={step.id}
              variant={index === currentStep ? "default" : index < currentStep ? "outline" : "ghost"}
              size="sm"
              onClick={() => setCurrentStep(index)}
              disabled={index > currentStep + 1}
              className="flex items-center gap-2"
            >
              {index < currentStep && <CheckCircle className="h-4 w-4 text-green-500" />}
              {step.icon}
              <span className="hidden sm:inline">{step.title}</span>
              <span className="sm:hidden">{index + 1}</span>
            </Button>
          ))}
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {steps[currentStep].icon}
            {steps[currentStep].title}
          </CardTitle>
          <CardDescription>
            {currentStep === 0 && "Verify your system meets the requirements for Runic Mailman"}
            {currentStep === 1 && "Set up MariaDB database for mail server components"}
            {currentStep === 2 && "Install and configure Redis for caching and data storage"}
            {currentStep === 3 && "Configure Postfix as your Mail Transfer Agent (MTA)"}
            {currentStep === 4 && "Set up Dovecot for IMAP/POP3 mail access"}
            {currentStep === 5 && "Install ClamAV for antivirus protection"}
            {currentStep === 6 && "Configure Rspamd for spam filtering"}
            {currentStep === 7 && "Set up Apache web server for web interfaces"}
            {currentStep === 8 && "Generate and configure SSL certificates"}
            {currentStep === 9 && "Configure Fail2ban for security"}
            {currentStep === 10 && "Create your first mail user"}
            {currentStep === 11 && "Installation complete!"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* System Requirements Step */}
          {currentStep === 0 && (
            <div>
              <Alert className="mb-4 bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Prerequisites</AlertTitle>
                <AlertDescription>
                  Before proceeding, ensure you have the following ready:
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Ubuntu 22.04 LTS Server</h3>
                    <p className="text-sm text-muted-foreground">A clean installation with root or sudo access</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Registered Domain Name</h3>
                    <p className="text-sm text-muted-foreground">You'll need a domain name for your mail server</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">DNS Records</h3>
                    <p className="text-sm text-muted-foreground">Access to configure A, MX, and PTR records for your domain</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Static IP Address</h3>
                    <p className="text-sm text-muted-foreground">A static IP address for your server</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Basic Linux Knowledge</h3>
                    <p className="text-sm text-muted-foreground">Familiarity with command line and basic server administration</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Server Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hostname">Server Hostname</Label>
                    <Input 
                      id="hostname" 
                      name="hostname" 
                      value={serverDetails.hostname} 
                      onChange={handleInputChange} 
                      placeholder="mail.example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ipAddress">Server IP Address</Label>
                    <Input 
                      id="ipAddress" 
                      name="ipAddress" 
                      value={serverDetails.ipAddress} 
                      onChange={handleInputChange} 
                      placeholder="192.168.1.100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="domain">Mail Domain</Label>
                    <Input 
                      id="domain" 
                      name="domain" 
                      value={serverDetails.domain} 
                      onChange={handleInputChange} 
                      placeholder="example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input 
                      id="adminEmail" 
                      name="adminEmail" 
                      value={serverDetails.adminEmail} 
                      onChange={handleInputChange} 
                      placeholder="admin@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Default Password</Label>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      value={serverDetails.password} 
                      onChange={handleInputChange} 
                      placeholder="Secure password"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Database Setup Step */}
          {currentStep === 1 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>MariaDB Database Setup</AlertTitle>
                <AlertDescription>
                  We'll install and configure MariaDB for storing mail user data and configuration.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install MariaDB</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y mariadb-server mariadb-client
                    </div>
                    <p className="text-sm text-muted-foreground">This installs the MariaDB server and client packages.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="secure">
                  <AccordionTrigger>2. Secure MariaDB Installation</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo mysql_secure_installation
                    </div>
                    <p className="text-sm text-muted-foreground">Follow the prompts to set a root password and secure your installation.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="database">
                  <AccordionTrigger>3. Create Mail Database</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo mysql -u root -p<br /><br />
                      CREATE DATABASE runic_mail_db CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';<br /><br />
                      CREATE USER 'runic_mail_user'@'localhost' IDENTIFIED BY '{serverDetails.password}';<br />
                      GRANT ALL PRIVILEGES ON runic_mail_db.* TO 'runic_mail_user'@'localhost';<br />
                      FLUSH PRIVILEGES;<br />
                      EXIT;
                    </div>
                    <p className="text-sm text-muted-foreground">This creates a database and user for mail server components.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="verify">
                  <AccordionTrigger>4. Verify Database Connection</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      mysql -u runic_mail_user -p runic_mail_db
                    </div>
                    <p className="text-sm text-muted-foreground">Test the connection with the new user credentials.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Redis Setup Step */}
          {currentStep === 2 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Redis Installation</AlertTitle>
                <AlertDescription>
                  Redis will be used by Rspamd for caching and data storage.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install Redis</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y redis-server
                    </div>
                    <p className="text-sm text-muted-foreground">This installs the Redis server package.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="enable">
                  <AccordionTrigger>2. Enable Redis Service</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl enable redis-server<br />
                      sudo systemctl start redis-server
                    </div>
                    <p className="text-sm text-muted-foreground">This ensures Redis starts automatically on system boot.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="verify">
                  <AccordionTrigger>3. Verify Redis Installation</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      redis-cli ping
                    </div>
                    <p className="text-sm text-muted-foreground">Should return "PONG" if Redis is running correctly.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Postfix Setup Step */}
          {currentStep === 3 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Postfix Configuration</AlertTitle>
                <AlertDescription>
                  Postfix is the Mail Transfer Agent (MTA) that handles sending and receiving emails.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install Postfix</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y postfix postfix-mysql postfix-pcre libsasl2-modules
                    </div>
                    <p className="text-sm text-muted-foreground">During installation, select "Internet Site" and enter your domain name.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="config">
                  <AccordionTrigger>2. Configure Postfix</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo cp /etc/postfix/main.cf /etc/postfix/main.cf.bak<br />
                      sudo nano /etc/postfix/main.cf
                    </div>
                    <p className="text-sm text-muted-foreground">Edit the main configuration file with your domain settings.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mysql">
                  <AccordionTrigger>3. Create MySQL Configuration Files</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo nano /etc/postfix/mysql-virtual-mailbox-domains.cf<br />
                      sudo nano /etc/postfix/mysql-virtual-mailbox-maps.cf<br />
                      sudo nano /etc/postfix/mysql-virtual-alias-maps.cf<br />
                      sudo nano /etc/postfix/mysql-email2email.cf
                    </div>
                    <p className="text-sm text-muted-foreground">Create configuration files for MySQL integration.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="restart">
                  <AccordionTrigger>4. Restart Postfix</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl restart postfix<br />
                      sudo systemctl status postfix
                    </div>
                    <p className="text-sm text-muted-foreground">Restart and check the status of the Postfix service.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Dovecot Setup Step */}
          {currentStep === 4 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Dovecot Configuration</AlertTitle>
                <AlertDescription>
                  Dovecot provides IMAP and POP3 services for accessing emails.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install Dovecot</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y dovecot-core dovecot-imapd dovecot-pop3d dovecot-lmtpd dovecot-mysql dovecot-sieve dovecot-managesieved
                    </div>
                    <p className="text-sm text-muted-foreground">Install Dovecot and required packages.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="config">
                  <AccordionTrigger>2. Configure Dovecot</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo cp /etc/dovecot/dovecot.conf /etc/dovecot/dovecot.conf.bak<br />
                      sudo nano /etc/dovecot/dovecot.conf
                    </div>
                    <p className="text-sm text-muted-foreground">Edit the main Dovecot configuration file.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="auth">
                  <AccordionTrigger>3. Configure Authentication</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo nano /etc/dovecot/conf.d/10-auth.conf<br />
                      sudo nano /etc/dovecot/conf.d/auth-sql.conf.ext<br />
                      sudo nano /etc/dovecot/dovecot-sql.conf.ext
                    </div>
                    <p className="text-sm text-muted-foreground">Configure authentication settings and database integration.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mail">
                  <AccordionTrigger>4. Configure Mail Storage</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo nano /etc/dovecot/conf.d/10-mail.conf<br /><br />
                      sudo groupadd -g 5000 vmail<br />
                      sudo useradd -u 5000 -g vmail -s /usr/sbin/nologin -d /var/vmail -m vmail<br />
                      sudo mkdir -p /var/vmail<br />
                      sudo chown -R vmail:vmail /var/vmail
                    </div>
                    <p className="text-sm text-muted-foreground">Configure mail storage and create the vmail user.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ssl">
                  <AccordionTrigger>5. Configure SSL</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo nano /etc/dovecot/conf.d/10-ssl.conf
                    </div>
                    <p className="text-sm text-muted-foreground">Configure SSL/TLS settings for secure connections.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="restart">
                  <AccordionTrigger>6. Restart Dovecot</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl restart dovecot<br />
                      sudo systemctl status dovecot
                    </div>
                    <p className="text-sm text-muted-foreground">Restart and check the status of the Dovecot service.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* ClamAV Setup Step */}
          {currentStep === 5 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>ClamAV Installation</AlertTitle>
                <AlertDescription>
                  ClamAV provides antivirus scanning for incoming and outgoing emails.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install ClamAV</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y clamav clamav-daemon
                    </div>
                    <p className="text-sm text-muted-foreground">Install ClamAV and the daemon service.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="update">
                  <AccordionTrigger>2. Update Virus Definitions</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl stop clamav-freshclam<br />
                      sudo freshclam<br />
                      sudo systemctl start clamav-freshclam
                    </div>
                    <p className="text-sm text-muted-foreground">Update virus definitions database.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="config">
                  <AccordionTrigger>3. Configure ClamAV</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo nano /etc/clamav/clamd.conf
                    </div>
                    <p className="text-sm text-muted-foreground">Edit the ClamAV configuration file.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="restart">
                  <AccordionTrigger>4. Start ClamAV Service</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl enable clamav-daemon<br />
                      sudo systemctl restart clamav-daemon<br />
                      sudo systemctl status clamav-daemon
                    </div>
                    <p className="text-sm text-muted-foreground">Enable, restart, and check the status of the ClamAV daemon.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Rspamd Setup Step */}
          {currentStep === 6 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Rspamd Configuration</AlertTitle>
                <AlertDescription>
                  Rspamd provides advanced spam filtering and email processing.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install Rspamd</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y lsb-release wget<br /><br />
                      CODENAME=$(lsb_release -c -s)<br />
                      wget -O- https://rspamd.com/apt-stable/gpg.key | sudo apt-key add -<br />
                      echo "deb [arch=amd64] https://rspamd.com/apt-stable/ $CODENAME main" | sudo tee /etc/apt/sources.list.d/rspamd.list<br /><br />
                      sudo apt update<br />
                      sudo apt install -y rspamd
                    </div>
                    <p className="text-sm text-muted-foreground">Add Rspamd repository and install the package.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="config">
                  <AccordionTrigger>2. Configure Rspamd</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo mkdir -p /etc/rspamd/local.d<br /><br />
                      sudo nano /etc/rspamd/local.d/worker-proxy.inc<br />
                      sudo nano /etc/rspamd/local.d/classifier-bayes.conf<br />
                      sudo nano /etc/rspamd/local.d/redis.conf<br />
                      sudo nano /etc/rspamd/local.d/antivirus.conf
                    </div>
                    <p className="text-sm text-muted-foreground">Create and edit Rspamd configuration files.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="password">
                  <AccordionTrigger>3. Set Web Interface Password</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo rspamadm pw<br />
                      sudo nano /etc/rspamd/local.d/worker-controller.inc
                    </div>
                    <p className="text-sm text-muted-foreground">Generate a password hash and configure the web interface.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="dkim">
                  <AccordionTrigger>4. Configure DKIM Signing</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo mkdir -p /var/lib/rspamd/dkim/<br />
                      sudo chown -R _rspamd:_rspamd /var/lib/rspamd/dkim/<br /><br />
                      sudo rspamadm dkim_keygen -d {serverDetails.domain} -s mail -k /var/lib/rspamd/dkim/{serverDetails.domain}.mail.key > /var/lib/rspamd/dkim/{serverDetails.domain}.mail.pub<br /><br />
                      sudo nano /etc/rspamd/local.d/dkim_signing.conf
                    </div>
                    <p className="text-sm text-muted-foreground">Generate DKIM keys and configure DKIM signing.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="restart">
                  <AccordionTrigger>5. Start Rspamd Service</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl enable rspamd<br />
                      sudo systemctl restart rspamd<br />
                      sudo systemctl status rspamd
                    </div>
                    <p className="text-sm text-muted-foreground">Enable, restart, and check the status of the Rspamd service.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Apache Setup Step */}
          {currentStep === 7 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Apache Web Server Setup</AlertTitle>
                <AlertDescription>
                  Apache will serve the web interfaces for mail server management.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install Apache</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y apache2
                    </div>
                    <p className="text-sm text-muted-foreground">Install the Apache web server.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="modules">
                  <AccordionTrigger>2. Enable Required Modules</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo a2enmod ssl rewrite proxy proxy_http headers
                    </div>
                    <p className="text-sm text-muted-foreground">Enable necessary Apache modules.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="vhost">
                  <AccordionTrigger>3. Configure Virtual Host</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo nano /etc/apache2/sites-available/{serverDetails.hostname}.conf
                    </div>
                    <p className="text-sm text-muted-foreground">Create a virtual host configuration file.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="enable">
                  <AccordionTrigger>4. Enable Virtual Host</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo a2dissite 000-default.conf<br />
                      sudo a2ensite {serverDetails.hostname}.conf<br />
                      sudo apache2ctl configtest
                    </div>
                    <p className="text-sm text-muted-foreground">Disable default site, enable your virtual host, and test configuration.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="restart">
                  <AccordionTrigger>5. Restart Apache</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl restart apache2<br />
                      sudo systemctl status apache2
                    </div>
                    <p className="text-sm text-muted-foreground">Restart and check the status of the Apache service.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* SSL Certificates Step */}
          {currentStep === 8 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>SSL Certificate Setup</AlertTitle>
                <AlertDescription>
                  Secure your mail server with Let's Encrypt SSL certificates.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install Certbot</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y certbot python3-certbot-apache
                    </div>
                    <p className="text-sm text-muted-foreground">Install Certbot and the Apache plugin.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="obtain">
                  <AccordionTrigger>2. Obtain SSL Certificate</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl stop apache2<br />
                      sudo certbot certonly --standalone -d {serverDetails.hostname} --agree-tos -m {serverDetails.adminEmail} --no-eff-email
                    </div>
                    <p className="text-sm text-muted-foreground">Stop Apache temporarily and obtain a certificate.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="config">
                  <AccordionTrigger>3. Configure Services to Use SSL</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      # Update Postfix configuration<br />
                      sudo nano /etc/postfix/main.cf<br /><br />
                      # Update Dovecot configuration<br />
                      sudo nano /etc/dovecot/conf.d/10-ssl.conf<br /><br />
                      # Update Apache configuration<br />
                      sudo nano /etc/apache2/sites-available/{serverDetails.hostname}.conf
                    </div>
                    <p className="text-sm text-muted-foreground">Update configuration files to use the new SSL certificates.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="restart">
                  <AccordionTrigger>4. Restart Services</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl start apache2<br />
                      sudo systemctl restart postfix<br />
                      sudo systemctl restart dovecot
                    </div>
                    <p className="text-sm text-muted-foreground">Start Apache and restart mail services to apply SSL configuration.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="renewal">
                  <AccordionTrigger>5. Test Certificate Renewal</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo certbot renew --dry-run
                    </div>
                    <p className="text-sm text-muted-foreground">Test the certificate renewal process.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Fail2ban Setup Step */}
          {currentStep === 9 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fail2ban Configuration</AlertTitle>
                <AlertDescription>
                  Fail2ban helps protect your server by banning IPs that show malicious signs.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="installation">
                  <AccordionTrigger>1. Install Fail2ban</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo apt update<br />
                      sudo apt install -y fail2ban
                    </div>
                    <p className="text-sm text-muted-foreground">Install the Fail2ban package.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="config">
                  <AccordionTrigger>2. Configure Fail2ban</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local<br />
                      sudo nano /etc/fail2ban/jail.local
                    </div>
                    <p className="text-sm text-muted-foreground">Create a local configuration file and edit settings.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="jails">
                  <AccordionTrigger>3. Enable Jails</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      # Edit jail.local to enable these jails:<br />
                      # [sshd]<br />
                      # [postfix-sasl]<br />
                      # [dovecot]<br />
                      # [apache-auth]<br />
                      # [apache-badbots]
                    </div>
                    <p className="text-sm text-muted-foreground">Enable specific jails for different services.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="restart">
                  <AccordionTrigger>4. Start Fail2ban Service</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo systemctl enable fail2ban<br />
                      sudo systemctl restart fail2ban<br />
                      sudo systemctl status fail2ban
                    </div>
                    <p className="text-sm text-muted-foreground">Enable, restart, and check the status of the Fail2ban service.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="status">
                  <AccordionTrigger>5. Check Jail Status</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo fail2ban-client status<br />
                      sudo fail2ban-client status sshd
                    </div>
                    <p className="text-sm text-muted-foreground">Check the status of all jails and specific jails.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Create Mail User Step */}
          {currentStep === 10 && (
            <div>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Create Mail User</AlertTitle>
                <AlertDescription>
                  Create your first mail user to test the mail server functionality.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="domain">
                  <AccordionTrigger>1. Add Domain to Database</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo mysql -u root -p<br /><br />
                      USE runic_mail_db;<br /><br />
                      CREATE TABLE IF NOT EXISTS domain (<br />
                      &nbsp;&nbsp;domain VARCHAR(255) NOT NULL PRIMARY KEY,<br />
                      &nbsp;&nbsp;description VARCHAR(255) DEFAULT '' NOT NULL,<br />
                      &nbsp;&nbsp;aliases INT DEFAULT 0 NOT NULL,<br />
                      &nbsp;&nbsp;mailboxes INT DEFAULT 0 NOT NULL,<br />
                      &nbsp;&nbsp;active TINYINT(1) DEFAULT 1 NOT NULL<br />
                      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;<br /><br />
                      INSERT INTO domain (domain, description, active) VALUES<br />
                      ('{serverDetails.domain}', 'Runic Mail Domain', 1);
                    </div>
                    <p className="text-sm text-muted-foreground">Create the domain table and add your domain.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mailbox">
                  <AccordionTrigger>2. Create Mailbox Table</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      CREATE TABLE IF NOT EXISTS mailbox (<br />
                      &nbsp;&nbsp;username VARCHAR(255) NOT NULL PRIMARY KEY,<br />
                      &nbsp;&nbsp;password VARCHAR(255) NOT NULL,<br />
                      &nbsp;&nbsp;name VARCHAR(255) DEFAULT '' NOT NULL,<br />
                      &nbsp;&nbsp;maildir VARCHAR(255) NOT NULL,<br />
                      &nbsp;&nbsp;quota BIGINT DEFAULT 0 NOT NULL,<br />
                      &nbsp;&nbsp;domain VARCHAR(255) NOT NULL,<br />
                      &nbsp;&nbsp;active TINYINT(1) DEFAULT 1 NOT NULL,<br />
                      &nbsp;&nbsp;FOREIGN KEY (domain) REFERENCES domain(domain) ON DELETE CASCADE<br />
                      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                    </div>
                    <p className="text-sm text-muted-foreground">Create the mailbox table for user accounts.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="alias">
                  <AccordionTrigger>3. Create Alias Table</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      CREATE TABLE IF NOT EXISTS alias (<br />
                      &nbsp;&nbsp;address VARCHAR(255) NOT NULL PRIMARY KEY,<br />
                      &nbsp;&nbsp;goto TEXT NOT NULL,<br />
                      &nbsp;&nbsp;domain VARCHAR(255) NOT NULL,<br />
                      &nbsp;&nbsp;active TINYINT(1) DEFAULT 1 NOT NULL,<br />
                      &nbsp;&nbsp;FOREIGN KEY (domain) REFERENCES domain(domain) ON DELETE CASCADE<br />
                      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                    </div>
                    <p className="text-sm text-muted-foreground">Create the alias table for email forwarding.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="password">
                  <AccordionTrigger>4. Generate Password Hash</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      sudo doveadm pw -s BLF-CRYPT -p '{serverDetails.password}'<br /><br />
                      # This will output a hash like: {BLF-CRYPT}$2y$05$....some....long....hash....
                    </div>
                    <p className="text-sm text-muted-foreground">Generate a secure password hash for the user.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="user">
                  <AccordionTrigger>5. Add User to Database</AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
                      # Replace YOUR_BLF_CRYPT_HASH_HERE with the hash from the previous step<br /><br />
                      INSERT INTO mailbox (username, password, name, maildir, domain, active) VALUES<br />
                      ('user1@{serverDetails.domain}', 'YOUR_BLF_CRYPT_HASH_HERE', 'Test User One',<br />
                      '{serverDetails.domain}/user1/', '{serverDetails.domain}', 1);
                    </div>
                    <p className="text-sm text-muted-foreground">Add a user to the mailbox table.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Complete Step */}
          {currentStep === 11 && (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Installation Complete!</h2>
              
              <p className="text-lg mb-6">
                Your Runic Mailman server has been successfully set up.
              </p>
              
              <div className="bg-muted p-4 rounded-md text-left mb-6">
                <h3 className="font-medium mb-2">Access Points:</h3>
                <ul className="space-y-2">
                  <li><strong>Webmail:</strong> https://{serverDetails.hostname}/</li>
                  <li><strong>Rspamd Interface:</strong> https://{serverDetails.hostname}/rspamd/</li>
                  <li><strong>IMAP:</strong> {serverDetails.hostname} (Port 993, SSL)</li>
                  <li><strong>SMTP:</strong> {serverDetails.hostname} (Port 587, STARTTLS)</li>
                </ul>
              </div>
              
              <div className="space-y-4 text-left">
                <h3 className="font-medium">Next Steps:</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Regular Updates</h4>
                    <p className="text-sm text-muted-foreground">Keep your system updated with <code>sudo apt update && sudo apt upgrade -y</code></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Backup Strategy</h4>
                    <p className="text-sm text-muted-foreground">Implement regular backups of mail data and configuration files</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Monitor Logs</h4>
                    <p className="text-sm text-muted-foreground">Regularly check mail logs for issues: <code>/var/log/mail.log</code></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <Button 
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 2 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InstallationWizard;
