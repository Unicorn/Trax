import * as React from 'react'
import Accordion from 'views/ui/Accordion'
import ExternalLink from 'views/ui/ExternalLink'

const Profile: React.SFC = () => (
  
  <section className="profile page">
    <header>
      <h1>Profile</h1>
    </header>

    <div className="row">
      <div className="left column">
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
            access.
            <ExternalLink
              url="https://github.com/settings/connections/applications/67c705a18a7b8576a4c1"
              showIcon={true}
            >
              Open your github settings
            </ExternalLink>{' '}
            and scroll down to "Organization settings" on the bottom of the
            left column. Make sure that that you grant access to whichever
            organizations that you want to use within Trax.
          </p>
        </Accordion>
      </div>
      <div className="right column">
        <div className="tracked">
          <ul></ul>
        </div>
      </div>
    </div>

    <div className="tabbed">
      <nav className="controls">
        <div className="tabs">
          <div className="actions">
            <button className="basic red button">
              Remove All
            </button>
          </div>
        </div>
      </nav>
      <div className="pane">
      </div>
    </div>
  </section>
)


export default Profile
