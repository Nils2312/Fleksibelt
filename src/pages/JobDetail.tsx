import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Clock, Banknote, Building2, Calendar, ArrowLeft, Bookmark, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import StarRating from "@/components/StarRating";
import { mockJobs } from "@/data/mockJobs";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { formatNorwegianDate } from "@/lib/utils";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const job = mockJobs.find(j => j.id === id);
  const [hasApplied, setHasApplied] = useState(false);
  
  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Job not found</h1>
          <Link to="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to apply for jobs");
      navigate("/auth");
      return;
    }
    
    if (userRole !== 'student') {
      toast.error("Only students can apply for jobs");
      return;
    }
    
    setHasApplied(true);
    toast.success("Application sent successfully!", {
      description: "The employer will review your profile and get back to you soon."
    });
  };

  const handleSendMessage = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to send messages");
      navigate("/auth");
      return;
    }
    navigate("/messages");
  };

  const handleSaveJob = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to save jobs");
      navigate("/auth");
      return;
    }
    toast.success("Job saved!");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{job.company}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleSaveJob}>
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Start: {formatNorwegianDate(job.startDate)}</span>
                  </div>
                </div>
                
                {job.isInternshipRelevant && (
                  <Badge variant="outline" className="mb-6">
                    ✓ Relevant for internship credit
                  </Badge>
                )}
                
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                    <ul className="space-y-2">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">About the Employer</h3>
                  <Link to="/employer/profile/1">
                    <div className="flex items-start gap-4 mb-4 py-4 pr-4 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <div className="h-20 w-20 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-10 w-10 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium hover:text-primary transition-colors text-lg">{job.company}</p>
                        <p className="text-sm text-muted-foreground mb-2">Contact: {job.employerName}</p>
                        <div className="flex items-center gap-2">
                          <StarRating rating={4.7} readonly size="sm" />
                          <span className="text-sm font-medium">4.7</span>
                          <span className="text-sm text-muted-foreground">(32 reviews)</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Posted {job.posted}
                  </p>
                </div>
                
                <Separator />
                
                <div className="flex flex-col gap-3">
                  {!hasApplied ? (
                    <Button className="w-full" size="lg" onClick={handleApply}>
                      Apply Now
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg" disabled>
                      Application Sent ✓
                    </Button>
                  )}
                  
                  <Link to="/employer/profile/1">
                    <Button variant="outline" className="w-full" size="lg">
                      <Building2 className="h-4 w-4 mr-2" />
                      Visit Profile
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={handleSendMessage}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Employer
                  </Button>
                </div>
                
                <p className="text-xs text-center text-muted-foreground">
                  Have questions? Message the employer before applying
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
