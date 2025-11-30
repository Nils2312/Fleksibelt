import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, Building2, ArrowLeft, FileText } from "lucide-react";
import { formatNorwegianDate } from "@/lib/utils";

const ViewStudentHours = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("job") || "Job";
  const studentName = searchParams.get("student") || "Student";

  // Mock job data
  const jobData = {
    title: "UI/UX Developer",
    studentName: "Erik Hansen",
    company: "TechStart AS",
    startDate: "2025-10-15",
    endDate: "2025-12-15",
    totalHours: 120,
    hoursWorked: 45,
    contractedRate: "350 kr/hr",
  };

  // Mock logged hours entries
  const loggedHours = [
    {
      id: 1,
      date: "2025-10-27",
      hours: 8,
      description: "Implemented user authentication flow with login and registration screens. Created responsive layouts and integrated form validation.",
    },
    {
      id: 2,
      date: "2025-10-26",
      hours: 7.5,
      description: "Designed and developed the dashboard interface. Built reusable card components and worked on the navigation system.",
    },
    {
      id: 3,
      date: "2025-10-25",
      hours: 6,
      description: "Set up project structure, installed dependencies, and configured the design system with Tailwind CSS.",
    },
    {
      id: 4,
      date: "2025-10-24",
      hours: 8,
      description: "Created wireframes and mockups for the main pages. Collaborated with the team to finalize the design direction.",
    },
    {
      id: 5,
      date: "2025-10-23",
      hours: 7.5,
      description: "Developed the settings page with user preferences. Added dark mode toggle and accessibility improvements.",
    },
    {
      id: 6,
      date: "2025-10-22",
      hours: 8,
      description: "Built the job listing page with filters and search functionality. Implemented pagination and sorting options.",
    },
  ];

  const calculateEarnings = () => {
    const rate = parseInt(jobData.contractedRate);
    return (rate * jobData.hoursWorked).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Link 
          to="/active-jobs" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Active Jobs
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Hours Log</h1>
          <p className="text-muted-foreground">Review work progress and logged hours</p>
        </div>

        <div className="space-y-6">
          {/* Job & Student Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Job & Student Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Position</p>
                  <p className="font-medium">{jobData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Student</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{jobData.studentName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract Period</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{formatNorwegianDate(jobData.startDate)} - {formatNorwegianDate(jobData.endDate)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                  <p className="font-medium">{jobData.contractedRate}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Hours Progress</span>
                  <span className="text-sm font-medium">{jobData.hoursWorked}/{jobData.totalHours} hours</span>
                </div>
                <Progress value={(jobData.hoursWorked / jobData.totalHours) * 100} className="h-3" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">Total Earnings</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {calculateEarnings()} kr
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{jobData.hoursWorked}h</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((jobData.hoursWorked / jobData.totalHours) * 100).toFixed(1)}% completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Entries</p>
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{loggedHours.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Work sessions logged
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg. Hours/Day</p>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">
                  {(jobData.hoursWorked / loggedHours.length).toFixed(1)}h
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on {loggedHours.length} entries
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Logged Hours Entries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Logged Hours
              </CardTitle>
              <CardDescription>
                Detailed breakdown of work sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loggedHours.map((entry, index) => (
                  <div key={entry.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{entry.date}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {entry.hours}h
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-15 pl-3 border-l-2 border-border">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentHours;
