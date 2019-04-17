import * as React from 'react'
import { connect } from 'react-redux'
import { resetApp } from 'models/app'

interface Props {
  resetApp: () => void
}

const AppSettings: React.SFC<Props> = (props) => {
  const { resetApp } = props

  return (
    <button className="red button" onClick={resetApp}>Reset Application Data</button>
  )
}

const mapDispatch = ({
  resetApp
})

export default connect(null, mapDispatch)(AppSettings)
