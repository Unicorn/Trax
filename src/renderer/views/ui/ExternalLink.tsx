import * as React from 'react'
import ExternalLinkIcon from '@/views/ui/icons/ExternalLinkIcon'

type ExternalLinkProps = {
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  url: string;
  iconPosition?: 'left' | 'right'
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
  const { url, children, showIcon, className, iconPosition } = props

  return (
    <a className={`${className} ${iconPosition || 'right'}`} href={url} onClick={handleClick}>
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
