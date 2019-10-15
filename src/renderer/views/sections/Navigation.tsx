/** @jsx createElement **/
import { createElement, SFC } from 'react'
import * as NavIcon from '@/views/ui/nav'
import NavLink from '@/views/ui/NavLink'
import { ROUTES } from '@/config/routes'

const Navigation: SFC = () => {
  return (
    <nav className="main-navigation">
      <NavLink name={ROUTES.profile.name}>
        <NavIcon.Profile />
      </NavLink>
      <NavLink name={ROUTES.create.name}>
        <NavIcon.Create />
      </NavLink>
      <NavLink name={ROUTES.board.name}>
        <NavIcon.Board />
      </NavLink>
      <NavLink name={ROUTES.timers.name}>
        <NavIcon.Timers />
      </NavLink>
      <NavLink name={ROUTES.invoices.name}>
        <NavIcon.Invoices />
      </NavLink>
      <NavLink name={ROUTES.settings.name}>
        <NavIcon.Settings />
      </NavLink>
    </nav>
  )
}

export default Navigation
