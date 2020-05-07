import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

import utils from '../helpers/utils'

const Button = ({
  version,
  disabled,
  type,
  success,
  loading,
  className,
  style,
  onClick,
  href,
  children,
}) => {
  const versions = version
    .split(' ')
    .map((versionString) => `button--${versionString}`)
  // Define classes
  const classes = ['button', ...versions]
  if (className) {
    classes.push(className)
  }
  if (success) {
    classes.push('button--success')
  }

  // Define wrapper type based on href or not
  const Wrapper = href ? 'a' : 'button'
  // Handle hrefs
  const linkType = href ? utils.getLinkType(href) : ''
  const target = linkType === 'external' ? '_blank' : 'self'
  const rel = linkType === 'external' ? 'noopener noreferrer' : ''

  // OUTPUT BUTTON
  return (
    <Wrapper
      type={type}
      disabled={disabled}
      className={classes.join(' ')}
      onClick={onClick}
      href={href}
      target={href ? target : ''}
      rel={href ? rel : ''}
      style={style}
    >
      <span className="button--innerText">
        {loading ? <Spinner className="button--spinner" /> : children}
      </span>
    </Wrapper>
  )
}

Button.propTypes = {
  version: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  version: 'black',
  disabled: false,
  type: 'button',
  success: false,
  loading: false,
  style: {},
  className: '',
  href: null,
  onClick: () => {},
}

export default Button
