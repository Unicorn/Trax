import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from 'views/ui/icons/CloseIcon'

const Modal = ({ children, title, closeHandler }) => (
  <div className="overlay">
    <div className="modal">
      <header>
        <h2>{title}</h2>
        <button className="close null" onClick={() => closeHandler()}>
          <CloseIcon />
        </button>
      </header>
      <div className="content">{children}</div>
    </div>
  </div>
)

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
