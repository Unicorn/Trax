import * as React from 'react'

interface Props {
  avatar: string;
}

const ProfileCard: React.SFC<Props> = ({ avatar }) => (
  <div className="profile">
    <img src={avatar} alt="Profile avatar" />
  </div>
)

export default ProfileCard
