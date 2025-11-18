import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  GraduationCap, 
  Github,
  Linkedin,
  Globe,
  Star,
  Clock,
  Briefcase,
  MessageSquare,
  Mail,
  Shield,
  CalendarCheck,
  XCircle,
  Share2
} from "lucide-react";
import StarRating from "@/components/StarRating";
import { studentReviews } from "@/data/mockReviews";
import defaultProfile from "@/assets/default-profile.webp";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const StudentPublicProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Profile link has been copied to clipboard",
    });
  };
  
  // Mock student data - in real app, fetch by ID
  const student = {
    id: id || "1",
    name: "John Doe",
    avatar: "JD",
    email: "john.doe@student.no",
    university: "NTNU",
    studyProgram: "Computer Science",
    year: "3rd year",
    location: "Trondheim",
    bio: "Passionate IT student specializing in web development. Love building user-friendly applications and working with modern technologies. Strong focus on clean code and best practices.",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Git", "Tailwind CSS", "REST API"],
    portfolioLinks: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      website: "https://johndoe.dev",
    },
    availability: "Available 15-20 hrs/week",
    completedProjects: 3,
    totalEarnings: "24,500 kr",
    rating: 5.0,
    reviewCount: 2,
  };
  
  // Get reviews for this student
  const reviews = studentReviews.filter(r => r.studentName === student.name);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="relative">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleShare}
                className="absolute top-4 right-4 z-10"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={defaultProfile} />
                    <AvatarFallback className="text-2xl">{student.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{student.name}</h1>
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                        <Shield className="h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={student.rating} readonly size="sm" />
                      <span className="text-sm text-muted-foreground">
                        {student.rating.toFixed(1)} ({student.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {student.university} - {student.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {student.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {student.bio}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Study Program</h3>
                    <p className="text-sm text-muted-foreground">{student.studyProgram}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Portfolio Links */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio & Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {student.portfolioLinks.github && (
                    <a
                      href={student.portfolioLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="text-sm">{student.portfolioLinks.github}</span>
                    </a>
                  )}
                  {student.portfolioLinks.linkedin && (
                    <a
                      href={student.portfolioLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="text-sm">{student.portfolioLinks.linkedin}</span>
                    </a>
                  )}
                  {student.portfolioLinks.website && (
                    <a
                      href={student.portfolioLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="text-sm">{student.portfolioLinks.website}</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  Reviews from Employers ({reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={review.id}>
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{review.reviewerName}</p>
                              <p className="text-sm text-muted-foreground">{review.companyName}</p>
                            </div>
                            <StarRating rating={review.rating} readonly size="sm" />
                          </div>
                          <p className="text-sm leading-relaxed">{review.comment}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                        {index < reviews.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No reviews yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full"
                  onClick={() => navigate('/messages')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  {student.email}
                </Button>
              </CardContent>
            </Card>
            
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Work Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Availability</span>
                  </div>
                  <span className="text-sm font-medium">{student.availability}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Completed Projects</span>
                  </div>
                  <span className="text-sm font-medium">{student.completedProjects}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Rating</span>
                  </div>
                  <span className="text-sm font-medium">{student.rating.toFixed(1)}/5.0</span>
                </div>
              </CardContent>
            </Card>

            {/* Reliability Score */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Reliability Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Attendance</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">100%</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Cancellation Rate</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">0%</span>
                </div>
                <Separator />
                <div className="flex items-center justify-center pt-2">
                  <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                    <Shield className="h-3 w-3" />
                    Verified Student
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPublicProfile;
