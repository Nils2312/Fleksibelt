import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Plus, Building2, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const hoursLogSchema = z.object({
  date: z.string().min(1, { message: "Please select a date" }),
  hours: z.number()
    .min(0.5, { message: "Minimum 0.5 hours" })
    .max(24, { message: "Cannot exceed 24 hours per day" }),
  description: z.string()
    .trim()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
});

const LogHours = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("job") || "Job";
  
  // Mock job data
  const jobData = {
    title: "Backend Developer",
    company: "DataFlow Solutions",
    totalHours: 160,
    currentHours: 60,
  };

  // Mock previous entries
  const [hoursEntries, setHoursEntries] = useState([
    { id: 1, date: "2025-10-25", hours: 8, description: "Implemented API endpoints for user authentication" },
    { id: 2, date: "2025-10-24", hours: 6, description: "Database schema design and migration setup" },
    { id: 3, date: "2025-10-23", hours: 7.5, description: "Code review and bug fixes" },
  ]);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Quick hour buttons
  const quickHours = [2, 4, 6, 8];

  const handleQuickHour = (h: number) => {
    setHours(h.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      date,
      hours: Number(hours),
      description,
    };

    try {
      hoursLogSchema.parse(formData);

      // Check if total would exceed contract
      const totalHours = hoursEntries.reduce((sum, entry) => sum + entry.hours, 0) + Number(hours);
      if (totalHours > jobData.totalHours) {
        setErrors({ hours: `Total would exceed contracted ${jobData.totalHours} hours` });
        toast.error("Hours would exceed contract limit");
        return;
      }
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        const newEntry = {
          id: hoursEntries.length + 1,
          date,
          hours: Number(hours),
          description,
        };
        setHoursEntries([newEntry, ...hoursEntries]);
        
        toast.success("Hours logged successfully!", {
          description: `${hours} hours added for ${date}`,
        });
        
        // Reset form
        setHours("");
        setDescription("");
        setDate(new Date().toISOString().split('T')[0]);
        setIsSubmitting(false);
      }, 500);
      
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

  const currentTotalHours = hoursEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const progressPercentage = (currentTotalHours / jobData.totalHours) * 100;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Link 
          to="/active-jobs" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Active Jobs
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Log Work Hours</h1>
          <p className="text-muted-foreground">{jobData.title} - {jobData.company}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Log Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Time Entry
                </CardTitle>
                <CardDescription>Track your daily work hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                      />
                      {errors.date && (
                        <p className="text-sm text-destructive">{errors.date}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hours">Hours Worked *</Label>
                      <Input
                        id="hours"
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="24"
                        placeholder="e.g., 8"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                      />
                      {errors.hours && (
                        <p className="text-sm text-destructive">{errors.hours}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Quick Select</Label>
                    <div className="flex gap-2">
                      {quickHours.map((h) => (
                        <Button
                          key={h}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickHour(h)}
                          className={hours === h.toString() ? "border-primary" : ""}
                        >
                          {h}h
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="description">What did you work on? *</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      placeholder="Briefly describe what you accomplished during this time..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={500}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {errors.description ? (
                        <p className="text-destructive">{errors.description}</p>
                      ) : (
                        <p>Minimum 5 characters required</p>
                      )}
                      <p>{description.length}/500</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Log Hours"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Previous Entries */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Time Entries</CardTitle>
                <CardDescription>Your logged work hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hoursEntries.map((entry) => (
                    <div key={entry.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{entry.date}</span>
                        </div>
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {entry.hours}h
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Progress Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Contract Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Job Title</p>
                  <p className="font-medium">{jobData.title}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company</p>
                  <p className="font-medium">{jobData.company}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Hours Progress</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{currentTotalHours}</span>
                      <span className="text-muted-foreground">of {jobData.totalHours} hours</span>
                    </div>
                    <Progress value={progressPercentage} />
                    <p className="text-xs text-muted-foreground text-center">
                      {jobData.totalHours - currentTotalHours} hours remaining
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900 dark:text-blue-100">
                    <p className="font-medium mb-2">Tips for Logging Hours</p>
                    <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                      <li>• Log hours daily for accuracy</li>
                      <li>• Be specific in descriptions</li>
                      <li>• Round to nearest 0.5 hours</li>
                      <li>• Track all billable work</li>
                    </ul>
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

export default LogHours;
