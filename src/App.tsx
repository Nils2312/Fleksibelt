import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ActiveJobs from "./pages/ActiveJobs";
import Landing from "./pages/Landing";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentPublicProfile from "./pages/StudentPublicProfile";
import StudentCalendar from "./pages/StudentCalendar";
import StudentPayments from "./pages/StudentPayments";
import StudentInsights from "./pages/StudentInsights";
import StudentCV from "./pages/StudentCV";
import StudentSavedJobs from "./pages/StudentSavedJobs";
import StudentContract from "./pages/StudentContract";
import RecommendedJobs from "./pages/RecommendedJobs";
import Report from "./pages/Report";
import ManageActiveJob from "./pages/ManageActiveJob";
import NotificationCenter from "./pages/NotificationCenter";
import CompleteJob from "./pages/CompleteJob";
import LogHours from "./pages/LogHours";
import ViewStudentHours from "./pages/ViewStudentHours";
import CompletedProjectDetail from "./pages/CompletedProjectDetail";
import ReviewDelivery from "./pages/ReviewDelivery";
import RequestChanges from "./pages/RequestChanges";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerPublicProfile from "./pages/EmployerPublicProfile";
import EmployerInsights from "./pages/EmployerInsights";
import EmployerPayments from "./pages/EmployerPayments";
import EmployerTeamMembers from "./pages/EmployerTeamMembers";
import BadgesInfo from "./pages/BadgesInfo";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import JobApplicants from "./pages/JobApplicants";
import JobPostingInsights from "./pages/JobPostingInsights";
import Messages from "./pages/Messages";
import Help from "./pages/Help";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import StudentTips from "./pages/StudentTips";
import EmployerTips from "./pages/EmployerTips";
import EmployerBankAccount from "./pages/EmployerBankAccount";
import StudentBankAccount from "./pages/StudentBankAccount";
import ContactSupport from "./pages/ContactSupport";
import NotFound from "./pages/NotFound";
import EmployerPricing from "./pages/EmployerPricing";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideFooter = location.pathname === "/messages";

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/active-jobs" element={<ActiveJobs />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/profile/:id" element={<StudentPublicProfile />} />
          <Route path="/student/calendar" element={<StudentCalendar />} />
          <Route path="/student/payments" element={<StudentPayments />} />
          <Route path="/student/bank-account" element={<StudentBankAccount />} />
          <Route path="/student/insights" element={<StudentInsights />} />
          <Route path="/student/cv" element={<StudentCV />} />
          <Route path="/student/saved-jobs" element={<StudentSavedJobs />} />
          <Route path="/student/contract" element={<StudentContract />} />
          <Route path="/student/recommended-jobs" element={<RecommendedJobs />} />
          <Route path="/report" element={<Report />} />
          <Route path="/manage-job" element={<ManageActiveJob />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/complete-job" element={<CompleteJob />} />
          <Route path="/log-hours" element={<LogHours />} />
          <Route path="/view-student-hours" element={<ViewStudentHours />} />
          <Route path="/completed-project" element={<CompletedProjectDetail />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/review-delivery" element={<ReviewDelivery />} />
          <Route path="/employer/request-changes" element={<RequestChanges />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />
          <Route path="/employer/profile/:id" element={<EmployerPublicProfile />} />
          <Route path="/employer/insights" element={<EmployerInsights />} />
          <Route path="/employer/payments" element={<EmployerPayments />} />
          <Route path="/employer/bank-account" element={<EmployerBankAccount />} />
          <Route path="/employer/team-members" element={<EmployerTeamMembers />} />
          <Route path="/badges-info" element={<BadgesInfo />} />
          <Route path="/employer/post-job" element={<PostJob />} />
          <Route path="/employer/edit-job" element={<EditJob />} />
          <Route path="/employer/pricing" element={<EmployerPricing />} />
          <Route path="/employer/jobs/:jobId/applicants" element={<JobApplicants />} />
          <Route path="/employer/job-insights" element={<JobPostingInsights />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/student-tips" element={<StudentTips />} />
          <Route path="/employer-tips" element={<EmployerTips />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
