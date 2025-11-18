import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, Phone, MapPin, Briefcase, GraduationCap, ArrowLeft } from "lucide-react";
import StarRating from "@/components/StarRating";
import { studentReviews } from "@/data/mockReviews";

const StudentCV = () => {
  const studentProfile = {
    name: "Emma Johansen",
    email: "emma.johansen@student.no",
    phone: "+47 123 45 678",
    location: "Oslo, Norway",
    university: "University of Oslo",
    program: "Computer Science",
    year: "3rd Year",
  };

  const skills = [
    "React", "TypeScript", "Node.js", "Python", "JavaScript",
    "HTML/CSS", "Git", "REST APIs", "SQL", "Tailwind CSS"
  ];

  const workExperience = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechStart AS",
      period: "Sep 2025 - Oct 2025",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement UI/UX improvements.",
      skills: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "UI/UX Developer",
      company: "DesignHub",
      period: "Aug 2025 - Sep 2025",
      description: "Created user interfaces and implemented design systems. Worked on improving user experience across multiple platforms.",
      skills: ["React", "Figma", "CSS"],
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "DataFlow Solutions",
      period: "Jul 2025 - Aug 2025",
      description: "Built RESTful APIs and database schemas. Implemented authentication and authorization systems.",
      skills: ["Node.js", "PostgreSQL", "REST APIs"],
    },
  ];

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    alert("PDF download functionality would be implemented here. This would generate a professional PDF version of your CV.");
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
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">My Experiences</h1>
            <Button onClick={handleDownloadPDF} size="lg">
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </Button>
          </div>
          <p className="text-muted-foreground">
            A comprehensive overview of your work experience and reviews
          </p>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-3">{studentProfile.name}</h2>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{studentProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{studentProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{studentProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{studentProfile.university}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <p className="text-muted-foreground">
                      {studentProfile.program} - {studentProfile.year}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <div key={job.id}>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{job.period}</p>
                      </div>
                      <p className="text-sm leading-relaxed">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {index < workExperience.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews & Testimonials */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {studentReviews.slice(0, 3).map((review, index) => (
                  <div key={review.id}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{review.reviewerName}</p>
                          <p className="text-sm text-muted-foreground">{review.companyName}</p>
                          <p className="text-xs text-muted-foreground">{review.jobTitle}</p>
                        </div>
                        <StarRating rating={review.rating} readonly size="sm" />
                      </div>
                      <p className="text-sm leading-relaxed italic">"{review.comment}"</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    {index < studentReviews.slice(0, 3).length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Download Section */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Ready to share your CV?
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Download a professional PDF version of your CV to share with potential employers
                  </p>
                </div>
                <Button onClick={handleDownloadPDF} size="lg" className="w-full md:w-auto">
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentCV;
