import * as React from 'react'
import { connect } from 'react-redux'
import { createTrack, deleteTrack } from 'controllers/trackController'
import { Repo } from 'models/repo'
import { Track } from 'models/track'
import ExternalLink from 'views/ui/ExternalLink'
import ConfirmTrack from 'views/repos/ConfirmTrack'
import ConfirmUntrack from 'views/repos/ConfirmUntrack'
import CheckIcon from 'views/ui/icons/CheckIcon'
import UncheckIcon from 'views/ui/icons/UncheckIcon'


interface Props {
  repo: Repo
}

interface Connected {
  track: Track | null
  dispatch: (action: any) => any
}

interface State {
  showConfirmation: boolean
}

class RepoItem extends React.Component<Props & Connected, State> {

  state = {
    showConfirmation: false
  }

  _showConfirmation = () => this.setState({ showConfirmation: true })
  _hideConfirmation = () => this.setState({ showConfirmation: false })

  _trackHandler = () => {
    const { dispatch, repo } = this.props
    dispatch(createTrack(repo))
    this._hideConfirmation()
  }

  _untrackHandler = () => {
    const { dispatch, track } = this.props
    dispatch(deleteTrack(track!))
    this._hideConfirmation()
  }

  _renderConfirmation = () => {
    const { showConfirmation } = this.state
    const { track } = this.props

    if (!showConfirmation) return null

    if (track)
      return (
        <ConfirmUntrack
          cancel={this._hideConfirmation}
          handler={this._untrackHandler}
        />
      )
    else
      return (
        <ConfirmTrack
          cancel={this._hideConfirmation}
          handler={this._trackHandler}
        />
      )
  }

  render() {
    const { track, repo } = this.props
    const repoName = repo.fullName.split('/')

    return (
      <li className={`item ${track && 'active'}`}>
        <div className="actions">
          <button className={track ? 'confirm' : ''} onClick={this._showConfirmation} title={track ? 'Untrack' : 'Track'}>
            {track ? <UncheckIcon /> : <CheckIcon />}
          </button>
        </div>

        <ExternalLink className="title external link" url={repo.htmlUrl} showIcon={false}>
          <em>{repoName[0]}</em>/<strong>{repoName[1]}</strong>
        </ExternalLink>

        {this._renderConfirmation()}
      </li>
    )
  }

}

const mapState = (state: any, props: Props) => ({
  track: state.tracks.filter((t: Track) => t.ident === props.repo.fullName)[0]
})

export default connect(mapState)(RepoItem)
