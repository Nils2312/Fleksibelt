import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, MoreVertical, FileText, Download, Plus, Paperclip, X, File, ArrowLeft } from "lucide-react";
import defaultProfile from "@/assets/default-profile.webp";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface Conversation {
  id: number;
  name: string;
  company?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
}

interface Message {
  id: number;
  sender: "me" | "other" | "system";
  text: string;
  timestamp: string;
  files?: { name: string; size: string; type: string }[];
  contractLink?: boolean;
}

const Messages = () => {
  const { userRole } = useAuth();
  const isMobile = useIsMobile();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(isMobile ? null : 1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [newChatName, setNewChatName] = useState("");
  const [newChatCompany, setNewChatCompany] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isEmployer = userRole === 'employer';
  
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Anna Larsen",
      company: "TechStart AS",
      lastMessage: "Great! When can you start?",
      timestamp: "10:30",
      unread: true,
      avatar: "AL",
    },
    {
      id: 2,
      name: "Erik Hansen",
      company: "DataFlow Solutions",
      lastMessage: "I've reviewed your application...",
      timestamp: "Yesterday",
      unread: false,
      avatar: "EH",
    },
    {
      id: 3,
      name: "Maria Berg",
      company: "Nordic Innovate",
      lastMessage: "Thanks for your interest!",
      timestamp: "2 days ago",
      unread: false,
      avatar: "MB",
    },
  ];
  
  const messages: { [key: number]: Message[] } = {
    1: [
      { id: 1, sender: "other", text: "Hi! I'm reaching out about the Frontend Developer position for our new dashboard project. We'd like to offer you this opportunity - 15-20 hours per week for 8 weeks at 450 NOK/hr. Are you interested?", timestamp: "Oct 15, 09:15" },
      { id: 2, sender: "me", text: "Hello Anna! Thank you for the offer. Yes, I'm very interested! The project sounds exciting and the terms work well for me.", timestamp: "Oct 15, 09:30" },
      { id: 3, sender: "system", text: "Anna Larsen sent you an employment contract", timestamp: "Oct 15, 10:00", contractLink: true },
      { id: 4, sender: "other", text: "Please review and sign the contract when you have a chance. Once signed, we can get started right away!", timestamp: "Oct 15, 10:01" },
      { id: 5, sender: "me", text: "Just signed the contract! Looking forward to working with you.", timestamp: "Oct 15, 11:20" },
      { id: 6, sender: "other", text: "Excellent! Let me share the project details with you.", timestamp: "Oct 16, 08:45" },
      { 
        id: 7, 
        sender: "other", 
        text: "Here are the design files and documentation you'll need:", 
        timestamp: "Oct 16, 08:46",
        files: [
          { name: "design_mockups.fig", size: "2.4 MB", type: "figma" },
          { name: "brand_guidelines.pdf", size: "1.8 MB", type: "pdf" },
          { name: "technical_specs.docx", size: "450 KB", type: "doc" }
        ]
      },
      { id: 8, sender: "me", text: "Thanks! I've downloaded all the files and reviewed them. The designs look clean. I have a question about the authentication flow - should I use OAuth or email/password?", timestamp: "Oct 16, 14:20" },
      { id: 9, sender: "other", text: "Good question! We'd prefer OAuth with Google and Microsoft login options. Email/password as a fallback.", timestamp: "Oct 16, 15:10" },
      { id: 10, sender: "me", text: "Perfect, that makes sense. I'll start with the authentication module this week and have something to show you by Friday.", timestamp: "Oct 16, 15:25" },
      { id: 11, sender: "other", text: "Sounds good! Let me know if you need anything. Our team is here to support you.", timestamp: "Oct 16, 15:30" },
      { id: 12, sender: "me", text: "Quick update: I've completed the login page and OAuth integration. Would you like me to deploy it to staging so you can test it?", timestamp: "Oct 19, 16:45" },
      { id: 13, sender: "other", text: "Yes please! That would be great. Send me the staging link when it's ready.", timestamp: "Oct 19, 17:00" },
      { 
        id: 14, 
        sender: "me", 
        text: "Deployed! I've also attached the component documentation. Let me know what you think!", 
        timestamp: "Oct 19, 18:20",
        files: [
          { name: "auth_component_docs.pdf", size: "850 KB", type: "pdf" }
        ]
      },
      { id: 15, sender: "other", text: "This looks fantastic! The UI is exactly what we wanted. Just one small thing - can you adjust the button spacing slightly? Otherwise perfect.", timestamp: "Oct 20, 09:00" },
      { id: 16, sender: "me", text: "Already fixed! Check it out now. Moving on to the dashboard layout next.", timestamp: "Oct 20, 10:15" },
      { id: 17, sender: "other", text: "Great! When can you start?", timestamp: "10:30" },
    ],
    2: [
      { id: 1, sender: "other", text: "Hello, I've reviewed your application for the Backend Developer role.", timestamp: "14:20" },
      { id: 2, sender: "me", text: "Thank you! I'm excited about the opportunity.", timestamp: "14:35" },
    ],
    3: [
      { id: 1, sender: "other", text: "Thanks for your interest!", timestamp: "11:00" },
    ],
  };
  
  const selectedMessages = selectedConversation ? messages[selectedConversation] || [] : [];
  const selectedConv = selectedConversation ? conversations.find(c => c.id === selectedConversation) : null;
  
  const handleSendMessage = () => {
    if (messageText.trim() || attachedFiles.length > 0) {
      // In a real app, this would send the message to a backend
      toast.success("Message sent successfully");
      setMessageText("");
      setAttachedFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalSize = [...attachedFiles, ...newFiles].reduce((acc, file) => acc + file.size, 0);
      const maxSize = 50 * 1024 * 1024; // 50MB
      
      if (totalSize > maxSize) {
        toast.error("Total file size cannot exceed 50MB");
        return;
      }
      
      setAttachedFiles([...attachedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleCreateNewChat = () => {
    if (newChatName.trim()) {
      toast.success(`New chat created with ${newChatName}`);
      setNewChatName("");
      setNewChatCompany("");
      setIsNewChatOpen(false);
    }
  };
  
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conv.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );
  
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="border-b border-border px-4 py-4">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-border flex flex-col ${
          isMobile && selectedConversation ? 'hidden' : 'flex'
        }`}>
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {isEmployer && (
              <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Chat
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start New Conversation</DialogTitle>
                    <DialogDescription>
                      Create a new chat with a student
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Student Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., John Doe"
                        value={newChatName}
                        onChange={(e) => setNewChatName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Job Position (Optional)</Label>
                      <Input
                        id="company"
                        placeholder="e.g., Frontend Developer"
                        value={newChatCompany}
                        onChange={(e) => setNewChatCompany(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleCreateNewChat}
                      disabled={!newChatName.trim()}
                    >
                      Create Chat
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 rounded-lg text-left transition-colors mb-1 ${
                    selectedConversation === conv.id 
                      ? 'bg-secondary' 
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={defaultProfile} />
                      <AvatarFallback>{conv.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className={`font-medium text-sm ${conv.unread ? 'font-semibold' : ''}`}>
                          {conv.name}
                        </p>
                        <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                      </div>
                      {conv.company && (
                        <p className="text-xs text-muted-foreground mb-1">{conv.company}</p>
                      )}
                      <p className={`text-sm truncate ${
                        conv.unread ? 'text-foreground font-medium' : 'text-muted-foreground'
                      }`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Chat Area */}
        <div className={`flex-1 flex flex-col min-h-0 ${
          isMobile && !selectedConversation ? 'hidden' : 'flex'
        }`}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  {isMobile && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <Avatar>
                    <AvatarImage src={defaultProfile} />
                    <AvatarFallback>{selectedConv.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedConv.name}</p>
                    {selectedConv.company && (
                      <p className="text-sm text-muted-foreground">{selectedConv.company}</p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 pb-28">
                <div className="space-y-6">
                  {selectedMessages.map((message) => (
                    <div key={message.id}>
                      {message.sender === "system" ? (
                        /* System/Contract Message */
                        <div className="flex justify-center">
                          <div className="max-w-md w-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{message.text}</p>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">{message.timestamp}</p>
                              </div>
                            </div>
                            {message.contractLink && (
                              <Link to="/student/contract">
                                <Button size="sm" className="w-full">
                                  View & Sign Contract
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Regular Message */
                        <div className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] ${message.sender === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                            <p
                              className={`text-xs text-muted-foreground px-2 ${
                                message.sender === "me" ? "text-right" : "text-left"
                              }`}
                            >
                              {message.timestamp}
                            </p>
                            <div
                              className={`rounded-3xl px-4 py-3 ${
                                message.sender === "me"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.text}</p>
                            </div>
                            
                            {/* File Attachments */}
                            {message.files && message.files.length > 0 && (
                              <div className="space-y-2 w-full mt-2">
                                {message.files.map((file, idx) => (
                                  <div
                                    key={idx}
                                    className={`flex items-center gap-3 p-4 rounded-2xl border ${
                                      message.sender === "me"
                                        ? "bg-primary/10 border-primary/20"
                                        : "bg-secondary border-border"
                                    }`}
                                  >
                                    <FileText className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium truncate">{file.name}</p>
                                      <p className="text-xs text-muted-foreground">{file.size}</p>
                                    </div>
                                    <Button size="sm" variant="ghost" className="flex-shrink-0">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Message Input */}
              <div className={`fixed bottom-0 right-0 p-4 border-t border-border bg-background z-50 ${
                isMobile ? 'left-0' : 'left-0 md:left-80 lg:left-96'
              }`}>
                <div className="space-y-3">
                  {/* Attached Files Preview */}
                  {attachedFiles.length > 0 && (
                    <div className="space-y-2">
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-secondary rounded-2xl"
                        >
                          <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      type="button"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="rounded-full px-6 flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
