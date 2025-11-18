import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Upload, X, Plus, Github, Linkedin, Globe, Shield, CalendarCheck, XCircle, ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";
import defaultProfile from "@/assets/default-profile.webp";

const StudentProfile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@student.no");
  const [phone, setPhone] = useState("+47 987 65 432");
  const [university, setUniversity] = useState("NTNU");
  const [studyProgram, setStudyProgram] = useState("Computer Science");
  const [location, setLocation] = useState("Trondheim");
  const [bio, setBio] = useState("Passionate IT student specializing in web development. Love building user-friendly applications.");
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "PostgreSQL"]);
  const [newSkill, setNewSkill] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState([
    { type: "github", url: "https://github.com/johndoe" },
    { type: "linkedin", url: "https://linkedin.com/in/johndoe" },
  ]);
  const [newLink, setNewLink] = useState({ type: "github", url: "" });
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };
  
  const handleAddLink = () => {
    if (newLink.url.trim()) {
      setPortfolioLinks([...portfolioLinks, newLink]);
      setNewLink({ type: "github", url: "" });
    }
  };
  
  const handleRemoveLink = (index: number) => {
    setPortfolioLinks(portfolioLinks.filter((_, i) => i !== index));
  };
  
  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };
  
  const getLinkIcon = (type: string) => {
    switch (type) {
      case "github": return <Github className="h-4 w-4" />;
      case "linkedin": return <Linkedin className="h-4 w-4" />;
      case "website": return <Globe className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/student/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">Update your information to attract more employers</p>
        </div>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={defaultProfile} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or WEBP. Max 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+47 123 45 678"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input 
                    id="university" 
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studyProgram">Study Program</Label>
                  <Input 
                    id="studyProgram" 
                    value={studyProgram}
                    onChange={(e) => setStudyProgram(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell employers about yourself..."
                />
                <p className="text-xs text-muted-foreground">
                  {bio.length}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1.5">
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a skill (e.g., React, Python...)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Portfolio Links */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio & Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {portfolioLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2 flex-1">
                      {getLinkIcon(link.type)}
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm hover:text-primary truncate"
                      >
                        {link.url}
                      </a>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value={newLink.type}
                    onChange={(e) => setNewLink({ ...newLink, type: e.target.value })}
                    className="border border-input rounded-md px-3 py-2 text-sm"
                  >
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="website">Website</option>
                  </select>
                  <Input 
                    placeholder="https://..."
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="flex-1"
                  />
                  <Button onClick={handleAddLink} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Profile */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Preview Your Profile
                  </p>
                  <p className="text-blue-800 dark:text-blue-200 mb-3">
                    See how employers will view your student profile
                  </p>
                  <Link to="/student/profile/1">
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
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
