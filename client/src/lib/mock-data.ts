import {
  LucideIcon,
  FileText,
  BookOpen,
  Component,
  LayoutTemplate,
  CreditCard,
  Presentation,
  Paintbrush,
  Users,
  Home,
  Check,
  X,
  Clock,
  AlertCircle,
  Mail,
  Bell,
  Twitter,
  MessageSquare,
} from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  readTime: string;
  status: "published" | "draft" | "review";
  views: number;
  tags: string[];
  coverImage: string;
  content?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: "active" | "unsubscribed" | "bounced";
  subscribedAt: string;
  source: string;
}

export interface EmailCampaign {
  id: string;
  subject: string;
  preheader?: string;
  content?: string;
  status: "draft" | "scheduled" | "sent";
  sentAt?: string;
  scheduledAt?: string;
  recipients: number;
  segment?: "all" | "active" | "new";
  openRate?: number;
  clickRate?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  lastActive: string;
  avatar?: string;
}

export interface SocialMetric {
  platform: "twitter" | "discord";
  metric: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export const USERS: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@portal.dev",
    role: "admin",
    status: "active",
    lastActive: "2 mins ago",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@portal.dev",
    role: "editor",
    status: "active",
    lastActive: "1 hour ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    id: "3",
    name: "Alex Tech",
    email: "alex@portal.dev",
    role: "viewer",
    status: "inactive",
    lastActive: "3 days ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Introducing ShadcnUIKit V2",
    slug: "introducing-v2",
    excerpt:
      "We've rebuilt the entire library from the ground up. Better performance, more accessibility, and a brand new design system.",
    author: "Sarah Chen",
    publishedAt: "Jan 12, 2024",
    readTime: "5 min read",
    status: "published",
    views: 1245,
    tags: ["Release"],
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "2",
    title: "Building Accessible Forms",
    slug: "accessible-forms",
    excerpt:
      "A deep dive into creating forms that work for everyone. Learn about ARIA labels, keyboard navigation, and error handling.",
    author: "Marcus Johnson",
    publishedAt: "Jan 08, 2024",
    readTime: "8 min read",
    status: "published",
    views: 890,
    tags: ["Tutorial"],
    coverImage:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "3",
    title: "The Future of React Server Components",
    slug: "future-rsc",
    excerpt:
      "How server components are changing the way we build web applications. What you need to know for 2024.",
    author: "Sarah Chen",
    publishedAt: "Dec 28, 2023",
    readTime: "6 min read",
    status: "published",
    views: 2100,
    tags: ["Opinion"],
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
  },
];

export const SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: "1",
    email: "alice@example.com",
    status: "active",
    subscribedAt: "2024-01-15",
    source: "Blog Footer",
  },
  {
    id: "2",
    email: "bob.dev@gmail.com",
    status: "active",
    subscribedAt: "2024-01-16",
    source: "Popup",
  },
  {
    id: "3",
    email: "charlie@company.co",
    status: "unsubscribed",
    subscribedAt: "2023-12-10",
    source: "Homepage",
  },
  {
    id: "4",
    email: "david@startup.io",
    status: "active",
    subscribedAt: "2024-01-18",
    source: "Blog Footer",
  },
  {
    id: "5",
    email: "eve@design.studio",
    status: "bounced",
    subscribedAt: "2024-01-12",
    source: "Popup",
  },
];

export const CAMPAIGNS: EmailCampaign[] = [
  {
    id: "1",
    subject: "ShadcnUIKit V2 is here! 🚀",
    preheader: "Check out the new features",
    content: "<p>We're excited to announce V2!</p>",
    status: "sent",
    sentAt: "Jan 12, 2024",
    recipients: 2450,
    segment: "all",
    openRate: 42.5,
    clickRate: 12.3,
  },
  {
    id: "2",
    subject: "Weekly Digest: Accessibility Tips",
    preheader: "Make your apps accessible",
    content: "<p>This week's accessibility tips...</p>",
    status: "sent",
    sentAt: "Jan 19, 2024",
    recipients: 2580,
    segment: "all",
    openRate: 38.1,
    clickRate: 8.7,
  },
  {
    id: "3",
    subject: "New Component: Data Table",
    preheader: "Powerful data tables",
    content: "<p>Introducing our new data table component...</p>",
    status: "scheduled",
    scheduledAt: "Jan 26, 2024 at 10:00",
    recipients: 2600,
    segment: "active",
  },
  {
    id: "4",
    subject: "February Updates",
    status: "draft",
    recipients: 0,
    segment: "all",
  },
];

