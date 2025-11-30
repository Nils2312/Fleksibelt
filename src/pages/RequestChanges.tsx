import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Calendar,
  Banknote,
  AlertCircle,
  Send,
  User,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";

const RequestChanges = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobTitle = searchParams.get("job") || "Project";
  const studentName = searchParams.get("student") || "Student";
  
  const [changeDetails, setChangeDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [paymentAdjustment, setPaymentAdjustment] = useState("no-change");
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");
  
  // Mock data
  const projectData = {
    title: jobTitle,
    student: studentName,
    studentId: "1",
    originalDeadline: "2025-12-15",
    totalPayment: 42700,
  };

  const handleSubmit = () => {
    if (!changeDetails.trim()) {
      toast.error("Please describe what changes are needed");
      return;
    }
    
    if (!deadline) {
      toast.error("Please set a deadline for resubmission");
      return;
    }
    
    if (paymentAdjustment === "adjust" && !adjustmentAmount.trim()) {
      toast.error("Please specify the payment adjustment amount");
      return;
    }
    
    toast.success("Change request sent successfully!", {
      description: "The student will be notified and can resubmit after making the changes.",
    });
    
    setTimeout(() => {
      navigate("/employer/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to={`/employer/review-delivery?job=${encodeURIComponent(jobTitle)}&student=${encodeURIComponent(studentName)}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Review
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-8 w-8 text-amber-600" />
            <h1 className="text-3xl font-bold">Request Changes</h1>
          </div>
          <p className="text-muted-foreground">
            Specify what needs to be changed and set a new deadline for resubmission
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Change Details */}
            <Card>
              <CardHeader>
                <CardTitle>What needs to be changed?</CardTitle>
                <CardDescription>
                  Be specific and clear about what changes are required
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Change Description *</Label>
                  <Textarea
                    placeholder="Please describe in detail what needs to be changed, improved, or fixed..."
                    value={changeDetails}
                    onChange={(e) => setChangeDetails(e.target.value)}
                    rows={6}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Provide clear instructions to help the student understand what needs to be done
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline & Priority */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline & Priority</CardTitle>
                <CardDescription>
                  Set expectations for when changes should be completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="deadline">Resubmission Deadline *</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Original deadline was: {projectData.originalDeadline}
                  </p>
                </div>

                <Separator />

                <div>
                  <Label>Priority Level</Label>
                  <RadioGroup value={priority} onValueChange={setPriority} className="mt-3 space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="font-normal cursor-pointer">
                        <span className="font-medium">Low Priority</span>
                        <span className="text-sm text-muted-foreground block">Minor changes, can be done when convenient</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="font-normal cursor-pointer">
                        <span className="font-medium">Medium Priority</span>
                        <span className="text-sm text-muted-foreground block">Standard changes, should be completed by deadline</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="font-normal cursor-pointer">
                        <span className="font-medium">High Priority</span>
                        <span className="text-sm text-muted-foreground block">Critical changes, needs immediate attention</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Payment Adjustment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Adjustment</CardTitle>
                <CardDescription>
                  Decide if payment should be adjusted based on the changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <RadioGroup value={paymentAdjustment} onValueChange={setPaymentAdjustment} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no-change" id="no-change" />
                      <Label htmlFor="no-change" className="font-normal cursor-pointer">
                        <span className="font-medium">No Change to Payment</span>
                        <span className="text-sm text-muted-foreground block">
                          Keep original payment: {projectData.totalPayment.toLocaleString()} NOK
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="adjust" id="adjust" />
                      <Label htmlFor="adjust" className="font-normal cursor-pointer">
                        <span className="font-medium">Adjust Payment</span>
                        <span className="text-sm text-muted-foreground block">Reduce payment due to incomplete work</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bonus" id="bonus" />
                      <Label htmlFor="bonus" className="font-normal cursor-pointer">
                        <span className="font-medium">Bonus Upon Completion</span>
                        <span className="text-sm text-muted-foreground block">Offer bonus for quick turnaround</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {(paymentAdjustment === "adjust" || paymentAdjustment === "bonus") && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="adjustment-amount">
                          {paymentAdjustment === "bonus" ? "Bonus Amount" : "Adjustment Amount"} (NOK) *
                        </Label>
                        <div className="flex items-center gap-2 mt-2">
                          <Banknote className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="adjustment-amount"
                            type="number"
                            placeholder="0"
                            value={adjustmentAmount}
                            onChange={(e) => setAdjustmentAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="adjustment-reason">Reason for Adjustment</Label>
                        <Textarea
                          id="adjustment-reason"
                          placeholder="Explain why the payment is being adjusted..."
                          value={adjustmentReason}
                          onChange={(e) => setAdjustmentReason(e.target.value)}
                          rows={3}
                          className="mt-2"
                        />
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          <span className="text-muted-foreground">New payment total: </span>
                          <span className="font-semibold">
                            {paymentAdjustment === "adjust" 
                              ? (projectData.totalPayment - (Number(adjustmentAmount) || 0)).toLocaleString()
                              : (projectData.totalPayment + (Number(adjustmentAmount) || 0)).toLocaleString()
                            } NOK
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-900 dark:text-amber-100">Before submitting</p>
                        <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                          Make sure your change request is clear and specific. The student will be notified immediately and can ask questions before resubmitting.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="lg" onClick={handleSubmit} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Change Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Job Title</span>
                  </div>
                  <p className="font-medium">{projectData.title}</p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Student</span>
                  </div>
                  <Link to={`/student/profile/${projectData.studentId}`}>
                    <p className="font-medium hover:text-primary cursor-pointer">{projectData.student}</p>
                  </Link>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Original Payment</span>
                  </div>
                  <p className="font-medium">{projectData.totalPayment.toLocaleString()} NOK</p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">Tips for Requesting Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Be specific about what needs to be changed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Provide examples or references when possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Set realistic deadlines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>Keep communication professional and constructive</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestChanges;
