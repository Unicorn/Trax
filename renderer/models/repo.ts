import { Resources, Resource } from './app'

export enum REPOS {
  UPDATE = 'trax/repos/update'
}

export interface Repo extends Resource {
  login: string
  id: string
  nodeId: string
  fullName: string
  htmlUrl: string
}

export interface Repos extends Resources {
  data: {
    [key: string]: Repo
  }
}

export interface UpdateReposAction {
  type: REPOS
  payload: Repo[]
}

export type RepoActions = UpdateReposAction

// {
//   "id": 1296269,
//   "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
//   "name": "Hello-World",
//   "full_name": "octocat/Hello-World",
//   "owner": {
//     "login": "octocat",
//     "id": 1,
//     "node_id": "MDQ6VXNlcjE=",
//     "avatar_url": "https://github.com/images/error/octocat_happy.gif",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/octocat",
//     "html_url": "https://github.com/octocat",
//     "followers_url": "https://api.github.com/users/octocat/followers",
//     "following_url": "https://api.github.com/users/octocat/following{/other_user}",
//     "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
//     "organizations_url": "https://api.github.com/users/octocat/orgs",
//     "repos_url": "https://api.github.com/users/octocat/repos",
//     "events_url": "https://api.github.com/users/octocat/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/octocat/received_events",
//     "type": "User",
//     "site_admin": false
//   },
//   "private": false,
//   "html_url": "https://github.com/octocat/Hello-World",
//   "description": "This your first repo!",
//   "fork": false,
//   "url": "https://api.github.com/repos/octocat/Hello-World",
//   "archive_url": "http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
//   "assignees_url": "http://api.github.com/repos/octocat/Hello-World/assignees{/user}",
//   "blobs_url": "http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
//   "branches_url": "http://api.github.com/repos/octocat/Hello-World/branches{/branch}",
//   "collaborators_url": "http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
//   "comments_url": "http://api.github.com/repos/octocat/Hello-World/comments{/number}",
//   "commits_url": "http://api.github.com/repos/octocat/Hello-World/commits{/sha}",
//   "compare_url": "http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
//   "contents_url": "http://api.github.com/repos/octocat/Hello-World/contents/{+path}",
//   "contributors_url": "http://api.github.com/repos/octocat/Hello-World/contributors",
//   "deployments_url": "http://api.github.com/repos/octocat/Hello-World/deployments",
//   "downloads_url": "http://api.github.com/repos/octocat/Hello-World/downloads",
//   "events_url": "http://api.github.com/repos/octocat/Hello-World/events",
//   "forks_url": "http://api.github.com/repos/octocat/Hello-World/forks",
//   "git_commits_url": "http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
//   "git_refs_url": "http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
//   "git_tags_url": "http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
//   "git_url": "git:github.com/octocat/Hello-World.git",
//   "issue_comment_url": "http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
//   "issue_events_url": "http://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
//   "issues_url": "http://api.github.com/repos/octocat/Hello-World/issues{/number}",
//   "keys_url": "http://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
//   "labels_url": "http://api.github.com/repos/octocat/Hello-World/labels{/name}",
//   "languages_url": "http://api.github.com/repos/octocat/Hello-World/languages",
//   "merges_url": "http://api.github.com/repos/octocat/Hello-World/merges",
//   "milestones_url": "http://api.github.com/repos/octocat/Hello-World/milestones{/number}",
//   "notifications_url": "http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
//   "pulls_url": "http://api.github.com/repos/octocat/Hello-World/pulls{/number}",
//   "releases_url": "http://api.github.com/repos/octocat/Hello-World/releases{/id}",
//   "ssh_url": "git@github.com:octocat/Hello-World.git",
//   "stargazers_url": "http://api.github.com/repos/octocat/Hello-World/stargazers",
//   "statuses_url": "http://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
//   "subscribers_url": "http://api.github.com/repos/octocat/Hello-World/subscribers",
//   "subscription_url": "http://api.github.com/repos/octocat/Hello-World/subscription",
//   "tags_url": "http://api.github.com/repos/octocat/Hello-World/tags",
//   "teams_url": "http://api.github.com/repos/octocat/Hello-World/teams",
//   "trees_url": "http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
//   "clone_url": "https://github.com/octocat/Hello-World.git",
//   "mirror_url": "git:git.example.com/octocat/Hello-World",
//   "hooks_url": "http://api.github.com/repos/octocat/Hello-World/hooks",
//   "svn_url": "https://svn.github.com/octocat/Hello-World",
//   "homepage": "https://github.com",
//   "language": null,
//   "forks_count": 9,
//   "stargazers_count": 80,
//   "watchers_count": 80,
//   "size": 108,
//   "default_branch": "master",
//   "open_issues_count": 0,
//   "topics": [
//     "octocat",
//     "atom",
//     "electron",
//     "API"
//   ],
//   "has_issues": true,
//   "has_projects": true,
//   "has_wiki": true,
//   "has_pages": false,
//   "has_downloads": true,
//   "archived": false,
//   "pushed_at": "2011-01-26T19:06:43Z",
//   "created_at": "2011-01-26T19:01:12Z",
//   "updated_at": "2011-01-26T19:14:43Z",
//   "permissions": {
//     "admin": false,
//     "push": false,
//     "pull": true
//   },
//   "allow_rebase_merge": true,
//   "allow_squash_merge": true,
//   "allow_merge_commit": true,
//   "subscribers_count": 42,
//   "network_count": 0
// }
