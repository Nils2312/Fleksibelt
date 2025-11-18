import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, MapPin, Clock, Briefcase, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { mockJobs } from "@/data/mockJobs";

const StudentSavedJobs = () => {
  // Mock saved jobs - in a real app, this would come from a database
  const savedJobIds = ["1", "2", "4"];
  const savedJobs = mockJobs.filter(job => savedJobIds.includes(job.id));
  
  // Mock expired jobs - jobs posted more than 30 days ago
  const expiredJobs = [
    {
      id: 101,
      title: "Full Stack Developer",
      company: "Legacy Tech AS",
      location: "Oslo",
      salary: "500-700 kr/hour",
      duration: "3 months",
      skills: ["React", "Node.js", "MongoDB"],
      posted: "45 days ago",
      expired: "15 days ago"
    },
    {
      id: 102,
      title: "Mobile Developer",
      company: "App Solutions",
      location: "Bergen",
      salary: "550-750 kr/hour",
      duration: "4 months",
      skills: ["React Native", "iOS", "Android"],
      posted: "60 days ago",
      expired: "30 days ago"
    }
  ];

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
          <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
          <p className="text-muted-foreground">Keep track of jobs you're interested in</p>
        </div>

        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="saved">
              Saved Jobs ({savedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired Jobs ({expiredJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="mt-6">
            {savedJobs.length > 0 ? (
              <div className="grid gap-4">
                {savedJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="flex items-start gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{job.title}</h3>
                              <Bookmark className="h-5 w-5 fill-primary text-primary flex-shrink-0" />
                            </div>
                            <p className="text-muted-foreground font-medium">{job.company}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {job.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="outline">+{job.skills.length - 3} more</Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 pt-2">
                            <Link to={`/jobs/${job.id}`}>
                              <Button>View Details</Button>
                            </Link>
                            <Button variant="outline">Remove</Button>
                            <span className="text-xs text-muted-foreground ml-auto">
                              Posted {job.posted}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No saved jobs yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start saving jobs you're interested in to keep track of them
                  </p>
                  <Link to="/jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="expired" className="mt-6">
            {expiredJobs.length > 0 ? (
              <div className="grid gap-4">
                {expiredJobs.map((job) => (
                  <Card key={job.id} className="opacity-75">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="flex items-start gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-muted-foreground">
                                {job.title}
                              </h3>
                              <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800">
                                <AlertCircle className="h-3 w-3" />
                                Expired
                              </Badge>
                            </div>
                            <p className="text-muted-foreground font-medium">{job.company}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 pt-2">
                            <Button variant="outline" disabled>
                              No Longer Available
                            </Button>
                            <Button variant="ghost">Remove from List</Button>
                            <span className="text-xs text-muted-foreground ml-auto">
                              Expired {job.expired}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No expired jobs</h3>
                  <p className="text-muted-foreground">
                    Your saved jobs that have expired will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentSavedJobs;
