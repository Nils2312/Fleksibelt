import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Star, Trophy, XCircle, TrendingUp, Award, Users, Clock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const BadgesInfo = () => {
  const { userRole } = useAuth();
  
  const badges = [
    {
      name: "Student-Friendly",
      icon: Heart,
      color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      iconColor: "text-pink-500",
      description: "Companies that create a welcoming and supportive environment for students",
      criteria: [
        "Flexible work hours that accommodate study schedules",
        "Mentorship and learning opportunities",
        "Clear communication and expectations",
        "Positive feedback from 90% of student workers"
      ]
    },
    {
      name: "High Feedback Score",
      icon: Star,
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      iconColor: "text-yellow-500",
      description: "Companies with consistently high ratings from students",
      criteria: [
        "Average rating of 4.5 stars or higher",
        "At least 10 completed projects",
        "Less than 5% negative reviews",
        "Regular positive feedback from students"
      ]
    },
    {
      name: "Top Employer",
      icon: Trophy,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      iconColor: "text-purple-500",
      description: "Elite companies that excel in all aspects of student employment",
      criteria: [
        "Member for at least 1 year",
        "50+ completed projects",
        "4.8+ average rating",
        "Exemplary student satisfaction scores"
      ]
    },
    {
      name: "Low Cancellation Rate",
      icon: XCircle,
      color: "bg-green-500/10 text-green-500 border-green-500/20",
      iconColor: "text-green-500",
      description: "Reliable companies with minimal job cancellations",
      criteria: [
        "Less than 2% job cancellation rate",
        "At least 20 completed projects",
        "Timely payment history",
        "Consistent project follow-through"
      ]
    },
    {
      name: "Fast Growing",
      icon: TrendingUp,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      iconColor: "text-blue-500",
      description: "Companies with rapid growth in student hiring",
      criteria: [
        "50%+ increase in student hires over 6 months",
        "Expanding team with regular job postings",
        "Positive growth trajectory",
        "Increased project diversity"
      ]
    },
    {
      name: "Excellence Award",
      icon: Award,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      iconColor: "text-orange-500",
      description: "Recognition for outstanding contribution to student development",
      criteria: [
        "Provided career development opportunities",
        "Student testimonials highlight growth",
        "Offers references and recommendations",
        "Creates meaningful learning experiences"
      ]
    },
    {
      name: "High Volume Employer",
      icon: Users,
      color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      iconColor: "text-indigo-500",
      description: "Companies that regularly hire large numbers of students",
      criteria: [
        "100+ completed projects",
        "Regular job postings (weekly/monthly)",
        "Multiple concurrent student positions",
        "Strong hiring pipeline"
      ]
    },
    {
      name: "Quick Responder",
      icon: Clock,
      color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      iconColor: "text-cyan-500",
      description: "Companies known for fast application responses",
      criteria: [
        "Average response time under 24 hours",
        "Prompt communication with applicants",
        "Quick decision-making process",
        "Efficient hiring workflow"
      ]
    },
    {
      name: "Verified Employer",
      icon: CheckCircle2,
      color: "bg-teal-500/10 text-teal-500 border-teal-500/20",
      iconColor: "text-teal-500",
      description: "Companies that have completed identity and business verification",
      criteria: [
        "Valid business registration documents",
        "Verified contact information",
        "Background check completed",
        "Company information authenticated"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {userRole === 'employer' && (
          <Link 
            to="/employer/dashboard" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Company Badges & Achievements</h1>
          <p className="text-muted-foreground">
            Earn badges by demonstrating excellence in student employment and building trust on the platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <Card key={badge.name} className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${badge.color.split(' ')[0]}`}>
                      <Icon className={`h-6 w-6 ${badge.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {badge.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {badge.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-sm mb-2">How to earn this badge:</p>
                    <ul className="space-y-1.5">
                      {badge.criteria.map((criterion, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Want to earn more badges?
            </CardTitle>
            <CardDescription className="text-blue-800 dark:text-blue-200">
              Focus on providing great experiences for students, maintain high standards, and communicate effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Badges are automatically awarded when you meet the criteria. Keep up the excellent work to unlock more achievements!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BadgesInfo;
