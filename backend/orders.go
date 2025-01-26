package main

import (

	"context"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	_ "github.com/lib/pq"
	//"github.com/xristoskrik/vulturis/auth"
	//"github.com/xristoskrik/vulturis/internal/database"
)

func (cfg *ApiConfig) OrdersGetHandler(w http.ResponseWriter, r *http.Request) {
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
