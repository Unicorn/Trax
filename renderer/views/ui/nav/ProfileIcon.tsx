import * as React from 'react'
import { connect } from 'react-redux'

interface Connected {
  avatar: string;
}

const ProfileIcon: React.SFC<Connected> = ({ avatar }) => (
  <div className="profile">
    <img src={avatar} alt="Profile avatar" height="50px" width="50px" />
  </div>
)

const mapState = (state: any) => ({
  avatar: state.profile.avatarUrl
})

export default connect(mapState)(ProfileIcon)
