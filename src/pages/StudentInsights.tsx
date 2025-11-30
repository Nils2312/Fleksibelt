import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Banknote, 
  Briefcase, 
  Clock, 
  Star,
  Eye,
  ThumbsUp,
  Target,
  Award,
  Calendar,
  BarChart3
} from "lucide-react";

const StudentInsights = () => {
  // Mock data - would come from backend
  const insights = {
    totalEarnings: 45800,
    earningsGrowth: 12,
    completedJobs: 8,
    activeApplications: 3,
    profileViews: 156,
    profileViewsGrowth: 23,
    averageRating: 4.8,
    responseRate: 95,
    successRate: 87,
    totalHoursWorked: 142,
    averageHourlyRate: 380,
  };

  const monthlyEarnings = [
    { month: "Oct", amount: 12500 },
    { month: "Nov", amount: 15600 },
    { month: "Dec", amount: 17700 },
  ];

  const topSkills = [
    { name: "React", jobs: 5, earnings: 22000 },
    { name: "TypeScript", jobs: 4, earnings: 18000 },
    { name: "Node.js", jobs: 3, earnings: 15800 },
  ];

  const recentActivity = [
    { date: "2025-12-15", action: "Completed job", details: "Frontend Developer - TechStart AS" },
    { date: "2025-12-10", action: "Applied to job", details: "Backend Developer - DataFlow" },
    { date: "2025-12-05", action: "Profile viewed", details: "15 employers viewed your profile" },
    { date: "2025-11-28", action: "Received review", details: "5-star review from Nordic Innovate" },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Link 
          to="/student/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Insights</h1>
          <p className="text-muted-foreground">Track your performance and growth on the platform</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{insights.totalEarnings.toLocaleString()} kr</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +{insights.earningsGrowth}% this month
                  </p>
                </div>
                <Banknote className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed Jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{insights.completedJobs}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {insights.activeApplications} active applications
                  </p>
                </div>
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Profile Views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{insights.profileViews}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +{insights.profileViewsGrowth}% this week
                  </p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{insights.averageRating}/5.0</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    From {insights.completedJobs} reviews
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Performance Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Earnings Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Earnings Trend
                </CardTitle>
                <CardDescription>Your monthly earnings over the last 3 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyEarnings.map((data, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{data.month}</span>
                        <span className="text-sm font-bold">{data.amount.toLocaleString()} kr</span>
                      </div>
                      <Progress 
                        value={(data.amount / Math.max(...monthlyEarnings.map(m => m.amount))) * 100} 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Earning Skills
                </CardTitle>
                <CardDescription>Skills that generate the most income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-xs text-muted-foreground">{skill.jobs} jobs completed</p>
                        </div>
                        <span className="text-sm font-bold">{skill.earnings.toLocaleString()} kr</span>
                      </div>
                      <Progress 
                        value={(skill.earnings / Math.max(...topSkills.map(s => s.earnings))) * 100} 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index}>
                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.details}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                        </div>
                      </div>
                      {index < recentActivity.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Performance Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Response Rate</span>
                    <span className="text-sm font-medium">{insights.responseRate}%</span>
                  </div>
                  <Progress value={insights.responseRate} />
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-medium">{insights.successRate}%</span>
                  </div>
                  <Progress value={insights.successRate} />
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Hours</span>
                    <span className="text-sm font-medium">{insights.totalHoursWorked}h</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Hourly Rate</span>
                    <span className="text-sm font-medium">{insights.averageHourlyRate} kr/hr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ThumbsUp className="h-4 w-4" />
                  Growth Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Complete your profile to get 40% more views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Respond within 24h to increase success rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Add portfolio projects to stand out</span>
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

export default StudentInsights;
