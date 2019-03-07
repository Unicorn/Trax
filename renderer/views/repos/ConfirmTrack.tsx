import * as React from 'react'

interface Props {
  cancel: () => void
  handler: () => void
}

const ConfirmTrack: React.SFC<Props> = ({ cancel, handler }) => (
  <div className="confirm overlay item">
    <div className="actions">
      <button className="micro green button" onClick={handler}>
        Upgrade
      </button>
      <button onClick={cancel} className="micro white button">
        Cancel
      </button>
    </div>
    <span className="title">Install Trax on this repository?</span>
  </div>
)

export default ConfirmTrack
