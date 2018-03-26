import { Label } from 'types/label'

// Constant Names
export const ADD_ISSUE = 'trax/issue/ADD_ISSUE'
export const ADD_ISSUES = 'trax/issue/ADD_ISSUES'
export const UPDATE_ISSUE = 'trax/issue/UPDATE_ISSUE'

export type Issue = {
  owner: string;
  repo: string;
  id: number;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  labels: Label[];
}

export type CreateIssue = {
  owner: string;
  repo: string;
  body: {
    assignees: string[];
    title: string;
    body: string;
    labels: string[];
  };
}

export type EditIssue = {
  owner: string;
  repo: string;
  id: number;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  labels: string[];
}

export type Issues = {
  [key: string]: Issue;
}

export interface AddIssue {
  type: typeof ADD_ISSUE;
  issue: Issue;
}

export interface AddIssues {
  type: typeof ADD_ISSUES;
  issues: Issue[];
}

export interface UpdateIssue {
  type: typeof UPDATE_ISSUE,
  issue: Issue;
}

export type IssueActions = AddIssue | AddIssues | UpdateIssue
