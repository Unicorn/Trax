/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { ActivePageValues, SettingsAction } from '@/models/setting'
import { setPage } from '@/controllers/settingController'

interface Props {
  className?: string
  name: ActivePageValues
  page: string
  children: React.ReactNode
}

interface Actions {
  setPage: (value: ActivePageValues) => SettingsAction
}

const NavLink: SFC<Props & Actions> = ({ className, name, page, children, setPage }) => (
  <button className={`${className} ${name} ${name === page && 'active'}`} onClick={() => setPage(name)}>
    {children}
  </button>
)

const mapState = (state: any) => ({
  page: state.settings.page
})

const mapDispatch = {
  setPage
}

export default connect(
  mapState,
  mapDispatch
)(NavLink)
