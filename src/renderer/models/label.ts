export interface Label {
  id: number
  nodeId: string
  url: string
  name: string
  description: string
  color: string
  default: boolean
}

export type Labels = Label[]
