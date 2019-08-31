/** @jsx createElement **/
import { createElement, SFC, MouseEvent } from 'react'
import ExternalLinkIcon from '@/views/ui/icons/ExternalLinkIcon'

interface ExternalLinkProps {
  children?: React.ReactNode
  className?: string
  showIcon?: boolean
  url: string
  iconPosition?: 'left' | 'right'
}

const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
  e.preventDefault()
  const url = e.currentTarget.getAttribute('href') as string

  window.shell && window.shell.openExternal(url)
}

const ExternalLink: SFC<ExternalLinkProps> = ({ url, children, showIcon, className, iconPosition }) => {
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
