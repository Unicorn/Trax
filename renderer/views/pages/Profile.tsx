import { keys } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import Accordion from 'views/ui/Accordion'
import ExternalLink from 'views/ui/ExternalLink'
import ProfileNav from 'views/profile/ProfileNav'
import RepoItem from 'views/repos/RepoItem'
import { Tracks } from 'models/track'

interface Connected {
  tracks: Tracks
  dispatch: (action: any) => any
}

const _renderTracks = (tracks: Tracks) => {
  let items = keys(tracks)

  if (items.length < 1)
    return <p>Nothing tracked yet. Select a repo to track.</p>

  return <ul>{items.map(key => <RepoItem repo={tracks[key].repo} />)}</ul>
}

const Profile: React.SFC<Connected> = (props) => {
  const { tracks } = props

  return (
    <section className="profile page">
      <div className="columns golden-ratio">
        <div className="left column">
          <div className="scroll">
            <h2>Tracked Repositories</h2>
            {_renderTracks(tracks)}
          </div>

          <div className="scroll">
            <h3>Help</h3>
            <Accordion trigger="What are Trax Projects?">
              <p>
                You can convert any repo into a Trax Project. Simply select
                which repos you would like to upgrade. If the{' '}
                <ExternalLink url="https://help.github.com/articles/about-project-boards/">
                  Project Boards
                </ExternalLink>{' '}
                feature is enabled on github, the actions of selecting and
                unselecting repos here will either create or delete a
                corresponding "Trax" project.
              </p>
            </Accordion>

            <Accordion trigger="I don't see my organization">
              <p>
                Depending on your organization's setting, you may have to enable
                access. <ExternalLink url="https://github.com/settings/connections/applications/67c705a18a7b8576a4c1" showIcon={true}>Open your github settings</ExternalLink> and scroll down to "Organization settings" on the bottom of the left column. Make sure that that you grant access to whichever organizations that you want to use within Trax.
              </p>
            </Accordion>
          </div>
        </div>
        <div className="right column">
          <ProfileNav />
        </div>
      </div>
    </section>
  )
}

const mapState = (state: any) => ({
  tracks: state.tracks
})

export default connect(mapState)(Profile)
