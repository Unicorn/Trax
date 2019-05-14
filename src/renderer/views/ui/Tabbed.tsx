import * as React from 'react'
import { useEffect, useState } from 'react'

interface Props {
  tabHandler?: (name: string, index: number) => void
  content: {
    [key: string]: React.ReactNode
  }
}

const Tabbed: React.FunctionComponent<Props> = (props: Props) => {
  const [ selected, handleSelected ] = useState( -1 )
  const {
    content
  } = props
  const ids = Object.keys(content)

  useEffect(() => {
    if (selected >= 0) return

    const { content, tabHandler } = props
    let key = Object.keys(content)[0]

    handleSelected(0)
    if (key && tabHandler) tabHandler(key, 0)
  }, [props])

  function _handleTabClick(e: React.FormEvent<HTMLButtonElement>) {
    const { tabHandler } = props
    const { name, value } = e.currentTarget

    e.preventDefault()

    if (tabHandler) tabHandler(name, parseInt(value))

    handleSelected(parseInt(value))
  }

  return (
    <div className="tabbed">
      <nav className="tabs">
        {ids.map((key, index) => {

          const className = selected === index ? 'active' : ''

          return (
            <button key={`tab-${index}`} onClick={_handleTabClick} className={className} name={key} value={index}>
              <span>{key}</span>
            </button>
          ) 

        })}
      </nav>
      <div className="pane">
        {content[ids[selected]]}
      </div>
    </div>
  )
}

export default Tabbed