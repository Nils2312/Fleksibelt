import { useState } from "react";
import { Search, GraduationCap, Briefcase, Users, Clock, Shield, Star, Quote, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import JobCard from "@/components/JobCard";
import StarRating from "@/components/StarRating";
import { mockJobs } from "@/data/mockJobs";
import { companyReviews } from "@/data/mockReviews";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, userRole, loginAsStudent, loginAsEmployer, logout } = useAuth();
  
  const featuredJobs = mockJobs.slice(0, 12);
  const featuredReviews = companyReviews.slice(0, 3);

  const handleGetStartedAsStudent = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to get started");
      navigate("/auth");
      return;
    }
    
    if (userRole !== 'student') {
      toast.error("This feature is only available for students");
      return;
    }
    
    navigate("/student/dashboard");
  };

  const handlePostJob = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to post a job");
      navigate("/auth");
      return;
    }
    
    if (userRole !== 'employer') {
      toast.error("This feature is only available for employers");
      return;
    }
    
    navigate("/employer/post-job");
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Flexible IT work. Fast support.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with IT students for short-term projects, or find your next opportunity as a student developer.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for jobs, skills, or companies..." 
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link to="/jobs">
                <Button size="lg" className="h-12 px-8">
                  Search
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button variant="outline" size="sm">Frontend</Button>
            <Button variant="outline" size="sm">Backend</Button>
            <Button variant="outline" size="sm">Full Stack</Button>
            <Button variant="outline" size="sm">Remote</Button>
            <Button variant="outline" size="sm">Oslo</Button>
          </div>
          
          {/* Mock Login Section */}
          <div className="max-w-2xl mx-auto mt-8 p-6 border border-dashed border-primary/50 rounded-2xl bg-secondary/50">
            <p className="text-xs text-muted-foreground text-center mb-4">
              ⚠️ This is not final design - Mock authentication for testing
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={loginAsStudent}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Log in as Student
              </Button>
              <Button 
                variant="outline" 
                onClick={loginAsEmployer}
                className="flex items-center gap-2"
              >
                <Briefcase className="h-4 w-4" />
                Log in as Employer
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={logout}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs */}
      <section className="py-12 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Latest Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {featuredJobs.map((job, index) => (
              <JobCard key={job.id} {...job} isSponsored={index < 2} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/jobs">
              <Button variant="outline" size="lg">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* For Students / Employers Highlights */}
      <section className="py-16 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
            <GraduationCap className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">For Students</h3>
            <p className="text-muted-foreground mb-6">
              Find flexible IT jobs that fit your studies. Work on real projects, build your portfolio, and earn money while gaining experience.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Verified employers only</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Flexible schedules around exams</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Build your professional network</span>
              </li>
            </ul>
            <Button 
              className="w-full" 
              onClick={handleGetStartedAsStudent}
            >
              Get Started as Student
            </Button>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
            <Briefcase className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">For Employers</h3>
            <p className="text-muted-foreground mb-6">
              Get fast, flexible IT support from talented students. Post your project and connect with skilled developers in days, not weeks.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Pre-screened IT students</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Quick hiring process</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Access to fresh talent</span>
              </li>
            </ul>
            <Button 
              className="w-full"
              onClick={handlePostJob}
            >
              Post a Job
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">How It Works</h2>
          
          <Tabs defaultValue="student" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="student">For Students</TabsTrigger>
              <TabsTrigger value="employer">For Employers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Create Your Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign up and showcase your skills, projects, and availability. Add your GitHub, portfolio, and what you're studying.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Browse & Apply</h4>
                    <p className="text-sm text-muted-foreground">
                      Search for jobs that match your skills and schedule. Apply with one click and chat directly with employers.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Work & Get Paid</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete the project, build your experience, and receive payment securely through our platform.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="employer" className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Post Your Job</h4>
                    <p className="text-sm text-muted-foreground">
                      Describe what you need help with, required skills, timeline, and budget. Takes less than 5 minutes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Review Applications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get applications from qualified students within days. Review profiles, portfolios, and chat with candidates.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Hire & Collaborate</h4>
                    <p className="text-sm text-muted-foreground">
                      Select the best candidate and start working together. Manage everything through our secure platform.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Trusted by Students and Employers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from IT students who found flexible work through Fleksibelt
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredReviews.map((review) => (
              <Card key={review.id} className="relative">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <StarRating rating={review.rating} readonly size="sm" />
                  <p className="text-sm leading-relaxed my-4">{review.comment}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <Avatar>
                      <AvatarFallback>
                        {review.reviewerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{review.reviewerName}</p>
                      <p className="text-xs text-muted-foreground">{review.jobTitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
              <span>from 500+ student reviews</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">500+</p>
                <p className="text-sm text-muted-foreground">Happy Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">200+</p>
                <p className="text-sm text-muted-foreground">Trusted Employers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">1,000+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust & Security Partners */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Trusted & Secure</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We collaborate with leading institutions to ensure safe and secure transactions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">BankID Verification</h3>
              <p className="text-sm text-muted-foreground">
                Secure authentication through Norwegian BankID
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">DNB Partnership</h3>
              <p className="text-sm text-muted-foreground">
                Secure payments powered by DNB banking
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">University Network</h3>
              <p className="text-sm text-muted-foreground">
                Partnered with NTNU, UiO, and other institutions
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">GDPR Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Full compliance with European data protection laws
              </p>
            </Card>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Your Safety is Our Priority
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  All transactions are secured with bank-level encryption. We verify both students and employers before they can use the platform. Payments are held in escrow until work is completed and approved. Our dedicated support team is available to resolve any disputes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and employers who trust Fleksibelt for flexible IT work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px]">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
