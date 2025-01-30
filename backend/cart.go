package main

import (

	"context"
	"encoding/json"
	"net/http"
	//"database/sql"
	//"strconv"

	"github.com/google/uuid"
	_ "github.com/lib/pq"
	//"github.com/xristoskrik/vulturis/auth"
	"github.com/xristoskrik/vulturis/internal/database"
)

func (cfg *ApiConfig) CartCreateHandler(w http.ResponseWriter, r *http.Request) {

	type parameters struct {
		Token       string  `json:"token"`
		ProductCode int32   `json:"product_code"`
		Amount	    int32   `json:"amount"`
	}

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

	cart, err := cfg.DB.CreateCart(context.Background(), database.CreateCartParams{
		UserUuid:    authenticate.ID,
		ProductCode: params.ProductCode,
		Amount:      params.Amount,
	})
	if err != nil {
		RespondWithError(w, http.StatusConflict, "Product already exists", err)
		return
	}

	_ = cart

	//respond with created product
	RespondWithJSON(w, 201, ("Added to cart."))

}
func (cfg *ApiConfig) CartGetHandler(w http.ResponseWriter, r *http.Request) {

	type parameters struct {
		Token       string  `json:"token"`
		CartID	    int32   `json:"cart_id"`
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
		cart, err := cfg.DB.GetCartByUserUUID(context.Background(), authenticate.ID)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find cart", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, cart)
	}else {
		cart, err := cfg.DB.GetCart(context.Background(), database.GetCartParams{
			UserUuid:    authenticate.ID,
			ID:	     params.CartID,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find cart", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, cart)
	}

}
func (cfg *ApiConfig) CartUpdateHandler(w http.ResponseWriter, r *http.Request) {

	type parameters struct {
		Token       string    `json:"token"`
		UserUUID    uuid.UUID `json:"user_uuid"`
		ProductCode int32     `json:"product_code"`
		Amount	    int32     `json:"amount"`
		CartID	    int32     `json:"cart_id"`
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

	_ = authenticate;

	if action == "UUID" {

		adminAuth, err := cfg.DB.GetAdminFromRefreshToken(context.Background(), params.Token)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Invalid Admin", err)
			return
		}

		_ = adminAuth;

		_, err = cfg.DB.UpdateCartUserUUID(context.Background(), database.UpdateCartUserUUIDParams{
			UserUuid:    params.UserUUID,
			ID:	     params.CartID,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find cart", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "UUID updated")
		return
	}else if action == "productcode" {
		_, err = cfg.DB.UpdateCartProductCode(context.Background(), database.UpdateCartProductCodeParams{
			ProductCode: params.ProductCode,
			ID:	     params.CartID,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find cart", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "cart product updated")
		return
	}else if action == "amount" {
		_, err = cfg.DB.UpdateCartProductAmount(context.Background(), database.UpdateCartProductAmountParams{
			Amount:      params.Amount,
			ID:	     params.CartID,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find cart", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "cart product amount updated")
		return
	}else {
		adminAuth, err := cfg.DB.GetAdminFromRefreshToken(context.Background(), params.Token)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Invalid Admin", err)
			return
		}

		_ = adminAuth;

		_, err = cfg.DB.UpdateCart(context.Background(), database.UpdateCartParams{
			UserUuid:    params.UserUUID,
			ProductCode: params.ProductCode,
			Amount:      params.Amount,
			ID:	     params.CartID,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find cart", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "cart updated")
		return
	}
}
func (cfg *ApiConfig) CartDeleteHandler(w http.ResponseWriter, r *http.Request) {

	type parameters struct {
		Token       string    `json:"token"`
		CartID	    int32     `json:"cart_id"`
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

		err = cfg.DB.DeleteCartByID(context.Background(), authenticate.ID)

		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find user", err)
			return
		}

		RespondWithJSON(w, http.StatusNoContent, "Successfully deleted user products")

	}else {
		err = cfg.DB.DeleteCartProductByUserUUID(context.Background(), database.DeleteCartProductByUserUUIDParams{
			UserUuid: authenticate.ID,
			ID:	  params.CartID,
		})

		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find product", err)
			return
		}

		RespondWithJSON(w, http.StatusNoContent, "Successfully deleted product")
	}

}

