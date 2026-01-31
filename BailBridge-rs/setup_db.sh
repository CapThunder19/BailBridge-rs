#!/bin/bash

# BailBridge Database Setup Script

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
else
    echo "Error: .env file not found!"
    exit 1
fi

echo "Setting up BailBridge database..."

# Run migration
psql "$DATABASE_URL" -f migrations/001_create_users_table.sql

echo "Database setup complete!"
