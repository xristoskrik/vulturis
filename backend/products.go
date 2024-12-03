package main

import (
	"context"
	"encoding/json"
	"net/http"

	//"github.com/google/uuid"
	_ "github.com/lib/pq"
	//"github.com/xristoskrik/vulturis/auth"
	"github.com/xristoskrik/vulturis/internal/database"
)

//type ApiConfig struct {
//	DB *database.Queries
//}

func (cfg *ApiConfig) ProductCreateHandler(w http.ResponseWriter, r *http.Request) {
	//user struct
	var create_product database.Product
	//decoder
	decoder := json.NewDecoder(r.Body)

	//decoding json
	err := decoder.Decode(&create_product)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}

	//create user
	/**/product, err := cfg.DB.CreateProduct(context.Background(), database.CreateProductParams{
		Name:           create_product.Name,
		Stock:          create_product.Stock,
		Description:    create_product.Description,
	})
	if err != nil {
		RespondWithError(w, http.StatusConflict, "Product already exists", err)
		return
	}

	RespondWithError(w, http.StatusConflict, "test", err)

	//respond with created user
	RespondWithJSON(w, 201, ("created Product " + product.Name))
}
