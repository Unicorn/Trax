import * as React from 'react'
import { ReadyState, QueryRenderer, graphql } from 'react-relay'
import { connect } from 'react-redux'
import { environment } from 'controllers/relayController'
import { createAlert } from 'controllers/alertController'
import { TAlert } from 'types/alert'

type FragmentData = {
  login: string;
  name: string;
  id: string;
}

type RepoNavigationProps = {
  selected: string;
  handleTabClick: (e: React.MouseEvent<HTMLButtonElement>, data: FragmentData) => void;
  createAlert: (payload: TAlert) => void;
}

const RepoNavigation: React.SFC<RepoNavigationProps> = (props) => {
  const { selected, handleTabClick, createAlert } = props
  const variables = {}
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

  const _renderTab = (data: FragmentData) => (
    <button
      key={data.name}
      onClick={e => handleTabClick(e, data)}
      className={selected === data.login ? 'active' : ''}
    >
      <span>{data.name}</span>
    </button>
  )

  const _render = ({ error, props }: ReadyState) => {
    let nav = [_renderTab({ id: 'personal', login: 'Personal', name: 'Personal' })]

    if (error) {
      createAlert({
        dismissable: true,
        type: 'error',
        message: error.message
      })
    }

    if (props && props.viewer && props.viewer.organizations && props.viewer.organizations.nodes) {
      props.viewer.organizations.nodes.forEach((n: FragmentData) => nav.push(_renderTab(n)))
    }

    return nav
  }

  return (
    <QueryRenderer
      variables={variables}
      environment={environment}
      query={query}
      render={_render}
    />
  )
}

export default connect(null, { createAlert })(RepoNavigation)
