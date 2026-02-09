#!/bin/bash
# Start script for BailBridge API

echo "Starting BailBridge API..."
echo "Binary location: ./target/release/BailBridge-rs"

# Check if binary exists
if [ ! -f "./target/release/BailBridge-rs" ]; then
    echo "Error: Binary not found at ./target/release/BailBridge-rs"
    echo "Please run 'cargo build --release' first"
    exit 1
fi

# Make binary executable
chmod +x ./target/release/BailBridge-rs

# Run the application
exec ./target/release/BailBridge-rs
