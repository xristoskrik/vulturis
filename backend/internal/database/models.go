// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package database

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Cart struct {
	ID          int32
	UserUuid    uuid.UUID
	ProductCode int32
	Amount      int32
}

type Order struct {
	OrderCode      uuid.UUID
	CreatedAt      time.Time
	UpdatedAt      time.Time
	UserUuid       uuid.UUID
	CompleteStatus string
}

type OrderedProduct struct {
	ID          int32
	OrderCode   uuid.UUID
	UserUuid    uuid.UUID
	ProductCode int32
	Amount      int32
}

type Product struct {
	ProductCode int32
	Name        string
	Stock       int32
	Price       float32
	Description sql.NullString
}

type RefreshToken struct {
	Token     string
	CreatedAt time.Time
	UpdatedAt time.Time
	UserID    uuid.UUID
	ExpiresAt sql.NullTime
	RevokedAt sql.NullTime
}

type User struct {
	ID             uuid.UUID
	CreatedAt      time.Time
	UpdatedAt      time.Time
	Email          string
	HashedPassword string
	Name           string
	Surname        string
	Phone          string
	Mobile         string
	Address        string
}
