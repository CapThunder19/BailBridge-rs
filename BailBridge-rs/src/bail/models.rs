use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct BailApplication {
    pub id: Uuid,
    pub user_id: Uuid,
    pub application_number: String,
    
    // Personal Information
    pub applicant_name: String,
    pub father_husband_name: String,
    pub age: i32,
    pub gender: String,
    pub address: String,
    pub phone_number: String,
    pub email: Option<String>,
    
    // Case Details
    pub fir_number: String,
    pub police_station: String,
    pub district: String,
    pub state: String,
    pub date_of_arrest: DateTime<Utc>,
    pub sections_applied: String,
    pub case_description: String,
    
    // Bail Details
    pub bail_type: String,
    pub previous_bail_applications: bool,
    pub previous_bail_details: Option<String>,
    
    // Supporting Information
    pub surety_details: Option<String>,
    pub medical_condition: Option<String>,
    pub family_dependents: Option<String>,
    pub employment_details: Option<String>,
    
    // Status
    pub status: String,
    pub assigned_lawyer_id: Option<Uuid>,
    pub judge_id: Option<Uuid>,
    
    // Metadata
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub submitted_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Deserialize)]
pub struct CreateBailApplication {
    // Personal Information
    pub applicant_name: String,
    pub father_husband_name: String,
    pub age: i32,
    pub gender: String,
    pub address: String,
    pub phone_number: String,
    pub email: Option<String>,
    
    // Case Details
    pub fir_number: String,
    pub police_station: String,
    pub district: String,
    pub state: String,
    pub date_of_arrest: DateTime<Utc>,
    pub sections_applied: String,
    pub case_description: String,
    
    // Bail Details
    pub bail_type: String,
    pub previous_bail_applications: bool,
    pub previous_bail_details: Option<String>,
    
    // Supporting Information
    pub surety_details: Option<String>,
    pub medical_condition: Option<String>,
    pub family_dependents: Option<String>,
    pub employment_details: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct BailApplicationResponse {
    pub id: Uuid,
    pub application_number: String,
    pub status: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct BailApplicationSummary {
    pub id: Uuid,
    pub application_number: String,
    pub applicant_name: String,
    pub fir_number: String,
    pub status: String,
    pub bail_type: String,
    pub created_at: DateTime<Utc>,
}
