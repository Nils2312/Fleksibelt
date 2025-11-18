import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, UserPlus, Mail, Shield, Edit2, ArrowLeft } from "lucide-react";
import defaultProfile from "@/assets/default-profile.webp";
import { formatNorwegianDate } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Manager" | "Recruiter";
  avatar?: string;
  joinedDate: string;
}

const EmployerTeamMembers = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isChangeRoleDialogOpen, setIsChangeRoleDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newRole, setNewRole] = useState<TeamMember["role"]>("Recruiter");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Owner",
      joinedDate: "2023-01-15"
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@company.com",
      role: "Admin",
      joinedDate: "2023-03-20"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily@company.com",
      role: "Manager",
      joinedDate: "2023-06-10"
    },
    {
      id: "4",
      name: "David Kim",
      email: "david@company.com",
      role: "Recruiter",
      joinedDate: "2023-09-05"
    },
    {
      id: "5",
      name: "Jessica Thompson",
      email: "jessica@company.com",
      role: "Recruiter",
      joinedDate: "2024-02-18"
    },
    {
      id: "6",
      name: "Marcus Williams",
      email: "marcus@company.com",
      role: "Recruiter",
      joinedDate: "2024-05-22"
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Recruiter" as TeamMember["role"]
  });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: "", email: "", role: "Recruiter" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Team Member Added",
      description: `${member.name} has been invited to join your team`
    });
  };

  const handleRemoveMember = (id: string, name: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast({
      title: "Team Member Removed",
      description: `${name} has been removed from your team`
    });
  };

  const handleOpenChangeRole = (member: TeamMember) => {
    setSelectedMember(member);
    setNewRole(member.role);
    setIsChangeRoleDialogOpen(true);
  };

  const handleChangeRole = () => {
    if (!selectedMember) return;

    setTeamMembers(teamMembers.map(member => 
      member.id === selectedMember.id 
        ? { ...member, role: newRole }
        : member
    ));
    
    toast({
      title: "Role Updated",
      description: `${selectedMember.name}'s role has been changed to ${newRole}`
    });
    
    setIsChangeRoleDialogOpen(false);
    setSelectedMember(null);
  };

  const getRoleBadgeColor = (role: TeamMember["role"]) => {
    switch (role) {
      case "Owner":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Admin":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Manager":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Recruiter":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/employer/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Team Members</h1>
            <p className="text-muted-foreground">
              Manage your company's team members and their roles
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Add a new member to your company team. They will receive an invitation email.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) => setNewMember({ ...newMember, role: value as TeamMember["role"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Recruiter">Recruiter</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>
              {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || defaultProfile} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{member.name}</h3>
                        <Badge variant="outline" className={getRoleBadgeColor(member.role)}>
                          <Shield className="h-3 w-3 mr-1" />
                          {member.role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </span>
                        <span>
                          Joined {formatNorwegianDate(member.joinedDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {member.role !== "Owner" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenChangeRole(member)}
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Change Role
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id, member.name)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Understanding team member roles and their access levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-500">Owner</h4>
                <p className="text-sm text-muted-foreground">Full access to all features, billing, and team management</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-500">Admin</h4>
                <p className="text-sm text-muted-foreground">Manage jobs, view insights, handle payments, and manage team members</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-500">Manager</h4>
                <p className="text-sm text-muted-foreground">Post jobs, review applicants, and access company insights</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-500">Recruiter</h4>
                <p className="text-sm text-muted-foreground">View and manage job applicants, send messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Role Dialog */}
      <Dialog open={isChangeRoleDialogOpen} onOpenChange={setIsChangeRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription>
              Update {selectedMember?.name}'s role in your team
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newRole">New Role</Label>
              <Select
                value={newRole}
                onValueChange={(value) => setNewRole(value as TeamMember["role"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Recruiter">Recruiter</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChangeRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangeRole}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployerTeamMembers;
