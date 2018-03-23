import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import startIcon from 'assets/images/icons/timer-start.svg'
import stopIcon from 'assets/images/icons/timer-stop.svg'
import { start, stop, reset } from 'controllers/timerController'

class TimerButton extends React.Component {
  render() {
    const { timer, start, stop, reset } = this.props

    return (
      <button
        title={timer.isRunning ? 'Stop Timer' : 'Start Timer'}
        className={timer.isRunning ? 'active' : null}
        onClick={() => (timer.isRunning ? stop() : start())}
      >
        <img src={timer.isRunning ? stopIcon : startIcon} alt="Start" />
      </button>
    )
  }
}

const mapStateToProps = state => {
  return { timer: state.timer }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ start, stop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TimerButton)
