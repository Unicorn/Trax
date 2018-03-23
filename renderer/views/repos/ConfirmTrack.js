import React from 'react'

const ConfirmTrack = ({ repository, cancel, trackHandler }) => {
  return (
    <div className="confirm overlay item">
      <span className="title">Install Trax on this repository?</span>
      <div className="actions">
        <button className="micro green button" onClick={trackHandler}>
          Upgrade
        </button>
        <button onClick={cancel} className="micro white button">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ConfirmTrack
