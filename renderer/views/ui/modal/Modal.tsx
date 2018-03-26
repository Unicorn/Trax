import React from 'react'
import CloseIcon from 'views/ui/icons/CloseIcon'

type ModalProps = {
  title: string;
  children: React.ReactNode;
  closeHandler: () => void;
}

const Modal: React.SFC<ModalProps> = ({ children, title, closeHandler }) => (
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

export default Modal
