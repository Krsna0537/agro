# AgroGuard Shield - Component Architecture

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        LANDING PAGE                            │
├─────────────────────────────────────────────────────────────────┤
│  Header → Hero → Features → UserRoles → Testimonials →        │
│  Pricing → About → FAQ → CallToAction → Footer                 │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  Auth Page → ProtectedRoute → RoleGuard → Dashboard Router     │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  DashboardLayout → [Role-Specific Dashboards] → Components     │
└─────────────────────────────────────────────────────────────────┘
```

## 🧩 Component Hierarchy

### Landing Page Components
```
Index.tsx
├── Header.tsx
│   ├── Navigation Menu
│   ├── Brand Logo
│   └── Auth Buttons
├── Hero.tsx
│   ├── Value Proposition
│   ├── Statistics Display
│   └── CTA Buttons
├── Features.tsx
│   ├── Feature Cards (8x)
│   └── Dashboard Preview
├── UserRoles.tsx
│   └── UserRoleCard.tsx (5x)
├── Testimonials.tsx
│   ├── Testimonial Cards (6x)
│   └── Trust Indicators
├── Pricing.tsx
│   ├── Pricing Tiers (3x)
│   ├── Add-ons Section
│   └── FAQ Section
├── About.tsx
│   ├── Mission & Vision
│   ├── Core Values (4x)
│   ├── Timeline
│   ├── Team Members (4x)
│   └── Impact Statistics
├── FAQ.tsx
│   ├── FAQ Items (12x)
│   └── Contact Options
├── CallToAction.tsx
│   ├── Benefits Showcase
│   ├── CTA Buttons
│   └── Trust Indicators
└── Footer.tsx
    ├── Newsletter Signup
    ├── Statistics
    ├── Link Sections (5x)
    ├── Social Media
    └── Contact Info
```

### Dashboard Components
```
DashboardLayout.tsx
├── Sidebar Navigation
├── Header with User Info
└── Main Content Area
    ├── FarmerDashboard.tsx
    │   ├── Biosecurity Score
    │   ├── Compliance Status
    │   ├── Training Progress
    │   └── Quick Actions
    ├── VeterinarianDashboard.tsx
    │   ├── Assessment Management
    │   ├── Farm Overview
    │   └── Report Generation
    ├── ExtensionWorkerDashboard.tsx
    │   ├── Farmer Management
    │   ├── Training Administration
    │   └── Progress Tracking
    ├── RegulatorDashboard.tsx
    │   ├── Compliance Monitoring
    │   ├── Alert Management
    │   └── Report Generation
    └── ResearcherDashboard.tsx
        ├── Data Analytics
        ├── Research Tools
        └── Collaboration Features
```

### Specialized Components
```
ComplianceTracker.tsx
├── Checklist Management
├── Status Tracking
├── Notes & Evidence
└── Multi-language Support

RiskAssessmentForm.tsx
├── Dynamic Form Fields
├── Risk Scoring
├── Recommendations
└── Evidence Upload

TrainingModules.tsx
├── Module Listing
├── Progress Tracking
├── Completion Certificates
└── Multi-language Content

AlertsPanel.tsx
├── Alert Listing
├── Priority Management
├── Status Updates
└── Real-time Notifications
```

### Authentication Components
```
Auth.tsx
├── Login Form
├── Signup Form
├── Role Selection
└── Password Reset

ProtectedRoute.tsx
├── Authentication Check
├── Redirect Logic
└── Loading States

RoleGuard.tsx
├── Role Verification
├── Access Control
└── Fallback UI
```

## 🔄 Data Flow

### Authentication Flow
```
User Action → Auth.tsx → Supabase Auth → ProtectedRoute → RoleGuard → Dashboard
```

### Dashboard Data Flow
```
Dashboard → useAuth Hook → Supabase Client → Database → RLS Policies → UI Update
```

### Component Communication
```
Parent Component → Props → Child Component
Child Component → Callback Props → Parent Component
Global State → Context/Hooks → Components
```

## 🎨 UI Component Library

### shadcn/ui Components Used
```
Layout Components:
├── Card
├── Separator
├── AspectRatio
└── Container

Form Components:
├── Input
├── Button
├── Select
├── Checkbox
├── RadioGroup
├── Textarea
├── Switch
└── Slider

