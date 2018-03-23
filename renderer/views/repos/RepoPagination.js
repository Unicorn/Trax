import React from 'react'

const RepoPagination = ({ repositories, loadMoreHandler }) => {
  if (repositories.pageInfo.hasNextPage)
    return (
      <li className="item action">
        <button className="basic brown button" onClick={loadMoreHandler}>
          Load more...
        </button>
      </li>
    )
  else return <noscript />
}

export default RepoPagination
