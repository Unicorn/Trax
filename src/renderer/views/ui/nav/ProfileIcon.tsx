/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { RootState } from '@/models/app'

interface Connected {
  avatar: string
}

const _errorHandler = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  console.log('error loading profile image', e)
  e.currentTarget.setAttribute('src', '')
}

const ProfileIcon: SFC<Connected> = ({ avatar }) => (
  <div className="profile">
    <img src={avatar} alt="Profile avatar" height="50px" width="50px" onError={_errorHandler} />
  </div>
)

const mapState = (state: RootState): Connected => ({
  avatar: state.profile.avatarUrl
})

export default connect(mapState)(ProfileIcon)
