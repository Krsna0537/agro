-- Demo Data for Agro Guard Shield Application
-- This file contains sample data to demonstrate all user dashboards

-- ==============================================
-- 1. USER PROFILES AND ROLES
-- ==============================================

-- Insert demo user profiles (skip if already exist)
INSERT INTO public.profiles (id, user_id, first_name, last_name, phone, location, organization, created_at, updated_at) VALUES
-- Farmers
('550e8400-e29b-41d4-a716-446655440001', '8cf163d6-ac24-4261-8b94-67ee0cad088a', 'Rajesh', 'Kumar', '+91-9876543210', 'Punjab, India', 'Kumar Farms', '2024-01-15 10:00:00+00', '2024-01-15 10:00:00+00'),
('550e8400-e29b-41d4-a716-446655440002', 'dd2ae68d-db67-4ffc-bafe-c80e735145e4', 'Priya', 'Sharma', '+91-9876543211', 'Haryana, India', 'Sharma Poultry Farm', '2024-01-20 11:00:00+00', '2024-01-20 11:00:00+00'),
('550e8400-e29b-41d4-a716-446655440003', 'd43b9a72-a1e9-40f1-ae59-04a787ea97e1', 'Amit', 'Patel', '+91-9876543212', 'Gujarat, India', 'Patel Mixed Farm', '2024-02-01 09:00:00+00', '2024-02-01 09:00:00+00'),
('550e8400-e29b-41d4-a716-446655440004', 'a55dfc63-db37-4862-b54e-568feb624e67', 'Sunita', 'Singh', '+91-9876543213', 'Uttar Pradesh, India', 'Singh Livestock', '2024-02-10 14:00:00+00', '2024-02-10 14:00:00+00'),
('550e8400-e29b-41d4-a716-446655440005', 'ac36ed60-c3e5-4a6a-a2e9-268f435c6465', 'Vikram', 'Reddy', '+91-9876543214', 'Telangana, India', 'Reddy Poultry', '2024-02-15 16:00:00+00', '2024-02-15 16:00:00+00'),

-- Veterinarians
('550e8400-e29b-41d4-a716-446655440006', '66343fc8-1852-4c7e-a404-17a01e084b63', 'Dr. Anil', 'Verma', '+91-9876543215', 'Delhi, India', 'Delhi Veterinary Clinic', '2024-01-10 08:00:00+00', '2024-01-10 08:00:00+00'),
('550e8400-e29b-41d4-a716-446655440007', 'c2f85507-8b73-4006-8de5-64fb84461a01', 'Dr. Meera', 'Joshi', '+91-9876543216', 'Maharashtra, India', 'Mumbai Animal Hospital', '2024-01-12 12:00:00+00', '2024-01-12 12:00:00+00'),

-- Extension Workers
('550e8400-e29b-41d4-a716-446655440008', 'dc4d464a-668a-46a6-9c5e-62597744275d', 'Suresh', 'Yadav', '+91-9876543217', 'Bihar, India', 'Bihar Agriculture Department', '2024-01-05 09:00:00+00', '2024-01-05 09:00:00+00'),
('550e8400-e29b-41d4-a716-446655440009', '2b51a2d5-9f18-4ded-915f-db301dde0c18', 'Lakshmi', 'Nair', '+91-9876543218', 'Kerala, India', 'Kerala Extension Services', '2024-01-08 10:00:00+00', '2024-01-08 10:00:00+00'),

-- Regulators
('550e8400-e29b-41d4-a716-446655440010', '81bf9ee5-4a2e-415d-a40a-c79f15e00945', 'Rajesh', 'Gupta', '+91-9876543219', 'Delhi, India', 'Ministry of Agriculture', '2024-01-01 08:00:00+00', '2024-01-01 08:00:00+00'),

-- Researchers
('550e8400-e29b-41d4-a716-446655440011', 'f59b57e4-d3e1-4936-a295-d8888bd7447b', 'Dr. Sarah', 'Wilson', '+91-9876543220', 'Bangalore, India', 'Indian Institute of Science', '2024-01-03 11:00:00+00', '2024-01-03 11:00:00+00')
ON CONFLICT (user_id) DO NOTHING;

