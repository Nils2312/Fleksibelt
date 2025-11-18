import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Briefcase, User, MessageSquare, Bell, HelpCircle, ClipboardList, Plus, Menu, Tag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated, userRole } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigationItems = (
    <>
      <Link to={userRole === 'employer' ? '/employer/post-job' : '/jobs'} onClick={() => setMobileMenuOpen(false)}>
        <Button variant="ghost" size={isMobile ? "default" : "icon"} className="w-full justify-start">
          {userRole === 'employer' ? <Plus className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
          {isMobile && <span className="ml-2">{userRole === 'employer' ? 'Post Job' : 'Find Jobs'}</span>}
        </Button>
      </Link>
      
      {userRole === 'employer' && (
        <Link to="/employer/pricing" onClick={() => setMobileMenuOpen(false)}>
          <Button variant="ghost" size={isMobile ? "default" : "icon"} className="w-full justify-start">
            <Tag className="h-5 w-5" />
            {isMobile && <span className="ml-2">Pricing</span>}
          </Button>
        </Link>
      )}
      
      {isAuthenticated && (
        <Link to="/active-jobs" onClick={() => setMobileMenuOpen(false)} className="relative">
          <Button variant="ghost" size={isMobile ? "default" : "icon"} className="w-full justify-start">
            <ClipboardList className="h-5 w-5" />
            {isMobile && <span className="ml-2">Active Jobs</span>}
            <span className="absolute top-0 right-0 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">1</span>
          </Button>
        </Link>
      )}
      
      <Link to="/help" onClick={() => setMobileMenuOpen(false)}>
        <Button variant="ghost" size={isMobile ? "default" : "icon"} className="w-full justify-start">
          <HelpCircle className="h-5 w-5" />
          {isMobile && <span className="ml-2">Help</span>}
        </Button>
      </Link>
      
      {isAuthenticated && (
        <>
          <Link to="/notifications" onClick={() => setMobileMenuOpen(false)} className="relative">
            <Button variant="ghost" size={isMobile ? "default" : "icon"} className="w-full justify-start">
              <Bell className="h-5 w-5" />
              {isMobile && <span className="ml-2">Notifications</span>}
              <span className="absolute top-0 right-0 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">2</span>
            </Button>
          </Link>
          
          <Link to="/messages" onClick={() => setMobileMenuOpen(false)} className="relative">
            <Button variant="ghost" size={isMobile ? "default" : "icon"} className="w-full justify-start">
              <MessageSquare className="h-5 w-5" />
              {isMobile && <span className="ml-2">Messages</span>}
              <span className="absolute top-0 right-0 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">1</span>
            </Button>
          </Link>
          
          <Link to={userRole === 'student' ? '/student/dashboard' : '/employer/dashboard'} onClick={() => setMobileMenuOpen(false)}>
            <Button variant="ghost" size={isMobile ? "default" : "icon"} className="w-full justify-start">
              <User className="h-5 w-5" />
              {isMobile && <span className="ml-2">Profile</span>}
            </Button>
          </Link>
        </>
      )}
      
      {!isAuthenticated && (
        <>
          <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Log In
            </Button>
          </Link>
          <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
            <Button size="sm" className="w-full">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </>
  );
  
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Fleksibelt Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold text-foreground">Fleksibelt</span>
          </Link>
          
          {isMobile ? (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigationItems}
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={userRole === 'employer' ? '/employer/post-job' : '/jobs'}>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={
                        userRole === 'employer'
                          ? location.pathname === '/employer/post-job' ? 'text-primary bg-primary/10' : ''
                          : location.pathname === '/jobs' || location.pathname.startsWith('/jobs/') ? 'text-primary bg-primary/10' : ''
                      }
                    >
                      {userRole === 'employer' ? (
                        <Plus className="h-5 w-5" />
                      ) : (
                        <Briefcase className="h-5 w-5" />
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{userRole === 'employer' ? 'Post Job' : 'Find Jobs'}</p>
                </TooltipContent>
              </Tooltip>

              {userRole === 'employer' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/employer/pricing">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={location.pathname === '/employer/pricing' ? 'text-primary bg-primary/10' : ''}
                      >
                        <Tag className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pricing</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {isAuthenticated && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/active-jobs" className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={
                          location.pathname === '/active-jobs' || 
                          location.pathname === '/employer/job-insights' || 
                          location.pathname === '/employer/review-delivery' ||
                          location.pathname === '/employer/request-changes' ||
                          location.pathname === '/employer/edit-job' ||
                          location.pathname === '/view-student-hours' ||
                          location.pathname === '/manage-job' ||
                          location.pathname === '/log-hours' ||
                          location.pathname === '/complete-job' ||
                          location.pathname === '/student/contract' ||
                          location.pathname.startsWith('/employer/jobs/') && location.pathname.includes('/applicants')
                            ? 'text-primary bg-primary/10' 
                            : ''
                        }
                      >
                        <ClipboardList className="h-5 w-5" />
                      </Button>
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">
                        1
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Active Jobs</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/help">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={location.pathname === '/help' ? 'text-primary bg-primary/10' : ''}
                    >
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help</p>
                </TooltipContent>
              </Tooltip>
              
              {isAuthenticated && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/notifications" className="relative">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className={location.pathname === '/notifications' ? 'text-primary bg-primary/10' : ''}
                        >
                          <Bell className="h-5 w-5" />
                        </Button>
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">
                          2
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/messages" className="relative">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className={location.pathname === '/messages' ? 'text-primary bg-primary/10' : ''}
                        >
                          <MessageSquare className="h-5 w-5" />
                        </Button>
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">
                          1
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Messages</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
              
              {!isAuthenticated ? (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={userRole === 'student' ? '/student/dashboard' : '/employer/dashboard'}>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={
                          (location.pathname.startsWith('/student') || location.pathname.startsWith('/employer')) && 
                          !location.pathname.includes('/profile/') &&
                          location.pathname !== '/student/contract' &&
                          location.pathname !== '/employer/job-insights' && 
                          location.pathname !== '/employer/review-delivery' &&
                          location.pathname !== '/employer/request-changes' &&
                          location.pathname !== '/employer/edit-job' &&
                          location.pathname !== '/employer/post-job' &&
                          location.pathname !== '/employer/pricing' &&
                          location.pathname !== '/view-student-hours' &&
                          !(location.pathname.startsWith('/employer/jobs/') && location.pathname.includes('/applicants'))
                            ? 'text-primary bg-primary/10' 
                            : ''
                        }
                      >
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Profile</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
