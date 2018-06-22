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

// RepoCreateHandler to create new repo's
func RepoCreateHandler(w http.ResponseWriter, r *http.Request) {
	type request struct {
		UserID       string `json:"userID"`
		Repo         string `json:"repo"`
		Description  string `json:"description"`
		Private      bool   `json:"private"`
		Organization string `json:"organization"`
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

	gOrg := &github.Organization{
		Name:    &req.Organization,
		Company: &req.Organization,
	}
	gReq := &github.Repository{
		Name:         github.String(req.Repo), // string helper object to turn string into *string
		Private:      &req.Private,            // Personally, I like this better then the helper object..
		Description:  &req.Description,
		Organization: gOrg,
	}

	repo, _, err := client.Repositories.Create(ctx, "", gReq)
	if err != nil {
		logger.Println("Error!^", err)
		data := M{"error": err}
		respondJSON(w, r, http.StatusBadRequest, data)
		return
	}
	logger.Printf("Successfully created new repo: %v\n", repo.GetName())
	data := M{"Successfully created new repo:": repo.GetName()}
	respondJSON(w, r, http.StatusOK, data)

}