export const KPI_STATS = [
  { label: "Total Subscribers", value: "2,643", change: "+12%", icon: Users },
  { label: "Blog Views", value: "12.5k", change: "+24%", icon: FileText },
  { label: "Campaigns Sent", value: "48", change: "+5", icon: Mail },
  { label: "Avg Open Rate", value: "42%", change: "+2.1%", icon: BookOpen },
];

export const SOCIAL_STATS: SocialMetric[] = [
  {
    platform: "twitter",
    metric: "Followers",
    value: "12.4k",
    change: "+124",
    trend: "up",
  },
  {
    platform: "twitter",
    metric: "Engagement",
    value: "3.2%",
    change: "+0.4%",
    trend: "up",
  },
  {
    platform: "discord",
    metric: "Members",
    value: "4,521",
    change: "+45",
    trend: "up",
  },
  {
    platform: "discord",
    metric: "Active Now",
    value: "342",
    change: "-12",
    trend: "down",
  },
];

export const NAV_ITEMS = [
  {
    section: "Overview",
    items: [{ title: "Dashboard", icon: Home, href: "/" }],
  },
  {
    section: "Content",
    items: [{ title: "Blog", icon: FileText, href: "/content/blog" }],
  },
  {
    section: "Marketing",
    items: [{ title: "Newsletter", icon: Mail, href: "/marketing/newsletter" }],
  },
  {
    section: "Settings",
    items: [{ title: "User Management", icon: Users, href: "/settings/users" }],
  },
];

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  author: string;
  url: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  tags: string[];
}

export const SHOWCASES: ShowcaseItem[] = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    description:
      "A comprehensive admin dashboard for online stores built with React and Tailwind.",
    author: "Alex Johnson",
    url: "https://example.com",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    status: "approved",
    tags: ["React", "Dashboard", "Admin"],
  },
  {
    id: "2",
    title: "Portfolio Template",
    description: "Minimalist portfolio template for creative professionals.",
    author: "Sarah Smith",
    url: "https://example.com",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=800",
    status: "pending",
    tags: ["Portfolio", "Minimal"],
  },
];

export interface DocItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  content?: string;
}

export const DOCS_ITEMS: DocItem[] = [
  {
    id: "1",
    title: "Introduction",
    slug: "intro",
    category: "Getting Started",
  },
  {
    id: "2",
    title: "Installation",
    slug: "installation",
    category: "Getting Started",
  },
  { id: "3", title: "Button", slug: "button", category: "Components" },
  { id: "4", title: "Card", slug: "card", category: "Components" },
];

export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  status: "stable" | "beta" | "deprecated";
  category: "Base" | "Composite" | "Layout";
}

export const COMPONENTS: ComponentItem[] = [
  {
    id: "1",
    name: "Button",
    description: "Interactive element for user actions.",
    status: "stable",
    category: "Base",
  },
  {
    id: "2",
    name: "Input",
    description: "Text field for user input.",
    status: "stable",
    category: "Base",
  },
  {
    id: "3",
    name: "Badge",
    description: "Small label for status or count.",
    status: "stable",
    category: "Base",
  },
];

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Subscriber",
    message: "John Doe subscribed to your newsletter",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Server Update",
    message: "Server scheduled for maintenance at midnight",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "New Comment",
    message: "Alice commented on 'Intro to React'",
    time: "3 hours ago",
    read: true,
  },
];
