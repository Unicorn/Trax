/** @jsx createElement **/
import { createElement, FC, ReactNode, useEffect, useState } from 'react'

interface Props {
  tabHandler?: (name: string, index: number) => void
  content: {
    [key: string]: ReactNode
  }
}

const Tabbed: FC<Props> = (props: Props) => {
  const [selected, handleSelected] = useState(-1)
  const { content } = props
  const ids = Object.keys(content)

  useEffect(() => {
    if (selected >= 0) return

    const { content, tabHandler } = props
    const key = Object.keys(content)[0]

    handleSelected(0)
    if (key && tabHandler) tabHandler(key, 0)
  }, [props])

  const _handleTabClick = (e: React.FormEvent<HTMLButtonElement>): void => {
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
      <div className="pane">{content[ids[selected]]}</div>
    </div>
  )
}

export default Tabbed
