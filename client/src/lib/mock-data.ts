import { LucideIcon, FileText, BookOpen, Component, LayoutTemplate, CreditCard, Presentation, Paintbrush, Users, Home, Check, X, Clock, AlertCircle, Mail, Bell } from "lucide-react";

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

export interface DocItem {
  id: string;
  title: string;
  slug: string;
  category: "Getting Started" | "Examples" | "API Reference";
  content?: string;
  status: "published" | "draft";
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
  status: "draft" | "scheduled" | "sent";
  sentAt?: string;
  recipients: number;
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

export const USERS: User[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@portal.dev", role: "admin", status: "active", lastActive: "2 mins ago", avatar: "https://github.com/shadcn.png" },
  { id: "2", name: "Marcus Johnson", email: "marcus@portal.dev", role: "editor", status: "active", lastActive: "1 hour ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
  { id: "3", name: "Alex Tech", email: "alex@portal.dev", role: "viewer", status: "inactive", lastActive: "3 days ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
];

export const BLOG_POSTS: BlogPost[] = [
  { 
    id: "1", 
    title: "Introducing ShadcnUIKit V2", 
    slug: "introducing-v2", 
    excerpt: "We've rebuilt the entire library from the ground up. Better performance, more accessibility, and a brand new design system.",
    author: "Sarah Chen", 
    publishedAt: "Jan 12, 2024", 
    readTime: "5 min read",
    status: "published", 
    views: 1245,
    tags: ["Release"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  },
  { 
    id: "2", 
    title: "Building Accessible Forms", 
    slug: "accessible-forms", 
    excerpt: "A deep dive into creating forms that work for everyone. Learn about ARIA labels, keyboard navigation, and error handling.",
    author: "Marcus Johnson", 
    publishedAt: "Jan 08, 2024", 
    readTime: "8 min read",
    status: "published", 
    views: 890,
    tags: ["Tutorial"],
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000",
  },
  { 
    id: "3", 
    title: "The Future of React Server Components", 
    slug: "future-rsc", 
    excerpt: "How server components are changing the way we build web applications. What you need to know for 2024.",
    author: "Sarah Chen", 
    publishedAt: "Dec 28, 2023", 
    readTime: "6 min read",
    status: "published", 
    views: 2100,
    tags: ["Opinion"],
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
  },
];

export const DOCS_ITEMS: DocItem[] = [
  { id: "1", title: "Introduction", slug: "introduction", category: "Getting Started", status: "published" },
  { id: "2", title: "Installation", slug: "installation", category: "Getting Started", status: "published" },
  { id: "3", title: "Theming", slug: "theming", category: "Getting Started", status: "published" },
  { id: "4", title: "Components", slug: "components", category: "Examples", status: "published" },
  { id: "5", title: "Hooks", slug: "hooks", category: "Examples", status: "draft" },
];

export const SUBSCRIBERS: NewsletterSubscriber[] = [
  { id: "1", email: "alice@example.com", status: "active", subscribedAt: "2024-01-15", source: "Blog Footer" },
  { id: "2", email: "bob.dev@gmail.com", status: "active", subscribedAt: "2024-01-16", source: "Popup" },
  { id: "3", email: "charlie@company.co", status: "unsubscribed", subscribedAt: "2023-12-10", source: "Homepage" },
  { id: "4", email: "david@startup.io", status: "active", subscribedAt: "2024-01-18", source: "Blog Footer" },
  { id: "5", email: "eve@design.studio", status: "bounced", subscribedAt: "2024-01-12", source: "Popup" },
];

export const CAMPAIGNS: EmailCampaign[] = [
  { id: "1", subject: "ShadcnUIKit V2 is here! 🚀", status: "sent", sentAt: "Jan 12, 2024", recipients: 2450, openRate: 42.5, clickRate: 12.3 },
  { id: "2", subject: "Weekly Digest: Accessibility Tips", status: "sent", sentAt: "Jan 19, 2024", recipients: 2580, openRate: 38.1, clickRate: 8.7 },
  { id: "3", subject: "New Component: Data Table", status: "scheduled", sentAt: "Jan 26, 2024", recipients: 2600 },
  { id: "4", subject: "February Updates", status: "draft", recipients: 0 },
];

export const KPI_STATS = [
  { label: "Total Subscribers", value: "2,643", change: "+12%", icon: Users },
  { label: "Blog Views", value: "12.5k", change: "+24%", icon: FileText },
  { label: "Campaigns Sent", value: "48", change: "+5", icon: Mail },
  { label: "Avg Open Rate", value: "42%", change: "+2.1%", icon: BookOpen },
];

export const NAV_ITEMS = [
  {
    section: "Overview",
    items: [
      { title: "Dashboard", icon: Home, href: "/" },
    ]
  },
  {
    section: "Content",
    items: [
      { title: "Blog", icon: FileText, href: "/content/blog" },
      { title: "Documentation", icon: BookOpen, href: "/content/docs" },
    ]
  },
  {
    section: "Marketing",
    items: [
      { title: "Newsletter", icon: Mail, href: "/marketing/newsletter" },
    ]
  },
  {
    section: "Settings",
    items: [
      { title: "User Management", icon: Users, href: "/settings/users" },
    ]
  },
];
