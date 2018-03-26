import React from 'react'
import { connect } from 'react-redux'
import { QueryRenderer, graphql } from 'react-relay'

import { environment } from 'controllers/relayController'
import { clearTracks } from 'controllers/trackController'
import Accordion from 'views/ui/Accordion'
import RepoNavigation from 'views/repos/RepoNavigation'
import PersonalRepoList from 'views/repos/PersonalRepoList'
import OrgRepoList from 'views/repos/OrgRepoList'
import ExternalLink from 'views/ui/ExternalLink'

class Profile extends React.Component {
  state = {
    currentTab: 'Personal',
  }

  _isPersonal = () => this.state.currentTab === 'Personal'

  _handleTabClick = (e, data) => {
    e.preventDefault()
    this.setState({ currentTab: data.login })
  }

  _renderRepos = ({ error, props }) => {
    if (error) return <div>{error.message}</div>
    else if (props)
      return this._isPersonal() ? (
        <PersonalRepoList data={props} />
      ) : (
        <OrgRepoList data={props} />
      )

    return <div>Loading...</div>
  }

  _untrackAll = () => {
    this.props.clearTracks()
  }

  render = () => {
    const { tracks } = this.props

    const query = graphql`
      query ProfileQuery(
        $count: Int!
        $cursor: String
        $login: String!
        $personal: Boolean!
      ) {
        ...OrgRepoList @skip(if: $personal)
        ...PersonalRepoList @include(if: $personal)
      }
    `

    const variables = {
      count: 100,
      login: this.state.currentTab,
      personal: this._isPersonal(),
    }

    return (
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
              <ul>{tracks.map(r => <li key={r.ident}>{r.ident}</li>)}</ul>
            </div>
          </div>
        </div>

        <div className="tabbed">
          <nav className="controls">
            <div className="tabs">
              <RepoNavigation
                selected={this.state.currentTab}
                handleTabClick={this._handleTabClick}
              />

              <div className="actions">
                <button className="basic red button" onClick={this._untrackAll}>
                  Remove All
                </button>
              </div>
            </div>
          </nav>
          <div className="pane">
            <QueryRenderer
              environment={environment}
              query={query}
              variables={variables}
              render={this._renderRepos}
            />
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  tracks:  Object.entries(state.tracks).map(o => o[1])
})

export default connect(mapStateToProps, { clearTracks })(Profile)