-- Insert user roles
INSERT INTO public.user_roles (user_id, role, created_at) VALUES
-- Farmers
('8cf163d6-ac24-4261-8b94-67ee0cad088a', 'farmer', '2024-01-15 10:00:00+00'),
('dd2ae68d-db67-4ffc-bafe-c80e735145e4', 'farmer', '2024-01-20 11:00:00+00'),
('d43b9a72-a1e9-40f1-ae59-04a787ea97e1', 'farmer', '2024-02-01 09:00:00+00'),
('a55dfc63-db37-4862-b54e-568feb624e67', 'farmer', '2024-02-10 14:00:00+00'),
('ac36ed60-c3e5-4a6a-a2e9-268f435c6465', 'farmer', '2024-02-15 16:00:00+00'),

-- Veterinarians
('66343fc8-1852-4c7e-a404-17a01e084b63', 'veterinarian', '2024-01-10 08:00:00+00'),
('c2f85507-8b73-4006-8de5-64fb84461a01', 'veterinarian', '2024-01-12 12:00:00+00'),

-- Extension Workers
('dc4d464a-668a-46a6-9c5e-62597744275d', 'extension_worker', '2024-01-05 09:00:00+00'),
('2b51a2d5-9f18-4ded-915f-db301dde0c18', 'extension_worker', '2024-01-08 10:00:00+00'),

-- Regulators
('81bf9ee5-4a2e-415d-a40a-c79f15e00945', 'regulator', '2024-01-01 08:00:00+00'),

-- Researchers
('f59b57e4-d3e1-4936-a295-d8888bd7447b', 'researcher', '2024-01-03 11:00:00+00')
ON CONFLICT (user_id, role) DO NOTHING;

-- ==============================================
-- 2. FARMS DATA
-- ==============================================

INSERT INTO public.farms (id, owner_id, name, farm_type, location, size_hectares, animal_count, registration_number, coordinates, created_at, updated_at) VALUES
-- Rajesh Kumar's farms
('f1111111-1111-1111-1111-111111111111', '8cf163d6-ac24-4261-8b94-67ee0cad088a', 'Kumar Pig Farm', 'pig', 'Ludhiana, Punjab', 5.5, 150, 'PUN/PIG/2024/001', POINT(75.8573, 30.9010), '2024-01-15 10:30:00+00', '2024-01-15 10:30:00+00'),
('f1111111-1111-1111-1111-111111111112', '8cf163d6-ac24-4261-8b94-67ee0cad088a', 'Kumar Poultry Unit', 'poultry', 'Amritsar, Punjab', 2.0, 500, 'PUN/POUL/2024/001', POINT(74.8748, 31.6340), '2024-01-20 11:00:00+00', '2024-01-20 11:00:00+00'),

-- Priya Sharma's farms
('f2222222-2222-2222-2222-222222222222', 'dd2ae68d-db67-4ffc-bafe-c80e735145e4', 'Sharma Poultry Farm', 'poultry', 'Gurgaon, Haryana', 3.2, 800, 'HAR/POUL/2024/001', POINT(77.0266, 28.4595), '2024-01-20 11:30:00+00', '2024-01-20 11:30:00+00'),

-- Amit Patel's farms
('f3333333-3333-3333-3333-333333333333', 'd43b9a72-a1e9-40f1-ae59-04a787ea97e1', 'Patel Mixed Farm', 'mixed', 'Ahmedabad, Gujarat', 8.0, 200, 'GUJ/MIX/2024/001', POINT(72.5714, 23.0225), '2024-02-01 09:30:00+00', '2024-02-01 09:30:00+00'),

-- Sunita Singh's farms
('f4444444-4444-4444-4444-444444444444', 'a55dfc63-db37-4862-b54e-568feb624e67', 'Singh Livestock Farm', 'pig', 'Lucknow, Uttar Pradesh', 6.5, 120, 'UP/PIG/2024/001', POINT(80.9462, 26.8467), '2024-02-10 14:30:00+00', '2024-02-10 14:30:00+00'),

-- Vikram Reddy's farms
('f5555555-5555-5555-5555-555555555555', 'ac36ed60-c3e5-4a6a-a2e9-268f435c6465', 'Reddy Poultry Farm', 'poultry', 'Hyderabad, Telangana', 4.0, 1000, 'TEL/POUL/2024/001', POINT(78.4867, 17.3850), '2024-02-15 16:30:00+00', '2024-02-15 16:30:00+00');

-- ==============================================
-- 3. BIOSECURITY ASSESSMENTS
-- ==============================================

