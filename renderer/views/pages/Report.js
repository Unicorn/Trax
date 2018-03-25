import React from 'react'
import { connect } from 'react-redux'
import IssueTable from 'views/issues/IssueTable'
import { setSelected, setInvoiced } from 'controllers/timerController'

class Report extends React.Component {
  state = {
    selected: false,
  }

  selectHandler = () => {
    const { setSelected, timers } = this.props
    timers.forEach(t => setSelected(t.id, !this.state.selected))
    this.setState({ selected: !this.state.selected })
  }

  invoiceHandler = () => {
    const { setInvoiced, setSelected, timers } = this.props
    timers
      .filter(t => t.selected)
      .filter(t => t.selected)
      .forEach(t => {
        setInvoiced(t.id, !t.invoiced)
        setSelected(t.id, false)
      })
  }

  render() {
    const { issues, timers } = this.props
    const filtered = timers.filter(t => t.selected)

    return (
      <section className="report page">
        <header className="title">
          <h1>Time Entries</h1>
          <div className="actions">
            <button
              className="brown basic micro button"
              disabled={filtered.length < 1}
              onClick={this.invoiceHandler}
            >
              Generate Invoice
            </button>
          </div>
        </header>
        <IssueTable issues={issues} selectHandler={this.selectHandler} />
      </section>
    )
  }
}

const mapStateToProps = state => {
  let allIssues = Object.entries(state.issues).map(o => o[1])
  let filteredIssues = allIssues.filter(issue => state.timer[issue.id])
  return {
    issues: filteredIssues,
    timers: Object.entries(state.timer).map(o => o[1]),
  }
}

export default connect(mapStateToProps, { setSelected, setInvoiced })(Report)
