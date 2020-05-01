import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

import helper from '../helpers/helper'

const Button = ({
  version,
  width: widthProp,
  marginBottom,
  textColor,
  bgColor,
  disabled,
  type,
  success,
  loading,
  className,
  onClick,
  href,
  children,
}) => {
  const versions = version
    .split(' ')
    .map((versionString) => `button--${versionString}`)
  const width = typeof widthProp === 'string' ? widthProp : ''
  const widthPercentage = typeof widthProp === 'number' ? widthProp : ''
  const classes = ['button', width].concat(versions)
  if (className) {
    classes.push(className)
  }
  if (success) {
    classes.push('button--success')
  }

  // Define wrapper type based on href or not
  const Wrapper = href ? 'a' : 'button'
  // Handle hrefs
  const linkType = href ? helper.getLinkType(href) : ''
  const target = linkType === 'external' ? '_blank' : 'self'
  const rel = linkType === 'external' ? 'noopener noreferrer' : ''

  return (
    <Wrapper
      type={type}
      disabled={disabled}
      className={classes.join(' ')}
      onClick={onClick}
      href={href}
      target={href ? target : ''}
      rel={href ? rel : ''}
      style={{
        width: `${widthPercentage}%`,
        color: textColor,
        marginBottom,
        backgroundColor: bgColor,
      }}
    >
      <span className="button--innerText">
        {loading ? <Spinner className="button--spinner" /> : children}
      </span>
    </Wrapper>
  )
}

Button.propTypes = {
  version: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  marginBottom: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  version: 'black',
  width: '',
  marginBottom: '',
  textColor: '',
  bgColor: '',
  disabled: false,
  type: 'button',
  loading: false,
  success: false,
  className: '',
  href: null,
  onClick: () => {},
}

export default Button
