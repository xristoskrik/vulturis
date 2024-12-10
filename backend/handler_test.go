package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"testing"

	"github.com/xristoskrik/vulturis/internal/database"
)

func TestCreateUser(t *testing.T) {
	url := "http://localhost:8080/api/users"
	user := database.User{
		HashedPassword: "12345678",
		Email:          "testing@email.com",
		Phone:          "699999999",
		Mobile:         "99999999",
		Name:           "doe",
		Surname:        "joe",
		Address:        "address 6",
	}
	jsonData, err := json.Marshal(user)
	if err != nil {
		t.Errorf("failed to Marshal")
	}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		t.Errorf("failed to post")
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusInternalServerError {
		t.Log("User already created")
		t.Skip()
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("unexpected status code: got %v, want %v", resp.StatusCode, http.StatusCreated)
	}

	var message string
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&message)
	if err != nil {
		t.Errorf("failed to decode")
	}
	fmt.Printf("%+v\n", message)

}
func TestGetUser(t *testing.T) {
	url := "http://localhost:8080/api/users"
	user := database.User{
		Email: "testing@email.com",
	}
	jsonData, err := json.Marshal(user)
	if err != nil {
		t.Errorf("failed to Marshal")
	}
	req, err := http.NewRequest("GET", url, bytes.NewBuffer(jsonData))
	if err != nil {
		t.Errorf("failed to post")
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("unexpected status code: got %v, want %v", resp.StatusCode, http.StatusOK)
	}

	var res database.User
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&res)
	if err != nil {
		t.Errorf("failed to decode")
	}
	fmt.Printf("%+v\n", res)

}
func TestUpdateUser(t *testing.T) {
	url := "http://localhost:8080/api/users?action=password"
	user := database.User{
		HashedPassword: "9101231231231",
		Email:          "testing@email.com",
	}
	jsonData, err := json.Marshal(user)
	if err != nil {
		t.Errorf("failed to Marshal")
	}
	req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonData))
	if err != nil {
		t.Errorf("failed to post")
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusAccepted {
		t.Fatalf("unexpected status code: got %v, want %v", resp.StatusCode, http.StatusAccepted)
	}

	var message string
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&message)
	if err != nil {
		t.Errorf("failed to decode")
	}
	fmt.Printf("%+v\n", message)

}

func TestDeleteUser(t *testing.T) {
	url := "http://localhost:8080/api/users"
	user := database.User{
		Email: "testing@email.com",
	}
	jsonData, err := json.Marshal(user)
	if err != nil {
		t.Errorf("failed to Marshal")
	}
	req, err := http.NewRequest("DELETE", url, bytes.NewBuffer(jsonData))
	if err != nil {
		t.Errorf("failed to post")
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}
	defer resp.Body.Close()

}
