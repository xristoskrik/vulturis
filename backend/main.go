package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/xristoskrik/vulturis/internal/database"
)

func main() {

	const port = ":8080"
	//loading environment variables
	godotenv.Load()
	var dbURL string
	var db_str string
	//loading the secret key and database url
	platform :=  os.Getenv("PLATFORM")
	if platform == "dev"{
		dbURL = os.Getenv("DB_URL")
		db_str = "dev"
	}else{
		dbURL = os.Getenv("TEST_DB_URL")
		db_str = "test"
	}

	
	secret := os.Getenv("SECRET_KEY")
	
	//open postgres db
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("connected to database:" , db_str)

	defer db.Close()

	// Initialize a new Queries instance, which provides methods to execute
	// SQL queries and commands using the database connection pool (db).
	dbQueries := database.New(db)

	//Initialize api config
	apiCfg := ApiConfig{
		DB:        dbQueries,
		SecretKey: secret,
	}

	//router
	r := chi.NewRouter()

	//cors
	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	r.Use(cors.Handler)

	// Serve static files (images) from the "images" folder
	r.Handle("/images/*", http.StripPrefix("/images/", http.FileServer(http.Dir("./images"))))

	// Custom handler for serving images with automatic extension
	r.Get("/images/{filename}", func(w http.ResponseWriter, r *http.Request) {
		// Get the filename from the URL path (e.g., LegendaryLands)
		filename := chi.URLParam(r, "filename")
		// Define possible image extensions
		extensions := []string{".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp",".jfif"}

		// Iterate over possible extensions and check if the file exists
		for _, ext := range extensions {
			filePath := fmt.Sprintf("./images/%s%s", filename, ext)
			if _, err := os.Stat(filePath); err == nil {
				// File exists, serve it
				http.ServeFile(w, r, filePath)
				return
			}
		}

		// If no file is found, return 404
		http.Error(w, "File not found", http.StatusNotFound)
	})
	//endpoints
	r.Route("/api", func(r chi.Router) {
		r.Post("/users", apiCfg.UserCreateHandler)
		r.Delete("/users", apiCfg.UserDeleteHandler)
		r.Put("/users", apiCfg.UserUpdateHandler)
		r.Get("/users", apiCfg.UserGetHandler)
		r.Post("/users/login", apiCfg.UserloginHandler)
		r.Get("/users/authenticate", apiCfg.UserAuthenticateHandler)

		r.Get("/orders", apiCfg.OrdersGetHandler)

		r.Post("/products", apiCfg.ProductCreateHandler)
		r.Get("/products", apiCfg.GetAllProductsHandler)
		r.Put("/products", apiCfg.ProductUpdateHandler)
		r.Delete("/products", apiCfg.ProductDeleteHandler)
	})

	//serve
	log.Printf("on port: %s\n", port)
	log.Fatal(http.ListenAndServe(port, r))
}
