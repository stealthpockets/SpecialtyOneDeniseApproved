-- Populate property_types table with business property types
-- This migration adds the core property types for Specialty One's business focus

INSERT INTO property_types (name) VALUES 
('Manufactured Housing'), 
('RV Parks'), 
('Self-Storage'), 
('Multi-Asset')
ON CONFLICT (name) DO NOTHING;
