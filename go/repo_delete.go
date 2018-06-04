package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// RepoDeleteHandler to create new repo's
func RepoDeleteHandler(w http.ResponseWriter, r *http.Request) {
	///////////////////////////////////////////
	// **Abandoned Function - Not complete** //
	///////////////////////////////////////////

	type request struct {
		UserID          string `json:"userID"`
		RepoName        string `json:"repo"`
		RepoDescription string `json:"description"`
		Private         bool   `json:"private"`
	}

	req := request{}

	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &req)
	if err != nil {
		logger.Println("Error!^ ", err)
		respondJSON(w, r, http.StatusBadRequest, nil)
		return
	}

	if req.RepoName == "" || req.RepoDescription == "" {
		if err != nil {
			logger.Println("Error!^ ", err)
			respondJSON(w, r, http.StatusBadRequest, nil)
			return
		}
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: Token})
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	// gReq := &github.Repository{
	// 	Name:        github.String(req.RepoName), // string helper object to turn string into *string
	// 	Private:     &req.Private,                // Personally, I like this better then the helper object..
	// 	Description: &req.RepoDescription,
	// }

	repo, _, err := client.Repositories.List(ctx, "thinkclay", nil)

	if err != nil {
		logger.Println("Error!^", err)
		data := M{"error": err}
		respondJSON(w, r, http.StatusBadRequest, data)
		return
	}
	logger.Printf("Repo: %v\n", repo[0].GetName())

	respondJSON(w, r, http.StatusOK, repo)

}
