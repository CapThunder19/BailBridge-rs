# PowerShell script to run bail applications migration

Write-Host "Running bail applications migration..." -ForegroundColor Cyan

# Check if .env file exists
if (-Not (Test-Path ".env")) {
    Write-Host "Error: .env file not found!" -ForegroundColor Red
    exit 1
}

# Read DATABASE_URL from .env
$envContent = Get-Content ".env"
$databaseUrl = ($envContent | Select-String -Pattern "DATABASE_URL=(.+)" | ForEach-Object { $_.Matches.Groups[1].Value })

if (-Not $databaseUrl) {
    Write-Host "Error: DATABASE_URL not found in .env file!" -ForegroundColor Red
    exit 1
}

# Run the migration using psql
psql $databaseUrl -f "migrations\002_create_bail_applications_table.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Bail applications table created successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Migration failed!" -ForegroundColor Red
    exit 1
}
