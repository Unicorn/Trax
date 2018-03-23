import React from 'react'
import { createPaginationContainer, graphql } from 'react-relay'

import RepoItem from './RepoItem'
import RepoPagination from './RepoPagination'

const PersonalRepoList = ({ relay, data, tracks }) => {
  let repositories = data.viewer.repositories

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
  PersonalRepoList,
  graphql`
    fragment PersonalRepoList on Query {
      viewer {
        repositories(first: $count, after: $cursor)
          @connection(key: "PersonalRepoList_repositories") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              databaseId
              ...RepoItem_repository
            }
          }
        }
      }
    }
  `,
  {
    getVariables(props, { count, cursor }) {
      return { count, cursor }
    },
    query: graphql`
      query PersonalRepoListQuery($count: Int!, $cursor: String) {
        ...PersonalRepoList
      }
    `,
  }
)
