import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/landing/constants/brandColors'
import * as utils from '@/landing/helpers/utils'

const Button = React.forwardRef(({
  children,
  color,
  bgColor,
  border,
  data,
  version,
  href,
  label,
  onClick,
  className,
}, ref) => {
  let buttonClass = 'button'
  if (version) {
    buttonClass += `--${version}`
  }

  // Define style
  const borderStyle = border ? `2px solid ${border}` : null
  const style = { backgroundColor: bgColor, color, border: borderStyle }
  const Tag = href ? 'a' : 'button'
  // Handle hrefs
  const linkType = href ? utils.getLinkType(href) : ''
  const target = linkType === 'external' ? '_blank' : '_self'
  const rel = linkType === 'external' ? 'noopener noreferrer' : ''

  return (
    <Tag
      onClick={onClick}
      className={[buttonClass, className].join(' ')}
      style={style}
      href={href}
      target={href ? target : ''}
      rel={href ? rel : ''}
      data-item={data}
      ref={ref}
      aria-label={label}
    >
      <span className="button--inner" data-item={data}>{children}</span>
    </Tag>
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  border: PropTypes.string,
  version: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

Button.defaultProps = {
  bgColor: '',
  color: brandColors.textColor,
  version: null,
  border: null,
  href: '',
  label: null,
  onClick: () => {},
  className: null,
}

export default Button