Navigation Components:
├── Tabs
├── Breadcrumb
├── NavigationMenu
└── Pagination

Feedback Components:
├── Alert
├── Toast
├── Progress
├── Skeleton
└── Badge

Data Display Components:
├── Table
├── Avatar
├── Chart
└── Calendar

Overlay Components:
├── Dialog
├── Sheet
├── Popover
├── Tooltip
├── HoverCard
└── Command

Interactive Components:
├── Accordion
├── Collapsible
├── Toggle
├── ToggleGroup
└── Resizable
```

## 🌐 Internationalization Structure

### Language Files
```
farmer.i18n.ts
├── English (en)
├── Hindi (hi)
├── Bengali (bn)
├── Tamil (ta)
├── Telugu (te)
├── Marathi (mr)
├── Gujarati (gu)
├── Kannada (kn)
├── Malayalam (ml)
└── Punjabi (pa)

risk_assessment.i18n.ts
├── Assessment Forms
├── Risk Categories
├── Recommendations
└── Status Messages
```

### Language Implementation
```
Component → useLocale Hook → Dictionary Lookup → Translated Text
```

## 🗄️ Database Integration

### Supabase Integration
```
Components → Supabase Client → Database Tables → RLS Policies → Data
```

### Database Tables
```
profiles
├── user_id (PK)
├── full_name
├── email
├── phone
├── location
└── created_at

user_roles
├── user_id (FK)
├── role
└── assigned_at

farms
├── id (PK)
├── owner_id (FK)
├── name
├── location
├── farm_type
└── created_at

biosecurity_assessments
├── id (PK)
├── farm_id (FK)
├── assessor_id (FK)
├── status
├── risk_score
├── assessment_data
└── recommendations

compliance_records
├── id (PK)
├── farm_id (FK)
├── checklist_item
├── is_compliant
├── notes
├── checked_by (FK)
└── checked_at

training_modules
├── id (PK)
├── title
├── description
├── content
├── language
└── is_published

user_training_progress
├── user_id (FK)
├── module_id (FK)
├── progress_percentage
├── completed_at
└── certificate_url

alerts
├── id (PK)
├── title
├── message
├── severity
├── is_active
└── created_at

user_alerts
├── id (PK)
├── user_id (FK)
├── alert_id (FK)
├── read_at
└── created_at
```

## 🔐 Security & Access Control

### Row Level Security (RLS)
```
User Authentication → Role Verification → RLS Policies → Data Access
```

### Access Control Matrix
```
Role                │ Profiles │ Farms │ Assessments │ Compliance │ Training │ Alerts
────────────────────┼──────────┼───────┼─────────────┼────────────┼──────────┼────────
Farmer              │ Own      │ Own   │ Own         │ Own        │ Own      │ All
Veterinarian        │ Own      │ All   │ Created     │ Create     │ All      │ All
Extension Worker    │ All      │ All   │ View        │ Create     │ Manage   │ All
Regulator           │ All      │ All   │ All         │ All        │ All      │ Manage
Researcher          │ Anon     │ Anon  │ Anon        │ Anon       │ All      │ All
```

## 📱 Responsive Design

### Breakpoints
```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### Component Responsiveness
```
Header: Mobile hamburger menu
Hero: Stacked layout on mobile
Features: 1-2-4 column grid
Testimonials: 1-2-3 column grid
Pricing: Stacked cards on mobile
Footer: Stacked sections on mobile
```

## 🚀 Performance Optimizations

### Code Splitting
```
Route-based splitting
Component lazy loading
Dynamic imports
```

### Caching
```
Local storage for language preference
Session storage for user data
Supabase real-time subscriptions
```

### Bundle Optimization
```
Tree shaking
Dead code elimination
Minification
Gzip compression
```

## 🔧 Development Workflow

### Component Development
```
1. Create component file
2. Add TypeScript types
3. Implement functionality
4. Add styling
5. Test responsiveness
6. Add internationalization
7. Document props and usage
```

### Testing Strategy
```
Unit tests for utilities
Component tests for UI
Integration tests for data flow
E2E tests for user journeys
```

This architecture provides a solid foundation for the AgroGuard Shield application, ensuring scalability, maintainability, and excellent user experience across all devices and user roles.
