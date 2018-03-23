import React from 'react'

const ConfirmUntrack = ({ repository, untrackHandler, cancel }) => {
  return (
    <div className="confirm overlay item">
      <span className="title">Delete Trax from this repository?</span>
      <div className="actions">
        <button className="micro red button" onClick={untrackHandler}>
          Delete
        </button>
        <button onClick={cancel} className="micro white button">
          Clear
        </button>
      </div>
    </div>
  )
}

export default ConfirmUntrack
