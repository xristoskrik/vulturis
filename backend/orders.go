package main

import (

	"context"
	"encoding/json"
	"net/http"
	//"database/sql"

	"github.com/google/uuid"
	_ "github.com/lib/pq"
	//"github.com/xristoskrik/vulturis/auth"
	"github.com/xristoskrik/vulturis/internal/database"
)

func (cfg *ApiConfig) OrderCreateHandler(w http.ResponseWriter, r *http.Request) {

	//needs id for parameters
	type parameters struct {
		Token     string    `json:"token"`
	}

	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}

	tx, err := cfg.MAIN.Begin()

	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Failed to start transaction", err)
		return
	}

	defer tx.Rollback()

	ctgt := cfg.DB.WithTx(tx)

	if err != nil {
		return
	}

	authenticate, err := cfg.DB.GetUserFromRefreshToken(context.Background(), params.Token)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Invalid or expired Token", err)
		return
	}

	order, err := ctgt.CreateOrder(context.Background(), authenticate.ID)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Invalid User", err)
		return
	}

	err = ctgt.CommitOrder(context.Background(), database.CommitOrderParams{
		Column1:	authenticate.ID,
		Column2:	order.OrderCode,
	})
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "OUT OF STOCK", err)
		return
	}

	//respond with created order
	RespondWithJSON(w, http.StatusOK, order)
	//RespondWithJSON(w, 201, ("created Order " + order.OrderCode))

}

func (cfg *ApiConfig) OrderGetHandler(w http.ResponseWriter, r *http.Request) {
	//needs id for parameters
	type parameters struct {
		Token     string    `json:"token"`
		OrderCode uuid.UUID `json:"order_code"`
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
		order, err := cfg.DB.GetOrderByUserID(context.Background(), authenticate.ID)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find Order", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, order)

	}else{
		order, err := cfg.DB.GetOrderByUserID(context.Background(), params.OrderCode)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find Order", err)
			return
		}
		RespondWithJSON(w, http.StatusOK, order)
	}
}

func (cfg *ApiConfig) OrderUpdateHandler(w http.ResponseWriter, r *http.Request) {

	type parameters struct {
		Token      string    `json:"token"`
		UserUUID   uuid.UUID `json:"user_uuid"`
		OrderCode  uuid.UUID `json:"order_code"`
		CompStatus string    `json:"status"`
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

	authenticate, err := cfg.DB.GetAdminFromRefreshToken(context.Background(), params.Token)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Invalid or expired Token", err)
		return
	}

	_ = authenticate

	if action == "status" {
		_, err = cfg.DB.UpdateOrderStatus(context.Background(), database.UpdateOrderStatusParams{
			OrderCode:      params.OrderCode,
			CompleteStatus:	params.CompStatus,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find order", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "status updated")
		return
	}else {
		_, err = cfg.DB.UpdateOrder(context.Background(), database.UpdateOrderParams{
			UserUuid:       params.UserUUID,
			OrderCode:      params.OrderCode,
			CompleteStatus:	params.CompStatus,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find order", err)
			return
		}
		RespondWithJSON(w, http.StatusAccepted, "order updated")
		return
	}
}

func (cfg *ApiConfig) OrderDeleteHandler(w http.ResponseWriter, r *http.Request) {
	//needs email for parameters
	type parameters struct {
		Token     string    `json:"token"`
		OrderCode uuid.UUID `json:"order_code"`
	}

	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}

	//--- checks the token to see if its expired first and then it continues ---//

	authenticate, err := cfg.DB.GetAdminFromRefreshToken(context.Background(), params.Token)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Invalid or expired Token", err)
		return
	}

	_ = authenticate

	err = cfg.DB.DeleteOrderedProductByOrderCode(context.Background(), params.OrderCode)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Cant find product", err)
		return
	}


	err = cfg.DB.DeleteOrderByID(context.Background(), params.OrderCode)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Cant find product", err)
		return
	}

	RespondWithJSON(w, http.StatusNoContent, "Successfully deleted product")
}
