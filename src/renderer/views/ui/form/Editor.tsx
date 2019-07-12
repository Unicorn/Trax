/** @jsx createElement **/
import { createElement, SFC, FormEvent } from 'react'
import SelectField from './SelectField'
import { TYPES, ScrumTypes } from '@/config/constants'

interface Props {
  template: ScrumTypes
  markdown: string
  markdownHandler: (e: FormEvent<HTMLTextAreaElement>) => void
  templateHandler: (e: FormEvent<HTMLSelectElement>) => void
}

const Editor: SFC<Props> = ({ template, markdown, markdownHandler, templateHandler }) => {
  return (
    <div className="editor">
      <SelectField
        name="template"
        type="select"
        label="Template"
        options={TYPES}
        onChange={templateHandler}
        selected={template}
        value={template}
        required
      />

      <textarea name="markdown" onChange={markdownHandler} value={markdown}></textarea>
    </div>
  )
}

export default Editor
