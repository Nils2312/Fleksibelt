import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Briefcase,
  Calendar,
  Clock,
  Eye,
  MessageSquare,
  Users,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Building2,
  FileText,
  ClipboardList,
  BarChart3
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatNorwegianDate } from "@/lib/utils";

const ActiveJobs = () => {
  const { userRole } = useAuth();

  // Student active jobs data
  const studentActiveJobs = [
    {
      id: 1,
      title: "Backend Developer",
      company: "DataFlow Solutions",
      companyId: "1",
      startDate: "2025-10-01",
      endDate: "2025-12-01",
      duration: "2 months",
      hoursWorked: 60,
      totalHours: 160,
      status: "In Progress",
    },
  ];

  const studentUpcomingJobs = [
    { 
      id: 1, 
      title: "Frontend Developer", 
      company: "TechStart AS", 
      startDate: "2025-11-15", 
      status: "Starting Soon",
      contractSigned: false,
    },
  ];

  const studentJobsToDeliver = [
    {
      id: 1,
      title: "UI/UX Design Project",
      company: "DesignHub",
      companyId: "2",
      startDate: "2025-09-01",
      endDate: "2025-10-30",
      hoursWorked: 118,
      totalHours: 120,
      daysUntilDeadline: 3,
    },
  ];

  // Employer active jobs data
  const employerActiveJobs = [
    {
      id: 1,
      title: "Frontend Developer - React",
      applicants: 12,
      views: 156,
      posted: "2025-10-20",
      expires: "2025-11-20",
      status: "active",
    },
    {
      id: 2,
      title: "Backend Developer - Node.js",
      applicants: 8,
      views: 89,
      posted: "2025-10-18",
      expires: "2025-11-18",
      status: "active",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      applicants: 4,
      views: 67,
      posted: "2025-10-25",
      expires: "2025-11-25",
      status: "active",
    },
  ];

  const employerOngoingProjects = [
    {
      id: 1,
      title: "E-commerce Platform Development",
      studentName: "Emma Johansen",
      studentId: "1",
      startDate: "2025-10-01",
      endDate: "2025-12-15",
      progress: 45,
      status: "On Track",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {userRole === 'student' ? 'My Active Jobs' : 'Active Jobs'}
          </h1>
          <p className="text-muted-foreground">
            {userRole === 'student' 
              ? 'Track your current projects and deadlines'
              : 'Manage your job postings and ongoing projects'
            }
          </p>
        </div>

        {userRole === 'student' ? (
          <div className="space-y-8">
            {/* Active Working Jobs */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-primary" />
                Currently Working On
              </h2>
              {studentActiveJobs.length > 0 ? (
                <div className="space-y-4">
                  {studentActiveJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6 border-l-4 border-l-primary">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                          <Link to={`/employer/profile/${job.companyId}`}>
                            <p className="text-sm text-muted-foreground hover:text-primary transition-colors">
                              {job.company}
                            </p>
                          </Link>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400">
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{job.hoursWorked} / {job.totalHours} hrs</span>
                          </div>
                          <Progress value={(job.hoursWorked / job.totalHours) * 100} className="h-2" />
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {job.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            Ends {formatNorwegianDate(job.endDate)}
                          </span>
                          <Link to={`/jobs/${job.id}`} className="text-primary hover:underline ml-auto">
                            View Job Details →
                          </Link>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          <Link to="/log-hours" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              Log Hours
                            </Button>
                          </Link>
                          <Link to="/messages" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </Link>
                          <Link to="/manage-job" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              Manage Job
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground">No active jobs at the moment</p>
                </div>
              )}
            </div>

            {/* Jobs to Deliver */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Ready to Deliver
              </h2>
              {studentJobsToDeliver.length > 0 ? (
                <div className="space-y-4">
                  {studentJobsToDeliver.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6 border-l-4 border-l-orange-500">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400">
                          {job.daysUntilDeadline} days left
                        </Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Completion</span>
                            <span className="font-medium">{job.hoursWorked} / {job.totalHours} hrs</span>
                          </div>
                          <Progress value={(job.hoursWorked / job.totalHours) * 100} className="h-2" />
                        </div>
                        
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          Deadline: {formatNorwegianDate(job.endDate)}
                        </p>
                        
                        <Link to="/complete-job">
                          <Button className="w-full">
                            Complete & Deliver
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground">No jobs pending delivery</p>
                </div>
              )}
            </div>

            {/* Upcoming Jobs */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming
              </h2>
              {studentUpcomingJobs.length > 0 ? (
                <div className="space-y-3">
                  {studentUpcomingJobs.map((job) => (
                    <div key={job.id} className="p-4 border rounded-lg bg-secondary/30">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium mb-1">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">{job.status}</Badge>
                          <p className="text-xs text-muted-foreground">{formatNorwegianDate(job.startDate)}</p>
                        </div>
                      </div>
                      
                      {!job.contractSigned ? (
                        <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                                Action Required: Sign Contract
                              </p>
                              <p className="text-xs text-amber-800 dark:text-amber-200 mb-3">
                                You need to review and sign your employment contract before you can start this job.
                              </p>
                              <Link to="/student/contract">
                                <Button size="sm" className="w-full">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Review & Sign Contract
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Contract signed - Ready to start</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground">No upcoming jobs scheduled</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Job Postings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Job Postings
                </h2>
                <Link to="/employer/post-job">
                  <Button>Post New Job</Button>
                </Link>
              </div>
              {employerActiveJobs.length > 0 ? (
                <div className="space-y-4">
                  {employerActiveJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.applicants} applicants
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {job.views} views
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400">
                          Active
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            Posted {job.posted} • Expires {job.expires}
                          </span>
                          <Link to={`/jobs/${job.id}`} className="text-sm text-primary hover:underline">
                            View Job Details →
                          </Link>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/employer/job-insights?id=${job.id}`}>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Insights
                            </Button>
                          </Link>
                          <Link to={`/employer/jobs/${job.id}/applicants`}>
                            <Button variant="outline" size="sm">
                              Applicants
                            </Button>
                          </Link>
                          <Link to="/employer/edit-job">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border rounded-lg bg-secondary/30">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No active job postings</p>
                  <Link to="/employer/post-job">
                    <Button>Post Your First Job</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Ongoing Projects */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Ongoing Projects
              </h2>
              {employerOngoingProjects.length > 0 ? (
                <div className="space-y-4">
                  {employerOngoingProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-6 border-l-4 border-l-primary">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                          <Link to={`/student/profile/${project.studentId}`}>
                            <p className="text-sm text-muted-foreground hover:text-primary transition-colors">
                              {project.studentName}
                            </p>
                          </Link>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400">
                          {project.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-4">
                          {formatNorwegianDate(project.startDate)} → {formatNorwegianDate(project.endDate)}
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          <Link to="/view-student-hours" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              View Hours
                            </Button>
                          </Link>
                          <Link to="/messages" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </Link>
                          <Link to="/manage-job?type=employer" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              Manage Project
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground">No ongoing projects</p>
                </div>
              )}
            </div>

            {/* Jobs to Review */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-orange-500" />
                Jobs to Review
              </h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-6 border-l-4 border-l-orange-500">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">UI/UX Developer</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Student: Erik Hansen
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted: 2025-12-14
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending Review
                    </Badge>
                  </div>
                  <div className="pt-2">
                    <Link to="/employer/review-delivery?job=UI%2FUX%20Developer&student=Erik%20Hansen">
                      <Button className="w-full">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Review Delivery
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveJobs;
