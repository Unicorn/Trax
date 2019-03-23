import * as React from 'react'
import { connect } from 'react-redux'
import { FormField } from 'views/ui/form/FormField'
import { ActiveLaneValues, SettingsAction } from 'models/setting'
import { LANES, Lane } from 'config/constants'
import { setLanes } from 'controllers/settingController'

interface Connected {
  lanes: Lane[]
}

interface Actions {
  setLanes: (value: ActiveLaneValues) => SettingsAction
}

const LaneSettings: React.SFC<Connected & Actions> = (props) => {
  const { lanes, setLanes } = props

  const _toggleHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
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
    <div className="box">
      <h2>Show Lanes:</h2>
      {LANES.map(lane =>
        <FormField
          key={lane}
          name={lane}
          type="toggle"
          label={lane}
          onChange={_toggleHandler}
          checked={lanes.includes(lane)}
        />
      )}
    </div>
  )
}

const mapState = (state: any) => ({
  lanes: state.settings.lanes
})

const mapDispatch = ({
  setLanes
})

export default connect(mapState, mapDispatch)(LaneSettings)
