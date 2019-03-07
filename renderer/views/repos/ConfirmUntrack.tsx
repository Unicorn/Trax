import * as React from 'react'

interface Props {
  cancel: () => void
  handler: () => void
}

const ConfirmUntrack: React.SFC<Props> = ({ cancel, handler }) => (
  <div className="confirm overlay item">
    <div className="actions">
      <button className="micro red button" onClick={handler}>
        Delete
      </button>
      <button onClick={cancel} className="micro white button">
        Clear
      </button>
    </div>
    <span className="title">Delete Trax from this repository?</span>
  </div>
)

export default ConfirmUntrack
