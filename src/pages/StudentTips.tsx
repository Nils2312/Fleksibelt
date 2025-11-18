import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lightbulb, Target, Star, TrendingUp, CheckCircle2, Users } from "lucide-react";

const StudentTips = () => {
  const tips = [
    {
      icon: Target,
      title: "Create a Standout Profile",
      description: "Your profile is your first impression. Make it count!",
      points: [
        "Use a professional, friendly photo that shows your face clearly",
        "Write a compelling bio that highlights your skills and passion for learning",
        "List all relevant skills, even if you're still learning them",
        "Add links to your portfolio, GitHub, or any projects you've worked on",
        "Keep your availability calendar updated to avoid scheduling conflicts"
      ]
    },
    {
      icon: Star,
      title: "Craft Winning Applications",
      description: "Stand out from other applicants with personalized applications",
      points: [
        "Read the job description carefully and tailor your application to match",
        "Mention specific skills from the posting that you possess",
        "Explain why you're interested in the project and what you can bring to it",
        "Keep it concise but informative - employers appreciate clarity",
        "Proofread your application before submitting to avoid typos"
      ]
    },
    {
      icon: TrendingUp,
      title: "Build Your Reputation",
      description: "Positive reviews and ratings open more opportunities",
      points: [
        "Always deliver quality work on time or communicate early if there are issues",
        "Be professional and responsive in all communications",
        "Ask for feedback during the project to ensure you're meeting expectations",
        "Go the extra mile when possible - it leads to better reviews",
        "Request reviews from satisfied employers to build your profile"
      ]
    },
    {
      icon: CheckCircle2,
      title: "Ace the Interview Process",
      description: "Make a great impression when employers reach out",
      points: [
        "Respond to messages promptly - ideally within 24 hours",
        "Be honest about your skill level and availability",
        "Ask thoughtful questions about the project scope and expectations",
        "Show enthusiasm and willingness to learn new technologies",
        "Be clear about your hourly rate or salary expectations upfront"
      ]
    },
    {
      icon: Users,
      title: "Manage Projects Like a Pro",
      description: "Successful project completion leads to repeat work",
      points: [
        "Set clear milestones and deadlines with your employer from the start",
        "Provide regular updates on your progress, even if it's just a quick message",
        "Document your work and keep organized records of what you've completed",
        "If you encounter blockers, communicate them immediately",
        "Use the platform's tools to track hours and deliverables accurately"
      ]
    },
    {
      icon: Lightbulb,
      title: "Network and Learn",
      description: "Build relationships that last beyond single projects",
      points: [
        "Ask employers for mentorship opportunities and feedback on your growth",
        "Request references or recommendations after successful projects",
        "Connect with other students on the platform to share experiences",
        "Look for jobs that offer learning opportunities, not just payment",
        "Consider asking satisfied employers about future openings or referrals"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Link 
          to="/help" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Student Success Guide</h1>
          <p className="text-muted-foreground text-lg">
            Essential tips to land your dream student jobs and build a successful freelance career
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tip.title}</CardTitle>
                      <CardDescription className="mt-1 text-base">
                        {tip.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tip.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        <span className="text-muted-foreground leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-900 dark:text-green-100">
              Ready to Start?
            </CardTitle>
            <CardDescription className="text-green-800 dark:text-green-200 text-base">
              Apply these tips consistently and watch your success grow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
              Remember, every successful freelancer started where you are now. Focus on building relationships, 
              delivering quality work, and continuously improving your skills. Your reputation is your most 
              valuable asset on this platform!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentTips;
