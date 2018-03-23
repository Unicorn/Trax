import * as React from 'react'
import { ReadyState, QueryRenderer, graphql } from 'react-relay'
import { connect } from 'react-redux'
import { environment } from 'controllers/relayController'
import { createAlert } from 'controllers/alertController'

type FragmentData = {
  login: string;
  name: string;
  id: string;
}

type RepoNavigationProps = {
  selected: boolean;
  handleTabClick: (e: Event, data: FragmentData) => void;
  createAlert: (payload) => void;
}

const RepoNavigation = ({ selected, handleTabClick, createAlert }) => {
  const query = graphql`
    query RepoNavigationQuery {
      viewer {
        organizations(first: 10) {
          totalCount
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
      key={data.name}
      onClick={e => handleTabClick(e, data)}
      className={selected === data.login ? 'active' : ''}
    >
      <span>{data.name}</span>
    </button>
  )

  const _render = ({ error, props }: ReadyState) => {
    let nav = [_renderTab({ id: null, login: 'Personal', name: 'Personal' })]

    if (error) {
      createAlert({
        dismissable: true,
        type: 'error',
        error: error.message
      })
    }

    if (props && props.viewer && props.viewer.organizations && props.viewer.organizations.nodes) {
      props.viewer.organizations.nodes.forEach(n => nav.push(_renderTab(n)))
    }

    return nav
  }

  return <QueryRenderer environment={environment} query={query} render={_render} />
}

export default connect(null, { createAlert })(RepoNavigation)
