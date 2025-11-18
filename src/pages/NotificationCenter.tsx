import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Smartphone, MessageSquare, Briefcase, Calendar, CheckCircle2, Trash2, FileText, Users, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const NotificationCenter = () => {
  const { userRole } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [jobMatches, setJobMatches] = useState(true);
  const [applications, setApplications] = useState(true);
  const [messages, setMessages] = useState(true);
  const [reminders, setReminders] = useState(true);

  const studentNotifications = [
    {
      id: 1,
      type: "contract",
      title: "Action Required: Sign your employment contract",
      description: "You need to sign your contract with TechStart AS to start work",
      time: "2 hours ago",
      read: false,
      icon: FileText,
      actionButton: true,
    },
    {
      id: 2,
      type: "application",
      title: "Your application was viewed by DataFlow Solutions",
      time: "1 day ago",
      read: false,
      icon: CheckCircle2,
    },
    {
      id: 3,
      type: "message",
      title: "New message from TechStart AS",
      time: "2 days ago",
      read: true,
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "reminder",
      title: "Upcoming job starts in 3 days",
      time: "3 days ago",
      read: true,
      icon: Calendar,
    },
  ];

  const employerNotifications = [
    {
      id: 1,
      type: "application",
      title: "New application for Frontend Developer position",
      description: "Emma Johansen has applied for your Frontend Developer role",
      time: "1 hour ago",
      read: false,
      icon: Users,
      actionButton: true,
    },
    {
      id: 2,
      type: "delivery",
      title: "Student has delivered completed work",
      description: "Erik Hansen has submitted the UI/UX Developer project for review",
      time: "5 hours ago",
      read: false,
      icon: CheckCircle2,
      actionButton: true,
      isDelivery: true,
    },
    {
      id: 3,
      type: "message",
      title: "New message from Lars Nielsen",
      time: "1 day ago",
      read: true,
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "milestone",
      title: "Project milestone completed",
      description: "Sofia Andersen marked Phase 1 as complete",
      time: "2 days ago",
      read: true,
      icon: CheckCircle2,
    },
  ];

  const notifications = userRole === 'student' ? studentNotifications : employerNotifications;

  const handleSavePreferences = () => {
    toast.success("Notification preferences saved", {
      description: "Your notification settings have been updated.",
    });
  };

  const handleMarkAllRead = () => {
    toast.success("All notifications marked as read");
  };

  const handleClearAll = () => {
    toast.success("All notifications cleared");
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "contract":
        return "text-red-600";
      case "job_match":
        return "text-blue-600";
      case "application":
        return "text-green-600";
      case "message":
        return "text-purple-600";
      case "reminder":
        return "text-amber-600";
      case "milestone":
        return "text-blue-600";
      case "delivery":
        return "text-green-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getNotificationColors = (type: string, read: boolean) => {
    if (read) {
      return "bg-background border-border";
    }
    
    switch (type) {
      case "delivery":
        return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50";
      case "contract":
        return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50";
      case "application":
        return "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50";
      case "message":
        return "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/50";
      case "reminder":
        return "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50";
      default:
        return "bg-primary/5 border-primary/20";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notification Center</h1>
          <p className="text-muted-foreground">Manage your notifications and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Recent Notifications
                    </CardTitle>
                    <CardDescription>Stay updated with your activity</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark all read
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleClearAll}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <div
                        key={notif.id}
                        className={`flex gap-3 p-3 rounded-lg border transition-colors ${getNotificationColors(notif.type, notif.read)}`}
                      >
                        <div className={`flex-shrink-0 ${getIconColor(notif.type)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notif.title}</p>
                              {notif.description && (
                                <p className="text-sm text-muted-foreground mt-1">{notif.description}</p>
                              )}
                            </div>
                            {!notif.read && (
                              <Badge variant="secondary" className="flex-shrink-0">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                          {notif.actionButton && (
                            <Link to={userRole === 'student' ? '/student/contract' : (notif.isDelivery ? '/employer/review-delivery?job=UI%2FUX%20Developer&student=Erik%20Hansen' : '/employer/jobs/1/applicants')}>
                              <Button size="sm" className="mt-3">
                                {userRole === 'student' ? (
                                  <>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Sign Contract
                                  </>
                                ) : notif.isDelivery ? (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Accept Delivery
                                  </>
                                ) : (
                                  <>
                                    <Users className="h-4 w-4 mr-2" />
                                    View Applications
                                  </>
                                )}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notification Preferences */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Methods</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email" className="cursor-pointer">Email</Label>
                  </div>
                  <Switch
                    id="email"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="sms" className="cursor-pointer">SMS</Label>
                  </div>
                  <Switch
                    id="sms"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>Select what you want to be notified about</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="jobs" className="cursor-pointer">
                      {userRole === 'student' ? 'Job Matches' : 'New Applications'}
                    </Label>
                  </div>
                  <Switch
                    id="jobs"
                    checked={jobMatches}
                    onCheckedChange={setJobMatches}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="applications" className="cursor-pointer">
                      {userRole === 'student' ? 'Application Updates' : 'Project Milestones'}
                    </Label>
                  </div>
                  <Switch
                    id="applications"
                    checked={applications}
                    onCheckedChange={setApplications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="messages" className="cursor-pointer">Messages</Label>
                  </div>
                  <Switch
                    id="messages"
                    checked={messages}
                    onCheckedChange={setMessages}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="reminders" className="cursor-pointer">Reminders</Label>
                  </div>
                  <Switch
                    id="reminders"
                    checked={reminders}
                    onCheckedChange={setReminders}
                  />
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
