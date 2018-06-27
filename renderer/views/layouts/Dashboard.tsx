import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { ROUTES } from 'config/constants'

const Dashboard: React.SFC = () => (
  <Redirect to={ROUTES.welcome.path} />
)

export default Dashboard
