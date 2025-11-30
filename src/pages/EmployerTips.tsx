import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Users, Star, MessageSquare, TrendingUp, Shield, Crown, Zap } from "lucide-react";

const EmployerTips = () => {
  const tips = [
    {
      icon: Target,
      title: "Write Clear Job Postings",
      description: "Attract the right candidates with detailed, accurate job descriptions",
      points: [
        "Use a descriptive job title that clearly states the role (e.g., 'React Frontend Developer' instead of just 'Developer')",
        "List specific technologies, tools, and skills required for the project",
        "Provide realistic time estimates and deadlines for the project",
        "Be transparent about compensation - specify hourly rate or fixed price clearly",
        "Include information about what students will learn or gain from the experience"
      ]
    },
    {
      icon: Users,
      title: "Select the Right Candidate",
      description: "Find students whose skills and experience match your needs",
      points: [
        "Review candidate profiles thoroughly - check their past work and ratings",
        "Look for relevant skills, but also consider students willing to learn",
        "Message multiple candidates to compare communication styles and enthusiasm",
        "Ask specific questions about their experience with similar projects",
        "Consider their availability and make sure it aligns with your project timeline"
      ]
    },
    {
      icon: MessageSquare,
      title: "Communicate Effectively",
      description: "Clear communication prevents misunderstandings and builds trust",
      points: [
        "Respond to applicants and messages within 24-48 hours",
        "Set clear expectations from the start about deliverables, deadlines, and communication frequency",
        "Provide detailed project briefs, wireframes, or examples when possible",
        "Schedule regular check-ins to review progress and provide feedback",
        "Be available to answer questions and provide guidance when students need help"
      ]
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "A strong employer reputation attracts top student talent",
      points: [
        "Always pay on time and as agreed - this is crucial for your reputation",
        "Leave honest, constructive reviews for students after project completion",
        "Be flexible and understanding of students' academic schedules",
        "Provide mentorship and learning opportunities when possible",
        "Build long-term relationships with reliable students for future projects"
      ]
    },
    {
      icon: TrendingUp,
      title: "Optimize Your Job Postings",
      description: "Get more and better applications with these strategies",
      points: [
        "Post jobs regularly to stay visible to students browsing the platform",
        "Use relevant keywords in your job title and description to improve searchability",
        "Offer competitive rates - research similar jobs to understand market rates",
        "Highlight any unique benefits like flexible hours, remote work, or mentorship",
        "Update your company profile with completed projects and positive reviews"
      ]
    },
    {
      icon: Shield,
      title: "Ensure Project Success",
      description: "Set up projects for success from day one",
      points: [
        "Break large projects into smaller milestones with clear deliverables",
        "Provide all necessary resources, access credentials, and documentation upfront",
        "Use the platform's time tracking and hour logging features for transparency",
        "Give constructive feedback throughout the project, not just at the end",
        "Document everything important in writing to avoid confusion later"
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
          <h1 className="text-4xl font-bold mb-2">Employer Success Guide</h1>
          <p className="text-muted-foreground text-lg">
            Best practices for finding talented students and building successful working relationships
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

        {/* Subscription Promotion Card */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800 mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-amber-900 dark:text-amber-100">
                Pro Tip: Unlock Premium Features
              </CardTitle>
            </div>
            <CardDescription className="text-amber-800 dark:text-amber-200 text-base">
              Get the most out of Fleksibelt with a Business Subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100 text-sm">Priority Visibility</p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">Your jobs appear first in student feeds</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100 text-sm">Unlimited Job Postings</p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">Post as many jobs as you need</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100 text-sm">Faster Matching</p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">Get quality applications faster</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100 text-sm">Talent Analytics</p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">Track performance and optimize</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-amber-200 dark:border-amber-800">
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Just <span className="font-bold text-amber-900 dark:text-amber-100">12,000 kr/year</span> for unlimited access
                </p>
              </div>
              <Link to="/employer/pricing">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  View Pricing
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Invest in Student Success
            </CardTitle>
            <CardDescription className="text-blue-800 dark:text-blue-200 text-base">
              Great employers build lasting relationships with talented students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              Students are looking for more than just payment - they want learning opportunities, mentorship, 
              and valuable experience. Employers who understand this and invest in their students' growth will 
              attract the best talent, receive exceptional work quality, and build a reputation that makes 
              hiring easier over time. Treat every project as a partnership, and you'll see the benefits multiply!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerTips;
