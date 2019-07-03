/** @jsx createElement **/
import { createElement, Component, ReactNode } from 'react'
import { connect } from 'react-redux'
import { createTrack, deleteTrack } from '@/controllers/trackController'
import { Repo } from '@/models/repo'
import { Track } from '@/models/track'
import { RootState } from '@/models/app'
import ExternalLink from '@/views/ui/ExternalLink'
import ConfirmTrack from '@/views/repos/ConfirmTrack'
import ConfirmUntrack from '@/views/repos/ConfirmUntrack'
import CheckIcon from '@/views/ui/icons/CheckIcon'
import UncheckIcon from '@/views/ui/icons/UncheckIcon'

interface Props {
  repo: Repo
}

interface Connected {
  track: Track | null
}

interface Actions {
  _createTrack: typeof createTrack
  _deleteTrack: typeof deleteTrack
}

interface State {
  showConfirmation: boolean
}

class RepoItem extends Component<Props & Connected & Actions, State> {
  state = {
    showConfirmation: false
  }

  _showConfirmation = () => this.setState({ showConfirmation: true })
  _hideConfirmation = () => this.setState({ showConfirmation: false })

  _trackHandler = (): void => {
    const { repo, _createTrack } = this.props
    _createTrack(repo)
    this._hideConfirmation()
  }

  _untrackHandler = (): void => {
    const { _deleteTrack, track } = this.props

    if (!track) return

    _deleteTrack(track)
    this._hideConfirmation()
  }

  _renderConfirmation = () => {
    const { showConfirmation } = this.state
    const { track } = this.props

    if (!showConfirmation) return null

    if (track) return <ConfirmUntrack cancel={this._hideConfirmation} handler={this._untrackHandler} />
    else return <ConfirmTrack cancel={this._hideConfirmation} handler={this._trackHandler} />
  }

  render(): ReactNode {
    const { track, repo } = this.props
    const repoName = repo.fullName.split('/')

    return (
      <li className={`item ${track ? 'tracked' : 'untracked'}`}>
        <div className="actions">
          <button className={track ? 'cancel' : ''} onClick={this._showConfirmation} title={track ? 'Untrack' : 'Track'}>
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

const mapState = (state: RootState, { repo }: Props): Connected => ({
  track: repo && state.tracks.data[repo.fullName]
})

const mapDispatch = {
  _createTrack: createTrack,
  _deleteTrack: deleteTrack
}

export default connect(
  mapState,
  mapDispatch
)(RepoItem)
