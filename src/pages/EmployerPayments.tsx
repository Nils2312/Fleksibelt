import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, AlertCircle, ArrowLeft, Building2, FileText, Calendar, TrendingUp, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EmployerPayments = () => {
  const billingProfile = {
    companyName: "TechStart AS",
    organizationNumber: "123 456 789 MVA",
    vatNumber: "NO123456789MVA",
    billingAddress: "Storgata 15, 0155 Oslo, Norway",
    poReference: "PO-2025-001",
    financeContact: "finance@techstart.no",
  };

  const billingMethod = {
    type: "EHF + PDF via email",
    paymentTerms: "Net 30 days",
    currency: "NOK",
    vatRate: "25%",
    accountingIntegration: "Fiken",
  };
  
  const spending = {
    thisMonth: 25000,
    lastMonth: 18500,
    total: 156000,
  };
  
  const unpaidInvoices = [
    {
      id: 1,
      invoiceNumber: "INV-2025-003",
      studentName: "Sofia Andersen",
      job: "Backend Developer",
      amount: 4500,
      date: "2025-10-25",
      dueDate: "2025-11-24",
    },
    {
      id: 2,
      invoiceNumber: "INV-2025-004",
      studentName: "Henrik Larsen",
      job: "UI/UX Designer",
      amount: 6200,
      date: "2025-10-28",
      dueDate: "2025-11-27",
    },
  ];

  const paidInvoices = [
    {
      id: 1,
      invoiceNumber: "INV-2025-001",
      studentName: "Emma Johansen",
      job: "Frontend Developer",
      amount: 12000,
      date: "2025-10-20",
      paidDate: "2025-10-25",
    },
    {
      id: 2,
      invoiceNumber: "INV-2025-002",
      studentName: "Lars Nielsen",
      job: "Full Stack Developer",
      amount: 8500,
      date: "2025-10-10",
      paidDate: "2025-10-15",
    },
  ];
  
  
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
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payments & Billing</h1>
          <p className="text-muted-foreground">Manage your company's invoices and financial activity</p>
        </div>
        
        {/* Spending Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">This Month</p>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{spending.thisMonth.toLocaleString()} kr</p>
              <p className="text-xs text-muted-foreground mt-1">+35% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Last Month</p>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{spending.lastMonth.toLocaleString()} kr</p>
              <p className="text-xs text-muted-foreground mt-1">Oct 2025</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{spending.total.toLocaleString()} kr</p>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Billing Profile */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Billing Profile</CardTitle>
                <CardDescription>Company information for invoicing</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Company Name</p>
                <p className="font-semibold">{billingProfile.companyName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Organization Number</p>
                <p className="font-semibold">{billingProfile.organizationNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">VAT Registration</p>
                <p className="font-semibold">{billingProfile.vatNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Finance Contact</p>
                <p className="font-semibold">{billingProfile.financeContact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Billing Address</p>
                <p className="font-semibold">{billingProfile.billingAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Purchase Order / Reference</p>
                <p className="font-semibold">{billingProfile.poReference}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Method */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Billing Method</CardTitle>
                <CardDescription>How you receive and pay invoices</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Edit Billing Method
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Invoice Type</p>
                <p className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  EHF + PDF Copy via Email
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Payment Terms</p>
                <p className="font-semibold">Net 30 Days</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Currency</p>
                <p className="font-semibold">{billingMethod.currency}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">VAT Rate</p>
                <p className="font-semibold">25% (where applicable)</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground mb-1">Accounting Integration</p>
                <p className="font-semibold">Fiken</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tripletex and PowerOffice supported
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Unpaid Invoices */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Unpaid Invoices</CardTitle>
                <CardDescription>Invoices awaiting payment</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unpaidInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.studentName}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.job}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800">
                        {invoice.dueDate}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {invoice.amount.toLocaleString()} kr
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-3 w-3 mr-1" />
                          Send to Accounting
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Paid Invoices */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Paid Invoices</CardTitle>
                <CardDescription>Payment history</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Invoice Date</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paidInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.studentName}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.job}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {invoice.paidDate}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {invoice.amount.toLocaleString()} kr
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Invoice Information */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Invoice Information
                </p>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                  <li>• Invoices are issued automatically upon project completion</li>
                  <li>• Payments are made via bank transfer using KID number</li>
                  <li>• All invoices support EHF for seamless accounting integration</li>
                  <li>• Contact support for credit notes, disputes, or corrections</li>
                  <li>• Standard payment terms: Net 30 days from invoice date</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerPayments;
