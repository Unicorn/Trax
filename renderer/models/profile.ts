export const PROFILE = {
  REQUEST: 'trax/github/profile/REQUEST',
  SUCCESS: 'trax/github/profile/SUCCESS',
  FAILURE: 'trax/github/profile/FAILURE'
}

export interface Profile {
  login: string
  id: number
  nodeId: string
  avatarUrl: string
}

export interface ProfileAction {
  type: typeof PROFILE.REQUEST | typeof PROFILE.SUCCESS | typeof PROFILE.FAILURE
  payload?: Profile
}

export const profileState = {
  login: "octocat",
  id: 583231,
  nodeId: "MDQ6VXNlcjU4MzIzMQ==",
  avatarUrl: "https://avatars3.githubusercontent.com/u/583231?v=4",
}
