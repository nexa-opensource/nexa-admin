import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SUBSCRIBERS, CAMPAIGNS } from "@/lib/mock-data";
import { Mail, Plus, Search, Filter, Users, Send, FileEdit, MoreHorizontal, TrendingUp, UserPlus, MousePointerClick, Eye, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { RichTextEditor } from "@/components/content/RichTextEditor";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function NewsletterPage() {
  const [view, setView] = useState<"list" | "create">("list");

  return (
    <AdminLayout>
      {view === "list" ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Newsletter & Alerts</h1>
              <p className="text-muted-foreground text-lg">Manage subscribers and email campaigns.</p>
            </div>
            <Button onClick={() => setView("create")}>
              <Plus className="mr-2 h-4 w-4" /> New Campaign
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
                   <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold">2,643</div>
                   <p className="text-xs text-emerald-500 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
                   </p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Open Rate</CardTitle>
                   <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold">40.3%</div>
                   <p className="text-xs text-muted-foreground mt-1">Industry avg: 21%</p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Click Rate</CardTitle>
                   <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold">10.5%</div>
                   <p className="text-xs text-muted-foreground mt-1">Industry avg: 2.5%</p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <CardTitle className="text-sm font-medium text-muted-foreground">Last Campaign</CardTitle>
                   <Send className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                   <div className="text-2xl font-bold">2,450</div>
                   <p className="text-xs text-muted-foreground mt-1">Emails sent successfully</p>
                </CardContent>
             </Card>
          </div>

          <Tabs defaultValue="campaigns" className="space-y-4">
             <TabsList>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
             </TabsList>
             
             <TabsContent value="campaigns" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {CAMPAIGNS.map(campaign => (
                      <Card key={campaign.id} className="group cursor-pointer hover:border-primary/50 transition-colors">
                         <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                               <Badge variant={campaign.status === 'sent' ? 'default' : campaign.status === 'scheduled' ? 'secondary' : 'outline'}>
                                  {campaign.status}
                               </Badge>
                               {campaign.sentAt && <span className="text-xs text-muted-foreground">{campaign.sentAt}</span>}
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">{campaign.subject}</CardTitle>
                            <CardDescription>
                               {campaign.status === 'draft' ? 'Not scheduled yet' : `Sent to ${campaign.recipients.toLocaleString()} subscribers`}
                            </CardDescription>
                         </CardHeader>
                         <CardContent>
                            {campaign.status === 'sent' ? (
                               <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                                  <div>
                                     <p className="text-xs text-muted-foreground">Open Rate</p>
                                     <p className="font-semibold text-lg">{campaign.openRate}%</p>
                                  </div>
                                  <div>
                                     <p className="text-xs text-muted-foreground">Click Rate</p>
                                     <p className="font-semibold text-lg">{campaign.clickRate}%</p>
                                  </div>
                               </div>
                            ) : (
                               <div className="pt-2 border-t flex items-center justify-center h-[60px] text-muted-foreground text-sm">
                                  {campaign.status === 'scheduled' ? 'Scheduled to send automatically' : 'Draft in progress'}
                               </div>
                            )}
                         </CardContent>
                      </Card>
                   ))}
                   
                   <Card className="border-dashed flex items-center justify-center min-h-[200px] hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => setView("create")}>
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                         <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Plus className="h-5 w-5" />
                         </div>
                         <span className="font-medium">Create New Campaign</span>
                      </div>
                   </Card>
                </div>
             </TabsContent>

             <TabsContent value="subscribers" className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search email..." className="pl-9" />
                   </div>
                   <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                   </Button>
                   <Button variant="outline">
                      Export CSV
                   </Button>
                </div>

                <div className="border rounded-md">
                   <Table>
                      <TableHeader>
                         <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Subscribed At</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                         </TableRow>
                      </TableHeader>
                      <TableBody>
                         {SUBSCRIBERS.map((sub) => (
                            <TableRow key={sub.id}>
                               <TableCell className="font-medium">{sub.email}</TableCell>
                               <TableCell>
                                  <Badge variant={sub.status === 'active' ? 'outline' : sub.status === 'unsubscribed' ? 'secondary' : 'destructive'} className="font-normal">
                                     {sub.status}
                                  </Badge>
                               </TableCell>
                               <TableCell>{sub.source}</TableCell>
                               <TableCell>{sub.subscribedAt}</TableCell>
                               <TableCell>
                                  <DropdownMenu>
                                     <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                           <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                     </DropdownMenuTrigger>
                                     <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                                     </DropdownMenuContent>
                                  </DropdownMenu>
                               </TableCell>
                            </TableRow>
                         ))}
                      </TableBody>
                   </Table>
                </div>
             </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setView("list")} className="-ml-2 text-muted-foreground hover:text-foreground">
                   <ArrowLeft className="h-4 w-4 mr-2" /> Back to Campaigns
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">New Campaign</h1>
             </div>
             <div className="flex items-center gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>
                   <Send className="mr-2 h-4 w-4" /> Send Campaign
                </Button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-6">
                <Card>
                   <CardHeader>
                      <CardTitle>Email Content</CardTitle>
                      <CardDescription>Compose your newsletter content.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <div className="space-y-2">
                         <Label>Subject Line</Label>
                         <Input placeholder="Enter a catchy subject..." />
                      </div>
                      <div className="space-y-2">
                         <Label>Preheader Text</Label>
                         <Input placeholder="Preview text shown in inbox..." />
                         <p className="text-xs text-muted-foreground">Optional but recommended.</p>
                      </div>
                      <div className="space-y-2">
                         <Label>Message Body</Label>
                         <RichTextEditor minHeight="min-h-[400px]" defaultValue="<p>Hello team,</p><p>Here are the updates for this week...</p>" />
                      </div>
                   </CardContent>
                </Card>
             </div>

             <div className="space-y-6">
                <Card>
                   <CardHeader>
                      <CardTitle>Recipients</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <div className="space-y-2">
                         <Label>Send To</Label>
                         <Select defaultValue="all">
                            <SelectTrigger>
                               <SelectValue placeholder="Select segment" />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="all">All Subscribers (2,643)</SelectItem>
                               <SelectItem value="active">Active Users Only (1,850)</SelectItem>
                               <SelectItem value="new">New Signups (Last 30 days)</SelectItem>
                            </SelectContent>
                         </Select>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-muted-foreground">Estimated Audience</span>
                         <span className="font-medium">2,643 users</span>
                      </div>
                   </CardContent>
                </Card>

                <Card>
                   <CardHeader>
                      <CardTitle>Scheduling</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <div className="space-y-2">
                         <Label>Send Time</Label>
                         <Tabs defaultValue="now" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                               <TabsTrigger value="now">Send Now</TabsTrigger>
                               <TabsTrigger value="later">Schedule</TabsTrigger>
                            </TabsList>
                            <TabsContent value="later" className="space-y-4 pt-2">
                               <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                     <Label className="text-xs">Date</Label>
                                     <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>Pick a date</span>
                                     </Button>
                                  </div>
                                  <div className="space-y-1">
                                     <Label className="text-xs">Time</Label>
                                     <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <span>10:00 AM</span>
                                     </Button>
                                  </div>
                               </div>
                            </TabsContent>
                         </Tabs>
                      </div>
                   </CardContent>
                </Card>

                <Card>
                   <CardHeader>
                      <CardTitle>Test Email</CardTitle>
                      <CardDescription>Send a preview to yourself.</CardDescription>
                   </CardHeader>
                   <CardContent>
                      <div className="flex gap-2">
                         <Input placeholder="your@email.com" />
                         <Button variant="secondary">Send</Button>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
