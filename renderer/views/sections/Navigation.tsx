import * as React from 'react'
import NavLink from 'views/ui/NavLink'
import ProfileCard from 'views/profile/ProfileCard'
import CreateIcon from 'views/ui/icons/CreateIcon'
import ListIcon from 'views/ui/icons/ListIcon'
import SettingsIcon from 'views/ui/icons/SettingsIcon'
import ReportIcon from 'views/ui/icons/ReportIcon'
import InvoiceIcon from 'views/ui/icons/InvoiceIcon'
import { ROUTES } from 'config/constants'

const Navigation = () => (
  <nav className="main-navigation">
    <NavLink name={ROUTES.profile.name}><ProfileCard /></NavLink>
    <NavLink name={ROUTES.create.name}><CreateIcon /></NavLink>
    <NavLink name={ROUTES.board.name}><ListIcon /></NavLink>
    <NavLink name={ROUTES.report.name}><ReportIcon /></NavLink>
    <NavLink name={ROUTES.invoice.name}><InvoiceIcon /></NavLink>
    <NavLink name={ROUTES.settings.name}><SettingsIcon /></NavLink>
  </nav>
)

export default Navigation
