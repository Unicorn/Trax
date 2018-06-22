export const ALERT = {
  CREATE: 'trax/alert/CREATE_ALERT',
  DELETE: 'trax/alert/DELETE_ALERT'
}

export type Alert = {
  key?: any
  type: 'success' | 'warning' | 'error' | 'generic'
  dismissable?: boolean
  dismissAfter?: number
  message: string
}

export type Alerts = Alert[]

export interface CreateAlert {
  type: typeof ALERT.CREATE
  payload?: Alert
}

export interface DeleteAlert {
  type: typeof ALERT.DELETE
  payload?: Alert
}

export type AlertAction = CreateAlert | DeleteAlert
