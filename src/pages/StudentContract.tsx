import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FileText, Building2, Calendar, Banknote, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const StudentContract = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);

  const handleSignContract = () => {
    if (!agreed) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setSigning(true);
    
    // Simulate signing process
    setTimeout(() => {
      toast.success("Contract signed successfully!", {
        description: "You can now view your confirmed job in the dashboard.",
      });
      navigate("/student/dashboard");
    }, 1500);
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
          <h1 className="text-3xl font-bold mb-2">Employment Contract</h1>
          <p className="text-muted-foreground">Please review and sign the contract below</p>
        </div>

        {/* Job Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium">Frontend Developer</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-medium">TechStart AS</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">November 15, 2025</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">3 months</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Compensation</p>
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">15,000 - 20,000 kr/month</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Work Hours</p>
                <p className="font-medium">20-30 hours/week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Terms */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Terms & Conditions
            </CardTitle>
            <CardDescription>Please read carefully before signing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3 className="font-semibold text-base mb-2">1. Employment Terms</h3>
              <p className="text-sm leading-relaxed mb-4">
                This contract establishes a student employment agreement between TechStart AS (the "Employer") and the Student (the "Employee"). 
                The employment period is from November 15, 2025, for a duration of 3 months, with a possibility of extension based on mutual agreement.
              </p>

              <Separator className="my-4" />

              <h3 className="font-semibold text-base mb-2">2. Responsibilities</h3>
              <p className="text-sm leading-relaxed mb-4">
                The Employee agrees to perform duties related to frontend development, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                <li>Developing and maintaining user interfaces using React and TypeScript</li>
                <li>Collaborating with the design and backend teams</li>
                <li>Participating in code reviews and team meetings</li>
                <li>Following company coding standards and best practices</li>
              </ul>

              <Separator className="my-4" />

              <h3 className="font-semibold text-base mb-2">3. Compensation & Payment</h3>
              <p className="text-sm leading-relaxed mb-4">
                The Employee will receive compensation between 15,000 – 20,000 kr per month, based on hours worked and performance. Payment will be made monthly, within 5 business days after the end of each month. All payments comply with Norwegian tax regulations.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                <strong>Platform Fee (10%)</strong><br />
                Fleksibelt applies a 10% platform fee to each completed job. This fee covers contract generation, payment processing, support, and platform services. The fee is paid by the Employer and is added on top of the Employee&apos;s compensation in the final invoice.<br />
                The Employee does not lose any portion of their agreed salary.
              </p>

              <Separator className="my-4" />

              <h3 className="font-semibold text-base mb-2">4. Working Hours</h3>
              <p className="text-sm leading-relaxed mb-4">
                The Employee is expected to work 20-30 hours per week, with flexible scheduling to accommodate academic commitments. 
                Working hours must be coordinated with the team lead and logged in the company's time tracking system.
              </p>

              <Separator className="my-4" />

              <h3 className="font-semibold text-base mb-2">5. Confidentiality</h3>
              <p className="text-sm leading-relaxed mb-4">
                The Employee agrees to maintain confidentiality regarding all proprietary information, trade secrets, and business practices 
                of the Employer, both during and after the employment period.
              </p>

              <Separator className="my-4" />

              <h3 className="font-semibold text-base mb-2">6. Termination</h3>
              <p className="text-sm leading-relaxed mb-4">
                Either party may terminate this agreement with 14 days written notice. The Employer reserves the right to immediate termination 
                in cases of misconduct, breach of confidentiality, or failure to perform duties.
              </p>

              <Separator className="my-4" />

              <h3 className="font-semibold text-base mb-2">7. Data Protection</h3>
              <p className="text-sm leading-relaxed mb-4">
                Both parties agree to comply with GDPR and Norwegian data protection laws. Personal data will be processed only for employment-related 
                purposes and stored securely in accordance with legal requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Agreement & Signature */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I have read and understood all the terms and conditions stated above. I agree to the employment terms, 
                  responsibilities, compensation, and confidentiality requirements. I understand that by clicking "Sign Contract", 
                  I am electronically signing this legally binding agreement.
                </label>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate("/student/dashboard")}
                  disabled={signing}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleSignContract}
                  disabled={!agreed || signing}
                >
                  {signing ? (
                    <>Signing...</>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Sign Contract
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By signing this contract, you agree to comply with all terms and conditions. 
                A copy will be sent to your registered email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentContract;
