import * as React from 'react'
import ExternalLinkIcon from 'views/ui/icons/ExternalLinkIcon'

type ExternalLinkProps = {
  showIcon?: boolean;
  className?: string;
  url: string;
  children: React.ReactNode;
}

const handleClick = (e: any) => {
  e.preventDefault()
  const url = e.currentTarget.getAttribute('href')

  if (window.shell)
    window.shell.openExternal(url)
  // else
  //   window.location = url
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
