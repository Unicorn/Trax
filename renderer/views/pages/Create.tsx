import * as React from 'react'
import RichTextEditor, { EditorValue } from 'react-rte'
import FormField from 'views/ui/form/FormField'
import { TYPES, SWIMLANES } from 'config/constants'

interface State {
  [key: string]: string | EditorValue
}

type FieldHandler = (e: React.FormEvent<HTMLInputElement> | EditorValue) => void

// declare function _fieldHandler(e: React.FormEvent<HTMLInputElement>): void
// declare function _fieldHandler(e: EditorValue): void

const Create: React.SFC<any> = () => {
  const [formData, setFormData] = React.useState<State>({
    title: '',
    type: '',
    lane: '',
    repo: '',
    description: RichTextEditor.createEmptyValue()
  })

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // print the form values to the console
    console.log('submit', e.currentTarget)
  }

  const _fieldHandler: FieldHandler = (e) => {
    let newData: State = { ...formData }

    if (e instanceof EditorValue) {
      newData['description'] = e
    }
    else {
      let input = (e as React.FormEvent<HTMLInputElement>).currentTarget
      newData[input.name] = input.value
    }

    console.log("newData", newData)

    setFormData(newData)
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
              onChange={_fieldHandler}
              required
            />

            <FormField
              name="type"
              type="select"
              label="Type"
              options={TYPES}
              onChange={_fieldHandler}
              required
            />

            <FormField
              name="lane"
              type="select"
              label="Swimlane"
              options={SWIMLANES}
              onChange={_fieldHandler}
              required
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
              onChange={_fieldHandler}
              required
            />

            <button className="basic button">Submit</button>
          </div>

          <div className="right column">
            <RichTextEditor
              className="rich-text"
              editorClassName="rich-text-editor"
              toolbarClassName="rich-text-toolbar"
              editorStyle={{ height: "calc(100vh - 20rem)"  }}
              onChange={_fieldHandler}
              value={formData.description as EditorValue}
            />
          </div>
        </form>
      </header>
    </section>
  )
}

export default Create
