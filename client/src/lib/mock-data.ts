import { LucideIcon, FileText, BookOpen, Component, LayoutTemplate, CreditCard, Presentation, Paintbrush, Users, Home } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
  status: "published" | "draft" | "review";
  views: number;
}

export interface DocItem {
  id: string;
  title: string;
  category: "Getting Started" | "Components" | "API Reference";
  parentId?: string;
  children?: DocItem[];
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  metric: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  { id: "1", title: "Introducing the New Portal", slug: "introducing-portal", author: "Sarah Connor", publishedAt: "2024-10-15", status: "published", views: 1245 },
  { id: "2", title: "v2.0 Release Notes", slug: "v2-release-notes", author: "John Smith", publishedAt: "2024-10-20", status: "published", views: 890 },
  { id: "3", title: "Deep Dive into RSC", slug: "deep-dive-rsc", author: "Sarah Connor", publishedAt: "2024-10-25", status: "review", views: 0 },
  { id: "4", title: "Optimizing for Speed", slug: "optimizing-speed", author: "Mike Ross", publishedAt: "-", status: "draft", views: 0 },
];

export const DOCS_TREE: DocItem[] = [
  {
    id: "1", title: "Getting Started", category: "Getting Started", children: [
      { id: "1-1", title: "Introduction", category: "Getting Started" },
      { id: "1-2", title: "Installation", category: "Getting Started" },
      { id: "1-3", title: "CLI Usage", category: "Getting Started" },
    ]
  },
  {
    id: "2", title: "Components", category: "Components", children: [
      { id: "2-1", title: "Button", category: "Components" },
      { id: "2-2", title: "Card", category: "Components" },
      { id: "2-3", title: "Dialog", category: "Components" },
    ]
  },
];

export const PLANS: Plan[] = [
  {
    id: "hobby",
    name: "Hobby",
    priceMonthly: 0,
    priceYearly: 0,
    metric: "Free forever",
    features: ["Up to 3 projects", "Community Support", "1GB Storage"],
    cta: "Start Free"
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 29,
    priceYearly: 290,
    metric: "per user/month",
    features: ["Unlimited projects", "Priority Support", "100GB Storage", "Analytics"],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 99,
    priceYearly: 990,
    metric: "per seat/month",
    features: ["SSO & SAML", "Dedicated Success Manager", "Unlimited Storage", "Audit Logs", "SLA 99.9%"],
    cta: "Contact Sales"
  }
];

export const KPI_STATS = [
  { label: "Total Components", value: "142", change: "+12%", icon: Component },
  { label: "CLI Installs", value: "8,943", change: "+24%", icon: LayoutTemplate },
  { label: "Revenue (MRR)", value: "$42.5k", change: "+8%", icon: CreditCard },
  { label: "Active Users", value: "1,204", change: "+5%", icon: Users },
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
