# AgroGuard Shield - Developer Quick Reference

## 🚀 Quick Start

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Setup
```bash
# Required environment variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Key File Locations

### Landing Page Components
```
src/components/
├── Header.tsx              # Main navigation
├── Hero.tsx                # Hero section
├── Features.tsx            # Feature showcase
├── UserRoles.tsx           # User role cards
├── Testimonials.tsx        # User testimonials
├── Pricing.tsx             # Pricing plans
├── About.tsx               # Company information
├── FAQ.tsx                 # Frequently asked questions
├── CallToAction.tsx        # Conversion section
└── Footer.tsx              # Footer with links
```

### Dashboard Components
```
src/components/dashboards/
├── FarmerDashboard.tsx           # Farmer interface
├── VeterinarianDashboard.tsx     # Veterinarian interface
├── ExtensionWorkerDashboard.tsx  # Extension worker interface
├── RegulatorDashboard.tsx        # Regulator interface
├── ResearcherDashboard.tsx       # Researcher interface
├── farmer.i18n.ts               # Farmer translations
└── risk_assessment.i18n.ts      # Risk assessment translations
```

### Authentication
```
src/components/auth/
├── ProtectedRoute.tsx      # Route protection
└── RoleGuard.tsx          # Role-based access

src/hooks/
└── useAuth.tsx            # Authentication hook
```

### Pages
```
src/pages/
├── Index.tsx              # Landing page
├── Auth.tsx               # Authentication page
├── Dashboard.tsx          # Dashboard router
├── Farms.tsx              # Farm management
├── AlertsAdmin.tsx        # Alert administration
├── TrainingAdmin.tsx      # Training administration
└── NotFound.tsx           # 404 page
```

## 🎨 Styling Guide

### Tailwind CSS Classes
```css
/* Layout */
container mx-auto px-4
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
flex flex-col sm:flex-row

/* Spacing */
p-4, p-6, p-8          /* Padding */
m-4, m-6, m-8          /* Margin */
gap-4, gap-6, gap-8    /* Gap */

/* Colors */
bg-primary, bg-accent, bg-muted
text-primary, text-accent, text-muted-foreground
border-primary, border-accent

/* Responsive */
sm:, md:, lg:, xl:     /* Breakpoints */
```

### Custom CSS Variables
```css
:root {
  --primary: 222.2 84% 4.9%;
  --accent: 142.1 76.2% 36.3%;
  --muted: 210 40% 98%;
  --foreground: 222.2 84% 4.9%;
  --background: 0 0% 100%;
}
```

## 🔧 Component Patterns

### Basic Component Structure
```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ComponentProps {
  title: string;
  data?: any[];
}

const Component = ({ title, data = [] }: ComponentProps) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <Card>
      <CardContent>
        <h2>{title}</h2>
        {/* Component content */}
      </CardContent>
    </Card>
  );
};

export default Component;
```

### Dashboard Component Pattern
```tsx
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout title="Dashboard">
      {/* Dashboard content */}
    </DashboardLayout>
  );
};
```

### Internationalization Pattern
```tsx
import { farmerDict, farmerLanguages, FarmerLocale } from './farmer.i18n';

const Component = () => {
  const [locale, setLocale] = useState<FarmerLocale>('en');
  const t = farmerDict[locale];

  return (
    <div>
      <h1>{t.title}</h1>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {farmerLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## 🗄️ Database Operations

### Supabase Client Usage
```tsx
import { supabase } from '@/integrations/supabase/client';

// Fetch data
const { data, error } = await supabase
  .from('farms')
  .select('*')
  .eq('owner_id', user.id);

// Insert data
const { data, error } = await supabase
  .from('compliance_records')
  .insert([{
    farm_id: farmId,
    checklist_item: item,
    is_compliant: true,
    checked_by: user.id
  }]);

// Update data
const { data, error } = await supabase
  .from('profiles')
  .update({ full_name: newName })
  .eq('user_id', user.id);
```

### Real-time Subscriptions
```tsx
useEffect(() => {
  const subscription = supabase
    .channel('alerts')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'alerts' },
      (payload) => {
        // Handle new alert
      }
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, []);
```

## 🎯 User Roles & Permissions

### Role Definitions
```typescript
type UserRole = 'farmer' | 'veterinarian' | 'extension_worker' | 'regulator' | 'researcher';

const rolePermissions = {
  farmer: ['view_own_farms', 'manage_own_compliance'],
  veterinarian: ['view_all_farms', 'create_assessments'],
  extension_worker: ['manage_training', 'view_all_farmers'],
  regulator: ['view_all_data', 'manage_alerts'],
  researcher: ['view_anonymized_data', 'access_analytics']
};
```

### Role Guard Usage
```tsx
import RoleGuard from '@/components/auth/RoleGuard';

<RoleGuard allowedRoles={['farmer', 'veterinarian']}>
  <SensitiveComponent />
</RoleGuard>
```

## 🌍 Internationalization

### Adding New Language
1. Add language code to `farmer.i18n.ts`
2. Add translations for all keys
3. Update language selector
4. Test language switching

### Translation Keys
```typescript
const translations = {
  en: {
    title: 'Dashboard',
    welcome: 'Welcome back',
    // ... more keys
  },
  hi: {
    title: 'डैशबोर्ड',
    welcome: 'वापस स्वागत है',
    // ... more keys
  }
};
```

## 🎨 UI Component Usage

### Common Components
```tsx
// Cards
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Buttons
<Button variant="primary" size="lg">Primary</Button>
<Button variant="outline" size="sm">Outline</Button>

// Forms
<Input placeholder="Enter text" />
<Select>
  <SelectItem value="option1">Option 1</SelectItem>
</Select>

// Alerts
<Alert>
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>
```

### Layout Components
```tsx
// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>

// Flex layouts
<div className="flex flex-col sm:flex-row gap-4">
  {/* Flex items */}
</div>
```

## 🔍 Debugging Tips

### Common Issues
1. **Authentication errors**: Check Supabase configuration
2. **RLS errors**: Verify user permissions
3. **Styling issues**: Check Tailwind classes
4. **TypeScript errors**: Verify prop types

### Debug Tools
```tsx
// Console logging
console.log('Debug data:', data);

// React DevTools
// Use React DevTools browser extension

// Supabase debugging
console.log('Supabase client:', supabase);
```

## 📱 Responsive Design

### Breakpoint Usage
```tsx
// Mobile first approach
<div className="
  w-full           // Mobile: full width
  md:w-1/2         // Tablet: half width
  lg:w-1/3         // Desktop: third width
">
```

### Common Responsive Patterns
```tsx
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">

// 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Hide on mobile, show on desktop
<div className="hidden md:block">
```

## 🚀 Performance Tips

### Optimization Techniques
1. **Lazy loading**: Use `React.lazy()` for route components
2. **Memoization**: Use `useMemo()` and `useCallback()`
3. **Code splitting**: Split by routes and features
4. **Image optimization**: Use appropriate image formats

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## 🧪 Testing

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import Component from './Component';

test('renders component', () => {
  render(<Component title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Integration Testing
```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('dashboard loads data', async () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  
  await waitFor(() => {
    expect(screen.getByText('Loading...')).not.toBeInTheDocument();
  });
});
```

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

### Tools
- [Vite](https://vitejs.dev/) - Build tool
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide Icons](https://lucide.dev/) - Icon library
- [React Router](https://reactrouter.com/) - Routing

This quick reference provides essential information for developers working on the AgroGuard Shield project. Keep this handy for quick lookups and common patterns!
