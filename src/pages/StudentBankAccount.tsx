import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2, Info } from "lucide-react";
import { toast } from "sonner";

const StudentBankAccount = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const handleSave = () => {
    if (!accountNumber || !accountHolder || !bankName) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Bank account updated successfully!");
    setTimeout(() => {
      navigate("/student/payments");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/student/payments" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Payments
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bank Account Details</h1>
          <p className="text-muted-foreground">Update your bank account information for receiving payments</p>
        </div>

        <div className="space-y-6">
          {/* Current Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>Current Account</CardTitle>
              <CardDescription>Your registered bank account for receiving earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Building2 className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">DNB Bank</p>
                  <p className="text-sm text-muted-foreground">Account ending in ****2847</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Update Bank Account */}
          <Card>
            <CardHeader>
              <CardTitle>Update Bank Account</CardTitle>
              <CardDescription>Enter your new bank account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountHolder">Account Holder Name *</Label>
                <Input
                  id="accountHolder"
                  placeholder="Your full name as it appears on the account"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  placeholder="XXXX.XX.XXXXX"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Norwegian bank account format (11 digits)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  placeholder="e.g., DNB, Nordea, Sparebank 1"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="swiftCode">SWIFT/BIC Code (Optional)</Label>
                <Input
                  id="swiftCode"
                  placeholder="For international transfers"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Important Information
                  </p>
                  <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                    <li>• Ensure the account holder name matches your registered name</li>
                    <li>• Changes will be verified before processing payments</li>
                    <li>• Payments are typically processed within 3-5 business days</li>
                    <li>• You'll receive an email confirmation once the update is approved</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Link to="/student/payments">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBankAccount;
