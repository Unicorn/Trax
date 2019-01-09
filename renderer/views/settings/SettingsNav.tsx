import * as React from 'react'

interface State {
  selected: number
}

class SettingsNav extends React.Component<{}, State> {

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

  _renderPane(selected: number) {
    switch(selected) {
      case 0:
        return (
          <ul className="labels">
            <li>
              <input type="text" placeholder="Label 1" />
            </li>
          </ul>
        )
      default:
        return null
    }
  }

  render() {
    const { selected } = this.state

    return (
      <div className="tabbed">
        <nav className="controls">
          <div className="tabs">
            {this._renderTab('Labels', 0)}
            {this._renderTab('Test', 1)}
          </div>
        </nav>
        <div className="pane">
          {this._renderPane(selected)}
        </div>
      </div>
    )
  }

}

export default SettingsNav
