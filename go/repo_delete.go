package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// RepoDeleteHandler to create new repo's
func RepoDeleteHandler(w http.ResponseWriter, r *http.Request) {
	// Endpoint /repo_delete "DELETE"
	// Example JSON Post Data:
	// {"owner": "BDLVC-ON", "repo":"Tst1"}

	type request struct {
		// For Auth
		Owner string `json:"owner"`
		Repo  string `json:"repo"`
	}

	req := request{}

	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &req)
	if err != nil {
		logger.Println("Error!^ ", err)
		respondJSON(w, r, http.StatusBadRequest, nil)
		return
	}

	// Token is for github user authentication.
	var Token = os.Getenv("GITHUB_AUTH_TOKEN")

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: Token})
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	repo, err := client.Repositories.Delete(ctx, req.Owner, req.Repo)
	logger.Println("Status: ", repo.StatusCode)

	data := M{"Successfully deleted repo:": req.Repo}
	//  ::TODO:: 204 Handling
	respondJSON(w, r, http.StatusOK, data)
}
