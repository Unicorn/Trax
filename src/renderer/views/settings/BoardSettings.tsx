/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import RadioField from 'horseshoes/build/main/lib/views/form/RadioField'
import { setFeaturesSettings } from '@/controllers/settingController'
import { setVisible } from '@/controllers/laneController'
import { RootState } from '@/models/app'
import { Settings } from '@/models/setting'
import { Lanes, laneTypes, LaneTypes } from '@/models/lane'

interface Connected {
  lanes: Lanes
  settings: Settings
}

interface Actions {
  _setVisible: typeof setVisible
  _setFeaturesSettings: typeof setFeaturesSettings
}

const LaneSettings: SFC<Connected & Actions> = ({ lanes, settings, _setVisible, _setFeaturesSettings }) => {
  return (
    <div className="box columns">
      <div className="column">
        <h2>Lanes:</h2>
        {laneTypes.map(lane => (
          <RadioField
            key={lane}
            name={lane}
            type="toggle"
            label={lane}
            onChange={({ currentTarget: { name, checked } }) => _setVisible(name as LaneTypes, checked)}
            checked={lanes[lane].visible}
          />
        ))}
      </div>

      <div className="column">
        <h2>Features:</h2>

        <RadioField
          name="points"
          type="toggle"
          label="Points"
          onChange={({ currentTarget: { name, checked } }) => _setFeaturesSettings(name, checked)}
          checked={settings.features.points}
        />

        <RadioField
          name="priority"
          type="toggle"
          label="Priority"
          onChange={({ currentTarget: { name, checked } }) => _setFeaturesSettings(name, checked)}
          checked={settings.features.priority}
        />

        <RadioField
          name="types"
          type="toggle"
          label="Types"
          onChange={({ currentTarget: { name, checked } }) => _setFeaturesSettings(name, checked)}
          checked={settings.features.types}
        />

        <RadioField
          name="orgTitles"
          type="toggle"
          label="Organization"
          onChange={({ currentTarget: { name, checked } }) => _setFeaturesSettings(name, checked)}
          checked={settings.features.orgTitles}
        />
      </div>
    </div>
  )
}

const mapState = (state: RootState): Connected => ({
  lanes: state.lanes,
  settings: state.settings
})

const mapDispatch: Actions = {
  _setVisible: setVisible,
  _setFeaturesSettings: setFeaturesSettings
}

export default connect(
  mapState,
  mapDispatch
)(LaneSettings)
