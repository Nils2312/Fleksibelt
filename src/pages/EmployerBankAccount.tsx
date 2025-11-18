import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building2, Info } from "lucide-react";
import { toast } from "sonner";

const EmployerBankAccount = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<string>("");
  const [companyName, setCompanyName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [iban, setIban] = useState("");

  const handleSave = () => {
    if (!accountType || !companyName || !orgNumber || !accountNumber || !bankName) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Company bank account updated successfully!");
    setTimeout(() => {
      navigate("/employer/payments");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/employer/payments" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Payments
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Company Bank Account</h1>
          <p className="text-muted-foreground">Update your company's bank account information</p>
        </div>

        <div className="space-y-6">
          {/* Current Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>Current Account</CardTitle>
              <CardDescription>Your registered company bank account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Building2 className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">TechStart AS</p>
                  <p className="text-sm text-muted-foreground">DNB Business Account ****5739</p>
                  <p className="text-xs text-muted-foreground mt-1">Org.nr: 123 456 789</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Update Bank Account */}
          <Card>
            <CardHeader>
              <CardTitle>Update Company Bank Account</CardTitle>
              <CardDescription>Enter your company's bank account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type *</Label>
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business Account</SelectItem>
                    <SelectItem value="corporate">Corporate Account</SelectItem>
                    <SelectItem value="merchant">Merchant Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Registered company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgNumber">Organization Number *</Label>
                  <Input
                    id="orgNumber"
                    placeholder="XXX XXX XXX"
                    value={orgNumber}
                    onChange={(e) => setOrgNumber(e.target.value)}
                  />
                </div>
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
                  Norwegian business account format (11 digits)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  placeholder="e.g., DNB Business, Nordea Corporate"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
                  <Input
                    id="swiftCode"
                    placeholder="For international transactions"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iban">IBAN (Optional)</Label>
                  <Input
                    id="iban"
                    placeholder="International Bank Account Number"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                  />
                </div>
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
                    Company Account Requirements
                  </p>
                  <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                    <li>• Account must be registered under your company's organization number</li>
                    <li>• Company name must match official business registration</li>
                    <li>• Changes require verification with business documentation</li>
                    <li>• Processing time may take 3-7 business days for verification</li>
                    <li>• You'll receive an email once the update is approved</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Link to="/employer/payments">
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

export default EmployerBankAccount;
