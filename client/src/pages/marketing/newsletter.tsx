import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  SUBSCRIBERS,
  CAMPAIGNS,
  EmailCampaign,
  NewsletterSubscriber,
} from "@/lib/mock-data";
import {
  Mail,
  Plus,
  Search,
  Filter,
  Users,
  Send,
  FileEdit,
  MoreHorizontal,
  TrendingUp,
  UserPlus,
  MousePointerClick,
  Eye,
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  Download,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";
import { RichTextEditor } from "@/components/content/RichTextEditor";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export default function NewsletterPage() {
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "create">("list");

  // State for Campaigns
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] =
    useState<EmailCampaign | null>(null);

  // State for Editor
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [content, setContent] = useState("");
  const [segment, setSegment] = useState<"all" | "active" | "new">("all");

  // State for Scheduling
  const [sendMode, setSendMode] = useState<"now" | "later">("now");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [scheduledTime, setScheduledTime] = useState("10:00");

  // State for Subscribers
  const [subscribers, setSubscribers] =
    useState<NewsletterSubscriber[]>(SUBSCRIBERS);
  const [subscriberSearch, setSubscriberSearch] = useState("");
  const [isAddSubscriberOpen, setIsAddSubscriberOpen] = useState(false);

  // Calculate recipient count based on segment
  const getRecipientCount = (seg: string): number => {
    switch (seg) {
      case "active":
        return subscribers.filter((s) => s.status === "active").length;
      case "new":
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return subscribers.filter(
          (s) =>
            new Date(s.subscribedAt) >= thirtyDaysAgo && s.status === "active",
        ).length;
      default:
        return subscribers.length;
    }
  };

  // Calculate analytics from actual data
  const analytics = useMemo(() => {
    const sentCampaigns = campaigns.filter((c) => c.status === "sent");
    const avgOpenRate = sentCampaigns.length
      ? sentCampaigns.reduce((acc, c) => acc + (c.openRate || 0), 0) /
        sentCampaigns.length
      : 0;
    const avgClickRate = sentCampaigns.length
      ? sentCampaigns.reduce((acc, c) => acc + (c.clickRate || 0), 0) /
        sentCampaigns.length
      : 0;
    const lastCampaign = sentCampaigns.sort(
      (a, b) =>
        new Date(b.sentAt || 0).getTime() - new Date(a.sentAt || 0).getTime(),
    )[0];

    return {
      totalSubscribers: subscribers.length,
      avgOpenRate: avgOpenRate.toFixed(1),
      avgClickRate: avgClickRate.toFixed(1),
      lastCampaignRecipients: lastCampaign?.recipients || 0,
    };
  }, [campaigns, subscribers]);

  const handleEditCampaign = (campaign?: EmailCampaign) => {
    if (campaign) {
      setSelectedCampaign(campaign);
      setSubject(campaign.subject);
      setPreheader(campaign.preheader || "");
      setContent(campaign.content || "");
      setSegment(campaign.segment || "all");
      if (campaign.scheduledAt) {
        setSendMode("later");
      } else {
        setSendMode("now");
      }
    } else {
      setSelectedCampaign(null);
      setSubject("");
      setPreheader("");
      setContent("");
      setSegment("all");
      setSendMode("now");
      setScheduledDate(undefined);
      setScheduledTime("10:00");
    }
    setView("create");
  };

  const handleSaveCampaign = (action: "draft" | "send" | "schedule") => {
    if (!subject) {
      toast({
        title: "Error",
        description: "Subject line is required",
        variant: "destructive",
      });
      return;
    }

    if (action === "schedule" && !scheduledDate) {
      toast({
        title: "Error",
        description: "Please select a date for scheduling",
        variant: "destructive",
      });
      return;
    }

    const newStatus =
      action === "draft"
        ? "draft"
        : action === "schedule"
          ? "scheduled"
          : "sent";

    const newCampaign: EmailCampaign = {
      id: selectedCampaign?.id || Math.random().toString(36).substring(2, 11),
      subject,
      preheader,
      content,
      status: newStatus,
      segment,
      recipients: getRecipientCount(segment),
      scheduledAt:
        action === "schedule" && scheduledDate
          ? `${format(scheduledDate, "MMM d, yyyy")} at ${scheduledTime}`
          : undefined,
      sentAt:
        action === "send"
          ? new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : selectedCampaign?.sentAt,
      openRate: selectedCampaign?.openRate,
      clickRate: selectedCampaign?.clickRate,
    };

    if (selectedCampaign) {
      setCampaigns(
        campaigns.map((c) => (c.id === selectedCampaign.id ? newCampaign : c)),
      );
      toast({ title: "Success", description: "Campaign updated successfully" });
    } else {
      setCampaigns([newCampaign, ...campaigns]);
      toast({
        title: "Success",
        description: "New campaign created successfully",
      });
    }
    setView("list");
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast({ title: "Deleted", description: "Campaign has been removed" });
  };

  const handleAddSubscriber = (email: string) => {
    const newSubscriber: NewsletterSubscriber = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      status: "active",
      subscribedAt: new Date().toISOString().split("T")[0],
      source: "Manual Add",
    };
    setSubscribers([newSubscriber, ...subscribers]);
    setIsAddSubscriberOpen(false);
    toast({ title: "Success", description: "Subscriber added successfully" });
  };

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(subscribers.filter((s) => s.id !== id));
    toast({ title: "Deleted", description: "Subscriber removed" });
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      toast({
        title: "No Data",
        description: "No subscribers to export",
        variant: "destructive",
      });
      return;
    }

    const escapeCSV = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const headers = ["Email", "Status", "Source", "Subscribed At"];
    const rows = subscribers.map((s) => [
      escapeCSV(s.email),
      escapeCSV(s.status),
      escapeCSV(s.source),
      escapeCSV(s.subscribedAt),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: `Exported ${subscribers.length} subscribers`,
    });
  };

  return (
    <AdminLayout>
      {view === "list" ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Newsletter & Alerts
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage subscribers and email campaigns.
              </p>
            </div>
            <Button onClick={() => handleEditCampaign()}>
              <Plus className="mr-2 h-4 w-4" /> New Campaign
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Subscribers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.totalSubscribers.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> Active subscribers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg. Open Rate
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.avgOpenRate}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Industry avg: 21%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg. Click Rate
                </CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.avgClickRate}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Industry avg: 2.5%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Last Campaign
                </CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.lastCampaignRecipients.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Emails sent successfully
                </p>
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
                {campaigns.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="group cursor-pointer hover:border-primary/50 transition-colors relative"
                    onClick={() => handleEditCampaign(campaign)}
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCampaign(campaign.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={
                            campaign.status === "sent"
                              ? "default"
                              : campaign.status === "scheduled"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                        {campaign.sentAt && (
                          <span className="text-xs text-muted-foreground">
                            {campaign.sentAt}
                          </span>
                        )}
                        {campaign.scheduledAt && (
                          <span className="text-xs text-muted-foreground">
                            {campaign.scheduledAt}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {campaign.subject}
                      </CardTitle>
                      <CardDescription>
                        {campaign.status === "draft"
                          ? "Not scheduled yet"
                          : `Sent to ${campaign.recipients.toLocaleString()} subscribers`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {campaign.status === "sent" ? (
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Open Rate
                            </p>
                            <p className="font-semibold text-lg">
                              {campaign.openRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Click Rate
                            </p>
                            <p className="font-semibold text-lg">
                              {campaign.clickRate}%
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2 border-t flex items-center justify-center h-[60px] text-muted-foreground text-sm">
                          {campaign.status === "scheduled"
                            ? "Scheduled to send automatically"
                            : "Draft in progress"}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <Card
                  className="border-dashed flex items-center justify-center min-h-[200px] hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleEditCampaign()}
                >
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
                  <Input
                    placeholder="Search email..."
                    className="pl-9"
                    value={subscriberSearch}
                    onChange={(e) => setSubscriberSearch(e.target.value)}
                  />
                </div>
                <Dialog
                  open={isAddSubscriberOpen}
                  onOpenChange={setIsAddSubscriberOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Subscriber
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Subscriber</DialogTitle>
                      <DialogDescription>
                        Manually add a user to the newsletter list.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const email = formData.get("email") as string;
                        if (email) handleAddSubscriber(email);
                      }}
                    >
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="user@example.com"
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Subscriber</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="secondary" onClick={handleExportCSV}>
                  <Download className="mr-2 h-4 w-4" /> Export CSV
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
                    {subscribers
                      .filter((s) =>
                        s.email
                          .toLowerCase()
                          .includes(subscriberSearch.toLowerCase()),
                      )
                      .map((sub) => (
                        <TableRow key={sub.id}>
                          <TableCell className="font-medium">
                            {sub.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                sub.status === "active"
                                  ? "outline"
                                  : sub.status === "unsubscribed"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="font-normal"
                            >
                              {sub.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{sub.source}</TableCell>
                          <TableCell>{sub.subscribedAt}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteSubscriber(sub.id)}
                                >
                                  Remove
                                </DropdownMenuItem>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("list")}
                className="-ml-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Campaigns
              </Button>
              <h1 className="text-2xl font-bold tracking-tight">
                {selectedCampaign ? "Edit Campaign" : "New Campaign"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => handleSaveCampaign("draft")}
              >
                Save Draft
              </Button>
              <Button
                onClick={() =>
                  handleSaveCampaign(sendMode === "now" ? "send" : "schedule")
                }
              >
                <Send className="mr-2 h-4 w-4" />
                {sendMode === "now" ? "Send Campaign" : "Schedule Campaign"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Content</CardTitle>
                  <CardDescription>
                    Compose your newsletter content.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input
                      placeholder="Enter a catchy subject..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preheader Text</Label>
                    <Input
                      placeholder="Preview text shown in inbox..."
                      value={preheader}
                      onChange={(e) => setPreheader(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional but recommended.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Message Body</Label>
                    <RichTextEditor
                      minHeight="min-h-[400px]"
                      value={content}
                      onChange={setContent}
                      placeholder="Compose your newsletter..."
                    />
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
                    <Select
                      value={segment}
                      onValueChange={(v) =>
                        setSegment(v as "all" | "active" | "new")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select segment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          All Subscribers ({subscribers.length})
                        </SelectItem>
                        <SelectItem value="active">
                          Active Only ({getRecipientCount("active")})
                        </SelectItem>
                        <SelectItem value="new">
                          New Signups ({getRecipientCount("new")})
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Estimated Audience
                    </span>
                    <span className="font-medium">
                      {getRecipientCount(segment).toLocaleString()} users
                    </span>
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
                    <Tabs
                      value={sendMode}
                      onValueChange={(v) => setSendMode(v as "now" | "later")}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="now">Send Now</TabsTrigger>
                        <TabsTrigger value="later">Schedule</TabsTrigger>
                      </TabsList>
                      <TabsContent value="later" className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-1">
                            <Label className="text-xs">Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="secondary"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {scheduledDate
                                    ? format(scheduledDate, "PPP")
                                    : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={scheduledDate}
                                  onSelect={setScheduledDate}
                                  disabled={(date) => {
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return date < today;
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Time</Label>
                            <Input
                              type="time"
                              value={scheduledTime}
                              onChange={(e) => setScheduledTime(e.target.value)}
                              className="w-full"
                            />
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
                    <Button
                      variant="secondary"
                      onClick={() =>
                        toast({
                          title: "Info",
                          description:
                            "Test email feature requires backend integration",
                        })
                      }
                    >
                      Send
                    </Button>
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
