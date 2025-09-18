# Demo Data for Agro Guard Shield

This file contains comprehensive demo data to showcase all user dashboards and functionality of the Agro Guard Shield application.

## 📋 Demo Data Overview

The demo data includes:

### 👥 **User Profiles & Roles**
- **5 Farmers** from different states (Punjab, Haryana, Gujarat, UP, Telangana)
- **2 Veterinarians** (Delhi, Maharashtra)
- **2 Extension Workers** (Bihar, Kerala)
- **1 Regulator** (Ministry of Agriculture)
- **1 Researcher** (IISc Bangalore)

### 🏡 **Farms Data**
- **5 Farms** with different types (pig, poultry, mixed)
- Realistic locations across India
- Proper registration numbers and coordinates
- Varying farm sizes and animal counts

### 📊 **Biosecurity Assessments**
- **10 Assessments** with different risk scores (60-95)
- Various statuses (completed, draft, reviewed)
- Different assessors (veterinarians, extension workers)
- Detailed assessment data and notes

### ✅ **Compliance Records**
- **25+ Compliance records** across all farms
- Mix of compliant and non-compliant items
- Realistic notes and timestamps
- Different assessors and check dates

### 📚 **Training Modules**
- **6 Training modules** (5 published, 1 draft)
- Different farm types and durations
- Created by extension workers
- Comprehensive content structure

### 📈 **Training Progress**
- **15+ Progress records** for different users
- Various completion percentages (25-100%)
- Mix of completed and in-progress modules
- Realistic timestamps

### 🚨 **Alerts & Notifications**
- **6 System alerts** (4 active, 2 inactive)
- Different severity levels (low, medium, high, critical)
- Regional and farm-type specific alerts
- User-specific notifications

## 🚀 How to Use This Demo Data

### 1. **Import the Data**
```sql
-- Run the demo_data.sql file in your Supabase SQL editor
-- or use psql command line:
psql -h your-supabase-host -U postgres -d postgres -f demo_data.sql
```

### 2. **Test User Accounts**
You can create test accounts with these user IDs to see the data:

| Role | User ID | Name | What You'll See |
|------|---------|------|-----------------|
| **Farmer** | `8cf163d6-ac24-4261-8b94-67ee0cad088a` | Rajesh Kumar | 2 farms, compliance records, training progress |
| **Farmer** | `dd2ae68d-db67-4ffc-bafe-c80e735145e4` | Priya Sharma | 1 poultry farm, high compliance |
| **Veterinarian** | `66343fc8-1852-4c7e-a404-17a01e084b63` | Dr. Anil Verma | Client farms, health reports, assessments |
| **Extension Worker** | `dc4d464a-668a-46a6-9c5e-62597744275d` | Suresh Yadav | All farmers, training modules, progress tracking |
| **Regulator** | `81bf9ee5-4a2e-415d-a40a-c79f15e00945` | Rajesh Gupta | System-wide data, all alerts, compliance overview |
| **Researcher** | `f59b57e4-d3e1-4936-a295-d8888bd7447b` | Dr. Sarah Wilson | Anonymized assessment data, research datasets |

### 3. **Dashboard Features to Test**

#### 🚜 **Farmer Dashboard**
- **Overview**: Farm statistics, compliance rates
- **Risk Assessment**: Biosecurity assessment forms
- **Training**: Available modules and progress
- **Compliance**: Compliance tracking with language support
- **Alerts**: Active alerts and notifications

#### 🩺 **Veterinarian Dashboard**
- **Client Farms**: Farms they've assessed
- **Health Reports**: Assessment creation and management
- **Analytics**: Visit trends and outcomes
- **Compliance**: Create compliance records

#### 🎓 **Extension Worker Dashboard**
- **Farmers**: All farmer profiles and locations
- **Training Content**: Module management
- **Progress Tracking**: Training completion across users
- **Compliance**: System-wide compliance overview

#### 🏛️ **Regulator Dashboard**
- **Surveillance**: Regional monitoring (placeholder)
- **Alert Management**: System-wide alert management
- **Policy Analytics**: Compliance trends (placeholder)
- **System Overview**: Complete system statistics

#### 🔬 **Researcher Dashboard**
- **Research Data**: Anonymized assessment data
- **Active Studies**: Study management (placeholder)
- **Collaboration**: Research partnerships (placeholder)
- **Data Analysis**: Aggregated statistics

## 🌐 **Language Support Demo**

The compliance tracker supports **10 Indian languages**:
- English, Hindi, Bengali, Tamil, Telugu
- Marathi, Gujarati, Kannada, Malayalam, Punjabi

**To test language switching:**
1. Go to any farmer's compliance section
2. Use the language dropdown in the top-right
3. All compliance text will translate instantly

## 📱 **Key Demo Scenarios**

### **Scenario 1: Farmer Compliance Management**
1. Login as Rajesh Kumar (farmer)
2. Navigate to Compliance section
3. See compliance status for both farms
4. Test language switching
5. Add compliance notes

### **Scenario 2: Veterinarian Client Management**
1. Login as Dr. Anil Verma (veterinarian)
2. View client farms (Rajesh's farms)
3. Create new health reports
4. Check assessment history

### **Scenario 3: Extension Worker Training Management**
1. Login as Suresh Yadav (extension worker)
2. View all farmers in the system
3. Manage training modules
4. Track training progress across users

### **Scenario 4: Regulator System Overview**
1. Login as Rajesh Gupta (regulator)
2. View system-wide statistics
3. Manage alerts
4. Monitor compliance across all farms

### **Scenario 5: Researcher Data Analysis**
1. Login as Dr. Sarah Wilson (researcher)
2. View anonymized assessment data
3. Analyze risk scores and trends
4. Access research datasets

## 🔧 **Data Relationships**

The demo data is designed to show realistic relationships:

- **Farmers** own specific farms
- **Veterinarians** assess farms and create compliance records
- **Extension Workers** manage training and can see all farmers
- **Regulators** have system-wide access to everything
- **Researchers** see anonymized data only

## 📊 **Sample Statistics**

After importing, you'll see:
- **5 Farms** across different states
- **10 Biosecurity Assessments** with varying risk scores
- **25+ Compliance Records** with realistic pass/fail rates
- **6 Training Modules** with different completion rates
- **6 System Alerts** with different severity levels
- **15+ Training Progress Records** showing user engagement

## 🎯 **Testing Tips**

1. **Start with Farmer Dashboard** - Most comprehensive user experience
2. **Test Language Switching** - Unique feature to showcase
3. **Check Role-based Access** - Each role sees different data
4. **Verify Compliance Tracking** - Core functionality with translations
5. **Explore Training System** - Educational content management

This demo data provides a realistic and comprehensive view of the Agro Guard Shield application's capabilities across all user roles and features.
