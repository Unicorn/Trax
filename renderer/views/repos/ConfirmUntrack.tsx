import * as React from 'react'
import CheckIcon from 'views/ui/icons/CheckIcon'
import UncheckIcon from 'views/ui/icons/UncheckIcon'

interface Props {
  cancel: () => void
  handler: () => void
}

const ConfirmUntrack: React.SFC<Props> = ({ cancel, handler }) => (
  <div className="confirm overlay item">
    <div className="actions">
      <button className="confirm" onClick={handler}>
        <CheckIcon />
      </button>
      <button onClick={cancel} className="cancel">
        <UncheckIcon />
      </button>
    </div>
    <span className="title">Delete Trax from this repository?</span>
  </div>
)

export default ConfirmUntrack
