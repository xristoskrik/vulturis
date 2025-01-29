package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"github.com/xristoskrik/vulturis/auth"
	"github.com/xristoskrik/vulturis/internal/database"
)

type ApiConfig struct {
	DB        *database.Queries
	SecretKey string
}

func (cfg *ApiConfig) UserCreateHandler(w http.ResponseWriter, r *http.Request) {

	type parameters struct {
		Password string `json:"password"`
		Email    string `json:"email"`
		Username string `json:"username"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}

	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Couldn't decode parameters", err)
		return
	}
	fmt.Println(params)
	hashed, err := auth.HashPassword(params.Password)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Can't create user", err)
		return
	}
	user, err := cfg.DB.CreateUser(context.Background(), database.CreateUserParams{
		HashedPassword: hashed,
		Email:          params.Email,
	})
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Can't create user", err)
		return
	}

	RespondWithJSON(w, 201, database.User{
		ID:        user.ID,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		Email:     user.Email,
	})
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


func (cfg *ApiConfig) UserloginHandler(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Password string `json:"password"`
		Email    string `json:"email"`
	}
	type response struct {
		database.User
		Token        string `json:"token"`
		RefreshToken string `json:"refresh_token"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Couldn't decode parameters", err)
		return
	}
	fmt.Println(params)
	user, err := cfg.DB.GetUser(context.Background(), params.Email)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "email  wrong", err)
		return
	}
	err = auth.CheckPasswordHash(params.Password, user.HashedPassword)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, " password wrong", err)
		return
	}
	accessToken, err := auth.MakeJWT(
		user.ID,
		cfg.SecretKey,
		time.Hour,
	)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Couldn't create access JWT", err)
		return
	}

	refreshToken, err := auth.MakeRefreshToken()
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Couldn't create refresh token", err)
		return
	}

	_, err = cfg.DB.CreateRefreshToken(r.Context(), database.CreateRefreshTokenParams{
		UserID:    user.ID,
		Token:     refreshToken,
		ExpiresAt: sql.NullTime{Time: time.Now().AddDate(0, 0, 60), Valid: true},
	})
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, "Couldn't save refresh token", err)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    accessToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Secure:   false,
		Path:     "/",
	})
	RespondWithJSON(w, 200, response{
		User: database.User{
			ID:    user.ID,
			Email: user.Email,
		},
		Token:        accessToken,
		RefreshToken: refreshToken,
	})

}