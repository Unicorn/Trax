import * as React from 'react'
import { Repo } from 'models/repo'
import ExternalLink from 'views/ui/ExternalLink'


interface Props {
  repo: Repo
}

const RepoItem: React.SFC<Props> = ({ repo }) => (
  <li className="item">
    <ExternalLink className="title external link" url={repo.htmlUrl} showIcon={false}>
      {repo.fullName}
    </ExternalLink>

    <div className="actions">
      <button className="micro basic brown button">
        Track
      </button>
    </div>
  </li>
)

export default RepoItem
