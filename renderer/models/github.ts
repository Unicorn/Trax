export const GITHUB = {
  ORGS: {
    REQUEST: 'trax/github/orgs/request'
  }
}

export const listOrgs = () => ({
  type: GITHUB.ORGS.REQUEST
})
