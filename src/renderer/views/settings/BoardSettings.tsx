/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import Form from '@/views/ui/form/index'
import { RootState } from '@/models/app'
import { Settings } from '@/models/setting'
import { LANES, Lane } from '@/config/constants'
import { setLanes, setFeaturePoints, setFeaturePriority, setFeatureTypes, setFeatureOrgTitles } from '@/controllers/settingController'

interface Connected {
  settings: Settings
}

interface Actions {
  _setLanes: typeof setLanes
  _setFeaturePoints: typeof setFeaturePoints
  _setFeaturePriority: typeof setFeaturePriority
  _setFeatureTypes: typeof setFeatureTypes
  _setFeatureOrgTitles: typeof setFeatureOrgTitles
}

const LaneSettings: SFC<Connected & Actions> = ({
  settings,
  _setLanes,
  _setFeaturePoints,
  _setFeaturePriority,
  _setFeatureTypes,
  _setFeatureOrgTitles
}) => {
  const _laneSettingsHandler = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const input = e.currentTarget
    let newState = [...settings.lanes]

    if (input.checked) newState.push(input.name as Lane)
    else newState = settings.lanes.filter(l => l !== input.name)

    // Seems redundant, but assures our lane order
    _setLanes(LANES.filter(lane => newState.includes(lane)))
  }

  return (
    <div className="box columns">
      <div className="column">
        <h2>Lanes:</h2>
        {LANES.map(lane => (
          <Form.RadioField
            key={lane}
            name={lane}
            type="toggle"
            label={lane}
            onChange={_laneSettingsHandler}
            checked={settings.lanes.includes(lane)}
          />
        ))}
      </div>

      <div className="column">
        <h2>Features:</h2>

        <Form.RadioField
          name="points"
          type="toggle"
          label="Points"
          onChange={e => _setFeaturePoints(e.currentTarget.checked)}
          checked={settings.featurePoints}
        />

        <Form.RadioField
          name="priorities"
          type="toggle"
          label="Priority"
          onChange={e => _setFeaturePriority(e.currentTarget.checked)}
          checked={settings.featurePriority}
        />

        <Form.RadioField
          name="types"
          type="toggle"
          label="Types"
          onChange={e => _setFeatureTypes(e.currentTarget.checked)}
          checked={settings.featureTypes}
        />

        <Form.RadioField
          name="orgTitles"
          type="toggle"
          label="Organization"
          onChange={e => _setFeatureOrgTitles(e.currentTarget.checked)}
          checked={settings.featureOrgTitles}
        />
      </div>
    </div>
  )
}

const mapState = (state: RootState): Connected => ({
  settings: state.settings
})

const mapDispatch = {
  _setLanes: setLanes,
  _setFeaturePoints: setFeaturePoints,
  _setFeaturePriority: setFeaturePriority,
  _setFeatureTypes: setFeatureTypes,
  _setFeatureOrgTitles: setFeatureOrgTitles
}

export default connect(
  mapState,
  mapDispatch
)(LaneSettings)
