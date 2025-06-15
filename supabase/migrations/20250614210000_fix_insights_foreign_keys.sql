-- Fix missing foreign key constraints in insights table
-- The insights table was created using LIKE but foreign key constraints were not copied

-- Add missing foreign key constraint for insights -> authors relationship
ALTER TABLE insights 
ADD CONSTRAINT insights_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES authors(id);

-- Add missing foreign key constraints for other relationships
ALTER TABLE insights 
ADD CONSTRAINT insights_property_type_id_fkey 
FOREIGN KEY (property_type_id) REFERENCES property_types(id);

ALTER TABLE insights 
ADD CONSTRAINT insights_category_id_fkey 
FOREIGN KEY (category_id) REFERENCES categories(id);

-- Note: This resolves the 400 error that occurred when frontend tried to join insights with authors
-- Error was: "Could not find a relationship between 'insights' and 'authors' in the schema cache"
