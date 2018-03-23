import React from 'react'
import uuid from 'uuid'
import { QueryRenderer, graphql } from 'react-relay'
import { environment } from 'controllers/relayController'

const RepoNavigation = ({ selected, handleTabClick }) => {
  const query = graphql`
    query RepoNavigationQuery {
      viewer {
        organizations(first: 4) {
          nodes {
            login
            name
            id
          }
        }
      }
    }
  `

  const _renderTab = data => (
    <button
      key={uuid()}
      onClick={e => handleTabClick(e, data)}
      className={selected === data.login ? 'active' : ''}
    >
      <span>{data.name}</span>
    </button>
  )

  const _renderNavigation = ({ error, props }) => {
    let nav = [_renderTab({ id: null, login: 'Personal', name: 'Personal' })]

    if (props)
      props.viewer.organizations.nodes.forEach(n => nav.push(_renderTab(n)))

    return nav
  }

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      render={_renderNavigation}
    />
  )
}

export default RepoNavigation
