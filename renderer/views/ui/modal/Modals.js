import React from 'react'
import { connect } from 'react-redux'
import { closeModal } from 'controllers/modalController'
import ModalPortal from './ModalPortal'
import Modal from './Modal'

const select = state => {
  return {
    modals: state.modals,
  }
}

const Modals = ({ modals, dispatch }) => {
  if (!modals || modals.length < 1) return null

  return modals.map(modal => (
    <ModalPortal key={modal.id}>
      <Modal {...modal} closeHandler={modal => dispatch(closeModal(modal))} />
    </ModalPortal>
  ))
}

export default connect(select)(Modals)
