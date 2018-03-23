import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteAlert } from 'controllers/alertController'
import iconClose from 'assets/images/icons/close.svg'

const Alert = ({ dispatch, data: { id, type, message, dismissable } }) => (
  <div className={`alert ${type}`}>
    {message}

    {dismissable && (
      <img
        onClick={() => dispatch(deleteAlert(id))}
        className="close icon"
        src={iconClose}
        alt="x"
      />
    )}
  </div>
)

Alert.defaultProps = {
  data: {
    type: 'normal',
    dismissable: true,
  },
}

Alert.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    dismissable: PropTypes.bool,
  }),
}

export default connect()(Alert)
