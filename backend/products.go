package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/lib/pq"
	"github.com/xristoskrik/vulturis/internal/database"
)

func deref(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}

func (cfg *ApiConfig) ProductCreateHandler(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name        string  `json:"name"`
		Price       float64 `json:"price"`
		Category    string  `json:"category"`
		Image       string  `json:"image"`
		Stock       int32   `json:"stock"`
		Description *string `json:"description"`
		Slug        string  `json:"slug"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	if err := decoder.Decode(&params); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Wrap image string in sql.NullString
	imageURL := sql.NullString{
		String: params.Image,
		Valid:  params.Image != "",
	}

	// Create the product
	product, err := cfg.DB.CreateProduct(context.Background(), database.CreateProductParams{
		Name:        params.Name,
		Price:       fmt.Sprintf("%.2f", params.Price),
		Category:    params.Category,
		Image:       imageURL, // Use the wrapped sql.NullString here
		Stock:       params.Stock,
		Description: sql.NullString{String: deref(params.Description), Valid: params.Description != nil},
		Slug:        params.Slug,
	})
	if err != nil {
		RespondWithError(w, http.StatusConflict, "Product already exists", err)
		return
	}

	RespondWithJSON(w, http.StatusCreated, product)
}

func (cfg *ApiConfig) ProductGetHandler(w http.ResponseWriter, r *http.Request) {
	action := r.URL.Query().Get("action")
	type parameters struct {
		Code int32  `json:"code"`
		Name string `json:"name"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&params); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	var product interface{}
	var err error

	if action == "code" {
		product, err = cfg.DB.GetProductById(context.Background(), params.Code) // Using sqlc-generated GetProductById method
	} else if action == "name" {
		product, err = cfg.DB.GetProductBySlug(context.Background(), params.Name) // Using sqlc-generated GetProductBySlug method
	}

	if err != nil {
		RespondWithError(w, http.StatusNotFound, "Product not found", err)
		return
	}
	RespondWithJSON(w, http.StatusOK, product)
}

func (cfg *ApiConfig) ProductUpdateHandler(w http.ResponseWriter, r *http.Request) {
	action := r.URL.Query().Get("action")
	type parameters struct {
		Code        int32   `json:"code"`
		Name        string  `json:"name"`
		Stock       int32   `json:"stock"`
		Price       float64 `json:"price"`
		Category    string  `json:"category"`
		Image       string  `json:"image"`
		Description *string `json:"description"`
		Slug        string  `json:"slug"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&params); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Wrap image string in sql.NullString
	imageURL := sql.NullString{
		String: params.Image,
		Valid:  params.Image != "",
	}

	var err error
	switch action {
	case "stock":
		_, err = cfg.DB.UpdateProduct(context.Background(), database.UpdateProductParams{
			Name:        params.Name,
			Price:       fmt.Sprintf("%.2f", params.Price),
			Category:    params.Category,
			Image:       imageURL,
			Stock:       params.Stock,
			Description: sql.NullString{String: deref(params.Description), Valid: params.Description != nil},
			Slug:        params.Slug,
			ID:          params.Code, // Corrected to ID
		})
	case "price":
		_, err = cfg.DB.UpdateProduct(context.Background(), database.UpdateProductParams{
			Name:        params.Name,
			Price:       fmt.Sprintf("%.2f", params.Price),
			Category:    params.Category,
			Image:       imageURL,
			Stock:       params.Stock,
			Description: sql.NullString{String: deref(params.Description), Valid: params.Description != nil},
			Slug:        params.Slug,
			ID:          params.Code, // Corrected to ID
		})
	case "category":
		_, err = cfg.DB.UpdateProduct(context.Background(), database.UpdateProductParams{
			Name:        params.Name,
			Price:       fmt.Sprintf("%.2f", params.Price),
			Category:    params.Category,
			Image:       imageURL,
			Stock:       params.Stock,
			Description: sql.NullString{String: deref(params.Description), Valid: params.Description != nil},
			Slug:        params.Slug,
			ID:          params.Code, // Corrected to ID
		})
	case "image":
		_, err = cfg.DB.UpdateProduct(context.Background(), database.UpdateProductParams{
			Name:        params.Name,
			Price:       fmt.Sprintf("%.2f", params.Price),
			Category:    params.Category,
			Image:       imageURL,
			Stock:       params.Stock,
			Description: sql.NullString{String: deref(params.Description), Valid: params.Description != nil},
			Slug:        params.Slug,
			ID:          params.Code, // Corrected to ID
		})
	case "slug":
		_, err = cfg.DB.UpdateProduct(context.Background(), database.UpdateProductParams{
			Name:        params.Name,
			Price:       fmt.Sprintf("%.2f", params.Price),
			Category:    params.Category,
			Image:       imageURL,
			Stock:       params.Stock,
			Description: sql.NullString{String: deref(params.Description), Valid: params.Description != nil},
			Slug:        params.Slug,
			ID:          params.Code, // Corrected to ID
		})
	default:
		_, err = cfg.DB.UpdateProduct(context.Background(), database.UpdateProductParams{
			Name:        params.Name,
			Price:       fmt.Sprintf("%.2f", params.Price),
			Category:    params.Category,
			Image:       imageURL,
			Stock:       params.Stock,
			Description: sql.NullString{String: deref(params.Description), Valid: params.Description != nil},
			Slug:        params.Slug,
			ID:          params.Code, // Corrected to ID
		})
	}

	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Failed to update product", err)
		return
	}
	RespondWithJSON(w, http.StatusAccepted, "Product updated")
}

func (cfg *ApiConfig) ProductDeleteHandler(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Code int32 `json:"code"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&params); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Use DeleteProductById method generated by sqlc
	if err := cfg.DB.DeleteProductById(context.Background(), params.Code); err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Failed to delete product", err)
		return
	}
	RespondWithJSON(w, http.StatusNoContent, nil)
}

func (cfg *ApiConfig) GetAllProductsHandler(w http.ResponseWriter, r *http.Request) {
	// Use GetAllProducts method generated by sqlc
	products, err := cfg.DB.GetAllProducts(context.Background())
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Failed to retrieve products", err)
		return
	}
	RespondWithJSON(w, http.StatusOK, products)
}
