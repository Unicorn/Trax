import React from 'react'
import ReactDOM from 'react-dom'

const MODAL_ROOT = document.getElementById('modal-root')

class ModalPortal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    MODAL_ROOT.appendChild(this.el)
  }

  componentWillUnmount() {
    MODAL_ROOT.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default ModalPortal
