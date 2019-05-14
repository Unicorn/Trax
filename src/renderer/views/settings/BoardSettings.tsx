import * as React from 'react'
import { connect } from 'react-redux'
import Form from '@/views/ui/form/index'
import { AppState } from '@/models/app'
import { Settings, ActiveLaneValues, SettingsAction, Features } from '@/models/setting'
import { LANES, Lane } from '@/config/constants'
import { setLanes, setFeature } from '@/controllers/settingController'

interface Connected {
  settings: Settings
}

interface Actions {
  setLanes: (value: ActiveLaneValues) => SettingsAction
  setFeature: (key: Features, value: boolean) => SettingsAction
}

const LaneSettings: React.SFC<Connected & Actions> = ({ settings, setLanes, setFeature }) => {

  const _laneSettingsHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let input = e.currentTarget
    let newState = [...settings.lanes]

    if (input.checked)
      newState.push(input.name as Lane)
    else
      newState = settings.lanes.filter(l => l !== input.name)

    // Seems redundant, but assures our lane order
    setLanes(LANES.filter(lane => newState.includes(lane)))
  }

  return (
    <div className="box columns">
      <div className="column">
        <h2>Show Lanes:</h2>
        {LANES.map(lane =>
          <Form.RadioField
            key={lane}
            name={lane}
            type="toggle"
            label={lane}
            onChange={_laneSettingsHandler}
            checked={settings.lanes.includes(lane)}
          />
        )}
      </div>

      <div className="column">
        <h2>Show Features:</h2>

        <Form.RadioField
          name="points"
          type="toggle"
          label="Show Issue Points"
          onChange={(e) => setFeature('featurePoints', e.currentTarget.checked)}
          checked={settings.featurePoints}
        />

        <Form.RadioField
          name="priorities"
          type="toggle"
          label="Show Issue Priority"
          onChange={(e) => setFeature('featurePriority', e.currentTarget.checked)}
          checked={settings.featurePriority}
        />

        <Form.RadioField
          name="types"
          type="toggle"
          label="Show Issue Types"
          onChange={(e) => setFeature('featureTypes', e.currentTarget.checked)}
          checked={settings.featureTypes}
        />
      </div>
    </div>
  )
}

const mapState = (state: AppState): Connected => ({
  settings: state.settings
})

const mapDispatch = ({
  setLanes,
  setFeature
})

export default connect(mapState, mapDispatch)(LaneSettings)
