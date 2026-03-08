# SM Elite Hajj Travel Agency — Complete Developer Documentation

> **Version**: 1.0.0 | **Last Updated**: 2026-03-08 | **Platform**: Lovable Cloud (React + Vite + Supabase)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Architecture](#4-architecture)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [Database Schema](#6-database-schema)
7. [Frontend Pages & Routing](#7-frontend-pages--routing)
8. [Admin Dashboard](#8-admin-dashboard)
9. [Booking System](#9-booking-system)
10. [Payment Integration](#10-payment-integration)
11. [Accounting System](#11-accounting-system)
12. [Visa Services](#12-visa-services)
13. [Hotel Management](#13-hotel-management)
14. [Air Ticket System](#14-air-ticket-system)
15. [CRM & Lead Management](#15-crm--lead-management)
16. [Marketing & Analytics](#16-marketing--analytics)
17. [Notification System](#17-notification-system)
18. [Content Management](#18-content-management)
19. [Website Design System](#19-website-design-system)
20. [Edge Functions (Backend)](#20-edge-functions-backend)
21. [Security](#21-security)
22. [Deployment & Configuration](#22-deployment--configuration)
23. [API Reference](#23-api-reference)

---

## 1. Project Overview

**SM Elite Hajj Travel Agency** is a full-stack travel management platform for Hajj/Umrah travel services. It provides:

- Public-facing website with packages, hotels, visa services, air tickets
- Customer booking & tracking portal
- Full admin dashboard with 50+ management modules
- Double-entry accounting system
- CRM with lead scoring and follow-up automation
- Multi-channel notification system (WhatsApp, SMS, Email)
- Payment gateway integration (SSLCommerz, bKash, Nagad)
- EMI/Installment payment support
- Agent & referral management
- Comprehensive reporting & analytics

**Target Users**:
- **Customers**: Book Hajj/Umrah packages, track orders, manage visas
- **Admin**: Full control over all business operations
- **Staff**: Operational access with role-based restrictions
- **Viewers**: Read-only demo access to admin panel
- **Agents**: Referral tracking and commission management

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | ^18.3.1 | UI framework |
| TypeScript | — | Type safety |
| Vite | — | Build tool & dev server |
| Tailwind CSS | — | Utility-first styling |
| shadcn/ui | — | Component library (Radix UI based) |
| Framer Motion | ^12.26.2 | Animations |
| React Router DOM | ^6.30.1 | Client-side routing |
| TanStack React Query | ^5.83.0 | Server state management |
| Recharts | ^2.15.4 | Charts & data visualization |
| React Hook Form + Zod | — | Form handling & validation |

### Backend (Lovable Cloud / Supabase)
| Technology | Purpose |
|---|---|
| Supabase Auth | Authentication (email/password) |
| Supabase Database | PostgreSQL with RLS |
| Supabase Edge Functions | Serverless backend (Deno) |
| Supabase Storage | File uploads (documents, images) |
| Supabase Realtime | Live data subscriptions |

### Key Libraries
| Library | Purpose |
|---|---|
| jsPDF + jspdf-autotable | PDF generation & export |
| xlsx | Excel export |
| date-fns | Date formatting |
| lucide-react | Icon system |
| @dnd-kit | Drag-and-drop reordering |
| embla-carousel | Carousel/slider |
| next-themes | Dark/light mode |
| react-ga4 | Google Analytics |
| sonner | Toast notifications |

---

## 3. Project Structure

```
src/
├── assets/                    # Static images (imported as ES modules)
├── components/
│   ├── admin/                 # Admin dashboard components (50+ modules)
│   │   └── accounting/        # Accounting sub-modules (7 components)
│   ├── icons/                 # Custom SVG icon components
│   └── ui/                    # shadcn/ui components (50+ components)
├── contexts/
│   └── ViewerModeContext.tsx   # Read-only mode for demo accounts
├── hooks/
│   ├── useAuth.tsx            # Authentication context & provider
│   ├── useSiteSettings.tsx    # Global site settings provider
│   ├── useTranslation.tsx     # i18n translation hook
│   ├── useAnalytics.ts        # Google Analytics tracking
│   ├── useFacebookPixel.ts    # Facebook Pixel events
│   ├── useImageUpload.ts      # Image upload to Supabase Storage
│   ├── useInstallmentCalculator.ts # EMI calculation logic
│   ├── useLeadCapture.ts      # Lead form submission
│   ├── usePaymentProcessing.ts # Payment gateway integration
│   ├── useReferralTracking.ts  # Referral & agent tracking
│   └── useUTMParams.ts        # UTM parameter capture
├── integrations/
│   └── supabase/
│       ├── client.ts          # Auto-generated Supabase client (DO NOT EDIT)
│       └── types.ts           # Auto-generated DB types (DO NOT EDIT)
├── lib/
│   ├── countries.ts           # Country list data
│   ├── currency.ts            # BDT currency formatting (৳)
│   ├── imageCompression.ts    # Client-side image compression
│   ├── leadScoring.ts         # Lead scoring algorithm
│   ├── tenant.ts              # Multi-tenant support
│   └── utils.ts               # Tailwind merge utility (cn())
├── pages/
│   ├── admin/
│   │   └── AdminDashboard.tsx # Main admin SPA with tab routing
│   ├── Index.tsx              # Homepage (all sections)
│   ├── Auth.tsx               # Login/signup page
│   ├── MyBookings.tsx         # Customer booking list
│   ├── Hotels.tsx             # Hotel browsing page
│   ├── TrackOrder.tsx         # Order tracking by booking ID
│   ├── TrackVisa.tsx          # Visa status tracking
│   └── ...                    # Other pages
├── utils/
│   ├── auditLogger.ts        # Audit log recording
│   ├── generateBookingPDF.ts  # Booking confirmation PDF
│   └── guestBookingStorage.ts # Guest booking localStorage
├── index.css                  # Global styles & CSS variables
└── main.tsx                   # App entry point

supabase/
├── config.toml                # Supabase project config (DO NOT EDIT)
└── functions/                 # Edge Functions (auto-deployed)
    ├── backup-restore/
    ├── create-admin-user/
    ├── create-demo-user/
    ├── create-guest-account/
    ├── create-staff-user/
    ├── emi-reminder/
    ├── fb-event/
    ├── payment-bkash/
    ├── payment-installment/
    ├── payment-nagad/
    ├── payment-sslcommerz/
    ├── send-air-ticket-notification/
    ├── send-booking-notification/
    ├── send-emi-notification/
    ├── send-tracking-notification/
    ├── send-visa-notification/
    ├── send-welcome-notification/
    ├── send-whatsapp-test/
    └── update-user-password/

public/
├── fonts/MoolBoran.ttf        # Custom Khmer font
├── images/                    # Static public images
├── videos/footer-bg.mp4       # Footer background video
└── robots.txt                 # SEO robots file
```

---

## 4. Architecture

### Application Architecture
```
┌─────────────────────────────────────────────────┐
│                  React SPA (Vite)                │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Public   │  │ Customer │  │ Admin Dashboard│  │
│  │  Website  │  │  Portal  │  │  (50+ modules) │  │
│  └────┬─────┘  └────┬─────┘  └──────┬────────┘  │
│       │              │               │            │
│  ┌────┴──────────────┴───────────────┴──────┐    │
│  │         Supabase Client SDK              │    │
│  │    (Auth, Database, Storage, Realtime)    │    │
│  └─────────────────┬────────────────────────┘    │
└────────────────────┼─────────────────────────────┘
                     │
     ┌───────────────┼───────────────────┐
     │        Supabase Backend           │
     │  ┌──────────┐  ┌───────────────┐  │
     │  │PostgreSQL│  │Edge Functions  │  │
     │  │  + RLS   │  │  (Deno)       │  │
     │  └──────────┘  └───────────────┘  │
     │  ┌──────────┐  ┌───────────────┐  │
     │  │  Auth    │  │   Storage     │  │
     │  └──────────┘  └───────────────┘  │
     └───────────────────────────────────┘
```

### State Management
- **Server State**: TanStack React Query (caching, background refetch)
- **Auth State**: React Context (`AuthProvider`)
- **Site Settings**: React Context (`SiteSettingsProvider`)
- **Local State**: React `useState` / `useReducer`
- **Guest Data**: `localStorage` for guest bookings

### Data Flow
1. Components call Supabase SDK via hooks
2. RLS policies enforce access control at database level
3. Edge Functions handle sensitive operations (admin user creation, payments)
4. React Query caches results with 5-minute stale time

---

## 5. Authentication & Authorization

### Auth Flow
```
src/hooks/useAuth.tsx
├── AuthProvider (Context)
│   ├── Listens to onAuthStateChange
│   ├── Fetches user role from profiles table
│   └── Exposes: user, session, isAdmin, isViewer, canAccessAdmin
```

### User Roles (4-tier RBAC)
| Role | Access Level | Description |
|---|---|---|
| `admin` | Full | Complete system control |
| `viewer` | Read-only admin | Demo/presentation mode |
| `customer` | Customer portal | Own bookings, profile |
| Staff roles | Operational | Via `staff_profiles` table |

### Staff Sub-Roles
| Role | Permissions |
|---|---|
| `admin` | Full CRUD on all tables |
| `manager` | Operational oversight |
| `support` | Customer & status updates |
| `agent` | Agent-specific tracking |

### Role Storage
- **Primary**: `profiles` table → `role` column (user_role enum: admin, viewer, customer)
- **Staff**: `staff_profiles` table → `role` column (staff_role enum: admin, manager, support, agent)
- **RLS Functions**: `is_admin()`, `is_staff(user_id)` — security definer functions

### Key Auth Components
| Component | Purpose |
|---|---|
| `src/pages/Auth.tsx` | Login/Signup form |
| `src/pages/ResetPassword.tsx` | Password reset |
| `src/hooks/useAuth.tsx` | Auth context provider |
| `src/contexts/ViewerModeContext.tsx` | Read-only mode enforcement |

### Guest Booking
- Unauthenticated users can book packages
- Guest data stored in `bookings` table with `guest_name`, `guest_email`, `guest_phone`
- `guestBookingStorage.ts` manages localStorage for post-booking tracking

---

## 6. Database Schema

### Core Tables (40+ tables)

#### User & Auth
| Table | Purpose |
|---|---|
| `profiles` | User profiles with role (linked to auth.users) |
| `staff_profiles` | Staff members with sub-roles |

#### Bookings & Orders
| Table | Purpose |
|---|---|
| `bookings` | Package bookings (status, payment, tracking) |
| `booking_documents` | Uploaded documents per booking |
| `booking_status_history` | Tracking status change log |
| `booking_settings` | Configurable booking parameters |
| `customers` | Customer CRM records |
| `customer_documents` | Customer document management |

#### Packages & Hotels
| Table | Purpose |
|---|---|
| `packages` | Hajj/Umrah travel packages |
| `package_sections` | Package category sections |
| `hotels` | Hotel listings with details |
| `hotel_booking_requests` | Hotel reservation requests |
| `hotel_section_settings` | Hotel display configuration |

#### Air Tickets
| Table | Purpose |
|---|---|
| `air_ticket_bookings` | Flight booking requests |
| `air_ticket_passengers` | Passenger details per booking |
| `air_ticket_routes` | Multi-city route segments |
| `air_ticket_settings` | Air ticket configuration |

#### Visa
| Table | Purpose |
|---|---|
| `visa_countries` | Supported visa countries & requirements |
| `visa_applications` | Visa application submissions |

#### Accounting & Finance
| Table | Purpose |
|---|---|
| `chart_of_accounts` | Account categories (Asset, Liability, Income, Expense, Equity) |
| `income_transactions` | Income entries linked to accounts |
| `expense_transactions` | Expense entries linked to accounts |
| `general_ledger` | Double-entry ledger (auto-generated via triggers) |
| `bank_accounts` | Cash & bank account management |
| `emi_payments` | Installment payment plans |
| `emi_installments` | Individual installment records |
| `transactions` | Payment gateway transactions |
| `payment_logs` | Detailed payment audit trail |

#### Marketing & CRM
| Table | Purpose |
|---|---|
| `leads` | Lead capture with scoring |
| `crm_sequences` | Follow-up automation sequences |
| `crm_sequence_steps` | Individual steps in sequences |
| `crm_lead_sequences` | Lead-sequence assignments |
| `audience_segments` | Retargeting audience segments |
| `agents` | Agent profiles & commission tracking |
| `agent_leads` | Agent-lead attribution |
| `downloadable_resources` | Lead magnet resources |
| `marketing_event_logs` | Facebook Pixel & analytics events |

#### Content
| Table | Purpose |
|---|---|
| `hero_content` | Homepage hero slides |
| `services` | Service cards |
| `testimonials` | Customer testimonials |
| `faq_items` | FAQ entries |
| `gallery_images` | Photo gallery |
| `gallery_videos` | Video gallery |
| `gallery_settings` | Gallery display config |
| `blog_posts` | Blog articles |
| `blog_categories` | Blog categorization |
| `notices` | Notice board entries |
| `menu_items` | Navigation menu items |
| `about_content` | About page content |

#### Site Configuration
| Table | Purpose |
|---|---|
| `site_settings` | Global site settings (key-value) |
| `theme_settings` | Theme colors & fonts |
| `section_visibility` | Toggle homepage sections |
| `footer_content` | Footer content & video |
| `contact_info` | Contact details |
| `office_locations` | Office addresses |
| `social_networks` | Social media links |
| `legal_pages` | Legal/policy pages |
| `translations` | i18n string translations |

#### Notifications
| Table | Purpose |
|---|---|
| `notification_settings` | Channel configs (WhatsApp, SMS, Email) |
| `notification_logs` | Delivery tracking |
| `notification_templates` | Message templates with variables |

#### System
| Table | Purpose |
|---|---|
| `backup_history` | Backup records |
| `audit_logs` | Admin action audit trail |
| `referral_codes` | Referral tracking codes |

### Key Enums
```sql
booking_status: pending, confirmed, cancelled, completed
tracking_status: pending, document_collection, processing, visa_processing, 
                 flight_booking, hotel_booking, ready, travelling, completed, cancelled
air_ticket_status: pending, confirmed, ticketed, cancelled, rejected
cabin_class: economy, premium_economy, business, first
trip_type: one_way, round_trip, multi_city
gender_type: male, female
user_role: admin, viewer, customer
staff_role: admin, manager, support, agent
```

### Database Functions (Security Definer)
```sql
is_admin()           -- Checks if current user has admin role
is_staff(user_id)    -- Checks if user is staff member
has_role(user_id, role) -- Generic role check
```

---

## 7. Frontend Pages & Routing

### Route Map
| Route | Component | Access | Purpose |
|---|---|---|---|
| `/` | `Index.tsx` | Public | Homepage with all sections |
| `/auth` | `Auth.tsx` | Public | Login & signup |
| `/reset-password` | `ResetPassword.tsx` | Public | Password reset |
| `/my-bookings` | `MyBookings.tsx` | Auth | Customer bookings |
| `/profile` | `ProfileSettings.tsx` | Auth | Profile management |
| `/track-order` | `TrackOrder.tsx` | Public | Order tracking |
| `/track-visa` | `TrackVisa.tsx` | Public | Visa status tracking |
| `/hotels` | `Hotels.tsx` | Public | Hotel browsing |
| `/admin` | `AdminDashboard.tsx` | Admin/Viewer | Admin panel (SPA) |
| `/booking/confirmation/:id` | `BookingConfirmation.tsx` | Auth | Booking confirmation |
| `/legal/:pageKey` | `LegalPage.tsx` | Public | Legal pages |
| `/payment/success` | `PaymentResult.tsx` | Public | Payment callback |
| `/payment/failed` | `PaymentResult.tsx` | Public | Payment callback |
| `/payment/cancelled` | `PaymentResult.tsx` | Public | Payment callback |
| `*` | `NotFound.tsx` | Public | 404 page |

### Homepage Sections (in order)
1. Header (sticky navigation)
2. Hero Section (carousel slides)
3. Services Overview (icon cards)
4. Notice Board (announcements)
5. Dynamic Packages (Hajj/Umrah tabs)
6. Hotel Section
7. Visa Services
8. Gallery Section
9. Testimonials
10. FAQ Section
11. Contact Section
12. Lead Capture Form
13. Footer (with video background)
14. WhatsApp floating button
15. Mobile CTA bar
16. Offer popup

---

## 8. Admin Dashboard

### Architecture
The admin dashboard is a **single-page application** with tab-based navigation. Content is rendered dynamically via a `switch` statement in `AdminDashboard.tsx`.

### Navigation Structure (10 categories, 50+ modules)

#### 1. Dashboard
- **Overview** — KPI cards, charts, recent activity

#### 2. Bookings & Orders
- **Customers** — CRM with documents, status tracking
- **Package Bookings** — Full booking management with status workflow
- **Air Tickets** — Flight booking management
- **Hotel Bookings** — Hotel reservation requests
- **Visa Applications** — Visa processing pipeline
- **Group Inquiries** — Group travel lead management

#### 3. Packages & Hotels
- **Packages** — CRUD for Hajj/Umrah packages
- **Package Sections** — Category management
- **Hotels** — Hotel listings management
- **Hotel Settings** — Display configuration
- **Air Ticket Settings** — Route & pricing config

#### 4. Accounting & Finance
- **Accounting Overview** — Financial dashboard with charts
- **Chart of Accounts** — 5-type account structure (Asset, Liability, Income, Expense, Equity)
- **Income** — Record income transactions
- **Expenses** — Record expense transactions
- **General Ledger** — Auto-generated double-entry records
- **Cash & Bank** — Bank account management
- **Revenue Summary** — Revenue analytics
- **Installments** — EMI payment tracking
- **Payment Methods** — Gateway configuration
- **Transactions** — Transaction log viewer
- **Reconciliation** — Payment matching
- **Financial Reports** — P&L, Trial Balance, Cash Flow (PDF/CSV export)

#### 5. Marketing & CRM
- **Leads CRM** — Lead management with scoring
- **Follow-up Sequences** — Automated message workflows
- **Marketing Analytics** — Campaign performance
- **Offer Popup** — Promotional popup configuration
- **Lead Magnets** — Downloadable resources
- **Referrals** — Referral code management
- **Agents** — Agent commission tracking

#### 6. Reports
- **Reports & Analytics** — Comprehensive business reports
- **Financial Analytics** — Financial performance charts
- **Hajji Reports** — Per-pilgrim reporting

#### 7. Content
- **Blog Posts** — Blog CMS with categories
- **Notice Board** — Announcements management
- **Gallery** — Photo & video gallery
- **Testimonials** — Customer reviews
- **FAQ** — Q&A management
- **Translations** — Multi-language strings

#### 8. Website Design
- **Section Visibility** — Toggle homepage sections
- **Menu** — Navigation menu items (drag-and-drop)
- **Hero** — Hero slides management
- **Services** — Service cards management
- **Team** — Team members
- **Visa Countries** — Visa country listings
- **Contact** — Contact information
- **Offices** — Office locations
- **Social Networks** — Social media links
- **Footer** — Footer content & video settings
- **Legal Pages** — Privacy, Terms, etc.

#### 9. Notifications
- **Notifications** — Channel settings (WhatsApp, SMS, Email)
- **Retry Queue** — Failed notification retry
- **Templates** — Message templates with variables
- **Booking Settings** — Automated notification triggers

#### 10. System
- **Staff Management** — Staff accounts & roles
- **Audit Log** — System activity trail
- **Backup & Restore** — Data backup management
- **Demo Account** — Demo viewer account
- **Settings** — Global site configuration

### Viewer Mode
When `isViewer === true`, the `ViewerModeContext` wraps all admin components to:
- Display a yellow "Demo Mode" banner
- Disable all create/update/delete actions
- Show "View Only" badge in header

---

## 9. Booking System

### Booking Flow
```
Customer selects package
    ↓
BookingModal opens (passenger details, payment method)
    ↓
Guest or authenticated booking
    ↓
Payment: Bank Transfer / bKash / Nagad / SSLCommerz / Installment
    ↓
Booking created (status: pending)
    ↓
Admin reviews & confirms
    ↓
Tracking status updates (10 stages)
    ↓
Customer notified at each stage
```

### Booking Statuses
| Status | Description |
|---|---|
| `pending` | Awaiting admin review |
| `confirmed` | Payment verified, booking confirmed |
| `cancelled` | Cancelled by admin or customer |
| `completed` | Travel completed |

### Tracking Statuses (10 stages)
1. `pending` — Initial submission
2. `document_collection` — Gathering documents
3. `processing` — Being processed
4. `visa_processing` — Visa in progress
5. `flight_booking` — Flights being booked
6. `hotel_booking` — Hotels being arranged
7. `ready` — All preparations complete
8. `travelling` — Currently traveling
9. `completed` — Trip completed
10. `cancelled` — Cancelled

### EMI/Installment System
- Advance payment + split remaining into N installments
- `emi_payments` tracks the plan
- `emi_installments` tracks individual payments
- Admin dashboard shows payment progress
- Automated reminders via `emi-reminder` edge function

### Key Components
| Component | Purpose |
|---|---|
| `BookingModal.tsx` | Main booking form |
| `InstallmentPaymentModal.tsx` | EMI payment selection |
| `InstallmentDetails.tsx` | Payment plan display |
| `PaymentMethodSelector.tsx` | Payment method picker |
| `BankTransferDetails.tsx` | Bank details for manual transfer |
| `BookingDocumentUpload.tsx` | Document upload interface |
| `OrderTrackingModal.tsx` | Track order status |

---

## 10. Payment Integration

### Supported Gateways
| Gateway | Type | Edge Function |
|---|---|---|
| SSLCommerz | Payment gateway | `payment-sslcommerz` |
| bKash | Mobile banking | `payment-bkash` |
| Nagad | Mobile banking | `payment-nagad` |
| Bank Transfer | Manual | N/A (screenshot upload) |
| Installment/EMI | Split payment | `payment-installment` |

### Payment Flow (SSLCommerz example)
```
1. Customer selects SSLCommerz
2. Frontend calls edge function with booking details
3. Edge function creates SSLCommerz session
4. Customer redirected to SSLCommerz payment page
5. On success/fail, redirected to /payment/success or /payment/failed
6. Edge function validates IPN callback
7. Transaction recorded in `transactions` table
8. Booking status updated
```

### Payment Tables
- `transactions` — All gateway transactions
- `payment_logs` — Detailed request/response audit
- `emi_payments` — Installment plans
- `emi_installments` — Individual installment records

### Hook: `usePaymentProcessing.ts`
Handles payment initiation for all gateways, creates transaction records, and manages redirect flows.

---

## 11. Accounting System

### Double-Entry Accounting
The system implements a full double-entry bookkeeping system:

### Chart of Accounts (5 types)
| Type | Code Range | Examples |
|---|---|---|
| Asset | 1000-1999 | Cash, Bank, Receivables |
| Liability | 2000-2999 | Payables, Loans |
| Equity | 3000-3999 | Owner's Equity, Retained Earnings |
| Income | 4000-4999 | Package Sales, Hotel Revenue, Visa Fees |
| Expense | 5000-5999 | Rent, Salaries, Marketing, Travel |

### Automated Ledger
- When income/expense is recorded, a database trigger automatically creates corresponding `general_ledger` entries
- Debit and credit entries maintain the accounting equation: Assets = Liabilities + Equity

### Financial Reports
| Report | Description |
|---|---|
| Profit & Loss | Income vs expenses for a period |
| Trial Balance | All account balances verification |
| Cash Flow | Cash movement analysis |

### Export Formats
- **CSV**: UTF-8 BOM, Windows line endings, Excel-compatible
- **PDF**: jsPDF with auto-table formatting

### Components
| Component | Location |
|---|---|
| `AccountingDashboard.tsx` | `src/components/admin/accounting/` |
| `ChartOfAccounts.tsx` | Account management |
| `IncomeManagement.tsx` | Income recording |
| `ExpenseManagement.tsx` | Expense recording |
| `GeneralLedger.tsx` | Ledger viewer |
| `BankAccounts.tsx` | Bank account management |
| `FinancialReports.tsx` | Report generation |

---

## 12. Visa Services

### Features
- Visa country management (requirements, fees, processing times)
- Online visa application form
- Document upload
- Status tracking (pending → processing → approved/rejected)
- Admin review & notes

### Components
| Component | Purpose |
|---|---|
| `VisaServices.tsx` | Public visa listing |
| `VisaApplicationModal.tsx` | Application form |
| `VisaDetailsModal.tsx` | Country details |
| `AdminVisa.tsx` | Country management |
| `AdminVisaApplications.tsx` | Application processing |

### Database
- `visa_countries` — Country configs
- `visa_applications` — Applications with status

---

## 13. Hotel Management

### Features
- Hotel listings with star ratings, images, facilities
- Google Maps integration (link & embed)
- Booking request system
- Admin management of listings
- Display settings (columns, sort, pagination)

### Components
| Component | Purpose |
|---|---|
| `HotelSection.tsx` | Public hotel grid |
| `HotelCard.tsx` | Individual hotel card |
| `HotelDetailsModal.tsx` | Detailed hotel view |
| `HotelBookingModal.tsx` | Booking request form |
| `AdminHotels.tsx` | Hotel CRUD |
| `AdminHotelBookings.tsx` | Booking request management |
| `AdminHotelSettings.tsx` | Display configuration |

---

## 14. Air Ticket System

### Features
- One-way, round-trip, and multi-city support
- Cabin class selection (Economy, Premium Economy, Business, First)
- Multi-passenger support with detailed info
- Admin ticketing workflow (pending → confirmed → ticketed)
- PNR number assignment
- Ticket file upload

### Components
| Component | Purpose |
|---|---|
| `AirTicketBookingModal.tsx` | Booking form |
| `MyAirTicketBookings.tsx` | Customer booking list |
| `AdminAirTicketBookings.tsx` | Admin management |
| `AdminAirTicketSettings.tsx` | Route/pricing config |

### Database
- `air_ticket_bookings` — Main booking records
- `air_ticket_passengers` — Passenger details
- `air_ticket_routes` — Multi-city segments
- `air_ticket_settings` — Configuration

---

## 15. CRM & Lead Management

### Lead Capture
- Contact forms throughout the site
- UTM parameter tracking
- Facebook Pixel integration
- IP address & device tracking
- Automatic lead scoring

### Lead Scoring Algorithm (`src/lib/leadScoring.ts`)
| Factor | Points |
|---|---|
| Has email | +10 |
| Has phone | +15 |
| Passport ready | +20 |
| Budget specified | +10-25 |
| Group size > 3 | +15 |
| UTM source present | +5 |
| Travel month set | +10 |

### Follow-up Automation
- CRM sequences with timed steps
- Multi-channel delivery (WhatsApp, SMS, Email)
- Day-offset scheduling
- Lead-sequence assignment tracking

### Agent System
- Agent registration with referral codes
- Commission rate configuration
- Lead attribution tracking
- Commission calculation & payout tracking

### Components
| Component | Purpose |
|---|---|
| `LeadCaptureForm.tsx` | Public lead form |
| `AdminLeadsManagement.tsx` | Lead CRM dashboard |
| `AdminCRMAutomation.tsx` | Sequence builder |
| `AdminAgents.tsx` | Agent management |
| `AdminReferrals.tsx` | Referral tracking |

---

## 16. Marketing & Analytics

### Google Analytics
- `react-ga4` integration
- Page view tracking
- Custom event tracking
- Component: `AnalyticsTracker.tsx`
- Hook: `useAnalytics.ts`

### Facebook Pixel
- Server-side event tracking via edge function
- Event types: PageView, Lead, Purchase
- Component: `FacebookPixel.tsx`
- Hook: `useFacebookPixel.ts`
- Edge Function: `fb-event`

### UTM Tracking
- Automatic UTM parameter capture from URLs
- Stored with lead records
- Hook: `useUTMParams.ts`

### Marketing Features
- **Offer Popup**: Configurable promotional popup with image, timing, targeting
- **Lead Magnets**: Downloadable resources (PDFs, guides) for lead capture
- **Audience Segments**: Retargeting segment builder
- **Marketing Analytics Dashboard**: Campaign performance metrics

---

## 17. Notification System

### Channels
| Channel | Integration | Edge Function |
|---|---|---|
| WhatsApp | WhatsApp Business API | Multiple functions |
| SMS | SMS gateway | Via notification functions |
| Email | Email service | Via notification functions |

### Notification Types
| Event | Function |
|---|---|
| New booking | `send-booking-notification` |
| Status update | `send-tracking-notification` |
| Visa update | `send-visa-notification` |
| Air ticket update | `send-air-ticket-notification` |
| EMI reminder | `send-emi-notification` |
| Welcome | `send-welcome-notification` |
| WhatsApp test | `send-whatsapp-test` |

### Template System
- Database-stored templates with variable placeholders
- Variables: `{customer_name}`, `{booking_id}`, `{status}`, etc.
- Admin CRUD interface for templates

### Retry System
- Failed notifications logged to `notification_logs`
- Admin retry interface for re-sending failed notifications
- Retry count tracking

---

## 18. Content Management

### Blog System
- Rich text blog posts with categories
- SEO fields (meta title, description, slug)
- Featured images
- Published/draft states
- View count tracking

### Notice Board
- Priority levels (normal, important, urgent)
- Pinned notices
- Date-based visibility (start/end dates)
- File attachments
- External links

### Gallery
- Photo gallery with categories & tags
- Video gallery (YouTube/upload)
- Lightbox viewer
- Configurable grid layout (desktop/tablet/mobile columns)
- Carousel mode with autoplay

### Testimonials
- Customer reviews with ratings
- Video testimonials
- Featured testimonials
- Display location targeting

### FAQ
- Question/answer management
- Ordering support
- Active/inactive toggling

### Translations
- Key-value translation strings
- Multi-language support via `useTranslation` hook

---

## 19. Website Design System

### Theme
The design system is defined in `src/index.css` using CSS custom properties:

```css
:root {
  --background: HSL values;
  --foreground: HSL values;
  --primary: HSL values;        /* Brand green */
  --secondary: HSL values;
  --muted: HSL values;
  --accent: HSL values;
  --destructive: HSL values;
  --card: HSL values;
  --border: HSL values;
  --ring: HSL values;
}

.dark {
  /* Dark mode overrides */
}
```

### Tailwind Configuration (`tailwind.config.ts`)
- Custom colors mapped to CSS variables
- Custom fonts: heading (Playfair Display) + body (Inter)
- Custom animations & keyframes
- Responsive breakpoints (sm, md, lg, xl)

### Component Library
50+ shadcn/ui components including:
- Accordion, Alert Dialog, Avatar, Badge, Breadcrumb
- Button, Calendar, Card, Carousel, Checkbox
- Command, Dialog, Drawer, Dropdown Menu, Form
- Hover Card, Input, Label, Menubar, Navigation Menu
- Pagination, Popover, Progress, Radio Group, Scroll Area
- Select, Separator, Sheet, Skeleton, Slider
- Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip

### Custom Components
| Component | Purpose |
|---|---|
| `FloatingIslamicPatterns.tsx` | Decorative Islamic geometric patterns |
| `FloatingParticles.tsx` | Animated particle effects |
| `IslamicBorder.tsx` | Decorative border component |
| `HeroImageFrame.tsx` | Styled image frame |
| `PaymentLogos.tsx` | Payment method logo strip |
| `WhatsAppButton.tsx` | Floating WhatsApp button |
| `MobileCTABar.tsx` | Mobile action bar |

### Dark Mode
- Implemented via `next-themes` ThemeProvider
- Storage key: `sm-elite-hajj-theme`
- Default: light mode
- Toggle available in settings

---

## 20. Edge Functions (Backend)

### Overview
All edge functions run on Deno (Supabase Edge Functions) and are auto-deployed.

### Function Reference

| Function | Purpose | Auth Required |
|---|---|---|
| `create-admin-user` | Create admin account | Admin JWT |
| `create-demo-user` | Create demo viewer account | Admin JWT |
| `create-staff-user` | Create staff account | Admin JWT |
| `create-guest-account` | Create guest user for bookings | No |
| `update-user-password` | Admin password reset | Admin JWT |
| `payment-sslcommerz` | SSLCommerz payment processing | No |
| `payment-bkash` | bKash payment processing | No |
| `payment-nagad` | Nagad payment processing | No |
| `payment-installment` | EMI payment processing | Auth |
| `send-booking-notification` | Booking notifications | Service |
| `send-tracking-notification` | Status update notifications | Service |
| `send-visa-notification` | Visa update notifications | Service |
| `send-air-ticket-notification` | Air ticket notifications | Service |
| `send-emi-notification` | EMI reminder notifications | Service |
| `send-welcome-notification` | Welcome messages | Service |
| `send-whatsapp-test` | Test WhatsApp integration | Admin JWT |
| `fb-event` | Facebook Pixel server events | No |
| `backup-restore` | Database backup/restore | Admin JWT |
| `emi-reminder` | Scheduled EMI reminders | Cron |

### Admin Function Auth Pattern
```typescript
// All admin functions follow this pattern:
const authHeader = req.headers.get('Authorization');
const token = authHeader?.replace('Bearer ', '');

const { data: { user } } = await supabaseAdmin.auth.getUser(token);
const { data: profile } = await supabaseAdmin
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

if (profile?.role !== 'admin') {
  return new Response('Unauthorized', { status: 403 });
}
```

---

## 21. Security

### Row-Level Security (RLS)
Every table has RLS enabled with policies following these patterns:

| Pattern | Description |
|---|---|
| Admin full access | `is_admin()` for all operations |
| Staff view + insert | `is_staff(auth.uid())` for SELECT/INSERT |
| Owner access | `auth.uid() = user_id` for own records |
| Public read | `true` for SELECT on public content |
| Anonymous insert | `true` for INSERT on lead/booking forms |

### Security Functions
```sql
-- Check if current user is admin
CREATE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
$$ SECURITY DEFINER;

-- Check if user is staff
CREATE FUNCTION is_staff(_user_id uuid) RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM staff_profiles
    WHERE user_id = _user_id AND is_active = true
  )
$$ SECURITY DEFINER;
```

### Authentication Security
- Email verification required (no auto-confirm)
- Leaked password protection enabled
- Anonymous signups disabled
- Session management via Supabase Auth

### Data Protection
- All sensitive tables have RLS policies
- Payment data processed server-side (Edge Functions)
- File uploads restricted to authenticated users
- Audit logging for admin actions

---

## 22. Deployment & Configuration

### Environment Variables
| Variable | Source | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | Auto | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Auto | Supabase anon key |
| `VITE_SUPABASE_PROJECT_ID` | Auto | Project identifier |

### Edge Function Secrets (configured via Lovable Cloud)
| Secret | Purpose |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Admin operations |
| `SSLCOMMERZ_STORE_ID` | SSLCommerz integration |
| `SSLCOMMERZ_STORE_PASSWORD` | SSLCommerz integration |
| `BKASH_APP_KEY` | bKash payment |
| `BKASH_APP_SECRET` | bKash payment |
| `NAGAD_MERCHANT_ID` | Nagad payment |
| `WHATSAPP_API_TOKEN` | WhatsApp notifications |
| `FB_PIXEL_ACCESS_TOKEN` | Facebook Pixel |

### Build Configuration
- **Vite**: `vite.config.ts` — Standard React SPA config
- **TypeScript**: `tsconfig.app.json` — Strict mode, path aliases (`@/`)
- **Tailwind**: `tailwind.config.ts` — Custom theme
- **ESLint**: `eslint.config.js` — Standard React rules
- **Vercel**: `vercel.json` — SPA fallback routing

### SEO
- Dynamic `<title>` and meta descriptions
- Open Graph tags
- `robots.txt` configured
- Semantic HTML structure
- Image alt texts
- Lazy loading for images

### Performance
- React Query caching (5-minute stale, 10-minute GC)
- Image compression via `imageCompression.ts`
- Code splitting via React lazy loading
- Optimized image component (`optimized-image.tsx`)
- Vite build optimization

---

## 23. API Reference

### Supabase Client Usage
```typescript
import { supabase } from "@/integrations/supabase/client";

// Query data
const { data, error } = await supabase
  .from("table_name")
  .select("*")
  .eq("column", "value");

// Insert data
const { data, error } = await supabase
  .from("table_name")
  .insert({ column: "value" });

// Update data
const { data, error } = await supabase
  .from("table_name")
  .update({ column: "new_value" })
  .eq("id", recordId);

// Delete data
const { error } = await supabase
  .from("table_name")
  .delete()
  .eq("id", recordId);

// File upload
const { data, error } = await supabase.storage
  .from("bucket_name")
  .upload("path/file.jpg", file);

// Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});
```

### Edge Function Invocation
```typescript
const { data, error } = await supabase.functions.invoke("function-name", {
  body: { key: "value" },
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
});
```

### Currency Formatting
```typescript
import { formatCurrency } from "@/lib/currency";
formatCurrency(50000); // "৳50,000"
```

### Audit Logging
```typescript
import { logAuditEvent } from "@/utils/auditLogger";
await logAuditEvent({
  action: "update",
  entity_type: "booking",
  entity_id: bookingId,
  details: { status: "confirmed" },
});
```

---

## File Restrictions

**DO NOT EDIT** (auto-generated):
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/config.toml`
- `.env`
- `supabase/migrations/` (read-only)

---

## Summary

This is a production-grade Hajj/Umrah travel management platform with:
- **50+ admin modules** across 10 organized categories
- **40+ database tables** with comprehensive RLS policies
- **18 edge functions** for backend operations
- **4-tier RBAC** (Admin, Viewer, Customer, Staff)
- **Double-entry accounting** with automated ledger
- **Multi-gateway payments** (SSLCommerz, bKash, Nagad)
- **CRM with lead scoring** and follow-up automation
- **Multi-channel notifications** (WhatsApp, SMS, Email)
- **Full content management** (Blog, Gallery, FAQ, etc.)
- **Comprehensive reporting** with PDF/CSV/Excel export

Built on React + TypeScript + Supabase, deployed via Lovable Cloud with Vercel compatibility.
