package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/google/go-github/github"
	"github.com/gorilla/websocket"
)

// RootHandler http handler to display login page
func RootHandler(w http.ResponseWriter, r *http.Request) {
	// Notes for later:
	// logger.Println("Host: ", r.Header.Get("X-Host"))
	// logger.Println("X-Real: ", r.Header.Get("X-Real-IP"))
	// logger.Println("X-Forwarded-For: ", r.Header.Get("X-Forwarded-For"))
	// logger.Println("X-Forwarded-Proto: ", r.Header.Get("X-Forwarded-Proto"))

	type request struct {
		UserID string `json:"userID"`
	}

	req := request{}

	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &req)
	if err != nil {
		logger.Println("Error!^ ", err)
		respondJSON(w, r, http.StatusBadRequest, nil)
		return
	}

	// Get to work on GitHub API:
	client := github.NewClient(nil)

	// list all organizations for user
	orgs, _, err := client.Organizations.List(context.Background(), req.UserID, nil)

	if err != nil {
		data := M{"error": err}
		respondJSON(w, r, http.StatusOK, data)
		return
	}
	respondJSON(w, r, http.StatusOK, orgs)
}

// WSHandler sets up the websocket connection.
func WSHandler(w http.ResponseWriter, r *http.Request) {

	conn, err := websocket.Upgrade(w, r, nil, 1024, 1024)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
	}
	Conn = conn
}
