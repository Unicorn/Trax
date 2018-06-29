import { ORG, Orgs, OrgsAction } from 'models/org'

export const requestOrgs = (): OrgsAction => ({
  type: ORG.REQUEST,
})

export const receiveOrgs = (payload: Orgs): OrgsAction => ({
  type: ORG.SUCCESS,
  payload
})

export const orgsReducer = (state: Orgs = [], action: OrgsAction): Orgs => {
  const { payload, type } = action

  switch (type)
  {
    case ORG.SUCCESS :
      return payload || state

    default :
      return state
  }
}
