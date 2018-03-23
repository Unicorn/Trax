import * as React from 'react'
import { ReadyState, QueryRenderer, graphql } from 'react-relay'
import { environment } from 'controllers/relayController'

const render = ({ error, props }: ReadyState) => {
  if (error) {
    return <div>{error.message}</div>
  }
  else if (props) {
    return (
      <div className="profile">
        <img src={props.viewer.avatarUrl} alt="Profile avatar" />
      </div>
    )
  }
  else {
    return <div>Loading</div>
  }
}

const ProfileCard = () => {
  const query = graphql`
    query ProfileCardQuery {
      viewer {
        avatarUrl
      }
    }
  `

  return (
    <QueryRenderer variables={{}} environment={environment} query={query} render={render} />
  )
}

export default ProfileCard
