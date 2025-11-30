import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Bell,
  Eye,
  Calendar,
  MessageSquare,
  CreditCard,
  BarChart3,
  CheckCircle2,
  Clock,
  Building2,
  Shield,
  Star,
  Edit,
  User,
  UserCog,
  Heart,
  XCircle as XCircleIcon,
  Flag,
  FileText,
  PlayCircle,
  ClipboardList,
  Lightbulb
} from "lucide-react";
import StarRating from "@/components/StarRating";
import ReviewDialog from "@/components/ReviewDialog";
import { companyReviews } from "@/data/mockReviews";
import { toast } from "sonner";

const EmployerDashboard = () => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ name: string; jobTitle: string } | null>(null);
  
  const stats = {
    activeJobs: 3,
    totalApplicants: 24,
    hiredThisMonth: 2,
  };
  
  const activeJobs = [
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
  
  const completedProjects = [
    {
      id: 1,
      title: "Frontend Developer",
      studentName: "Emma Johansen",
      completedDate: "2025-10-15",
      hasReview: true,
      rating: 5,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      studentName: "Lars Nielsen",
      completedDate: "2025-10-10",
      hasReview: false,
    },
    {
      id: 3,
      title: "Backend Developer",
      studentName: "Sofia Andersen",
      completedDate: "2025-09-28",
      hasReview: true,
      rating: 5,
    },
  ];
  
  const activeWorkingJobs = [
    {
      id: 1,
      title: "UI/UX Developer",
      studentName: "Erik Hansen",
      studentId: "1",
      startDate: "2025-10-15",
      endDate: "2025-12-15",
      duration: "2 months",
      contractSigned: "2025-10-14",
      hoursWorked: 45,
      totalHours: 120,
    },
  ];
  
  const handleWriteReview = (studentName: string, jobTitle: string) => {
    setSelectedStudent({ name: studentName, jobTitle });
    setReviewDialogOpen(true);
  };
  
  const handleSubmitReview = (rating: number, review: string) => {
    toast.success("Review submitted successfully!", {
      description: "Your feedback helps students build their reputation on the platform.",
    });
  };
  
  // Reviews from students about this company
  const myReviews = companyReviews.filter(r => r.companyName === "TechStart AS").slice(0, 3);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, TechStart AS</p>
          </div>
          <Link to="/employer/post-job">
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{stats.activeJobs}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Total Applicants</p>
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{stats.totalApplicants}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Hired This Month</p>
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold">{stats.hiredThisMonth}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Company Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">TechStart AS</h3>
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                        <Shield className="h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                    
                    {/* Achievement Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link to="/badges-info">
                        <Badge 
                          variant="outline" 
                          className="flex items-center gap-1 bg-pink-500/10 text-pink-500 border-pink-500/20 hover:bg-pink-500/20 transition-colors cursor-pointer"
                        >
                          <Heart className="h-3 w-3" />
                          Student-Friendly
                        </Badge>
                      </Link>
                      <Link to="/badges-info">
                        <Badge 
                          variant="outline" 
                          className="flex items-center gap-1 bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 transition-colors cursor-pointer"
                        >
                          <XCircleIcon className="h-3 w-3" />
                          Low Cancellation Rate
                        </Badge>
                      </Link>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      Contact: Anna Larsen
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Oslo-based tech company specializing in web development and digital solutions.
                    </p>
                    <div className="flex gap-2">
                      <Link to="/employer/profile">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </Link>
                      <Link to="/employer/profile/1">
                        <Button variant="outline" size="sm">
                          <Building2 className="h-4 w-4 mr-2" />
                          View Public Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Completed Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Completed Projects
                </CardTitle>
                <CardDescription>Rate students who worked for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedProjects.map((project, index) => (
                    <div key={project.id}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Student: {project.studentName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Completed: {project.completedDate}
                          </p>
                          {project.hasReview && project.rating && (
                            <div className="flex items-center gap-2 mt-2">
                              <StarRating rating={project.rating} readonly size="sm" />
                              <span className="text-xs text-muted-foreground">Your review</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/completed-project?job=${encodeURIComponent(project.title)}&type=employer`}>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              View Project
                            </Button>
                          </Link>
                          {project.hasReview ? (
                            <Button variant="outline" size="sm" disabled>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Reviewed
                            </Button>
                          ) : (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleWriteReview(project.studentName, project.title)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Write Review
                            </Button>
                          )}
                        </div>
                      </div>
                      {index < completedProjects.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Reviews from Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  Reviews from Students
                </CardTitle>
                <CardDescription>What students said about working with you</CardDescription>
              </CardHeader>
              <CardContent>
                {myReviews.length > 0 ? (
                  <div className="space-y-4">
                    {myReviews.map((review, index) => (
                      <div key={review.id}>
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{review.reviewerName}</p>
                              <p className="text-sm text-muted-foreground">{review.jobTitle}</p>
                            </div>
                            <StarRating rating={review.rating} readonly size="sm" />
                          </div>
                          <p className="text-sm leading-relaxed">{review.comment}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                        {index < myReviews.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No reviews yet. Complete your first project to receive reviews!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan */}
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Current Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-base px-3 py-1">
                    Basic Plan
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  1,500 kr per job posting
                </p>
                <Separator />
                <Link to="/employer/pricing">
                  <Button variant="default" className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Upgrade to Business
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Get unlimited postings for 12,000 kr/year
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <Link to="/employer/profile/1">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <User className="mr-2 h-5 w-5" />
                    See My Profile
                  </Button>
                </Link>
                <Link to="/employer/profile">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Edit className="mr-2 h-5 w-5" />
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/employer/team-members">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <UserCog className="mr-2 h-5 w-5" />
                    Team Members
                  </Button>
                </Link>
                <Link to="/employer/post-job">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Post New Job
                  </Button>
                </Link>
                <Link to="/employer/insights">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Insights
                  </Button>
                </Link>
                <Link to="/employer/payments">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payments
                  </Button>
                </Link>
                <Link to="/employer-tips">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Success Tips
                  </Button>
                </Link>
                <Link to="/report">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Flag className="mr-2 h-5 w-5" />
                    Report Issue
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Tips */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">
                  Hiring Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Respond to applications within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Provide clear project requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Offer competitive rates for quality work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Consider students for internship credit</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Review Dialog */}
        {selectedStudent && (
          <ReviewDialog
            open={reviewDialogOpen}
            onOpenChange={setReviewDialogOpen}
            jobTitle={selectedStudent.jobTitle}
            companyName={selectedStudent.name}
            onSubmit={handleSubmitReview}
            isEmployer={true}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
