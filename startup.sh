#!/bin/bash

set -euo pipefail

# Load environment variables
if [ -f .env ]; then
  source .env
fi

# Validate environment variables
if [ -z "$NEXT_PUBLIC_API_URL" ]; then
  echo "Error: NEXT_PUBLIC_API_URL is not set"
  exit 1
fi

# Project root directory
PROJECT_ROOT=$(pwd)

# Logging
LOG_FILE="$PROJECT_ROOT/logs/startup.log"
log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - $1" >> "$LOG_FILE"
}
log_error() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - ERROR: $1" >&2
}

# Cleanup handler
cleanup() {
  log_info "Cleaning up..."
  # Add cleanup logic for specific services, if needed
  # Example:
  #  pkill -f "your_service_name"
  #  rm -f "$PROJECT_ROOT/logs/startup.log"
  #  rm -f "$PROJECT_ROOT/pid/your_service.pid"
}
trap cleanup EXIT ERR

# Main execution flow
log_info "Starting Fitness Tracker MVP..."

# Install dependencies
log_info "Installing dependencies..."
npm install

# Build the Next.js application
log_info "Building the application..."
npm run build

# Start the development server
log_info "Starting the development server..."
npm run dev

log_info "Fitness Tracker MVP started successfully."