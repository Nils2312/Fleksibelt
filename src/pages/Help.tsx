import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MessageSquare, HelpCircle, Shield, Lightbulb, Briefcase, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "support", text: "Hello! How can we help you today?", time: "Just now" },
  ]);

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatMessages([
      ...chatMessages,
      { sender: "user", text: chatMessage, time: "Just now" },
    ]);
    setChatMessage("");
    
    // Simulate support response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "support", text: "Thanks for your message! Our team is reviewing your inquiry and will respond shortly.", time: "Just now" },
      ]);
    }, 1000);
  };
  const studentFAQs = [
    {
      question: "How do I apply for a job?",
      answer: "Browse available jobs on the Jobs page, click on a job that interests you, and click the 'Apply Now' button. Make sure your profile is complete before applying to increase your chances of being selected."
    },
    {
      question: "How do payments work?",
      answer: "Once you complete a job, the employer will mark it as completed. Payments are processed within 5 business days and transferred directly to your registered account. You can track all your payments on the Payments page."
    },
    {
      question: "Can I work multiple jobs at once?",
      answer: "Yes! You can work on multiple projects simultaneously as long as you can manage your time effectively and meet all deadlines. Make sure to update your availability calendar to avoid scheduling conflicts."
    },
    {
      question: "What if I need to cancel a job?",
      answer: "If you need to cancel an accepted job, contact the employer as soon as possible through the messaging system. Keep in mind that last-minute cancellations may affect your profile rating."
    },
    {
      question: "How do I improve my profile visibility?",
      answer: "Complete your profile 100%, add a professional photo, showcase your best work in your portfolio, keep your skills updated, and maintain good ratings by delivering quality work on time."
    },
    {
      question: "How does the review system work?",
      answer: "After completing a job, both you and the employer can leave reviews. These reviews help build trust in the platform and help future employers assess your work quality. Be honest and professional in your reviews."
    }
  ];

  const employerFAQs = [
    {
      question: "How do I post a job?",
      answer: "Click on 'Post New Job' from your dashboard or navigation menu. Fill in the job details including title, description, duration, compensation, and required skills. Once published, your job will be visible to students."
    },
    {
      question: "How do I select the right candidate?",
      answer: "Review applicant profiles, check their skills, previous work experience, and ratings. You can message candidates before making a decision. Look for students whose skills match your requirements and have good reviews."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major payment methods including credit cards, debit cards, and bank transfers. Payments are held securely until the job is marked as completed by both parties."
    },
    {
      question: "Can I edit a job posting after publishing?",
      answer: "Yes, you can edit your job posting at any time from your dashboard. However, if students have already applied, they will be notified of significant changes to the job description or compensation."
    },
    {
      question: "What if a student doesn't complete the work?",
      answer: "First, try to communicate with the student to understand the issue. If the problem persists, you can report the issue to our support team. We'll mediate and ensure a fair resolution for both parties."
    },
    {
      question: "How do I verify my company?",
      answer: "Company verification is automatic when you provide valid business registration documents during signup. Verified companies get a badge on their profile, which helps attract quality candidates."
    },
    {
      question: "Can I pay the student outside the platform?",
      answer: "No, all payments must be processed through the platform for everyone's safety and security. Using external payment methods violates our Terms of Service and can result in account suspension or permanent ban. Our platform ensures secure transactions, proper documentation, and protection for both employers and students."
    }
  ];

  const policiesFAQs = [
    {
      question: "Privacy Policy",
      answer: "We are committed to protecting your privacy. We collect only necessary information to provide our services, including your name, email, university details, and work history. Your personal data is encrypted and stored securely. We never sell your information to third parties. You have full control over your data and can request access, modification, or deletion at any time. All data is stored within the EU in compliance with GDPR regulations."
    },
    {
      question: "Terms of Use",
      answer: "By using our platform, you agree to: (1) Provide accurate information in your profile, (2) Maintain professional conduct in all interactions, (3) Respect intellectual property rights, (4) Complete accepted work commitments or communicate cancellations promptly, (5) Not misuse the platform for unauthorized purposes. Employers agree to: (1) Pay agreed compensation for completed work, (2) Provide clear project requirements, (3) Maintain a safe and respectful work environment. Violations may result in account suspension or termination."
    },
    {
      question: "Rating & Review Rules",
      answer: "Our rating system helps build trust on the platform. Reviews must be: (1) Based on actual work experience, (2) Honest and constructive, (3) Free from discriminatory or offensive language, (4) Focused on work quality and professionalism. Both students and employers can rate each other after job completion. Ratings are permanent and cannot be edited once submitted. False or malicious reviews can be reported and will be investigated. Consistent low ratings may affect your ability to use the platform."
    },
    {
      question: "Data Transparency (GDPR Data Rights)",
      answer: "Under GDPR, you have the right to: (1) Access your data - Request a complete copy of all data we hold about you, (2) Rectification - Correct any inaccurate or incomplete data, (3) Erasure - Request deletion of your personal data (right to be forgotten), (4) Portability - Receive your data in a structured, machine-readable format, (5) Restriction - Limit how we process your data, (6) Object - Opt out of certain data processing activities. To exercise these rights, contact our Data Protection Officer at privacy@platform.no. We will respond within 30 days."
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions</p>
        </div>

        <div className="grid gap-6 mb-8">
          {/* For Students */}
          <Card>
            <CardHeader>
              <CardTitle>For Students</CardTitle>
              <CardDescription>Common questions from students looking for work</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {studentFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`student-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* For Employers */}
          <Card>
            <CardHeader>
              <CardTitle>For Employers</CardTitle>
              <CardDescription>Common questions from employers hiring students</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {employerFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`employer-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Policies & Trust */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Policies & Trust</CardTitle>
              <CardDescription>Important policies and data rights information</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {policiesFAQs.map((policy, index) => (
                  <AccordionItem key={index} value={`policy-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {policy.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {policy.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Success Guides */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Success Guides
              </CardTitle>
              <CardDescription>
                Learn proven strategies to succeed on our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link to="/student-tips" className="w-full">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 group">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      <span className="font-semibold">Tips for Students</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-center group-hover:text-white transition-colors">
                      How to land jobs and build your reputation
                    </span>
                  </Button>
                </Link>
                <Link to="/employer-tips" className="w-full">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 group">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-semibold">Tips for Employers</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-center group-hover:text-white transition-colors">
                      How to attract top talent and manage projects
                    </span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Still need help?
            </CardTitle>
            <CardDescription className="text-blue-800 dark:text-blue-200">
              Our support team is here to assist you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact-support" className="flex-1">
                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
              </Link>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Live Chat Support
                    </DialogTitle>
                    <DialogDescription>
                      Chat with our support team. Average response time: 2 minutes
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    {/* Chat Messages */}
                    <div className="h-[400px] overflow-y-auto border rounded-lg p-4 space-y-4 bg-muted/30">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 ${
                            msg.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {msg.sender === "support" ? "S" : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`flex flex-col ${
                              msg.sender === "user" ? "items-end" : ""
                            }`}
                          >
                            <div
                              className={`rounded-lg px-4 py-2 max-w-[300px] ${
                                msg.sender === "support"
                                  ? "bg-card border"
                                  : "bg-primary text-primary-foreground"
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendChatMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendChatMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-4">
              Response time: Usually within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
