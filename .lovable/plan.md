
# Complete Marketing, Tracking & Lead Management System

## Overview

This plan extends the existing Facebook Pixel/Conversions API integration with a comprehensive lead management CRM, analytics dashboard, offline conversion tracking, and enhanced spam protection.

---

## What Already Exists

The project already has:
- Facebook Pixel browser-side tracking (`FacebookPixel.tsx`)
- Facebook Conversions API edge function (`fb-event`)
- Admin settings for Pixel ID, Access Token, Test Event Code
- Event deduplication using `event_id`
- `useFacebookPixel` hook with `PageView`, `ViewContent`, `InitiateCheckout`, `Purchase` events
- Existing database tables: `packages`, `bookings`, `site_settings`

---

## What Will Be Built

### Phase 1: Database Schema

**New Tables:**

1. **`leads`** - Core lead storage
   - id, name, email, phone, package_id, travel_month, budget_range
   - passport_ready, group_size, message
   - utm_source, utm_medium, utm_campaign, utm_content, fbclid
   - ip_address, device_type, user_agent
   - lead_score (auto-calculated), lead_status (New/Contacted/Converted/Lost)
   - original_event_id (for offline conversion sync)
   - created_at, updated_at

2. **`marketing_event_logs`** - API response logging
   - id, event_type, event_id, request_payload, response_payload
   - status (success/failed/pending), error_message
   - retry_count, lead_id (optional), booking_id (optional)
   - created_at

3. **`marketing_settings`** - Extended marketing configuration
   - default_currency, default_lead_value
   - pixel_enabled, capi_enabled
   - recaptcha_site_key, recaptcha_enabled

**RLS Policies:**
- Leads: Admin-only access for CRUD
- Event logs: Admin read-only, service role for insert

---

### Phase 2: Enhanced Admin Marketing Settings

Update the existing Admin Settings → Analytics tab to include:

- **Default Currency** selector (BDT)
- **Default Lead Value** input
- **Separate toggles** for Pixel and CAPI
- **reCAPTCHA Configuration** section:
  - Site Key input
  - Enable/disable toggle

---

### Phase 3: Lead Capture Form Component

Create a new `LeadCaptureForm.tsx` component with fields:
- Name (required)
- Phone (required)
- Email (optional)
- Package Interest (dropdown from packages table)
- Travel Month (date picker)
- Budget Range (select: Under 200K, 200K-350K, 350K-500K, 500K+)
- Passport Ready (Yes/No radio)
- Group Size (number input)
- Message (textarea)
- Honeypot hidden field (spam protection)

**Auto-captured data:**
- UTM parameters from URL (utm_source, utm_medium, utm_campaign, utm_content, fbclid)
- IP address (via edge function)
- Device type and user agent

**On Submit:**
1. Validate with zod schema
2. Check honeypot (reject if filled)
3. Verify reCAPTCHA (if enabled)
4. Calculate lead_score
5. Save to `leads` table
6. Send `Lead` event to both Pixel and CAPI
7. Log response in `marketing_event_logs`
8. Trigger notifications (WhatsApp, email)

---

### Phase 4: Lead Scoring System

Auto-calculate `lead_score` on form submit:

| Criteria | Points |
|----------|--------|
| Passport Ready = Yes | +30 |
| Travel within 3 months | +20 |
| Group size > 2 | +20 |
| Premium/VIP package selected | +20 |
| Budget >= 350K | +10 |

Score stored in leads table, updated if lead is edited.

---

### Phase 5: Admin Leads Management

Create `AdminLeadsManagement.tsx` component:

- **Leads Table** with columns:
  - Name, Phone, Email, Package, Travel Month
  - Lead Score (badge with color), Status (badge)
  - Source, Created Date, Actions

- **Status Management:**
  - Change status dropdown (New → Contacted → Converted → Lost)

- **"Mark as Paid" Button:**
  - Opens dialog to enter payment value
  - Sends `Purchase` event via CAPI using original `event_id`
  - Updates status to "Converted"
  - Logs in `marketing_event_logs`

- **Filters:**
  - Status filter
  - Source filter (Facebook/Google/Organic/Direct)
  - Date range

- **Export to CSV**

---

### Phase 6: Contact Event Tracking (WhatsApp)

Update `WhatsAppButton.tsx` to track `Contact` event:
- Generate unique `event_id`
- Send browser event via `fbq`
- Send server event via `fb-event` edge function

Same pattern for MobileCTABar WhatsApp button.

---

### Phase 7: Analytics Dashboard

Create `AdminMarketingAnalytics.tsx` component with:

- **Summary Cards:**
  - Total Leads (this month)
  - Paid Leads (conversions)
  - Conversion Rate
  - Total Revenue from Leads

- **Charts (using Recharts):**
  - Monthly Leads bar chart
  - Source breakdown pie chart (Facebook/Google/Organic)
  - Package-wise leads bar chart
  - Lead score distribution

- **Event Logs Table:**
  - Recent Facebook API calls
  - Status, response preview, timestamp

---

### Phase 8: Enhanced Edge Function

Update `fb-event/index.ts` to:
- Support `Contact` and `Lead` events
- Log all requests/responses to `marketing_event_logs`
- Implement retry logic (3 attempts with exponential backoff)
- Return detailed response for client-side logging

