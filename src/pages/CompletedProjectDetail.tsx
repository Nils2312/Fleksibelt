import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Download,
  Calendar,
  Clock,
  FileText,
  User,
  Building2,
  CheckCircle2,
  Star
} from "lucide-react";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";
import { formatNorwegianDate } from "@/lib/utils";

const CompletedProjectDetail = () => {
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("job") || "Project";
  const userType = searchParams.get("type") || "student";
  
  // Mock data - would come from backend
  const projectData = {
    title: jobTitle,
    company: "TechStart AS",
    student: "Emma Johansen",
    startDate: "2025-09-01",
    endDate: "2025-10-15",
    completedDate: "2025-10-15",
    totalHours: 120,
    hoursWorked: 122,
    hourlyRate: 350,
    totalEarnings: 42700,
    description: "Developed a responsive React application with TypeScript, integrated REST APIs, and implemented modern UI components using Tailwind CSS.",
    review: {
      rating: 5,
      comment: "Excellent work! Very professional and delivered high quality code. Great communication throughout the project.",
      reviewDate: "2025-10-16",
    },
    deliverables: [
      { id: 1, name: "Source Code - Final Version.zip", size: "2.4 MB", type: "application/zip" },
      { id: 2, name: "Project Documentation.pdf", size: "856 KB", type: "application/pdf" },
      { id: 3, name: "API Integration Guide.pdf", size: "423 KB", type: "application/pdf" },
      { id: 4, name: "Screenshots & Assets.zip", size: "4.2 MB", type: "application/zip" },
    ],
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
    // Actual download logic would go here
  };

  const handleDownloadAll = () => {
    toast.success("Preparing download archive...", {
      description: "All project files will be downloaded as a single archive.",
    });
    // Actual download logic would go here
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to={userType === "student" ? "/student/dashboard" : "/employer/dashboard"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">{projectData.title}</h1>
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </Badge>
          </div>
          <p className="text-muted-foreground">Project completed on {projectData.completedDate}</p>
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
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Company</p>
                        <p className="font-medium">{projectData.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Student</p>
                        <p className="font-medium">{projectData.student}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Project Duration</p>
                        <p className="font-medium">{formatNorwegianDate(projectData.startDate)} - {formatNorwegianDate(projectData.endDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Total Hours</p>
                        <p className="font-medium">{projectData.hoursWorked}h / {projectData.totalHours}h</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{projectData.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Deliverables & Files */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Project Deliverables</CardTitle>
                    <CardDescription>All files submitted for this project</CardDescription>
                  </div>
                  <Button onClick={handleDownloadAll}>
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projectData.deliverables.map((file) => (
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

            {/* Review */}
            {projectData.review && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    {userType === "student" ? "Employer's Review" : "Your Review"}
                  </CardTitle>
                  <CardDescription>
                    Reviewed on {projectData.review.reviewDate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <StarRating rating={projectData.review.rating} readonly />
                  <p className="text-sm text-muted-foreground">{projectData.review.comment}</p>
                </CardContent>
              </Card>
            )}
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
                  <span className="font-medium">{projectData.hoursWorked}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hourly Rate</span>
                  <span className="font-medium">{projectData.hourlyRate} NOK</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total Earnings</span>
                  <span className="font-bold text-lg text-primary">
                    {projectData.totalEarnings.toLocaleString()} NOK
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Link to="/messages">
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </Link>
                {userType === "student" ? (
                  <Link to={`/employer/profile/${projectData.company}`}>
                    <Button variant="outline" className="w-full">
                      View Company Profile
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/student/profile/${projectData.student}`}>
                    <Button variant="outline" className="w-full">
                      View Student Profile
                    </Button>
                  </Link>
                )}
                <Link to="/report">
                  <Button variant="outline" className="w-full text-destructive">
                    Report Issue
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

export default CompletedProjectDetail;
