import * as React from 'react'
import ExternalLinkIcon from 'views/ui/icons/ExternalLinkIcon'

type ExternalLinkProps = {
  showIcon: boolean;
  url: string;
  children: React.ReactNode;
  className: string;
}

const handleClick = (e: any) => {
  e.preventDefault()

  if (window.process) {
    const shell = window.require('electron').shell
    shell.openExternal(e.currentTarget.getAttribute('href'))
  }
}

const ExternalLink: React.SFC<ExternalLinkProps> = (props) => {
  const { url, children, showIcon, className } = props

  return (
    <a className={className} href={url} onClick={handleClick}>
      {children}
      {showIcon && <ExternalLinkIcon />}
    </a>
  )
}

ExternalLink.defaultProps = {
  showIcon: true,
  className: 'external link'
}

export default ExternalLink
