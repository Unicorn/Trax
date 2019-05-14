import { User } from '@/models/User'

export interface Milestone {
  url: string
  htmlUrl: string
  labelsUrl: string
  id: number
  nodeId: string
  number: number
  state: string
  title: string
  description: string
  creator: User
  openIssues: number
  closedIssues: number
  createdAt: string
  updatedAt: string
  closedAt: string | null
  dueOn: string
}
