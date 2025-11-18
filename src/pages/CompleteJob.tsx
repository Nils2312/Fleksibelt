import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, Calendar, Building2, AlertCircle, Star, Upload, X, FileIcon, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { formatNorwegianDate } from "@/lib/utils";

const jobCompletionSchema = z.object({
  hoursWorked: z.number()
    .min(1, { message: "Hours worked must be at least 1" })
    .max(1000, { message: "Hours worked cannot exceed 1000" }),
  deliverables: z.string()
    .trim()
    .min(20, { message: "Deliverables description must be at least 20 characters" })
    .max(2000, { message: "Deliverables description must be less than 2000 characters" }),
  feedback: z.string()
    .trim()
    .max(1000, { message: "Feedback must be less than 1000 characters" })
    .optional(),
  rating: z.number()
    .min(1, { message: "Please provide a rating" })
    .max(5, { message: "Rating cannot exceed 5" }),
  review: z.string()
    .trim()
    .min(10, { message: "Review must be at least 10 characters" })
    .max(1000, { message: "Review must be less than 1000 characters" }),
});

const CompleteJob = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("job") || "Job";
  
  // Mock job data
  const jobData = {
    title: "Backend Developer",
    company: "DataFlow Solutions",
    startDate: "2025-10-01",
    endDate: "2025-12-01",
    totalHours: 160,
    currentHours: 158,
    contractedRate: "350 kr/hr",
  };
  
  const [hoursWorked, setHoursWorked] = useState(jobData.currentHours.toString());
  const [deliverables, setDeliverables] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalSize = [...files, ...newFiles].reduce((acc, file) => acc + file.size, 0);
      const maxSize = 5 * 1024 * 1024 * 1024; // 5GB in bytes
      
      if (totalSize > maxSize) {
        toast.error("Total file size cannot exceed 5GB");
        return;
      }
      
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const totalSize = [...files, ...newFiles].reduce((acc, file) => acc + file.size, 0);
      const maxSize = 5 * 1024 * 1024 * 1024; // 5GB in bytes
      
      if (totalSize > maxSize) {
        toast.error("Total file size cannot exceed 5GB");
        return;
      }
      
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      hoursWorked: Number(hoursWorked),
      deliverables,
      feedback,
      rating,
      review,
    };

    try {
      jobCompletionSchema.parse(formData);
      
      if (Number(hoursWorked) > jobData.totalHours) {
        setErrors({ hoursWorked: `Hours cannot exceed contracted total of ${jobData.totalHours}` });
        toast.error("Hours exceed contracted amount");
        return;
      }
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        toast.success("Job completed successfully!", {
          description: "The employer will be notified and process your final payment.",
        });
        setIsSubmitting(false);
        navigate("/student/dashboard");
      }, 1500);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the errors in the form");
      }
    }
  };

  const calculateEarnings = () => {
    const rate = parseInt(jobData.contractedRate);
    const hours = Number(hoursWorked) || 0;
    return (rate * hours).toLocaleString();
  };

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
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Job Delivery</h1>
          <p className="text-muted-foreground">Finalize your work and submit for completion</p>
        </div>

        <div className="space-y-6">
          {/* Job Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Position</p>
                  <p className="font-medium">{jobData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company</p>
                  <p className="font-medium">{jobData.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract Period</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{formatNorwegianDate(jobData.startDate)} - {formatNorwegianDate(jobData.endDate)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                  <p className="font-medium">{jobData.contractedRate}</p>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Hours Progress</span>
                  <span className="font-medium">{jobData.currentHours}/{jobData.totalHours} hours</span>
                </div>
                <Progress value={(jobData.currentHours / jobData.totalHours) * 100} />
              </div>
            </CardContent>
          </Card>

          {/* Work Summary Form */}
          <form onSubmit={handleComplete} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Summary</CardTitle>
                <CardDescription>Confirm your hours and describe what you delivered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hoursWorked">Total Hours Worked *</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="hoursWorked"
                      type="number"
                      min="1"
                      max={jobData.totalHours}
                      value={hoursWorked}
                      onChange={(e) => setHoursWorked(e.target.value)}
                      className="max-w-xs"
                    />
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        of {jobData.totalHours} contracted hours
                      </span>
                    </div>
                  </div>
                  {errors.hoursWorked && (
                    <p className="text-sm text-destructive">{errors.hoursWorked}</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="deliverables">Deliverables & Work Completed *</Label>
                  <Textarea
                    id="deliverables"
                    rows={8}
                    placeholder="Describe what you accomplished during this project. Include:&#10;• Key features or components developed&#10;• Technologies used&#10;• Challenges overcome&#10;• Any documentation or resources created"
                    value={deliverables}
                    onChange={(e) => setDeliverables(e.target.value)}
                    maxLength={2000}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    {errors.deliverables ? (
                      <p className="text-destructive">{errors.deliverables}</p>
                    ) : (
                      <p>Minimum 20 characters required</p>
                    )}
                    <p>{deliverables.length}/2000</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="feedback">Experience & Feedback (Optional)</Label>
                  <Textarea
                    id="feedback"
                    rows={4}
                    placeholder="Share your experience working on this project or with the employer..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    maxLength={1000}
                  />
                  <div className="flex justify-end text-xs text-muted-foreground">
                    <p>{feedback.length}/1000</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Upload Files (Optional)</Label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50"
                    }`}
                  >
                    <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Maximum total size: 5GB
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Select Files
                    </Button>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <p className="text-sm font-medium">Uploaded Files ({files.length})</p>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Total size: {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Employer Review */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Review Employer
                </CardTitle>
                <CardDescription>Share your experience working with {jobData.company}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Rating *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-sm text-destructive">{errors.rating}</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="review">Your Review *</Label>
                  <Textarea
                    id="review"
                    rows={6}
                    placeholder="Share your thoughts about working with this employer. How was the communication? Were expectations clear? Would you recommend them to other students?"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    maxLength={1000}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    {errors.review ? (
                      <p className="text-destructive">{errors.review}</p>
                    ) : (
                      <p>Minimum 10 characters required</p>
                    )}
                    <p>{review.length}/1000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900 dark:text-green-100 mb-1">
                      Estimated Payment
                    </p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                      {calculateEarnings()} kr
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Based on {hoursWorked} hours at {jobData.contractedRate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900 dark:text-amber-100">
                    <p className="font-medium mb-1">Important Information</p>
                    <ul className="space-y-1 text-amber-800 dark:text-amber-200">
                      <li>• Once submitted, this job will be marked as completed</li>
                      <li>• The employer will review your submission before final payment</li>
                      <li>• Make sure all deliverables are accurate and complete</li>
                      <li>• Your review will be visible after the employer has accepted the work</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Complete Job & Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteJob;
