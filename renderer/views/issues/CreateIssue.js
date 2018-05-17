import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { createIssue } from 'controllers/issuesController'
import { closeModal } from 'controllers/modalController'
import FormField from 'views/ui/form/FormField'
import SelectField from 'views/ui/form/SelectField'
import { SWIMLANES } from 'config/constants'

const submit = (values, dispatch) => {
  const [owner, repo] = values.ident.split('/')
  const body = {
    assignees: [values.assignee],
    title: values.title,
    body: values.body,
    labels: [values.lane],
  }

  return dispatch(createIssue({ owner, repo, body }))
}

const CreateIssue = ({ tracks, error, pristine, submitting, handleSubmit }) => {
  const { backlog, started, review, complete } = SWIMLANES

  return (
    <form className="create issue" onSubmit={handleSubmit(submit)}>
      <Field name="assignee" component="input" type="hidden" />
      <Field
        name="ident"
        label="Repo"
        options={tracks.map(r => ({ value: r.ident, label: r.ident }))}
        component={SelectField}
        type="select"
      />
      <FormField
        name="title"
        label="Issue Title"
        component="input"
        type="text"
        required
      />
      <FormField
        name="body"
        label="Issue Body"
        component="textarea"
        type="textarea"
        required
      />
      <FormField
        name="lane"
        label={backlog.label}
        value={backlog.name}
        component="input"
        type="radio"
      />
      <FormField
        name="lane"
        label={started.label}
        value={started.name}
        component="input"
        type="radio"
      />
      <FormField
        name="lane"
        label={review.label}
        value={review.name}
        component="input"
        type="radio"
      />
      <FormField
        name="lane"
        label={complete.label}
        value={complete.name}
        component="input"
        type="radio"
      />

      <div className="actions field">
        <button className="teal button" disabled={pristine || submitting}>
          Submit
        </button>
        {error && <span className="error red text">{error}</span>}
      </div>
    </form>
  )
}

const formOptions = {
  form: 'createIssue',
  onSubmitSuccess: (result, dispatch) => dispatch(closeModal()),
}

const mapStateToProps = state => {
  return {
    tracks:  Object.entries(state.tracks).map(o => o[1])
  }
}

export default reduxForm(formOptions)(connect(mapStateToProps)(CreateIssue))
