import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  Users, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Clock,
  MousePointerClick,
  Share2,
  Bookmark,
  ArrowLeft
} from "lucide-react";

const JobPostingInsights = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('id') || '1';
  
  // Mock data - in real app, fetch based on jobId
  const jobData = {
    id: jobId,
    title: "Frontend Developer - React",
    status: "Active",
    posted: "2025-10-20",
    expires: "2025-11-20",
    views: 156,
    uniqueVisitors: 128,
    clicks: 89,
    applications: 12,
    saved: 23,
    shares: 8,
  };

  const locationData = [
    { city: "Oslo", views: 62, applications: 5 },
    { city: "Bergen", views: 34, applications: 3 },
    { city: "Trondheim", views: 28, applications: 2 },
    { city: "Stavanger", views: 18, applications: 1 },
    { city: "Tromsø", views: 14, applications: 1 },
  ];

  const dailyViews = [
    { date: "Oct 20", views: 12, clicks: 8 },
    { date: "Oct 21", views: 18, clicks: 11 },
    { date: "Oct 22", views: 25, clicks: 16 },
    { date: "Oct 23", views: 22, clicks: 14 },
    { date: "Oct 24", views: 31, clicks: 19 },
    { date: "Oct 25", views: 28, clicks: 15 },
    { date: "Oct 26", views: 20, clicks: 6 },
  ];

  const conversionRate = ((jobData.applications / jobData.views) * 100).toFixed(1);
  const clickThroughRate = ((jobData.clicks / jobData.views) * 100).toFixed(1);

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

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{jobData.title}</h1>
              <p className="text-muted-foreground">Performance insights and analytics</p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400">
              {jobData.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Posted {jobData.posted}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Expires {jobData.expires}
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobData.views}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {jobData.uniqueVisitors} unique visitors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MousePointerClick className="h-4 w-4 text-purple-600" />
                Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobData.clicks}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {clickThroughRate}% click-through rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobData.applications}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {conversionRate}% conversion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-amber-600" />
                Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobData.saved}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {jobData.shares} shares
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Daily Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Daily Performance
              </CardTitle>
              <CardDescription>Views and clicks over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                  <span className="text-muted-foreground">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                  <span className="text-muted-foreground">Clicks</span>
                </div>
              </div>
              <div className="space-y-5">
                {dailyViews.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium min-w-[60px]">{day.date}</span>
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <Eye className="h-3.5 w-3.5 text-blue-600" />
                          <span className="font-semibold text-blue-600">{day.views}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MousePointerClick className="h-3.5 w-3.5 text-purple-600" />
                          <span className="font-semibold text-purple-600">{day.clicks}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-12">Views</span>
                        <Progress value={(day.views / 31) * 100} className="h-2 flex-1" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-12">Clicks</span>
                        <Progress value={(day.clicks / 19) * 100} className="h-2 flex-1 [&>div]:bg-purple-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top Locations
              </CardTitle>
              <CardDescription>Where candidates are viewing from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationData.map((location, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg text-muted-foreground">
                          #{index + 1}
                        </span>
                        <span className="font-medium">{location.city}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {location.views} views • {location.applications} applications
                      </div>
                    </div>
                    <Progress value={(location.views / 62) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>How your job posting is performing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Visibility</div>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="flex-1" />
                  <span className="text-sm font-medium">Good</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Your posting is getting steady views
                </p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Engagement</div>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="flex-1" />
                  <span className="text-sm font-medium">Excellent</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  High click-through rate
                </p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Conversion</div>
                <div className="flex items-center gap-2">
                  <Progress value={60} className="flex-1" />
                  <span className="text-sm font-medium">Average</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Consider improving job description
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobPostingInsights;
