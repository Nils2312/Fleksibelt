import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Info, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PostJob = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salaryType, setSalaryType] = useState<"hourly" | "fixed">("hourly");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [isInternshipRelevant, setIsInternshipRelevant] = useState(false);
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };
  
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !location || !startDate || !endDate || !salary || !maxHours || skills.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Job posted successfully!", {
      description: "Your job posting is now live and visible to students."
    });
    
    setTimeout(() => {
      navigate("/employer/dashboard");
    }, 1500);
  };
  
  const handleReset = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setSalary("");
    setMaxHours("");
    setSkills([]);
    setIsInternshipRelevant(false);
    toast.info("Form reset");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
          <p className="text-muted-foreground">Find the perfect IT student for your project</p>
        </div>

        {/* Job Posting Cost Information */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Job Posting Cost</AlertTitle>
          <AlertDescription>
            <div className="space-y-2 mt-2">
              <p><strong>Price:</strong> 1500 kr per job posting for companies without a subscription</p>
              <p className="text-sm text-muted-foreground mt-2">
                Subscribers get unlimited job postings, priority visibility and faster matching.
              </p>
            </div>
          </AlertDescription>
        </Alert>
        
        <form onSubmit={handlePublish} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Provide clear information about the role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input 
                  id="title"
                  placeholder="e.g., Frontend Developer - React"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  rows={6}
                  placeholder="Describe the project, tasks, and what you're looking for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Be specific about requirements and expectations
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    id="location"
                    placeholder="e.g., Oslo / Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input 
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input 
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxHours">Maximum Hours *</Label>
                <Input 
                  id="maxHours"
                  type="number"
                  placeholder="e.g., 160"
                  value={maxHours}
                  onChange={(e) => setMaxHours(e.target.value)}
                  min="1"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Total maximum hours the student can work on this job
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Compensation */}
          <Card>
            <CardHeader>
              <CardTitle>Compensation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Salary Type *</Label>
                <Select value={salaryType} onValueChange={(value: "hourly" | "fixed") => setSalaryType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salary">
                  {salaryType === "hourly" ? "Hourly Rate *" : "Fixed Price *"}
                </Label>
                <Input 
                  id="salary"
                  placeholder={salaryType === "hourly" ? "e.g., 350-450 kr/hr" : "e.g., 25,000 kr"}
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Platform Fee:</strong> A 10% fee is added on top of the student&apos;s compensation to cover contract generation, payment processing, support, and platform services. The student receives their full agreed salary.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills *</CardTitle>
              <CardDescription>Add the technologies and skills needed for this job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1.5">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a required skill (e.g., React, Python...)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                />
                <Button type="button" onClick={handleAddSkill} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="internship"
                  checked={isInternshipRelevant}
                  onCheckedChange={(checked) => setIsInternshipRelevant(checked as boolean)}
                />
                <div className="space-y-1">
                  <Label 
                    htmlFor="internship"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Relevant for internship credit
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This job can count towards the student's internship requirements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Info Box */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Tips for a Great Job Posting
                  </p>
                  <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                    <li>• Be clear about the project scope and deliverables</li>
                    <li>• List specific technologies and tools you want used</li>
                    <li>• Mention if this is suitable for beginners or requires experience</li>
                    <li>• Include information about your company culture</li>
                    <li>• Set realistic timelines and fair compensation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Information */}
          <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">
                    Contract Generation
                  </p>
                  <p>
                    A formal employment contract will be automatically generated based on the job details you provide. 
                    The contract will include all terms such as duration, compensation, responsibilities, and confidentiality agreements. 
                    Once a student is selected, they will receive the contract and the employment officially starts when they sign it digitally.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Promotion */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Upgrade to Business Subscription</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get unlimited job postings, priority visibility, faster matching, and talent analytics for just 12,000 kr/year. 
                    Perfect for companies with ongoing hiring needs.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link to="/employer/pricing">
                      <Button>
                        View Pricing Plans
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Save money with 8+ job postings per year
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" size="lg">
              Publish Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
