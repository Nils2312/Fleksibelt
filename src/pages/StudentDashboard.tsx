import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultProfile from "@/assets/default-profile.webp";
import {
  User, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Briefcase,
  Bell,
  CheckCircle2,
  Clock,
  Star,
  Edit,
  Download,
  Bookmark,
  Shield,
  CalendarCheck,
  XCircle,
  Flag,
  FileText,
  PlayCircle,
  Plus,
  Sparkles,
  Lightbulb,
  BarChart3
} from "lucide-react";
import StarRating from "@/components/StarRating";
import ReviewDialog from "@/components/ReviewDialog";
import { companyReviews, studentReviews } from "@/data/mockReviews";
import { toast } from "sonner";

const StudentDashboard = () => {
  const profileCompleteness = 75;
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ title: string; company: string } | null>(null);
  
  const upcomingJobs = [
    { id: 1, title: "Frontend Developer", company: "TechStart AS", date: "2025-11-15", status: "pending" },
  ];
  
  const activeWorkingJobs = [
    {
      id: 1,
      title: "Backend Developer",
      company: "DataFlow Solutions",
      companyId: "1",
      startDate: "2025-10-01",
      endDate: "2025-12-01",
      duration: "2 months",
      contractSigned: "2025-09-28",
      hoursWorked: 60,
      totalHours: 160,
    },
  ];
  
  const jobsToDeliver = [
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
  
  const completedJobs = [
    { 
      id: 1, 
      title: "Frontend Developer", 
      company: "TechStart AS", 
      completedDate: "2025-10-15",
      hasReview: true,
      rating: 5,
    },
    { 
      id: 2, 
      title: "UI/UX Developer", 
      company: "DesignHub", 
      completedDate: "2025-09-28",
      hasReview: false,
    },
    { 
      id: 3, 
      title: "Backend Developer", 
      company: "DataFlow Solutions", 
      completedDate: "2025-09-15",
      hasReview: true,
      rating: 5,
    },
  ];
  
  const handleWriteReview = (jobTitle: string, companyName: string) => {
    setSelectedJob({ title: jobTitle, company: companyName });
    setReviewDialogOpen(true);
  };
  
  const handleSubmitReview = (rating: number, review: string) => {
    toast.success("Review submitted successfully!", {
      description: "Thank you for your feedback. It helps other students make informed decisions.",
    });
  };
  
  // Show top 3 reviews for this student
  const myReviews = studentReviews.slice(0, 2);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Here's your activity overview</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={defaultProfile} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">John Doe</h3>
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                        <Shield className="h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      Computer Science Student • Oslo
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Full-stack developer with experience in React, Node.js, and modern web technologies. Passionate about building efficient and user-friendly applications.
                    </p>
                    <div className="flex gap-2">
                      <Link to="/student/profile">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </Link>
                      <Link to="/student/profile/1">
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          View Public Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Profile Completeness */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completeness</CardTitle>
                <CardDescription>Complete your profile to get more job matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{profileCompleteness}% Complete</span>
                      <span className="text-sm text-muted-foreground">Almost there!</span>
                    </div>
                    <Progress value={profileCompleteness} />
                  </div>
                  <Link to="/student/profile">
                    <Button variant="outline" className="w-full mt-4">
                      Complete Your Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Completed Jobs & Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Completed Jobs
                </CardTitle>
                <CardDescription>Write reviews for completed projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedJobs.map((job, index) => (
                    <div key={job.id}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{job.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                          <p className="text-xs text-muted-foreground">
                            Completed: {job.completedDate}
                          </p>
                          {job.hasReview && job.rating && (
                            <div className="flex items-center gap-2 mt-2">
                              <StarRating rating={job.rating} readonly size="sm" />
                              <span className="text-xs text-muted-foreground">Your review</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/completed-project?job=${encodeURIComponent(job.title)}&type=student`}>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              View Project
                            </Button>
                          </Link>
                          {job.hasReview ? (
                            <Button variant="outline" size="sm" disabled>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Reviewed
                            </Button>
                          ) : (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleWriteReview(job.title, job.company)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Write Review
                            </Button>
                          )}
                        </div>
                      </div>
                      {index < completedJobs.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* My Reviews from Employers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  Reviews from Employers
                </CardTitle>
                <CardDescription>What employers said about working with you</CardDescription>
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
                              <p className="text-sm text-muted-foreground">{review.companyName}</p>
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
                    No reviews yet. Complete your first job to receive reviews!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <Link to="/student/profile/1">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <User className="mr-2 h-5 w-5" />
                    See My Profile
                  </Button>
                </Link>
                <Link to="/student/profile">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Edit className="mr-2 h-5 w-5" />
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/student/recommended-jobs">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Recommended Jobs
                  </Button>
                </Link>
                <Link to="/student/saved-jobs">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Bookmark className="mr-2 h-5 w-5" />
                    Saved Jobs
                  </Button>
                </Link>
                <Link to="/student/cv">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </Button>
                </Link>
                <Link to="/student/calendar">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    My Calendar
                  </Button>
                </Link>
                <Link to="/student/payments">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payments
                  </Button>
                </Link>
                <Link to="/student/insights">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Insights
                  </Button>
                </Link>
                <Link to="/student-tips">
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
            
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Applications Sent</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Jobs Completed</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Earnings</span>
                  <span className="font-semibold">24,500 kr</span>
                </div>
              </CardContent>
            </Card>

            {/* Reliability Score */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Reliability Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Attendance</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">100%</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Cancellation Rate</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">0%</span>
                </div>
                <Separator />
                <div className="flex items-center justify-center pt-2">
                  <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                    <Shield className="h-3 w-3" />
                    Verified Student
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Review Dialog */}
        {selectedJob && (
          <ReviewDialog
            open={reviewDialogOpen}
            onOpenChange={setReviewDialogOpen}
            jobTitle={selectedJob.title}
            companyName={selectedJob.company}
            onSubmit={handleSubmitReview}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
