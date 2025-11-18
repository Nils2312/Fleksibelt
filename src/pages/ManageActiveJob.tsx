import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, MessageSquare, Calendar, XCircle, Clock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const jobChangeSchema = z.object({
  requestType: z.enum(["extension", "cancellation", "hours_change", "other"], {
    required_error: "Please select a request type",
  }),
  reason: z.string()
    .trim()
    .min(10, { message: "Reason must be at least 10 characters" })
    .max(1000, { message: "Reason must be less than 1000 characters" }),
  extensionWeeks: z.string().optional(),
  newHours: z.string().optional(),
});

const ManageActiveJob = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "student";
  const jobTitle = searchParams.get("job") || "Active Job";
  
  const [requestType, setRequestType] = useState<string>("");
  const [reason, setReason] = useState("");
  const [extensionWeeks, setExtensionWeeks] = useState("");
  const [newHours, setNewHours] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      requestType,
      reason,
      extensionWeeks,
      newHours,
    };

    try {
      jobChangeSchema.parse(formData);
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        toast.success("Request submitted successfully", {
          description: `Your ${requestType.replace("_", " ")} request has been sent. ${
            userType === "student" ? "The employer" : "The student"
          } will be notified.`,
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

  const getRequestTypeLabel = () => {
    switch (requestType) {
      case "extension":
        return "Request Extension";
      case "cancellation":
        return "Cancel Job";
      case "hours_change":
        return "Change Hours";
      case "other":
        return "Other Request";
      default:
        return "";
    }
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
          <h1 className="text-3xl font-bold mb-2">Manage Active Job</h1>
          <p className="text-muted-foreground">{jobTitle}</p>
        </div>

        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-1">Important Information</p>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                  <li>• All change requests require approval from {userType === "student" ? "the employer" : "the student"}</li>
                  <li>• Cancellations may affect your reliability score</li>
                  <li>• Be professional and provide clear reasons for your request</li>
                  <li>• If unsure, use the chat feature to discuss first</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Type</CardTitle>
              <CardDescription>Select what you would like to change</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <RadioGroup value={requestType} onValueChange={setRequestType}>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="extension" id="extension" />
                    <Label htmlFor="extension" className="flex-1 cursor-pointer font-normal">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">Request Time Extension</p>
                          <p className="text-sm text-muted-foreground">Ask for more time to complete the job</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="hours_change" id="hours_change" />
                    <Label htmlFor="hours_change" className="flex-1 cursor-pointer font-normal">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">Change Working Hours</p>
                          <p className="text-sm text-muted-foreground">Request adjustment to weekly hours</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="cancellation" id="cancellation" />
                    <Label htmlFor="cancellation" className="flex-1 cursor-pointer font-normal">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-destructive" />
                        <div>
                          <p className="font-medium text-destructive">Cancel Job</p>
                          <p className="text-sm text-muted-foreground">End the contract early</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex-1 cursor-pointer font-normal">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">Other Request</p>
                          <p className="text-sm text-muted-foreground">Something else you need to discuss</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                {errors.requestType && (
                  <p className="text-sm text-destructive">{errors.requestType}</p>
                )}
              </div>

              {requestType === "extension" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="extensionWeeks">Extension Duration (weeks)</Label>
                    <Input
                      id="extensionWeeks"
                      type="number"
                      min="1"
                      max="12"
                      placeholder="e.g., 2"
                      value={extensionWeeks}
                      onChange={(e) => setExtensionWeeks(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      How many additional weeks do you need?
                    </p>
                  </div>
                </>
              )}

              {requestType === "hours_change" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="newHours">New Weekly Hours</Label>
                    <Input
                      id="newHours"
                      type="number"
                      min="5"
                      max="40"
                      placeholder="e.g., 15"
                      value={newHours}
                      onChange={(e) => setNewHours(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Proposed new hours per week
                    </p>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="reason">
                  Reason for Request *
                  {requestType && <span className="text-muted-foreground ml-1">({getRequestTypeLabel()})</span>}
                </Label>
                <Textarea
                  id="reason"
                  rows={6}
                  placeholder="Please provide a detailed explanation for your request. Be clear and professional."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  maxLength={1000}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {errors.reason ? (
                    <p className="text-destructive">{errors.reason}</p>
                  ) : (
                    <p>Minimum 10 characters required</p>
                  )}
                  <p>{reason.length}/1000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50/50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                    Not sure what to request?
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                    If you're unsure about making a formal request, consider chatting with {userType === "student" ? "the employer" : "the student"} first to discuss your concerns or questions.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/messages")}
                    className="border-amber-600 text-amber-900 hover:bg-amber-100 dark:border-amber-400 dark:text-amber-100 dark:hover:bg-amber-900"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open Chat Instead
                  </Button>
                </div>
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
              disabled={isSubmitting || !requestType}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageActiveJob;
