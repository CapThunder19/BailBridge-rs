-- Create bail_applications table
CREATE TABLE IF NOT EXISTS bail_applications (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    application_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Personal Information
    applicant_name VARCHAR(255) NOT NULL,
    father_husband_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    
    -- Case Details
    fir_number VARCHAR(100) NOT NULL,
    police_station VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    date_of_arrest TIMESTAMP WITH TIME ZONE NOT NULL,
    sections_applied TEXT NOT NULL,
    case_description TEXT NOT NULL,
    
    -- Bail Details
    bail_type VARCHAR(50) NOT NULL, -- regular, anticipatory, interim
    previous_bail_applications BOOLEAN DEFAULT FALSE,
    previous_bail_details TEXT,
    
    -- Supporting Information
    surety_details TEXT,
    medical_condition TEXT,
    family_dependents TEXT,
    employment_details TEXT,
    
    -- Status
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, under_review, approved, rejected
    assigned_lawyer_id UUID REFERENCES users(id),
    judge_id UUID REFERENCES users(id),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_bail_applications_user_id ON bail_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_bail_applications_application_number ON bail_applications(application_number);
CREATE INDEX IF NOT EXISTS idx_bail_applications_status ON bail_applications(status);
CREATE INDEX IF NOT EXISTS idx_bail_applications_assigned_lawyer ON bail_applications(assigned_lawyer_id);
CREATE INDEX IF NOT EXISTS idx_bail_applications_judge ON bail_applications(judge_id);
CREATE INDEX IF NOT EXISTS idx_bail_applications_created_at ON bail_applications(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_bail_applications_updated_at 
    BEFORE UPDATE ON bail_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
