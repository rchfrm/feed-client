import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'

import { track } from '@/helpers/trackingHelpers'

import brandColors from '@/constants/brandColors'
import * as utils from '@/helpers/utils'

const Button = React.forwardRef(({
  version,
  disabled,
  type,
  success,
  loading,
  spinnerFill,
  className,
  style,
  onClick,
  href,
  wrapper,
  icon,
  label,
  trackComponentName,
  children,
}, ref) => {
  const versions = version
    .split(' ')
    .map((versionString) => `button--${versionString}`)
  versions.push('button--basic')

  if (icon) {
    versions.push('button--icon')
  }
  // Define classes
  const classes = ['button', ...versions]
  if (className) {
    classes.push(className)
  }
  if (success) {
    classes.push('button--success')
  }
  if (loading) {
    classes.push('_loading')
  }

  // Define wrapper type based on href or not
  const Wrapper = wrapper || (href ? 'a' : 'button')
  // Handle hrefs
  const linkType = href ? utils.getLinkType(href) : null
  const target = linkType === 'external' ? '_blank' : '_self'
  const rel = linkType === 'external' ? 'noopener noreferrer' : null

  // ON CLICK
  const onButtonClick = React.useCallback((e) => {
    const buttonText = utils.getStringFromChildrenProp(children)

    track('button_click', {
      buttonText,
      trackComponentName,
    })
    onClick(e)
  }, [onClick, children, trackComponentName])

  // OUTPUT BUTTON
  return (
    <Wrapper
      type={href ? null : type}
      disabled={disabled}
      className={classes.join(' ')}
      onClick={onButtonClick}
      href={href}
      target={href ? target : ''}
      rel={href ? rel : ''}
      style={style}
      ref={ref}
      aria-label={label}
    >
      {loading && <Spinner className="button--spinner" fill={spinnerFill} />}
      <span className="button--innerText">
        {icon ? (
          <span className="flex flex-grow text-center items-center w-full">
            {icon}
            <span className="flex-grow">{children}</span>
          </span>
        ) : children}
      </span>
    </Wrapper>
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  version: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  spinnerFill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  href: PropTypes.string,
  wrapper: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  trackComponentName: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  version: 'black',
  disabled: false,
  type: 'button',
  success: false,
  loading: false,
  spinnerFill: brandColors.white,
  style: {},
  className: '',
  href: null,
  wrapper: '',
  icon: null,
  label: '',
  trackComponentName: '',
  onClick: () => {},
}

export default Button
