/**
 * @jsx createElement
 */
import { createElement, SFC } from 'react'
import { Timer } from '@/models/timer'
import { timerDuration, formatDate, timeToCost } from '@/helpers/timerHelper'

interface Props {
  timer: Timer
  rate: number
}

const InvoiceEntry: SFC<Props> = ({ timer, rate }) => {
  const beginDate = timer.entries[0].startedAt
  const endDate = timer.entries.slice(-1)[0].stoppedAt

  return (
    <tr key={timer.key}>
      <td>{timer.issue && timer.issue.title}</td>
      <td>{beginDate && formatDate(beginDate)} - {endDate && formatDate(endDate)}</td>
      <td>{timerDuration(timer, true)}</td>
      <td>{rate && timeToCost(timer, rate)}</td>
    </tr>
  )
}

export default InvoiceEntry