import React from 'react'

class Accordion extends React.Component {
  constructor(props) {
    super(props)

    // Bind class methods
    this.handleTriggerClick = this.handleTriggerClick.bind(this)
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this)
    this.continueOpenAccordion = this.continueOpenAccordion.bind(this)

    // Defaults the dropdown to be closed
    if (props.open) {
      this.state = {
        isClosed: false,
        shouldSwitchAutoOnNextCycle: false,
        height: 'auto',
        transition: 'none',
        hasBeenOpened: true,
        overflow: props.overflowWhenOpen,
        inTransition: false,
      }
    } else {
      this.state = {
        isClosed: true,
        shouldSwitchAutoOnNextCycle: false,
        height: 0,
        transition: `height ${props.transitionTime}ms ${props.easing}`,
        hasBeenOpened: false,
        overflow: 'hidden',
        inTransition: false,
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shouldOpenOnNextCycle) this.continueOpenAccordion()

    if (
      prevState.height === 'auto' &&
      this.state.shouldSwitchAutoOnNextCycle === true
    ) {
      window.setTimeout(() => {
        // Set small timeout to ensure a true re-render
        this.setState({
          height: 0,
          overflow: 'hidden',
          isClosed: true,
          shouldSwitchAutoOnNextCycle: false,
        })
      }, 50)
    }

    // If there has been a change in the open prop (controlled by accordion)
    if (prevProps.open !== this.props.open)
      this.props.open === true ? this.openAccordion() : this.closeAccordion()
  }

  closeAccordion() {
    this.setState({
      shouldSwitchAutoOnNextCycle: true,
      height: this.refs.inner.offsetHeight,
      transition: `height ${this.props.transitionTime}ms ${this.props.easing}`,
      inTransition: true,
    })
  }

  openAccordion() {
    this.setState({
      inTransition: true,
      shouldOpenOnNextCycle: true,
    })
  }

  continueOpenAccordion() {
    this.setState({
      height: this.refs.inner.offsetHeight,
      transition: `height ${this.props.transitionTime}ms ${this.props.easing}`,
      isClosed: false,
      hasBeenOpened: true,
      inTransition: true,
      shouldOpenOnNextCycle: false,
    })
  }

  handleTriggerClick(event) {
    event.preventDefault()

    if (this.props.triggerDisabled) return

    if (this.props.handleTriggerClick) {
      this.props.handleTriggerClick(this.props.accordionPosition)
    } else {
      if (this.state.isClosed === true) {
        this.openAccordion()
        this.props.onOpening()
      } else {
        this.closeAccordion()
        this.props.onClosing()
      }
    }
  }

  renderNonClickableTriggerElement() {
    if (
      this.props.triggerSibling &&
      typeof this.props.triggerSibling === 'string'
    ) {
      return (
        <span className="trigger sibling">{this.props.triggerSibling}</span>
      )
    } else if (this.props.triggerSibling) {
      return <this.props.triggerSibling />
    }

    return null
  }

  handleTransitionEnd() {
    // Switch to height auto to make the container responsive
    if (!this.state.isClosed) {
      this.setState({
        height: 'auto',
        overflow: this.props.overflowWhenOpen,
        inTransition: false,
      })
      this.props.onOpen()
    } else {
      this.setState({ inTransition: false })
      this.props.onClose()
    }
  }

  render() {
    const { className, isClosed, openedClassName } = this.props

    var dropdownStyle = {
      height: this.state.height,
      WebkitTransition: this.state.transition,
      msTransition: this.state.transition,
      transition: this.state.transition,
      overflow: this.state.overflow,
    }

    var openClass = this.state.isClosed ? 'closed' : 'open'
    var disabledClass = this.props.triggerDisabled ? 'disabled' : ''

    //If user wants different text when tray is open
    var trigger =
      this.state.isClosed === false && this.props.triggerWhenOpen !== undefined
        ? this.props.triggerWhenOpen
        : this.props.trigger

    // Don't render children until the first opening of the Accordion if lazy rendering is enabled
    var children =
      this.props.lazyRender &&
      !this.state.hasBeenOpened &&
      this.state.isClosed &&
      !this.state.inTransition
        ? null
        : this.props.children

    return (
      <div className={`${className} ${isClosed && openedClassName}`}>
        <div
          className={`trigger ${openClass} ${disabledClass}`}
          onClick={this.handleTriggerClick}
        >
          <svg
            className="icon"
            viewBox="0 0 90 62"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
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

        {this.renderNonClickableTriggerElement()}

        <div
          className="content outer"
          ref="outer"
          style={dropdownStyle}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <div className="content inner" ref="inner">
            {children}
          </div>
        </div>
      </div>
    )
  }
}

// Accordion.propTypes = {
//   transitionTime: PropTypes.number,
//   easing: PropTypes.string,
//   open: PropTypes.bool,
//   accordionPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   handleTriggerClick: PropTypes.func,
//   onOpen: PropTypes.func,
//   onClose: PropTypes.func,
//   onOpening: PropTypes.func,
//   onClosing: PropTypes.func,
//   trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
//   triggerWhenOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
//   triggerDisabled: PropTypes.bool,
//   lazyRender: PropTypes.bool,
//   overflowWhenOpen: PropTypes.oneOf([
//     'hidden',
//     'visible',
//     'auto',
//     'scroll',
//     'inherit',
//     'initial',
//     'unset',
//   ]),
//   triggerSibling: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
// }

Accordion.defaultProps = {
  className: 'accordion',
  easing: 'linear',
  lazyRender: false,
  open: false,
  overflowWhenOpen: 'hidden',
  transitionTime: 400,
  triggerDisabled: false,
  triggerSibling: null,
  onOpen: () => {},
  onClose: () => {},
  onOpening: () => {},
  onClosing: () => {},
}

export default Accordion
