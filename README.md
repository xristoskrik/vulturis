# Vulturis - E-Shop for Books

Welcome to **Vulturis**, an advanced e-commerce platform for book lovers! This project provides a scalable and modern online bookstore using cutting-edge technologies.

## 🚀 Features
- 📚 Browse and purchase books with an intuitive UI
- 🔍 Search and filter books by category, author, and price
- 🛒 Shopping cart and secure checkout system
- 🏷️ User authentication 
- 🔄 RESTful API for seamless frontend-backend communication

## 🛠️ Tech Stack
- **Frontend:** React (Next.js)
- **Backend:** Go (Golang)
- **Database:** PostgreSQL
- **Containerization:** Docker

## 📂 Project Structure
```
├── frontend/          # React frontend
├── backend/           # Go backend API
├── db/                # PostgreSQL database setup
├── docker/            # Docker configurations
├── docs/              # Documentation and API references
└── README.md          # Project documentation
```

## 🏗️ Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Docker & Docker Compose
- Go
- Node.js & npm/yarn
- PostgreSQL

### Steps to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/xristoskrik/vulturis.git
   cd vulturis
   ```
2. Start the backend service:
   ```sh
   cd backend
   go run main.go
   ```
3. Start the frontend service:
   ```sh
   cd vulturis/frontend
   npm install  # or yarn install
   npm run dev  # or yarn dev
   ```
4. Run with Docker (optional):
   ```sh
   docker-compose up --build
   ```

## 📬 Contact
For any issues or contributions, feel free to create an issue or submit a PR!
