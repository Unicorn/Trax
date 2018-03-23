import React from 'react'
import { NavLink } from 'react-router-dom'
import ProfileCard from 'views/profile/ProfileCard'
import ListIcon from 'views/ui/icons/ListIcon'
import SettingsIcon from 'views/ui/icons/SettingsIcon'
import WikiIcon from 'views/ui/icons/WikiIcon'
import { ROUTES } from 'config/constants'

const Navigation = () => (
  <nav className="drawer">
    <NavLink to={ROUTES.profile.path} activeClassName="active">
      <ProfileCard />
    </NavLink>
    <NavLink
      to={ROUTES.board.path}
      title={ROUTES.board.text}
      activeClassName="active"
    >
      <ListIcon />
    </NavLink>
    <NavLink
      to={ROUTES.report.path}
      title={ROUTES.report.text}
      activeClassName="active"
    >
      <WikiIcon />
    </NavLink>
    <NavLink
      to={ROUTES.settings.path}
      title={ROUTES.settings.text}
      activeClassName="active"
    >
      <SettingsIcon />
    </NavLink>
  </nav>
)

export default Navigation
