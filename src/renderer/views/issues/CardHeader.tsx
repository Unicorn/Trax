/** @jsx createElement **/
import { createElement, FC, useState } from 'react'
import { Issue } from '@/models/issue'
import { Settings } from '@/models/setting'
import { pointsFromLabels, typeFromLabels, priorityFromLabels } from '@/helpers/labelHelper'
import PointsIcon from '@/views/ui/icons/PointsIcon'
import TypeIcon from '@/views/ui/icons/TypeIcon'
import PriorityIcon from '@/views/ui/icons/PriorityIcon'
import RadioField from 'horseshoes/build/main/lib/views/form/RadioField'
import CloseIcon from 'horseshoes/build/main/lib/views/icons/CloseIcon'
import { POINTS } from '@/config/constants'

interface Props {
  issue: Issue
  settings: Settings
}

const CardHeader: FC<Props> = ({ issue, settings }) => {
  const priority = priorityFromLabels(issue.labels)
  const points = pointsFromLabels(issue.labels)
  const type = typeFromLabels(issue.labels)
  const [org, repo] = issue.ident.split('/')
  const [_view, _setView] = useState('info')
  const [_pointsSelect, _setPointsSelect] = useState(points.toString())

  if (_view === 'points')
    return (
      <header>
        <RadioField
          name="points"
          type="group"
          label="Points"
          options={POINTS}
          onChange={e => _setPointsSelect(e.currentTarget.value)}
          selected={_pointsSelect}
          value={_pointsSelect}
        />

        <button className="close" onClick={() => _setView('info')}>
          <CloseIcon />
        </button>
      </header>
    )

  return (
    <header>
      <strong>
        {settings.featureOrgTitles && `${org}/`}
        {`${repo}/`}
        {`#${issue.number}`}
      </strong>

      {(priority && priority > 0 && (
        <button className={`priority priority-${priority}`}>
          <PriorityIcon />
        </button>
      )) ||
        null}

      {(settings.featureTypes && type && (
        <button className="type">
          <TypeIcon type={type} />
        </button>
      )) ||
        null}
      {(settings.featurePoints && (
        <button className="points" onClick={() => _setView('points')}>
          <PointsIcon points={points} />
        </button>
      )) ||
        null}
    </header>
  )
}

export default CardHeader
