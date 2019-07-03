/** @jsx createElement **/
import { createElement, FC, MouseEvent } from 'react'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
  trigger: string
}

const Accordion: FC<Props> = (props: Props) => {
  const { trigger, children } = props
  const [open, setOpen] = useState(false)

  const _handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <div className={`accordion ${open ? 'open' : 'closed'}`}>
      <div className="trigger" onClick={_handleClick}>
        <svg className="icon" viewBox="0 0 90 62" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon points="28.781 10.727 29.10131 10.24653 15.74231 10.24653 15.4259 10.727 -0.0001 31.243 15.4259 51.751 28.7809 51.751 13.3549 31.243" />
          <polygon points="57.086 5.793 57.56256 5.32034 40.86756 5.32034 40.55115 5.793 21.46515 31.242 40.55115 56.68 57.08615 56.68 38.00415 31.242" />
          <polygon points="90 0.387 70.125 0.387 69.64453 1.02762 46.91053 31.24262 69.64453 61.61362 89.52353 61.61362 66.78553 31.24262 89.52353 1.02762" />
        </svg>
        <span className="text">{trigger}</span>
      </div>

      <div className="content">{children}</div>
    </div>
  )
}

export default Accordion
