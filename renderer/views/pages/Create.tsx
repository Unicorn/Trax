import * as React from 'react'
import FormField from 'views/ui/form/FormField'
import { TYPES, SWIMLANES } from 'config/constants'

const Create: React.SFC<any> = () => {

  const submit = (values: any) => {
    // print the form values to the console
    console.log('submit', values)
  }

  return (
    <section className="create page">
      <header>
        <h1>Create Issue</h1>
        <form className="golden-ratio columns" onSubmit={submit}>
          <div className="left column">
            <FormField
              name="title"
              type="text"
              label="Title"
            />

            <FormField
              name="type"
              type="select"
              label="Type"
              options={TYPES}
            />

            <FormField
              name="lane"
              type="select"
              label="Swimlane"
              options={SWIMLANES}
            />

            <FormField
              name="repo"
              type="select"
              label="Repo"
              options={{
                'UnicornAgency/Trax': {
                  label: 'UnicornAgency/Trax'
                }
              }}
            />

            <button className="basic button">Submit</button>
          </div>

          <div className="right column">
            <FormField
              name="description"
              type="textarea"
              label="Description"
            />
          </div>
        </form>
      </header>
    </section>
  )
}

export default Create
