import * as React from 'react'
import { connect } from 'react-redux'
import { FormField } from 'views/ui/form/FormField'
import { ActiveLaneValues, SettingsAction } from 'models/setting'
import { LANES, Lane } from 'config/constants'
import { setLanes, setFeaturePoints } from 'controllers/settingController'

interface Connected {
  lanes: Lane[]
  featurePoints: boolean
}

interface Actions {
  setLanes: (value: ActiveLaneValues) => SettingsAction
  setFeaturePoints: (value: boolean) => SettingsAction
}

const LaneSettings: React.SFC<Connected & Actions> = (props) => {
  const { lanes, featurePoints, setLanes, setFeaturePoints } = props

  const _laneSettingsHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let input = e.currentTarget
    let newState = [...lanes]

    if (input.checked)
      newState.push(input.name as Lane)
    else
      newState = lanes.filter(l => l !== input.name)

    // Seems redundant, but assures our lane order
    setLanes(LANES.filter(lane => newState.includes(lane)))
  }

  return (
    <div className="box columns">
      <div className="column">
        <h2>Show Lanes:</h2>
        {LANES.map(lane =>
          <FormField
            key={lane}
            name={lane}
            type="toggle"
            label={lane}
            onChange={_laneSettingsHandler}
            checked={lanes.includes(lane)}
          />
        )}
      </div>

      <div className="column">
        <h2>Show Features:</h2>
        <FormField
          name="points"
          type="toggle"
          label="Points"
          onChange={(e) => setFeaturePoints(e.currentTarget.checked)}
          checked={featurePoints}
        />
      </div>
    </div>
  )
}

const mapState = (state: any) => ({
  lanes: state.settings.lanes,
  featurePoints: state.settings.featurePoints
})

const mapDispatch = ({
  setLanes,
  setFeaturePoints
})

export default connect(mapState, mapDispatch)(LaneSettings)
