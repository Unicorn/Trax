import React from 'react'
import { createPaginationContainer, graphql } from 'react-relay'

import RepoItem from './RepoItem'
import RepoPagination from './RepoPagination'

const OrgRepoList = ({ relay, data, tracks }) => {
  let repositories = data.viewer.organization.repositories

  const _loadMore = e => {
    e.preventDefault()
    relay.loadMore(10, () => {})
  }

  return (
    <ul className="masonry thirds list">
      {repositories.edges.map(edge => (
        <RepoItem repository={edge.node} key={edge.node.id} />
      ))}

      <RepoPagination repositories={repositories} loadMoreHandler={_loadMore} />
    </ul>
  )
}

export default createPaginationContainer(
  OrgRepoList,
  graphql`
    fragment OrgRepoList on Query {
      viewer {
        organization(login: $login) {
          repositories(first: $count, after: $cursor)
            @connection(key: "OrgRepoList_repositories") {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                ...RepoItem_repository
              }
            }
          }
        }
      }
    }
  `,
  {
    getVariables(props, { count, cursor, login }) {
      return { count, cursor, login }
    },
    query: graphql`
      query OrgRepoListQuery($count: Int!, $cursor: String, $login: String!) {
        ...OrgRepoList
      }
    `,
  }
)
