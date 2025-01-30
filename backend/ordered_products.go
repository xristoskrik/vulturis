package main

import (

	"context"
	"encoding/json"
	"net/http"
	//"database/sql"

	"github.com/google/uuid"
	_ "github.com/lib/pq"
	//"github.com/xristoskrik/vulturis/auth"
	//"github.com/xristoskrik/vulturis/internal/database"
)

func (cfg *ApiConfig) OrderedProductsCreateHandler(w http.ResponseWriter, r *http.Request) {}
func (cfg *ApiConfig) OrderedProductsGetHandler(w http.ResponseWriter, r *http.Request) {

	type parameters struct {
		Token		string	  `json:"token"`
		OrderCode	uuid.UUID `json:"order_code"`
		OrderedProdCode	int32	  `json:"ordered_product_code"`
	}

	action := r.URL.Query().Get("action")
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}

	//--- checks the token to see if its expired first and then it continues ---//

	authenticate, err := cfg.DB.GetUserFromRefreshToken(context.Background(), params.Token)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Invalid or expired Token", err)
		return
	}




	if action == "UUID" {
		order, err := cfg.DB.GetOrderedProductByUserUUID(context.Background(), authenticate.ID)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find ordered products", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, order)

	}else if action == "ordercode" {
		order, err := cfg.DB.GetOrderedProductByOrderCode(context.Background(), params.OrderCode)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find ordered products", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, order)

	}else{
		order, err := cfg.DB.GetOrderedProduct(context.Background(), params.OrderedProdCode)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find ordered product", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, order)

	}

}
func (cfg *ApiConfig) OrderedProductsUpdateHandler(w http.ResponseWriter, r *http.Request) {}
func (cfg *ApiConfig) OrderedProductsDeleteHandler(w http.ResponseWriter, r *http.Request) {}
