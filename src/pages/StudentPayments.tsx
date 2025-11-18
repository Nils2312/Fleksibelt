import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Clock, CheckCircle2, AlertCircle, Plus, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const StudentPayments = () => {
  const [hasCard, setHasCard] = useState(true);
  
  const cardInfo = {
    last4: "4242",
    brand: "Visa",
    expiryMonth: "12",
    expiryYear: "2026",
  };
  
  const earnings = {
    total: 24500,
    pending: 8500,
    available: 16000,
  };
  
  const payments = [
    {
      id: 1,
      job: "Frontend Developer",
      company: "TechStart AS",
      amount: 12000,
      status: "completed",
      date: "2025-10-15",
      paidDate: "2025-10-20",
    },
    {
      id: 2,
      job: "UI/UX Developer",
      company: "DesignHub",
      amount: 4500,
      status: "completed",
      date: "2025-09-28",
      paidDate: "2025-10-05",
    },
    {
      id: 3,
      job: "Backend Developer",
      company: "DataFlow Solutions",
      amount: 8500,
      status: "pending",
      date: "2025-10-25",
      paidDate: null,
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
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
          <h1 className="text-3xl font-bold mb-2">Payments & Earnings</h1>
          <p className="text-muted-foreground">Track your income and payment history</p>
        </div>
        
        {/* Earnings Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{earnings.total.toLocaleString()} kr</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Pending</p>
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold">{earnings.pending.toLocaleString()} kr</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Available</p>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold">{earnings.available.toLocaleString()} kr</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Payment Method */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bank Account</CardTitle>
                <CardDescription>Where you receive your payments</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {hasCard ? (
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{cardInfo.brand} •••• {cardInfo.last4}</p>
                    <p className="text-sm text-muted-foreground">
                      Payment account verified
                    </p>
                  </div>
                </div>
                <Link to="/student/bank-account">
                  <Button variant="outline" size="sm">
                    Change Account
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No bank account added</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bank Account
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Payment History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>All your completed and pending payments</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment, index) => (
                <div key={payment.id}>
                  <div className="flex items-center justify-between py-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{payment.job}</h4>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{payment.company}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Completed: {payment.date}</span>
                        {payment.paidDate && (
                          <span>Paid: {payment.paidDate}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{payment.amount.toLocaleString()} kr</p>
                    </div>
                  </div>
                  {index < payments.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Info */}
        <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Payment Information
                </p>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                  <li>• Payments are processed within 5 business days after job completion</li>
                  <li>• You'll receive an email notification when payment is sent</li>
                  <li>• All amounts are in Norwegian Kroner (NOK)</li>
                  <li>• Contact support if a payment is delayed beyond 7 days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPayments;
