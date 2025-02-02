#!/bin/bash
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -U root -d vulturis; do
  sleep 1
done

# Check if the database exists and create it if it doesn't
psql postgres://root:12345678@postgres:5432/vulturis?sslmode=disable -tc "SELECT 1 FROM pg_database WHERE datname = 'vulturis'" | grep -q 1 || \
    psql postgres://root:12345678@postgres:5432/vulturis?sslmode=disable -c "CREATE DATABASE vulturis"

# Run Goose migrations
goose -dir /migrations postgres "$DB_URL" up

# Start the application
echo "Starting the app..."
exec ./main