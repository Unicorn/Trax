import * as React from 'react'
import Help from 'views/layouts/Help'
import Accordion from 'views/ui/Accordion'

const BoardHelp = () => (
  <Help>
    <Accordion trigger="Velocity tracking">
      <p>
        Trax implements and supports velocity planning and tracking at it's core. By assigning a weight to an issue, your team can better track how many issues are appropriate for a sprint. Over time, this velocity can help you refine your sprints further. Velocity is tracked using <strong>points</strong> which are shown on the top right of each issue card.
      </p>
    </Accordion>
  </Help>
)

export default BoardHelp
