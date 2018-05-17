import React from 'react'
import { connect } from 'react-redux'
import { createFragmentContainer, graphql } from 'react-relay'

import ExternalLink from 'views/ui/ExternalLink'
import ConfirmUntrack from 'views/repos/ConfirmUntrack'
import ConfirmTrack from 'views/repos/ConfirmTrack'
import { createTrack, deleteTrack } from 'controllers/tracksController'

class RepoItem extends React.Component {
  state = {
    showConfirmation: false,
  }

  _showConfirmation = () => {
    this.setState({ showConfirmation: true })
  }

  _hideConfirmation = () => {
    this.setState({ showConfirmation: false })
  }

  _trackHandler = () => {
    const { repository, createTrack } = this.props
    createTrack(repository)
    this._hideConfirmation()
  }

  _untrackHandler = () => {
    const { repository, delet_track } = this.props
    delet_track(repository)
    this._hideConfirmation()
  }

  _renderConfirmation = () => {
    if (!this.state.showConfirmation) return null

    if (this.props.track)
      return (
        <ConfirmUntrack
          track={this.props.track}
          repository={this.props.repository}
          cancel={this._hideConfirmation}
          untrackHandler={this._untrackHandler}
        />
      )
    else
      return (
        <ConfirmTrack
          repository={this.props.repository}
          cancel={this._hideConfirmation}
          trackHandler={this._trackHandler}
        />
      )
  }

  componentWillReceiveProps = ({ track } = this.props) => {
    this.setState({ showConfirmation: false })
  }

  render = () => {
    const { repository, track } = this.props
    const ident = `${repository.owner.login}/${repository.name}`

    return (
      <li className={`item ${track && 'active'}`}>
        <ExternalLink
          className="title external link"
          url={repository.url}
          showIcon={false}
        >
          {ident}
        </ExternalLink>
        <div className="actions">
          <button
            className="micro basic brown button"
            onClick={this._showConfirmation}
          >
            {track ? 'Untrack' : 'Track'}
          </button>
        </div>

        {this._renderConfirmation()}
      </li>
    )
  }
}

const fragment = createFragmentContainer(
  RepoItem,
  graphql`
    fragment RepoItem_repository on Repository {
      id
      name
      url
      owner {
        login
      }
      projects(first: 10, search: "Trax") {
        nodes {
          id
          name
        }
      }
    }
  `
)

const mapStateToProps = (state, props) => {
  return {
    track: Object.entries(state.tracks).map(o => o[1]).filter(
      t => t.repository.id === props.repository.id
    )[0],
  }
}

export default connect(mapStateToProps, { createTrack, deleteTrack })(fragment)
