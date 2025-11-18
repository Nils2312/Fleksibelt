import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, MessageSquare, Phone, Clock, Send, User } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  category: z.string().min(1, "Please select a category"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

const ContactSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "support", text: "Hello! How can we help you today?", time: "Just now" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name,
      email,
      category,
      subject,
      message,
    };

    try {
      contactSchema.parse(formData);
      
      setIsSubmitting(true);
      
      // Simulate sending
      setTimeout(() => {
        toast.success("Message sent successfully!", {
          description: "Our support team will get back to you within 24 hours.",
        });
        
        // Reset form
        setName("");
        setEmail("");
        setCategory("");
        setSubject("");
        setMessage("");
        setIsSubmitting(false);
      }, 1000);
      
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
          <h1 className="text-3xl font-bold mb-2">Contact Support</h1>
          <p className="text-muted-foreground">
            Get in touch with our support team. We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="payment">Payment & Billing</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="job">Job Posting Issues</SelectItem>
                        <SelectItem value="application">Application Issues</SelectItem>
                        <SelectItem value="report">Report Abuse</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible about your issue..."
                      rows={8}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={2000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {errors.message ? (
                        <p className="text-destructive">{errors.message}</p>
                      ) : (
                        <p>Please provide detailed information to help us assist you better</p>
                      )}
                      <p>{message.length}/2000</p>
                    </div>
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <a href="mailto:support@fleksibelt.no" className="text-sm text-muted-foreground hover:text-primary">
                      support@fleksibelt.no
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Live Chat</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Available Mon-Fri, 9am-5pm
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-3 w-3 mr-2" />
                          Start Chat
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
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Phone</p>
                    <a href="tel:+4712345678" className="text-sm text-muted-foreground hover:text-primary">
                      +47 12 34 56 78
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Expected Response Time
                    </p>
                    <p className="text-blue-800 dark:text-blue-200">
                      We aim to respond to all inquiries within 24 hours during business days. 
                      Urgent issues are prioritized and handled faster.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm">
                  <p className="font-medium mb-2">Need Quick Answers?</p>
                  <p className="text-muted-foreground mb-3">
                    Check our Help Center for instant answers to common questions.
                  </p>
                  <Link to="/help">
                    <Button variant="outline" size="sm" className="w-full">
                      Visit Help Center
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