INSERT INTO public.biosecurity_assessments (id, farm_id, assessor_id, status, risk_score, assessment_data, recommendations, created_at, updated_at) VALUES
-- Dr. Anil Verma's assessments
('a1111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', '66343fc8-1852-4c7e-a404-17a01e084b63', 'completed', 75, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": false, "feed_storage": true, "water_quality": true, "waste_management": true, "staff_training": false, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Good overall biosecurity practices. Need to improve vehicle disinfection and staff training.', '2024-01-25 10:00:00+00', '2024-01-25 10:00:00+00'),

('a1111111-1111-1111-1111-111111111112', 'f1111111-1111-1111-1111-111111111112', '66343fc8-1852-4c7e-a404-17a01e084b63', 'completed', 85, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": true, "feed_storage": true, "water_quality": true, "waste_management": true, "staff_training": true, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Excellent biosecurity standards maintained. Regular monitoring recommended.', '2024-01-30 14:00:00+00', '2024-01-30 14:00:00+00'),

('a2222222-2222-2222-2222-222222222222', 'f2222222-2222-2222-2222-222222222222', '66343fc8-1852-4c7e-a404-17a01e084b63', 'completed', 90, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": true, "feed_storage": true, "water_quality": true, "waste_management": true, "staff_training": true, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Outstanding biosecurity implementation. Model farm for the region.', '2024-02-05 09:00:00+00', '2024-02-05 09:00:00+00'),

-- Dr. Meera Joshi's assessments
('a3333333-3333-3333-3333-333333333333', 'f3333333-3333-3333-3333-333333333333', 'c2f85507-8b73-4006-8de5-64fb84461a01', 'completed', 65, 
 '{"biosecurity_plan": true, "visitor_control": false, "vehicle_disinfection": false, "feed_storage": true, "water_quality": false, "waste_management": true, "staff_training": false, "emergency_procedures": false, "record_keeping": true, "veterinary_checks": true}', 
 'Several areas need improvement. Priority: visitor control and water quality testing.', '2024-02-12 11:00:00+00', '2024-02-12 11:00:00+00'),

('a4444444-4444-4444-4444-444444444444', 'f4444444-4444-4444-4444-444444444444', 'c2f85507-8b73-4006-8de5-64fb84461a01', 'completed', 80, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": true, "feed_storage": true, "water_quality": true, "waste_management": true, "staff_training": true, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Good compliance with biosecurity protocols. Minor improvements in record keeping.', '2024-02-18 15:00:00+00', '2024-02-18 15:00:00+00'),

-- Extension Worker assessments
('a5555555-5555-5555-5555-555555555555', 'f5555555-5555-5555-5555-555555555555', 'dc4d464a-668a-46a6-9c5e-62597744275d', 'draft', 70, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": false, "feed_storage": true, "water_quality": true, "waste_management": false, "staff_training": true, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Assessment in progress. Initial findings show good practices with room for improvement.', '2024-02-20 10:00:00+00', '2024-02-20 10:00:00+00'),

-- Recent assessments for regulator dashboard
('a6666666-6666-6666-6666-666666666666', 'f1111111-1111-1111-1111-111111111111', '66343fc8-1852-4c7e-a404-17a01e084b63', 'reviewed', 88, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": true, "feed_storage": true, "water_quality": true, "waste_management": true, "staff_training": true, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Follow-up assessment shows significant improvement. All recommendations implemented.', '2024-03-01 09:00:00+00', '2024-03-01 09:00:00+00'),

('a7777777-7777-7777-7777-777777777777', 'f2222222-2222-2222-2222-222222222222', 'c2f85507-8b73-4006-8de5-64fb84461a01', 'completed', 92, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": true, "feed_storage": true, "water_quality": true, "waste_management": true, "staff_training": true, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Exceptional biosecurity standards. Recommended for certification.', '2024-03-05 14:00:00+00', '2024-03-05 14:00:00+00');

-- ==============================================
-- 4. COMPLIANCE RECORDS
-- ==============================================

INSERT INTO public.compliance_records (id, farm_id, checklist_item, is_compliant, notes, checked_by, checked_at, created_at) VALUES
-- Kumar Pig Farm compliance records
('c1111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 'Biosecurity plan documented and updated', true, 'Plan updated quarterly, well maintained', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-01-25 10:30:00+00', '2024-01-25 10:30:00+00'),
('c1111111-1111-1111-1111-111111111112', 'f1111111-1111-1111-1111-111111111111', 'Visitor access control and log maintained', true, 'Visitor log properly maintained', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-01-25 10:35:00+00', '2024-01-25 10:35:00+00'),
('c1111111-1111-1111-1111-111111111113', 'f1111111-1111-1111-1111-111111111111', 'Vehicle disinfection protocols implemented', false, 'Protocol exists but not consistently followed', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-01-25 10:40:00+00', '2024-01-25 10:40:00+00'),
('c1111111-1111-1111-1111-111111111114', 'f1111111-1111-1111-1111-111111111111', 'Feed storage meets safety standards', true, 'Feed storage area clean and secure', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-01-25 10:45:00+00', '2024-01-25 10:45:00+00'),
('c1111111-1111-1111-1111-111111111115', 'f1111111-1111-1111-1111-111111111111', 'Water quality testing conducted monthly', true, 'Monthly testing records available', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-01-25 10:50:00+00', '2024-01-25 10:50:00+00'),

-- Sharma Poultry Farm compliance records
('c2222222-2222-2222-2222-222222222222', 'f2222222-2222-2222-2222-222222222222', 'Biosecurity plan documented and updated', true, 'Comprehensive plan in place', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-05 09:00:00+00', '2024-02-05 09:00:00+00'),
('c2222222-2222-2222-2222-222222222223', 'f2222222-2222-2222-2222-222222222222', 'Access control measures for all entry points', true, 'All entry points properly secured', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-05 09:05:00+00', '2024-02-05 09:05:00+00'),
('c2222222-2222-2222-2222-222222222224', 'f2222222-2222-2222-2222-222222222222', 'Footbath disinfection at farm entrance', true, 'Footbath properly maintained and used', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-05 09:10:00+00', '2024-02-05 09:10:00+00'),
('c2222222-2222-2222-2222-222222222225', 'f2222222-2222-2222-2222-222222222222', 'Feed storage protected from contamination', true, 'Feed storage area excellent condition', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-05 09:15:00+00', '2024-02-05 09:15:00+00'),
('c2222222-2222-2222-2222-222222222226', 'f2222222-2222-2222-2222-222222222222', 'Water system cleaned and tested regularly', true, 'Water system maintenance excellent', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-05 09:20:00+00', '2024-02-05 09:20:00+00'),

-- Patel Mixed Farm compliance records
('c3333333-3333-3333-3333-333333333333', 'f3333333-3333-3333-3333-333333333333', 'Comprehensive biosecurity plan for all species', true, 'Multi-species plan well developed', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-12 11:00:00+00', '2024-02-12 11:00:00+00'),
('c3333333-3333-3333-3333-333333333334', 'f3333333-3333-3333-3333-333333333333', 'Species separation protocols maintained', false, 'Some mixing observed between species areas', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-12 11:05:00+00', '2024-02-12 11:05:00+00'),
('c3333333-3333-3333-3333-333333333335', 'f3333333-3333-3333-3333-333333333333', 'Cross-contamination prevention measures', false, 'Need better separation between species', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-12 11:10:00+00', '2024-02-12 11:10:00+00'),
('c3333333-3333-3333-3333-333333333336', 'f3333333-3333-3333-3333-333333333333', 'Unified visitor control system', true, 'Single visitor control system implemented', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-12 11:15:00+00', '2024-02-12 11:15:00+00'),
('c3333333-3333-3333-3333-333333333337', 'f3333333-3333-3333-3333-333333333333', 'Equipment disinfection between areas', true, 'Proper disinfection protocols followed', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-12 11:20:00+00', '2024-02-12 11:20:00+00');

-- ==============================================
-- 5. TRAINING MODULES
-- ==============================================

INSERT INTO public.training_modules (id, title, description, content, farm_type, duration_minutes, is_published, created_by, created_at, updated_at) VALUES
-- Extension Worker created modules
('11111111-1111-1111-1111-111111111111', 'Basic Biosecurity for Pig Farms', 'Comprehensive guide to biosecurity practices for pig farming operations', 
 '{"sections": [{"title": "Introduction", "content": "Understanding biosecurity principles"}, {"title": "Farm Layout", "content": "Designing secure farm layouts"}, {"title": "Visitor Management", "content": "Controlling farm access"}]}', 
 'pig', 45, true, 'dc4d464a-668a-46a6-9c5e-62597744275d', '2024-01-10 09:00:00+00', '2024-01-10 09:00:00+00'),

('22222222-2222-2222-2222-222222222222', 'Poultry Health Management', 'Essential health management practices for poultry operations', 
 '{"sections": [{"title": "Disease Prevention", "content": "Preventing common poultry diseases"}, {"title": "Vaccination", "content": "Vaccination schedules and protocols"}, {"title": "Monitoring", "content": "Health monitoring techniques"}]}', 
 'poultry', 60, true, 'dc4d464a-668a-46a6-9c5e-62597744275d', '2024-01-15 10:00:00+00', '2024-01-15 10:00:00+00'),

('33333333-3333-3333-3333-333333333333', 'Mixed Farm Operations', 'Managing biosecurity in mixed livestock operations', 
 '{"sections": [{"title": "Species Separation", "content": "Keeping different species separate"}, {"title": "Shared Resources", "content": "Managing shared equipment and areas"}, {"title": "Risk Assessment", "content": "Assessing cross-contamination risks"}]}', 
 'mixed', 75, true, '2b51a2d5-9f18-4ded-915f-db301dde0c18', '2024-01-20 11:00:00+00', '2024-01-20 11:00:00+00'),

('44444444-4444-4444-4444-444444444444', 'Emergency Response Procedures', 'How to handle disease outbreaks and emergencies', 
 '{"sections": [{"title": "Outbreak Response", "content": "Steps to take during disease outbreaks"}, {"title": "Communication", "content": "Reporting and communication protocols"}, {"title": "Recovery", "content": "Farm recovery and decontamination"}]}', 
 null, 90, true, '2b51a2d5-9f18-4ded-915f-db301dde0c18', '2024-01-25 12:00:00+00', '2024-01-25 12:00:00+00'),

('55555555-5555-5555-5555-555555555555', 'Record Keeping Best Practices', 'Maintaining proper farm records for compliance', 
 '{"sections": [{"title": "Documentation", "content": "What records to maintain"}, {"title": "Digital Tools", "content": "Using digital record keeping"}, {"title": "Audit Preparation", "content": "Preparing for compliance audits"}]}', 
 null, 30, true, 'dc4d464a-668a-46a6-9c5e-62597744275d', '2024-02-01 13:00:00+00', '2024-02-01 13:00:00+00'),

-- Draft module
('66343fc8-1852-4c7e-a404-17a01e084b63', 'Advanced Biosecurity Technologies', 'Modern technologies for farm biosecurity', 
 '{"sections": [{"title": "IoT Sensors", "content": "Using sensors for monitoring"}, {"title": "Automation", "content": "Automated disinfection systems"}]}', 
 null, 120, false, '2b51a2d5-9f18-4ded-915f-db301dde0c18', '2024-02-10 14:00:00+00', '2024-02-10 14:00:00+00');

-- ==============================================
-- 6. USER TRAINING PROGRESS
-- ==============================================

INSERT INTO public.user_training_progress (id, user_id, module_id, progress_percentage, completed, completed_at, created_at, updated_at) VALUES
-- Rajesh Kumar's progress
('11111111-1111-1111-1111-111111111111', '8cf163d6-ac24-4261-8b94-67ee0cad088a', '11111111-1111-1111-1111-111111111111', 100, true, '2024-01-20 15:00:00+00', '2024-01-15 10:00:00+00', '2024-01-20 15:00:00+00'),
('11111111-1111-1111-1111-111111111112', '8cf163d6-ac24-4261-8b94-67ee0cad088a', '44444444-4444-4444-4444-444444444444', 75, false, null, '2024-01-25 11:00:00+00', '2024-01-25 11:00:00+00'),
('11111111-1111-1111-1111-111111111113', '8cf163d6-ac24-4261-8b94-67ee0cad088a', '55555555-5555-5555-5555-555555555555', 100, true, '2024-02-05 16:00:00+00', '2024-02-01 14:00:00+00', '2024-02-05 16:00:00+00'),

-- Priya Sharma's progress
('22222222-2222-2222-2222-222222222222', 'dd2ae68d-db67-4ffc-bafe-c80e735145e4', '22222222-2222-2222-2222-222222222222', 100, true, '2024-01-25 12:00:00+00', '2024-01-20 10:00:00+00', '2024-01-25 12:00:00+00'),
('22222222-2222-2222-2222-222222222223', 'dd2ae68d-db67-4ffc-bafe-c80e735145e4', '44444444-4444-4444-4444-444444444444', 100, true, '2024-02-01 14:00:00+00', '2024-01-25 12:00:00+00', '2024-02-01 14:00:00+00'),
('22222222-2222-2222-2222-222222222224', 'dd2ae68d-db67-4ffc-bafe-c80e735145e4', '55555555-5555-5555-5555-555555555555', 50, false, null, '2024-02-05 15:00:00+00', '2024-02-05 15:00:00+00'),

-- Amit Patel's progress
('33333333-3333-3333-3333-333333333333', 'd43b9a72-a1e9-40f1-ae59-04a787ea97e1', '33333333-3333-3333-3333-333333333333', 100, true, '2024-02-15 11:00:00+00', '2024-02-01 12:00:00+00', '2024-02-15 11:00:00+00'),
('33333333-3333-3333-3333-333333333334', 'd43b9a72-a1e9-40f1-ae59-04a787ea97e1', '44444444-4444-4444-4444-444444444444', 25, false, null, '2024-02-20 13:00:00+00', '2024-02-20 13:00:00+00'),

-- Sunita Singh's progress
('44444444-4444-4444-4444-444444444444', 'a55dfc63-db37-4862-b54e-568feb624e67', '11111111-1111-1111-1111-111111111111', 100, true, '2024-02-15 16:00:00+00', '2024-02-10 15:00:00+00', '2024-02-15 16:00:00+00'),
('44444444-4444-4444-4444-444444444445', 'a55dfc63-db37-4862-b54e-568feb624e67', '55555555-5555-5555-5555-555555555555', 100, true, '2024-02-20 10:00:00+00', '2024-02-15 16:00:00+00', '2024-02-20 10:00:00+00'),

-- Vikram Reddy's progress
('55555555-5555-5555-5555-555555555555', 'ac36ed60-c3e5-4a6a-a2e9-268f435c6465', '22222222-2222-2222-2222-222222222222', 80, false, null, '2024-02-20 14:00:00+00', '2024-02-20 14:00:00+00'),
('55555555-5555-5555-5555-555555555556', 'ac36ed60-c3e5-4a6a-a2e9-268f435c6465', '44444444-4444-4444-4444-444444444444', 100, true, '2024-02-25 11:00:00+00', '2024-02-20 14:00:00+00', '2024-02-25 11:00:00+00');

-- ==============================================
-- 7. ALERTS
-- ==============================================

INSERT INTO public.alerts (id, title, message, severity, location, farm_type, is_active, created_by, created_at) VALUES
-- Active alerts
('a1111111-1111-1111-1111-111111111111', 'Avian Influenza Alert - Northern Region', 'High risk of avian influenza detected in northern states. All poultry farms must implement enhanced biosecurity measures immediately.', 'high', 'Northern India', 'poultry', true, '81bf9ee5-4a2e-415d-a40a-c79f15e00945', '2024-03-01 08:00:00+00'),

('a2222222-2222-2222-2222-222222222222', 'African Swine Fever Prevention', 'ASF cases reported in neighboring regions. Pig farms should review and strengthen biosecurity protocols.', 'medium', 'Western India', 'pig', true, '81bf9ee5-4a2e-415d-a40a-c79f15e00945', '2024-03-05 10:00:00+00'),

('a3333333-3333-3333-3333-333333333333', 'Weather Advisory - Heavy Rains', 'Heavy rainfall expected in next 48 hours. Ensure proper drainage and protect feed storage areas.', 'low', 'Southern India', null, true, '81bf9ee5-4a2e-415d-a40a-c79f15e00945', '2024-03-08 14:00:00+00'),

('a4444444-4444-4444-4444-444444444444', 'Compliance Deadline Reminder', 'Quarterly compliance reports due by end of month. Ensure all records are updated and submitted.', 'medium', 'All Regions', null, true, '81bf9ee5-4a2e-415d-a40a-c79f15e00945', '2024-03-10 09:00:00+00'),

-- Inactive alerts
('a5555555-5555-5555-5555-555555555555', 'Training Program Launch', 'New biosecurity training modules now available. Complete by end of quarter for certification.', 'low', 'All Regions', null, false, '81bf9ee5-4a2e-415d-a40a-c79f15e00945', '2024-02-15 11:00:00+00'),

('a6666666-6666-6666-6666-666666666666', 'Critical: Disease Outbreak', 'Immediate action required. Suspected disease outbreak in region. All farms on high alert.', 'critical', 'Eastern India', 'mixed', false, '81bf9ee5-4a2e-415d-a40a-c79f15e00945', '2024-02-20 07:00:00+00');

-- ==============================================
-- 8. USER ALERTS (Notifications to specific users)
-- ==============================================

INSERT INTO public.user_alerts (id, user_id, alert_id, read_at, created_at) VALUES
-- Alert notifications for farmers
('11111111-1111-1111-1111-111111111111', '8cf163d6-ac24-4261-8b94-67ee0cad088a', 'a1111111-1111-1111-1111-111111111111', null, '2024-03-01 08:00:00+00'),
('11111111-1111-1111-1111-111111111112', '8cf163d6-ac24-4261-8b94-67ee0cad088a', 'a2222222-2222-2222-2222-222222222222', '2024-03-05 10:00:00+00', '2024-03-05 10:00:00+00'),
('11111111-1111-1111-1111-111111111113', '8cf163d6-ac24-4261-8b94-67ee0cad088a', 'a4444444-4444-4444-4444-444444444444', null, '2024-03-10 09:00:00+00'),

('22222222-2222-2222-2222-222222222222', 'dd2ae68d-db67-4ffc-bafe-c80e735145e4', 'a1111111-1111-1111-1111-111111111111', '2024-03-01 08:00:00+00', '2024-03-01 08:00:00+00'),
('22222222-2222-2222-2222-222222222223', 'dd2ae68d-db67-4ffc-bafe-c80e735145e4', 'a3333333-3333-3333-3333-333333333333', null, '2024-03-08 14:00:00+00'),
('22222222-2222-2222-2222-222222222224', 'dd2ae68d-db67-4ffc-bafe-c80e735145e4', 'a4444444-4444-4444-4444-444444444444', '2024-03-10 09:00:00+00', '2024-03-10 09:00:00+00'),

('33333333-3333-3333-3333-333333333333', 'd43b9a72-a1e9-40f1-ae59-04a787ea97e1', 'a2222222-2222-2222-2222-222222222222', null, '2024-03-05 10:00:00+00'),
('33333333-3333-3333-3333-333333333334', 'd43b9a72-a1e9-40f1-ae59-04a787ea97e1', 'a3333333-3333-3333-3333-333333333333', '2024-03-08 14:00:00+00', '2024-03-08 14:00:00+00'),

-- Veterinarian notifications
('66666666-6666-6666-6666-666666666666', '66343fc8-1852-4c7e-a404-17a01e084b63', 'a1111111-1111-1111-1111-111111111111', '2024-03-01 08:00:00+00', '2024-03-01 08:00:00+00'),
('66666666-6666-6666-6666-666666666667', '66343fc8-1852-4c7e-a404-17a01e084b63', 'a2222222-2222-2222-2222-222222222222', '2024-03-05 10:00:00+00', '2024-03-05 10:00:00+00'),

('77777777-7777-7777-7777-777777777777', 'c2f85507-8b73-4006-8de5-64fb84461a01', 'a1111111-1111-1111-1111-111111111111', null, '2024-03-01 08:00:00+00'),
('77777777-7777-7777-7777-777777777778', 'c2f85507-8b73-4006-8de5-64fb84461a01', 'a2222222-2222-2222-2222-222222222222', '2024-03-05 10:00:00+00', '2024-03-05 10:00:00+00');

-- ==============================================
-- 9. ADDITIONAL COMPLIANCE RECORDS FOR BETTER DEMO
-- ==============================================

-- More compliance records for different farms
INSERT INTO public.compliance_records (id, farm_id, checklist_item, is_compliant, notes, checked_by, checked_at, created_at) VALUES
-- Singh Livestock Farm compliance
('c4444444-4444-4444-4444-444444444444', 'f4444444-4444-4444-4444-444444444444', 'Biosecurity plan documented and updated', true, 'Plan comprehensive and up to date', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-18 15:00:00+00', '2024-02-18 15:00:00+00'),
('c4444444-4444-4444-4444-444444444445', 'f4444444-4444-4444-4444-444444444444', 'Visitor access control and log maintained', true, 'Excellent visitor management system', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-18 15:05:00+00', '2024-02-18 15:05:00+00'),
('c4444444-4444-4444-4444-444444444446', 'f4444444-4444-4444-4444-444444444444', 'Vehicle disinfection protocols implemented', true, 'Protocols well implemented and followed', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-18 15:10:00+00', '2024-02-18 15:10:00+00'),
('c4444444-4444-4444-4444-444444444447', 'f4444444-4444-4444-4444-444444444444', 'Feed storage meets safety standards', true, 'Feed storage area excellent', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-18 15:15:00+00', '2024-02-18 15:15:00+00'),
('c4444444-4444-4444-4444-444444444448', 'f4444444-4444-4444-4444-444444444444', 'Water quality testing conducted monthly', true, 'Regular testing maintained', '66343fc8-1852-4c7e-a404-17a01e084b63', '2024-02-18 15:20:00+00', '2024-02-18 15:20:00+00'),

-- Reddy Poultry Farm compliance
('c5555555-5555-5555-5555-555555555555', 'f5555555-5555-5555-5555-555555555555', 'Biosecurity plan documented and updated', false, 'Plan needs updating with latest guidelines', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-20 10:00:00+00', '2024-02-20 10:00:00+00'),
('c5555555-5555-5555-5555-555555555556', 'f5555555-5555-5555-5555-555555555555', 'Access control measures for all entry points', true, 'Good access control implementation', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-20 10:05:00+00', '2024-02-20 10:05:00+00'),
('c5555555-5555-5555-5555-555555555557', 'f5555555-5555-5555-5555-555555555555', 'Footbath disinfection at farm entrance', true, 'Footbath properly maintained', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-20 10:10:00+00', '2024-02-20 10:10:00+00'),
('c5555555-5555-5555-5555-555555555558', 'f5555555-5555-5555-5555-555555555555', 'Feed storage protected from contamination', false, 'Feed storage area needs improvement', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-20 10:15:00+00', '2024-02-20 10:15:00+00'),
('c5555555-5555-5555-5555-555555555559', 'f5555555-5555-5555-5555-555555555555', 'Water system cleaned and tested regularly', true, 'Water system maintenance good', 'c2f85507-8b73-4006-8de5-64fb84461a01', '2024-02-20 10:20:00+00', '2024-02-20 10:20:00+00');

-- ==============================================
-- 10. ADDITIONAL BIOSECURITY ASSESSMENTS
-- ==============================================

-- More recent assessments for better demo data
INSERT INTO public.biosecurity_assessments (id, farm_id, assessor_id, status, risk_score, assessment_data, recommendations, created_at, updated_at) VALUES
-- Recent assessments for better dashboard data
('a8888888-8888-8888-8888-888888888888', 'f4444444-4444-4444-4444-444444444444', '66343fc8-1852-4c7e-a404-17a01e084b63', 'completed', 95, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": true, "feed_storage": true, "water_quality": true, "waste_management": true, "staff_training": true, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Exceptional biosecurity implementation. All protocols followed perfectly.', '2024-03-02 10:00:00+00', '2024-03-02 10:00:00+00'),

('a9999999-9999-9999-9999-999999999999', 'f5555555-5555-5555-5555-555555555555', 'c2f85507-8b73-4006-8de5-64fb84461a01', 'draft', 60, 
 '{"biosecurity_plan": false, "visitor_control": true, "vehicle_disinfection": false, "feed_storage": false, "water_quality": true, "waste_management": true, "staff_training": false, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Assessment in progress. Several areas need immediate attention and improvement.', '2024-03-05 14:00:00+00', '2024-03-05 14:00:00+00'),

('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'f1111111-1111-1111-1111-111111111112', '66343fc8-1852-4c7e-a404-17a01e084b63', 'reviewed', 92, 
 '{"biosecurity_plan": true, "visitor_control": true, "vehicle_disinfection": true, "feed_storage": true, "water_quality": true, "waste_management": true, "staff_training": true, "emergency_procedures": true, "record_keeping": true, "veterinary_checks": true}', 
 'Follow-up review shows excellent improvement. All previous recommendations implemented.', '2024-03-08 11:00:00+00', '2024-03-08 11:00:00+00');
