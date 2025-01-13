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

func (cfg *ApiConfig) OrderCommitingHandler(w http.ResponseWriter, r *http.Request) {

	//needs id for parameters
	type parameters struct {
		Token     string    `json:"token"`
		//OrderCode uuid.UUID `json:"order_code"`
		//UserUUID uuid.UUID  `json:"user_uuid"`
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

	order, err := ctgt.CreateOrder(context.Background(), params.UserUUID)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Invalid User", err)
		return
	}

	ordrcommit, err := ctgt.CommitOrder(context.Background(), database.CommitOrderParams{
		Column1:	authenticate.ID,
		Column2:	order.OrderCode,
	})
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Cant find Order", err)
		return
	}

	//RespondWithJSON(w, http.StatusOK, order)



}




/*func bumpCounter(ctx context.Context, db *sql.DB, queries *tutorial.Queries, id int32) error {
 * tx, err := db.Begin()
 * if err != nil {
 *	return err
 * }
 * defer tx.Rollback()
 * qtx := queries.WithTx(tx)
 * r, err := qtx.GetRecord(ctx, id)
 * if err != nil {
 *	return err
 * }
 * if err := qtx.UpdateRecord(ctx, tutorial.UpdateRecordParams{
 *	ID:      r.ID,
 *	Counter: r.Counter + 1,
 * }); err != nil {
 *	return err
 * }
 * return tx.Commit()
 } **/

