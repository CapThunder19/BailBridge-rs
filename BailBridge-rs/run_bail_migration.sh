#!/bin/bash

# Run the bail applications migration
echo "Running bail applications migration..."

# Get database URL from .env or use default
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found!"
    exit 1
fi

# Run the migration
psql "$DATABASE_URL" -f migrations/002_create_bail_applications_table.sql

if [ $? -eq 0 ]; then
    echo "✓ Bail applications table created successfully!"
else
    echo "✗ Migration failed!"
    exit 1
fi
