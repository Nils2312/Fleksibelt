import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { CalendarDays, Info, ArrowLeft } from "lucide-react";
import { formatNorwegianDate } from "@/lib/utils";

type DayAvailability = {
  [key: string]: boolean;
};

const StudentCalendar = () => {
  const [awayMode, setAwayMode] = useState(false);
  const [weeklyAvailability, setWeeklyAvailability] = useState<DayAvailability>({
    monday: true,
    tuesday: true,
    wednesday: false,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });
  const [absenceDates, setAbsenceDates] = useState<Date[]>([]);
  
  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];
  
  const toggleDay = (day: string) => {
    setWeeklyAvailability({
      ...weeklyAvailability,
      [day]: !weeklyAvailability[day],
    });
  };
  
  const handleAwayModeToggle = (checked: boolean) => {
    setAwayMode(checked);
    if (checked) {
      toast.info("Away Mode activated. Your profile is now hidden from employers.");
    } else {
      toast.success("Away Mode deactivated. Your profile is visible again.");
    }
  };
  
  const handleSave = () => {
    toast.success("Availability updated successfully!");
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
          <h1 className="text-3xl font-bold mb-2">My Availability</h1>
          <p className="text-muted-foreground">Manage your weekly schedule and time off</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Availability */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Availability</CardTitle>
                <CardDescription>
                  Select the days you're available to work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {days.map((day) => (
                  <div 
                    key={day.key}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary transition-colors cursor-pointer"
                    onClick={() => toggleDay(day.key)}
                  >
                    <span className="font-medium">{day.label}</span>
                    <div 
                      className={`w-16 h-8 rounded-full transition-colors flex items-center px-1 ${
                        weeklyAvailability[day.key] 
                          ? 'bg-primary' 
                          : 'bg-muted'
                      }`}
                    >
                      <div 
                        className={`w-6 h-6 rounded-full bg-background shadow-sm transition-transform ${
                          weeklyAvailability[day.key] ? 'translate-x-8' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Away Mode */}
            <Card>
              <CardHeader>
                <CardTitle>Away Mode</CardTitle>
                <CardDescription>
                  Hide your profile when on vacation, exams, or unavailable
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="away-mode" className="text-base font-medium cursor-pointer">
                      Away Mode
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      When active, your profile won't appear in job searches
                    </p>
                  </div>
                  <Switch 
                    id="away-mode"
                    checked={awayMode}
                    onCheckedChange={handleAwayModeToggle}
                  />
                </div>
                
                {awayMode && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900 dark:text-amber-100">
                      <p className="font-medium mb-1">Profile Hidden</p>
                      <p className="text-amber-700 dark:text-amber-200">
                        Your profile is currently hidden from employers. You won't receive new job offers until you turn off Away Mode.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Absence Dates */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Off & Holidays</CardTitle>
                <CardDescription>
                  Mark dates when you're not available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar
                  mode="multiple"
                  selected={absenceDates}
                  onSelect={(dates) => setAbsenceDates(dates || [])}
                  className="rounded-md border w-full pointer-events-auto"
                />
                
                {absenceDates.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Selected Dates:</h4>
                    <div className="flex flex-wrap gap-2">
                      {absenceDates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-md text-sm"
                        >
                          <CalendarDays className="h-4 w-4" />
                          {formatNorwegianDate(date)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      How Availability Works
                    </p>
                    <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                      <li>• Weekly schedule shows your typical availability</li>
                      <li>• Time off dates override your weekly schedule</li>
                      <li>• Away Mode hides you from all searches when unavailable</li>
                      <li>• Employers can see your availability when viewing your profile</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} size="lg">
            Save Availability
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentCalendar;
