package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// IssueTimeAddHandler to create new repo's
func IssueTimeAddHandler(w http.ResponseWriter, r *http.Request) {

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
	// repo, _, err := client.Repositories.Create(ctx, "", gReq)

	opt := &github.RepositoryListByOrgOptions{
		ListOptions: github.ListOptions{PerPage: 10},
	}

	var allRepos []*github.Repository
	for {
		repos, resp, err := client.Repositories.ListByOrg(ctx, "BDLVC-ON", opt)
		logger.Println(printjson(repos))
		if err != nil {
			return //err
		}
		allRepos = append(allRepos, repos...)
		if resp.NextPage == 0 {
			break
		}
		opt.Page = resp.NextPage
	}

	if err != nil {
		logger.Println("Error!^", err)
		data := M{"error": err}
		respondJSON(w, r, http.StatusBadRequest, data)
		return
	}
	// logger.Printf("Successfully created new repo: %v\n", repo.GetName())

}
