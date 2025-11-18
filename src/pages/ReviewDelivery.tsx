import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Download,
  Calendar,
  Clock,
  FileText,
  User,
  CheckCircle2,
  XCircle,
  MessageSquare
} from "lucide-react";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";
import { formatNorwegianDate } from "@/lib/utils";

const ReviewDelivery = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobTitle = searchParams.get("job") || "Project";
  const studentName = searchParams.get("student") || "Student";
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  
  // Mock data - would come from backend
  const deliveryData = {
    title: jobTitle,
    student: studentName,
    studentId: "1",
    startDate: "2025-10-15",
    endDate: "2025-12-15",
    submittedDate: "2025-12-14",
    totalHours: 120,
    hoursWorked: 122,
    hourlyRate: 350,
    totalPayment: 42700,
    description: "Completed all assigned tasks including UI development, API integration, and responsive design implementation. All deliverables have been tested and are ready for review.",
    deliverables: [
      { id: 1, name: "Final-Source-Code.zip", size: "3.2 MB", type: "application/zip" },
      { id: 2, name: "Project-Documentation.pdf", size: "1.1 MB", type: "application/pdf" },
      { id: 3, name: "Testing-Report.pdf", size: "645 KB", type: "application/pdf" },
      { id: 4, name: "Design-Assets.zip", size: "5.8 MB", type: "application/zip" },
    ],
    studentNotes: "All requirements have been implemented according to the specifications. The application has been thoroughly tested across different browsers and devices. Please review and let me know if any changes are needed.",
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
  };

  const handleDownloadAll = () => {
    toast.success("Preparing download archive...", {
      description: "All project files will be downloaded as a single archive.",
    });
  };

  const handleAccept = () => {
    if (rating === 0) {
      toast.error("Please provide a rating before accepting");
      return;
    }
    
    setIsAccepted(true);
    toast.success("Delivery accepted!", {
      description: "Payment will be processed and the student will be notified.",
    });
    
    setTimeout(() => {
      navigate("/employer/dashboard");
    }, 2000);
  };

  const handleReject = () => {
    if (!reviewText.trim()) {
      toast.error("Please provide feedback explaining what needs to be changed");
      return;
    }
    
    setIsAccepted(false);
    toast.success("Delivery rejected with feedback", {
      description: "The student will be notified and can resubmit after making changes.",
    });
    
    setTimeout(() => {
      navigate("/employer/dashboard");
    }, 2000);
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

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">{deliveryData.title}</h1>
            <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
              <Clock className="h-4 w-4" />
              Pending Review
            </Badge>
          </div>
          <p className="text-muted-foreground">Submitted on {deliveryData.submittedDate}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Student</p>
                        <Link to={`/student/profile/${deliveryData.studentId}`}>
                          <p className="font-medium hover:text-primary cursor-pointer">{deliveryData.student}</p>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Project Duration</p>
                        <p className="font-medium">{formatNorwegianDate(deliveryData.startDate)} - {formatNorwegianDate(deliveryData.endDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Student's Notes</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{deliveryData.studentNotes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Deliverables & Files */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Deliverables</CardTitle>
                    <CardDescription>Review and download submitted files</CardDescription>
                  </div>
                  <Button onClick={handleDownloadAll}>
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deliveryData.deliverables.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(file.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Section */}
            <Card>
              <CardHeader>
                <CardTitle>Your Review</CardTitle>
                <CardDescription>Rate the student's work and provide feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Review / Feedback</label>
                  <Textarea
                    placeholder="Share your experience working with this student..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                  />
                </div>

                {isAccepted === null && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1" 
                      size="lg"
                      onClick={handleAccept}
                      disabled={rating === 0}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Accept Delivery
                    </Button>
                    <Link to={`/employer/request-changes?job=${encodeURIComponent(jobTitle)}&student=${encodeURIComponent(studentName)}`} className="flex-1">
                      <Button 
                        variant="destructive" 
                        className="w-full" 
                        size="lg"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Request Changes
                      </Button>
                    </Link>
                  </div>
                )}

                {isAccepted === true && (
                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Delivery accepted! Payment is being processed.
                    </p>
                  </div>
                )}

                {isAccepted === false && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Student notified about required changes.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hours Worked</span>
                  <span className="font-medium">{deliveryData.hoursWorked}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hourly Rate</span>
                  <span className="font-medium">{deliveryData.hourlyRate} NOK</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total Payment</span>
                  <span className="font-bold text-lg text-primary">
                    {deliveryData.totalPayment.toLocaleString()} NOK
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Payment will be processed upon acceptance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Link to="/messages">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Student
                  </Button>
                </Link>
                <Link to={`/student/profile/${deliveryData.studentId}`}>
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
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

export default ReviewDelivery;
