import { keys } from 'lodash'
import * as React from 'react'

interface Props {
  content: {
    [key: string]: React.ReactNode
  }
}

interface State {
  selected: number
}

class Tabbed extends React.Component<Props, State> {

  state = {
    selected: 0
  }

  _handleTabClick(e: any, i: number) {
    e.preventDefault()

    this.setState({ selected: i })
  }

  _renderTab(login: string, i: number) {
    const { selected } = this.state
    const className = selected === i ? 'active' : ''

    return (
      <button onClick={(e: any) => this._handleTabClick(e, i)} className={className}>
        <span>{login}</span>
      </button>
    )
  }

  render() {
    const { selected } = this.state
    const { content } = this.props
    const ids = keys(content)

    return (
      <div className="tabbed">
        <nav className="tabs">
          {ids.map((key, index) => this._renderTab(key, index))}
        </nav>
        <div className="pane">
          {content[ids[selected]]}
        </div>
      </div>
    )
  }

}

export default Tabbed
