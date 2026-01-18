# Newsletter UI Fixes Implementation Plan

```yaml
status: completed
priority: high
created: 2026-01-18
completed: 2026-01-18
estimated_effort: medium
files_affected:
  - client/src/pages/marketing/newsletter.tsx
  - client/src/lib/mock-data.ts
```

## Overview

Fix non-functional UI elements in the Newsletter page to ensure all controls work correctly with local state management.

## Problem Statement

The Newsletter page has several UI components that appear functional but don't actually work:
1. RichTextEditor uses `defaultValue` instead of controlled state - content not saved
2. Preheader field exists but not persisted to campaign model
3. Date/time pickers are placeholder buttons with no functionality
4. Segment dropdown doesn't filter recipients
5. Export CSV button has no handler
6. Analytics cards show hardcoded values instead of calculated data

## Solution Approach

Wire all UI controls to proper state management while keeping data in local state (no backend required per user requirements).

---

## Phase 1: Data Model Updates

**File:** `client/src/lib/mock-data.ts`

### Task 1.1: Extend EmailCampaign Interface

Add missing fields to support full functionality:

```typescript
export interface EmailCampaign {
  id: string;
  subject: string;
  preheader?: string;           // NEW: Preview text
  content?: string;             // NEW: Email body HTML
  status: "draft" | "scheduled" | "sent";
  sentAt?: string;
  scheduledAt?: string;         // NEW: For scheduling
  recipients: number;
  segment?: "all" | "active" | "new";  // NEW: Target segment
  openRate?: number;
  clickRate?: number;
}
```

### Task 1.2: Update Mock Data

Update CAMPAIGNS array with new fields for consistency.

---

## Phase 2: RichTextEditor Content State

**File:** `client/src/pages/marketing/newsletter.tsx`

### Task 2.1: Add Content State

```typescript
const [content, setContent] = useState("");
```

### Task 2.2: Load Content on Edit

In `handleEditCampaign`:
```typescript
setContent(campaign?.content || "");
```

### Task 2.3: Wire RichTextEditor

Replace:
```tsx
<RichTextEditor minHeight="min-h-[400px]" defaultValue="..." />
```

With:
```tsx
<RichTextEditor
  minHeight="min-h-[400px]"
  value={content}
  onChange={setContent}
  placeholder="Compose your newsletter..."
/>
```

### Task 2.4: Save Content

In `handleSaveCampaign`, include content in saved campaign:
```typescript
const newCampaign: EmailCampaign = {
  ...existing,
  content,
  preheader,
};
```

---

## Phase 3: Preheader Persistence

**File:** `client/src/pages/marketing/newsletter.tsx`

### Task 3.1: Load Preheader on Edit

In `handleEditCampaign`:
```typescript
setPreheader(campaign?.preheader || "");
```

### Task 3.2: Save Preheader

Already wired via state, just ensure it's included in save.

---

## Phase 4: Segment Selection

**File:** `client/src/pages/marketing/newsletter.tsx`

### Task 4.1: Add Segment State

```typescript
const [segment, setSegment] = useState<"all" | "active" | "new">("all");
```

### Task 4.2: Calculate Filtered Recipients

```typescript
const getRecipientCount = (seg: string): number => {
  switch (seg) {
    case "active":
      return subscribers.filter(s => s.status === "active").length;
    case "new":
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return subscribers.filter(s =>
        new Date(s.subscribedAt) >= thirtyDaysAgo && s.status === "active"
      ).length;
    default:
      return subscribers.length;
  }
};
```

### Task 4.3: Wire Select Component

```tsx
<Select value={segment} onValueChange={(v) => setSegment(v as "all" | "active" | "new")}>
  <SelectTrigger>
    <SelectValue placeholder="Select segment" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Subscribers ({subscribers.length})</SelectItem>
    <SelectItem value="active">Active Only ({getRecipientCount("active")})</SelectItem>
    <SelectItem value="new">New Signups ({getRecipientCount("new")})</SelectItem>
  </SelectContent>
</Select>
```

### Task 4.4: Update Estimated Audience Display

```tsx
<span className="font-medium">{getRecipientCount(segment).toLocaleString()} users</span>
```

### Task 4.5: Save Segment with Campaign

Include in `handleSaveCampaign`:
```typescript
segment,
recipients: getRecipientCount(segment),
```

---

## Phase 5: Scheduling Functionality

**File:** `client/src/pages/marketing/newsletter.tsx`

### Task 5.1: Add Scheduling State

```typescript
const [sendMode, setSendMode] = useState<"now" | "later">("now");
const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
const [scheduledTime, setScheduledTime] = useState("10:00");
```

### Task 5.2: Add Calendar Popover for Date

Import Calendar and Popover:
```typescript
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
```

