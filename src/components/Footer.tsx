import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Briefcase, Instagram, Facebook, Twitter, Globe } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [language, setLanguage] = useState<"English" | "Norsk">("English");
  const { isAuthenticated, userRole } = useAuth();

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Fleksibelt Logo" className="h-6 w-6" />
              <span className="font-bold text-xl">Fleksibelt</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting talented students with exciting opportunities. Building the future of flexible work.
            </p>
          </div>

          {/* For Students */}
          <div>
            <h3 className="font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to={isAuthenticated && userRole === 'student' ? "/student/dashboard" : "/auth"} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/student-tips" className="text-muted-foreground hover:text-primary transition-colors">
                  Success Tips
                </Link>
              </li>
              <li>
                <Link 
                  to={isAuthenticated && userRole === 'student' ? "/student/saved-jobs" : "/auth"} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to={isAuthenticated && userRole === 'employer' ? "/employer/post-job" : "/auth"} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link 
                  to={isAuthenticated && userRole === 'employer' ? "/employer/dashboard" : "/auth"} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/employer-tips" className="text-muted-foreground hover:text-primary transition-colors">
                  Hiring Tips
                </Link>
              </li>
              <li>
                <Link to="/employer/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-semibold mb-4">Support & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Issue
                </Link>
              </li>
              <li>
                <Link to="/contact-support" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fleksibelt. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "English" ? "Norsk" : "English")}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span>{language}</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
