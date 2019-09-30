export interface Label {
  id: number
  url: string
  name: string
  description: string
  color: string
  default: boolean
}

export type Labels = Label[]
