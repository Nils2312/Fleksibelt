import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GraduationCap, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [role, setRole] = useState<"student" | "employer">("student");
  const [isCompanyVerified, setIsCompanyVerified] = useState(false);
  const [orgNumber, setOrgNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [mvaStatus, setMvaStatus] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Logged in successfully!");
    navigate(role === "student" ? "/student/dashboard" : "/employer/dashboard");
  };
  
  const handleOrgVerification = () => {
    // Validate org number format (9 digits)
    const cleanOrgNumber = orgNumber.replace(/\s/g, "");
    if (cleanOrgNumber.length !== 9 || !/^\d+$/.test(cleanOrgNumber)) {
      toast.error("Organization number must be exactly 9 digits");
      return;
    }
    
    // Mock company lookup (in production, this would call an API)
    const mockCompanies: Record<string, { name: string; address: string; mva: string }> = {
      "123456789": {
        name: "Tech Solutions AS",
        address: "Storgata 1, 0155 Oslo",
        mva: "yes"
      },
      "987654321": {
        name: "Digital Innovasjon AS",
        address: "Karl Johans gate 5, 0154 Oslo",
        mva: "yes"
      }
    };
    
    const company = mockCompanies[cleanOrgNumber];
    
    if (company) {
      setCompanyName(company.name);
      setBillingAddress(company.address);
      setMvaStatus(company.mva);
      setIsCompanyVerified(true);
      toast.success(`Company verified: ${company.name}`);
    } else {
      toast.error("Company not found. Please check the organization number.");
      setIsCompanyVerified(false);
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === "employer" && !isCompanyVerified) {
      toast.error("Please verify your organization number first");
      return;
    }
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // Validate email format
    const email = formData.get("owner-email") as string;
    if (role === "employer" && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Validate phone format
    const phone = formData.get("company-phone") as string;
    if (role === "employer" && phone && !/^\+47\s?\d{8}$/.test(phone)) {
      toast.error("Phone number must match format: +47 12345678");
      return;
    }
    
    toast.success("Registration successful! Please verify your email.");
    
    if (role === "employer") {
      setTimeout(() => {
        navigate("/employer/dashboard");
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Fleksibelt</CardTitle>
          <CardDescription>Sign in or create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="you@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" required />
                </div>
                
                <Button type="submit" className="w-full">
                  Log In
                </Button>
                
                <p className="text-sm text-center text-muted-foreground">
                  <a href="#" className="text-primary hover:underline">Forgot password?</a>
                </p>
              </form>
            </TabsContent>
            
            {/* Register Tab */}
            <TabsContent value="register">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>I am a...</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as "student" | "employer")}>
                    <div className="flex items-center space-x-2 border border-border rounded-lg p-4 cursor-pointer hover:bg-secondary transition-colors">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student" className="flex items-center gap-2 cursor-pointer flex-1">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Student</p>
                          <p className="text-xs text-muted-foreground">Looking for flexible IT work</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border border-border rounded-lg p-4 cursor-pointer hover:bg-secondary transition-colors">
                      <RadioGroupItem value="employer" id="employer" />
                      <Label htmlFor="employer" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Employer</p>
                          <p className="text-xs text-muted-foreground">Register your company to hire IT students</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {role === "student" ? (
                  <div className="space-y-6 py-4">
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold">Sign in with Feide</h3>
                      <p className="text-sm text-muted-foreground">
                        Create your student account using your university credentials
                      </p>
                    </div>
                    
                    <Button 
                      type="button"
                      className="w-full h-12"
                      onClick={() => {
                        window.location.href = "https://idp.feide.no/simplesaml/module.php/feide/selectorg?org=nord.no&AuthState=_1fd7d476e79abf7f6c6b77ed35934f64d633b56991%3Ahttps%3A%2F%2Fidp.feide.no%2Fsimplesaml%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttps%253A%252F%252Fauth.dataporten.no%252Fsimplesaml%252Fmodule.php%252Fsaml%252Fsp%252Fmetadata.php%252Ffeide%26RelayState%3Dhttps%253A%252F%252Fauth.dataporten.no%252Foauth%252Fauthorization%253Fclient_id%253De97791e4-4892-4751-a8ec-6632e9d7bfb7%2526login_hint%253Dfeide%25257Crealm%25257Cnord.no%2526preselected%253D1%2526redirect_uri%253Dhttps%25253A%25252F%25252Ffsweb.no%25252Fstudentweb%25252Fdataportenlogin.jsf%2526response_type%253Dcode%2526scope%253Dopenid%252Buserid-nin%252Buserid-feide%2526state%253DbRR6foJTfo9Vj9-Q3expssR1fc1WcniR5UXhzlF7eBo%2526ui_locales%253Dnb%252Bnn%252Ben%2526reauthentication%253Df95ac7982e99f52c6a3195317b9dd78375e687d44bcc9199df5305a9c13a5fd6%26cookieTime%3D1763153427";
                      }}
                    >
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Continue with Feide
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      By signing in, you agree to our Terms of Service and{" "}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-6">
                    {/* Section A - Company Information */}
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-3 mb-4">
                        <h3 className="font-semibold text-base">Company Information</h3>
                        <p className="text-xs text-muted-foreground">Verify your organization details</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="org-number">Organization Number</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="org-number"
                            name="org-number"
                            placeholder="123 456 789" 
                            required 
                            className="flex-1"
                            value={orgNumber}
                            onChange={(e) => setOrgNumber(e.target.value)}
                            disabled={isCompanyVerified}
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleOrgVerification}
                            disabled={isCompanyVerified}
                          >
                            {isCompanyVerified ? "Verified" : "Verify"}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">9 digits (e.g., 123456789)</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input 
                          id="company-name"
                          name="company-name"
                          placeholder="Auto-filled after verification" 
                          disabled 
                          className="bg-muted"
                          value={companyName}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <select 
                            id="industry"
                            name="industry"
                            required
                            className="flex h-10 w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select industry</option>
                            <option value="it">IT & Development</option>
                            <option value="consulting">Consulting</option>
                            <option value="marketing">Marketing</option>
                            <option value="finance">Finance</option>
                            <option value="education">Education</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="company-size">Company Size</Label>
                          <select 
                            id="company-size"
                            name="company-size"
                            required
                            className="flex h-10 w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select size</option>
                            <option value="1-10">1–10 employees</option>
                            <option value="11-50">11–50</option>
                            <option value="51-200">51–200</option>
                            <option value="200+">200+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Section B - Billing Details */}
                    <div className="space-y-4 pt-2">
                      <div className="border-l-4 border-primary pl-3 mb-4">
                        <h3 className="font-semibold text-base">Billing Details</h3>
                        <p className="text-xs text-muted-foreground">Configure invoice preferences</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="finance-email">Finance / Invoice Email</Label>
                        <Input 
                          id="finance-email"
                          name="finance-email"
                          type="email" 
                          placeholder="faktura@company.no" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company-phone">Company Phone</Label>
                        <Input 
                          id="company-phone"
                          name="company-phone"
                          type="tel" 
                          placeholder="+47 12345678" 
                          required 
                        />
                        <p className="text-xs text-muted-foreground">Format: +47 followed by 8 digits</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing-address">Billing Address</Label>
                        <Input 
                          id="billing-address"
                          name="billing-address"
                          placeholder="Auto-filled after verification" 
                          disabled 
                          className="bg-muted"
                          value={billingAddress}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="mva-registered">MVA Registered</Label>
                          <select 
                            id="mva-registered"
                            name="mva-registered"
                            required
                            className="flex h-10 w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={mvaStatus}
                            onChange={(e) => setMvaStatus(e.target.value)}
                            disabled={isCompanyVerified}
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="invoice-method">Invoice Method</Label>
                          <select 
                            id="invoice-method"
                            name="invoice-method"
                            required
                            className="flex h-10 w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select method</option>
                            <option value="ehf">EHF</option>
                            <option value="pdf">PDF via Email</option>
                            <option value="both">Both</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Section C - Account Owner */}
                    <div className="space-y-4 pt-2">
                      <div className="border-l-4 border-primary pl-3 mb-4">
                        <h3 className="font-semibold text-base">Account Owner</h3>
                        <p className="text-xs text-muted-foreground">Your personal login credentials</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="owner-name">Full Name</Label>
                        <Input 
                          id="owner-name"
                          name="owner-name"
                          placeholder="Kari Hansen" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="owner-email">Work Email</Label>
                        <Input 
                          id="owner-email"
                          name="owner-email"
                          type="email" 
                          placeholder="kari.hansen@company.no" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="owner-role">Role</Label>
                        <select 
                          id="owner-role"
                          name="owner-role"
                          required
                          className="flex h-10 w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select role</option>
                          <option value="owner">Owner</option>
                          <option value="admin">Admin</option>
                          <option value="recruiter">Recruiter</option>
                          <option value="finance">Finance</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="owner-password">Password</Label>
                        <Input 
                          id="owner-password"
                          name="owner-password"
                          type="password" 
                          required 
                          minLength={8}
                        />
                        <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      By creating an account, you agree to our Terms of Service and{" "}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
