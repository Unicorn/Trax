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

// IssueUpdateHandler to create new repo's
func IssueUpdateHandler(w http.ResponseWriter, r *http.Request) {
	// Endpoint:  /issue_edit "POST"
	// Example JSON Post Data:
	// {"owner": "BDLVC-ON", "repo":"Tst1", "title": "Edit the title", "body": "Um, Yeah!", "labels": ["one", "Two", "Three"], "assignees": ["maro1k"], "number": 1}

	type request struct {
		// For Auth
		Owner string `json:"owner"`
		Repo  string `json:"repo"`
		Title string `json:"title"`

		// For post reqest:
		Body      string   `json:"body,omitempty"`
		Milestone int      `json:"milestone,omitempty"` // not used yet
		Labels    []string `json:"labels,omitempty"`
		Assignees []string `json:"assignees,omitempty"`
		Number    int      `json:"number"`
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

	gReq := &github.IssueRequest{
		Title:     &req.Title,
		Body:      &req.Body,
		Labels:    &req.Labels,
		Assignees: &req.Assignees,
		// Milestone: &req.Milestone, // <Not using right now>
	}

	repo, _, err := client.Issues.Edit(ctx, req.Owner, req.Repo, req.Number, gReq) //    (ctx, req.Owner, req.Repo, gReq)

	if err != nil {
		logger.Println("Error!^", err)
		data := M{"error": err}
		respondJSON(w, r, http.StatusBadRequest, data)
		return
	}
	logger.Println("Successfully edited issue:", req.Title)
	respondJSON(w, r, http.StatusOK, repo)
}
