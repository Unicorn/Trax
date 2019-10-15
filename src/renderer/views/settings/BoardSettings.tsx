/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { setFeaturePoints, setFeaturePriority, setFeatureTypes, setFeatureOrgTitles } from '@/controllers/settingController'
import { setVisible } from '@/controllers/laneController'
import { RootState } from '@/models/app'
import { Settings } from '@/models/setting'
import { Lanes, laneTypes, LaneTypes } from '@/models/lane'
import Form from '@/views/ui/form/index'

interface Connected {
  lanes: Lanes
  settings: Settings
}

interface Actions {
  _setVisible: typeof setVisible
  _setFeaturePoints: typeof setFeaturePoints
  _setFeaturePriority: typeof setFeaturePriority
  _setFeatureTypes: typeof setFeatureTypes
  _setFeatureOrgTitles: typeof setFeatureOrgTitles
}

const LaneSettings: SFC<Connected & Actions> = ({
  lanes,
  settings,
  _setVisible,
  _setFeaturePoints,
  _setFeaturePriority,
  _setFeatureTypes,
  _setFeatureOrgTitles
}) => {

  return (
    <div className="box columns">
      <div className="column">
        <h2>Lanes:</h2>
        {laneTypes.map(lane => (
          <Form.RadioField
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
  lanes: state.lanes,
  settings: state.settings
})

const mapDispatch = {
  _setVisible: setVisible,
  _setFeaturePoints: setFeaturePoints,
  _setFeaturePriority: setFeaturePriority,
  _setFeatureTypes: setFeatureTypes,
  _setFeatureOrgTitles: setFeatureOrgTitles
}

export default connect(
  mapState,
  mapDispatch
)(LaneSettings)
