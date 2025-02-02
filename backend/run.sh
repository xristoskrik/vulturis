#!/bin/bash

# Check if an argument is passed (either 'test' or 'dev'), or if no argument is passed (set to 'test' by default)
if [ -z "$1" ] || [ "$1" == "test" ]; then
    PLATFORM="test"
elif [ "$1" == "dev" ]; then
    PLATFORM="dev"
else
    echo "Invalid argument. Please use 'test' or 'dev'."
    exit 1
fi

# Overwrite or append the PLATFORM variable in the .env file
if grep -q "^PLATFORM=" .env; then
    # If PLATFORM exists, replace it
    sed -i '' "s/^PLATFORM=.*/PLATFORM=\"$PLATFORM\"/" .env
else
    # If PLATFORM does not exist, add it to the file
    echo "PLATFORM=\"$PLATFORM\"" >> .env
fi

# Build and run the application
go build -o out && ./out
