import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployerPricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground">
            Find the perfect plan for your hiring needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Basic Plan</CardTitle>
              <CardDescription>No subscription required</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-2">0 kr</div>
                <p className="text-muted-foreground">per year</p>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-lg font-semibold text-foreground">1,500 kr</p>
                  <p className="text-sm text-muted-foreground">per job posting</p>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Job visible immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Automatic contract generation</span>
                </li>
                <li className="flex items-start gap-2 opacity-50">
                  <span className="text-lg mt-0.5 flex-shrink-0">❌</span>
                  <span className="line-through">Unlimited job postings</span>
                </li>
                <li className="flex items-start gap-2 opacity-50">
                  <span className="text-lg mt-0.5 flex-shrink-0">❌</span>
                  <span className="line-through">Priority placement</span>
                </li>
                <li className="flex items-start gap-2 opacity-50">
                  <span className="text-lg mt-0.5 flex-shrink-0">❌</span>
                  <span className="line-through">Faster matching</span>
                </li>
                <li className="flex items-start gap-2 opacity-50">
                  <span className="text-lg mt-0.5 flex-shrink-0">❌</span>
                  <span className="line-through">Talent analytics</span>
                </li>
                <li className="flex items-start gap-2 opacity-50">
                  <span className="text-lg mt-0.5 flex-shrink-0">❌</span>
                  <span className="line-through">Priority support</span>
                </li>
              </ul>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Perfect for occasional hiring needs. Pay only when you post a job.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Business Subscription Plan */}
          <Card className="relative border-primary shadow-lg">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Crown className="h-4 w-4" />
              Recommended
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Business Subscription</CardTitle>
              <CardDescription>Best for active hiring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-2">12 000 kr</div>
                <p className="text-muted-foreground">per year</p>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-lg font-semibold text-primary">0 kr</p>
                  <p className="text-sm text-muted-foreground">per job posting</p>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Job visible immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Automatic contract generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Unlimited job postings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Priority placement</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Faster matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Talent analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>

              <div className="pt-4 border-t space-y-3">
                <p className="text-sm text-muted-foreground">
                  Perfect for active hiring. Unlimited postings with priority visibility and faster matching.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => navigate('/employer/post-job')}
                >
                  Choose Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mt-16 space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Business Subscription?</h2>
            <p className="text-muted-foreground">
              Unlock premium features designed to streamline your hiring and connect you with top IT talent faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Priority Visibility</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your jobs appear at the top of student feeds, in recommended job lists, and in search results — increasing exposure and helping you reach the best candidates faster.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Faster Matching</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Premium jobs are pushed earlier to relevant students through our matching algorithm, notifications, and skill-based recommendations, giving you quicker and higher-quality applications.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Unlimited Job Postings</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Post as many jobs as you need without paying per posting. Perfect for companies hiring multiple roles or running continuous recruitment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">No Posting Fees</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Save money long-term by avoiding the 1,500 kr per job fee. With just 8–9 job posts per year, the subscription already pays for itself.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Talent Analytics</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  See how your job posts perform. Track views, applicants, and skill match percentages to improve your hiring process.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Priority Support</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get faster support response times and assistance whenever you need it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Need help choosing? <a href="/contact-support" className="text-primary hover:underline">Contact our team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerPricing;
