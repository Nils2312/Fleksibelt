import { MapPin, Clock, Banknote, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  duration: string;
  skills: string[];
  posted: string;
  isSponsored?: boolean;
}

const JobCard = ({ id, title, company, location, salary, duration, skills, posted, isSponsored }: JobCardProps) => {
  return (
    <Card className="hover:shadow-card transition-shadow relative">
      <CardContent className="p-5">
        {isSponsored && (
          <Badge className="bg-amber-500 text-white hover:bg-amber-600 mb-3">
            Sponsored
          </Badge>
        )}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <Link to={`/jobs/${id}`}>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors mb-1">
                {title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Banknote className="h-4 w-4" />
            <span>{salary}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{posted}</span>
          <Link to={`/jobs/${id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
