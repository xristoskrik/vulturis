FROM golang:1.23.1

# Set the working directory inside the container
WORKDIR /backend

# Copy only go.mod and go.sum from the backend directory
COPY backend/go.mod backend/go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code from the backend directory
COPY backend/ ./

# Build the application
RUN go build -o main .

# Expose the application on port 8080
EXPOSE 8080

# Run the application
CMD ["./main"]