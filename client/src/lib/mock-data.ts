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

export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  category: "Base" | "Composite" | "Layout";
  status: "stable" | "beta" | "deprecated";
  previewImage?: string;
  codeSnippet?: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  author: string;
  url: string;
  image: string;
  status: "approved" | "pending" | "rejected";
  tags: string[];
  submittedAt: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  popular?: boolean;
  cta: string;
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

export const COMPONENTS: ComponentItem[] = [
  { id: "1", name: "Card", description: "Container for grouping related content.", category: "Base", status: "stable" },
  { id: "2", name: "Button", description: "Triggers an event or action.", category: "Base", status: "stable" },
  { id: "3", name: "Input", description: "Form controls for user input.", category: "Base", status: "stable" },
  { id: "4", name: "Badge", description: "Displays a status or value.", category: "Base", status: "stable" },
  { id: "5", name: "Avatar", description: "Image element for user profiles.", category: "Base", status: "stable" },
  { id: "6", name: "Interactive", description: "Components with state.", category: "Composite", status: "beta" },
];

export const SHOWCASES: ShowcaseItem[] = [
  { 
    id: "1", 
    title: "TaskMaster Pro", 
    description: "A collaborative project management tool for remote teams.", 
    author: "Alice Freeman", 
    url: "https://taskmaster.app",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=500",
    status: "approved",
    tags: ["Productivity", "SaaS", "Dashboard"],
    submittedAt: "2024-01-15"
  },
  { 
    id: "2", 
    title: "FinDash Analytics", 
    description: "Real-time financial dashboard with complex data visualization.", 
    author: "Bob Smith", 
    url: "https://findash.io",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500",
    status: "approved",
    tags: ["Finance", "Data Viz", "Enterprise"],
    submittedAt: "2024-01-14"
  },
  { 
    id: "3", 
    title: "Creative Portfolio", 
    description: "Minimalist portfolio template for digital artists.", 
    author: "John Doe", 
    url: "https://portfolio.design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=500",
    status: "pending",
    tags: ["Portfolio", "Creative", "Minimal"],
    submittedAt: "2024-01-18"
  },
];

export const PLANS: Plan[] = [
  {
    id: "hobby",
    name: "Hobby",
    description: "Perfect for personal projects.",
    priceMonthly: 0,
    priceYearly: 0,
    features: ["Access to all core components", "Community support", "Basic theming"],
    cta: "Get Started"
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professional developers.",
    priceMonthly: 15,
    priceYearly: 144, // $12/mo equivalent
    features: ["Everything in Hobby", "Advanced charts & maps", "Multiple themes", "Priority email support", "Removing attribution"],
    cta: "Subscribe Now",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large teams and organizations.",
    priceMonthly: 49,
    priceYearly: 470,
    features: ["Everything in Pro", "Unlimited projects", "Dedicated support channel", "Custom component requests", "SLA & Contracts"],
    cta: "Contact Sales"
  }
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
  { label: "Total Components", value: "142", change: "+12%", icon: Component },
  { label: "CLI Installs", value: "8,943", change: "+24%", icon: LayoutTemplate },
  { label: "Revenue (MRR)", value: "$45,231", change: "+20.1%", icon: CreditCard },
  { label: "Active Users", value: "2,350", change: "+180.1%", icon: Users },
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
    section: "Engineering",
    items: [
      { title: "Components", icon: Component, href: "/engineering/components" },
      { title: "Registry", icon: LayoutTemplate, href: "/engineering/registry" },
    ]
  },
  {
    section: "Business",
    items: [
      { title: "Pricing", icon: CreditCard, href: "/business/pricing" },
      { title: "Showcases", icon: Presentation, href: "/business/showcases" },
    ]
  },
  {
    section: "Settings",
    items: [
      { title: "Theme & Tokens", icon: Paintbrush, href: "/settings/theme" },
      { title: "Users & Roles", icon: Users, href: "/settings/users" },
    ]
  },
];
