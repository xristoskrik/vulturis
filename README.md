# Vulturis - E-Shop for Books [![Go](https://github.com/xristoskrik/vulturis/actions/workflows/go.yml/badge.svg?branch=main)](https://github.com/xristoskrik/vulturis/actions/workflows/go.yml)

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

## 🧑‍💻Team Members

- [Xristos](https://github.com/xristoskrik) | Backend - Devops Enginner <br/>
- [Nikos](https://github.com/tenmakenzou) | Frontend - UI/UX Developer <br/>
- [Amanda](https://github.com/AmandaHypertextAssasin) | Frontend Developer <br/>
- [Xristoforos](https://github.com/christopherKomn) | Backend Developer <br/>

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

- [Docker & Docker Compose](https://www.docker.com/)
- [Go](https://github.com/golang/go)
- [Node.js](https://nodejs.org/en) & npm/yarn
- [PostgreSQL](https://www.postgresql.org/)
- [Goose](https://github.com/pressly/goose)

### Steps to Run

1. Clone the repository:
   ```sh
   git clone https://github.com/xristoskrik/vulturis.git
   cd vulturis
   ```
2. Start the backend service:

   ```sh
   create .env file inside backend that will be like
   DB_URL="postgres://exampleuser:@localhost:5432/vulturis?sslmode=disable"
   TEST_DB_URL="postgres://exampleuser:@localhost:5432/vulturistest?sslmode=disable"
   PLATFORM="test"
   SECRET_KEY="SECRET"

   ```
   to generate secret

   ```sh 
   openssl rand -hex 16 or 32 or 64

   ```
   Create a Database called vulturis using psSQL using 
   ```sh
   CREATE DATABASE vulturis
   ```
   also for the test database
   ```sh
   CREATE DATABASE vulturistest
   ```
   Then prooceed to  vulturis/sql/schema and do
   ```sh
   goose postgres "postgres://exampleuser:@localhost:5432/vulturistest" 
   and
   goose postgres "postgres://exampleuser:@localhost:5432/vulturis"
   ```
   After you are sure migrations are completed , go to vulturis/backend and do 
   ```sh
   chmod +x ./run.sh
   ```
   And then run it using
   ```sh
   ./run.sh
   ```

   

4. Start the frontend service:
   ```sh
   cd vulturis/frontend
   npm install  # or yarn install
   npm run dev  # or yarn dev
   npm start    # or yarn start
   ```
5. Run with Docker (optional):

   ```sh
    create .env file in the root folder that will be like this
    DB_URL_DOCKER="postgres://root:12345678@postgres:5432/vulturis?sslmode=disable"
    PLATFORM="dev" // or test
    SECRET_KEY="SECRET"
    POSTGRES_USER="root"
    POSTGRES_PASSWORD="12345678"
    POSTGRES_DB="vulturis"

   to generate secret openssl rand -hex 16 or 32 or 64
   ```

   and just do 
   ```sh
   docker compose up -d (Be careful of docker's version the command changes)
   ```
   Both frontend,backend and postgres will work but if you are on windows you might have problems with networks/firewall and frontend will not load.


## 📬 Contact

For any issues or contributions, feel free to create an issue or submit a PR!
