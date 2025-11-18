import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const EmployerProfile = () => {
  const [companyName, setCompanyName] = useState("TechStart AS");
  const [contactPerson, setContactPerson] = useState("Anna Larsen");
  const [email, setEmail] = useState("contact@techstart.no");
  const [phone, setPhone] = useState("+47 123 45 678");
  const [website, setWebsite] = useState("https://techstart.no");
  const [location, setLocation] = useState("Oslo, Norway");
  const [about, setAbout] = useState("Oslo-based tech company specializing in web development and digital solutions. We work with cutting-edge technologies and value innovation, collaboration, and continuous learning. We love working with talented students and providing them with real-world experience.");
  const [industry, setIndustry] = useState("Technology / Software Development");
  const [companySize, setCompanySize] = useState("10-50");
  const [founded, setFounded] = useState("2018");
  
  const handleSave = () => {
    toast.success("Company profile updated successfully!");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/employer/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Company Profile</h1>
          <p className="text-muted-foreground">Update your company information to attract the best students</p>
        </div>
        
        <div className="space-y-6">
          {/* Company Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or SVG. Max 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input 
                    id="companyName" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input 
                    id="contactPerson" 
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    id="location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about">About the Company *</Label>
                <Textarea 
                  id="about" 
                  rows={6}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell students about your company, culture, and what you do..."
                />
                <p className="text-xs text-muted-foreground">
                  {about.length}/1000 characters
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology / Software Development">Technology / Software Development</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Finance / Fintech">Finance / Fintech</SelectItem>
                    <SelectItem value="Healthcare / Health Tech">Healthcare / Health Tech</SelectItem>
                    <SelectItem value="Education / EdTech">Education / EdTech</SelectItem>
                    <SelectItem value="Marketing / Advertising">Marketing / Advertising</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size *</Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="10-50">10-50 employees</SelectItem>
                      <SelectItem value="50-200">50-200 employees</SelectItem>
                      <SelectItem value="200-500">200-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded">Year Founded</Label>
                  <Input 
                    id="founded" 
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={founded}
                    onChange={(e) => setFounded(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Preview Profile */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Preview Your Profile
                  </p>
                  <p className="text-blue-800 dark:text-blue-200 mb-3">
                    See how students will view your company profile
                  </p>
                  <Link to="/employer/profile/1">
                    <Button variant="outline" size="sm" className="border-blue-300 dark:border-blue-700">
                      View Public Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Link to="/employer/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
