import * as React from 'react'
import { connect } from 'react-redux'
import { logout } from 'controllers/authController'
import { toggleShowSearch } from 'controllers/settingController'
import { SettingsAction } from 'models/setting'
import { AppState } from 'models/app'
import Navigation from 'views/sections/Navigation'
import AlertsList from 'views/ui/alert/AlertsList'
import LoadingIcon from 'views/ui/icons/LoadingIcon'
import SearchIcon from 'views/ui/icons/SearchIcon'
import { ROUTES } from 'config/constants'

interface Props {
  children: React.ReactNode
}

interface Actions {
  alerts: any
  page: string
  showSearch: boolean
  toggleShowSearch: (value: boolean) => SettingsAction
}

const Dashboard: React.SFC<Props & Actions> = (props) => {

  const { children, page, showSearch, toggleShowSearch } = props

  const _renderBoardActions = () => [
    <button key="search" onClick={() => toggleShowSearch(!showSearch)}><SearchIcon /></button>,
    <button key="loading"><LoadingIcon /></button>
  ]

  return (
    <div>
      <div>
        <header className="toolbar">
          <div className="actions">
            {page === ROUTES.board.name && _renderBoardActions()}
          </div>
        </header>

        <AlertsList />

        <Navigation />
      </div>

      <main className="dashboard">
        {children}
      </main>
    </div>
  )
}

const mapState = (state: AppState) => ({
  alerts: state.alerts,
  page: state.settings.page,
  showSearch: state.settings.showSearch
})

const mapDispatch = ({
  toggleShowSearch,
  logout
})

export default connect(mapState, mapDispatch)(Dashboard)
