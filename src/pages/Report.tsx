import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

const reportSchema = z.object({
  reportType: z.enum(["student", "employer"], {
    required_error: "Please select who you want to report",
  }),
  reportedName: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(2000, { message: "Description must be less than 2000 characters" }),
  incidentDate: z.string().optional(),
  contactEmail: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
});

const Report = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const { isAuthenticated, userRole } = useAuth();
  
  const [reportType, setReportType] = useState<"student" | "employer">(
    typeParam === "student" || typeParam === "employer" ? typeParam : "student"
  );
  const [reportedName, setReportedName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = {
    student: [
      "No-show / Cancellation",
      "Unprofessional Behavior",
      "Poor Quality Work",
      "Contract Violation",
      "Harassment",
      "Other",
    ],
    employer: [
      "Non-payment",
      "Unprofessional Behavior",
      "Misleading Job Description",
      "Contract Violation",
      "Harassment",
      "Other",
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      reportType,
      reportedName,
      category,
      description,
      incidentDate,
      contactEmail,
    };

    try {
      reportSchema.parse(formData);
      
      setIsSubmitting(true);
      
      // Simulate submission
      setTimeout(() => {
        toast.success("Report submitted successfully", {
          description: "Our team will review your report and take appropriate action.",
        });
        setIsSubmitting(false);
        navigate(-1);
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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {isAuthenticated && (
          <Link 
            to={userRole === 'employer' ? '/employer/dashboard' : '/student/dashboard'}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        )}
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit a Report</h1>
          <p className="text-muted-foreground">
            Help us maintain a safe and professional community
          </p>
        </div>

        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900 dark:text-amber-100">
                <p className="font-medium mb-1">Important Information</p>
                <ul className="space-y-1 text-amber-800 dark:text-amber-200">
                  <li>• All reports are reviewed by our moderation team</li>
                  <li>• False reports may result in account suspension</li>
                  <li>• We take all reports seriously and investigate thoroughly</li>
                  <li>• Your contact information will be kept confidential</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>Provide information about the incident</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Who are you reporting? *</Label>
                <RadioGroup value={reportType} onValueChange={(value: "student" | "employer") => {
                  setReportType(value);
                  setCategory("");
                }}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="font-normal cursor-pointer">
                      A Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="employer" />
                    <Label htmlFor="employer" className="font-normal cursor-pointer">
                      An Employer
                    </Label>
                  </div>
                </RadioGroup>
                {errors.reportType && (
                  <p className="text-sm text-destructive">{errors.reportType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportedName">
                  {reportType === "student" ? "Student Name" : "Company/Employer Name"} *
                </Label>
                <Input
                  id="reportedName"
                  placeholder={reportType === "student" ? "Enter student name" : "Enter company or employer name"}
                  value={reportedName}
                  onChange={(e) => setReportedName(e.target.value)}
                  maxLength={100}
                />
                {errors.reportedName && (
                  <p className="text-sm text-destructive">{errors.reportedName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Report Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[reportType].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentDate">Incident Date (Optional)</Label>
                <Input
                  id="incidentDate"
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={8}
                  placeholder="Please provide detailed information about the incident. Include specific dates, actions, and any relevant context that will help us investigate."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={2000}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {errors.description ? (
                    <p className="text-destructive">{errors.description}</p>
                  ) : (
                    <p>Minimum 10 characters required</p>
                  )}
                  <p>{description.length}/2000</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Your Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  maxLength={255}
                />
                <p className="text-xs text-muted-foreground">
                  We may contact you for additional information
                </p>
                {errors.contactEmail && (
                  <p className="text-sm text-destructive">{errors.contactEmail}</p>
                )}
              </div>
            </CardContent>
          </Card>

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
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;