Replace date button:
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-full justify-start text-left font-normal">
      <Calendar className="mr-2 h-4 w-4" />
      {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={scheduledDate}
      onSelect={setScheduledDate}
      disabled={(date) => date < new Date()}
      initialFocus
    />
  </PopoverContent>
</Popover>
```

### Task 5.3: Add Time Selector

Replace time button with time input or select:
```tsx
<Input
  type="time"
  value={scheduledTime}
  onChange={(e) => setScheduledTime(e.target.value)}
  className="w-full"
/>
```

### Task 5.4: Wire Send Mode Tabs

```tsx
<Tabs value={sendMode} onValueChange={(v) => setSendMode(v as "now" | "later")} className="w-full">
```

### Task 5.5: Update Save Logic

Modify `handleSaveCampaign` to handle scheduling:
```typescript
const handleSaveCampaign = (action: "draft" | "send" | "schedule") => {
  // Validate scheduling
  if (action === "schedule" && !scheduledDate) {
    toast({ title: "Error", description: "Please select a date", variant: "destructive" });
    return;
  }

  const newStatus = action === "draft" ? "draft" : action === "schedule" ? "scheduled" : "sent";

  const newCampaign: EmailCampaign = {
    ...fields,
    status: newStatus,
    scheduledAt: action === "schedule"
      ? `${format(scheduledDate!, "MMM d, yyyy")} at ${scheduledTime}`
      : undefined,
    sentAt: action === "send" ? new Date().toLocaleDateString(...) : undefined,
  };
};
```

### Task 5.6: Update Send Button

Change "Send Campaign" to context-aware:
```tsx
<Button onClick={() => handleSaveCampaign(sendMode === "now" ? "send" : "schedule")}>
  <Send className="mr-2 h-4 w-4" />
  {sendMode === "now" ? "Send Campaign" : "Schedule Campaign"}
</Button>
```

---

## Phase 6: CSV Export

**File:** `client/src/pages/marketing/newsletter.tsx`

### Task 6.1: Add Export Handler

```typescript
const handleExportCSV = () => {
  const headers = ["Email", "Status", "Source", "Subscribed At"];
  const rows = subscribers.map(s => [s.email, s.status, s.source, s.subscribedAt]);

  const csvContent = [
    headers.join(","),
    ...rows.map(r => r.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);

  toast({ title: "Success", description: `Exported ${subscribers.length} subscribers` });
};
```

### Task 6.2: Wire Button

```tsx
<Button variant="outline" onClick={handleExportCSV}>
  Export CSV
</Button>
```

---

## Phase 7: Dynamic Analytics

**File:** `client/src/pages/marketing/newsletter.tsx`

### Task 7.1: Calculate Analytics from Data

```typescript
const analytics = useMemo(() => {
  const sentCampaigns = campaigns.filter(c => c.status === "sent");
  const avgOpenRate = sentCampaigns.length
    ? sentCampaigns.reduce((acc, c) => acc + (c.openRate || 0), 0) / sentCampaigns.length
    : 0;
  const avgClickRate = sentCampaigns.length
    ? sentCampaigns.reduce((acc, c) => acc + (c.clickRate || 0), 0) / sentCampaigns.length
    : 0;
  const lastCampaign = sentCampaigns.sort((a, b) =>
    new Date(b.sentAt || 0).getTime() - new Date(a.sentAt || 0).getTime()
  )[0];

  return {
    totalSubscribers: subscribers.length,
    avgOpenRate: avgOpenRate.toFixed(1),
    avgClickRate: avgClickRate.toFixed(1),
    lastCampaignRecipients: lastCampaign?.recipients || 0,
  };
}, [campaigns, subscribers]);
```

### Task 7.2: Update Analytics Cards

Replace hardcoded values:
```tsx
{/* Total Subscribers */}
<div className="text-2xl font-bold">{analytics.totalSubscribers.toLocaleString()}</div>

{/* Avg Open Rate */}
<div className="text-2xl font-bold">{analytics.avgOpenRate}%</div>

{/* Avg Click Rate */}
<div className="text-2xl font-bold">{analytics.avgClickRate}%</div>

{/* Last Campaign */}
<div className="text-2xl font-bold">{analytics.lastCampaignRecipients.toLocaleString()}</div>
```

---

## Implementation Order

| Phase | Priority | Effort | Dependencies |
|-------|----------|--------|--------------|
| Phase 1: Data Model | P0 | Low | None |
| Phase 2: RichTextEditor | P0 | Low | Phase 1 |
| Phase 3: Preheader | P0 | Low | Phase 1 |
| Phase 4: Segmentation | P1 | Medium | Phase 1 |
| Phase 5: Scheduling | P1 | Medium | Phase 1 |
| Phase 6: CSV Export | P2 | Low | None |
| Phase 7: Analytics | P2 | Low | None |

---

## Testing Checklist

- [ ] Create new campaign with content, verify content persists when editing
- [ ] Edit existing campaign, verify all fields load correctly
- [ ] Change segment, verify recipient count updates
- [ ] Schedule campaign with date/time, verify status shows "scheduled"
- [ ] Send campaign immediately, verify status shows "sent"
- [ ] Export CSV, verify file downloads with correct data
- [ ] Add/remove subscribers, verify analytics cards update
- [ ] Delete campaign, verify it's removed from list

---

## Files Changed Summary

| File | Changes |
|------|---------|
| `client/src/lib/mock-data.ts` | Add preheader, content, scheduledAt, segment to EmailCampaign |
| `client/src/pages/marketing/newsletter.tsx` | Wire all controls, add handlers, calculate analytics |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| RichTextEditor re-render issues | Use proper controlled component pattern |
| Date picker timezone issues | Use date-fns for consistent formatting |
| CSV special characters | Escape commas and quotes in CSV output |
