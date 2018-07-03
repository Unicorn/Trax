import * as React from 'react'
import { connect } from 'react-redux'
import { requestIssues } from 'controllers/issueController'
import { Tracks } from 'models/track'

interface Connected {
  tracks: Tracks
  dispatch: (action: any) => any
}

class Board extends React.Component<Connected, {}> {

  componentWillMount() {
    const { dispatch, tracks } = this.props

    tracks.forEach(t => dispatch(requestIssues(t.ident)))
  }

  render() {
    return (
      <div>
        <header className="search">
          <input
            type="text"
            placeholder="Search for tasks..."
          />

          <div className="actions">
            <button className="brown basic micro button">
              Reload
            </button>
          </div>
        </header>
      </div>
    )
  }

}

const mapState = (state: any) => ({
  tracks: state.tracks
})

export default connect(mapState)(Board)
