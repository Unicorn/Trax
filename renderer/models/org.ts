export const ORG = {
  REQUEST: 'trax/github/org/REQUEST',
  SUCCESS: 'trax/github/org/SUCCESS',
  FAILURE: 'trax/github/org/FAILURE'
}

export interface Org {
  login: string
  id: number
  nodeId: string
  avatarUrl: string
  name: string
  htmlUrl: string
}

export type Orgs = Org[]

export interface OrgsAction {
  type: typeof ORG.REQUEST | typeof ORG.SUCCESS | typeof ORG.FAILURE
  payload?: Orgs
}
