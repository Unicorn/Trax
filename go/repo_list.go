package main

import (
	"context"
	"net/http"
	"os"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// RepoListHandler list all repos of current user
func RepoListHandler(w http.ResponseWriter, r *http.Request) {
	// Token is for github user authentication.
	var Token = os.Getenv("GITHUB_AUTH_TOKEN")

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: Token})
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	gReq := &github.RepositoryListOptions{}

	repo, _, err := client.Repositories.List(ctx, "mrosentr", gReq)

	if err != nil {
		logger.Println("Error!^", err)
		data := M{"error": err}
		respondJSON(w, r, http.StatusBadRequest, data)
		return
	}
	respondJSON(w, r, http.StatusOK, repo)
}
