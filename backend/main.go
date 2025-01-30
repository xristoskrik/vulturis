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

type ApiConfig struct {
	DB     *database.Queries
	MAIN   *sql.DB
}

//type ApiConfigForTransact struct {
//	DB *sql.DB
//}

func main() {

	const port = ":8080"
	//loading environment variables
	godotenv.Load()

	//loading the secret key and database url
	dbURL := os.Getenv("DB_URL")

	//open postgres db
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		fmt.Println(err)
		return
	}

	defer db.Close()

	// Initialize a new Queries instance, which provides methods to execute
	// SQL queries and commands using the database connection pool (db).
	dbQueries := database.New(db)

	//Initialize api config
	apiCfg := ApiConfig{
		MAIN: db,
		DB:   dbQueries,

	}

	//apiCfgForTrancact := ApiConfigForTransact{
	//	DB: db,
	//}

	//router
	r := chi.NewRouter()

	//cors
	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	r.Use(cors.Handler)

	//endpoints
	r.Route("/api", func(r chi.Router) {
		r.Post("/users",   apiCfg.UserCreateHandler)
		r.Get("/users",    apiCfg.UserGetHandler)
		r.Put("/users",    apiCfg.UserUpdateHandler)
		r.Delete("/users", apiCfg.UserDeleteHandler)

		r.Post("/orders",   apiCfg.OrderCreateHandler)		//AUTH
		r.Get("/orders",    apiCfg.OrderGetHandler)		//AUTH
		r.Put("/orders",    apiCfg.OrderUpdateHandler) 		//ADMIN
		r.Delete("/orders", apiCfg.OrderDeleteHandler)		//ADMIN NOT USED

		r.Post("/products",   apiCfg.ProductCreateHandler)	//ADMIN
                r.Get("/products",    apiCfg.ProductGetHandler)		//PUBLIC
		r.Put("/products",    apiCfg.ProductUpdateHandler)	//ADMIN
		r.Delete("/products", apiCfg.ProductDeleteHandler)	//ADMIN

		//--------------------//

		r.Post("/orders/products",   apiCfg.OrderedProductsCreateHandler)	//ADMIN -- NOT USED
		r.Get("/orders/products",    apiCfg.OrderedProductsGetHandler)		//AUTH
		r.Put("/orders/products",    apiCfg.OrderedProductsUpdateHandler) 	//ADMIN -- NOT USED
		r.Delete("/orders/products", apiCfg.OrderedProductsDeleteHandler)	//ADMIN -- NOT USED

		r.Post("/cart",   apiCfg.CartCreateHandler)		//AUTH
		r.Get("/cart",    apiCfg.CartGetHandler)		//AUTH
		r.Put("/cart",    apiCfg.CartUpdateHandler) 		//AUTH SOME ADMIN
		r.Delete("/cart", apiCfg.CartDeleteHandler)		//AUTH

		/*
			r.Post("/users/login", apiCfg.LoginUserHandler)
			r.Post("/users/login", apiCfg.LoginUserHandler)
			r.Post("/users/logout", apiCfg.UserLogoutHandler)
		*/

	})

	//serve
	log.Printf("on port: %s\n", port)
	log.Fatal(http.ListenAndServe(port, r))

}
