import * as React from 'react'
import NavLink from 'views/ui/NavLink'
import ListIcon from 'views/ui/icons/ListIcon'
import SettingsIcon from 'views/ui/icons/SettingsIcon'
import ReportIcon from 'views/ui/icons/ReportIcon'
import InvoiceIcon from 'views/ui/icons/InvoiceIcon'
import { ROUTES } from 'config/constants'

const Navigation = () => (
  <nav className="drawer">
    <NavLink name={ROUTES.welcome.name}>Welcome</NavLink>
    <NavLink name={ROUTES.profile.name}>Profile</NavLink>
    <NavLink name={ROUTES.board.name}><ListIcon /></NavLink>
    <NavLink name={ROUTES.report.name}><ReportIcon /></NavLink>
    <NavLink name={ROUTES.invoice.name}><InvoiceIcon /></NavLink>
    <NavLink name={ROUTES.settings.name}><SettingsIcon /></NavLink>
  </nav>
)

export default Navigation
