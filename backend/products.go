package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"net/http"

	//"github.com/google/uuid"
	_ "github.com/lib/pq"
	//"github.com/xristoskrik/vulturis/auth"
	"github.com/xristoskrik/vulturis/internal/database"
)

//	type ApiConfig struct {
//		DB *database.Queries
//	}
func deref(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}

func (cfg *ApiConfig) ProductCreateHandler(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name        string  `json:"name"`
		Stock       int32   `json:"stock"`
		Description *string `json:"description"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)

	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}

	//create user
	/**/
	product, err := cfg.DB.CreateProduct(context.Background(), database.CreateProductParams{
		Name:  params.Name,
		Stock: params.Stock,
		Description: sql.NullString{
			String: deref(params.Description),
			Valid:  params.Description != nil,
		},
	})
	if err != nil {
		RespondWithError(w, http.StatusConflict, "Product already exists", err)
		return
	}

	//respond with created user
	RespondWithJSON(w, 201, ("created Product " + product.Name))
}
