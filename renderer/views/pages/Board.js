import React from 'react'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from 'views/issues/Lane'
import { github } from 'controllers/githubController'
import { addIssues, updateIssue } from 'controllers/issueController'
import { SWIMLANES } from 'config/constants'

const select = state => ({
  issues: Object.entries(state.issues).map(o => o[1]),
  tracks:  Object.entries(state.tracks).map(o => o[1]),
  user: state.github.profile.data,
})

class Board extends React.Component {
  state = {
    filtered: [],
  }

  _reload = () => {
    const { dispatch, tracks, user } = this.props

    return Promise.all(
      tracks.map(track => {
        const [owner, repo] = track.ident.split('/')
        var issuesArr = []

        return dispatch(
          github.listIssues({
            owner,
            repo,
            assignee: user.login,
            milestone: '*',
          })
        )
          .then(issues => {
            issuesArr = issuesArr.concat(issues)
            return dispatch(
              github.listIssues({ owner, repo, assignee: user.login })
            )
          })
          .then(issues => {
            issuesArr = issuesArr.concat(issues)
          })
          .then(() =>
            issuesArr.map((issue, index) => {
              issue.owner = owner
              issue.repo = repo
              issue.index = index
              return issue
            })
          )
          .catch(e => {
            this._error(`Error syncing issues, check console for details`)
            console.log('Error syncing issues:', e)
          })
      })
    ).then(issues => dispatch(addIssues([].concat.apply([], issues))))
  }

  _filterIssues = e => {
    const { issues } = this.props
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['title', 'description', 'number', 'owner', 'repo'],
    }
    const fuse = new Fuse(issues, options)
    let results = fuse.search(e.target.value)

    if (e.target.value === '') this.setState({ filtered: issues })
    else this.setState({ filtered: results })
  }

  _onDragEnd = result => {
    const { dispatch, issues } = this.props
    const { source, destination, draggableId } = result
    let issue = issues.filter(i => i.id === draggableId)[0]
    const { owner, repo, number } = issue

    // dropped outside the list
    if (!destination) return

    // If the issue changed lanes
    if (source.droppableId !== destination.droppableId) {
      let labels = issue.labels
        .filter(l => l.name !== source.droppableId)
        .map(l => l.name)
      labels.push(destination.droppableId)
      console.log('labels', labels)

      dispatch(
        github.updateIssue({ owner, repo, number }, { body: { labels } })
      ).then(issue => dispatch(updateIssue({ ...issue, owner, repo })))
    } else if (source.index !== destination.index) {
      // If the issue changes position in lane
      let result = Array.from(this.state.filtered)
      let [removed] = result.splice(source.index, 1)
      result.splice(destination.index, 0, removed)

      this.setState({ filtered: result })
    }
  }

  componentWillMount() {
    this._reload()
  }

  componentDidMount() {
    const { issues } = this.props
    this.setState({ filtered: issues && issues.length > 0 ? issues : [] })
  }

  componentWillReceiveProps(props) {
    this.setState({ filtered: props.issues })
  }

  render() {
    return (
      <div>
        <header className="search">
          <input
            type="text"
            placeholder="Search for tasks..."
            onChange={this._filterIssues}
          />

          <div className="actions">
            <button className="brown basic micro button" onClick={this._reload}>
              Reload
            </button>
          </div>
        </header>
        <DragDropContext onDragEnd={this._onDragEnd}>
          <Lane lane={SWIMLANES.backlog.name} issues={this.state.filtered} />
          <Lane lane={SWIMLANES.started.name} issues={this.state.filtered} />
          <Lane lane={SWIMLANES.review.name} issues={this.state.filtered} />
          <Lane lane={SWIMLANES.complete.name} issues={this.state.filtered} />
        </DragDropContext>
      </div>
    )
  }
}

export default connect(select)(Board)