---

### Phase 9: Spam Protection

1. **Honeypot Field:**
   - Hidden field in form
   - If filled, reject submission silently

2. **reCAPTCHA v3:**
   - Load script dynamically if enabled
   - Execute on form submit
   - Verify score server-side (edge function)
   - Reject if score < 0.3

3. **Rate Limiting:**
   - Track submissions per IP in memory (edge function)
   - Limit to 5 per minute per IP

4. **Input Validation:**
   - Zod schema with strict rules
   - Phone number format validation
   - Email format validation
   - Sanitize all inputs

---

### Phase 10: Notification Automation

On Lead Submit, trigger:

1. **WhatsApp Auto-Message** (via existing notification system):
   - Customer name
   - Selected package name
   - Admin contact details

2. **Email to Customer** (if email provided):
   - Thank you message
   - Package details
   - Contact information

3. **Admin Notification Email:**
   - Lead details
   - Lead score
   - Quick action link to admin panel

---

## File Changes Summary

**New Files to Create:**
- `src/components/LeadCaptureForm.tsx`
- `src/components/admin/AdminLeadsManagement.tsx`
- `src/components/admin/AdminMarketingAnalytics.tsx`
- `supabase/functions/lead-submit/index.ts`
- `src/hooks/useLeadCapture.ts`
- `src/hooks/useUTMParams.ts`

**Files to Modify:**
- `src/components/admin/AdminSettings.tsx` - Add marketing settings section
- `src/components/admin/AdminSidebar.tsx` - Add Leads and Marketing Analytics menu items
- `src/pages/admin/AdminDashboard.tsx` - Add routes for new admin components
- `src/components/WhatsAppButton.tsx` - Add Contact event tracking
- `src/components/MobileCTABar.tsx` - Add Contact event tracking
- `src/components/ContactSection.tsx` - Integrate LeadCaptureForm
- `supabase/functions/fb-event/index.ts` - Add logging and retry logic
- `supabase/config.toml` - Register new edge function

**Database Migrations:**
- Create `leads` table with all fields
- Create `marketing_event_logs` table
- Add RLS policies for both tables

---

## Architecture Diagram

```text
+----------------+     +------------------+     +---------------+
|  Lead Form     |---->|  lead-submit     |---->|   leads       |
|  (Browser)     |     |  Edge Function   |     |   table       |
+----------------+     +------------------+     +---------------+
       |                       |                       |
       v                       v                       v
+----------------+     +------------------+     +---------------+
|  Pixel Event   |---->|  fb-event        |---->|  event_logs   |
|  (fbq)         |     |  Edge Function   |     |  table        |
+----------------+     +------------------+     +---------------+
                               |
                               v
                       +------------------+
                       |  Facebook API    |
                       |  Conversions API |
                       +------------------+
```

---

## Technical Details

### Lead Score Calculation

```javascript
function calculateLeadScore(lead) {
  let score = 0;
  
  if (lead.passport_ready) score += 30;
  
  // Travel within 3 months
  if (lead.travel_month) {
    const monthsDiff = differenceInMonths(new Date(lead.travel_month), new Date());
    if (monthsDiff <= 3) score += 20;
  }
  
  if (lead.group_size > 2) score += 20;
  
  // Premium package check
  if (lead.package_id) {
    const pkg = packages.find(p => p.id === lead.package_id);
    if (pkg?.title?.toLowerCase().includes('premium') || 
        pkg?.title?.toLowerCase().includes('vip')) {
      score += 20;
    }
  }
  
  // High budget
  if (lead.budget_range === '350K-500K' || lead.budget_range === '500K+') {
    score += 10;
  }
  
  return score;
}
```

### Offline Conversion Sync

```javascript
async function markLeadAsPaid(leadId, paymentValue) {
  const lead = await fetchLead(leadId);
  
  // Send Purchase event with original event_id
  await supabase.functions.invoke('fb-event', {
    body: {
      event_name: 'Purchase',
      event_id: lead.original_event_id,
      event_source_url: window.location.origin,
      user_data: {
        email: lead.email,
        phone: lead.phone,
      },
      custom_data: {
        value: paymentValue,
        currency: 'BDT',
        content_name: lead.package_name,
      }
    }
  });
  
  // Update lead status
  await supabase
    .from('leads')
    .update({ lead_status: 'Converted' })
    .eq('id', leadId);
}
```

---

## Security Measures

1. **Data Protection:**
   - Access Token stored in database, never exposed to client
   - User data hashed (SHA-256) before sending to Facebook
   - Admin routes protected by authentication

2. **Spam Prevention:**
   - reCAPTCHA v3 verification
   - Honeypot hidden field
   - Rate limiting (5/minute/IP)
   - Input validation with zod

3. **API Security:**
   - Edge functions with CORS headers
   - Service role key for database operations
   - Request validation before processing

---

## Future Extensibility

The architecture supports adding:
- **Google Analytics 4** - Similar hook pattern
- **TikTok Pixel** - Add to pixel component
- **CRM Integration** - Webhook on lead creation
- **SMS API** - Edge function for SMS notifications
