const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export interface GithubActions {
  [key: string]: string
}

export const createActionName = (resource: string, action: string) => {
  return {
    [action]: {
      ...[REQUEST, SUCCESS, FAILURE].reduce((acc: any, type: any) => {
        acc[type] = `trax/github/${resource}/${action}/${type}`
        return acc
      }, {})
    }
  }
}

export const action = (type: string, payload: any) => ({ type, ...payload })
