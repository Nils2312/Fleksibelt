import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X, Plus, Info, ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const editJobSchema = z.object({
  title: z.string().trim().min(1, "Job title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(2000, "Description must be less than 2000 characters"),
  location: z.string().trim().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  salary: z.string().trim().min(1, "Salary is required").max(50, "Salary must be less than 50 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

const EditJob = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("id") || "1";
  
  // Mock job data - in real app, fetch by ID
  const [title, setTitle] = useState("Frontend Developer - React");
  const [description, setDescription] = useState("We are looking for an experienced React developer to join our team and work on exciting projects.");
  const [location, setLocation] = useState("Oslo");
  const [startDate, setStartDate] = useState("2025-11-01");
  const [endDate, setEndDate] = useState("2026-02-01");
  const [salaryType, setSalaryType] = useState<"hourly" | "fixed">("hourly");
  const [salary, setSalary] = useState("400-500 kr/hr");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Tailwind CSS"]);
  const [newSkill, setNewSkill] = useState("");
  const [isInternshipRelevant, setIsInternshipRelevant] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const formData = {
      title,
      description,
      location,
      startDate,
      endDate,
      salary,
      skills,
    };
    
    try {
      editJobSchema.parse(formData);
      
      toast.success("Job updated successfully!", {
        description: "Your job posting has been updated and is live."
      });
      
      setTimeout(() => {
        navigate("/employer/dashboard");
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
  
  const handleDelete = () => {
    toast.success("Job deleted successfully", {
      description: "The job posting has been removed from the platform."
    });
    
    setTimeout(() => {
      navigate("/employer/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/active-jobs" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Active Jobs
        </Link>
        
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Edit Job Posting</h1>
            <p className="text-muted-foreground">Update your job details or remove the posting</p>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Job
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Job Posting?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the job posting and remove all associated applications. Applicants will be notified that the job is no longer available.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Job
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Update information about the role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input 
                  id="title"
                  placeholder="e.g., Frontend Developer - React"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  rows={6}
                  placeholder="Describe the project, tasks, and what you're looking for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                <p className="text-xs text-muted-foreground">
                  {description.length}/2000 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input 
                  id="location"
                  placeholder="e.g., Oslo / Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input 
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input 
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
                </div>
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
                />
                {errors.salary && <p className="text-sm text-destructive">{errors.salary}</p>}
              </div>
            </CardContent>
          </Card>
          
          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills *</CardTitle>
              <CardDescription>Update the technologies and skills needed</CardDescription>
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
              {errors.skills && <p className="text-sm text-destructive">{errors.skills}</p>}
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
                    Updating Your Job
                  </p>
                  <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                    <li>• Current applicants will be notified of significant changes</li>
                    <li>• The job will remain active with updated information</li>
                    <li>• Changes take effect immediately after saving</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/employer/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
