import { SiteShell } from "@/components/site/SiteShell";
import { FinalCTA } from "@/components/site/FinalCTA";
import {
  Receipt, Users, Mail, FolderOpen, LayoutGrid,
  Settings, CheckSquare, User, Globe, FileText,
  Search, Plus, ChevronRight
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const metadata = {
  title: "Help Center — Proactive",
  description: "Browse our knowledge base for articles and tutorials on using Proactive.",
};

const categories = [
  { icon: Receipt, name: "Billing", desc: "Invoicing, Receipts, Quotations, and Expense Settings.", count: 19 },
  { icon: Users, name: "Clients", desc: "Client, Import Clients, Client Group, Client Service, Ledger and Password.", count: 7 },
  { icon: Mail, name: "Communication", desc: "SMS, Email, WhatsApp, and User Notifications.", count: 9 },
  { icon: FolderOpen, name: "Data and Documents", desc: "Files, Documents, DSC, Document In-Out, Document Request and Document Collect from Client.", count: 4 },
  { icon: LayoutGrid, name: "Services", desc: "Service Settings, Import Services, Checklists, and Custom Fields.", count: 6 },
  { icon: Settings, name: "Settings", desc: "Practice Software Settings.", count: 7 },
  { icon: CheckSquare, name: "Tasks", desc: "Task Management, To-Dos, Time Logs, Task Documents, Task History, and Task Notes.", count: 12 },
  { icon: User, name: "Users", desc: "User Management, User Roles, Permission Settings.", count: 4 },
  { icon: Globe, name: "Website", desc: "Website and Client Portal Settings.", count: 1 },
];

const popularArticles = [
  "How to Add a WhatsApp Template in P...",
  "Checklist",
  "Create New Client",
  "Subtask",
  "Add Expenses to Invoice"
];

const recentArticles = [
  "Renewals Management",
  "Retainer – Complete Guide",
  "Automated Invoice for Clients",
  "Consolidated Billing or Billing Profile (Bi...",
  "How to Add a WhatsApp Template in P..."
];

export default function HelpPage() {
  return (
    <SiteShell>
      {/* HERO BANNER */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-16">
          <div className="mx-auto max-w-3xl">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search articles"
                className="w-full rounded-md border-0 bg-background py-4 pl-12 pr-4 text-foreground shadow-sm focus:ring-2 focus:ring-accent-blue sm:text-lg"
              />
              <button className="absolute inset-y-2 right-2 flex items-center gap-2 rounded bg-surface px-4 text-sm font-medium text-foreground shadow-sm hover:bg-surface-strong">
                <Plus className="h-4 w-4" /> Add Ticket
              </button>
            </div>
            <nav className="flex text-sm text-primary-foreground/80">
              <ol className="flex items-center gap-2">
                <li><a href="/help" className="hover:text-white">Knowledge Base</a></li>
                <ChevronRight className="h-4 w-4" />
                <li className="font-medium text-white">Proactive</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="container-page py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* CATEGORIES */}
          <div className="rounded-xl border border-border bg-surface">
            <div className="divide-y divide-border">
              {categories.map((c) => (
                <a key={c.name} href="#" className="flex items-start gap-6 p-6 transition hover:bg-surface-strong">
                  <div className="mt-1 flex shrink-0 text-foreground">
                    <c.icon className="h-8 w-8 stroke-[1.5]" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-foreground">{c.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                    <p className="mt-3 text-xs text-muted-foreground/80">{c.count} Articles</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-10">
            {/* Branding Block */}
            <div className="space-y-4">
              <Logo className="text-xl" />
              <p className="text-sm text-muted-foreground">Proactive help center</p>
              <button className="rounded border border-border bg-surface px-4 py-1.5 text-sm font-medium text-foreground hover:bg-surface-strong">
                Follow
              </button>
              <p className="text-xs text-muted-foreground">Subscribe to receive notifications from this section.</p>
            </div>

            {/* Popular Articles */}
            <div>
              <h3 className="font-display text-base font-semibold text-foreground mb-4">Popular Articles</h3>
              <ul className="space-y-3">
                {popularArticles.map((article, i) => (
                  <li key={i}>
                    <a href="#" className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-primary">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 group-hover:text-primary" />
                      <span className="leading-tight">{article}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Articles */}
            <div>
              <h3 className="font-display text-base font-semibold text-foreground mb-4">Recent Articles</h3>
              <ul className="space-y-3">
                {recentArticles.map((article, i) => (
                  <li key={i}>
                    <a href="#" className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-primary">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 group-hover:text-primary" />
                      <span className="leading-tight">{article}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FinalCTA />
    </SiteShell>
  );
}
