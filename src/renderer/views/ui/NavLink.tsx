/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { ActivePageValues, SettingsAction } from '@/models/setting'
import { setPage } from '@/controllers/settingController'
import { RootState } from '@/models/app'

interface Props {
  className?: string
  name: ActivePageValues
  children: React.ReactNode
}

interface Connected {
  page: string
}

interface Actions {
  setPage: (value: ActivePageValues) => SettingsAction
}

const NavLink: SFC<Props & Connected & Actions> = ({ className, name, page, children, setPage }) => (
  <button className={`${className} ${name} ${name === page && 'active'}`} onClick={() => setPage(name)}>
    {children}
  </button>
)

const mapState = (state: RootState): Connected => ({
  page: state.settings.page
})

const mapDispatch = {
  setPage
}

export default connect(
  mapState,
  mapDispatch
)(NavLink)
