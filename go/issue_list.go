package main

import (
	"context"
	"net/http"
	"os"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// IssueListHandler will list all issues
func IssueListHandler(w http.ResponseWriter, r *http.Request) {
	// Endpoint /issue_list "GET"
	// Takes no parameters, list all issues for user 'Token'

	// Token is for github user authentication.
	var Token = os.Getenv("GITHUB_AUTH_TOKEN")
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: Token})
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	gReq := &github.IssueListOptions{}

	repo, _, err := client.Issues.List(ctx, true, gReq)

	if err != nil {
		logger.Println("Error!^", err)
		data := M{"error": err}
		respondJSON(w, r, http.StatusBadRequest, data)
		return
	}
	respondJSON(w, r, http.StatusOK, repo)
}
