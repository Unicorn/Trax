import * as React from 'react'

interface Props {
  tabHandler?: (name: string, index: number) => void
  content: {
    [key: string]: React.ReactNode
  }
}

interface State {
  selected: number
}

class Tabbed extends React.Component<Props, State> {

  state = {
    selected: -1
  }

  componentWillReceiveProps(props: Props) {
    // Only run this once
    if (this.state.selected >= 0)
      return

    const { content, tabHandler } = props
    let key = Object.keys(content)[0]

    this.setState({ selected: 0 })

    if (key && tabHandler)
      tabHandler(key, 0)
  }

  _handleTabClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const { tabHandler } = this.props
    const input = e.currentTarget
    e.preventDefault()

    if (tabHandler)
      tabHandler(input.name, parseInt(input.value))

    this.setState({ selected: parseInt(e.currentTarget.value) })
  }

  _renderTab(tabText: string, i: number) {
    const { selected } = this.state
    const className = selected === i ? 'active' : ''

    return (
      <button key={`tab-${i}`} onClick={this._handleTabClick} className={className} name={tabText} value={i}>
        <span>{tabText}</span>
      </button>
    )
  }

  render() {
    const { selected } = this.state
    const { content } = this.props
    const ids = Object.keys(content)

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
