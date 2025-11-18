import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Building2,
  Star,
  Briefcase,
  Users,
  Shield,
  MessageSquare,
  Mail,
  Globe,
  Heart,
  XCircle as XCircleIcon,
  Share2
} from "lucide-react";
import StarRating from "@/components/StarRating";
import { companyReviews } from "@/data/mockReviews";
import { mockJobs } from "@/data/mockJobs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const EmployerPublicProfile = () => {
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
  
  // Mock employer data - in real app, fetch by ID
  const employer = {
    id: id || "1",
    companyName: "TechStart AS",
    contactPerson: "Anna Larsen",
    email: "contact@techstart.no",
    website: "https://techstart.no",
    location: "Oslo, Norway",
    about: "Oslo-based tech company specializing in web development and digital solutions. We work with cutting-edge technologies and value innovation, collaboration, and continuous learning. We love working with talented students and providing them with real-world experience.",
    industry: "Technology / Software Development",
    companySize: "10-50 employees",
    founded: "2018",
    rating: 4.9,
    reviewCount: 3,
    activeJobs: 3,
    hiredStudents: 12,
  };
  
  // Get reviews for this company
  const reviews = companyReviews.filter(r => r.companyName === employer.companyName);
  
  // Get active jobs from this company
  const activeJobs = mockJobs.filter(j => j.company === employer.companyName).slice(0, 3);
  
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
                  <div className="h-24 w-24 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-12 w-12 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{employer.companyName}</h1>
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                        <Shield className="h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                    
                    {/* Achievement Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link to="/badges-info">
                        <Badge 
                          variant="outline" 
                          className="flex items-center gap-1 bg-pink-500/10 text-pink-500 border-pink-500/20 hover:bg-pink-500/20 transition-colors cursor-pointer"
                        >
                          <Heart className="h-3 w-3" />
                          Student-Friendly
                        </Badge>
                      </Link>
                      <Link to="/badges-info">
                        <Badge 
                          variant="outline" 
                          className="flex items-center gap-1 bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 transition-colors cursor-pointer"
                        >
                          <XCircleIcon className="h-3 w-3" />
                          Low Cancellation Rate
                        </Badge>
                      </Link>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={employer.rating} readonly size="sm" />
                      <span className="text-sm text-muted-foreground">
                        {employer.rating.toFixed(1)} ({employer.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {employer.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {employer.companySize}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About the Company</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {employer.about}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-1 text-sm">Industry</h3>
                      <p className="text-sm text-muted-foreground">{employer.industry}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm">Founded</h3>
                      <p className="text-sm text-muted-foreground">{employer.founded}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">Contact Person</h3>
                    <p className="text-sm text-muted-foreground">{employer.contactPerson}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Active Jobs */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Active Job Postings ({activeJobs.length})
              </h2>
              {activeJobs.length > 0 ? (
                <div className="space-y-3">
                  {activeJobs.map((job) => (
                    <Link key={job.id} to={`/jobs/${job.id}`}>
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{job.title}</h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{job.location}</span>
                            <span>{job.duration}</span>
                            <span>{job.salary}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8">
                    <p className="text-sm text-muted-foreground text-center">
                      No active job postings
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  Reviews from Students ({reviews.length})
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
                              <p className="text-sm text-muted-foreground">{review.jobTitle}</p>
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
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${employer.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
                {employer.website && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={employer.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
            
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Company Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Active Jobs</span>
                  </div>
                  <span className="text-sm font-medium">{employer.activeJobs}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Students Hired</span>
                  </div>
                  <span className="text-sm font-medium">{employer.hiredStudents}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Rating</span>
                  </div>
                  <span className="text-sm font-medium">{employer.rating.toFixed(1)}/5.0</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Trust Badge */}
            <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">
                      Verified Employer
                    </p>
                    <p className="text-xs text-green-800 dark:text-green-200">
                      Identity and company details verified
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerPublicProfile;
