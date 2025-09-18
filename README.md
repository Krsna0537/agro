# AgroGuard Shield - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Component Structure](#component-structure)
4. [Pages](#pages)
5. [Authentication & Authorization](#authentication--authorization)
6. [Dashboard Components](#dashboard-components)
7. [UI Components](#ui-components)
8. [Hooks & Utilities](#hooks--utilities)
9. [Database Integration](#database-integration)
10. [Internationalization](#internationalization)
11. [Styling & Assets](#styling--assets)
12. [File Structure](#file-structure)

---

## 🎯 Project Overview

**AgroGuard Shield** is a comprehensive digital platform for implementing, monitoring, and sustaining robust biosecurity practices in pig and poultry farms. The application serves multiple user roles including farmers, veterinarians, extension workers, regulators, and researchers.

### Key Features:
- Real-time biosecurity monitoring
- Risk assessment tools
- Compliance tracking
- Training modules
- Multi-language support (10+ languages)
- Role-based access control
- Mobile-first design

---

## 🏗️ Architecture

### Technology Stack:
- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **State Management**: React Hooks + Context
- **Routing**: React Router v6
- **Icons**: Lucide React

### Project Structure:
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility functions
└── assets/             # Static assets
```

---

## 🧩 Component Structure

### Landing Page Components

#### 1. **Header.tsx**
**Purpose**: Main navigation header for the landing page
**Features**:
- Responsive navigation menu
- Brand logo and tagline
- Mobile hamburger menu
- Navigation links to all sections
- Sign In/Get Started buttons

**Key Props**: None (uses React Router navigation)

#### 2. **Hero.tsx**
**Purpose**: Main hero section with value proposition
**Features**:
- Compelling headline and description
- Key feature highlights (Disease Prevention, Risk Assessment, Collaborative Network)
- Call-to-action buttons (Start Free Trial, Watch Demo)
- Statistics display (98% Disease Prevention, 50K+ Farms, 24/7 Monitoring)
- Hero image with live monitoring indicator

**Key Props**: None

#### 3. **Features.tsx**
**Purpose**: Showcases core platform features
**Features**:
- 8 feature cards with icons and descriptions
- Dashboard preview section
- Feature categories: Risk Assessment, Training, Compliance, Alerts, Mobile, Analytics, Collaboration, Monitoring

**Key Props**: None

#### 4. **UserRoles.tsx**
**Purpose**: Displays different user types and their capabilities
**Features**:
- Role cards for each user type
- Capability descriptions
- Visual icons and styling
- Links to role-specific dashboards

**Key Props**: None

#### 5. **Testimonials.tsx**
**Purpose**: Social proof through user testimonials
**Features**:
- 6 user testimonials with ratings
- User profiles with roles and locations
- Farm information
- Trust indicators from organizations
- Responsive card layout

**Key Props**: None

#### 6. **Pricing.tsx**
**Purpose**: Transparent pricing information
**Features**:
- 3 pricing tiers (Starter, Professional, Enterprise)
- Feature comparison
- Add-ons and extensions
- FAQ section
- Popular plan highlighting

**Key Props**: None

#### 7. **About.tsx**
**Purpose**: Company information and mission
**Features**:
- Mission and vision statements
- Core values with icons
- Company timeline
- Team member profiles
- Impact statistics

**Key Props**: None

#### 8. **FAQ.tsx**
**Purpose**: Frequently asked questions
**Features**:
- 12 comprehensive FAQs
- Expandable/collapsible interface
- Contact support options
- Covers pricing, security, features, support

**Key Props**: None

#### 9. **CallToAction.tsx**
**Purpose**: Conversion-focused section
**Features**:
- Compelling conversion messaging
- Key benefits showcase
- Multiple CTA buttons
- Trust indicators
- Feature highlights

**Key Props**: None

#### 10. **Footer.tsx**
**Purpose**: Comprehensive footer with all information
**Features**:
- Newsletter subscription
- Statistics showcase
- Multiple link sections
- Social media links
- Contact information
- Multi-language support indicator

**Key Props**: None

### Dashboard Components

#### 1. **DashboardLayout.tsx**
**Purpose**: Common layout wrapper for all dashboards
**Features**:
- Sidebar navigation
- Header with user info
- Main content area
- Responsive design

**Key Props**:
- `children`: React.ReactNode
- `title`: string
- `user`: User object

#### 2. **FarmerDashboard.tsx**
**Purpose**: Main dashboard for farmers
**Features**:
- Biosecurity score overview
- Recent assessments
- Compliance status
- Training progress
- Quick actions
- Multi-language support

**Key Props**: None (uses auth context)

#### 3. **VeterinarianDashboard.tsx**
**Purpose**: Dashboard for veterinarians
**Features**:
- Assessment management
- Farm overview
- Report generation
- Client management
- Risk monitoring

**Key Props**: None

#### 4. **ExtensionWorkerDashboard.tsx**
**Purpose**: Dashboard for extension workers
**Features**:
- Farmer management
- Training module administration
- Progress tracking
- Communication tools
- Resource library

**Key Props**: None

#### 5. **RegulatorDashboard.tsx**
**Purpose**: Dashboard for regulatory authorities
**Features**:
- Compliance monitoring
- Alert management
- Report generation
- Policy management
- Audit tools

**Key Props**: None

#### 6. **ResearcherDashboard.tsx**
**Purpose**: Dashboard for researchers
**Features**:
- Data analytics
- Research tools
- Anonymized data access
- Report generation
- Collaboration features

**Key Props**: None

### Specialized Components

#### 1. **ComplianceTracker.tsx**
**Purpose**: Compliance monitoring and tracking
**Features**:
- Checklist management
- Status tracking
- Notes and evidence
- Multi-language support
- Real-time updates

**Key Props**: None

#### 2. **RiskAssessmentForm.tsx**
**Purpose**: Risk assessment creation and management
**Features**:
- Dynamic form fields
- Risk scoring
- Recommendations
- Evidence upload
- Validation

**Key Props**: None

#### 3. **TrainingModules.tsx**
**Purpose**: Training content management
**Features**:
- Module listing
- Progress tracking
- Completion certificates
- Multi-language content
- Interactive elements

**Key Props**: None

#### 4. **AlertsPanel.tsx**
**Purpose**: Alert management and notifications
**Features**:
- Alert listing
- Priority management
- Status updates
- Filtering and sorting
- Real-time notifications

**Key Props**: None

#### 5. **UserRoleCard.tsx**
**Purpose**: Individual user role display
**Features**:
- Role information
- Capability list
- Visual styling
- Action buttons

**Key Props**:
- `role`: Role object
- `onSelect`: Function

### Authentication Components

#### 1. **ProtectedRoute.tsx**
**Purpose**: Route protection based on authentication
**Features**:
- Authentication checking
- Redirect to login
- Loading states

**Key Props**:
- `children`: React.ReactNode

#### 2. **RoleGuard.tsx**
**Purpose**: Role-based access control
**Features**:
- Role verification
- Access restriction
- Fallback UI

**Key Props**:
- `allowedRoles`: string[]
- `children`: React.ReactNode

---

## 📄 Pages

### 1. **Index.tsx** (Landing Page)
**Purpose**: Main landing page
**Components Used**:
- Header, Hero, Features, UserRoles
- Testimonials, Pricing, About, FAQ
- CallToAction, Footer

### 2. **Auth.tsx**
**Purpose**: Authentication page
**Features**:
- Login/signup forms
- Role selection
- Password reset
- Social authentication

### 3. **Dashboard.tsx**
**Purpose**: Main dashboard router
**Features**:
- Role-based dashboard routing
- Protected access
- User context

### 4. **Farms.tsx**
**Purpose**: Farm management page
**Features**:
- Farm listing
- Farm details
- Management tools

### 5. **AlertsAdmin.tsx**
**Purpose**: Alert administration
**Features**:
- Alert management
- Priority settings
- Notification configuration

### 6. **TrainingAdmin.tsx**
**Purpose**: Training administration
**Features**:
- Module management
- Content editing
- Progress monitoring

### 7. **NotFound.tsx**
**Purpose**: 404 error page
**Features**:
- Error message
- Navigation back
- Helpful links

---

## 🔐 Authentication & Authorization

### Authentication Flow:
1. User visits protected route
2. `ProtectedRoute` checks authentication
3. If not authenticated, redirect to `/auth`
4. User logs in via Supabase Auth
5. User role is fetched and stored
6. `RoleGuard` verifies role permissions
7. Access granted to appropriate dashboard

### User Roles:
- **Farmer**: Farm management, compliance tracking
- **Veterinarian**: Assessment creation, farm monitoring
- **Extension Worker**: Training management, farmer support
- **Regulator**: Compliance monitoring, alert management
- **Researcher**: Data access, analytics

---

## 🎛️ Dashboard Components

### Dashboard Features by Role:

#### Farmer Dashboard:
- Biosecurity score overview
- Compliance status tracking
- Training progress
- Quick actions
- Multi-language support

#### Veterinarian Dashboard:
- Assessment management
- Farm overview
- Report generation
- Client management

#### Extension Worker Dashboard:
- Farmer management
- Training administration
- Progress tracking
- Communication tools

#### Regulator Dashboard:
- Compliance monitoring
- Alert management
- Report generation
- Policy management

#### Researcher Dashboard:
- Data analytics
- Research tools
- Anonymized data access
- Collaboration features

---

## 🎨 UI Components

### shadcn/ui Components Used:
- **Layout**: Card, Separator, AspectRatio
- **Forms**: Input, Button, Select, Checkbox, RadioGroup, Textarea
- **Navigation**: Tabs, Breadcrumb, NavigationMenu
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Data Display**: Table, Badge, Avatar, Chart
- **Overlays**: Dialog, Sheet, Popover, Tooltip
- **Interactive**: Accordion, Collapsible, Toggle, Switch

### Custom Styling:
- Tailwind CSS for utility classes
- Custom color scheme
- Responsive design
- Dark/light mode support
- Consistent spacing and typography

---

## 🪝 Hooks & Utilities

### 1. **useAuth.tsx**
**Purpose**: Authentication state management
**Returns**:
- `user`: Current user object
- `loading`: Loading state
- `signIn`: Sign in function
- `signOut`: Sign out function
- `signUp`: Sign up function

### 2. **use-mobile.tsx**
**Purpose**: Mobile device detection
**Returns**:
- `isMobile`: boolean

### 3. **use-toast.ts**
**Purpose**: Toast notification management
**Returns**:
- `toast`: Toast function
- `dismiss`: Dismiss function

### 4. **utils.ts**
**Purpose**: Utility functions
**Functions**:
- `cn`: Class name utility
- `formatDate`: Date formatting
- `generateId`: ID generation

---

## 🗄️ Database Integration

### Supabase Integration:
- **Client**: `integrations/supabase/client.ts`
- **Types**: `integrations/supabase/types.ts`
- **Features**:
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Authentication
  - File storage

### Database Tables:
- `profiles`: User profiles
- `user_roles`: User role assignments
- `farms`: Farm information
- `biosecurity_assessments`: Risk assessments
- `compliance_records`: Compliance tracking
- `training_modules`: Training content
- `user_training_progress`: Training progress
- `alerts`: System alerts
- `user_alerts`: User alert assignments

---

## 🌍 Internationalization

### Language Support:
- English (en)
- Hindi (hi)
- Bengali (bn)
- Tamil (ta)
- Telugu (te)
- Marathi (mr)
- Gujarati (gu)
- Kannada (kn)
- Malayalam (ml)
- Punjabi (pa)

### Implementation:
- Dictionary-based approach
- `farmer.i18n.ts`: Farmer dashboard translations
- `risk_assessment.i18n.ts`: Risk assessment translations
- Local storage for language persistence
- Dynamic language switching

---

## 🎨 Styling & Assets

### Assets:
- `farm-hero.jpg`: Hero section background
- `dashboard-preview.jpg`: Dashboard preview image
- `biosecurity-icon.png`: App icon

### Styling Approach:
- Tailwind CSS for utility classes
- Custom CSS variables for theming
- Responsive design principles
- Consistent color scheme
- Professional typography

---

## 📁 File Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   ├── dashboards/           # Role-specific dashboards
│   ├── ui/                   # Reusable UI components
│   └── [landing-page-components] # Landing page components
├── pages/                    # Route components
├── hooks/                    # Custom React hooks
├── integrations/             # External services
│   └── supabase/            # Supabase integration
├── lib/                      # Utility functions
├── assets/                   # Static assets
└── [config-files]           # Configuration files
```

---

## 🚀 Getting Started

### Prerequisites:
- Node.js 18+
- npm or yarn
- Supabase account

### Installation:
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase configuration
4. Run development server: `npm run dev`

### Environment Variables:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

---

## 📝 Development Notes

### Key Features:
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant
- **Performance**: Optimized loading and rendering
- **Security**: Row Level Security (RLS)
- **Scalability**: Modular component architecture
- **Maintainability**: TypeScript + clear structure

### Best Practices:
- Component composition over inheritance
- Custom hooks for reusable logic
- TypeScript for type safety
- Consistent naming conventions
- Proper error handling
- Loading states and feedback

---

## 🔧 Customization

### Adding New Languages:
1. Add language code to `farmer.i18n.ts`
2. Add translations for all keys
3. Update language selector components
4. Test language switching

### Adding New User Roles:
1. Update database schema
2. Add role to `user_roles` table
3. Create new dashboard component
4. Update routing logic
5. Add role-specific features

### Styling Customization:
1. Update Tailwind config
2. Modify CSS variables
3. Update component styles
4. Test across all breakpoints

---

This documentation provides a comprehensive overview of the AgroGuard Shield project structure, components, and implementation details. Each component is designed to be modular, reusable, and maintainable while providing a seamless user experience across all user roles and devices.
