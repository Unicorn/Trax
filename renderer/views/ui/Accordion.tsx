import * as React from 'react'

interface Props {
  children: React.ReactNode
  trigger: string;
}

interface State {
  open: boolean
}

class Accordion extends React.Component<Props, State> {

  state = {
    open: false
  }

  _handleClick = (e: any) => {
    e.preventDefault()
    this.setState({ open: !this.state.open })
  }

  render() {
    const { trigger, children } = this.props
    const { open } = this.state

    return (
      <div className={`accordion ${open ? 'open' : 'closed'}`}>
        <div className="trigger" onClick={this._handleClick}>
          <svg className="icon" viewBox="0 0 90 62" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon
              id="Shape"
              points="28.781 10.727 29.10131 10.24653 15.74231 10.24653 15.4259 10.727 -0.0001 31.243 15.4259 51.751 28.7809 51.751 13.3549 31.243"
            />
            <polygon
              id="Shape"
              points="57.086 5.793 57.56256 5.32034 40.86756 5.32034 40.55115 5.793 21.46515 31.242 40.55115 56.68 57.08615 56.68 38.00415 31.242"
            />
            <polygon
              id="Shape"
              points="90 0.387 70.125 0.387 69.64453 1.02762 46.91053 31.24262 69.64453 61.61362 89.52353 61.61362 66.78553 31.24262 89.52353 1.02762"
            />
          </svg>
          <span className="text">{trigger}</span>
        </div>

        <div className="content">{children}</div>
      </div>
    )
  }

}

export default Accordion
