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
		Price       float32 `json:"price"`
		Description *string `json:"description"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)

	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}

	//create product

	product, err := cfg.DB.CreateProduct(context.Background(), database.CreateProductParams{
		Name:  params.Name,
		Stock: params.Stock,
		Price: params.Price,
		Description: sql.NullString{
			String: deref(params.Description),
			Valid:  params.Description != nil,
		},
	})
	if err != nil {
		RespondWithError(w, http.StatusConflict, "Product already exists", err)
		return
	}

	//respond with created product
	RespondWithJSON(w, 201, ("created Product " + product.Name))
}

func (cfg *ApiConfig) ProductGetHandler(w http.ResponseWriter, r *http.Request) {
	//needs id for parameters
	type parameters struct {
		Code int32 `json:"code"`
		Name string `json:"name"`
	}

	action := r.URL.Query().Get("action")
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)

	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid product", err)
		return
	}


	if action == "code" {
		product, err := cfg.DB.GetUserByCode(context.Background(), params.Code)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find product", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, product)
	}else if action == "name" {
		product, err := cfg.DB.GetProduct(context.Background(), params.Name)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find product", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, product)
	}


}

func (cfg *ApiConfig) ProductUpdateHandler(w http.ResponseWriter, r *http.Request) {
	//needs email and password or id and email for parameters
	type parameters struct {
		Code        int32          `json:"code"`
		Name        string         `json:"name"`
		Stock       int32          `json:"stock"`
		Price       float32        `json:"stock"`
		Description sql.NullString `json:"description"`
	}
	action := r.URL.Query().Get("action")
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid product", err)
		return
	}

	if action == "stock" {
		_, err = cfg.DB.UpdateProductStock(context.Background(), database.UpdateProductStockParams{
			ProductCode:    params.Code,
			Stock:          params.Stock,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find Product", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "Stock updated")
		return
	}else if action == "name" {
		_, err = cfg.DB.UpdateProductName(context.Background(), database.UpdateProductNameParams{
			ProductCode:    params.Code,
			Name:           params.Name,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find Product", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "Name updated")
		return
	}else if action == "description" {
		_, err = cfg.DB.UpdateProductDescription(context.Background(), database.UpdateProductDescriptionParams{
			ProductCode:    params.Code,
			Description:    params.Description,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find Product", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "Description updated")
		return
	}else if action == "price" {
		_, err = cfg.DB.UpdateProductPrice(context.Background(), database.UpdateProductPriceParams{
			ProductCode:    params.Code,
			Price:          params.Price,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find Product", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "Price updated")
		return
	}else{
		_, err = cfg.DB.UpdateProduct(context.Background(), database.UpdateProductParams{
			ProductCode:    params.Code,
			Name:           params.Name,
			Stock:          params.Stock,
			Price:          params.Price,
			Description:    params.Description,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find Product", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "Product updated")
	}
}

func (cfg *ApiConfig) ProductDeleteHandler(w http.ResponseWriter, r *http.Request) {
	//needs email for parameters
	type parameters struct {
		Code int32 `json:"code"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid code", err)
		return
	}
	err = cfg.DB.DeleteProductByCode(context.Background(), params.Code)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Cant find product", err)
		return
	}

	RespondWithJSON(w, http.StatusNoContent, "Successfully deleted product")
}

