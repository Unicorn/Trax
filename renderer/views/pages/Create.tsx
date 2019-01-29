import * as React from 'react'
import { reduxForm, Field } from 'redux-form'

const Create: React.SFC<{}> = () => {

  return (
    <section className="create page">
      <header>
        <h1>Create Issue</h1>
        <form className="columns">
          <div className="left column">
            <div className="field text">
              <Field
                name="title"
                component="input"
                type="text"
                required
              />
              <label htmlFor="title">Title</label>
              <span />
            </div>

            <div className="field text">
              <span>Description</span>
              <textarea name="body"></textarea>
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


export default reduxForm<any>({})(Create)
