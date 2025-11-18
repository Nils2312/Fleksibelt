import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  TrendingUp,
  Bookmark
} from "lucide-react";
import JobCard from "@/components/JobCard";
import { mockJobs } from "@/data/mockJobs";

const RecommendedJobs = () => {
  // Mock student skills for filtering
  const studentSkills = ["React", "TypeScript", "Node.js", "PostgreSQL"];
  
  // Filter jobs that match student's skills
  const recommendedJobs = mockJobs.filter(job => 
    job.skills.some(skill => studentSkills.includes(skill))
  );
  
  const matchPercentage = (jobSkills: string[]) => {
    const matches = jobSkills.filter(skill => studentSkills.includes(skill)).length;
    return Math.round((matches / studentSkills.length) * 100);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/student/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Recommended Jobs for You</h1>
          </div>
          <p className="text-muted-foreground">
            These jobs match your skills and profile. Apply now to increase your chances!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Matches ({recommendedJobs.length})
                </CardTitle>
                <CardDescription>
                  Jobs that best fit your skills and experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recommendedJobs.length > 0 ? (
                  <div className="space-y-4">
                     {recommendedJobs.map((job) => (
                      <div key={job.id} className="relative">
                        <div className="absolute top-16 right-4 z-10">
                          <Badge 
                            variant="outline" 
                            className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
                          >
                            <Sparkles className="h-3 w-3" />
                            {matchPercentage(job.skills)}% Match
                          </Badge>
                        </div>
                        <JobCard {...job} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No recommended jobs at the moment
                    </p>
                    <Link to="/student/profile">
                      <Button>
                        Complete Your Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Your Skills</CardTitle>
                <CardDescription>
                  Jobs are recommended based on these skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {studentSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Link to="/student/profile" className="mt-4 block">
                  <Button variant="outline" className="w-full" size="sm">
                    Update Skills
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Tips */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Application Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Apply within 24 hours of job posting for best results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Customize your application for each job</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Highlight relevant experience and projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Keep your profile updated to get better matches</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Link to="/jobs">
                  <Button variant="outline" className="w-full">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse All Jobs
                  </Button>
                </Link>
                <Link to="/student/saved-jobs">
                  <Button variant="outline" className="w-full">
                    View Saved Jobs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedJobs;
