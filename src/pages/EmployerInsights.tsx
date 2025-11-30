import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Briefcase,
  Clock,
  Target,
  ArrowUp,
  ArrowDown,
  Download,
  ArrowLeft
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const EmployerInsights = () => {
  const handleDownloadReport = () => {
    toast.success("Downloading insights report", {
      description: "Your analytics report is being generated.",
    });
  };

  const overviewStats = {
    totalViews: 312,
    totalApplications: 24,
    activeJobs: 3,
    avgResponseTime: "2.5 hours",
    conversionRate: 7.7,
    profileViews: 156,
  };

  const jobPerformance = [
    {
      id: 1,
      title: "Frontend Developer - React",
      views: 156,
      applications: 12,
      conversionRate: 7.7,
      daysActive: 7,
      status: "active",
      trend: "up",
    },
    {
      id: 2,
      title: "Backend Developer - Node.js",
      views: 89,
      applications: 8,
      conversionRate: 9.0,
      daysActive: 9,
      status: "active",
      trend: "up",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      views: 67,
      applications: 4,
      conversionRate: 6.0,
      daysActive: 2,
      status: "active",
      trend: "stable",
    },
  ];

  const applicationSources = [
    { source: "Direct Search", count: 14, percentage: 58 },
    { source: "Job Recommendations", count: 7, percentage: 29 },
    { source: "Profile Views", count: 3, percentage: 13 },
  ];

  const topSkillsRequested = [
    { skill: "React", jobs: 2 },
    { skill: "TypeScript", jobs: 2 },
    { skill: "Node.js", jobs: 2 },
    { skill: "JavaScript", jobs: 3 },
    { skill: "PostgreSQL", jobs: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/employer/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Insights & Analytics</h1>
            <p className="text-muted-foreground">Track your job postings performance and hiring metrics</p>
          </div>
          <Button onClick={handleDownloadReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Views</p>
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">{overviewStats.totalViews}</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUp className="h-4 w-4" />
                <span>+12% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Applications</p>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">{overviewStats.totalApplications}</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUp className="h-4 w-4" />
                <span>+8% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <Target className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">{overviewStats.conversionRate}%</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>Views to applications</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Active Jobs</p>
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">{overviewStats.activeJobs}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>Currently posted</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">{overviewStats.avgResponseTime}</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowDown className="h-4 w-4" />
                <span>30 min faster</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">{overviewStats.profileViews}</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUp className="h-4 w-4" />
                <span>+15% from last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Job Performance
                </CardTitle>
                <CardDescription>Detailed metrics for each job posting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {jobPerformance.map((job) => (
                    <div key={job.id} className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{job.title}</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                              {job.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Active for {job.daysActive} days
                          </p>
                        </div>
                        <div className="text-right">
                          {job.trend === "up" ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-sm">Trending</span>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">Stable</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Views</p>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{job.views}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Applications</p>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{job.applications}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Conv. Rate</p>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{job.conversionRate}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Application rate</span>
                          <span className="font-medium">{job.conversionRate}%</span>
                        </div>
                        <Progress value={job.conversionRate * 10} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Application Sources</CardTitle>
                <CardDescription>Where candidates find your jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{source.source}</span>
                        <span className="text-muted-foreground">{source.count}</span>
                      </div>
                      <Progress value={source.percentage} />
                      <p className="text-xs text-muted-foreground">{source.percentage}% of total</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Skills Requested */}
            <Card>
              <CardHeader>
                <CardTitle>Top Skills in Demand</CardTitle>
                <CardDescription>Most requested skills in your postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSkillsRequested.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Badge variant="secondary">{item.skill}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.jobs} {item.jobs === 1 ? "job" : "jobs"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">
                  Improve Your Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Jobs with detailed descriptions get 40% more applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Clear compensation attracts quality candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Respond within 24 hours to boost engagement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerInsights;
