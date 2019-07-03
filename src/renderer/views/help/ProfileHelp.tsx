/** @jsx createElement */
import { createElement, SFC } from 'react'
import Help from '@/views/layouts/Help'
import Accordion from '@/views/ui/Accordion'
import ExternalLink from '@/views/ui/ExternalLink'

const ProfileHelp: SFC = () => (
  <Help>
    <Accordion trigger="What are Trax Projects?">
      <p>
        You can convert any repo into a Trax Project. Simply select which repos you would like to upgrade. If the{' '}
        <ExternalLink url="https://help.github.com/articles/about-project-boards/">Project Boards</ExternalLink> feature is enabled on
        github, the actions of selecting and unselecting repos here will either create or delete a corresponding "Trax" project.
      </p>
    </Accordion>

    <Accordion trigger="I don't see my organization">
      <p>
        Depending on your organization's setting, you may have to enable access.{' '}
        <ExternalLink url="https://github.com/settings/connections/applications/67c705a18a7b8576a4c1" showIcon={true}>
          Open your github settings
        </ExternalLink>{' '}
        and scroll down to "Organization Settings" on the bottom of the left column. Make sure that that you grant access to whichever
        organizations that you want to use within Trax.
      </p>
    </Accordion>
  </Help>
)

export default ProfileHelp
