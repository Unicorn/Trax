import { Resource } from './app'

export enum ALERT {
  CREATE = 'trax/alert/CREATE_ALERT',
  DELETE = 'trax/alert/DELETE_ALERT'
}

export interface Alert extends Resource {
  status: 'success' | 'warning' | 'error' | 'generic'
  message: string
  dismissable?: boolean
  dismissAfter?: number
}

export type AlertAction = {
  readonly type: ALERT
  readonly payload: Alert
}
