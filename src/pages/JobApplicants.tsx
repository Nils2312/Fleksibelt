import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultProfile from "@/assets/default-profile.webp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  GraduationCap, 
  Clock, 
  Banknote,
  Github,
  Linkedin,
  Globe,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare
} from "lucide-react";
import { mockJobs } from "@/data/mockJobs";
import { mockApplicants, Applicant } from "@/data/mockApplicants";
import { toast } from "sonner";

const JobApplicants = () => {
  const { jobId } = useParams();
  const job = mockJobs.find(j => j.id === jobId);
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants[jobId || ""] || []);
  const [selectedTab, setSelectedTab] = useState("all");
  
  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Job not found</h1>
          <Link to="/employer/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAccept = (applicantId: string) => {
    setApplicants(applicants.map(a => 
      a.id === applicantId ? { ...a, status: "accepted" } : a
    ));
    const applicant = applicants.find(a => a.id === applicantId);
    toast.success(`${applicant?.name} has been accepted!`, {
      description: "You can now message them to discuss next steps."
    });
  };
  
  const handleReject = (applicantId: string) => {
    setApplicants(applicants.map(a => 
      a.id === applicantId ? { ...a, status: "rejected" } : a
    ));
    toast.info("Applicant has been rejected");
  };
  
  const handleMarkReviewed = (applicantId: string) => {
    setApplicants(applicants.map(a => 
      a.id === applicantId ? { ...a, status: "reviewed" } : a
    ));
  };
  
  const filteredApplicants = applicants.filter(applicant => {
    if (selectedTab === "all") return true;
    if (selectedTab === "pending") return applicant.status === "pending";
    if (selectedTab === "reviewed") return applicant.status === "reviewed";
    if (selectedTab === "accepted") return applicant.status === "accepted";
    return true;
  });
  
  const counts = {
    all: applicants.length,
    pending: applicants.filter(a => a.status === "pending").length,
    reviewed: applicants.filter(a => a.status === "reviewed").length,
    accepted: applicants.filter(a => a.status === "accepted").length,
  };
  
  const getLinkIcon = (type: string) => {
    switch (type) {
      case "github": return <Github className="h-4 w-4" />;
      case "linkedin": return <Linkedin className="h-4 w-4" />;
      case "website": return <Globe className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending Review</Badge>;
      case "reviewed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Reviewed</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Accepted
        </Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/active-jobs" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Active Jobs
        </Link>
        
        {/* Job Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                <p className="text-muted-foreground">{job.company}</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.duration}
              </span>
              <span className="flex items-center gap-1">
                <Banknote className="h-4 w-4" />
                {job.salary}
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{counts.all}</p>
              <p className="text-sm text-muted-foreground">Total Applicants</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{counts.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{counts.reviewed}</p>
              <p className="text-sm text-muted-foreground">Reviewed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{counts.accepted}</p>
              <p className="text-sm text-muted-foreground">Accepted</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Applicants List */}
        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
                <TabsTrigger value="reviewed">Reviewed ({counts.reviewed})</TabsTrigger>
                <TabsTrigger value="accepted">Accepted ({counts.accepted})</TabsTrigger>
              </TabsList>
              
              <TabsContent value={selectedTab} className="space-y-6">
                {filteredApplicants.length > 0 ? (
                  filteredApplicants.map((applicant, index) => (
                    <div key={applicant.id}>
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <Link to={`/student/profile/${applicant.id}`}>
                              <Avatar className="h-16 w-16 cursor-pointer hover:opacity-80 transition-opacity">
                                <AvatarImage src={defaultProfile} />
                                <AvatarFallback className="text-lg">{applicant.avatar}</AvatarFallback>
                              </Avatar>
                            </Link>
                            <div>
                              <Link to={`/student/profile/${applicant.id}`}>
                                <h3 className="text-xl font-semibold mb-1 hover:text-primary cursor-pointer">
                                  {applicant.name}
                                </h3>
                              </Link>
                              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                                <span className="flex items-center gap-1">
                                  <GraduationCap className="h-4 w-4" />
                                  {applicant.university}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {applicant.location}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {applicant.studyProgram}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(applicant.status)}
                            <p className="text-xs text-muted-foreground mt-2">
                              Applied {applicant.appliedDate}
                            </p>
                          </div>
                        </div>
                        
                        {/* Bio */}
                        <div>
                          <p className="text-sm leading-relaxed">{applicant.bio}</p>
                        </div>
                        
                        {/* Skills */}
                        <div>
                          <p className="text-sm font-medium mb-2">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {applicant.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Details Grid */}
                        <div className="p-4 bg-secondary rounded-lg">
                          <div>
                            <p className="text-sm font-medium mb-1">Available Days</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {applicant.availability}
                            </p>
                          </div>
                        </div>
                        
                        {/* Portfolio Links */}
                        <div>
                          <p className="text-sm font-medium mb-2">Portfolio & Links</p>
                          <div className="flex flex-wrap gap-2">
                            {applicant.portfolioLinks.github && (
                              <a
                                href={applicant.portfolioLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-md text-sm hover:bg-secondary/80 transition-colors"
                              >
                                <Github className="h-4 w-4" />
                                GitHub
                              </a>
                            )}
                            {applicant.portfolioLinks.linkedin && (
                              <a
                                href={applicant.portfolioLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-md text-sm hover:bg-secondary/80 transition-colors"
                              >
                                <Linkedin className="h-4 w-4" />
                                LinkedIn
                              </a>
                            )}
                            {applicant.portfolioLinks.website && (
                              <a
                                href={applicant.portfolioLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-md text-sm hover:bg-secondary/80 transition-colors"
                              >
                                <Globe className="h-4 w-4" />
                                Portfolio
                              </a>
                            )}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Link to={`/student/profile/${applicant.id}`}>
                            <Button variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Full Profile
                            </Button>
                          </Link>
                          {applicant.status === "pending" && (
                            <>
                              <Button 
                                variant="default"
                                onClick={() => handleAccept(applicant.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Accept Applicant
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handleMarkReviewed(applicant.id)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Mark as Reviewed
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handleReject(applicant.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                          {applicant.status === "reviewed" && (
                            <>
                              <Button 
                                variant="default"
                                onClick={() => handleAccept(applicant.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Accept Applicant
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handleReject(applicant.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                          {applicant.status === "accepted" && (
                            <Button variant="default">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send Message
                            </Button>
                          )}
                          {applicant.status !== "accepted" && (
                            <Link to="/messages">
                              <Button variant="outline">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                      
                      {index < filteredApplicants.length - 1 && (
                        <Separator className="my-6" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No applicants in this category yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobApplicants;
