package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"github.com/xristoskrik/vulturis/auth"
	"github.com/xristoskrik/vulturis/internal/database"
)

//type ApiConfig struct {
//	DB *database.Queries
//}

func (cfg *ApiConfig) UserCreateHandler(w http.ResponseWriter, r *http.Request) {
	//user struct
	var create_user database.User
	//decoder
	decoder := json.NewDecoder(r.Body)

	//decoding json
	err := decoder.Decode(&create_user)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}
	//hash password
	hashed, err := auth.HashPassword(create_user.HashedPassword)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Can't create user", err)
		return
	}
	//create user
	user, err := cfg.DB.CreateUser(context.Background(), database.CreateUserParams{
		HashedPassword: hashed,
		Email:          create_user.Email,
		Name:           create_user.Name,
		Surname:        create_user.Surname,
		Phone:          create_user.Phone,
		Mobile:         create_user.Mobile,
		Address:        create_user.Address,
	})
	if err != nil {
		RespondWithError(w, http.StatusConflict, "Email already exists", err)
		return
	}

	//respond with created user
	RespondWithJSON(w, 201, ("created user " + user.Name))
}

func (cfg *ApiConfig) UserDeleteHandler(w http.ResponseWriter, r *http.Request) {
	//needs email for parameters
	type parameters struct {
		Email string `json:"email"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}
	err = cfg.DB.DeleteUserByEmail(context.Background(), params.Email)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Cant find user", err)
		return
	}

	RespondWithJSON(w, http.StatusNoContent, "Successfully deleted user")

}
func (cfg *ApiConfig) UserUpdateHandler(w http.ResponseWriter, r *http.Request) {
	//needs email and password or id and email for parameters
	type parameters struct {
		Email    string    `json:"email"`
		Password string    `json:"password"`
		ID       uuid.UUID `json:"id"`
	}
	action := r.URL.Query().Get("action")
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}
	if action == "password" {
		hashed, err := auth.HashPassword(params.Password)

		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Something went wrong!", err)
			return
		}
		_, err = cfg.DB.UpdateUserPasswordByEmail(context.Background(), database.UpdateUserPasswordByEmailParams{
			HashedPassword: hashed,
			Email:          params.Email,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find user", err)
			return
		}

		RespondWithJSON(w, http.StatusAccepted, "password updated")
		return
	} else if action == "email" {
		_, err = cfg.DB.UpdateUserEmailById(context.Background(), database.UpdateUserEmailByIdParams{
			ID:    params.ID,
			Email: params.Email,
		})
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, "Cant find user", err)
			return
		}

		RespondWithJSON(w, http.StatusAccepted, "Email updated")
		return
	}

}
func (cfg *ApiConfig) UserGetHandler(w http.ResponseWriter, r *http.Request) {
	//needs id for parameters
	type parameters struct {
		Email string `json:"email"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid credentials", err)
		return
	}
	user, err := cfg.DB.GetUser(context.Background(), params.Email)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Cant find user", err)
		return
	}
	RespondWithJSON(w, http.StatusOK, user)
}
