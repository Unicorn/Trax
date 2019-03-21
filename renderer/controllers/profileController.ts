import { PROFILE, Profile, ProfileAction, profileState } from 'models/profile'

export const requestProfile = (): ProfileAction => ({
  type: PROFILE.REQUEST
})

export const receiveProfile = (payload: Profile): ProfileAction => ({
  type: PROFILE.SUCCESS,
  payload
})

export const profileReducer = (state: Profile = profileState, action: ProfileAction): Profile => {
  const { payload, type } = action


  switch (type) {
    case PROFILE.SUCCESS:
      console.log("payload", payload)
      return payload || state

    default:
      return state
  }
}
