import * as React from 'react'
import { connect } from 'react-redux'

import { labelNames } from 'helpers/issueHelper'
import { Tracks } from 'models/track'
import { TYPES, SWIMLANES, PRIORITY } from 'config/constants'

import { Editor } from 'views/ui/form/Editor'
import { FormField, OptionsObject } from 'views/ui/form/FormField'

interface Connected {
  tracks: Tracks
  dispatch: (action: any) => any
}

interface State {
  [key: string]: string
}

const defaultState = {
  title: '',
  type: '',
  lane: 'backlog',
  priority: '',
  assignee: '',
  repo: '',
  body: ''
}

class CreatePage extends React.Component<Connected, State> {

  state = defaultState
  repoOptions: OptionsObject = {}
  userOptions: OptionsObject = {}

  _submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, type, lane, priority, assignee, repo, body } = this.state

    let payload = {
      title,
      body,
      labels: labelNames([type, priority, lane]),
      assignees: [assignee],
    }

    // @TODO: finish connecting this function
    console.log("CREATE ISSUE HERE", payload, repo)

    this.setState(defaultState)
  }

  _fieldHandler = (e: any) => {
    let newData: State = { ...this.state }

    if (e._cache) {
      newData['body'] = e.toString('markdown')
    }
    else {
      let input = (e as React.FormEvent<HTMLInputElement>).currentTarget
      newData[input.name] = input.value
    }

    this.setState(newData)
  }

  // _repoSelectHandler = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const { tracks } = this.props
  //   let value = e.currentTarget.value
  //   let trackKey = findKey(tracks, { ident: value })
  //   this.setState({ repo: value })
  //
  //   if (trackKey) {
  //     tracks[trackKey].users.forEach(u => {
  //       this.userOptions[u.login] = { label: u.login }
  //     })
  //   }
  // }

  render() {
    // const { tracks } = this.props
    const { type, priority, lane, assignee } = this.state

    // keys(tracks).forEach(key => {
    //   this.repoOptions[tracks[key].ident] = {
    //     label: tracks[key].ident
    //   }
    // })

    return (
      <section className="create page">
        <form className="golden-ratio columns" onSubmit={this._submitHandler}>
          <div className="left column">
            <h1>Create Issue</h1>

            <FormField
              name="repo"
              type="select"
              label="Repo"
              options={this.repoOptions}
              // onChange={this._repoSelectHandler}
              required
            />

            <FormField
              name="assignee"
              type="select"
              label="Assigned to"
              options={this.userOptions}
              selected={assignee}
              onChange={this._fieldHandler}
            />

            <FormField
              name="title"
              type="text"
              label="Title"
              onChange={this._fieldHandler}
              required
            />

            <FormField
              name="priority"
              type="group"
              label="Priority"
              options={PRIORITY}
              selected={priority}
              onChange={this._fieldHandler}
            />

            <FormField
              name="type"
              type="group"
              label="Type"
              options={TYPES}
              selected={type}
              onChange={this._fieldHandler}
            />

            <FormField
              name="lane"
              type="group"
              label="Swimlane"
              options={SWIMLANES}
              selected={lane}
              onChange={this._fieldHandler}
            />

            <button className="large teal button">Submit</button>
          </div>

          <div className="right column">
            <Editor handler={this._fieldHandler} />
          </div>
        </form>
      </section>
    )
  }
}

const mapState = (state: any) => ({
  tracks: state.tracks
})

export default connect(mapState)(CreatePage)
