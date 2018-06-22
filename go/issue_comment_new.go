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

// IssueCommentNewHandler to create new repo's
func IssueCommentNewHandler(w http.ResponseWriter, r *http.Request) {
	// Endpoint:  /issue_comment_new "POST"
	// Example JSON Post Data:
	// {"owner": "BDLVC-ON", "repo":"Tst1", "title": "Time to go for it!", "body": "Make it good!", "assignee": "maro1k", "number": 1}

	type request struct {
		// For Auth
		Owner string `json:"owner"`
		Repo  string `json:"repo"`
		Title string `json:"title"`

		// For post reqest:
		Body     string `json:"body,omitempty"`
		Assignee string `json:"assignee,omitempty"`
		Number   int    `json:"number"`
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

	gUsr := &github.User{
		Login: &req.Assignee,
	}

	gReq := &github.IssueComment{
		Body: &req.Body,
		User: gUsr,
	}

	repo, _, err := client.Issues.CreateComment(ctx, req.Owner, req.Repo, req.Number, gReq)

	if err != nil {
		logger.Println("Error!^", err)
		data := M{"error": err}
		respondJSON(w, r, http.StatusBadRequest, data)
		return
	}
	logger.Println("Successfully created a comment in issue:", req.Title)
	respondJSON(w, r, http.StatusOK, repo)
}
