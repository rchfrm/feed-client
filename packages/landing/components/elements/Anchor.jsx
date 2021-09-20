import React from 'react'
import PropTypes from 'prop-types'

import ActiveLink from '@/landing/elements/ActiveLink'

import useScrollToSection from '@/landing/hooks/useScrollToSection'

import { mixpanelInternalLinkClick } from '@/landing/helpers/mixpanelHelpers'

import * as utils from '@/landing/helpers/utils'

const Anchor = ({
  className,
  href,
  style,
  activeClass,
  onClick,
  children,
  label = null,
}) => {
  // Check if link is external, internal or email
  const linkType = React.useMemo(() => {
    return utils.getLinkType(href)
  }, [href])

  // If link is a fragment (ie. #features) get the correct scroll position...
  const targetId = href.replace('#', '')
  const scrollTo = useScrollToSection({ targetId })
  if (linkType === 'pageAnchor') {
    return (
      <a
        style={style}
        className={className}
        onClick={(e) => {
          scrollTo(e)
          onClick()
        }}
        role="button"
        data-anchor={href}
        aria-label={label}
      >
        {children}
      </a>
    )
  }

  // If it's not an internal link, link should open in new tab
  if (linkType === 'external') {
    return (
      <a
        className={className}
        style={style}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        aria-label={label}
      >
        {children}
      </a>
    )
  }

  // IF EMAIL basic link
  if (linkType === 'email') {
    return (
      <a
        className={className}
        style={style}
        href={href}
      >
        {children}
      </a>
    )
  }

  if (linkType === 'internal') {
    return (
      <ActiveLink href={href} activeClass={activeClass}>
        <a
          className={className}
          style={style}
          aria-label={label}
          role="link"
          onClick={() => {
            mixpanelInternalLinkClick(href)
          }}
        >
          {children}
        </a>
      </ActiveLink>
    )
  }
  return (
    <a
      className={className}
      style={style}
      href={href}
      aria-label={label}
    >
      {children}
    </a>
  )
}

Anchor.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  activeClass: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

Anchor.defaultProps = {
  href: '',
  style: {},
  activeClass: null,
  className: '',
  onClick: () => {},
}

export default Anchor
