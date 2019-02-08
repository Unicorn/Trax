import * as React from 'react'
import { reduxForm, Field } from 'redux-form'
import FormField from 'views/ui/form/FormField'

const Create: React.SFC<any> = () => {

  const submit = (values: any) => {
    // print the form values to the console
    console.log('submit', values)
  }

  return (
    <section className="create page">
      <header>
        <h1>Create Issue</h1>
        <form className="columns" onSubmit={submit}>
          <div className="left column">
            <FormField
              name="title"
              type="text"
              label="Title"
            />

            <div className="field textarea">
              <Field
                name="description"
                component="textarea"
                type="textarea"
                required
              />
              <label htmlFor="description">Description</label>
              <span />
            </div>

            <button className="basic button">Submit</button>
          </div>

          <div className="right column">
            <div className="field text">
              <span>Assignees</span>
              <input type="text" name="assignees" />
            </div>

            <div className="field text">
              <span>Milestone</span>
              <input type="text" name="milestone" />
            </div>

            <div className="field text">
              <span>Lane</span>
              <input type="text" name="labels" />
            </div>
          </div>
        </form>
      </header>
    </section>
  )
}

const formOptions = {
  form: 'createIssue',
}

export default reduxForm<any>(formOptions)(Create)
