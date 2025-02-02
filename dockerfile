# Use the official Go image as the base
FROM golang:1.23.0

# Set the working directory inside the container
WORKDIR /backend

# Copy go.mod and go.sum files for dependency management
COPY backend/go.mod ./
COPY backend/go.sum ./

# Download dependencies early for caching
RUN go mod download

# Install PostgreSQL client utilities (for psql and pg_isready)
RUN apt-get update && apt-get install -y postgresql-client

# Copy the rest of the application code
COPY backend/ ./

# Build the application
RUN go build -o main .

# Copy the migrations into the container
COPY sql/schema /migrations

# Install Goose
RUN go install github.com/pressly/goose/v3/cmd/goose@latest

# Copy the start.sh script into the container
COPY start.sh /start.sh

# Ensure the start.sh script is executable
RUN chmod +x /start.sh

# Expose the application port
EXPOSE 8080

# Set the start.sh script as the entrypoint
ENTRYPOINT ["/start.sh"]
