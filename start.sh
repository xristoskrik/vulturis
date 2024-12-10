#!/bin/bash
set -e



# Run Goose migrations
goose -dir /migrations postgres "$DB_URL" up

# Start the app
exec "$@"

./main